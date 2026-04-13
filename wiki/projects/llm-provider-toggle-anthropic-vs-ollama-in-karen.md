---
title: "LLM Provider Toggle: Anthropic vs. Ollama in Karen"
author: ai
created_at: 2026-04-10T19:21:44.369Z
last_ai_edit: 2026-04-10T19:21:44.369Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-feat-add-llm-provider-toggle-anthropic-api-vs-local-ollama-bb8ac3.md]]"
tags:
  - llm
  - ai provider
  - anthropic
  - ollama
  - karen
  - feature toggle
  - backend
  - docker
  - environment variables
  - frontend spec
  - ai-assisted development
---

# LLM Provider Toggle: Anthropic vs. Ollama in Karen

This commit introduces a significant new feature to the `rahilsinghi/karen` project, enabling users to switch between different Large Language Model (LLM) providers. It specifically adds support for both Anthropic API and a local Ollama instance, offering flexibility in AI backend selection. Users can configure their preference via environment variables, with Anthropic remaining the default.

## Key Concepts

LLM Provider Toggle,Anthropic API,Ollama,Karen Project,Environment Variables,Docker Compose,Frontend Specification,AI-Assisted Development

## Details

This commit (`37f37b3`), authored by [[Rahil Singhi]] on `2026-04-04`, adds the capability to toggle between different Large Language Model (LLM) providers within the `rahilsinghi/karen` project. This enhancement provides users with the flexibility to choose between using the Anthropic API or a locally hosted Ollama instance for LLM interactions.

### Key Implementations:
*   **Provider Abstraction:** A new module, `backend/services/llm_provider.py`, was introduced. It contains `AnthropicProvider` and `OllamaProvider` classes, abstracting the specifics of interacting with each LLM service.
*   **Local Ollama Integration:** An Ollama service has been added to `docker-compose.yml`, configured with a named volume to ensure data persistence for local models.
*   **Configuration:** New environment variables, `AI_PROVIDER` and `LOCAL_MODEL`, were added to `.env.example`. Setting `AI_PROVIDER=local` allows the application to utilize Ollama instead of the default Anthropic API.
*   **Frontend Specification:** A substantial frontend specification document, `docs/FRONTEND_SPEC_FOR_SARIYA.md` (1325 lines), was also included in this commit, indicating related UI development requirements.

### Usage Information:
By default, the system continues to use the Anthropic API. To switch to a local Ollama instance, users must set `AI_PROVIDER=local` in their `.env` configuration.

### Contribution Note:
This development was co-authored by Claude Opus 4.6, suggesting the use of AI assistance in its creation.

### Technical Overview:
*   **Files Changed:** 4
*   **Total Additions:** 1439 lines
*   **Total Deletions:** 0 lines

## Related

[[rahilsinghi/karen]],[[Rahil Singhi]],[[Anthropic API]],[[Ollama]],[[Large Language Models]],[[Docker Compose]],[[Environment Variables]]
