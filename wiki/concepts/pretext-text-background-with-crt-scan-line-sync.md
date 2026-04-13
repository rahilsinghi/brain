---
title: Pretext Text Background with CRT Scan Line Sync
author: ai
created_at: 2026-04-13T18:36:32.484Z
last_ai_edit: 2026-04-13T18:36:32.484Z
last_human_edit: null
last_embedded_hash: ba1cc89363aa2df5
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-feat-background-add-pretext-text-background-with-crt-sca-2a7145.md]]"
tags:
  - pretext
  - background
  - crt
  - animation
  - portfolio
  - frontend
  - ui
  - css
  - dom
  - javascript
---


# Pretext Text Background with CRT Scan Line Sync

This article describes the implementation of a full-viewport translucent text background layer in the portfolio project, utilizing the `@chenglou/pretext` library. The background features a CRT scan line sync effect, where continuous text dynamically wraps based on its real-time DOM position.

## Key Concepts

[[@chenglou/pretext]] library,CRT (Cathode Ray Tube) scan line effect,DOM positioning with `getBoundingClientRect()`,Full-viewport background layer,CSS animations for synchronization,Theme-aware styling,Responsive design

## Details

A new feature has been added to the `rahilsinghi/portfolio` repository: a full-viewport translucent text background layer. This background leverages the `@chenglou/pretext` library to render continuous text that visually 'flows' and wraps in sync with a CRT scan line animation. The text's wrapping behavior is dynamically calculated each frame by reading its actual DOM position using `getBoundingClientRect()`, ensuring precise alignment with the visual effect.

Key implementation details include:

*   **`PretextBackground` Component**: This component functions as a fixed layer positioned at `z-1` in the DOM, utilizing a DOM pool to maintain smooth animation at 60 frames per second (fps).
*   **Synchronization**: The text background's animation is directly synced to a CSS `crt-sweep` animation, eliminating the need for an independent JavaScript clock and ensuring visual consistency.
*   **Theme Awareness**: The opacity of the background text is adjusted based on the active theme, with a value of `0.035` for dark themes and `0.05` for light themes, ensuring readability and aesthetic integration.
*   **Responsiveness**: The font sizing for the background text is responsive, adapting to different screen sizes, including mobile devices, to maintain visual integrity across various viewports.

This enhancement was co-authored by Claude Opus 4.6.

## Related

[[Portfolio]],[[Add Pretext Submodule and @chenglou/pretext Dependency to Portfolio]],[[Add Pretext Submodule and @chenglou/pretext Dependency]],[[Adding Pretext Submodule and Dependency to Portfolio]]
