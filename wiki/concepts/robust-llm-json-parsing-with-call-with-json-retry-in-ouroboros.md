---
title: Robust LLM JSON Parsing with `call_with_json_retry()` in Ouroboros
author: ai
created_at: 2026-04-12T22:03:00.655Z
last_ai_edit: 2026-04-12T22:03:00.655Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-ouroboros-feat-agents-add-call-with-json-retry-for-robust-json-p-79e437.md]]"
tags:
  - llm
  - json
  - error handling
  - retry
  - ouroboros
  - agents
  - python
  - reliability
---

# Robust LLM JSON Parsing with `call_with_json_retry()` in Ouroboros

This feature introduces a `call_with_json_retry()` mechanism within the [[Ouroboros]] project to enhance the robustness of [[LLM]]-generated [[JSON parsing]]. It provides a single-retry logic that re-prompts the model with specific parse errors, allowing it to correct its output. All three core agents—the observer, strategist, and implementer—now leverage this method for improved reliability.

## Key Concepts

`call_with_json_retry()`,[[LLM]] (Large Language Model),[[JSON Parsing]],[[Error Handling]],[[Retry Mechanism]],[[Ouroboros Agents]] (Observer, Strategist, Implementer)

## Details

The `call_with_json_retry()` function, implemented in the `rahilsinghi/ouroboros` repository (SHA: `4d3dd63`, dated 2026-04-03T14:59:25Z), addresses the challenge of [[Large Language Model|LLM]]s sometimes producing malformed [[JSON]] output.

This utility function provides a robust single-retry mechanism. When an [[LLM]] call is made and the resulting output fails to parse as valid [[JSON]], the function captures the specific parse error. It then re-prompts the [[LLM]], including the original error message, to guide the model in correcting its previous invalid output.

This enhancement significantly improves the stability and reliability of [[Ouroboros]]'s agent-based workflows. Specifically, the following core agents have been updated to utilize `call_with_json_retry()`:

*   **Observer Agent**: Responsible for monitoring and extracting information.
*   **Strategist Agent**: Handles decision-making and planning.
*   **Implementer Agent**: Executes actions based on strategic directives.

By integrating this retry logic, the system can gracefully handle transient [[JSON parsing]] errors, reducing the need for manual intervention and improving the overall robustness of the agent-driven processes. The development involved changes across 5 files, with 85 additions and 8 deletions.

_Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>_

## Related

[[call_with_json_retry() for Robust LLM JSON Parsing in Ouroboros]],[[Ouroboros]],[[LLM]],[[JSON]],[[Agent System Prompt Loading with PromptStore Integration in Ouroboros]],[[Agent Observer and Ledger Summary Enhancements]]
