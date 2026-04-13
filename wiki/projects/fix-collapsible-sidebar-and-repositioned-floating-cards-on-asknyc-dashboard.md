---
title: "Fix: Collapsible Sidebar and Repositioned Floating Cards on askNYC Dashboard"
author: ai
created_at: 2026-04-12T18:15:46.227Z
last_ai_edit: 2026-04-12T18:15:46.227Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-dashboard-collapsible-sidebar-reposition-floating-car-e0f754.md]]"
tags:
  - asknyc
  - frontend
  - ui
  - ux
  - dashboard
  - sidebar
  - collapsible
  - floating cards
---

# Fix: Collapsible Sidebar and Repositioned Floating Cards on askNYC Dashboard

This commit addresses a UI issue in the `askNYC` dashboard where floating cards were obscured by the sidebar. It introduces a collapsible sidebar, reducing it to an icon-only rail, and dynamically repositions the floating cards to be vertically centered with an adaptive left offset, ensuring constant visibility.

## Key Concepts

Collapsible Sidebar,Floating Cards,Dynamic UI Adjustment,User Interface (UI),User Experience (UX)

## Details

The `rahilsinghi/askNYC` project's dashboard previously experienced a conflict where floating cards, intended to be at a `left-4` position, were being hidden behind a `200px` wide sidebar.

This commit, with SHA `e46df7f` on `2026-03-28T16:41:17Z`, resolves this by implementing two key changes:

1.  **Collapsible Sidebar**: The sidebar can now collapse into a compact, icon-only 56px rail. This functionality is controlled via a chevron toggle, allowing users to maximize screen space when needed.
2.  **Dynamic Card Repositioning**: The floating cards have been repositioned to be vertically centered on the dashboard. More importantly, their left offset is now dynamically adjusted. This ensures that regardless of whether the sidebar is expanded or collapsed, the cards remain visible and appropriately placed, preventing obscuration.

The changes involved modifications across 3 files, adding 73 lines of code and deleting 26.

## Related

[[askNYC]],[[askNYC: Frontend Backend Integration (2026-03-28)]],[[askNYC: UI and Map Navigation Improvements (2026-03-28)]],[[askNYC: Mobile UI Enhancements & Pipeline Fixes]],[[askNYC: 3D Map-Dominant Dashboard UI Redesign (Pull Request #7)]],[[AskNYC Frontend UI Specification (Sariya's Task)]]
