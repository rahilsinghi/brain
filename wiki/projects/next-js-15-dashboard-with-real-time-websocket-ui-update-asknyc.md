---
title: Next.js 15 Dashboard with Real-time WebSocket UI Update (askNYC)
author: ai
created_at: 2026-04-10T15:12:13.997Z
last_ai_edit: 2026-04-10T15:12:13.997Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-frontend-nextjs-15-dashboard-with-real-time-websocket-6dc672.md]]"
tags:
  - next.js
  - websocket
  - real-time
  - dashboard
  - frontend
  - mapbox
  - ui
  - asknyc
  - commit
  - update
  - camera
  - audio
---

# Next.js 15 Dashboard with Real-time WebSocket UI Update (askNYC)

This article documents a major frontend update for the `askNYC` project, implementing a Next.js 15 dashboard with real-time WebSocket capabilities. The update introduces a multi-page UI including a live dashboard, remote control interface, and robust WebSocket handling for interactive data display and media streaming.

## Key Concepts

Next.js 15,WebSocket,Real-time UI,Dashboard,Mapbox GL JS,Frontend development,Auto-reconnect,Audio playback,Camera feed,Microphone capture

## Details

This commit (`eb99912`) by [[Person: Rahil Singhi]] on 2026-03-28 significantly updates the frontend of the [[Project: askNYC]] repository. The changes involve 27 files, adding 8960 lines of code.

Key features introduced include:

*   **Dashboard Page:** A central interface featuring a live camera feed, an interactive [[Technology: Mapbox]] map, an intelligence brief section, and dynamic data cards.
*   **Remote Page:** Enables capture from a phone's camera and microphone, relaying the feed via [[Technology: WebSocket]] for real-time remote monitoring.
*   **Archive and Insights Pages:** Dedicated sections for reviewing past data and generating analytical insights.
*   **WebSocket Integration:** Comprehensive WebSocket hooks with built-in auto-reconnect functionality and support for audio playback.
*   **Mapbox GL JS Enhancements:** Integration of Mapbox GL JS with animated markers and a sleek dark theme for improved visualization.

## Related

[[Project: askNYC]],[[Person: Rahil Singhi]],[[Technology: Next.js]],[[Technology: WebSocket]],[[Technology: Mapbox]]
