---
title: Frontend SSE Fix for ngrok Compatibility in Karen Project
author: ai
created_at: 2026-04-12T21:58:59.449Z
last_ai_edit: 2026-04-12T21:58:59.449Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-fix-frontend-replace-eventsource-with-fetch-based-sse-for-ng-ffa4cd.md]]"
tags:
  - frontend
  - ngrok
  - sse
  - eventsource
  - fetch
  - readablestream
  - bugfix
  - karen
---

# Frontend SSE Fix for ngrok Compatibility in Karen Project

This commit addresses an issue where ngrok's browser interstitial blocked Server-Sent Events (SSE) connections due to `EventSource`'s inability to send custom headers. The solution involved replacing `EventSource` with a `fetch`-based SSE implementation using `ReadableStream` to allow the necessary `ngrok-skip-browser-warning` header.

## Key Concepts

[[Server-Sent Events (SSE)]],[[EventSource]],[[ngrok]],[[Fetch API]],[[ReadableStream]],[[HTTP Headers]],[[Browser Interstitial]]

## Details

The `fix(frontend)` commit (SHA: `e4b3971`) in the [[Karen Project]] repository resolved a critical compatibility issue with `ngrok`. The problem arose because `EventSource`, which was previously used for establishing Server-Sent Events (SSE) connections, does not support sending custom HTTP headers. This limitation became problematic when `ngrok` introduced a browser interstitial warning that required the `ngrok-skip-browser-warning` header to be sent with requests to bypass it.

To circumvent this, the `EventSource` implementation was replaced with a `fetch`-based approach utilizing `ReadableStream`. This new method allows for the inclusion of custom headers, specifically the `ngrok-skip-browser-warning` header, ensuring that SSE connections can be established successfully through `ngrok` without being blocked by the interstitial. The change involved modifying one file, resulting in +69 additions and -46 deletions.

## Related

[[Karen Project]],[[ngrok]]
