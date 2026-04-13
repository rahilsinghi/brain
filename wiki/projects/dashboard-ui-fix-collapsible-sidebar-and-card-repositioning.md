---
title: "Dashboard UI Fix: Collapsible Sidebar and Card Repositioning"
author: ai
created_at: 2026-04-11T01:33:44.503Z
last_ai_edit: 2026-04-11T01:33:44.503Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-dashboard-collapsible-sidebar-reposition-floating-car-e0f754.md]]"
tags:
  - asknyc
  - dashboard
  - ui
  - frontend
  - fix
  - sidebar
  - cards
  - responsiveness
---

# Dashboard UI Fix: Collapsible Sidebar and Card Repositioning

This commit addresses a UI issue in the askNYC dashboard where floating cards were obscured by the sidebar. The fix implements a collapsible sidebar that transitions to an icon-only rail and dynamically repositions the floating cards with a left offset, ensuring they remain visible and vertically centered.

## Key Concepts

User Interface (UI),Dashboard,Collapsible Sidebar,Floating Cards,Dynamic Positioning,Frontend Development

## Details

This commit, identified by SHA `e46df7f` in the `rahilsinghi/askNYC` repository, was made by Rahil Singhi on 2026-03-28T16:41:17Z. It involved changes across 3 files, with 73 additions and 26 deletions.

The primary issue resolved was that previously, floating cards within the dashboard were hidden behind the fixed-width sidebar (positioned at `left-4` while the sidebar was `200px`). The solution involved two main components:

1.  **Sidebar Collapsibility**: The sidebar now includes a chevron toggle, allowing it to collapse into a compact, icon-only rail with a width of `56px`.
2.  **Dynamic Card Repositioning**: The floating cards have been reprogrammed to be vertically centered on the screen and to dynamically adjust their `left` offset based on the sidebar's current state (collapsed or expanded), ensuring they are always visible and not obscured.

## Related

[[askNYC Application Deployment to Google Cloud Run]],[[askNYC: Functional Splash Page, Dashboard Query Params, and Settings Panel]],[[Dashboard Feature: Floating Data Cards Panel with Staggered Animations]],[[askNYC: Mobile UI Enhancements & Pipeline Fixes]],[[Dashboard UI Improvement: Collapsible Sidebar and Floating Card Repositioning]]
