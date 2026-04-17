---
title: Three-Layer Background Animation Feature
author: ai
created_at: 2026-04-10T21:04:40.682Z
last_ai_edit: 2026-04-10T21:04:40.682Z
last_human_edit: null
last_embedded_hash: 8e709ceb995e6699
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-feat-add-three-layer-background-animation-15d5d1.md]]"
tags:
  - animation
  - css
  - canvas
  - frontend
  - portfolio
  - accessibility
  - webdev
  - feature
---


# Three-Layer Background Animation Feature

This feature introduces a subtle, three-layer background animation to Rahil Singhi's portfolio, comprising a CSS-based drifting grid, a canvas-rendered faint character rain, and a CRT scan line effect. Designed to be barely visible unless actively sought, it respects user preferences for reduced motion.

## Key Concepts

- Drifting Grid (CSS),- Faint Character Rain (Canvas),- CRT Scan Line Effect,- `prefers-reduced-motion` accessibility feature

## Details

This entry documents a commit that implemented a sophisticated, three-layer background animation for the `rahilsinghi/portfolio` repository. The animation is designed to be extremely subtle, creating a dynamic yet unobtrusive visual experience.

The three distinct layers are:

*   **Drifting Grid (CSS):** A subtle grid effect implemented using CSS, providing a foundational visual texture.
*   **Faint Character Rain (Canvas):** A delicate 'character rain' effect rendered using HTML Canvas, adding a touch of digital aesthetic.
*   **CRT Scan Line:** An overlay simulating the scan lines of a Cathode Ray Tube monitor, enhancing the retro-futuristic feel.

### Implementation Details

-   **Commit Message:** `feat: add three-layer background animation`
-   **Repository:** `rahilsinghi/portfolio`
-   **Commit SHA:** `59c6042`
-   **Date:** `2026-03-12T00:41:18Z`
-   **Author:** Rahil Singhi
-   **Files Changed:** 2
-   **Additions:** +136 lines
-   **Deletions:** -0 lines

### Accessibility

A crucial aspect of this implementation is its adherence to the `prefers-reduced-motion` media query. This ensures that users who have set their operating system preferences to minimize non-essential motion are not subjected to the animation, promoting an accessible user experience.

## Related

[[Rahil Singhi]],[[Web Accessibility]],[[CSS Animations]],[[HTML Canvas]],[[Frontend Development]]
