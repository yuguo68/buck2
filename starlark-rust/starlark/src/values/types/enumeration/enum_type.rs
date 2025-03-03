/*
 * Copyright 2018 The Starlark in Rust Authors.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

use std::cell::UnsafeCell;
use std::fmt;
use std::fmt::Debug;
use std::fmt::Display;
use std::sync::Arc;

use allocative::Allocative;
use display_container::fmt_container;
use dupe::Dupe;
use either::Either;
use once_cell::unsync::OnceCell;
use starlark_derive::starlark_module;
use starlark_derive::starlark_value;
use starlark_derive::Coerce;
use starlark_derive::NoSerialize;
use starlark_derive::StarlarkDocs;
use starlark_derive::Trace;
use starlark_map::small_map::SmallMap;
use starlark_map::Equivalent;

use crate as starlark;
use crate::any::ProvidesStaticType;
use crate::environment::Methods;
use crate::environment::MethodsBuilder;
use crate::environment::MethodsStatic;
use crate::eval::Arguments;
use crate::eval::Evaluator;
use crate::typing::Ty;
use crate::values::enumeration::ty_enum_type::TyEnumData;
use crate::values::enumeration::ty_enum_type::TyEnumType;
use crate::values::enumeration::ty_enum_value::TyEnumValue;
use crate::values::enumeration::value::EnumValueGen;
use crate::values::enumeration::EnumValue;
use crate::values::function::FUNCTION_TYPE;
use crate::values::index::convert_index;
use crate::values::types::type_instance_id::TypeInstanceId;
use crate::values::Freeze;
use crate::values::Freezer;
use crate::values::FrozenValue;
use crate::values::Heap;
use crate::values::StarlarkValue;
use crate::values::Value;
use crate::values::ValueLike;

#[derive(thiserror::Error, Debug)]
enum EnumError {
    #[error("enum values must all be distinct, but repeated `{0}`")]
    DuplicateEnumValue(String),
    #[error("Unknown enum element `{0}`, given to `{1}`")]
    InvalidElement(String, String),
}

#[doc(hidden)]
pub trait EnumCell: Freeze {
    type TyEnumTypeOpt: Debug;

    fn get_or_init_ty(ty: &Self::TyEnumTypeOpt, f: impl FnOnce() -> TyEnumType);
    fn get_ty(ty: &Self::TyEnumTypeOpt) -> Option<&TyEnumType>;
}

impl<'v> EnumCell for Value<'v> {
    type TyEnumTypeOpt = OnceCell<TyEnumType>;

    fn get_or_init_ty(ty: &Self::TyEnumTypeOpt, f: impl FnOnce() -> TyEnumType) {
        ty.get_or_init(f);
    }

    fn get_ty(ty: &Self::TyEnumTypeOpt) -> Option<&TyEnumType> {
        ty.get()
    }
}

impl EnumCell for FrozenValue {
    type TyEnumTypeOpt = Option<TyEnumType>;

    fn get_or_init_ty(ty: &Self::TyEnumTypeOpt, f: impl FnOnce() -> TyEnumType) {
        let _ignore = (ty, f);
    }

    fn get_ty(ty: &Self::TyEnumTypeOpt) -> Option<&TyEnumType> {
        ty.as_ref()
    }
}

/// The type of an enumeration, created by `enum()`.
#[derive(
    Debug,
    Trace,
    Coerce,
    NoSerialize,
    ProvidesStaticType,
    StarlarkDocs,
    Allocative
)]
#[starlark_docs(builtin = "extension")]
#[repr(C)]
// Deliberately store fully populated values
// for each entry, so we can produce enum values with zero allocation.
pub struct EnumTypeGen<V: EnumCell> {
    pub(crate) id: TypeInstanceId,
    #[allocative(skip)] // TODO(nga): do not skip.
    // TODO(nga): teach derive to do something like `#[trace(static)]`.
    #[trace(unsafe_ignore)]
    pub(crate) ty_enum_type: V::TyEnumTypeOpt,
    // The key is the value of the enumeration
    // The value is a value of type EnumValue
    #[allocative(skip)] // TODO(nga): do not skip.
    elements: UnsafeCell<SmallMap<V, V>>,
}

impl<'v> Freeze for EnumTypeGen<Value<'v>> {
    type Frozen = EnumTypeGen<FrozenValue>;

    fn freeze(self, freezer: &Freezer) -> anyhow::Result<Self::Frozen> {
        let EnumTypeGen {
            id,
            ty_enum_type,
            elements,
        } = self;
        let ty_enum_type = ty_enum_type.into_inner();
        let elements = elements.freeze(freezer)?;
        Ok(EnumTypeGen {
            id,
            ty_enum_type,
            elements,
        })
    }
}

unsafe impl<V: EnumCell + Freeze> Send for EnumTypeGen<V> {}
unsafe impl<V: EnumCell + Freeze> Sync for EnumTypeGen<V> {}

impl<'v, V: EnumCell + ValueLike<'v>> Display for EnumTypeGen<V> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt_container(f, "enum(", ")", self.elements().iter().map(|(k, _v)| k))
    }
}

/// Unfrozen enum type.
pub type EnumType<'v> = EnumTypeGen<Value<'v>>;
/// Frozen enum type.
pub type FrozenEnumType = EnumTypeGen<FrozenValue>;

impl<'v> EnumType<'v> {
    pub(crate) fn new(elements: Vec<Value<'v>>, heap: &'v Heap) -> anyhow::Result<Value<'v>> {
        // We are constructing the enum and all elements in one go.
        // They both point at each other, which adds to the complexity.
        let id = TypeInstanceId::gen();
        let typ = heap.alloc(EnumType {
            id,
            ty_enum_type: OnceCell::new(),
            elements: UnsafeCell::new(SmallMap::new()),
        });

        let mut res = SmallMap::with_capacity(elements.len());
        for (i, x) in elements.iter().enumerate() {
            let v = heap.alloc(EnumValue {
                id,
                typ,
                index: i as i32,
                value: *x,
            });
            if res.insert_hashed(x.get_hashed()?, v).is_some() {
                return Err(EnumError::DuplicateEnumValue(x.to_string()).into());
            }
        }

        // Here we tie the cycle
        let t = typ.downcast_ref::<EnumType>().unwrap();
        unsafe {
            // SAFETY: we own unique reference to `t`.
            *t.elements.get() = res;
        }
        Ok(typ)
    }
}

impl<V: EnumCell + Freeze> EnumTypeGen<V> {
    pub(crate) fn elements(&self) -> &SmallMap<V, V> {
        // Safe because we never mutate the elements after construction.
        unsafe { &*self.elements.get() }
    }
}

impl<'v, V> EnumTypeGen<V>
where
    Value<'v>: Equivalent<V>,
    V: ValueLike<'v> + 'v + EnumCell,
{
    pub(crate) fn ty_enum_type(&self) -> Option<&TyEnumType> {
        V::get_ty(&self.ty_enum_type)
    }

    pub(crate) fn construct(&self, val: Value<'v>) -> anyhow::Result<V> {
        match self.elements().get_hashed_by_value(val.get_hashed()?) {
            Some(v) => Ok(*v),
            None => Err(EnumError::InvalidElement(val.to_str(), self.to_string()).into()),
        }
    }
}

#[starlark_value(type = FUNCTION_TYPE)]
impl<'v, V> StarlarkValue<'v> for EnumTypeGen<V>
where
    Self: ProvidesStaticType<'v>,
    Value<'v>: Equivalent<V>,
    V: ValueLike<'v> + 'v + EnumCell,
{
    fn invoke(
        &self,
        _me: Value<'v>,
        args: &Arguments<'v, '_>,
        eval: &mut Evaluator<'v, '_>,
    ) -> anyhow::Result<Value<'v>> {
        args.no_named_args()?;
        let val = args.positional1(eval.heap())?;
        Ok(self.construct(val)?.to_value())
    }

    fn length(&self) -> anyhow::Result<i32> {
        Ok(self.elements().len() as i32)
    }

    fn at(&self, index: Value, _heap: &'v Heap) -> anyhow::Result<Value<'v>> {
        let i = convert_index(index, self.elements().len() as i32)? as usize;
        // Must be in the valid range since convert_index checks that, so just unwrap
        Ok(self
            .elements()
            .get_index(i)
            .map(|x| *x.1)
            .unwrap()
            .to_value())
    }

    unsafe fn iterate(&self, me: Value<'v>, _heap: &'v Heap) -> anyhow::Result<Value<'v>> {
        Ok(me)
    }

    unsafe fn iter_size_hint(&self, index: usize) -> (usize, Option<usize>) {
        debug_assert!(index <= self.elements().len());
        let rem = self.elements().len() - index;
        (rem, Some(rem))
    }

    unsafe fn iter_next(&self, index: usize, _heap: &'v Heap) -> Option<Value<'v>> {
        self.elements().values().nth(index).map(|v| v.to_value())
    }

    unsafe fn iter_stop(&self) {}

    fn get_methods() -> Option<&'static Methods> {
        static RES: MethodsStatic = MethodsStatic::new();
        RES.methods(enum_type_methods)
    }

    fn eval_type(&self) -> Option<Ty> {
        self.ty_enum_type().map(|t| {
            Ty::custom(TyEnumValue {
                enum_type: t.dupe(),
            })
        })
    }

    fn typechecker_ty(&self) -> Option<Ty> {
        self.ty_enum_type().map(|t| Ty::custom(t.dupe()))
    }

    fn export_as(&self, variable_name: &str, _eval: &mut Evaluator<'v, '_>) {
        V::get_or_init_ty(&self.ty_enum_type, || TyEnumType {
            data: Arc::new(TyEnumData {
                name: variable_name.to_owned(),
                variants: self
                    .elements()
                    .iter()
                    .map(|(_, enum_value)| {
                        let enum_value: &EnumValueGen<_> =
                            EnumValue::from_value(enum_value.to_value())
                                .expect("known to be enum value");
                        Ty::of_value(enum_value.value)
                    })
                    .collect(),
                id: self.id,
            }),
        });
    }
}

#[starlark_module]
fn enum_type_methods(builder: &mut MethodsBuilder) {
    #[starlark(attribute)]
    fn r#type<'v>(this: Value, heap: &Heap) -> anyhow::Result<Value<'v>> {
        let this = EnumType::from_value(this).unwrap();
        let ty_enum_type = match this {
            Either::Left(x) => x.ty_enum_type(),
            Either::Right(x) => x.ty_enum_type(),
        };
        match ty_enum_type {
            Some(ty_enum_type) => Ok(heap.alloc(ty_enum_type.data.name.as_str())),
            None => Ok(heap.alloc(EnumValue::TYPE)),
        }
    }

    fn values<'v>(this: Value<'v>, heap: &'v Heap) -> anyhow::Result<Value<'v>> {
        let this = EnumType::from_value(this).unwrap();
        match this {
            Either::Left(x) => Ok(heap.alloc_list_iter(x.elements().keys().copied())),
            Either::Right(x) => Ok(heap.alloc_list_iter(x.elements().keys().map(|x| x.to_value()))),
        }
    }
}

#[cfg(test)]
mod tests {
    use crate::assert;

    #[test]
    fn test_enum_type_as_type_pass() {
        assert::pass(
            r#"
Color = enum("RED", "GREEN", "BLUE")

def f_pass(x: Color):
    pass

def g_pass(x: Color):
    f_pass(x)
"#,
        );
    }

    #[test]
    fn test_enum_type_fail_runtime() {
        assert::fail(
            r#"
Color = enum("RED", "GREEN", "BLUE")
Season = enum("SPRING", "SUMMER", "AUTUMN", "WINTER")

def f(x: Color):
    pass

def g(x):
    f(x)

g(Season[0])
"#,
            r#"Value `"SPRING"` of type `enum` does not match the type annotation `enum(name = "Color", ...)` for argument `x`"#,
        );
    }

    #[test]
    fn test_enum_type_fail_compile_time() {
        assert::fail(
            r#"
Color = enum("RED", "GREEN", "BLUE")
Season = enum("SPRING", "SUMMER", "AUTUMN", "WINTER")

def f(x: Color):
    pass

def g(x: Season):
    f(x)
"#,
            r#"Expected type `enum(name = "Color", ...)` but got `enum(name = "Season", ...)`"#,
        );
    }

    #[test]
    fn test_enum_is_callable() {
        assert::pass(
            r#"
Color = enum("RED", "GREEN", "BLUE")

def foo(x: typing.Callable):
    pass

def bar():
    foo(Color)
"#,
        );
    }
}
