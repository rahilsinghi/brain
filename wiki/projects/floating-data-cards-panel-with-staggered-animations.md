---
title: Floating Data Cards Panel with Staggered Animations
author: ai
created_at: 2026-04-10T21:38:57.949Z
last_ai_edit: 2026-04-10T21:38:57.949Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-dashboard-floating-data-cards-panel-with-staggered-ani-b2474a.md]]"
tags:
  - dashboard
  - frontend
  - ui/ux
  - animation
  - datavisualization
  - mapcardoverlay
  - floatingpanel
  - asknyc
  - feature
---

# Floating Data Cards Panel with Staggered Animations

This feature introduces a new `MapCardOverlay` component to the dashboard, providing a fixed, scrollable panel for AI transcript bubbles, tool call pills, and redesigned data cards. The cards animate in a staggered fashion as data streams, enhancing the user experience.

## Key Concepts

Floating Panel,Data Cards,Staggered Animations,AI Transcripts,Tool Calls,MapCardOverlay,MapFloatingCard,Picture-in-Picture (PiP)

## Details

This update introduces a significant enhancement to the dashboard UI, specifically a new `MapCardOverlay` component. This component acts as a fixed, scrollable panel positioned on the left side of the screen. Its primary function is to display key information including tool call pills, AI transcript bubbles, and data cards that feature insight extracts.

The `MapFloatingCard` component has undergone a redesign, now incorporating colored borders, more detailed text, and stat pills to improve readability and information density.

To accommodate the new panel and prevent visual clutter, the camera Picture-in-Picture (PiP) thumbnail has been repositioned to the bottom-right of the screen.

A key UX improvement is the implementation of staggered animations for the data cards. As new data streams in, the cards animate into view one-by-one, creating a smooth and engaging visual effect that spans approximately 8-10 seconds.

## Related

[[AskNYC]],[[Dashboard]],[[AI Transcripts]],[[Data Cards]],[[MapFloatingCard Component]],[[UI/UX]]
