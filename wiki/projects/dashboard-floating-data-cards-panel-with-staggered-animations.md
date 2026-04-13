---
title: "Dashboard: Floating Data Cards Panel with Staggered Animations"
author: ai
created_at: 2026-04-11T01:32:15.813Z
last_ai_edit: 2026-04-11T01:32:15.813Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-dashboard-floating-data-cards-panel-with-staggered-ani-b2474a.md]]"
tags:
  - dashboard
  - ui
  - ux
  - animation
  - asknyc
  - frontend
  - data visualization
  - map overlay
---

# Dashboard: Floating Data Cards Panel with Staggered Animations

This commit introduces a new floating data cards panel for the askNYC dashboard, enhancing information access and visual experience. It features a scrollable left panel displaying tool call pills, AI transcripts, and data cards with insightful extracts, all animated with a staggered effect.

## Key Concepts

Floating UI,Staggered Animations,Data Visualization,User Interface (UI),User Experience (UX),Map Overlays

## Details

The `rahilsinghi/askNYC` project's dashboard now includes a dynamic floating data cards panel. This panel, named `MapCardOverlay`, is a fixed, scrollable component positioned on the left side of the map interface. It is designed to present various pieces of information, including:

*   **Tool Call Pills**: Visual indicators for active tool calls.
*   **AI Transcript Bubbles**: Displaying the AI's transcribed output.
*   **Data Cards with Insight Extracts**: Redesigned `MapFloatingCard` components that feature colored borders and detailed text, along with stat pills for key metrics.

A notable UI adjustment involves relocating the camera Picture-in-Picture (PiP) thumbnail to the bottom-right of the screen to prevent overlap with the new panel. The data cards within the panel animate into view one-by-one, providing a staggered visual effect that spans approximately 8-10 seconds as data streams in, contributing to a more engaging and informative user experience.

## Related

[[askNYC]],[[askNYC: Mobile UI/UX Enhancements and Remote Pipeline Fixes (PR #8 Merge)]],[[askNYC: Floating Data Cards & Map FlyTo Fix (Commit 202fec2)]],[[Dashboard UI Improvement: Collapsible Sidebar and Floating Card Repositioning]],[[Animated Login Modal and Chat Sidebar Transitions]]
