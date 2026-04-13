---
title: "Backend Fix: Error Handling and Logging for Silent Failures in askNYC"
author: ai
created_at: 2026-04-12T18:08:21.391Z
last_ai_edit: 2026-04-12T18:08:21.391Z
last_human_edit: null
last_embedded_hash: 4175990f1ff7ee8a
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
  - websockets
  - fix
---


# Backend Fix: Error Handling and Logging for Silent Failures in askNYC

This commit addresses silent failure paths within the `askNYC` backend by implementing robust error handling and comprehensive logging. Specific improvements include adding `raise_for_status()` to the geocoding service, logging failures in the Socrata service, and enhancing error reporting for Gemini service and WebSocket heartbeat issues.

## Key Concepts

[[Error Handling]],[[Logging]],[[Silent Failures]],[[Geocoding Service]],[[Socrata Service]],[[Gemini Service]],[[WebSockets]]

## Details

This commit (`fa7c5b9`) for the `[[askNYC]]` project focuses on improving the robustness and observability of the backend by tackling silent failure scenarios.

Key changes implemented include:

*   **`geocoding_service`**: Added `raise_for_status()` for HTTP requests and wrapped operations in a `try/catch` block with a fallback mechanism to prevent unhandled exceptions.
*   **`socrata_service`**: Integrated a dedicated logger to record failures encountered during `_get_nearby_zip` calls, providing better insight into data retrieval issues.
*   **`gemini_service`**: Enhanced logging for `DataCard` creation errors and `live queue` close errors, ensuring that issues related to AI response processing are captured.
*   **`ws.py`**: Refined error handling within the WebSocket module to specifically distinguish between expected `CancelledError` exceptions and other, more critical, unexpected heartbeat errors, aiding in debugging connection stability.

## Related

[[askNYC]],[[askNYC Backend Hardening (ad6b409)]],[[Backend Fix: Reversed DOB Longitude Bounds and Session Complete Payload (askNYC)]],[[Backend Fix: Socrata Timeout and Transcription Object Handling (askNYC)]],[[Backend Fix: WebSocket Stability and Vertex AI Integration (01aae64)]],[[Backend Core Implementation: FastAPI, Pydantic, and Docker]],[[Commit fa7c5b9: Backend Error Handling and Logging Improvements]],[[CLAUDE.md Update: Composite Tool Architecture and Session Persistence in askNYC]],[[ADK Multi-Agent Backend for askNYC with NYC Open Data]]
