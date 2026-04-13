---
title: Floating Data Cards Panel with Staggered Animations in askNYC Dashboard
author: ai
created_at: 2026-04-13T17:42:46.888Z
last_ai_edit: 2026-04-13T17:42:46.888Z
last_human_edit: null
last_embedded_hash: 3278f2340e711579
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-dashboard-floating-data-cards-panel-with-staggered-ani-b2474a.md]]"
tags:
  - asknyc
  - dashboard
  - ui
  - frontend
  - animations
  - map
  - data cards
  - user experience
  - rahil singhi
---


# Floating Data Cards Panel with Staggered Animations in askNYC Dashboard

This update introduces a new floating data cards panel to the askNYC dashboard, enhancing the user interface with a scrollable left panel displaying tool call pills, AI transcript bubbles, and data cards with insight extracts. The redesigned cards feature colored borders and stat pills, animating in a staggered sequence as data streams. The camera Picture-in-Picture (PiP) thumbnail was also repositioned to prevent overlap.

## Key Concepts

Dashboard UI,Floating Data Cards,Staggered Animations,MapCardOverlay,MapFloatingCard,AI Transcript Display,Tool Call Pills

## Details

This commit (`31d720a`) to the `rahilsinghi/askNYC` repository, authored by Rahil Singhi on March 28, 2026, focuses on significant UI enhancements for the askNYC dashboard. The changes involve 3 files, with 415 additions and 71 deletions.

Key features introduced and updated include:

*   **MapCardOverlay**: A new fixed, scrollable left panel has been added. This overlay displays `tool call pills`, `AI transcript bubbles`, and `data cards` that contain extracted insights.
*   **MapFloatingCard Redesign**: The existing `MapFloatingCard` component has been visually overhauled. It now features distinct `colored borders`, `detail text`, and `stat pills` to present information more effectively.
*   **Camera PiP Thumbnail Repositioning**: To improve layout and avoid visual clutter, the camera's Picture-in-Picture (PiP) thumbnail has been moved to the bottom-right corner of the dashboard.
*   **Staggered Card Animations**: The data cards now animate into view one by one. This `staggered animation` effect, spanning approximately 8-10 seconds, provides a dynamic and engaging user experience as data is streamed and presented.

## Related

[[askNYC]],[[askNYC: 3D Map-Dominant Dashboard UI Redesign]],[[askNYC: Floating Data Cards & Map FlyTo Fix (Commit 202fec2)]],[[askNYC: UI and Map Navigation Improvements (2026-03-28)]],[[Animated Login Modal and Chat Sidebar Transitions]]
