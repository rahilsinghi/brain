---
title: "Fix: Replace EventSource with Fetch-based SSE for ngrok Compatibility in Karen Project"
author: ai
created_at: 2026-04-12T17:57:59.825Z
last_ai_edit: 2026-04-12T17:57:59.825Z
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
  - readable_stream
  - karen_project
  - bug_fix
  - http_headers
---

# Fix: Replace EventSource with Fetch-based SSE for ngrok Compatibility in Karen Project

This commit addresses a frontend issue in the Karen project where `EventSource` connections were blocked by `ngrok`'s browser interstitial due to the inability to send custom headers. The solution involves replacing `EventSource` with a `fetch`-based `Server-Sent Events (SSE)` implementation that can send the necessary `ngrok-skip-browser-warning` header, ensuring proper functionality.

## Key Concepts

[[EventSource]] limitations with custom headers,[[ngrok]] browser interstitial,[[Server-Sent Events (SSE)]],[[Fetch API]] with [[ReadableStream]],`ngrok-skip-browser-warning` header

## Details

The `EventSource` API, while convenient for receiving `Server-Sent Events (SSE)`, has a limitation: it does not allow for the inclusion of custom HTTP headers in the request. This became a critical issue within the [[Karen Project]] when using `ngrok` for local development or tunneling. `ngrok` often injects a browser interstitial warning page for unverified tunnels, and this page can block or interfere with `EventSource` connections if specific headers are not sent.

To circumvent this, the `EventSource` implementation was replaced with a `fetch`-based approach. By utilizing the standard `Fetch API` along with a `ReadableStream` reader, the frontend can now initiate the `SSE` connection while explicitly sending the `ngrok-skip-browser-warning` header. This header instructs `ngrok` to bypass its browser interstitial, allowing the `SSE` connection to be established directly and unimpeded, thus restoring full functionality to the application's real-time updates.

## Related

[[Karen Project]],[[ngrok]],[[EventSource]],[[Fetch API]],[[ReadableStream]],[[Server-Sent Events (SSE)]],[[Frontend Development]]
