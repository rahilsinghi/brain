---
title: Gemini LLM Provider with Dual-Key Rotation and Auto-Fallback (rahilsinghi/brain)
author: ai
created_at: 2026-04-11T00:32:44.665Z
last_ai_edit: 2026-04-11T00:32:44.665Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-llm-add-gemini-provider-with-dual-key-rotation-and-auto-95d955.md]]"
tags:
  - llm
  - gemini
  - anthropic
  - api
  - brain
  - repo-profiles
  - knowledge-base
  - auto-fallback
  - key-rotation
  - abstraction-layer
  - feature
---

# Gemini LLM Provider with Dual-Key Rotation and Auto-Fallback (rahilsinghi/brain)

This commit introduces a new LLM abstraction layer in the `rahilsinghi/brain` repository, supporting both Anthropic and Gemini providers with automatic fallback for billing or quota errors. It implements a dual-key rotation mechanism for Gemini APIs to enhance reliability and adds 10 dense repository profiles for knowledge base ingestion across various projects.

## Key Concepts

LLM Abstraction Layer,Gemini Provider,Anthropic Provider,API Key Rotation,Automatic Fallback,Repository Profiles,Knowledge Base Ingestion,LLM Call Sites

## Details

This significant feature (`feat(llm)`) commit (SHA: `d62666f`) to the `rahilsinghi/brain` repository by Rahil Singhi on 2026-04-10 introduces a robust LLM abstraction layer (`src/llm/provider.ts`). This layer is designed to support multiple LLM providers, specifically Anthropic and Gemini, with built-in resilience.

Key features include:

*   **Automatic Fallback**: The system automatically falls back to alternative providers or keys upon encountering billing or quota-related errors, ensuring continuous operation.
*   **Dual Gemini API Key Rotation**: For the Gemini provider, two API keys are maintained and rotated upon failure, with a 5-minute cooldown period to prevent rapid exhaustion of quotas.
*   **Unified `generate()` Function**: All six existing LLM call sites within the `brain` project (compiler, synthesizer, classifier, daily log, slides, plots) have been refactored to utilize a single, unified `generate()` function, simplifying LLM interaction.
*   **Configuration**: Users can set the `BRAIN_LLM_PROVIDER` environment variable to `gemini` or `auto` to specify the preferred LLM provider.

In addition to the LLM infrastructure improvements, the commit also adds 10 dense markdown repository profiles to the `raw/repo-profiles/` directory. These profiles are intended for [[Knowledge Base Ingestion]] and cover the following projects: [[askNYC]], [[Career-Datacenter]], [[Gaze-Diffuse Project]], [[Karen Project]], [[MarkPush]], [[Ouroboros]], [[rahilsinghi/portfolio]], [[Superpowers Project]], [[Claw-Code Project]], and [[Claude How To]].

This work was co-authored by [[Claude Opus 4.6]] (1M context) as part of an ongoing collaboration.

## Related

[[Brain Repository]],[[Anthropic]],[[Gemini]],[[BRAIN_LLM_PROVIDER Environment Variable]],[[Repository Profiles]],[[askNYC]],[[Career-Datacenter]],[[Gaze-Diffuse Project]],[[Karen Project]],[[MarkPush]],[[Ouroboros]],[[rahilsinghi/portfolio]],[[Superpowers Project]],[[Claw-Code Project]],[[Claude How To]],[[Claude Opus]]
