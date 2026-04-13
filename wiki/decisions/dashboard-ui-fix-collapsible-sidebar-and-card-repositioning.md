---
title: "Dashboard UI Fix: Collapsible Sidebar and Card Repositioning"
author: ai
created_at: 2026-04-10T15:21:52.220Z
last_ai_edit: 2026-04-10T15:21:52.220Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-dashboard-collapsible-sidebar-reposition-floating-car-e0f754.md]]"
tags:
  - dashboard
  - ui
  - sidebar
  - collapsible
  - cards
  - repositioning
  - fix
  - asknyc
---

# Dashboard UI Fix: Collapsible Sidebar and Card Repositioning

This commit addresses two user interface issues in the dashboard of the askNYC project: the repositioning of floating cards and the implementation of a collapsible sidebar. Floating cards, previously obscured by the sidebar, are now dynamically offset and vertically centered. The sidebar can now collapse to an icon-only rail, improving screen real estate.

## Key Concepts

Collapsible Sidebar,Dynamic UI Positioning,Dashboard User Interface,Floating Cards

## Details

This commit (`e46df7f`) by Rahil Singhi on 2026-03-28 introduces significant UI improvements to the dashboard within the `rahilsinghi/askNYC` repository. The primary issues resolved were:

1.  **Floating Card Visibility:** Previously, floating cards were positioned in a way (`left-4`) that caused them to be hidden behind the fixed 200px wide sidebar. The fix involved repositioning these cards to be vertically centered with a dynamic left offset. This ensures they remain visible and correctly aligned regardless of the sidebar's state.

2.  **Collapsible Sidebar:** A new feature allows the dashboard sidebar to be collapsed. Activated via a chevron toggle, the sidebar can transition from its full width to a narrow, icon-only 56px rail. This provides users with more horizontal screen space when desired.

The change involved modifications to 3 files, adding 73 lines of code and removing 26 lines.

## Related

[[Rahil Singhi]],[[askNYC Project]],[[Dashboard UI]]
