---
title: "Flock: Mediator AI Fix for Structured Tool Use (SHA 305dce6)"
author: ai
created_at: 2026-04-10T17:32:24.064Z
last_ai_edit: 2026-04-10T17:32:24.064Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-fix-mediator-must-call-finalize-trip-tool-not-describe-trip-ed409d.md]]"
tags:
  - fix
  - mediator
  - llm
  - gemini
  - system-prompt
  - tool-use
  - flock
  - development
  - debugging
  - ai-agent
  - function-calling
---

# Flock: Mediator AI Fix for Structured Tool Use (SHA 305dce6)

This commit addresses a critical issue in the Flock project where the Gemini-powered mediator AI failed to utilize structured tools for trip finalization, instead generating prose. The fix involved adding explicit instructions to the mediator's system prompt, mandating the use of `finalize_trip()` and `post_mediator_proposal()` tools. This ensures the AI adheres to predefined interaction protocols.

## Key Concepts

[[AI Mediator]],[[System Prompt Engineering]],[[Large Language Model Tool Use]],[[Gemini (LLM)]]

## Details

This commit (SHA: `305dce6`), authored by Rahil Singhi on 2026-03-21, targets a specific problem within the `rahilsinghi/Flock` project. The mediator AI, which leverages the Gemini LLM, was observed generating trip descriptions as free-form prose. This behavior bypassed the intended structured output provided by the system's tools, hindering automated processing and finalization of trip plans.

To rectify this, explicit instructions were incorporated into the mediator's system prompt. These instructions are designed to compel the AI to:
*   Call the `finalize_trip()` function as its final action to complete the trip planning process.
*   Call the `post_mediator_proposal()` function at each intermediate step to maintain structured communication throughout the planning lifecycle.

This modification ensures that the Gemini model consistently adheres to the predefined tool-use protocols, thereby maintaining the system's integrity and intended functionality. The commit involved changes to 3 files, with 77 additions and 2 deletions.

Additionally, this commit introduces two new debug scripts: `check-session.ts` and `check-trip-decision.ts`. These scripts are intended to assist in monitoring and troubleshooting session management and trip decision-making logic within the system. The changes were co-authored by Claude Opus 4.6.

## Related

[[Flock (Project)]],[[Rahil Singhi]],[[Gemini (LLM)]],[[System Prompts]],[[Function Calling]],[[Claude Opus 4.6]]
