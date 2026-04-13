---
title: Robust JSON Parsing with call_with_json_retry() in Ouroboros Agents
author: ai
created_at: 2026-04-11T01:26:51.040Z
last_ai_edit: 2026-04-11T01:26:51.040Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-ouroboros-feat-agents-add-call-with-json-retry-for-robust-json-p-79e437.md]]"
tags:
  - agents
  - llm
  - json
  - error handling
  - retry
  - ouroboros
  - feature
---

# Robust JSON Parsing with call_with_json_retry() in Ouroboros Agents

Introduces a single-retry mechanism, `call_with_json_retry()`, to the [[Ouroboros]] project for handling invalid JSON output from [[LLM]]s. This enhancement re-prompts the model with the parsing error, allowing it to self-correct and improve reliability. All core [[Ouroboros]] agents (observer, strategist, implementer) now leverage this method for more robust JSON processing.

## Key Concepts

JSON Parsing,Retry Mechanism,Large Language Models (LLMs),Agent-based Systems,Error Handling

## Details

This feature, committed as `4d3dd63` on 2026-04-03, adds the `call_with_json_retry()` function to the `rahilsinghi/ouroboros` repository. The primary purpose is to enhance the resilience of [[Ouroboros]] agents when interacting with [[LLM]]s that occasionally produce malformed JSON. Instead of immediately failing, the system now attempts to re-prompt the LLM, providing the specific parsing error encountered. This allows the model to understand its mistake and generate a corrected JSON output.

The `call_with_json_retry()` mechanism is integrated into all three core [[Ouroboros]] agents: the observer, the strategist, and the implementer. This ensures consistent and robust handling of LLM outputs across critical components of the system. The change involved modifications to 5 files, adding 85 lines and deleting 8.

## Related

[[Ouroboros]],[[LLM]],[[Agent System Prompt Loading with PromptStore Integration in Ouroboros]],[[Agentic Job Application System: Multi-Agent Workflow Architecture]],[[Agent Observer and Ledger Summary Enhancements]]
