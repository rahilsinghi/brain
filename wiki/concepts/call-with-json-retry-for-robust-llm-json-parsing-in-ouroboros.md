---
title: call_with_json_retry() for Robust LLM JSON Parsing in Ouroboros
author: ai
created_at: 2026-04-11T01:29:51.630Z
last_ai_edit: 2026-04-11T01:29:51.630Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-ouroboros-feat-agents-add-call-with-json-retry-for-robust-json-p-79e437.md]]"
tags:
  - json
  - parsing
  - llm
  - ouroboros
  - agents
  - error handling
  - retry
  - development
  - feature
---

# call_with_json_retry() for Robust LLM JSON Parsing in Ouroboros

This feature introduces `call_with_json_retry()` in the `ouroboros` project, implementing a single-retry mechanism to handle invalid JSON output from Large Language Models (LLMs). When a parsing error occurs, the LLM is re-prompted with the specific error to allow it to correct its output. This robust parsing method is now utilized by all three core agents: observer, strategist, and implementer.

## Key Concepts

JSON Parsing,LLM (Large Language Model),Retry Mechanism,Error Handling,[[Agent System]]

## Details

The `call_with_json_retry()` function was added to the `rahilsinghi/ouroboros` repository (SHA: `4d3dd63`) on April 3, 2026. Its primary purpose is to enhance the robustness of interactions with LLMs, particularly when they are expected to produce JSON-formatted output.

**Mechanism:**
1.  An initial call is made to the LLM, expecting JSON output.
2.  If the parsing of the LLM's response fails (i.e., it produces invalid JSON), a single retry attempt is initiated.
3.  For this retry, the LLM is re-prompted, and crucially, the specific parse error encountered is included in the new prompt. This allows the LLM to understand *what* went wrong and attempt to self-correct its output.

**Application:**
This retry mechanism has been integrated into the core agents of the `ouroboros` project:
*   [[Agent Observer and Ledger Summary Enhancements|Observer agent]]
*   Strategist agent
*   Implementer agent

By ensuring that these agents can reliably parse LLM responses, `call_with_json_retry()` significantly improves the stability and fault tolerance of the overall agentic workflow.

## Related

[[Ouroboros]],[[LLM]],[[Agent Observer and Ledger Summary Enhancements]],[[Agent System Prompt Loading with PromptStore Integration in Ouroboros]],[[Agentic Job Application System: Multi-Agent Workflow Architecture]]
