---
title: "Ouroboros: TelemetryWriter and SafetyInvariants Integration"
author: ai
created_at: 2026-04-12T17:29:53.890Z
last_ai_edit: 2026-04-12T17:29:53.890Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-ouroboros-feat-loop-wire-telemetrywriter-and-safetyinvariants-into-3242eb.md]]"
tags:
  - ouroboros
  - telemetry
  - safety
  - invariants
  - loop
  - feature
  - development
  - testing
---

# Ouroboros: TelemetryWriter and SafetyInvariants Integration

This feature integrates `TelemetryWriter` and `SafetyInvariants` into the inner loop of the [[Ouroboros]] project. The `TelemetryWriter` captures detailed per-iteration cognitive traces and token usage, while `SafetyInvariants` perform critical checks to prevent incorrect merges, resulting in a 'KILLED' outcome for violations. Telemetry is consistently recorded across all loop outcomes.

## Key Concepts

[[Ouroboros]],[[TelemetryWriter]],[[SafetyInvariants]],[[Ouroboros Loop]],[[Cognitive Traces]],[[Token Capture]],Outcome States (MERGED, ROLLED_BACK, KILLED, ABANDONED)

## Details

This commit (SHA: `4c8d6b2`, authored by Rahil Singhi on 2026-04-04) for the `rahilsinghi/ouroboros` repository introduces a significant enhancement to the project's core loop, involving one file change with 124 additions and 1 deletion. The key components integrated are:

*   **TelemetryWriter**: This component is responsible for capturing per-iteration cognitive traces. These traces, which include per-agent token capture for observations, strategies, and implementations, are stored in `.ouroboros/archive/` directories. The token capture occurs before any cost tracking reset, ensuring a complete record of LLM usage.

*   **SafetyInvariants**: Checks defined by `SafetyInvariants` (configured via `conftest.py` and root configurations) are now performed before the merge gate. Any violation of these invariants leads to a `KILLED` outcome for the current iteration, preventing potentially harmful or incorrect merges.

Crucially, telemetry data, including cognitive traces and token usage, is written in *all* possible code paths or outcome states of the loop: `MERGED` (successful completion), `ROLLED_BACK` (reverted changes), `KILLED` (invariant violation), and `ABANDONED` (other failures). This ensures comprehensive debugging and analysis capabilities for the [[Ouroboros Loop]].

## Related

[[Ouroboros]],[[Ouroboros Loop]],[[TelemetryWriter]],[[SafetyInvariants]],[[Cognitive Traces]],[[Token Capture]],[[Cost Tracking]],[[conftest.py]],[[Ouroboros Loop Outcome States]],[[Robust Error Handling and Safety Path Awareness in Ouroboros Loop]]
