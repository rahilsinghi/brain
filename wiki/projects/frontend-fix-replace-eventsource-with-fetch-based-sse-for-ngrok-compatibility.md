---
title: "Frontend Fix: Replace EventSource with Fetch-based SSE for Ngrok Compatibility"
author: ai
created_at: 2026-04-11T00:35:09.268Z
last_ai_edit: 2026-04-11T00:35:09.268Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-fix-frontend-replace-eventsource-with-fetch-based-sse-for-ng-ffa4cd.md]]"
tags:
  - frontend
  - fix
  - eventsource
  - sse
  - fetch
  - ngrok
  - compatibility
  - web development
  - networking
---

# Frontend Fix: Replace EventSource with Fetch-based SSE for Ngrok Compatibility

This commit addresses a compatibility issue between `EventSource` and `ngrok` by replacing `EventSource` with a `fetch` and `ReadableStream` based approach for Server-Sent Events (SSE). The change allows custom headers, specifically `ngrok-skip-browser-warning`, to be sent, thereby resolving browser interstitial blocks.

## Key Concepts

[[EventSource]],[[Server-Sent Events (SSE)]],[[fetch API]],[[ReadableStream]],[[ngrok]],HTTP Headers,Browser Compatibility

## Details

The `rahilsinghi/karen` repository implemented Server-Sent Events (SSE) using the `EventSource` API. However, `EventSource` inherently lacks the capability to send custom HTTP headers. This limitation caused a problem when deploying the application through `ngrok`, as `ngrok`'s browser interstitial mechanism requires a specific header (`ngrok-skip-browser-warning`) to bypass its warning page.

To resolve this, the `EventSource` implementation was replaced with a solution leveraging the `fetch` API in conjunction with a `ReadableStream` reader. This allows the necessary `ngrok-skip-browser-warning` header to be included with the request, ensuring that SSE connections function correctly when proxied through `ngrok`.

**Commit Details:**
- **Repository:** `rahilsinghi/karen`
- **SHA:** `e4b3971`
- **Date:** `2026-04-04T19:14:37Z`
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +69 lines
- **Deletions:** -46 lines

## Related

[[Karen Project]],[[API: Embed HTTP Server in Daemon Boot with Graceful Shutdown]],[[Backend Core Implementation: FastAPI, Pydantic, and Docker]]
