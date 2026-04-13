---
title: Integrate TelemetryWriter and SafetyInvariants into Ouroboros Loop
author: ai
created_at: 2026-04-12T21:30:23.023Z
last_ai_edit: 2026-04-12T21:30:23.023Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-ouroboros-feat-loop-wire-telemetrywriter-and-safetyinvariants-into-3242eb.md]]"
tags:
  - ouroboros
  - telemetry
  - safety
  - invariants
  - agent
  - logging
  - testing
  - development
  - ai_assisted_development
---

# Integrate TelemetryWriter and SafetyInvariants into Ouroboros Loop

This update to the [[Ouroboros]] project integrates a `TelemetryWriter` to capture per-iteration cognitive traces and `SafetyInvariants` for critical validation checks within the inner loop. It ensures detailed logging of agent activities across all outcomes and terminates the process immediately if any invariant violations are detected.

## Key Concepts

TelemetryWriter,SafetyInvariants,Cognitive Traces,Agent Token Capture,KILLED Outcome,MERGED, ROLLED_BACK, ABANDONED Outcomes

## Details

This feature enhancement wires the `TelemetryWriter` and `SafetyInvariants` directly into the inner loop of the [[Ouroboros]] project. The `TelemetryWriter` is responsible for capturing detailed cognitive traces for each iteration of an agent's operation. These traces, including per-agent token usage for observation, strategy, and implementation, are saved to the `.ouroboros/archive/` directory *before* any cost tracking resets, ensuring accurate and comprehensive data collection.

Simultaneously, `SafetyInvariants` are checked during each iteration, leveraging `[[conftest.py]]` and root configurations. These invariants act as a crucial 'merge gate' to prevent the system from proceeding with invalid or undesirable states. If an invariant violation occurs, the process is immediately terminated with a `KILLED` outcome.

Crucially, telemetry data is written across all possible execution paths: `MERGED` (successful completion), `ROLLED_BACK` (changes reverted), `KILLED` (invariant violation), and `ABANDONED` (process halted for other reasons). This guarantees a complete audit trail for debugging, analysis, and understanding agent behavior. This work was co-authored with [[Claude Opus 4.6]].

## Related

[[Ouroboros]],[[Agent System Prompt Loading with PromptStore Integration in Ouroboros]],[[Benchmark Task Definitions and BenchmarkGenerator in Ouroboros]],[[CLAUDE.md for Session Persistence in Ouroboros]],[[Adding Docstring to RegressionScorer (Ouroboros)]],[[Adding Docstrings to CorrectnessScorer in Ouroboros]],[[Adding Docstrings to EfficiencyScorer in Ouroboros]],[[Adding Docstrings to Ouroboros Types for Improved Coverage]],[[call_with_json_retry() for Robust LLM JSON Parsing in Ouroboros]],[[conftest.py]],[[Claude Opus 4.6]]
