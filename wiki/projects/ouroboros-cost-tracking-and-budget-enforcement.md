---
title: "Ouroboros: Cost Tracking and Budget Enforcement"
author: ai
created_at: 2026-04-13T15:34:27.475Z
last_ai_edit: 2026-04-13T15:34:27.475Z
last_human_edit: null
last_embedded_hash: deac3b4d71e36385
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-ouroboros-feat-budget-add-cost-tracking-with-per-model-pricing-and-d3ecb1.md]]"
tags:
  - budget
  - cost tracking
  - ouroboros
  - llm
  - agents
  - pricing
  - feature
---


# Ouroboros: Cost Tracking and Budget Enforcement

This feature introduces comprehensive cost tracking within the Ouroboros project, monitoring input/output tokens and USD expenditure for all agent calls. It enforces a `max_usd_per_run` budget before each iteration, supporting detailed pricing for various LLM models including Opus, Sonnet, and Haiku.

## Key Concepts

Cost Tracking,Budget Enforcement,Token Tracking,Per-Model Pricing,Large Language Models (LLMs),Agentic Systems

## Details

This feature integrates robust cost management into the [[Ouroboros]] project, as introduced in commit `a560fb2`. It meticulously tracks both input and output tokens, converting them into USD costs for every interaction made by agents. A critical component is the `max_usd_per_run` budget, which is checked before initiating each new agent iteration to prevent cost overruns.

The system currently supports detailed pricing models for leading Large Language Models, specifically Anthropic's Opus, Sonnet, and Haiku models, ensuring accurate expenditure calculation. This enhancement provides greater control and transparency over resource consumption during agent operations.

**Commit Details:**
- **Repository:** `rahilsinghi/ouroboros`
- **SHA:** `a560fb2`
- **Date:** `2026-04-03T15:02:05Z`
- **Author:** Rahil Singhi
- **Files Changed:** 3
- **Additions:** +93 lines

## Related

[[Ouroboros]],[[Agent System Prompt Loading with PromptStore Integration in Ouroboros]],[[LLM Model Constants and Company Info Helper (Commit a9513cd)]]
