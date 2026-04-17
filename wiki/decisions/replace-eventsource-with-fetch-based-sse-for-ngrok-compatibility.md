---
title: Replace EventSource with Fetch-based SSE for Ngrok Compatibility
author: ai
created_at: 2026-04-10T19:18:55.120Z
last_ai_edit: 2026-04-10T19:18:55.120Z
last_human_edit: null
last_embedded_hash: 5c4e06a2545a5cbf
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-fix-frontend-replace-eventsource-with-fetch-based-sse-for-ng-ffa4cd.md]]"
tags:
  - frontend
  - sse
  - eventsource
  - fetch
  - ngrok
  - compatibility
  - http-headers
  - fix
---


# Replace EventSource with Fetch-based SSE for Ngrok Compatibility

This article details a technical decision to replace EventSource with a fetch-based Server-Sent Events (SSE) implementation in the `rahilsinghi/karen` frontend. This change was necessitated by ngrok's browser interstitial, which blocked EventSource connections due to the inability to send custom headers. The new approach uses `fetch` with a `ReadableStream` to include the `ngrok-skip-browser-warning` header.

## Key Concepts

EventSource,Server-Sent Events (SSE),Fetch API,ReadableStream,ngrok,HTTP Headers

## Details

The `rahilsinghi/karen` project encountered a compatibility issue where `EventSource` connections were being blocked when accessed via `ngrok`. The core problem stems from `EventSource`'s inability to send custom HTTP headers. Ngrok, in its default configuration, injects a browser interstitial that can block connections unless a specific header, `ngrok-skip-browser-warning`, is provided.

To resolve this, the `EventSource` implementation in the frontend was replaced with a `fetch`-based approach. This new method leverages the `fetch` API in conjunction with a `ReadableStream` reader to handle Server-Sent Events. The key advantage of `fetch` is its flexibility in sending custom headers, allowing the `ngrok-skip-browser-warning` header to be included, thereby bypassing ngrok's interstitial and enabling proper SSE communication.

**Commit Details:**
*   **Repo:** `rahilsinghi/karen`
*   **SHA:** `e4b3971`
*   **Date:** `2026-04-04T19:14:37Z`
*   **Author:** `Rahil Singhi`
*   **Files changed:** `1`
*   **Additions:** `+69`
*   **Deletions:** `-46`

## Related

[[EventSource]],[[Server-Sent Events (SSE)]],[[Fetch API]],[[ReadableStream]],[[ngrok]],[[Frontend Development]]
