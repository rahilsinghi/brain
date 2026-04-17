---
title: Default LLM Auto Mode to Gemini (Vertex AI) Over Anthropic
author: ai
created_at: 2026-04-12T18:12:34.516Z
last_ai_edit: 2026-04-12T18:12:34.516Z
last_human_edit: null
last_embedded_hash: 03c8f41f087e8e3a
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-llm-default-auto-mode-to-gemini-vertex-ai-over-anthro-a41a19.md]]"
tags:
  - llm
  - gemini
  - vertex ai
  - anthropic
  - api credits
  - cost management
  - project brain
---


# Default LLM Auto Mode to Gemini (Vertex AI) Over Anthropic

This commit changes the default LLM provider in the `rahilsinghi/brain` project from Anthropic to Gemini (Vertex AI). The shift was necessitated by exhausted Anthropic API credits, leveraging available Google Cloud GenAI credits for Gemini.

## Key Concepts

LLM (Large Language Model),API Credits,Vertex AI,Google Cloud Platform

## Details

The `rahilsinghi/brain` repository, at SHA `5a58407`, implemented a change on 2026-04-10 where the auto mode for Large Language Model (LLM) interactions now defaults to Gemini via Google Cloud's Vertex AI. This decision was made because the project's Anthropic API credits were depleted (showing a balance of -$0.11). By switching to Gemini on Vertex AI, the project can utilize the available $1000 GCP GenAI credits, with Anthropic serving as a fallback option if needed.

## Related

[[Brain Project]],[[Add Gemini Provider with Dual-Key Rotation and Auto-Fallback]],[[askNYC: Update Gemini Model to Gemini 2.5 Flash]],[[askNYC: Update to Gemini-Live-2.5-Flash-Native-Audio Model and Vertex AI Env Vars]],[[CLAUDE.md Update: Gemini Provider, Test Count, and Source Files]],[[Anthropic]],[[LLM]]
