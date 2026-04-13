---
title: Pretext Text Background with CRT Scan Line Sync
author: ai
created_at: 2026-04-11T00:35:19.384Z
last_ai_edit: 2026-04-11T00:35:19.384Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-feat-background-add-pretext-text-background-with-crt-sca-2a7145.md]]"
tags:
  - background
  - pretext
  - crt
  - animation
  - portfolio
  - ui
  - frontend
  - css
  - javascript
  - commit
---

# Pretext Text Background with CRT Scan Line Sync

This feature implements a full-viewport, translucent text background layer for the `rahilsinghi/portfolio` website, powered by the `@chenglou/pretext` library. It creates a continuous text flow that dynamically wraps around a synchronized CRT scan line effect by reading real-time DOM positions. The implementation is optimized for 60fps performance, theme-aware, and responsive across various screen sizes.

## Key Concepts

Pretext Text Background,CRT Scan Line Synchronization,DOM Position Reading (getBoundingClientRect),Performance Optimization (DOM pooling, 60fps),Theme-Aware Design,Responsive Web Design,CSS Animation Integration

## Details

The 'Pretext Text Background with CRT Scan Line Sync' feature introduces an immersive visual element to the `rahilsinghi/portfolio` website. This background operates as a fixed layer at `z-index: -1`, ensuring it remains beneath primary content while being fully visible across the viewport.

Key implementation details include:

*   **`PretextBackground` Component**: Utilizes `@chenglou/pretext` for rendering, incorporating a DOM pool to maintain a smooth 60 frames per second (fps) performance.
*   **CRT Scan Line Synchronization**: The continuous text flow wraps dynamically, adjusting its layout based on the actual DOM position measured each frame using `getBoundingClientRect()`. This is crucial for its synchronization with a CSS-driven `crt-sweep` animation, eliminating the need for an independent JavaScript clock for this effect.
*   **Theme Awareness**: The background's opacity is dynamically adjusted based on the site's theme, with a translucency of `0.035` for dark themes and `0.05` for light themes, ensuring readability and aesthetic consistency.
*   **Responsiveness**: Font sizing for the pretext text is made responsive to accommodate different screen sizes, providing a consistent experience on mobile and desktop devices.

## Related

[[Add Pretext Submodule and @chenglou/pretext Dependency]],[[Boot Screen and Easter Egg Improvements (rahilsinghi/portfolio, a286207)]],[[rahilsinghi/portfolio]]
