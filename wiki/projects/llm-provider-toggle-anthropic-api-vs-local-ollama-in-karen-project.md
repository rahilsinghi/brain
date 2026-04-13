---
title: LLM Provider Toggle (Anthropic API vs Local Ollama) in Karen Project
author: ai
created_at: 2026-04-13T17:41:25.172Z
last_ai_edit: 2026-04-13T17:41:25.172Z
last_human_edit: null
last_embedded_hash: a74ee817cbc7f0f1
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-feat-add-llm-provider-toggle-anthropic-api-vs-local-ollama-bb8ac3.md]]"
tags:
  - llm
  - api
  - ollama
  - anthropic
  - docker
  - karen project
  - backend
  - configuration
  - frontend spec
---


# LLM Provider Toggle (Anthropic API vs Local Ollama) in Karen Project

This commit introduces a new feature to the [[Karen Project]] backend, allowing users to toggle between using the [[Anthropic API]] and a local [[Ollama]] instance as the Large Language Model (LLM) provider. It adds new provider services and configures [[Docker Compose]] for Ollama, alongside documentation for a frontend specification.

## Key Concepts

LLM Provider Toggle,Anthropic API,Ollama,Docker Compose,Environment Variables,Frontend Specification,Modular LLM Services

## Details

A significant enhancement was made to the [[Karen Project]] backend, enabling dynamic selection of the LLM provider. This feature was implemented by:

*   Adding `backend/services/llm_provider.py`, which includes implementations for both `AnthropicProvider` and `OllamaProvider`. This modular approach allows easy extension to other LLM services.
*   Integrating [[Ollama]] into the project's development environment via `docker-compose.yml`. A named volume was configured to ensure persistent data for the local Ollama instance.
*   Introducing new [[Environment Variables]], `AI_PROVIDER` and `LOCAL_MODEL`, in `.env.example` to control the LLM provider selection. Setting `AI_PROVIDER=local` in the `.env` file directs the system to use Ollama instead of the default Anthropic API.
*   Including a comprehensive `docs/FRONTEND_SPEC_FOR_SARIYA.md` document, which outlines a 1325-line frontend specification. This document is likely related to the UI/UX for interacting with the Karen project, potentially influencing how the LLM provider choice is presented or managed on the frontend.

The default behavior remains unchanged, utilizing the [[Anthropic API]], with local Ollama requiring explicit opt-in.

## Related

[[Karen Project]],[[Anthropic API]],[[Ollama]],[[Docker Compose]],[[Environment Variables]],[[AskNYC Frontend UI Task Specification (Sariya's Task)]],[[Claude API]]
