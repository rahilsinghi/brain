---
title: Add /sessions Endpoint to Root Level in askNYC API
author: ai
created_at: 2026-04-13T17:35:26.337Z
last_ai_edit: 2026-04-13T17:35:26.337Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-add-sessions-endpoint-at-root-level-was-only-under-ws-812f60.md]]"
tags:
  - api
  - backend
  - bugfix
  - endpoint
  - routing
  - asknyc
  - websocket
---

# Add /sessions Endpoint to Root Level in askNYC API

This commit resolves an API accessibility issue in the `askNYC` project by moving the `/sessions` endpoint from a WebSocket-specific prefix (`/ws/sessions`) directly to the root level (`/sessions`). This ensures proper routing and availability of session-related functionalities within the API.

## Key Concepts

API Endpoints,Root-level routing,WebSocket prefixes,API accessibility,Backend development

## Details

The commit `8d8a273` in the `[[rahilsinghi/askNYC]]` repository, authored by [[Rahil Singhi]] on March 28, 2026, addressed a critical routing issue for the `/sessions` API endpoint. Previously, this endpoint was incorrectly placed under a `/ws` (WebSocket) prefix, meaning it was only accessible via `/ws/sessions`. This fix relocates the endpoint to `/sessions`, making it directly available at the root level of the API. This change involved modifying one file, adding 4 lines and deleting 1, significantly improving the API's structure and ensuring that session management functionalities are correctly exposed and accessible for all HTTP requests, not just WebSocket connections.

## Related

[[askNYC]],[[ADK Multi-Agent Backend for AskNYC (NYC Open Data)]],[[askNYC Backend Fix: DOB Longitude Bounds and Session Completion Payload]],[[API Server Factory with Graceful Drain]],[[API: Embed HTTP Server in Daemon Boot with Graceful Shutdown]]
