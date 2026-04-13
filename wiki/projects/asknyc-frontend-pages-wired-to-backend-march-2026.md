---
title: "askNYC: Frontend Pages Wired to Backend (March 2026)"
author: ai
created_at: 2026-04-13T17:26:45.591Z
last_ai_edit: 2026-04-13T17:26:45.591Z
last_human_edit: null
last_embedded_hash: 4f3418f71eca574c
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-frontend-wire-all-pages-to-backend-407f7f.md]]"
tags:
  - asknyc
  - frontend
  - backend
  - integration
  - websocket
  - webrtc
  - api
  - javascript
  - nextjs
  - commit
---


# askNYC: Frontend Pages Wired to Backend (March 2026)

This commit represents a significant integration milestone for the `askNYC` frontend, wiring all key pages to their respective backend services and real-time data sources. It introduces functionalities such as live camera streaming and WebSocket communication for the `/remote` page, dynamic session fetching and filtering for `/archive`, and aggregate data computation for `/insights`, alongside refining the user experience across the application.

## Key Concepts

Frontend-Backend Integration,WebSocket Communication,WebRTC (getUserMedia),Real-time Data Display,Data Aggregation,Session Management,API Endpoints,User Interface (UI) Development

## Details

This commit, identified by `422fc57` in the `rahilsinghi/askNYC` repository, focuses on establishing robust backend connectivity for the `askNYC` application's frontend pages. The key changes include:

*   **/remote page**: Underwent a full rewrite. It now utilizes a `useRemoteWs` hook for WebSocket communication, integrates `getUserMedia` for real-time camera access, features a push-to-talk `MicButton`, and displays connection status.
*   **/archive page**: Implemented to fetch session data from the `GET /sessions` API endpoint. It includes search and time filtering capabilities, along with appropriate loading and empty states for user feedback.
*   **/insights page**: Developed to compute and display real aggregated data derived from the collected session information.
*   **/splash page**: Configured to automatically redirect to the `/dashboard` page after its boot animation sequence completes.
*   **/sessions route**: Now redirects users directly to the `/archive` page, streamlining navigation.
*   **`useWebSocket` hook**: Enhanced with `session_complete` and `pong` handlers to improve WebSocket reliability and session management.
*   **`globals.css`**: A duplicate color declaration was removed, contributing to cleaner and more maintainable stylesheets.

Overall, these updates significantly improve the `askNYC` application's functionality by enabling dynamic, data-driven content across its main user interfaces.

## Related

[[askNYC — Git Activity]],[[askNYC Frontend Backend Integration Update (2026-03-28)]],[[askNYC: Remote Image Capture and Dashboard Integration (PR #4)]],[[askNYC Backend: WebSocket and Vertex AI Connection Fixes]],[[askNYC: Functional Splash Page, Dashboard Query Params, and Settings Panel]],[[askNYC: Wire Real Session Data and Fix Navigation (Insights & Archive)]],[[Rahil Singhi]],[[askNYC]]
