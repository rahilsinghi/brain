---
title: Next.js 15 Dashboard with Real-time WebSocket UI (askNYC)
author: ai
created_at: 2026-04-11T00:26:07.765Z
last_ai_edit: 2026-04-11T00:26:07.765Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-frontend-nextjs-15-dashboard-with-real-time-websocket-6dc672.md]]"
tags:
  - frontend
  - next.js
  - websocket
  - mapbox
  - dashboard
  - real-time
  - ui
  - asknyc
  - camera
  - audio
  - 2026-03-28
---

# Next.js 15 Dashboard with Real-time WebSocket UI (askNYC)

This article details the implementation of a Next.js 15 dashboard for the [[Ask NYC: Multimodal Urban Intelligence Platform]] project, featuring a real-time WebSocket UI. Key components include a live camera feed, an interactive Mapbox map, an intelligence brief, and data cards, alongside remote functionality for phone camera/mic capture and data archiving.

## Key Concepts

Next.js 15,[[WebSocket]] UI,Real-time data,[[Mapbox]] GL JS,Camera feed,Audio playback,Auto-reconnect

## Details

This commit (`eb99912`) by Rahil Singhi on 2026-03-28 introduced a comprehensive frontend dashboard for the [[Ask NYC: Multimodal Urban Intelligence Platform]] project. The implementation involved significant changes across 27 files, adding 8960 lines of code.

The core features of this dashboard, built with [[Next.js]] 15, include:
*   **Dashboard Page**: A central hub integrating a live camera feed, an interactive [[Mapbox]] map for geographical data visualization, an intelligence brief for key insights, and dynamic data cards.
*   **Remote Page**: Functionality to capture phone camera and microphone input, relayed via [[WebSocket]] for real-time streaming.
*   **Archive and Insights Pages**: Dedicated sections for reviewing historical data and extracting actionable insights.
*   **WebSocket Hooks**: Robust [[WebSocket]] integration with auto-reconnect capabilities to maintain persistent connections, essential for real-time data flow and audio playback.
*   **Mapbox GL JS**: Utilization of [[Mapbox GL JS]] for rendering the interactive map, featuring animated markers to highlight points of interest and a dark theme for improved aesthetics and usability.

## Related

[[askNYC — Git Activity]],[[askNYC Frontend Backend Integration Update (2026-03-28)]],[[askNYC Frontend UI Specification (Sariya's Task)]],[[Ask NYC: Multimodal Urban Intelligence Platform]],[[askNYC: Merge Frontend New Branch]],[[askNYC: UI and Map Navigation Improvements (2026-03-28)]],[[Next.js]],[[WebSocket]],[[Mapbox]]
