---
title: Floating Data Cards Panel with Staggered Animations (askNYC)
author: ai
created_at: 2026-04-12T22:12:39.393Z
last_ai_edit: 2026-04-12T22:12:39.393Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-dashboard-floating-data-cards-panel-with-staggered-ani-b2474a.md]]"
tags:
  - asknyc
  - dashboard
  - ui
  - ux
  - animation
  - mapcardoverlay
  - mapfloatingcard
  - frontend
---

# Floating Data Cards Panel with Staggered Animations (askNYC)

This update introduces a redesigned floating data cards panel for the [[askNYC]] dashboard, featuring a scrollable left panel with tool call pills, AI transcript bubbles, and insight extracts. The cards now animate in a staggered sequence as data streams in, enhancing the user experience.

## Key Concepts

Floating Data Cards,Staggered Animations,MapCardOverlay,MapFloatingCard Redesign,AI Transcript Bubble,Tool Call Pills,UI/UX Enhancement

## Details

This commit (`31d720a`) for the [[askNYC]] project implements a significant redesign of the dashboard's user interface. Key changes include:

*   **MapCardOverlay**: Introduction of a fixed, scrollable left panel. This overlay displays dynamic content such as tool call pills, AI transcript bubbles, and data cards that feature extracted insights.
*   **MapFloatingCard Redesign**: The individual `MapFloatingCard` components have been visually updated with colored borders and enhanced detail text, along with stat pills for better information density.
*   **Camera PiP Thumbnail Repositioning**: The Picture-in-Picture (PiP) thumbnail for the camera feed has been moved to the bottom-right corner to prevent overlap with the new floating panel.
*   **Staggered Animations**: The data cards now animate into view one-by-one over approximately 8-10 seconds, creating a smooth and engaging experience as new data streams into the dashboard.

## Related

[[askNYC]],[[askNYC: Floating Data Cards & Map FlyTo Fix (Commit 202fec2)]],[[askNYC: 3D Map-Dominant Dashboard UI Redesign (Pull Request #7)]],[[askNYC: Next.js 15 Dashboard with Real-time WebSocket UI]]
