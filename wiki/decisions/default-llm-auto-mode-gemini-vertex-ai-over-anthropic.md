---
title: "Default LLM Auto Mode: Gemini (Vertex AI) over Anthropic"
author: ai
created_at: 2026-04-11T01:36:28.898Z
last_ai_edit: 2026-04-11T01:36:28.898Z
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
  - configuration
  - brain
  - model_selection
---

# Default LLM Auto Mode: Gemini (Vertex AI) over Anthropic

This update defaults the LLM auto mode to Google's Gemini via Vertex AI, moving away from Anthropic. The change was necessitated by depleted Anthropic API credits and leverages available GCP GenAI credits for Gemini.

## Key Concepts

[[LLM]] (Large Language Model),[[Gemini]] (Google's AI model),[[Vertex AI]] (Google Cloud's ML platform),[[Anthropic]] (AI company, provider of Claude models),API Credits,Fallback Mechanism,Model Configuration

## Details

This commit, identified by **SHA 5a58407** in the `rahilsinghi/brain` repository, implemented a critical change in the default LLM provider for the system's 'auto mode'. The primary driver for this decision was the exhaustion of Anthropic API credits, indicated by a -$0.11 balance.

To ensure continued operation and leverage available resources, the system was reconfigured to prioritize [[Gemini]] through [[Vertex AI]], utilizing an allocation of $1000 in GCP GenAI credits. [[Anthropic]] is now designated as a fallback option, to be used only if [[Gemini]] is unavailable or unsuitable.

This change involved modifications to 2 files, with a net neutral change of 7 additions and 7 deletions, reflecting a direct swap in model preference and configuration. The commit was authored by Rahil Singhi on 2026-04-10T13:05:51Z and was co-authored by Claude Opus 4.6 (1M context).

## Related

[[CLAUDE.md Update: Gemini Provider, Test Count, and Source Files]],[[askNYC: Update Gemini Model to Gemini 2.5 Flash]],[[askNYC: Update to Gemini-Live-2.5-Flash-Native-Audio Model and Vertex AI Env Vars]],[[Composite `investigate_location` Tool for Gemini Live]],[[CLAUDE.md Update: API Layer Status and Source File Tree]],[[rahilsinghi/brain]],[[LLM]],[[Gemini]],[[Vertex AI]],[[Anthropic]]
