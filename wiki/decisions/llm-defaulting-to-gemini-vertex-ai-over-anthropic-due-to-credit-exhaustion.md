---
title: LLM Defaulting to Gemini (Vertex AI) Over Anthropic Due to Credit Exhaustion
author: ai
created_at: 2026-04-13T17:42:54.878Z
last_ai_edit: 2026-04-13T17:42:54.878Z
last_human_edit: null
last_embedded_hash: a48962bba4594440
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-llm-default-auto-mode-to-gemini-vertex-ai-over-anthro-a41a19.md]]"
tags:
  - llm
  - gemini
  - vertexai
  - anthropic
  - google cloud
  - credits
  - brain project
  - model selection
  - optimization
---


# LLM Defaulting to Gemini (Vertex AI) Over Anthropic Due to Credit Exhaustion

This update configures the LLM auto-mode to prioritize Gemini on Google Cloud's Vertex AI platform as the default, with Anthropic serving as a fallback. This change was implemented due to the exhaustion of Anthropic API credits and leverages available Google Cloud credits for Gemini.

## Key Concepts

[[Large Language Models (LLM)]],[[Gemini (Google AI)]],[[Vertex AI]],[[Anthropic API]],[[Fallback Mechanism]],[[Cloud Credits]]

## Details

The `rahilsinghi/brain` repository was updated to change the default behavior of the Large Language Model (LLM) auto-mode. Previously, Anthropic models were preferred. However, due to the exhaustion of Anthropic API credits (resulting in a balance of -$0.11), the system now defaults to **Gemini via Google Cloud's Vertex AI**.

Vertex AI offers a substantial pool of $1000 in Google Cloud GenAI credits, making it the economically viable primary option. Anthropic will now serve as a **fallback** provider if Gemini is unavailable or fails.

**Commit Details:**
- **Repo:** `rahilsinghi/brain`
- **SHA:** `5a58407`
- **Date:** `2026-04-10T13:05:51Z`
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +7
- **Deletions:** -7

This decision was co-authored by `Claude Opus 4.6 (1M context)`, indicating an LLM-assisted development process.

## Related

[[Brain Project]],[[Add Gemini Provider with Dual-Key Rotation and Auto-Fallback]],[[API Fix: Dynamic LLM Provider/Model Reporting in Synthesis Response (Brain Project)]],[[Add LLM Model Constants and Company Info Helper (Commit a9513cd)]],[[askNYC: Update Gemini Model and Vertex AI Environment Variables Documentation]],[[askNYC: Model Update to Gemini 2.5 Flash]],[[Agent System Prompt Loading with PromptStore Integration]],[[call_with_json_retry() for Robust LLM JSON Parsing in Ouroboros]],[[Claude Opus]]
