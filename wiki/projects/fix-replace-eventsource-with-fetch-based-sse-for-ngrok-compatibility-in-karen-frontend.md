---
title: "Fix: Replace EventSource with Fetch-based SSE for Ngrok Compatibility in Karen Frontend"
author: ai
created_at: 2026-04-13T16:10:34.555Z
last_ai_edit: 2026-04-13T16:10:34.555Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-fix-frontend-replace-eventsource-with-fetch-based-sse-for-ng-ffa4cd.md]]"
tags:
  - frontend
  - eventsource
  - fetch
  - sse
  - ngrok
  - karen
  - fix
  - compatibility
  - http-headers
  - readablestream
---

# Fix: Replace EventSource with Fetch-based SSE for Ngrok Compatibility in Karen Frontend

This commit addresses a compatibility issue in the [[Karen Project]] frontend where `EventSource` connections were blocked by `ngrok`'s browser interstitial due to the inability to send custom headers. The solution involved replacing `EventSource` with a `fetch`-based implementation using `ReadableStream` to allow the inclusion of the `ngrok-skip-browser-warning` header, thereby restoring Server-Sent Events (SSE) functionality.

## Key Concepts

[[EventSource]],[[Server-Sent Events (SSE)]],[[ngrok]],[[fetch API]],[[ReadableStream]],Custom HTTP Headers,Frontend Compatibility

## Details

The `e4b3971` commit, authored by Rahil Singhi on 2026-04-04T19:14:37Z, implements a crucial fix for the `rahilsinghi/karen` project's frontend. The core problem stemmed from `EventSource`'s limitation in sending custom HTTP headers. This became problematic when running the application through `[[ngrok]]`, which inserts a browser interstitial that requires a specific `ngrok-skip-browser-warning` header to be bypassed.

Since `EventSource` does not provide an API to add custom headers, the Server-Sent Events (SSE) stream was being blocked. The fix involved refactoring the frontend code to utilize the more flexible `fetch` API. By leveraging `fetch` in conjunction with a `ReadableStream` reader, the application can now initiate the SSE connection while explicitly including the necessary `ngrok-skip-browser-warning` header. This change affects 1 file, with an addition of 69 lines and deletion of 46 lines, indicating a targeted replacement of the SSE implementation.

## Related

[[Karen Project]],[[ngrok]]
