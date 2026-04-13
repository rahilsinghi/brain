---
title: "Backend Fix: WebSocket and Vertex AI Connection Issues"
author: ai
created_at: 2026-04-10T21:05:15.794Z
last_ai_edit: 2026-04-10T21:05:15.794Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-backend-resolve-websocket-crash-and-vertex-ai-connectio-ed1456.md]]"
tags:
  - backend
  - bugfix
  - websocket
  - vertexai
  - google gemini
  - adk
  - api key
  - python
  - asknyc
---

# Backend Fix: WebSocket and Vertex AI Connection Issues

This commit addresses critical backend issues in the `askNYC` repository, including a WebSocket crash and problems with Vertex AI integration. Key fixes involve correcting API key aliases, pre-creating ADK sessions, and updating the model to `gemini-live-2.5-flash-native-audio` to ensure stable and functional AI interactions.

## Key Concepts

WebSocket,Vertex AI,ADK (AI Development Kit),Google Gemini API,SessionState,API Key Management

## Details

This commit (SHA `01aae64` by Rahil Singhi on `2026-03-28T01:32:13Z`) for the `rahilsinghi/askNYC` repository resolves several backend issues primarily related to WebSocket functionality and Vertex AI integration. The changes involved 4 files, with 11 additions and 5 deletions.

Specific fixes implemented:
- **WebSocket Crash Resolution**: Fixed the `dashboard_ws()` function by ensuring it properly utilizes a module-level session service, resolving a crash related to missing `Request` parameters.
- **API Key Compatibility**: Aliased `GOOGLE_GEMINI_API_KEY` to `GOOGLE_API_KEY` to ensure compatibility with the ADK (AI Development Kit) framework.
- **Session State Management**: Added an `ended_at` field to the `SessionState` schema, enhancing session tracking and lifecycle management.
- **"Session Not Found" Error Prevention**: Implemented a pre-creation step for ADK sessions before calling `run_live()`, preventing "session not found" errors during AI model execution.
- **Model Update**: Switched the AI model to `gemini-live-2.5-flash-native-audio`, which is available on Vertex AI, indicating an upgrade or stabilization of the model in use.

## Related

[[rahilsinghi/askNYC]],[[WebSocket]],[[Vertex AI]],[[Google Gemini]],[[ADK]]
