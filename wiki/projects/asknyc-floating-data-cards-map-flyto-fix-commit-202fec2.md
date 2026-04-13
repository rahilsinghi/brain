---
title: "askNYC: Floating Data Cards & Map FlyTo Fix (Commit 202fec2)"
author: ai
created_at: 2026-04-13T17:22:06.546Z
last_ai_edit: 2026-04-13T17:22:06.546Z
last_human_edit: null
last_embedded_hash: 31eb984cbf16dd5f
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-move-data-cards-to-floating-map-overlay-fix-map-flyto-7d1bdc.md]]"
tags:
  - asknyc
  - frontend
  - ui
  - ux
  - map
  - data cards
  - flyto
  - bug fix
  - react
---


# askNYC: Floating Data Cards & Map FlyTo Fix (Commit 202fec2)

This commit for the `askNYC` project focused on significant UI and map interaction improvements. It relocated data cards from a constrained sidebar to a new floating overlay component, enhancing user experience. Additionally, a critical bug in the map's `flyTo` functionality was resolved, enabling smoother navigation.

## Key Concepts

FloatingCards component,Map FlyTo functionality,IntelligenceBrief component,QrBridge,User Interface (UI),User Experience (UX),Frontend development,Map interaction

## Details

This commit (`202fec2`) by Rahil Singhi on 2026-03-28 addressed several key areas within the `rahilsinghi/askNYC` repository, resulting in 4 files changed with +76 additions and -78 deletions.

Key changes implemented:

*   **Data Card Relocation**: Data cards were moved from a cramped sidebar into a new `FloatingCards` component. This component now overlays the map in the bottom-left, is scrollable, and has a maximum height of 50vh, significantly improving the UI and information accessibility.
*   **Map FlyTo Fix**: The map's `flyTo` functionality was corrected by removing `centerLat` and `centerLng` from the `init` effect's dependencies. Previously, their presence caused the entire map to be destroyed and recreated on every center change, rather than performing a smooth transition. This fix enables seamless map navigation.
*   **QrBridge Runtime Error**: A runtime error related to `QrBridge` was resolved by moving its function definition above the default export, ensuring proper execution.
*   **IntelligenceBrief Component Streamlining**: The `IntelligenceBrief` component was simplified by removing the `cards`, `onSendQuery`, and `hasImage` props. The sidebar now solely displays transcript content, tools, and a footer, leading to a cleaner and more focused UI.

## Related

[[askNYC]],[[askNYC: UI and Map Navigation Improvements (2026-03-28)]],[[askNYC: Mobile UI Enhancements & Pipeline Fixes]],[[askNYC: Next.js 15 Dashboard with Real-time WebSocket UI]],[[askNYC: Mobile UI/UX Enhancements and Remote Pipeline Fixes (PR #8 Merge)]],[[askNYC: Cinematic Map Overhaul (feat)]],[[IntelligenceBrief]],[[QrBridge]]
