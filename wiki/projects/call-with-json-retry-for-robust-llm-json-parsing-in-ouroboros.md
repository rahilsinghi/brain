---
title: call_with_json_retry() for Robust LLM JSON Parsing in Ouroboros
author: ai
created_at: 2026-04-13T16:11:16.700Z
last_ai_edit: 2026-04-13T16:11:16.700Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-ouroboros-feat-agents-add-call-with-json-retry-for-robust-json-p-79e437.md]]"
tags:
  - llm
  - json
  - parsing
  - retry
  - ouroboros
  - agents
  - error handling
  - robustness
---

# call_with_json_retry() for Robust LLM JSON Parsing in Ouroboros

This feature introduces a robust retry mechanism, `call_with_json_retry()`, to the `ouroboros` project, specifically designed for handling invalid JSON outputs from Large Language Models (LLMs). It automatically re-prompts the model with the parsing error, allowing it to correct its output. This mechanism is now integrated across the Observer, Strategist, and Implementer agents to enhance reliability.

## Key Concepts

[[LLM]] (Large Language Model),[[JSON Parsing]],[[Retry Mechanism]],[[Agentic Systems]],[[Ouroboros Project]]

## Details

The `ouroboros` project has implemented `call_with_json_retry()` to address a common challenge with Large Language Models (LLMs): their occasional tendency to produce malformed or invalid JSON responses. This new utility provides a single-retry mechanism, crucial for maintaining the stability and reliability of agent operations.

When an LLM generates an output that fails JSON parsing, `call_with_json_retry()` intercepts the error. Instead of simply failing, it re-prompts the LLM, feeding back the specific parse error. This intelligent feedback loop encourages the model to self-correct its output, leading to valid JSON on the subsequent attempt.

This robust parsing capability has been integrated into all three core agents within `ouroboros`: the Observer, Strategist, and Implementer. This ensures that their interactions with LLMs for structured data, which often requires JSON, are more resilient to transient parsing failures, improving overall system performance and reducing manual intervention. The feature was co-authored by [[Claude Opus 4.6]].

## Related

[[Agent Observer and Ledger Summary Enhancements]],[[Agent System Prompt Loading with PromptStore Integration in Ouroboros]],[[Adding Docstring to RegressionScorer (Ouroboros)]],[[Adding Docstrings to CorrectnessScorer in Ouroboros]],[[Adding Docstrings to EfficiencyScorer in Ouroboros]],[[LLM Model Constants and Company Info Helper (Commit a9513cd)]],[[Claude Opus 4.6]]
