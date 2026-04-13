---
title: "askNYC Backend: Error Handling and Logging for Silent Failures"
author: ai
created_at: 2026-04-12T22:08:59.637Z
last_ai_edit: 2026-04-12T22:08:59.637Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-backend-add-error-handling-and-logging-to-silent-failur-40b017.md]]"
tags:
  - asknyc
  - backend
  - error-handling
  - logging
  - geocoding
  - socrata
  - gemini
  - websocket
  - stability
  - diagnosis
---

# askNYC Backend: Error Handling and Logging for Silent Failures

This commit enhances the askNYC backend's robustness by implementing comprehensive error handling and logging mechanisms across critical services. It addresses silent failure paths in geocoding, Socrata data retrieval, Gemini service interactions, and WebSocket communications, ensuring better diagnostic capabilities and system stability. These changes prevent unhandled exceptions and provide clearer insights into potential issues.

## Key Concepts

Error Handling,Logging,Silent Failures,`raise_for_status()`,`try/catch` blocks,`CancelledError`

## Details

This commit, identified by SHA `fa7c5b9` in the `rahilsinghi/askNYC` repository, focuses on improving the resilience and observability of the askNYC backend by adding specific error handling and logging to previously silent failure points.

Key changes include:

*   **`geocoding_service`**: Implemented `raise_for_status()` to explicitly check for HTTP errors from geocoding API calls. A `try/catch` block was added to gracefully handle potential exceptions during geocoding requests, allowing for fallback mechanisms or appropriate error responses instead of unhandled crashes.
*   **`socrata_service`**: Enhanced the `socrata_service` by integrating a logger. Specifically, failures within the `_get_nearby_zip` function are now explicitly logged, providing visibility into issues related to Socrata data retrieval and zip code resolution.
*   **`gemini_service`**: Added logging for errors encountered during `DataCard` creation and when closing the live queue. This helps track potential data processing issues and ensures that problems with real-time Gemini interactions are not overlooked.
*   **`ws.py`**: Refined WebSocket error handling to clearly distinguish `CancelledError` exceptions from other unexpected heartbeat errors. This allows for more precise handling of client disconnections versus genuine network or service failures.

## Related

[[askNYC]],[[askNYC Backend Hardening (ad6b409)]],[[Backend Fix: Socrata Timeout and Transcription Object Handling (askNYC)]],[[Backend Fix: WebSocket Stability and Vertex AI Integration (01aae64)]],[[API Fixes: Type Safety, Graceful Shutdown, and Response Shape in Brain Project (8be18ba)]],[[API Server Factory with Graceful Drain]]
