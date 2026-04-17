---
title: LLM Abstraction Layer with Gemini Provider, Dual-Key Rotation, and Auto-Fallback in Brain
author: ai
created_at: 2026-04-11T00:29:27.378Z
last_ai_edit: 2026-04-11T00:29:27.378Z
last_human_edit: null
last_embedded_hash: c098638a69bead9d
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-llm-add-gemini-provider-with-dual-key-rotation-and-auto-95d955.md]]"
tags:
  - llm
  - gemini
  - anthropic
  - api
  - abstraction
  - fallback
  - key rotation
  - knowledge base
  - repository profiles
  - brain project
  - development
---


# LLM Abstraction Layer with Gemini Provider, Dual-Key Rotation, and Auto-Fallback in Brain

This commit introduces a new LLM abstraction layer within the `rahilsinghi/brain` repository, enabling support for both Anthropic and Gemini models. It features automatic fallback on billing or quota errors, dual-key rotation for Gemini with a 5-minute cooldown, and integrates this unified `generate()` function across six existing LLM call sites. Additionally, it seeds the knowledge base with 10 dense repository profiles.

## Key Concepts

LLM Abstraction Layer,API Key Rotation,Automatic Fallback,Knowledge Base Ingestion,Repository Profiles,Gemini LLM,Anthropic LLM,BRAIN_LLM_PROVIDER

## Details

A significant update to the `rahilsinghi/brain` repository (SHA: `d62666f`) introduces a robust LLM abstraction layer, located in `src/llm/provider.ts`. This layer provides a unified interface for interacting with Large Language Models (LLMs), currently supporting `Anthropic` and `Gemini` providers.

Key features of this implementation include:

*   **Automatic Fallback**: The system is designed to automatically fall back to an alternative provider or key in the event of billing or quota-related errors, ensuring higher reliability.
*   **Dual-Key Rotation for Gemini**: For the Gemini provider, a mechanism is in place to rotate between two API keys upon failure, with a 5-minute cooldown period before attempting to use a failing key again. This enhances rate limit resilience and fault tolerance.
*   **Unified `generate()` Function**: All six existing LLM call sites within the `brain` project – including the compiler, synthesizer, classifier, daily log, slides, and plots – have been refactored to utilize this new, unified `generate()` function, streamlining LLM interactions.
*   **Configuration**: Users can specify the desired LLM provider using the `BRAIN_LLM_PROVIDER` environment variable, setting it to `gemini` or `auto`.

In addition to the LLM infrastructure improvements, this update also adds 10 dense repository profile markdowns to the `raw/repo-profiles/` directory. These profiles are intended for ingestion into the knowledge base, enriching the system's understanding of key projects. The included profiles are for [[askNYC]], [[Career-Datacenter]], [[gaze-diffuse]], [[Karen Project]], [[MarkPush]], [[Ouroboros]], [[Rahil Singhi's Portfolio]], [[Superpowers]], [[claw-code]], and [[Claude How To]].

This work was co-authored with `Claude Opus 4.6 (1M context)`, highlighting the use of AI in the development process.

## Related

[[brain — Git Activity]],[[askNYC]],[[Career-Datacenter]],[[gaze-diffuse]],[[Karen Project]],[[MarkPush]],[[Ouroboros]],[[Rahil Singhi's Portfolio]],[[Superpowers]],[[claw-code]],[[Claude How To]]
