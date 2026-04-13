---
title: "LLM Auto Mode Prioritization: Gemini (Vertex AI) Over Anthropic"
author: ai
created_at: 2026-04-11T01:32:27.412Z
last_ai_edit: 2026-04-11T01:32:27.412Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-llm-default-auto-mode-to-gemini-vertex-ai-over-anthro-a41a19.md]]"
tags:
  - llm
  - gemini
  - vertexai
  - anthropic
  - api
  - credits
  - cost-optimization
  - brain-project
  - configuration
---

# LLM Auto Mode Prioritization: Gemini (Vertex AI) Over Anthropic

This update defaults the Large Language Model (LLM) auto mode in the `rahilsinghi/brain` repository to Gemini via Vertex AI, moving away from Anthropic models as the primary choice. The change was prompted by the exhaustion of Anthropic API credits, making Gemini a more cost-effective primary option by leveraging existing GCP GenAI credits. Anthropic models will now serve as a fallback.

## Key Concepts

LLM Prioritization,Gemini (Vertex AI),Anthropic API,Cloud Credits,Cost Optimization,Auto Mode (LLM)

## Details

On April 10, 2026, a significant change was implemented in the `rahilsinghi/brain` repository (SHA: `5a58407`) by Rahil Singhi. The commit, co-authored by Claude Opus 4.6, modified 2 files with 7 additions and 7 deletions to alter the default behavior of the LLM auto mode.

The primary driver for this modification was the exhaustion of Anthropic API credits, which had incurred a negative balance of -$0.11. To ensure continued operation and optimize resource utilization, the system's auto mode was reconfigured to prioritize Gemini models accessible through Google Cloud's Vertex AI platform. This leverages the existing $1000 GCP GenAI credits.

Anthropic models are now configured as a fallback option, to be used only if Gemini is unavailable or not preferred under specific conditions. This decision reflects a strategic shift towards more sustainable and credit-backed LLM usage within the project.

## Related

[[rahilsinghi/brain]],[[askNYC: Update to Gemini-Live-2.5-Flash-Native-Audio Model and Vertex AI Env Vars]],[[Add LLM Model Constants and Company Info Helper (Commit a9513cd)]],[[CLAUDE.md Update: Gemini Provider, Test Count, and Source Files]],[[Vertex AI]],[[Anthropic API]],[[Claude Opus]]
