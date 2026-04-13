---
title: Robust JSON Parsing with `call_with_json_retry()` in Ouroboros Agents
author: ai
created_at: 2026-04-10T19:19:50.238Z
last_ai_edit: 2026-04-10T19:19:50.238Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-ouroboros-feat-agents-add-call-with-json-retry-for-robust-json-p-79e437.md]]"
tags:
  - ouroboros
  - agents
  - llm
  - json
  - parsing
  - retry
  - error handling
  - robustness
  - development
  - feature
---

# Robust JSON Parsing with `call_with_json_retry()` in Ouroboros Agents

This feature introduces a robust JSON parsing mechanism, `call_with_json_retry()`, within the Ouroboros project. It implements a single-retry logic for Large Language Models (LLMs) that produce invalid JSON, re-prompting the model with the error to facilitate self-correction. This enhancement is integrated across all three core agents: Observer, Strategist, and Implementer.

## Key Concepts

`call_with_json_retry()`,LLM (Large Language Model),JSON Parsing,Retry Mechanism,Agent-based Systems,Observer Agent,Strategist Agent,Implementer Agent

## Details

The `call_with_json_retry()` function was introduced in the `rahilsinghi/ouroboros` repository (SHA: `4d3dd63`, dated 2026-04-03) by Rahil Singhi. Its primary purpose is to enhance the robustness of interactions with Large Language Models (LLMs) when they are expected to return data in JSON format.

Often, LLMs may produce malformed or invalid JSON, leading to parsing errors in downstream applications. This new mechanism addresses this by:
1.  **Initial Attempt**: Calling the LLM for a JSON response.
2.  **Error Detection**: If the initial response results in a JSON parsing error.
3.  **Single Retry**: The system re-prompts the LLM. Crucially, the parse error message is included in the re-prompt, guiding the LLM to understand and correct its previous output.

This robust parsing logic has been integrated into all three core agents within the [[Ouroboros Project]]: the [[Observer Agent]], the [[Strategist Agent]], and the [[Implementer Agent]]. This ensures more reliable operation across critical components that rely on structured data from LLMs.

The change involved 5 file modifications, adding 85 lines of code and deleting 8. This feature was co-authored by Claude Opus 4.6.

## Related

[[Ouroboros Project]],[[Agents]],[[Large Language Models]],[[JSON Parsing]],[[Observer Agent]],[[Strategist Agent]],[[Implementer Agent]]
