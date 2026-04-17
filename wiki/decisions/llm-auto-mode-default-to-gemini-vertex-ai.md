---
title: LLM Auto Mode Default to Gemini (Vertex AI)
author: ai
created_at: 2026-04-10T19:22:43.859Z
last_ai_edit: 2026-04-10T19:22:43.859Z
last_human_edit: null
last_embedded_hash: 7c4563459c28b111
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-llm-default-auto-mode-to-gemini-vertex-ai-over-anthro-a41a19.md]]"
tags:
  - llm
  - gemini
  - vertex-ai
  - anthropic
  - api
  - credits
  - default
  - auto-mode
  - gcp
  - configuration
---


# LLM Auto Mode Default to Gemini (Vertex AI)

This commit changes the default LLM provider for 'auto mode' from Anthropic to Gemini (Vertex AI) due to exhausted Anthropic API credits. Gemini on Vertex AI is now preferred, leveraging available GCP GenAI credits, with Anthropic serving as a fallback option.

## Key Concepts

* LLM auto mode,* Gemini (Vertex AI),* Anthropic,* API credits,* GCP GenAI credits,* Default configuration

## Details

The `feat(llm)` commit `5a58407` by Rahil Singhi, dated 2026-04-10, updates the LLM auto mode configuration in the `rahilsinghi/brain` repository. The primary motivation for this change is the depletion of Anthropic API credits, which reached a balance of -$0.11. As a result, the system's 'auto mode' will now prioritize Gemini hosted on Google's Vertex AI platform. This shift allows the project to utilize substantial Google Cloud Platform (GCP) GenAI credits ($1000). Anthropic will remain available as a fallback option should Gemini on Vertex AI be unavailable or unsuitable. The change involved 2 files, with 7 additions and 7 deletions, indicating a direct modification of configuration parameters. This commit was co-authored by Claude Opus 4.6.

## Related

[[Rahil Singhi]],[[Gemini (Vertex AI)]],[[Anthropic]],[[Large Language Models]],[[Vertex AI]],[[Google Cloud Platform]],[[API Credits]]
