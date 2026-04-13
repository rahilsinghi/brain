---
title: Floating Data Cards Panel with Staggered Animations in askNYC
author: ai
created_at: 2026-04-11T01:36:21.010Z
last_ai_edit: 2026-04-11T01:36:21.010Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-dashboard-floating-data-cards-panel-with-staggered-ani-b2474a.md]]"
tags:
  - asknyc
  - dashboard
  - ui
  - ux
  - animations
  - datacards
  - mapcardoverlay
  - mapfloatingcard
  - camera pip
  - commit
  - rahilsinghi
---

# Floating Data Cards Panel with Staggered Animations in askNYC

This feature introduces a dynamic floating data cards panel in the askNYC dashboard, displaying tool call pills, AI transcript bubbles, and data cards with extracted insights. The redesign includes enhanced `MapFloatingCard` components and a repositioned camera Picture-in-Picture (PiP) thumbnail. Data cards animate in a staggered sequence as new information streams, improving user experience.

## Key Concepts

[[MapCardOverlay]],[[MapFloatingCard]],[[Staggered Animations]],User Interface (UI),User Experience (UX),Data Visualization,Real-time Data Streaming,Artificial Intelligence (AI) Transcription

## Details

This commit (`31d720a`) by Rahil Singhi on 2026-03-28 introduced significant UI/UX enhancements to the [[askNYC]] dashboard. The primary addition is the `MapCardOverlay`, a fixed, scrollable left panel designed to present various pieces of information to the user.

Key components and changes include:
*   **MapCardOverlay**: This new component aggregates tool call pills (likely indicating actions taken by the multi-agent system), AI transcript bubbles (displaying AI-generated speech-to-text), and data cards that feature extracted insights from processed information.
*   **MapFloatingCard Redesign**: The individual data cards (`MapFloatingCard`) were redesigned to incorporate colored borders, more detailed text, and statistical pills, making them more informative and visually appealing.
*   **Camera PiP Thumbnail Repositioning**: The Picture-in-Picture (PiP) thumbnail for the camera feed was moved to the bottom-right of the screen to prevent it from overlapping with other crucial UI elements.
*   **Staggered Card Animations**: To enhance the visual flow and user engagement, the data cards now animate in one-by-one. This staggered animation sequence spans approximately 8-10 seconds, providing a smooth, dynamic presentation as data streams into the dashboard.

The update involved changes across 3 files, with a net increase of 344 lines of code (+415 additions, -71 deletions).

## Related

[[askNYC]],[[Dashboard Feature: Floating Data Cards Panel with Staggered Animations]],[[askNYC: Floating Data Cards & Map FlyTo Fix (Commit 202fec2)]],[[Dashboard: Floating Data Cards Panel with Staggered Animations]],[[Dashboard UI Fix: Collapsible Sidebar and Card Repositioning]],[[askNYC Model Update: Gemini 2.5 Flash Native Audio]],[[askNYC: Update Gemini Model to Gemini 2.5 Flash]],[[askNYC: Bharath's Deployment & Live Camera Testing Task Spec]],[[AI Transcript Bubble]]
