/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under both the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree and the Apache
 * License, Version 2.0 found in the LICENSE-APACHE file in the root directory
 * of this source tree.
 */

use std::cell::Ref;
use std::cell::RefCell;
use std::cell::RefMut;
use std::fmt;
use std::fmt::Debug;
use std::fmt::Display;
use std::fmt::Formatter;
use std::marker::PhantomData;

use allocative::Allocative;
use buck2_core::fs::paths::RelativePathBuf;
use buck2_util::commas::commas;
use buck2_util::thin_box::ThinBoxSlice;
use display_container::display_pair;
use display_container::fmt_container;
use display_container::iter_display_chain;
use dupe::Dupe;
use either::Either;
use gazebo::prelude::*;
use indexmap::IndexSet;
use regex::Regex;
use serde::Serialize;
use serde::Serializer;
use starlark::any::ProvidesStaticType;
use starlark::coerce::coerce;
use starlark::docs::StarlarkDocs;
use starlark::environment::GlobalsBuilder;
use starlark::environment::Methods;
use starlark::environment::MethodsBuilder;
use starlark::environment::MethodsStatic;
use starlark::typing::Ty;
use starlark::values::list::ListRef;
use starlark::values::starlark_value;
use starlark::values::type_repr::StarlarkTypeRepr;
use starlark::values::AllocValue;
use starlark::values::Demand;
use starlark::values::Freeze;
use starlark::values::Freezer;
use starlark::values::Heap;
use starlark::values::NoSerialize;
use starlark::values::StarlarkValue;
use starlark::values::StringValue;
use starlark::values::Trace;
use starlark::values::UnpackValue;
use starlark::values::Value;
use starlark::values::ValueError;
use starlark::values::ValueLike;
use starlark::values::ValueOf;
use static_assertions::assert_eq_size;

use crate::artifact_groups::ArtifactGroup;
use crate::interpreter::rule_defs::artifact::associated::AssociatedArtifacts;
use crate::interpreter::rule_defs::artifact::StarlarkDeclaredArtifact;
use crate::interpreter::rule_defs::artifact::StarlarkOutputArtifact;
use crate::interpreter::rule_defs::cmd_args::options::CommandLineOptions;
use crate::interpreter::rule_defs::cmd_args::options::CommandLineOptionsRef;
use crate::interpreter::rule_defs::cmd_args::options::CommandLineOptionsTrait;
use crate::interpreter::rule_defs::cmd_args::options::FrozenCommandLineOptions;
use crate::interpreter::rule_defs::cmd_args::options::QuoteStyle;
use crate::interpreter::rule_defs::cmd_args::options::RelativeOrigin;
use crate::interpreter::rule_defs::cmd_args::traits::CommandLineArgLike;
use crate::interpreter::rule_defs::cmd_args::traits::CommandLineArtifactVisitor;
use crate::interpreter::rule_defs::cmd_args::traits::CommandLineBuilder;
use crate::interpreter::rule_defs::cmd_args::traits::CommandLineContext;
use crate::interpreter::rule_defs::cmd_args::traits::SimpleCommandLineArtifactVisitor;
use crate::interpreter::rule_defs::cmd_args::traits::WriteToFileMacroVisitor;
use crate::interpreter::rule_defs::cmd_args::value::CommandLineArg;
use crate::interpreter::rule_defs::cmd_args::value::FrozenCommandLineArg;

/// Fields of `cmd_args`. Abstract mutable and frozen versions.
trait Fields<'v> {
    fn items(&self) -> &[CommandLineArg<'v>];
    fn hidden(&self) -> &[CommandLineArg<'v>];
    fn options(&self) -> Option<&dyn CommandLineOptionsTrait<'v>>;
}

/// Wrapper because we cannot implement traits for traits.
struct FieldsRef<'v, F: Fields<'v>>(F, PhantomData<Value<'v>>);

impl<'v, F: Fields<'v>> Serialize for FieldsRef<'v, F> {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        /// Make sure mutable mutable and frozen `cmd_args` are serialized identically
        /// by routing through this struct.
        #[derive(Serialize)]
        struct Mirror<'v, 'a> {
            items: &'a [CommandLineArg<'v>],
            hidden: &'a [CommandLineArg<'v>],
            options: Option<CommandLineOptionsRef<'v, 'a>>,
        }

        Mirror {
            items: self.0.items(),
            hidden: self.0.hidden(),
            options: self.0.options().map(|x| x.to_command_line_options()),
        }
        .serialize(serializer)
    }
}

impl<'v, F: Fields<'v>> Display for FieldsRef<'v, F> {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        fmt_container(
            f,
            "cmd_args(",
            ")",
            iter_display_chain(
                self.0.items(),
                iter_display_chain(
                    Some(self.0.hidden())
                        .filter(|x| !x.is_empty())
                        .map(|hidden| {
                            struct Wrapper<'a, 'v>(&'a [CommandLineArg<'v>]);
                            impl<'a, 'v> Display for Wrapper<'a, 'v> {
                                fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
                                    fmt_container(f, "[", "]", self.0.iter())
                                }
                            }
                            display_pair("hidden", "=", Wrapper(hidden))
                        }),
                    self.0
                        .options()
                        .iter()
                        .map(|options| display_pair("options", "=", options)),
                ),
            ),
        )
    }
}

impl<'v, F: Fields<'v>> FieldsRef<'v, F> {
    fn copy(&self) -> StarlarkCmdArgs<'v> {
        StarlarkCmdArgs(RefCell::new(StarlarkCommandLineData {
            items: self.0.items().to_vec(),
            hidden: self.0.hidden().to_vec(),
            options: self
                .0
                .options()
                .map(|x| Box::new(x.to_command_line_options().to_owned())),
        }))
    }

    fn ignore_artifacts(&self) -> bool {
        self.0
            .options()
            .map(|o| o.ignore_artifacts())
            .unwrap_or_default()
    }

    fn is_concat(&self) -> bool {
        if let Some(x) = &self.0.options() {
            x.delimiter().is_some()
        } else {
            false
        }
    }

    fn relative_to_path<C>(&self, ctx: &C) -> anyhow::Result<Option<RelativePathBuf>>
    where
        C: CommandLineContext + ?Sized,
    {
        match &self.0.options() {
            None => Ok(None),
            Some(options) => options.to_command_line_options().relative_to_path(ctx),
        }
    }
}

impl<'v, F: Fields<'v>> CommandLineArgLike for FieldsRef<'v, F> {
    fn add_to_command_line(
        &self,
        cli: &mut dyn CommandLineBuilder,
        context: &mut dyn CommandLineContext,
    ) -> anyhow::Result<()> {
        match self.0.options() {
            None => {
                for item in self.0.items() {
                    item.as_command_line_arg()
                        .add_to_command_line(cli, context)?;
                }
                Ok(())
            }
            Some(options) => {
                options
                    .to_command_line_options()
                    .wrap_builder(cli, context, |cli, context| {
                        for item in self.0.items() {
                            item.as_command_line_arg()
                                .add_to_command_line(cli, context)?;
                        }
                        Ok(())
                    })
            }
        }
    }

    fn visit_artifacts(&self, visitor: &mut dyn CommandLineArtifactVisitor) -> anyhow::Result<()> {
        if !self.ignore_artifacts() {
            for item in self.0.items().iter().chain(self.0.hidden().iter()) {
                visitor.push_frame()?;
                item.as_command_line_arg().visit_artifacts(visitor)?;
                visitor.pop_frame();
            }
        }
        Ok(())
    }

    fn contains_arg_attr(&self) -> bool {
        self.0
            .items()
            .iter()
            .any(|x| x.as_command_line_arg().contains_arg_attr())
            || self
                .0
                .hidden()
                .iter()
                .any(|x| x.as_command_line_arg().contains_arg_attr())
    }

    fn visit_write_to_file_macros(
        &self,
        visitor: &mut dyn WriteToFileMacroVisitor,
    ) -> anyhow::Result<()> {
        visitor.set_current_relative_to_path(&|ctx| self.relative_to_path(ctx))?;

        for item in self.0.items() {
            item.as_command_line_arg()
                .visit_write_to_file_macros(visitor)?;
        }
        for item in self.0.hidden() {
            item.as_command_line_arg()
                .visit_write_to_file_macros(visitor)?;
        }
        Ok(())
    }
}

/// Starlark object returned by `cmd_args()`
/// A container for all of the args and nested command lines that a users adds to `ctx.args()`
///
/// This allows more efficient iterative argument building, including O(1) insertion of
/// `CommandLine` / `FrozenCommandLine` args.
///
/// When frozen, a `FrozenCommandLine` is created.
///
/// `items` contains strings, artifacts, command line args (frozen and not), but does not
///         contain any builders.
#[derive(Debug, Default, Clone, Trace, ProvidesStaticType, Allocative)]
#[repr(C)]
pub struct StarlarkCommandLineData<'v> {
    items: Vec<CommandLineArg<'v>>,
    hidden: Vec<CommandLineArg<'v>>,
    options: Option<Box<CommandLineOptions<'v>>>,
}

#[derive(
    Debug,
    Default,
    Clone,
    Trace,
    ProvidesStaticType,
    StarlarkDocs,
    Allocative
)]
pub struct StarlarkCmdArgs<'v>(RefCell<StarlarkCommandLineData<'v>>);

impl<'v> Serialize for StarlarkCmdArgs<'v> {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        FieldsRef(self.0.borrow(), PhantomData).serialize(serializer)
    }
}

#[derive(Debug, ProvidesStaticType, Allocative)]
pub struct FrozenStarlarkCmdArgs {
    items: ThinBoxSlice<FrozenCommandLineArg>,
    hidden: ThinBoxSlice<FrozenCommandLineArg>,
    options: FrozenCommandLineOptions,
}

impl Serialize for FrozenStarlarkCmdArgs {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        FieldsRef(self, PhantomData).serialize(serializer)
    }
}

impl<'a, 'v> Fields<'v> for Ref<'a, StarlarkCommandLineData<'v>> {
    fn items(&self) -> &[CommandLineArg<'v>] {
        &self.items
    }

    fn hidden(&self) -> &[CommandLineArg<'v>] {
        &self.hidden
    }

    fn options(&self) -> Option<&dyn CommandLineOptionsTrait<'v>> {
        match &self.options {
            None => None,
            Some(x) => Some(&**x),
        }
    }
}

impl<'v> Fields<'v> for FrozenStarlarkCmdArgs {
    fn items(&self) -> &[CommandLineArg<'v>] {
        coerce(&*self.items)
    }

    fn hidden(&self) -> &[CommandLineArg<'v>] {
        coerce(&*self.hidden)
    }

    fn options(&self) -> Option<&dyn CommandLineOptionsTrait<'v>> {
        if self.options.is_empty() {
            None
        } else {
            Some(&self.options)
        }
    }
}

impl<'a, 'v, F: Fields<'v>> Fields<'v> for &'a F {
    fn items(&self) -> &[CommandLineArg<'v>] {
        (*self).items()
    }

    fn hidden(&self) -> &[CommandLineArg<'v>] {
        (*self).hidden()
    }

    fn options(&self) -> Option<&dyn CommandLineOptionsTrait<'v>> {
        (*self).options()
    }
}

impl<'v, A: Fields<'v>, B: Fields<'v>> Fields<'v> for Either<A, B> {
    fn items(&self) -> &[CommandLineArg<'v>] {
        match self {
            Either::Left(x) => x.items(),
            Either::Right(x) => x.items(),
        }
    }

    fn hidden(&self) -> &[CommandLineArg<'v>] {
        match self {
            Either::Left(x) => x.hidden(),
            Either::Right(x) => x.hidden(),
        }
    }

    fn options(&self) -> Option<&dyn CommandLineOptionsTrait<'v>> {
        match self {
            Either::Left(x) => x.options(),
            Either::Right(x) => x.options(),
        }
    }
}

// These types show up a lot in the frozen heaps, so make sure they don't regress
assert_eq_size!(StarlarkCmdArgs<'static>, [usize; 8]);
assert_eq_size!(FrozenStarlarkCmdArgs, [usize; 3]);
assert_eq_size!(CommandLineOptions<'static>, [usize; 10]);

impl<'v> Display for StarlarkCmdArgs<'v> {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        match self.0.try_borrow() {
            Ok(x) => Display::fmt(&FieldsRef(x, PhantomData), f),
            Err(_) => write!(f, "<cmd_args borrowed>"),
        }
    }
}

impl Display for FrozenStarlarkCmdArgs {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        Display::fmt(&FieldsRef(self, PhantomData), f)
    }
}

impl<'v> StarlarkCommandLineData<'v> {
    fn options_mut(&mut self) -> &mut CommandLineOptions<'v> {
        if self.options.is_none() {
            self.options = Some(Box::default());
        }
        self.options.as_mut().unwrap()
    }
}

impl<'v> StarlarkCmdArgs<'v> {
    pub(crate) fn is_concat(&self) -> bool {
        FieldsRef(self.0.borrow(), PhantomData).is_concat()
    }
}

impl FrozenStarlarkCmdArgs {
    pub(crate) fn is_concat(&self) -> bool {
        FieldsRef(self, PhantomData).is_concat()
    }
}

impl<'v> StarlarkCmdArgs<'v> {
    pub fn is_empty(&self) -> bool {
        self.0.borrow().items.is_empty()
    }
}

#[starlark_value(type = "cmd_args")]
impl<'v> StarlarkValue<'v> for StarlarkCmdArgs<'v> {
    fn get_methods() -> Option<&'static Methods> {
        static RES: MethodsStatic = MethodsStatic::new();
        RES.methods(cmd_args_methods)
    }

    fn provide(&'v self, demand: &mut Demand<'_, 'v>) {
        demand.provide_value::<&dyn CommandLineArgLike>(self);
    }
}

#[starlark_value(type = "cmd_args")]
impl<'v> StarlarkValue<'v> for FrozenStarlarkCmdArgs {
    fn get_methods() -> Option<&'static Methods> {
        // We return the same methods for frozen command lines, even though some of them fail,
        // so the methods remain consistent during freezing
        static RES: MethodsStatic = MethodsStatic::new();
        RES.methods(cmd_args_methods)
    }

    fn provide(&'v self, demand: &mut Demand<'_, 'v>) {
        demand.provide_value::<&dyn CommandLineArgLike>(self);
    }
}

impl<'v> AllocValue<'v> for StarlarkCmdArgs<'v> {
    fn alloc_value(self, heap: &'v Heap) -> Value<'v> {
        heap.alloc_complex(self)
    }
}

impl<'v> CommandLineArgLike for StarlarkCmdArgs<'v> {
    fn add_to_command_line(
        &self,
        cli: &mut dyn CommandLineBuilder,
        context: &mut dyn CommandLineContext,
    ) -> anyhow::Result<()> {
        FieldsRef(self.0.borrow(), PhantomData).add_to_command_line(cli, context)
    }

    fn visit_artifacts(&self, visitor: &mut dyn CommandLineArtifactVisitor) -> anyhow::Result<()> {
        FieldsRef(self.0.borrow(), PhantomData).visit_artifacts(visitor)
    }

    fn contains_arg_attr(&self) -> bool {
        FieldsRef(self.0.borrow(), PhantomData).contains_arg_attr()
    }

    fn visit_write_to_file_macros(
        &self,
        visitor: &mut dyn WriteToFileMacroVisitor,
    ) -> anyhow::Result<()> {
        FieldsRef(self.0.borrow(), PhantomData).visit_write_to_file_macros(visitor)
    }
}

impl CommandLineArgLike for FrozenStarlarkCmdArgs {
    fn add_to_command_line(
        &self,
        cli: &mut dyn CommandLineBuilder,
        context: &mut dyn CommandLineContext,
    ) -> anyhow::Result<()> {
        FieldsRef(self, PhantomData).add_to_command_line(cli, context)
    }

    fn visit_artifacts(&self, visitor: &mut dyn CommandLineArtifactVisitor) -> anyhow::Result<()> {
        FieldsRef(self, PhantomData).visit_artifacts(visitor)
    }

    fn contains_arg_attr(&self) -> bool {
        FieldsRef(self, PhantomData).contains_arg_attr()
    }

    fn visit_write_to_file_macros(
        &self,
        visitor: &mut dyn WriteToFileMacroVisitor,
    ) -> anyhow::Result<()> {
        FieldsRef(self, PhantomData).visit_write_to_file_macros(visitor)
    }
}

impl<'v> Freeze for StarlarkCmdArgs<'v> {
    type Frozen = FrozenStarlarkCmdArgs;
    fn freeze(self, freezer: &Freezer) -> anyhow::Result<Self::Frozen> {
        let StarlarkCommandLineData {
            items,
            hidden,
            options,
        } = self.0.into_inner();

        let items = ThinBoxSlice::from_iter(items.freeze(freezer)?);
        let hidden = ThinBoxSlice::from_iter(hidden.freeze(freezer)?);
        let options = options
            .try_map(|options| (*options).freeze(freezer))?
            .unwrap_or_default();

        Ok(FrozenStarlarkCmdArgs {
            items,
            hidden,
            options,
        })
    }
}

impl<'v> StarlarkCmdArgs<'v> {
    pub(crate) fn new() -> Self {
        Self::default()
    }

    pub fn try_from_value(value: Value<'v>) -> anyhow::Result<Self> {
        let mut builder = Self::new();
        builder.0.get_mut().add_value(value)?;
        Ok(builder)
    }

    fn try_from_values_with_options(
        value: &[Value<'v>],
        delimiter: Option<StringValue<'v>>,
        format: Option<StringValue<'v>>,
        prepend: Option<StringValue<'v>>,
        quote: Option<QuoteStyle>,
    ) -> anyhow::Result<Self> {
        let mut builder = StarlarkCommandLineData::default();
        if delimiter.is_some() || format.is_some() || prepend.is_some() || quote.is_some() {
            let opts = builder.options_mut();
            opts.delimiter = delimiter;
            opts.format = format;
            opts.prepend = prepend;
            opts.quote = quote;
        }
        for v in value {
            builder.add_value(*v)?;
        }
        Ok(Self(RefCell::new(builder)))
    }
}

impl<'v> StarlarkCommandLineData<'v> {
    fn add_value(&mut self, value: Value<'v>) -> anyhow::Result<()> {
        if let Some(values) = ListRef::from_value(value) {
            self.add_values(values.content())?;
        } else {
            self.items.push(CommandLineArg::try_from_value(value)?);
        }
        Ok(())
    }

    /// Check the types of a list of values, and modify `data` accordingly
    ///
    /// The values must be one of: CommandLineArgLike or a list thereof.
    fn add_values(&mut self, values: &[Value<'v>]) -> anyhow::Result<()> {
        self.items.reserve(values.len());
        for value in values {
            self.add_value(*value)?
        }
        Ok(())
    }

    /// Add values to the artifact that don't show up on the command line, but do for dependency
    fn add_hidden(&mut self, values: &[Value<'v>]) -> anyhow::Result<()> {
        for value in values {
            if let Some(values) = ListRef::from_value(*value) {
                self.add_hidden(values.content())?;
            } else {
                self.hidden.push(CommandLineArg::try_from_value(*value)?);
            }
        }
        Ok(())
    }
}

struct StarlarkCommandLineMut<'v> {
    value: Value<'v>,
    borrow: RefMut<'v, StarlarkCommandLineData<'v>>,
}

impl<'v> StarlarkTypeRepr for StarlarkCommandLineMut<'v> {
    fn starlark_type_repr() -> Ty {
        StarlarkCmdArgs::starlark_type_repr()
    }
}

impl<'v> UnpackValue<'v> for StarlarkCommandLineMut<'v> {
    fn expected() -> String {
        "command line builder; frozen command line cannot be mutated".to_owned()
    }

    fn unpack_value(value: Value<'v>) -> Option<Self> {
        value.downcast_ref::<StarlarkCmdArgs>().map(|v| Self {
            value,
            borrow: v.0.borrow_mut(),
        })
    }
}

impl<'v> AllocValue<'v> for StarlarkCommandLineMut<'v> {
    fn alloc_value(self, _heap: &'v Heap) -> Value<'v> {
        self.value
    }
}

fn cmd_args<'v>(x: Value<'v>) -> FieldsRef<'v, impl Fields<'v>> {
    if let Some(x) = x.downcast_ref::<StarlarkCmdArgs>() {
        FieldsRef(Either::Left(x.0.borrow()), PhantomData)
    } else if let Some(x) = x.downcast_ref::<FrozenStarlarkCmdArgs>() {
        FieldsRef(Either::Right(x), PhantomData)
    } else {
        unreachable!("This parameter must always be a type of command args")
    }
}

/// The `cmd_args` type is created by `cmd_args()` and is consumed by `ctx.actions.run`.
/// The type is a mutable collection of strings and `artifact` values.
/// In general, command lines, artifacts, strings, `RunInfo` and lists thereof can be added to or used to construct a `cmd_args` value.
/// All these methods operate mutably on `cmd` and return that value too.
#[starlark_module]
fn cmd_args_methods(builder: &mut MethodsBuilder) {
    /// A list of arguments to be added to the command line, which may including `cmd_args`, artifacts, strings, `RunInfo` or lists thereof.
    /// Note that this operation mutates the input `cmd_args`.
    fn add<'v>(
        mut this: StarlarkCommandLineMut<'v>,
        #[starlark(args)] args: Vec<Value<'v>>,
    ) -> anyhow::Result<StarlarkCommandLineMut<'v>> {
        this.borrow.add_values(&args)?;
        Ok(this)
    }

    /// Things to add to the command line which do not show up but are added as dependencies.
    /// The values can be anything normally permissible to pass to `add`.
    ///
    /// Typically used if the command you are running implicitly depends on files that are not
    /// passed on the command line, e.g. headers in the case of a C compilation.
    fn hidden<'v>(
        mut this: StarlarkCommandLineMut<'v>,
        #[starlark(args)] args: Vec<Value<'v>>,
    ) -> anyhow::Result<StarlarkCommandLineMut<'v>> {
        this.borrow.add_hidden(&args)?;
        Ok(this)
    }

    /// Causes this `cmd_args` to have no declared dependencies. Allows you to reference the path of an artifact _without_
    /// introducing dependencies on it.
    ///
    /// As an example where this can be useful, consider passing a dependency that is only accessed at runtime, but whose path
    /// must be baked into the binary. As an example:
    ///
    /// ```python
    /// resources = cmd_args(resource_file, format = "-DFOO={}").ignore_artifacts()
    /// ctx.actions.run(cmd_args("gcc", "-c", source_file, resources))
    /// ```
    ///
    /// Note that `ignore_artifacts` sets all artifacts referenced by this `cmd_args` to be ignored, including those added afterwards,
    /// so generally create a special `cmd_args` and scope it quite tightly.
    ///
    /// If you actually do use the inputs referenced by this command, you will either error out due to missing dependencies (if running actions remotely)
    /// or have untracked dependencies that will fail to rebuild when it should.
    fn ignore_artifacts<'v>(
        mut this: StarlarkCommandLineMut<'v>,
    ) -> anyhow::Result<StarlarkCommandLineMut<'v>> {
        this.borrow.options_mut().ignore_artifacts = true;
        Ok(this)
    }

    /// Make all artifact paths relative to a given location. Typically used when the command
    /// you are running changes directory.
    ///
    /// ```python
    /// dir = symlinked_dir(...)
    /// script = [
    ///     cmd_args(cmd_args(dir, format = "cd {}"),
    ///     original_script.relative_to(dir)
    /// ]
    /// ```
    fn relative_to<'v>(
        mut this: StarlarkCommandLineMut<'v>,
        #[starlark(require = pos)] directory: ValueOf<'v, RelativeOrigin<'v>>,
        #[starlark(require = named, default = 0i32)] parent: i32,
    ) -> anyhow::Result<StarlarkCommandLineMut<'v>> {
        if parent < 0 {
            return Err(ValueError::IncorrectParameterTypeNamed("parent".to_owned()).into());
        }
        this.borrow.options_mut().relative_to = Some((directory.value, parent as usize));
        Ok(this)
    }

    /// Adds a prefix to the end of start artifact. Often used if you have a `$ROOT` variable
    /// in a shell script and want to use it to make files absolute.
    ///
    /// ```python
    /// cmd_args(script).absolute_prefix("$ROOT/")
    /// ```
    fn absolute_prefix<'v>(
        mut this: StarlarkCommandLineMut<'v>,
        prefix: StringValue<'v>,
    ) -> anyhow::Result<StarlarkCommandLineMut<'v>> {
        this.borrow.options_mut().absolute_prefix = Some(prefix);
        Ok(this)
    }

    /// Adds a suffix to the end of every artifact. Useful in conjunction with `absolute_prefix` to wrap
    /// artifacts in function calls.
    ///
    /// ```python
    /// cmd_args(script).absolute_prefix("call(").absolute_suffix(")")
    /// ```
    fn absolute_suffix<'v>(
        mut this: StarlarkCommandLineMut<'v>,
        suffix: StringValue<'v>,
    ) -> anyhow::Result<StarlarkCommandLineMut<'v>> {
        this.borrow.options_mut().absolute_suffix = Some(suffix);
        Ok(this)
    }

    /// For all the artifacts listed in this `cmd_args`, use their parent directory.
    ///
    /// Typically used when the file name is passed one way, and the directory another,
    /// e.g. `cmd_args(artifact, format="-L{}").parent()`.
    fn parent<'v>(
        mut this: StarlarkCommandLineMut<'v>,
        #[starlark(require = pos, default = 1u32)] count: u32,
    ) -> anyhow::Result<StarlarkCommandLineMut<'v>> {
        this.borrow.options_mut().parent += count;
        Ok(this)
    }

    /// Replaces all parts matching pattern regular expression in each argument with replacement string.
    /// Several replacements can be added by multiple replace_regex calls.
    fn replace_regex<'v>(
        mut this: StarlarkCommandLineMut<'v>,
        pattern: StringValue<'v>,
        replacement: StringValue<'v>,
    ) -> anyhow::Result<StarlarkCommandLineMut<'v>> {
        let options = this.borrow.options_mut();
        // Validate that regex is valid
        Regex::new(pattern.as_str())?;
        if let Some(replacements) = &mut options.replacements {
            replacements.push((pattern, replacement));
        } else {
            options.replacements = Some(Box::new(vec![(pattern, replacement)]));
        }
        Ok(this)
    }

    /// Returns a copy of the `cmd_args` such that any modifications to the original or the returned value will not impact each other.
    /// Note that this is a shallow copy, so any inner `cmd_args` can still be modified.
    fn copy<'v>(this: Value<'v>) -> anyhow::Result<StarlarkCmdArgs<'v>> {
        Ok(cmd_args(this).copy())
    }

    /// Collect all the inputs (including hidden) referenced by this command line.
    /// The output can be compared for equality and have its `len` requested to see whether
    /// there are any inputs, but is otherwise mostly opaque.
    #[starlark(attribute)]
    fn inputs<'v>(this: Value<'v>) -> anyhow::Result<StarlarkCommandLineInputs> {
        let mut visitor = SimpleCommandLineArtifactVisitor::new();
        cmd_args(this).visit_artifacts(&mut visitor)?;
        Ok(StarlarkCommandLineInputs {
            inputs: visitor.inputs,
        })
    }

    /// Collect all the outputs (including hidden) referenced by this command line.
    #[starlark(attribute)]
    fn outputs<'v>(
        this: Value<'v>,
        heap: &Heap,
    ) -> anyhow::Result<Vec<StarlarkOutputArtifact<'v>>> {
        let mut visitor = SimpleCommandLineArtifactVisitor::new();
        cmd_args(this).visit_artifacts(&mut visitor)?;
        let mut outputs = Vec::with_capacity(visitor.outputs.len());
        for out in visitor.outputs {
            let declared = heap.alloc_typed(StarlarkDeclaredArtifact::new(
                None,
                (*out).dupe(),
                AssociatedArtifacts::new(),
            ));
            outputs.push(StarlarkOutputArtifact::new(declared));
        }
        Ok(outputs)
    }
}

#[starlark_module]
pub fn register_cmd_args(builder: &mut GlobalsBuilder) {
    #[starlark(as_type = FrozenStarlarkCmdArgs)]
    /// The `cmd_args` type is created by this function and is consumed by `ctx.actions.run`.
    /// The type is a mutable collection of strings and artifact values.
    /// In general, command lines, artifacts, strings, `RunInfo` and lists thereof can be added to or used to construct a `cmd_args` value.
    ///
    /// The arguments are:
    ///
    /// * `*args` - a list of things to add to the command line, each of which must be coercible to a command line. Further items can be added with `cmd.add`.
    /// * `format` - a string that provides a format to apply to the argument. for example, `cmd_args(x, format="--args={}")` would prepend `--args=` before `x`, or if `x` was a list, before each element in `x`.
    /// * `delimiter` - added between arguments to join them together. For example, `cmd_args(["--args=",x], delimiter="")` would produce a single argument to the underlying tool.
    /// * `prepend` - added as a separate argument before each argument.
    /// * `quote` - indicates whether quoting is to be applied to each argument. The only current valid value is `"shell"`.
    fn cmd_args<'v>(
        #[starlark(args)] args: Vec<Value<'v>>,
        delimiter: Option<StringValue<'v>>,
        format: Option<StringValue<'v>>,
        prepend: Option<StringValue<'v>>,
        quote: Option<&str>,
    ) -> anyhow::Result<StarlarkCmdArgs<'v>> {
        StarlarkCmdArgs::try_from_values_with_options(
            &args,
            delimiter,
            format,
            prepend,
            quote.try_map(QuoteStyle::parse)?,
        )
    }
}

/// A wrapper for a [StarlarkCmdArgs]'s inputs. This is an opaque type that only allows
/// debug-printing and querying the length to tell if any inputs exist.
#[derive(Debug, PartialEq, ProvidesStaticType, NoSerialize, Allocative)]
pub struct StarlarkCommandLineInputs {
    pub inputs: IndexSet<ArtifactGroup>,
}

starlark_simple_value!(StarlarkCommandLineInputs);

impl Display for StarlarkCommandLineInputs {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let mut comma = commas();
        write!(f, "command_line_inputs(")?;
        for v in self.inputs.iter() {
            comma(f)?;
            Display::fmt(v, f)?;
        }
        write!(f, ")")
    }
}

#[starlark_value(type = "command_line_inputs")]
impl<'v> StarlarkValue<'v> for StarlarkCommandLineInputs {
    fn length(&self) -> anyhow::Result<i32> {
        Ok(self.inputs.len().try_into()?)
    }

    fn equals(&self, other: Value<'v>) -> anyhow::Result<bool> {
        if let Some(other) = other.downcast_ref::<Self>() {
            Ok(self.inputs == other.inputs)
        } else {
            Ok(false)
        }
    }
}
