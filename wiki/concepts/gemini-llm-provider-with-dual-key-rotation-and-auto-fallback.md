---
title: Gemini LLM Provider with Dual-Key Rotation and Auto-Fallback
author: ai
created_at: 2026-04-12T21:48:23.866Z
last_ai_edit: 2026-04-12T21:48:23.866Z
last_human_edit: null
last_embedded_hash: null
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
  - brain project
  - knowledge base
  - infrastructure
  - reliability
---

# Gemini LLM Provider with Dual-Key Rotation and Auto-Fallback

This feature introduces a new LLM abstraction layer supporting Gemini with dual-key rotation and automatic fallback mechanisms for improved reliability. It integrates across six key LLM call sites within the system and adds ten dense repository profile markdowns for knowledge base ingestion, enhancing the system's LLM capabilities and knowledge base.

## Key Concepts

LLM Abstraction Layer,Gemini LLM Provider,Dual-Key Rotation,Auto-Fallback,API Key Cooldown,Knowledge Base Ingestion,Repository Profiles,Compiler,Synthesizer,Classifier,Daily Log,Slides Generation,Plots Generation

## Details

A new LLM abstraction layer (`src/llm/provider.ts`) has been implemented to support both Anthropic and Gemini models. This layer includes an automatic fallback mechanism that activates upon billing or quota errors, enhancing the system's resilience to API service disruptions. Specifically for the Gemini provider, a dual-key rotation system is in place: if one key fails, the system attempts the second key. A 5-minute cooldown period is enforced for failed keys to prevent rapid retries against a potentially temporarily unavailable service.

All six primary LLM call sites within the system have been updated to utilize the unified `generate()` function provided by this new abstraction. These sites include the compiler, synthesizer, classifier, daily log, slides generation, and plots generation, ensuring consistent and robust LLM interaction across the platform.

Users can configure the LLM provider by setting the `BRAIN_LLM_PROVIDER` environment variable to either `gemini` or `auto`. Setting it to `auto` will leverage the fallback capabilities.

In addition to the LLM infrastructure improvements, ten dense repository profile markdowns have been added to the `raw/repo-profiles/` directory. These profiles are ingested into the system's knowledge base and cover key projects such as [[Ask NYC]], [[Career-Datacenter]], [[Gaze-Diffuse]], [[Karen Project]], [[MarkPush]], [[Ouroboros]], [[Portfolio]], [[Superpowers]], [[CLAW-Code]], and [[Claude How To]], enriching the contextual understanding for LLM operations.

## Related

[[Add Gemini Provider with Dual-Key Rotation and Auto-Fallback]],[[Brain Project]],[[LLM]],[[Ask NYC]],[[Career-Datacenter]],[[Gaze-Diffuse]],[[Karen Project]],[[MarkPush]],[[Ouroboros]],[[Portfolio]],[[Superpowers]],[[Claude How To]]
