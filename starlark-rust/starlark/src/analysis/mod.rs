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

//! Linter.

use std::collections::HashSet;

pub use lint_message::LintMessage;
pub use types::EvalMessage;
pub use types::EvalSeverity;
pub use types::Lint;

use crate::analysis::types::LintT;
use crate::syntax::AstModule;

mod dubious;
mod find_call_name;
mod flow;
mod incompatible;
mod lint_message;
mod names;
mod performance;
mod types;
mod underscore;

impl AstModule {
    /// Run a static linter over the module. If the complete set of global variables are known
    /// they can be passed as the `globals` argument, resulting in name-resolution lint errors.
    /// The precise checks run by the linter are not considered stable between versions.
    pub fn lint(&self, globals: Option<&HashSet<String>>) -> Vec<Lint> {
        let mut res = Vec::new();
        res.extend(flow::lint(self).into_iter().map(LintT::erase));
        res.extend(incompatible::lint(self).into_iter().map(LintT::erase));
        res.extend(dubious::lint(self).into_iter().map(LintT::erase));
        res.extend(names::lint(self, globals).into_iter().map(LintT::erase));
        res.extend(underscore::lint(self).into_iter().map(LintT::erase));
        res.extend(performance::lint(self).into_iter().map(LintT::erase));
        res
    }
}
