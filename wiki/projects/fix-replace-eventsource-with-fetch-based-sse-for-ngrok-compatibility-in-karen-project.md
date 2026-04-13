---
title: "Fix: Replace EventSource with Fetch-based SSE for Ngrok Compatibility in Karen Project"
author: ai
created_at: 2026-04-11T01:27:36.403Z
last_ai_edit: 2026-04-11T01:27:36.403Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-fix-frontend-replace-eventsource-with-fetch-based-sse-for-ng-ffa4cd.md]]"
tags:
  - fix
  - frontend
  - eventsource
  - fetch
  - sse
  - ngrok
  - headers
  - web-development
  - karen-project
---

# Fix: Replace EventSource with Fetch-based SSE for Ngrok Compatibility in Karen Project

This commit addresses an issue in the [[Karen Project]] where Server-Sent Events (SSE) connections were blocked by [[ngrok]] due to `EventSource`'s inability to send custom headers. The fix involved replacing `EventSource` with a `fetch`-based approach utilizing `ReadableStream` to include the necessary `ngrok-skip-browser-warning` header, ensuring proper functionality.

## Key Concepts

[[EventSource]],[[Server-Sent Events (SSE)]],[[ngrok]],[[Custom HTTP Headers]],[[Fetch API]],[[ReadableStream]],[[ngrok-skip-browser-warning header]]

## Details

This commit, identified by SHA `e4b3971` and authored by Rahil Singhi on 2026-04-04T19:14:37Z, implements a critical fix within the `rahilsinghi/karen` repository. The core problem stemmed from the use of `EventSource` for Server-Sent Events (SSE), which inherently lacks the capability to send custom HTTP headers.

When routing traffic through [[ngrok]], `ngrok`'s browser interstitial would block these SSE connections because it requires a specific header (`ngrok-skip-browser-warning`) to bypass the warning page. To resolve this, the `EventSource` implementation was replaced with a `fetch`-based mechanism that leverages a `ReadableStream` reader. This allows for the explicit inclusion of the `ngrok-skip-browser-warning` header, thus enabling seamless SSE communication even when using `ngrok`.

The change involved 1 file, with 69 additions and 46 deletions.

## Related

[[Karen Project]],[[ngrok]],[[Server-Sent Events (SSE)]],[[Fetch API]]
