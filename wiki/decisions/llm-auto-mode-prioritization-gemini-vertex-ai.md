---
title: "LLM Auto Mode Prioritization: Gemini (Vertex AI)"
author: ai
created_at: 2026-04-10T15:21:11.600Z
last_ai_edit: 2026-04-10T15:21:11.600Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-llm-default-auto-mode-to-gemini-vertex-ai-over-anthro-a41a19.md]]"
tags:
  - llm
  - gemini
  - vertexai
  - anthropic
  - gcp
  - api
  - credits
  - cost management
  - auto mode
  - configuration
  - commit
---

# LLM Auto Mode Prioritization: Gemini (Vertex AI)

This change updates the `brain` repository's `auto` mode for Large Language Models (LLMs), switching the primary provider from Anthropic to Google's Gemini on Vertex AI. This adjustment was made due to depleted Anthropic API credits, with Anthropic now serving as a fallback option.

## Key Concepts

- Large Language Models (LLM)
- Vertex AI
- Gemini (LLM)
- Anthropic (AI company)
- API Credits / Cost Management
- LLM Auto Mode

## Details

This modification, captured in commit `5a58407` within the `[[rahilsinghi/brain]]` repository, was authored by [[Rahil Singhi]] on `2026-04-10T13:05:51Z`. The primary motivation for this change was the exhaustion of [[Anthropic]] API credits, resulting in a negative balance of -$0.11.

To ensure continued operation and leverage available resources, the `auto` mode for LLM interactions has been reconfigured to prioritize [[Gemini (LLM)]] via [[Vertex AI]]. This new preference utilizes an existing allocation of $1000 in [[Google Cloud Platform]] (GCP) GenAI credits.

Anthropic will remain configured as a fallback provider in the event that Gemini is unavailable or unsuccessful. The commit involved changes to 2 files, with 7 lines added and 7 lines deleted, indicating a focused configuration adjustment. The change was co-authored by Claude Opus 4.6 (1M context).

## Related

[[Rahil Singhi]],[[rahilsinghi/brain]],[[Gemini (LLM)]],[[Vertex AI]],[[Anthropic]],[[Large Language Models]],[[Cost Management]],[[Google Cloud Platform]]
