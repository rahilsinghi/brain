---
title: "Backend Fix: WebSocket Stability and Vertex AI Integration (01aae64)"
author: ai
created_at: 2026-04-10T15:05:28.730Z
last_ai_edit: 2026-04-10T15:05:28.730Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-backend-resolve-websocket-crash-and-vertex-ai-connectio-ed1456.md]]"
tags:
  - backend
  - websocket
  - vertexai
  - fix
  - gemini
  - adk
  - session
  - crash
  - api-key
  - rahilsinghi
---

# Backend Fix: WebSocket Stability and Vertex AI Integration (01aae64)

This commit addresses critical backend issues in the `askNYC` project, resolving WebSocket crashes and improving integration with Google Cloud's Vertex AI. Key changes include fixing a missing request parameter, aliasing API keys for ADK compatibility, enhancing session management, and updating the AI model to `gemini-live-2.5-flash-native-audio`.

## Key Concepts

WebSocket communication,Vertex AI integration,ADK (Application Development Kit),API Key management,Session management,Backend development,Gemini API

## Details

This commit, identified by SHA `01aae64`, implements several critical fixes and improvements for the backend of the `rahilsinghi/askNYC` project. Authored by Rahil Singhi on 2026-03-28, it involved changes across 4 files, with 11 additions and 5 deletions.

### Key Improvements and Fixes:

*   **WebSocket Stability:** Resolved an issue in `dashboard_ws()` where a `Request` parameter was missing, ensuring more stable WebSocket communication by utilizing a module-level session service.
*   **Vertex AI Compatibility:** Enhanced compatibility with ADK by aliasing `GOOGLE_GEMINI_API_KEY` to `GOOGLE_API_KEY`.
*   **Session Management:** Improved session tracking and error prevention:
    *   Added an `ended_at` field to the `SessionState` schema for better lifecycle management.
    *   Ensured an ADK session is pre-created before calling `run_live()`, which prevents "session not found" errors.
*   **AI Model Upgrade:** Switched the primary AI model to `gemini-live-2.5-flash-native-audio`, leveraging its capabilities available on Vertex AI.

## Related

[[askNYC Project]],[[WebSocket]],[[Vertex AI]],[[ADK]],[[Gemini API]],[[Backend Development]],[[Session Management]],[[Error Handling]]
