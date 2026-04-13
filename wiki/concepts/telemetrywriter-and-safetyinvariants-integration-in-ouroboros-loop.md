---
title: TelemetryWriter and SafetyInvariants Integration in Ouroboros Loop
author: ai
created_at: 2026-04-10T19:11:15.330Z
last_ai_edit: 2026-04-10T19:11:15.330Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-ouroboros-feat-loop-wire-telemetrywriter-and-safetyinvariants-into-3242eb.md]]"
tags:
  - telemetry
  - safety
  - ouroboros
  - feature
  - development
  - invariants
  - loop
  - cognitive traces
  - commit
---

# TelemetryWriter and SafetyInvariants Integration in Ouroboros Loop

This commit integrates `TelemetryWriter` and `SafetyInvariants` into the Ouroboros inner loop. `TelemetryWriter` captures per-iteration cognitive traces for archiving, while `SafetyInvariants` checks critical conditions before merging, leading to a `KILLED` outcome upon violation. This ensures comprehensive telemetry across all possible execution paths.

## Key Concepts

TelemetryWriter,SafetyInvariants,Ouroboros inner loop,Cognitive traces,Per-agent token capture (obs, strat, impl),KILLED outcome,Merge gate

## Details

This feature commit, identified by SHA `4c8d6b2` in the `rahilsinghi/ouroboros` repository, integrates two critical components, `TelemetryWriter` and `SafetyInvariants`, directly into the Ouroboros project's inner loop. Authored by Rahil Singhi on 2026-04-04, this change involved 124 additions and 1 deletion across a single file.

Key aspects of this integration include:

*   **TelemetryWriter Functionality:** The `TelemetryWriter` is responsible for capturing per-iteration cognitive traces. These traces, which include per-agent tokens such as observations (`obs`), strategies (`strat`), and implementations (`impl`), are recorded *before* the cost tracking reset. The collected telemetry is archived in the `.ouroboros/archive/` directory.
*   **SafetyInvariants Enforcement:** `SafetyInvariants` are introduced to perform crucial checks against predefined conditions. These checks, defined in `conftest.py` and root configurations, are executed *before* any merge gate.
*   **Invariant Violation Handling:** If an invariant violation is detected by `SafetyInvariants`, the current iteration or process results in a `KILLED` outcome, preventing potentially unsafe states from propagating.
*   **Comprehensive Telemetry Coverage:** The system is designed to ensure that telemetry data is consistently written across all possible code paths and outcomes, including `MERGED`, `ROLLED_BACK`, `KILLED`, and `ABANDONED` states. This provides a complete audit trail for understanding system behavior under various conditions.

This commit was co-authored by Claude Opus 4.6.

## Related

[[Ouroboros Project]],[[Telemetry]],[[Invariants]],[[Cognitive Traces]],[[Software Development Loop]],[[Code Merging Process]]
