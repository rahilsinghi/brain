---
title: "askNYC: Frontend Backend Integration (2026-03-28)"
author: ai
created_at: 2026-04-10T15:14:50.606Z
last_ai_edit: 2026-04-10T15:14:50.606Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-frontend-wire-all-pages-to-backend-407f7f.md]]"
tags:
  - frontend
  - backend integration
  - asknyc
  - commit
  - feature
  - websocket
  - webrtc
  - data fetching
  - user interface
---

# askNYC: Frontend Backend Integration (2026-03-28)

This commit details a significant frontend update for the `askNYC` project, wiring all user-facing pages to their respective backend services. Key changes include a rewrite of the remote interface with real-time features, robust data fetching and filtering for archives, and the integration of insights from session data.

## Key Concepts

*   `useRemoteWs` hook,*   `getUserMedia` (WebRTC API),*   Push-to-talk (MicButton),*   Connection status management,*   REST API (`GET /sessions`),*   Time-based filtering,*   Loading/empty states,*   Data aggregation,*   Client-side redirection,*   WebSocket handlers (`session_complete`, `pong`)

## Details

This commit, authored by Rahil Singhi on March 28, 2026, focuses on integrating the `askNYC` frontend with its backend services. It involved substantial changes across 7 files, adding 710 lines and deleting 279, indicating a major refactor and feature implementation.

### Commit Metadata
*   **Repo:** `rahilsinghi/askNYC`
*   **SHA:** `422fc57`
*   **Date:** `2026-03-28T04:01:52Z`
*   **Author:** [[Rahil Singhi]]
*   **Files changed:** 7
*   **Additions:** +710
*   **Deletions:** -279

### Key Changes
*   **`/remote` Page:** Underwent a full rewrite to leverage the `useRemoteWs` hook. This update enables real-time camera functionality via `getUserMedia`, introduces a `MicButton` with push-to-talk capabilities, and displays connection status, significantly enhancing the remote interaction experience.
*   **`/archive` Page:** Now fetches session data from the `GET /sessions` endpoint. It includes search functionality and time filters to allow users to efficiently navigate through past sessions. Proper loading and empty states have been implemented for a better user experience.
*   **`/insights` Page:** Computes real aggregates based on the fetched sessions data, providing valuable analytical information.
*   **`/splash` Page:** Configured to auto-redirect to the `/dashboard` page after a boot animation, streamlining the user's initial interaction.
*   **`/sessions` Page:** Implemented a redirect to the `/archive` page, consolidating session viewing under a single, more feature-rich interface.
*   **`useWebSocket` Hook:** Enhanced with `session_complete` and `pong` handlers, improving the robustness and communication management of WebSocket connections.
*   **`globals.css`:** A duplicate color declaration was removed, addressing minor styling inconsistencies.

## Related

[[Rahil Singhi]],[[askNYC Project]],[[useRemoteWs hook]],[[WebRTC]],[[WebSocket]]
