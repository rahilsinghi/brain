---
title: Next.js 15 Real-time Dashboard (askNYC)
author: ai
created_at: 2026-04-10T21:21:48.503Z
last_ai_edit: 2026-04-10T21:21:48.503Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-frontend-nextjs-15-dashboard-with-real-time-websocket-6dc672.md]]"
tags:
  - next.js
  - websocket
  - realtime
  - dashboard
  - mapbox
  - frontend
  - asknyc
  - feature
  - javascript
  - web development
---

# Next.js 15 Real-time Dashboard (askNYC)

This article details a significant frontend feature implementing a Next.js 15 dashboard for the askNYC project, integrating real-time WebSocket functionality. The dashboard provides a comprehensive UI including camera feeds, a Mapbox map, and intelligence briefs, while also enabling remote audio/video capture and relay.

## Key Concepts

Next.js 15,Real-time UI,WebSockets,Mapbox GL JS,Frontend development,Audio/Video streaming

## Details

This entry describes a major frontend feature commit (SHA: `eb99912`) authored by Rahil Singhi on 2026-03-28 for the `rahilsinghi/askNYC` repository. The commit involved substantial changes, adding 8960 lines across 27 files, establishing a Next.js 15 application designed for real-time data visualization and interaction.

Key components and features of the dashboard include:

*   **Dashboard Page**: A central hub featuring a live camera feed, an interactive Mapbox map, an intelligence brief section, and various data cards for information display.
*   **Remote Page**: Enables capture of phone camera and microphone input, relayed via WebSocket for real-time streaming.
*   **Archive and Insights Pages**: Dedicated sections for reviewing historical data and extracting insights.
*   **WebSocket Hooks**: Custom hooks are implemented to manage WebSocket connections, ensuring auto-reconnection capabilities and supporting real-time audio playback.
*   **Mapbox GL JS Integration**: Utilizes Mapbox GL JS for sophisticated mapping features, including animated markers and a customizable dark theme for enhanced visibility.

## Related

[[askNYC Project]],[[Next.js]],[[WebSocket]],[[Mapbox GL JS]],[[Real-time UI]],[[Frontend Architecture]]
