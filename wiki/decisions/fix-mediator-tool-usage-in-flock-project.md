---
title: "Fix: Mediator Tool Usage in Flock Project"
author: ai
created_at: 2026-04-12T22:05:56.845Z
last_ai_edit: 2026-04-12T22:05:56.845Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-fix-mediator-must-call-finalize-trip-tool-not-describe-trip-ed409d.md]]"
tags:
  - bugfix
  - flock
  - mediator
  - systemprompt
  - toolusage
  - gemini
  - debugging
---

# Fix: Mediator Tool Usage in Flock Project

This commit addresses an issue in the Flock project where the mediator agent was describing trip details in prose instead of utilizing the `finalize_trip()` tool as its final action. The fix involves explicit instructions in the mediator's system prompt to ensure correct tool invocation and adds debugging scripts for session and trip decision checking.

## Key Concepts

[[Flock]] project,Mediator agent,System prompt engineering,Tool usage (finalize_trip, post_mediator_proposal),Gemini LLM behavior,Debugging scripts

## Details

The commit `305dce6` in the [[rahilsinghi/Flock]] repository, authored by [[Rahil Singhi]] on 2026-03-21, implements a critical fix concerning the mediator agent's interaction with trip management tools. Previously, the mediator, when powered by [[Gemini]] (specifically, as indicated by the co-author [[Claude Opus 4.6]]), would incorrectly describe the trip in natural language prose rather than executing the `finalize_trip()` tool, which is designed for structured trip finalization.

The primary resolution involved adding explicit instructions to the mediator's system prompt. These instructions now mandate that the `finalize_trip()` function be called as the final action and `post_mediator_proposal()` be used at each step of the process. This ensures that the agent follows the intended structured workflow for trip generation and management.

Additionally, the commit introduces two new debugging scripts: `check-session.ts` and `check-trip-decision.ts`. These scripts facilitate monitoring and validating the state of sessions and trip decisions, aiding in future development and troubleshooting within the [[Flock]] project.

## Related

[[Flock]],[[rahilsinghi/Flock]],[[Gemini]],[[Claude Opus 4.6]],[[Rahil Singhi]],[[System prompt engineering]]
