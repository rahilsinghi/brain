---
title: "LLM: Gemini Provider Integration with Dual-Key Rotation"
author: ai
created_at: 2026-04-10T15:14:35.484Z
last_ai_edit: 2026-04-10T15:14:35.484Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-llm-add-gemini-provider-with-dual-key-rotation-and-auto-95d955.md]]"
tags:
  - llm
  - gemini
  - anthropic
  - api-key-rotation
  - auto-fallback
  - abstraction-layer
  - brain-project
  - knowledge-base
  - co-authored-by-ai
  - commit
---

# LLM: Gemini Provider Integration with Dual-Key Rotation

This commit introduces a Gemini provider to the `rahilsinghi/brain` repository, featuring a robust LLM abstraction layer with automatic fallback on billing/quota errors and dual API key rotation. It unifies LLM calls across six different modules and adds new repository profiles for knowledge base ingestion.

## Key Concepts

LLM Abstraction Layer,API Key Rotation,Automatic Fallback,Gemini API,Anthropic API,Knowledge Base Ingestion,`generate()` function

## Details

This commit (`d62666f` by [[Rahil Singhi]] on 2026-04-10) significantly enhances the LLM capabilities within the [[rahilsinghi/brain]] project by introducing support for the [[Gemini (LLM)]] large language model.

**Key Features:**
*   **New LLM Abstraction Layer:** A unified abstraction layer, located in `src/llm/provider.ts`, now supports both [[Anthropic]] and [[Gemini (LLM)]] LLM providers.
*   **Automatic Fallback and Key Rotation:** The system is designed for resilience, implementing automatic fallback mechanisms in case of billing or quota errors from the LLM providers. Specifically for [[Gemini (LLM)]], two API keys are used, rotating automatically upon failure with a 5-minute cooldown period before retrying.
*   **Unified LLM Call Sites:** All six existing LLM call sites within the project—including the compiler, synthesizer, classifier, daily log, slides, and plots modules—now leverage a single, unified `generate()` function for all LLM interactions.
*   **Configuration:** Users can specify their preferred LLM provider via the `BRAIN_LLM_PROVIDER` environment variable, setting it to `gemini` or `auto` for automatic selection.

**Additional Content:**
*   **Repo Profiles:** This commit also incorporates 10 new "dense repo profile" markdown files into the `raw/repo-profiles/` directory. These profiles (e.g., AskNYC, Career-Datacenter, gaze-diffuse, Karen, MarkPush, ouroboros, portfolio, superpowers, claw-code, claude-howto) are intended for ingestion into the project's [[Knowledge Base]], enhancing its ability to answer questions about specific repositories.

**Technical Details:**
*   **SHA:** `d62666f`
*   **Files Changed:** 21
*   **Additions:** +3665 lines
*   **Deletions:** -89 lines
*   **Co-Authored:** Part of this work was co-authored by [[Claude Opus 4.6]], indicating the use of advanced AI assistance in its development.

## Related

[[rahilsinghi/brain]],[[Anthropic]],[[Gemini (LLM)]],[[LLM Abstraction Layer]],[[API Key Management]],[[Knowledge Base]],[[Claude Opus 4.6]],[[Rahil Singhi]]
