---
title: "Fix: Mediator Must Call finalize_trip Tool Instead of Generating Prose"
author: ai
created_at: 2026-04-12T18:05:10.109Z
last_ai_edit: 2026-04-12T18:05:10.109Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-fix-mediator-must-call-finalize-trip-tool-not-describe-trip-ed409d.md]]"
tags:
  - bugfix
  - llm
  - flock
  - mediator
  - tool-use
  - system-prompt
  - gemini
  - debug
---

# Fix: Mediator Must Call finalize_trip Tool Instead of Generating Prose

This commit addresses a bug in the Flock project where the mediator agent was generating free-form text descriptions of a trip instead of invoking the `finalize_trip()` tool. The fix involves explicitly instructing the mediator's system prompt to use `finalize_trip()` as a final action and `post_mediator_proposal()` at each step, ensuring structured tool calls. Additionally, debug scripts `check-session.ts` and `check-trip-decision.ts` were added.

## Key Concepts

[[finalize_trip]] tool,[[post_mediator_proposal]] tool,[[Mediator System Prompt]],[[Gemini]] (LLM),[[Debug Scripts]],[[Tool Use]]

## Details

The `rahilsinghi/Flock` repository, commit `305dce6` by [[Rahil Singhi]] (co-authored by [[Claude Opus 4.6 (1M context)]]) on 2026-03-21, implemented a critical fix to ensure proper tool utilization by the mediator agent. Previously, the mediator, powered by [[Gemini]], would write the trip details as prose, bypassing the intended structured `finalize_trip()` tool. This behavior was corrected by adding explicit instructions to the mediator's system prompt.

The system prompt now mandates the mediator to:

1.  Call `finalize_trip()` as its final action.
2.  Call `post_mediator_proposal()` at each intermediate step.

This change, involving 3 files, 77 additions, and 2 deletions, ensures that the agent adheres to the defined workflow and leverages the structured tools for trip finalization. The commit also introduced new debug scripts, `check-session.ts` and `check-trip-decision.ts`, to aid in diagnosing similar issues.

## Related

[[Flock]],[[Rahil Singhi]],[[Claude]],[[Agent System Prompt Loading with PromptStore Integration in Ouroboros]],[[askNYC: Model Update to Gemini 2.5 Flash Native Audio]],[[Aishwarya Session Prompt Update – Flock Backend State Snapshot]],[[API Fix: Dynamic LLM Provider/Model Reporting in Synthesis Response]]
