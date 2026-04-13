---
title: LLM Provider Toggle (Anthropic vs. Ollama) in Karen Project
author: ai
created_at: 2026-04-12T22:10:07.016Z
last_ai_edit: 2026-04-12T22:10:07.016Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-feat-add-llm-provider-toggle-anthropic-api-vs-local-ollama-bb8ac3.md]]"
tags:
  - llm
  - provider
  - anthropic
  - ollama
  - docker
  - environment-variables
  - backend
  - frontend-spec
  - karen
---

# LLM Provider Toggle (Anthropic vs. Ollama) in Karen Project

This feature introduces the ability to toggle between LLM providers in the Karen project, specifically allowing users to switch between the Anthropic API (default Claude) and a local Ollama instance. It involves adding new LLM service providers, updating Docker configurations, and defining environment variables for seamless integration. The change also includes a substantial frontend specification document for UI development.

## Key Concepts

[[LLM Provider]],[[Anthropic API]],[[Claude API]],[[Ollama]],[[Docker Compose]],[[Environment Variables]],[[Microservices]],[[Frontend Specification]]

## Details

This commit (SHA: `37f37b3`) to the `rahilsinghi/karen` repository, authored by Rahil Singhi on 2026-04-04, implements a flexible LLM provider selection mechanism.

**Key Changes:**
*   **New Services:** Introduction of `backend/services/llm_provider.py`, containing `AnthropicProvider` and `OllamaProvider` classes to abstract different large language model interfaces.
*   **Ollama Integration:** The `docker-compose.yml` file was updated to include an Ollama service, complete with a named volume for persistent data.
*   **Configuration:** Added `AI_PROVIDER` and `LOCAL_MODEL` environment variables to `.env.example` to allow users to specify their preferred LLM backend and model.
*   **Frontend Specification:** A comprehensive `docs/FRONTEND_SPEC_FOR_SARIYA.md` document, spanning 1325 lines, was added to detail the frontend UI requirements related to this and other features.

By setting `AI_PROVIDER=local` in the `.env` file, users can opt to use Ollama instead of the default Anthropic (Claude) API. The default behavior remains unchanged without explicit configuration.

## Related

[[Karen Project]],[[backend/services/llm_provider.py]],[[AnthropicProvider]],[[OllamaProvider]],[[Docker Compose]],[[AI_PROVIDER environment variable]],[[LOCAL_MODEL environment variable]],[[Sariya's Task]],[[Claude Opus]]
