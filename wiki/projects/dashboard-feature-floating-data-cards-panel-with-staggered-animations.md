---
title: "Dashboard Feature: Floating Data Cards Panel with Staggered Animations"
author: ai
created_at: 2026-04-10T15:20:58.670Z
last_ai_edit: 2026-04-10T15:20:58.670Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-dashboard-floating-data-cards-panel-with-staggered-ani-b2474a.md]]"
tags:
  - dashboard
  - ui
  - ux
  - animation
  - datacards
  - overlay
  - map
  - ai
  - frontend
  - rahilsinghi
  - asknyc
---

# Dashboard Feature: Floating Data Cards Panel with Staggered Animations

This feature introduces a new fixed, scrollable `MapCardOverlay` panel to the dashboard, displaying floating data cards, tool call pills, and AI transcript bubbles. The `MapFloatingCard` design was updated, and a staggered animation was implemented for cards appearing as data streams in, improving the user experience and information flow.

## Key Concepts

MapCardOverlay,MapFloatingCard,Staggered Animations,Data Streaming,AI Transcript Bubble,Tool Call Pills,Picture-in-Picture (PiP) Thumbnail

## Details

This update significantly enhances the dashboard's information display and user interface. A new component, `MapCardOverlay`, was added as a fixed, scrollable panel on the left side of the dashboard. This overlay serves as a central hub for various information elements:

*   **Tool Call Pills:** Indicators representing calls made to external tools.
*   **AI Transcript Bubble:** A display for AI-generated transcriptions.
*   **Data Cards with Insight Extracts:** Dynamic cards presenting key data points and insights.

The `MapFloatingCard` component underwent a redesign to improve its visual appeal and information density. The updated design now includes:

*   **Colored Borders:** For better visual differentiation and categorization.
*   **Detail Text:** Providing more in-depth information directly on the card.
*   **Stat Pills:** Small visual indicators for statistics or key metrics.

To optimize screen real estate and prevent visual clutter, the camera Picture-in-Picture (PiP) thumbnail was repositioned to the bottom-right corner of the interface, avoiding overlap with the new `MapCardOverlay`.

A key user experience improvement is the implementation of **staggered animations** for the data cards. As data streams in, cards animate onto the panel one-by-one, creating a smooth and engaging visual flow over approximately 8-10 seconds. This gradual reveal helps users process information more effectively.

## Related

[[rahilsinghi/askNYC Project]],[[Dashboard]],[[User Interface Design]],[[Animation Techniques]],[[AI Transcripts]],[[Data Visualization]],[[Frontend Development]]
