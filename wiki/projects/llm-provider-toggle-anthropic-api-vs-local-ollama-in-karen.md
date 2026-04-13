---
title: LLM Provider Toggle (Anthropic API vs. local Ollama) in Karen
author: ai
created_at: 2026-04-11T01:34:18.620Z
last_ai_edit: 2026-04-11T01:34:18.620Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-feat-add-llm-provider-toggle-anthropic-api-vs-local-ollama-bb8ac3.md]]"
tags:
  - llm
  - anthropic
  - ollama
  - karen
  - backend
  - docker
  - environment-variables
  - frontend-specification
  - feature
---

# LLM Provider Toggle (Anthropic API vs. local Ollama) in Karen

This update introduces a new feature to the `rahilsinghi/karen` repository, allowing users to toggle between Anthropic's API and a local Ollama instance for Large Language Model (LLM) providers. It involves adding new services, environment variables, and a comprehensive frontend specification.

## Key Concepts

LLM Providers,Anthropic API,Ollama,Docker Compose,Environment Variables,Backend Services,Frontend Specification

## Details

This commit (`37f37b3`) to the `rahilsinghi/karen` repository, dated 2026-04-04, introduces significant flexibility in LLM provider selection. The core changes include:

*   **`llm_provider.py`**: A new Python module `backend/services/llm_provider.py` was added, containing implementations for `AnthropicProvider` and `OllamaProvider`. This abstracts the LLM interaction layer, allowing for easy switching between different LLM backends.
*   **Ollama Docker Service**: The `docker-compose.yml` file was updated to include an `ollama` service, configured with a named volume for persistent storage. This enables local execution of Ollama models within the project's Docker environment.
*   **Environment Variables**: New environment variables, `AI_PROVIDER` and `LOCAL_MODEL`, were added to `.env.example`. The `AI_PROVIDER` variable dictates which LLM provider to use (`anthropic` or `local`), while `LOCAL_MODEL` would likely specify the particular Ollama model.
*   **Frontend Specification**: A substantial `docs/FRONTEND_SPEC_FOR_SARIYA.md` document, spanning 1325 lines, was added. This comprehensive specification outlines the requirements and design for the frontend interface, likely detailing how the LLM provider functionality and other features are presented to the user.

By default, the system continues to use the Anthropic API. Users can opt-in to using Ollama by setting `AI_PROVIDER=local` in their `.env` file.

## Related

[[Karen Project]],[[Anthropic API]],[[Ollama]],[[Docker Compose]],[[Environment Variables]],[[FRONTEND_SPEC_FOR_SARIYA.md]],[[Sariya's Task]]
