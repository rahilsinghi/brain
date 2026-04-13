---
title: "UI Fix: Solid Backgrounds and Softer Glows in Brain Explorer"
author: ai
created_at: 2026-04-10T21:11:01.262Z
last_ai_edit: 2026-04-10T21:11:01.262Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-fix-ui-solid-backgrounds-for-panel-tooltip-softer-78c78b.md]]"
tags:
  - ui
  - bugfix
  - webgl
  - css
  - glow-effect
  - brain-explorer
  - design
  - frontend
  - commit
  - compatibility
---

# UI Fix: Solid Backgrounds and Softer Glows in Brain Explorer

This article details a UI fix for the Brain Explorer project, addressing `backdrop-filter:blur()` incompatibility with WebGL by implementing solid opaque backgrounds and ensuring text visibility. It also describes improvements to glow sprites, transitioning them from spheres to planes with canvas radial gradient textures for softer edges.

## Key Concepts

- `backdrop-filter:blur()`,- WebGL Rendering,- UI/UX Design,- Radial Gradients,- Glow Effects,- Front-end Compatibility

## Details

This commit addresses two primary UI improvements within the Brain Explorer project.

### Background Fix: WebGL Compatibility
**Problem:** The `backdrop-filter:blur()` CSS property, intended for a 'glassmorphism' effect, was found to be incompatible or non-functional when rendered over the WebGL canvas used in Brain Explorer. This likely led to visual artifacts or a complete lack of the desired blur effect.

**Solution:**
- The `glass` CSS class, which presumably applied the blur effect, was replaced.
- Solid opaque backgrounds, specifically using the color `#0c0c1d`, were implemented for panels and tooltips.
- To guarantee text readability against these new solid backgrounds, inline styles were applied to all text colors, ensuring they contrasted appropriately.

### Glow Sprite Improvements
**Problem:** The original glow sprites, likely rendered as spheres, may have appeared too harsh or unrealistic.

**Solution:**
- The glow elements were switched from a sphere geometry to a flat plane.
- A canvas-generated radial gradient texture was applied to this plane, creating soft, diffused edges for the glow effect.
- The overall scale of the glow was reduced from `4` to `2.5`.
- The opacity of the glow was decreased from `0.12` to `0.08`, contributing to a softer visual presence.

### Commit Details
- **Repository:** `rahilsinghi/brain-explorer`
- **Commit SHA:** `bdcd892`
- **Date:** `2026-04-10T19:43:27Z`
- **Author:** Rahil Singhi
- **Files Changed:** 4
- **Additions:** +223 lines
- **Deletions:** -81 lines
- **Co-authored:** Claude Opus 4.6 (1M context)

## Related

[[Brain Explorer (Project)]],[[WebGL]],[[User Interface Design]],[[CSS backdrop-filter]],[[Radial Gradient]]
