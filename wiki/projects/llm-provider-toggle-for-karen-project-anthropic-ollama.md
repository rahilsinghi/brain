---
title: LLM Provider Toggle for Karen Project (Anthropic/Ollama)
author: ai
created_at: 2026-04-12T18:09:50.992Z
last_ai_edit: 2026-04-12T18:09:50.992Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-feat-add-llm-provider-toggle-anthropic-api-vs-local-ollama-bb8ac3.md]]"
tags:
  - llm
  - toggle
  - anthropic
  - ollama
  - karen
  - backend
  - docker
  - environment-variables
  - frontend-spec
---

# LLM Provider Toggle for Karen Project (Anthropic/Ollama)

This commit introduces a toggle for Language Model (LLM) providers within the Karen project, allowing users to switch between Anthropic's API and a local Ollama instance. It adds new services for LLM management, updates environment variables, and includes a comprehensive frontend specification for Sariya.

## Key Concepts

LLM Provider Toggle,Anthropic API,Ollama,Docker Compose,Environment Variables,Frontend Specification,Local LLM

## Details

This feature (`feat: add LLM provider toggle`) was implemented in the `rahilsinghi/karen` repository (SHA `37f37b3`) on 2026-04-04 by Rahil Singhi.

The primary changes include:
*   **New Services**: Introduction of `backend/services/llm_provider.py`, which encapsulates both `AnthropicProvider` and `OllamaProvider` classes, enabling a flexible choice of LLM backend.
*   **Docker Integration**: An `ollama` service was added to `docker-compose.yml`, configured with a named volume to persist data.
*   **Configuration**: `AI_PROVIDER` and `LOCAL_MODEL` environment variables were added to `.env.example` to control the LLM provider selection. Setting `AI_PROVIDER=local` allows the use of Ollama, while the default behavior remains Anthropic API.
*   **Documentation**: A significant `docs/FRONTEND_SPEC_FOR_SARIYA.md` file was added, providing a detailed 1325-line specification for the frontend.

## Related

[[Karen Project]],[[Add Open Matter for Bharath Mahesh Gera (Karen Project)]],[[Audio Commentary and Ad-Lib System Improvements (Karen Project)]],[[Audio Integration: ElevenLabs TTS, Quips, and Background Music in Karen Project]],[[Audio: Commentary Timing Sync and Level-Aware Ad-Libs (Karen Project)]],[[Authentic Command Center and Escalation Fortress UI Implementation (Karen Project)]],[[Authentic Command Center and Escalation Fortress UI Merge for Karen Project]],[[Calendar Service Update: Service Account Compatibility and Documentation Refresh]],[[Calendar Service Updates for Service Account Compatibility in Karen Project]],[[Channel Integrations and Personality Service (Karen Project)]],[[Chore: Add Pretext Submodule to Karen Project]],[[Chore: Karen Project Scaffold, Docker Config, and Spec (e7969fd)]],[[Circle Members: Pre-seeded Data and CRUD Endpoints (Karen Project)]],[[Commit 1aded70: Karen - Resolve Matter for Rahil Singhi]],[[Commit 5912f30: Karen - Add Open Matter for Bharath Mahesh Gera]],[[Commit e079a10: Add Open Matter for Bharath Mahesh Gera]],[[Commit eee5eeb: Resolve Matter for Bharath Mahesh Gera]],[[Commit: Karen - Add Open Matter for Bharath Mahesh Gera]],[[Commit: Karen - Resolve Matter for Rahil Singhi (SHA 920736d)]],[[Commit: Karen: add open matter for Rahil Singhi]],[[Commit: Resolve Matter for Bharath Mahesh Gera (eee5eeb)]],[[Sariya]],[[Anthropic]],[[Ollama]],[[Claude API]],[[Docker]]
