/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under both the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree and the Apache
 * License, Version 2.0 found in the LICENSE-APACHE file in the root directory
 * of this source tree.
 */

use buck2_util::late_binding::LateBinding;
use starlark::values::FrozenValue;

/// `rule()` value `impl` field.
pub static FROZEN_RULE_GET_IMPL: LateBinding<fn(FrozenValue) -> anyhow::Result<FrozenValue>> =
    LateBinding::new("FROZEN_RULE_GET_IMPL");