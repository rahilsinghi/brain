---
title: "Brain-Explorer UI Fixes: Solid Backgrounds and Softer Glows"
author: ai
created_at: 2026-04-11T00:12:59.472Z
last_ai_edit: 2026-04-11T00:12:59.472Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-fix-ui-solid-backgrounds-for-panel-tooltip-softer-78c78b.md]]"
tags:
  - ui
  - ux
  - webgl
  - css
  - glow
  - background
  - brain-explorer
  - fix
  - styling
---

# Brain-Explorer UI Fixes: Solid Backgrounds and Softer Glows

This update addresses UI issues in [[Brain-Explorer]], replacing problematic `backdrop-filter:blur()` with solid opaque backgrounds for better visibility over WebGL canvases. It also refines the glow effect, changing it from a sphere to a plane with a radial gradient for a softer appearance and adjusting its scale and opacity.

## Key Concepts

User Interface (UI),User Experience (UX),WebGL Canvas,`backdrop-filter:blur()` CSS property,CSS Styling,Glow Effects

## Details

This commit (`bdcd892`) dated 2026-04-10 by Rahil Singhi (co-authored by Claude Opus 4.6) introduces several UI fixes for the [[Brain-Explorer]] project. The primary motivation was the incompatibility of `backdrop-filter:blur()` with WebGL canvases.

**Key Changes:**

*   **Backgrounds:** The `glass` CSS class, which relied on `backdrop-filter:blur()`, was replaced with solid opaque `#0c0c1d` backgrounds for panels and tooltips. This ensures consistent visibility and readability, especially when overlaid on the WebGL canvas.
*   **Text Visibility:** Inline styles were applied to text colors to guarantee proper visibility against the new solid backgrounds.
*   **Glow Effect Refinement:** The glow effect was re-engineered from a sphere-based implementation to a plane utilizing a canvas radial gradient texture. This change provides a significantly softer edge to the glow.
*   **Glow Parameters Adjustment:** The glow's scale was reduced from 4 to 2.5, and its opacity was lowered from 0.12 to 0.08, contributing to a more subtle and refined visual effect.

## Related

[[Brain-Explorer]],[[Brain-Explorer: Color Scheme Enhancement (2026-04-10)]],[[WebGL]],[[User Interface]],[[User Experience]],[[CSS Styling]]
