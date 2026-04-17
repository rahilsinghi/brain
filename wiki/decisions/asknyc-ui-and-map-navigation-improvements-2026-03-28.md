---
title: "askNYC: UI and Map Navigation Improvements (2026-03-28)"
author: ai
created_at: 2026-04-10T15:11:56.653Z
last_ai_edit: 2026-04-10T15:11:56.653Z
last_human_edit: null
last_embedded_hash: ef3a6d5515ca43d2
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-move-data-cards-to-floating-map-overlay-fix-map-flyto-7d1bdc.md]]"
tags:
  - bugfix
  - ui
  - map
  - frontend
  - refactor
  - asknyc
  - commit
---


# askNYC: UI and Map Navigation Improvements (2026-03-28)

This article details a significant update to the `rahilsinghi/askNYC` project, focusing on user interface and map navigation enhancements. It covers the relocation of data cards to a floating overlay and a critical fix for the map's `flyTo` functionality. Additional improvements include a `QrBridge` runtime error fix and refactoring of the `IntelligenceBrief` component.

## Key Concepts

FloatingCards component,Map flyTo functionality,UI/UX improvements,IntelligenceBrief component,QrBridge component,Dependency management in React effects

## Details

This commit (`202fec2`) introduces several key improvements and fixes within the `rahilsinghi/askNYC` repository:

*   **Data Card Relocation**: Data cards were moved from a previously cramped sidebar into a new `FloatingCards` component. This component overlays the map in the bottom-left corner, is scrollable, and has a maximum height of `50vh`, significantly improving the layout and user experience by providing more space and a less intrusive display for data.
*   **Map `flyTo` Functionality Fix**: An issue that caused the map to be entirely destroyed and recreated on every center change, rather than smoothly flying to the new coordinates, was resolved. This was achieved by removing `centerLat` and `centerLng` from the initialization effect dependencies, allowing the map to update its view smoothly.
*   **`QrBridge` Runtime Error Fix**: A runtime error occurring in the `QrBridge` component was fixed. The resolution involved moving a function definition above its default export, ensuring proper scope and availability.
*   **`IntelligenceBrief` Component Refactoring**: Redundant props (`cards`, `onSendQuery`, `hasImage`) were removed from the `IntelligenceBrief` component. This reflects an updated design where the sidebar now primarily displays the transcript, tools, and footer, streamlining the `IntelligenceBrief`'s responsibilities.

## Related

[[askNYC Project]],[[FloatingCards Component]],[[IntelligenceBrief Component]],[[Map Navigation]],[[User Interface Design]]
