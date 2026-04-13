---
title: Robust LLM JSON Parsing with `call_with_json_retry()` in Ouroboros
author: ai
created_at: 2026-04-12T18:02:11.214Z
last_ai_edit: 2026-04-12T18:02:11.214Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-ouroboros-feat-agents-add-call-with-json-retry-for-robust-json-p-79e437.md]]"
tags:
  - ouroboros
  - llm
  - json parsing
  - error handling
  - retry mechanism
  - agents
  - python
  - feature
---

# Robust LLM JSON Parsing with `call_with_json_retry()` in Ouroboros

This feature introduces `call_with_json_retry()` to the [[Ouroboros]] project, providing a robust mechanism for parsing JSON output from Large Language Models (LLMs). It implements a single-retry logic that re-prompts the model with parsing errors, allowing it to self-correct invalid JSON responses. This enhancement is integrated across the observer, strategist, and implementer agents.

## Key Concepts

[[LLM]] (Large Language Model) interaction,JSON parsing,Error handling strategies,Retry mechanisms,Agent architecture

## Details

The `call_with_json_retry()` function was added to the [[Ouroboros]] repository (SHA: 4d3dd63, dated 2026-04-03) to address issues arising from LLMs producing malformed JSON. This utility implements a single-retry logic: if the initial attempt to parse the LLM's JSON output fails, the model is re-prompted. Crucially, the re-prompt includes the specific parse error message, guiding the LLM to correct its output on the subsequent attempt.

This robust parsing mechanism has been integrated into all three core agents within the [[Ouroboros]] system: the observer, strategist, and implementer. This ensures that downstream processes relying on structured JSON data from these agents can operate more reliably, minimizing failures due to invalid LLM responses.

Key changes include 85 additions and 8 deletions across 5 files, reflecting the implementation of this new utility and its integration into existing agent workflows. The co-authorship by Claude Opus 4.6 highlights the collaborative, AI-assisted development process.

## Related

[[Ouroboros]],[[Agent System Prompt Loading with PromptStore Integration in Ouroboros]],[[Agent System Prompt Loading with PromptStore Integration]],[[Commit 6f33638: Robust Error Handling and Safety Path Awareness in Ouroboros Loop]],[[CLAUDE.md Update: Phase 1.5 Results in Ouroboros]]
