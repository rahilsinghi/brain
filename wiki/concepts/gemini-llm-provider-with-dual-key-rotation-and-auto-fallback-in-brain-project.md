---
title: Gemini LLM Provider with Dual-Key Rotation and Auto-Fallback in Brain Project
author: ai
created_at: 2026-04-13T17:26:29.512Z
last_ai_edit: 2026-04-13T17:26:29.512Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-llm-add-gemini-provider-with-dual-key-rotation-and-auto-95d955.md]]"
tags:
  - llm
  - gemini
  - anthropic
  - brain project
  - api
  - abstraction
  - fallback
  - key rotation
  - repository profiles
  - development
---

# Gemini LLM Provider with Dual-Key Rotation and Auto-Fallback in Brain Project

This commit introduces a new abstraction layer for Large Language Models (LLMs) in the [[Brain Project]], specifically adding support for the Gemini API alongside Anthropic. It features automatic fallback on billing/quota errors, dual-key rotation for Gemini with a 5-minute cooldown, and integrates this unified `generate()` function across six different LLM call sites within the project. Additionally, it incorporates ten dense repository profile markdowns into the knowledge base.

## Key Concepts

[[Large Language Model (LLM)]] Abstraction Layer,[[Gemini API]] Integration,[[Anthropic]] Support,Dual-Key Rotation,Auto-Fallback Mechanism,Repository Profile Markdown Ingestion,Unified `generate()` Function,Environment Variable `BRAIN_LLM_PROVIDER`

## Details

This commit, `d62666f`, by Rahil Singhi on 2026-04-10 introduces a significant enhancement to the LLM capabilities within the `rahilsinghi/brain` repository. The primary feature is the addition of a new, robust LLM abstraction layer located at `src/llm/provider.ts`.

Key functionalities introduced:

*   **Gemini API Support**: Native integration for the Gemini LLM provider, complementing existing Anthropic support.
*   **Automatic Fallback**: The system is designed to automatically fall back in cases of billing or quota errors, ensuring resilience in LLM operations.
*   **Dual-Key Rotation for Gemini**: To further enhance reliability and bypass rate limits or temporary service issues, two Gemini API keys are configured to rotate upon failure, with a 5-minute cooldown period before retrying with a new key.
*   **Unified `generate()` Function**: All six existing LLM call sites within the project (compiler, synthesizer, classifier, daily log, slides, plots) have been refactored to utilize a single, unified `generate()` function from the new abstraction layer, streamlining LLM interactions.
*   **Configuration**: Users can now specify the desired LLM provider using the `BRAIN_LLM_PROVIDER` environment variable, setting it to `gemini` or `auto`.

The commit involved changes across 21 files, with +3665 additions and -89 deletions, indicating a substantial architectural modification.

In addition to the LLM infrastructure update, this commit also ingests ten dense repository profile markdowns into the [[Brain Project]]'s knowledge base. These profiles include:

*   [[Ask NYC: Multimodal Urban Intelligence Platform]]
*   [[Career Datacenter: Job Search Automation Platform]]
*   [[AR Baseline Test Enhancement (Gaze-Diffuse)]]
*   [[Karen Project]]
*   [[Branded CLI Output and Polished MCP Tool Responses (MarkPush)]]
*   [[Ouroboros]]
*   [[Portfolio]]
*   [[Superpowers Project]]
*   [[CLAW Code Project]]
*   [[Claude How-to Project]]

This update significantly improves the flexibility, reliability, and expandability of the [[Brain Project]]'s LLM interactions.

## Related

[[Brain Project: Add Types for Chunks, Lint Issues, Heal Actions, and Stats]],[[Brain Project]],[[Ask NYC: Multimodal Urban Intelligence Platform]],[[Career Datacenter: Job Search Automation Platform]],[[AR Baseline Test Enhancement (Gaze-Diffuse)]],[[Karen Project]],[[Branded CLI Output and Polished MCP Tool Responses (MarkPush)]],[[Ouroboros]],[[Portfolio]],[[Add CLAUDE.md for Project Context and Session Persistence]],[[Large Language Model (LLM)]],[[Gemini API]],[[Anthropic]],[[Superpowers Project]],[[CLAW Code Project]],[[Claude How-to Project]]
