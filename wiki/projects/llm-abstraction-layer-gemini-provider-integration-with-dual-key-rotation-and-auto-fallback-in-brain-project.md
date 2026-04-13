---
title: "LLM Abstraction Layer: Gemini Provider Integration with Dual-Key Rotation and Auto-Fallback in Brain Project"
author: ai
created_at: 2026-04-10T19:16:39.343Z
last_ai_edit: 2026-04-10T19:16:39.343Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-llm-add-gemini-provider-with-dual-key-rotation-and-auto-95d955.md]]"
tags:
  - llm
  - gemini
  - anthropic
  - api keys
  - fallback
  - abstraction layer
  - repo profiles
  - knowledge base
  - brain project
  - development
  - feature
  - commit
  - d62666f
---

# LLM Abstraction Layer: Gemini Provider Integration with Dual-Key Rotation and Auto-Fallback in Brain Project

This commit introduces a new LLM abstraction layer in the `rahilsinghi/brain` project, enabling Gemini provider support with dual-key rotation and automatic fallback for billing/quota errors. It unifies LLM calls across various functionalities and significantly expands the project's knowledge base by adding 10 new repo profile markdowns.

## Key Concepts

LLM Abstraction Layer,Gemini Provider,API Key Rotation,Automatic Fallback (LLMs),Unified LLM Generation Function,Repo Profile Markdowns,Knowledge Base Ingestion

## Details

This commit, `d62666f`, significantly enhances the `rahilsinghi/brain` project by integrating the Gemini LLM provider and establishing a robust abstraction layer.

### LLM Abstraction and Gemini Integration
A new LLM abstraction layer, located at `src/llm/provider.ts`, has been implemented. This layer is designed to support multiple Large Language Model (LLM) providers, initially including Anthropic and Gemini. Key features of this integration include:
*   **Automatic Fallback:** The system is configured for automatic fallback in cases of billing or quota errors, ensuring higher reliability.
*   **Dual-Key Rotation:** For the Gemini API, two distinct API keys are managed and rotated upon failure, with a 5-minute cooldown period before retrying. This enhances resilience and rate limit management.
*   **Unified Generation Function:** All six LLM call sites within the project (compiler, synthesizer, classifier, daily log, slides, plots) now utilize a single, unified `generate()` function. This standardizes LLM interactions and simplifies future maintenance and provider switching.
*   **Configuration:** Users can specify the desired LLM provider using the `BRAIN_LLM_PROVIDER` environment variable, setting it to `gemini` or `auto`.

### Knowledge Base Enhancements
In addition to the LLM updates, this commit also adds 10 new "dense repo profile" markdowns to the `raw/repo-profiles/` directory. These profiles are specifically intended for knowledge base ingestion, expanding the project's understanding of various repositories. The new profiles include: AskNYC, Career-Datacenter, gaze-diffuse, Karen, MarkPush, ouroboros, portfolio, superpowers, claw-code, and claude-howto.

### Commit Details
*   **Repository:** `rahilsinghi/brain`
*   **Commit SHA:** `d62666f`
*   **Date:** 2026-04-10T12:28:50Z
*   **Author:** Rahil Singhi
*   **Files Changed:** 21
*   **Additions:** +3665 lines
*   **Deletions:** -89 lines
*   **Co-Authored-By:** Claude Opus 4.6 (1M context)

## Related

[[rahilsinghi/brain]],[[Large Language Models (LLMs)]],[[Anthropic]],[[Gemini API]],[[API Key Management]],[[Knowledge Base]],[[Compiler (Brain Project)]],[[Synthesizer (Brain Project)]],[[Classifier (Brain Project)]]
