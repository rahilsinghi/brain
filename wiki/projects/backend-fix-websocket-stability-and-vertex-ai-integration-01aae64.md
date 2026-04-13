---
title: "Backend Fix: WebSocket Stability and Vertex AI Integration (01aae64)"
author: ai
created_at: 2026-04-13T17:07:34.642Z
last_ai_edit: 2026-04-13T17:07:34.642Z
last_human_edit: null
last_embedded_hash: 001b16a07ca7e943
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-backend-resolve-websocket-crash-and-vertex-ai-connectio-ed1456.md]]"
tags:
  - backend
  - fix
  - websocket
  - vertexai
  - adk
  - gemini
  - api
  - session
  - asknyc
  - bugfix
---


# Backend Fix: WebSocket Stability and Vertex AI Integration (01aae64)

This commit resolves a critical WebSocket crash and enhances Vertex AI integration within the `askNYC` backend. Key fixes include correcting missing Request parameters for the WebSocket dashboard, aliasing Google API keys for ADK compatibility, and ensuring ADK sessions are pre-created to prevent 'session not found' errors. Additionally, the default model is updated to `gemini-live-2.5-flash-native-audio` and the `SessionState` schema gains an `ended_at` field.

## Key Concepts

WebSocket,Vertex AI Integration,ADK Compatibility,Session Management,API Key Aliasing,Gemini Model Update,Backend Stability

## Details

- Fix `dashboard_ws()` missing Request parameter, utilizing a module-level session service instead.
- Alias `GOOGLE_GEMINI_API_KEY` to `GOOGLE_API_KEY` to ensure compatibility with the ADK system.
- Add an `ended_at` field to the `SessionState` schema for improved session tracking.
- Pre-create the ADK session before calling `run_live()` to prevent 'session not found' errors during execution.
- Switch the default language model to `gemini-live-2.5-flash-native-audio`, which is available on Vertex AI.

## Related

[[askNYC]],[[askNYC Backend: WebSocket and Vertex AI Connection Fixes]],[[ADK Multi-Agent Backend for AskNYC (NYC Open Data)]],[[askNYC: Model Update to Gemini-2.5-Flash-Native-Audio-Latest]],[[Backend Fix: Socrata Timeout and Transcription Object Handling (askNYC)]],[[API Fix: Dynamic LLM Provider/Model Reporting in Synthesis Response (Brain Project)]],[[askNYC: Update to Gemini-Live-2.5-Flash-Native-Audio Model and Vertex AI Env Vars]],[[Session Management]]
