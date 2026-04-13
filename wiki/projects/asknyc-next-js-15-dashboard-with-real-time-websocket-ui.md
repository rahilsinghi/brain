---
title: "askNYC: Next.js 15 Dashboard with Real-time WebSocket UI"
author: ai
created_at: 2026-04-13T17:22:58.773Z
last_ai_edit: 2026-04-13T17:22:58.773Z
last_human_edit: null
last_embedded_hash: 7a8e83617f843f04
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-frontend-nextjs-15-dashboard-with-real-time-websocket-6dc672.md]]"
tags:
  - asknyc
  - next.js
  - websocket
  - dashboard
  - real-time
  - mapbox
  - frontend
  - ui
  - camera
  - audio
---


# askNYC: Next.js 15 Dashboard with Real-time WebSocket UI

This article details the implementation of a new Next.js 15 dashboard for the askNYC project, featuring a real-time WebSocket UI. The dashboard integrates live camera feeds, an interactive Mapbox map, and intelligence briefs, alongside dedicated pages for remote capture, archives, and insights. Robust WebSocket hooks with auto-reconnect and audio playback ensure a dynamic and responsive user experience.

## Key Concepts

Dashboard Interface,Real-time UI,WebSocket Communication,Mapbox GL JS,Next.js 15,Camera Feed Integration,Audio Playback,Data Visualization

## Details

The `askNYC` project introduced a significant frontend enhancement with the development of a new dashboard built using **Next.js 15**, designed for real-time interaction and comprehensive data visualization. This feature integrates several key components to create a dynamic user experience:

*   **Dashboard Page**: This central interface is equipped to display a live camera feed, an interactive **Mapbox GL JS** map, an intelligence brief, and dynamic data cards. The map itself features animated markers and a dark theme for enhanced visual clarity.
*   **Remote Page**: A dedicated interface for real-time capture of phone camera and microphone input, relayed seamlessly via a **WebSocket** connection. This allows for remote data streaming directly into the system.
*   **Archive and Insights Pages**: Separate sections are provided for reviewing historical data and extracting valuable insights from past sessions, enabling detailed analysis over time.
*   **WebSocket Hooks**: The implementation includes robust WebSocket hooks with auto-reconnect capabilities and support for audio playback, ensuring continuous and reliable real-time data flow for a responsive user experience.

## Related

[[askNYC]],[[AskNYC: Recommendation Page with Multi-Agent Pipeline]],[[askNYC Backend and Frontend Deployment to Cloud Run]],[[askNYC: 3D Map-Dominant Dashboard UI Redesign]],[[askNYC: Floating Data Cards & Map FlyTo Fix (Commit 202fec2)]],[[askNYC: Remote Image Capture and Dashboard Integration (PR #4)]],[[askNYC: UI and Map Navigation Improvements (2026-03-28)]],[[askNYC: Functional Splash Page, Dashboard Query Params, and Settings Panel]],[[askNYC: Image Upload, Thumbnail Preview, and Glowing Dashboard Button on Splash Page]],[[askNYC: Next.js 16 Configuration Update]]
