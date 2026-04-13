---
title: "askNYC: Collapsible Sidebar and Repositioned Floating Cards"
author: ai
created_at: 2026-04-13T17:44:00.311Z
last_ai_edit: 2026-04-13T17:44:00.311Z
last_human_edit: null
last_embedded_hash: 32409b90e0aac3d0
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-dashboard-collapsible-sidebar-reposition-floating-car-e0f754.md]]"
tags:
  - asknyc
  - dashboard
  - sidebar
  - ui
  - ux
  - frontend
  - fix
  - collapsible
  - floating cards
---


# askNYC: Collapsible Sidebar and Repositioned Floating Cards

This update for the askNYC dashboard introduces a collapsible sidebar, allowing users to minimize it to an icon-only rail. This change also addresses an issue where floating cards were obscured by the sidebar, by repositioning them with a dynamic left offset for vertical centering.

## Key Concepts

Collapsible sidebar,Floating cards,Dashboard UI,Dynamic positioning,UI/UX enhancement

## Details

This commit addresses a user interface issue within the [[askNYC]] dashboard where floating cards were being hidden behind the left sidebar. Previously, cards were positioned with a `left-4` offset, which conflicted with the `200px` width of the sidebar.

The solution involved two key changes:

1.  **Sidebar Collapsibility**: The sidebar was made collapsible, transforming into an icon-only `56px` rail, activated via a chevron toggle. This provides users with more screen real estate when desired.
2.  **Dynamic Card Repositioning**: The floating cards were repositioned to be vertically centered on the screen, with their left offset dynamically adjusted to accommodate both the expanded and collapsed states of the sidebar. This ensures the cards are always visible and well-aligned.

The update involved changes across 3 files, adding 73 lines and removing 26.

## Related

[[askNYC: 3D Map-Dominant Dashboard UI Redesign]],[[askNYC: 3D Map-Dominant Dashboard UI Redesign (PR #7 Merge)]],[[askNYC: 3D Map-Dominant Dashboard UI Redesign (Pull Request #7)]],[[askNYC: Floating Data Cards & Map FlyTo Fix (Commit 202fec2)]],[[askNYC: Frontend Build Fixes Post Merge]],[[askNYC: Frontend Build Fixes Post Merge (2026-03-28)]],[[askNYC: Functional Splash Page, Dashboard Query Params, and Settings Panel]],[[askNYC: Image Upload, Thumbnail Preview, and Glowing Dashboard Button on Splash Page]],[[askNYC: Merge Conflict Resolution and Critical Frontend Fixes (PR #5)]],[[askNYC: Mobile UI Enhancements & Pipeline Fixes]],[[askNYC: Mobile UI Enhancements & Pipeline Fixes (79445dd)]],[[askNYC: Mobile UI/UX Enhancements and Remote Pipeline Fixes (PR #8 Merge)]],[[askNYC]]
