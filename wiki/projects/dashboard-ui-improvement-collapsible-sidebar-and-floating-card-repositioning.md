---
title: "Dashboard UI Improvement: Collapsible Sidebar and Floating Card Repositioning"
author: ai
created_at: 2026-04-10T21:40:59.091Z
last_ai_edit: 2026-04-10T21:40:59.091Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-dashboard-collapsible-sidebar-reposition-floating-car-e0f754.md]]"
tags:
  - dashboard
  - ui
  - sidebar
  - collapsible
  - floating cards
  - frontend
  - fix
  - asknyc
  - usability
---

# Dashboard UI Improvement: Collapsible Sidebar and Floating Card Repositioning

This update addresses a UI issue on the dashboard where floating cards were obscured by the sidebar. It introduces a collapsible sidebar feature, allowing it to condense to an icon-only rail, and repositions the floating cards with a dynamic left offset to ensure visibility and proper vertical centering.

## Key Concepts

Collapsible Sidebar,Floating UI Elements,Dashboard User Interface,Dynamic Positioning,Chevron Toggle

## Details

This entry documents a user interface enhancement implemented in the `rahilsinghi/askNYC` repository, specifically targeting the dashboard component. The primary issue resolved was the overlap between floating cards and the previously fixed-width sidebar, leading to cards being hidden or partially obscured. 

**Key Changes:**
*   **Collapsible Sidebar:** The sidebar now features a collapsible mechanism, actuated by a chevron toggle. When collapsed, it reduces to a compact, icon-only 'rail' with a width of 56 pixels, significantly freeing up screen real estate.
*   **Floating Card Repositioning:** To prevent further overlap, the floating cards have been repositioned. They are now vertically centered and utilize a dynamic left offset. This offset adjusts based on the sidebar's state (expanded or collapsed) to maintain proper spacing and ensure the cards are always fully visible.

This fix improves the user experience by making the dashboard more adaptable to different screen sizes and user preferences, while ensuring all critical UI elements are accessible and visible.

**Commit Details:**
*   **Repository:** `rahilsinghi/askNYC`
*   **SHA:** `e46df7f`
*   **Date:** `2026-03-28T16:41:17Z`
*   **Author:** Rahil Singhi
*   **Files changed:** 3
*   **Additions:** +73 lines
*   **Deletions:** -26 lines

## Related

[[Dashboard]],[[User Interface (UI)]],[[Sidebar Design]],[[Floating Elements]],[[askNYC Project]]
