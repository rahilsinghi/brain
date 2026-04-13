---
title: "askNYC Backend: Error Handling and Logging for Silent Failures"
author: ai
created_at: 2026-04-13T17:40:39.707Z
last_ai_edit: 2026-04-13T17:40:39.707Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-backend-add-error-handling-and-logging-to-silent-failur-40b017.md]]"
tags:
  - backend
  - error handling
  - logging
  - asknyc
  - geocoding
  - socrata
  - gemini
  - websocket
  - fix
  - reliability
---

# askNYC Backend: Error Handling and Logging for Silent Failures

This commit addresses silent failure paths in the askNYC backend by implementing robust error handling and comprehensive logging across key services. It specifically targets issues in the geocoding, Socrata, Gemini, and WebSocket components to improve system reliability and diagnostic capabilities.

## Key Concepts

[[Error Handling]],[[Logging]],[[Silent Failures]],[[Geocoding Service]],[[Socrata Service]],[[Gemini Service]],[[WebSocket]],[[raise_for_status()]],[[try/catch blocks]],[[CancelledError]]

## Details

This commit, identified by `fa7c5b9`, focuses on enhancing the resilience and observability of the `rahilsinghi/askNYC` backend.

**Commit Details:**
*   **Repo:** `rahilsinghi/askNYC`
*   **SHA:** `fa7c5b9`
*   **Date:** 2026-03-28T14:58:17Z
*   **Author:** Rahil Singhi
*   **Files Changed:** 4
*   **Additions:** +32 lines
*   **Deletions:** -12 lines

**Key Changes Implemented:**
*   **Geocoding Service:** Added `raise_for_status()` for immediate error detection and implemented `try/catch` blocks with fallback mechanisms to handle geocoding failures more gracefully.
*   **Socrata Service:** Integrated a dedicated logger to record failures encountered during `_get_nearby_zip` operations, providing better insight into data retrieval issues.
*   **Gemini Service:** Enhanced logging to capture errors during `DataCard` creation and `live queue close` operations, ensuring that issues with Gemini model interactions are not silently dropped.
*   **WebSocket (`ws.py`):** Modified the WebSocket handling to explicitly distinguish `CancelledError` exceptions from other unexpected heartbeat errors, improving the accuracy of error reporting for client disconnections versus other network issues.

## Related

[[askNYC — Git Activity]],[[Backend Fix: Error Handling and Logging for Silent Failures in askNYC]],[[askNYC Backend Hardening (ad6b409)]],[[Backend Fix: Socrata Timeout and Transcription Object Handling in askNYC]],[[Backend Fix: WebSocket and Vertex AI Connection Issues]],[[askNYC Model Update: Gemini 2.5 Flash Native Audio]],[[API Feature: POST /synthesise Endpoint with Robust Error Handling]]
