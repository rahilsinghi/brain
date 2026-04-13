---
title: Floating Data Cards Panel with Staggered Animations (askNYC Dashboard)
author: ai
created_at: 2026-04-12T18:12:29.205Z
last_ai_edit: 2026-04-12T18:12:29.205Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-dashboard-floating-data-cards-panel-with-staggered-ani-b2474a.md]]"
tags:
  - dashboard
  - ui
  - frontend
  - animation
  - asknyc
  - userexperience
---

# Floating Data Cards Panel with Staggered Animations (askNYC Dashboard)

This feature introduces a new floating data cards panel with staggered animations to the askNYC dashboard. It provides a fixed, scrollable left panel that displays tool call pills, AI transcript bubbles, and data cards containing extracted insights, enhancing the user interface for real-time data consumption.

## Key Concepts

Floating Data Cards,Staggered Animations,MapCardOverlay,MapFloatingCard,Dashboard UI/UX,Real-time Data Visualization

## Details

This commit introduces a significant enhancement to the [[askNYC]] dashboard's user interface, focusing on improved data presentation and user experience.

Key changes include:

*   **MapCardOverlay:** A new fixed, scrollable left panel has been added. This overlay presents tool call pills, AI transcript bubbles, and data cards, allowing users to easily review insights as they stream in.
*   **MapFloatingCard Redesign:** The individual data cards (`MapFloatingCard`) have been redesigned to include colored borders, detailed text, and stat pills, providing a more informative and visually distinct representation of data.
*   **Camera PiP Relocation:** The Picture-in-Picture (PiP) thumbnail for the camera feed has been moved to the bottom-right corner of the screen to prevent overlap with the new data cards panel and ensure optimal visibility of both components.
*   **Staggered Animations:** The data cards now animate into view one-by-one, creating a staggered effect that spans approximately 8-10 seconds as new data becomes available. This smooth animation sequence improves the flow of information and user engagement.

## Related

[[askNYC]],[[askNYC: 3D Map-Dominant Dashboard UI Redesign (Pull Request #7)]],[[askNYC: Floating Data Cards & Map FlyTo Fix (Commit 202fec2)]],[[askNYC: Mobile UI Enhancements & Pipeline Fixes]],[[askNYC: Functional Splash Page, Dashboard Query Params, and Settings Panel]],[[askNYC: UI and Map Navigation Improvements (2026-03-28)]]
