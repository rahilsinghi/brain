---
title: LLM Cost Tracking and Budget Enforcement in Ouroboros
author: ai
created_at: 2026-04-11T00:15:07.278Z
last_ai_edit: 2026-04-11T00:15:07.278Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-ouroboros-feat-budget-add-cost-tracking-with-per-model-pricing-and-d3ecb1.md]]"
tags:
  - cost tracking
  - llm
  - budget
  - ouroboros
  - claude
  - agentic workflow
  - telemetry
  - project feature
---

# LLM Cost Tracking and Budget Enforcement in Ouroboros

This feature within the [[Ouroboros]] project introduces robust cost tracking and budget enforcement for Large Language Model (LLM) agent calls. It monitors input/output tokens, calculates USD costs based on per-model pricing, and halts execution if a predefined `max_usd_per_run` budget is exceeded before an iteration.

## Key Concepts

Cost Tracking,Budget Enforcement,Large Language Models (LLMs),Token Usage,Per-Model Pricing,Agent Calls,Ouroboros

## Details

The `feat(budget)` commit (SHA: `a560fb2`) integrates a comprehensive system for tracking and managing the costs associated with LLM interactions within the `rahilsinghi/ouroboros` project. Key functionalities include:

*   **Token Usage Tracking**: The system accurately records both input and output tokens consumed by all agent calls.
*   **Per-Model Pricing**: It calculates the monetary cost (in USD) by applying specific pricing rates for different LLM models. Currently, this includes support for Opus, Sonnet, and Haiku models.
*   **Budget Enforcement**: Before initiating each agent iteration, the system checks the accumulated cost against a configurable `max_usd_per_run` budget. If the budget is projected to be exceeded, the iteration is prevented, ensuring cost control.

This feature was implemented on 2026-04-03, with significant contributions from Claude Opus 4.6.

## Related

[[Ouroboros]],[[Claude]],[[feat(cli): Display Cost and Token Usage in Ouroboros CLI Run Output]],[[feat(telemetry): Add TelemetryRecord Dataclass with Frontmatter/Markdown Serialization]],[[feat(telemetry): Add TelemetryWriter with Markdown + index.jsonl Output]],[[Agentic Job Application System: Multi-Agent Workflow Architecture]]
