---
title: "askNYC Backend: WebSocket and Vertex AI Connection Fixes"
author: ai
created_at: 2026-04-13T15:10:13.472Z
last_ai_edit: 2026-04-13T15:10:13.472Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-backend-resolve-websocket-crash-and-vertex-ai-connectio-ed1456.md]]"
tags:
  - backend
  - bugfix
  - websocket
  - vertex ai
  - asknyc
  - gemini
  - adk
  - python
  - api
---

# askNYC Backend: WebSocket and Vertex AI Connection Fixes

This commit addresses critical backend stability issues in the askNYC project, primarily resolving a WebSocket crash and improving Vertex AI integration. Key changes include fixing a missing `Request` parameter in the `dashboard_ws` function, aliasing API keys for ADK compatibility, and updating the Gemini model used.

## Key Concepts

WebSocket,Vertex AI,Google Gemini API,ADK (Autonomous Dialogue Kit),SessionState Schema,Model Versioning (`gemini-live-2.5-flash-native-audio`),Backend Stability,Error Handling

## Details

This backend fix (`SHA: 01aae64`) for the [[askNYC]] project targets several critical stability and connectivity issues:

*   **WebSocket Crash Resolution**: The `dashboard_ws()` function, which is crucial for real-time dashboard updates, was crashing due to a missing `Request` parameter. This has been resolved by utilizing a module-level session service, ensuring the WebSocket connection can correctly handle requests.

*   **ADK Compatibility for API Keys**: To improve compatibility with the [[ADK Multi-Agent Backend (askNYC Project)]] and streamline API key management, `GOOGLE_GEMINI_API_KEY` is now aliased to `GOOGLE_API_KEY`. This change standardizes the environment variable used for [[Google Gemini API]] authentication.

*   **Session State Enhancement**: The `SessionState` schema has been updated with an `ended_at` field. This addition allows for better tracking of session lifecycles and provides more comprehensive session data.

*   **Preventing 'Session Not Found' Errors**: To mitigate issues where the [[ADK Multi-Agent Backend (askNYC Project)]] would encounter a "session not found" error, an [[ADK]] session is now explicitly pre-created before the `run_live()` function is executed. This ensures that a valid session context is always available.

*   **Model Update**: The generative AI model used has been switched to `gemini-live-2.5-flash-native-audio`. This model is available on [[Vertex AI]] and provides enhanced capabilities, particularly for native audio processing, aligning with [[askNYC]]'s multimodal intelligence goals. This update directly relates to previous efforts like [[askNYC: Model Update to Gemini-2.5-Flash-Native-Audio-Latest]] and [[askNYC: Update to Gemini-Live-2.5-Flash-Native-Audio Model and Vertex AI Env Vars]].

These fixes collectively enhance the robustness of the [[askNYC]] backend, improving both real-time communication via WebSockets and the reliability of its [[Vertex AI]] integrations.

## Related

[[askNYC — Git Activity]],[[Backend Fix: WebSocket and Vertex AI Connection Issues]],[[askNYC: Update to Gemini-Live-2.5-Flash-Native-Audio Model and Vertex AI Env Vars]],[[ADK Multi-Agent Backend (askNYC Project)]],[[Backend Socrata Tool Return Type Refactor for ADK Compatibility]],[[askNYC: Model Update to Gemini-2.5-Flash-Native-Audio-Latest]],[[askNYC]],[[Vertex AI]],[[Google Gemini API]],[[ADK]]
