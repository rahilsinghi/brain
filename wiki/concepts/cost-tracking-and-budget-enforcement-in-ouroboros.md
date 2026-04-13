---
title: Cost Tracking and Budget Enforcement in Ouroboros
author: ai
created_at: 2026-04-13T16:08:45.719Z
last_ai_edit: 2026-04-13T16:08:45.719Z
last_human_edit: null
last_embedded_hash: 876eb3a95b5c3c14
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-ouroboros-feat-budget-add-cost-tracking-with-per-model-pricing-and-d3ecb1.md]]"
tags:
  - ouroboros
  - cost tracking
  - budget enforcement
  - llm
  - pricing
  - token management
  - agent
  - feature
---


# Cost Tracking and Budget Enforcement in Ouroboros

This feature introduces robust cost tracking and budget enforcement within the Ouroboros system, monitoring token usage and USD costs across all agent calls. It prevents budget overruns by checking against a `max_usd_per_run` limit before each iteration. The system currently supports pricing models for Opus, Sonnet, and Haiku.

## Key Concepts

[[Ouroboros]],Cost Tracking,Budget Enforcement,Token Usage,LLM Pricing Models (Opus, Sonnet, Haiku),Agent Calls

## Details

The `a560fb2` commit on `2026-04-03` by Rahil Singhi (co-authored by Claude Opus 4.6) implemented a new feature in the `rahilsinghi/ouroboros` repository to track and enforce monetary budgets for LLM operations. This system diligently monitors both input and output token counts, translating them into USD costs for every [[Agent Calls]] made within Ouroboros.

Before initiating any new iteration or agent call, the system performs a crucial check against a predefined `max_usd_per_run` budget. If the estimated cost for the upcoming operation would exceed this budget, the system prevents its execution, thus ensuring financial discipline and preventing unexpected expenses. This mechanism is particularly important for managing costs associated with large language models.

Currently, the implementation includes support for the pricing structures of popular LLMs such as Opus, Sonnet, and Haiku, allowing for accurate cost calculations based on the specific models used.

## Related

[[Ouroboros]],[[Agent System Prompt Loading with PromptStore Integration in Ouroboros]],[[Adding Docstring to RegressionScorer (Ouroboros)]],[[Adding Docstrings to CorrectnessScorer in Ouroboros]],[[Adding Docstrings to EfficiencyScorer in Ouroboros]]
