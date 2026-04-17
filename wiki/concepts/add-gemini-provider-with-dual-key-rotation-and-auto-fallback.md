---
title: Add Gemini Provider with Dual-Key Rotation and Auto-Fallback
author: ai
created_at: 2026-04-12T17:47:35.755Z
last_ai_edit: 2026-04-12T17:47:35.755Z
last_human_edit: null
last_embedded_hash: 70c22a387375a4b9
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-llm-add-gemini-provider-with-dual-key-rotation-and-auto-95d955.md]]"
tags:
  - llm
  - gemini
  - anthropic
  - abstraction
  - key rotation
  - error handling
  - knowledge base
  - repository profiles
  - brain project
---


# Add Gemini Provider with Dual-Key Rotation and Auto-Fallback

This feature introduces a new LLM abstraction layer to the `rahilsinghi/brain` repository, supporting both Gemini and Anthropic with automatic fallback for billing/quota errors. It implements a dual-key rotation mechanism for Gemini and unifies all six LLM call sites via a single `generate()` function. The update also integrates ten dense repository profile markdowns for knowledge base ingestion.

## Key Concepts

LLM Abstraction Layer,Gemini Provider,Anthropic Provider,Dual-Key Rotation,Automatic Fallback,Knowledge Base Ingestion,Repository Profiles

## Details

The commit `d62666f` by Rahil Singhi on 2026-04-10 introduces a significant update to the [[rahilsinghi/brain]] repository, primarily focused on enhancing its Large Language Model ([[LLM]]) integration.

A new [[LLM]] abstraction layer, located at `src/llm/provider.ts`, has been implemented. This layer now supports both [[Anthropic]] and [[Gemini]] [[LLM]] providers. A key feature of this abstraction is its capability for automatic fallback, which triggers upon encountering billing or quota-related errors from the [[LLM]] APIs.

Specifically for the [[Gemini]] provider, a robust dual-key rotation mechanism has been integrated. This system rotates between two [[Gemini]] API keys upon failure, with a 5-minute cooldown period before retrying. This enhances the reliability and resilience of LLM calls.

All six existing [[LLM]] call sites within the `brain` project—including the compiler, synthesizer, classifier, daily log, slides, and plots—have been refactored to utilize a single, unified `generate()` function. Users can configure the preferred [[LLM]] provider by setting the environment variable `BRAIN_LLM_PROVIDER` to `gemini` or `auto`.

In addition to the [[LLM]] infrastructure improvements, this commit also adds ten dense repository profile markdowns to the `raw/repo-profiles/` directory. These profiles are intended for knowledge base ingestion and cover the following projects: [[AskNYC]], [[Career-Datacenter]], gaze-diffuse, [[Karen Project]], [[MarkPush]], [[Ouroboros]], [[Portfolio]], superpowers, claw-code, and [[Claude How To]].

The commit involved 21 file changes, with 3665 additions and 89 deletions.

## Related

[[rahilsinghi/brain]],[[Anthropic]],[[Gemini]],[[LLM]],[[AskNYC]],[[Career-Datacenter]],[[Karen Project]],[[MarkPush]],[[Ouroboros]],[[Portfolio]],[[Claude How To]]
