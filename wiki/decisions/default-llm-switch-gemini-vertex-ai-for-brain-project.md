---
title: "Default LLM Switch: Gemini Vertex AI for Brain Project"
author: ai
created_at: 2026-04-12T22:12:47.994Z
last_ai_edit: 2026-04-12T22:12:47.994Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-llm-default-auto-mode-to-gemini-vertex-ai-over-anthro-a41a19.md]]"
tags:
  - llm
  - gemini
  - vertex ai
  - anthropic
  - api
  - credits
  - brain project
  - configuration
  - ai assistance
---

# Default LLM Switch: Gemini Vertex AI for Brain Project

This commit changes the default Large Language Model (LLM) for the `rahilsinghi/brain` project from Anthropic to Gemini Vertex AI. The decision was driven by the exhaustion of Anthropic API credits and the availability of substantial Google Cloud Platform GenAI credits for Gemini. Anthropic is now configured as a fallback.

## Key Concepts

LLM (Large Language Model),Gemini Vertex AI,Anthropic API,API Credits,Default Configuration

## Details

The `rahilsinghi/brain` repository, specifically commit `5a58407` authored by Rahil Singhi on 2026-04-10, implements a significant change in the project's LLM configuration. The system's 'auto mode' will now default to using Gemini via Google Cloud's Vertex AI platform. This switch was necessitated by the depletion of Anthropic API credits (showing a balance of -$0.11), while $1000 in GCP GenAI credits became available for Gemini. Anthropic will continue to serve as a fallback option. This change involved modifications across 2 files, with +7 additions and -7 deletions, effectively reconfiguring the primary LLM provider.

This commit was co-authored by Claude Opus 4.6, indicating AI assistance in the development process.

## Related

[[Brain Project]],[[Add Gemini Provider with Dual-Key Rotation and Auto-Fallback]],[[askNYC: Model Update to Gemini 2.5 Flash Native Audio]],[[askNYC: Model Update to Gemini-2.5-Flash-Native-Audio-Latest]],[[askNYC: Update Gemini Model to Gemini 2.5 Flash]],[[askNYC: Update to Gemini-Live-2.5-Flash-Native-Audio Model and Vertex AI Env Vars]],[[CLAUDE.md for Project Context and Session Persistence]],[[LLM]],[[Anthropic API]]
