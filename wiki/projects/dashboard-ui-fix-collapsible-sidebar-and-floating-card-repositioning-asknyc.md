---
title: "Dashboard UI Fix: Collapsible Sidebar and Floating Card Repositioning (askNYC)"
author: ai
created_at: 2026-04-11T01:37:56.318Z
last_ai_edit: 2026-04-11T01:37:56.318Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-dashboard-collapsible-sidebar-reposition-floating-car-e0f754.md]]"
tags:
  - asknyc
  - dashboard
  - ui
  - ux
  - fix
  - sidebar
  - layout
---

# Dashboard UI Fix: Collapsible Sidebar and Floating Card Repositioning (askNYC)

This update for the askNYC dashboard addresses a UI issue where floating data cards were obscured by the sidebar. The fix involves repositioning the cards with a dynamic left offset and implementing a collapsible sidebar, improving user experience and layout responsiveness.

## Key Concepts

User Interface (UI),User Experience (UX),Collapsible Sidebar,Floating Data Cards,Dynamic Layout,Responsiveness

## Details

This commit (e46df7f) in the `rahilsinghi/askNYC` repository resolves a significant UI problem on the askNYC dashboard. Previously, floating data cards would be hidden behind the sidebar due to a fixed `left-4` positioning while the sidebar occupied `200px` of space. The implemented fix repositions these cards to be vertically centered and applies a dynamic left offset, ensuring they are always visible and correctly aligned.

Furthermore, the sidebar itself has been enhanced with a collapse functionality. Users can now toggle the sidebar to an icon-only `56px` rail using a chevron button, freeing up screen real estate and improving the overall dashboard layout.

## Related

[[askNYC]],[[askNYC Frontend Backend Integration Update (2026-03-28)]],[[Dashboard UI Fix: Collapsible Sidebar and Card Repositioning]],[[Dashboard UI Improvement: Collapsible Sidebar and Floating Card Repositioning]],[[askNYC: Mobile UI Enhancements & Pipeline Fixes]],[[askNYC: Mobile UI/UX Enhancements and Remote Pipeline Fixes (PR #8 Merge)]],[[askNYC: UI and Map Navigation Improvements (2026-03-28)]],[[Collapsible QR Code Bridge Section (askNYC)]]
