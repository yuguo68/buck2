/*
 * Copyright 2019 The Starlark in Rust Authors.
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

use std::cell::OnceCell;
use std::fmt;
use std::fmt::Debug;
use std::fmt::Display;
use std::hash::Hash;
use std::sync::Arc;

use allocative::Allocative;
use display_container::fmt_keyed_container;
use dupe::Dupe;
use either::Either;
use starlark_derive::starlark_value;
use starlark_derive::NoSerialize;
use starlark_derive::StarlarkDocs;
use starlark_map::small_map::SmallMap;
use starlark_map::StarlarkHasher;

use crate as starlark;
use crate::any::ProvidesStaticType;
use crate::coerce::coerce;
use crate::eval::Arguments;
use crate::eval::Evaluator;
use crate::eval::ParametersSpec;
use crate::starlark_complex_values;
use crate::typing::Ty;
use crate::values::function::FUNCTION_TYPE;
use crate::values::record::field::FieldGen;
use crate::values::record::ty_record::TyRecord;
use crate::values::record::ty_record_type::TyRecordData;
use crate::values::record::ty_record_type::TyRecordType;
use crate::values::record::Record;
use crate::values::types::type_instance_id::TypeInstanceId;
use crate::values::Freeze;
use crate::values::Freezer;
use crate::values::FrozenValue;
use crate::values::Heap;
use crate::values::StarlarkValue;
use crate::values::Trace;
use crate::values::Value;
use crate::values::ValueLike;

#[doc(hidden)]
pub trait RecordCell {
    type TyRecordTypeOpt: Debug;

    fn get_or_init_ty(ty: &Self::TyRecordTypeOpt, f: impl FnOnce() -> TyRecordType);
    fn get_ty(ty: &Self::TyRecordTypeOpt) -> Option<&TyRecordType>;
}

impl<'v> RecordCell for Value<'v> {
    type TyRecordTypeOpt = OnceCell<TyRecordType>;

    fn get_or_init_ty(ty: &Self::TyRecordTypeOpt, f: impl FnOnce() -> TyRecordType) {
        ty.get_or_init(f);
    }

    fn get_ty(ty: &Self::TyRecordTypeOpt) -> Option<&TyRecordType> {
        ty.get()
    }
}
impl RecordCell for FrozenValue {
    type TyRecordTypeOpt = Option<TyRecordType>;

    fn get_or_init_ty(ty: &Self::TyRecordTypeOpt, f: impl FnOnce() -> TyRecordType) {
        let _ignore = (ty, f);
    }

    fn get_ty(ty: &Self::TyRecordTypeOpt) -> Option<&TyRecordType> {
        ty.as_ref()
    }
}

#[derive(Debug, thiserror::Error)]
enum RecordTypeError {
    #[error(
        "Record instance cannot be created if record type is not assigned to a global variable"
    )]
    RecordTypeNotAssigned,
}

/// The result of `record()`, being the type of records.
#[derive(
    Debug,
    Trace,
    NoSerialize,
    ProvidesStaticType,
    StarlarkDocs,
    Allocative
)]
#[starlark_docs(builtin = "extension")]
pub struct RecordTypeGen<V: RecordCell> {
    pub(crate) id: TypeInstanceId,
    #[allocative(skip)] // TODO(nga): do not skip.
    // TODO(nga): teach derive to do something like `#[trace(static)]`.
    #[trace(unsafe_ignore)]
    pub(crate) ty_record_type: V::TyRecordTypeOpt,
    /// The V is the type the field must satisfy (e.g. `"string"`)
    fields: SmallMap<String, FieldGen<V>>,
    /// Creating these on every invoke is pretty expensive (profiling shows)
    /// so compute them in advance and cache.
    parameter_spec: ParametersSpec<FrozenValue>,
}

impl<'v, V: ValueLike<'v> + RecordCell> Display for RecordTypeGen<V> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt_keyed_container(f, "record(", ")", "=", &self.fields)
    }
}

/// Type of a record in a heap.
pub type RecordType<'v> = RecordTypeGen<Value<'v>>;
/// Type of a record in a frozen heap.
pub type FrozenRecordType = RecordTypeGen<FrozenValue>;

starlark_complex_values!(RecordType);

pub(crate) fn record_fields<'v>(
    x: Either<&'v RecordType<'v>, &'v FrozenRecordType>,
) -> &'v SmallMap<String, FieldGen<Value<'v>>> {
    x.either(|x| &x.fields, |x| coerce(&x.fields))
}

impl<'v> RecordType<'v> {
    pub(crate) fn new(fields: SmallMap<String, FieldGen<Value<'v>>>) -> Self {
        let parameter_spec = Self::make_parameter_spec(&fields);
        Self {
            id: TypeInstanceId::gen(),
            fields,
            parameter_spec,
            ty_record_type: OnceCell::new(),
        }
    }

    fn make_parameter_spec(
        fields: &SmallMap<String, FieldGen<Value<'v>>>,
    ) -> ParametersSpec<FrozenValue> {
        let mut parameters = ParametersSpec::with_capacity("record".to_owned(), fields.len());
        parameters.no_more_positional_args();
        for (name, field) in fields {
            if field.default.is_some() {
                parameters.optional(name);
            } else {
                parameters.required(name);
            }
        }
        parameters.finish()
    }
}

impl<'v> Freeze for RecordType<'v> {
    type Frozen = FrozenRecordType;
    fn freeze(self, freezer: &Freezer) -> anyhow::Result<Self::Frozen> {
        Ok(FrozenRecordType {
            id: self.id,
            fields: self.fields.freeze(freezer)?,
            parameter_spec: self.parameter_spec,
            ty_record_type: self.ty_record_type.into_inner(),
        })
    }
}

impl<'v, V: ValueLike<'v> + RecordCell + 'v> RecordTypeGen<V>
where
    Self: ProvidesStaticType<'v>,
    FieldGen<V>: ProvidesStaticType<'v>,
{
    pub(crate) fn ty_record_type(&self) -> Option<&TyRecordType> {
        V::get_ty(&self.ty_record_type)
    }

    pub(crate) fn instance_ty(&self) -> Ty {
        Ty::custom(TyRecord {
            record_type: self
                .ty_record_type()
                .expect("Instances can only be created if named are assigned")
                .dupe(),
        })
    }
}

#[starlark_value(type = FUNCTION_TYPE)]
impl<'v, V: ValueLike<'v> + RecordCell + 'v> StarlarkValue<'v> for RecordTypeGen<V>
where
    Self: ProvidesStaticType<'v>,
    FieldGen<V>: ProvidesStaticType<'v>,
{
    fn write_hash(&self, hasher: &mut StarlarkHasher) -> anyhow::Result<()> {
        for (name, typ) in &self.fields {
            name.hash(hasher);
            // No need to hash typ.1, since it was computed from typ.0
            typ.write_hash(hasher)?;
        }
        Ok(())
    }

    fn invoke(
        &self,
        me: Value<'v>,
        args: &Arguments<'v, '_>,
        eval: &mut Evaluator<'v, '_>,
    ) -> anyhow::Result<Value<'v>> {
        if self.ty_record_type().is_none() {
            return Err(RecordTypeError::RecordTypeNotAssigned.into());
        }

        let this = me;

        self.parameter_spec
            .parser(args, eval, |mut param_parser, eval| {
                let fields = record_fields(RecordType::from_value(this).unwrap());
                let mut values = Vec::with_capacity(fields.len());
                for (name, field) in fields.iter() {
                    let value = match field.default {
                        None => {
                            let v: Value = param_parser.next(name)?;
                            field.typ.check_type(v, Some(name))?;
                            v
                        }
                        Some(default) => {
                            let v: Option<Value> = param_parser.next_opt(name)?;
                            match v {
                                None => default,
                                Some(v) => {
                                    field.typ.check_type(v, Some(name))?;
                                    v
                                }
                            }
                        }
                    };
                    values.push(value);
                }
                Ok(eval.heap().alloc_complex(Record {
                    typ: this,
                    values: values.into_boxed_slice(),
                }))
            })
    }

    fn dir_attr(&self) -> Vec<String> {
        vec!["type".to_owned()]
    }

    fn has_attr(&self, attribute: &str, _heap: &'v Heap) -> bool {
        attribute == "type"
    }

    fn get_attr(&self, attribute: &str, heap: &'v Heap) -> Option<Value<'v>> {
        if attribute == "type" {
            Some(heap.alloc(self.ty_record_type().map_or(Record::TYPE, |s| &s.data.name)))
        } else {
            None
        }
    }

    fn eval_type(&self) -> Option<Ty> {
        self.ty_record_type().map(|t| {
            Ty::custom(TyRecord {
                record_type: t.dupe(),
            })
        })
    }

    fn typechecker_ty(&self) -> Option<Ty> {
        self.ty_record_type().map(|t| Ty::custom(t.dupe()))
    }

    fn export_as(&self, variable_name: &str, _eval: &mut Evaluator<'v, '_>) {
        V::get_or_init_ty(&self.ty_record_type, || TyRecordType {
            data: Arc::new(TyRecordData {
                name: variable_name.to_owned(),
                fields: self
                    .fields
                    .iter()
                    .map(|(name, field)| (name.clone(), field.ty()))
                    .collect(),
                id: self.id,
            }),
        });
    }
}

#[cfg(test)]
mod tests {
    use crate::assert;

    #[test]
    fn test_record_type_as_type_pass() {
        assert::pass(
            r"
RecPass = record(a = field(int), b = field(int))

def f_pass(x: RecPass):
    return x.a

f_pass(RecPass(a = 1, b = 2))
",
        );
    }

    #[test]
    fn test_record_type_as_type_compile_time() {
        assert::fail(
            r"
RecFailCt1 = record(a = field(int), b = field(int))
RecFailCt2 = record(a = field(int), b = field(int))

def f_fail_ct(x: RecFailCt1):
    return x.a

f_fail_ct(RecFailCt2(a = 1, b = 2))
",
            // TODO(nga): this is runtime error, not compile time.
            "Value `record(a=1, b=2)` of type `record` does not match",
        );
    }

    #[test]
    fn test_record_type_as_type_runtime() {
        assert::fail(
            r"
RecFailRt1 = record(a = field(int), b = field(int))
RecFailRt2 = record(a = field(int), b = field(int))

def f_fail_rt(x: RecFailRt1):
    return x.a

noop(f_fail_rt)(RecFailRt2(a = 1, b = 2))
",
            "Value `record(a=1, b=2)` of type `record` does not match the type annotation",
        );
    }

    #[test]
    fn test_anon_record() {
        assert::fail(
            "record(a = field(int))(a = 1)",
            "not assigned to a global variable",
        );
    }
}
