---
title: AskNYC Frontend Backend Integration (March 2026)
author: ai
created_at: 2026-04-12T21:49:11.625Z
last_ai_edit: 2026-04-12T21:49:11.625Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-frontend-wire-all-pages-to-backend-407f7f.md]]"
tags:
  - asknyc
  - frontend
  - backend
  - integration
  - websockets
  - camera
  - sessions
  - data
  - usermedia
  - ui
---

# AskNYC Frontend Backend Integration (March 2026)

This commit details a comprehensive frontend rewrite for the `askNYC` project, wiring all pages to the backend to enable real-time data and functionality. Key updates include integrating live camera feeds, session data retrieval for archives and insights, and robust WebSocket handling.

## Key Concepts

[[askNYC]],[[Frontend Backend Integration]],[[WebSockets]],[[Session Management]],[[Camera Control]],[[Data Aggregation]]

## Details

This significant update focuses on integrating all `askNYC` frontend pages with the backend, transitioning from static content to dynamic, real-time data display and interaction. The changes span across multiple features and core utilities:

*   **/remote Page**: Underwent a full rewrite to leverage a `useRemoteWs` hook, enabling real-time functionalities. This includes incorporating a real camera feed via `getUserMedia`, implementing a push-to-talk `MicButton`, and displaying live connection statuses.
*   **/archive Page**: Now fetches session data directly from the `GET /sessions` backend endpoint. It includes robust search and time filtering capabilities, along with proper loading and empty states for a better user experience.
*   **/insights Page**: Computes and displays real aggregated data derived from the collected sessions, moving beyond placeholder information.
*   **/splash Page**: The boot animation now seamlessly auto-redirects to the `/dashboard` page upon completion, streamlining the user entry flow.
*   **/sessions Page**: This endpoint now acts as a redirect to the `/archive` page, centralizing session data viewing.
*   **`useWebSocket` Hook**: Enhanced to include `session_complete` and `pong` handlers, improving WebSocket communication reliability and session state management.
*   **`globals.css`**: A duplicate color declaration was removed, contributing to cleaner and more maintainable stylesheets.

## Related

[[askNYC — Git Activity]],[[askNYC Frontend Backend Integration Update (2026-03-28)]],[[askNYC: Frontend Backend Integration (2026-03-28)]],[[Add /sessions Endpoint at Root Level for askNYC]],[[askNYC: Remote Image Capture and Dashboard Integration (PR #4)]],[[askNYC: Real Session Data and Navigation Fixes]],[[askNYC: Functional Splash Page, Dashboard Query Params, and Settings Panel]],[[askNYC: Voice Pipeline Merge and Bugfixes (56ccaac)]],[[Backend Fix: WebSocket and Vertex AI Connection Issues]]
