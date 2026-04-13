---
title: Three-Layer Background Animation (Portfolio)
author: ai
created_at: 2026-04-12T21:06:13.641Z
last_ai_edit: 2026-04-12T21:06:13.641Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-feat-add-three-layer-background-animation-15d5d1.md]]"
tags:
  - animation
  - css
  - canvas
  - portfolio
  - frontend
  - accessibility
  - ux
---

# Three-Layer Background Animation (Portfolio)

This commit introduces a subtle, three-layer background animation to the `rahilsinghi/portfolio` website. It features a drifting CSS grid, a faint canvas-based character rain, and a CRT scan line effect, all while respecting user motion preferences.

## Key Concepts

Drifting Grid (CSS),Character Rain (Canvas),CRT Scan Lines,prefers-reduced-motion (CSS Media Query)

## Details

This feature, implemented in the `rahilsinghi/portfolio` repository (SHA: `59c6042`, authored by Rahil Singhi on 2026-03-12), adds a sophisticated, multi-layered background animation to enhance the user experience without being obtrusive. The implementation involved changes across 2 files, resulting in 136 lines of added code.

The animation comprises three distinct layers:

1.  **Drifting Grid**: A subtle background grid effect implemented using CSS, providing a dynamic yet understated visual element.
2.  **Faint Character Rain**: A canvas-based animation that simulates a gentle, barely visible 'character rain' effect, adding a touch of digital ambiance.
3.  **CRT Scan Line**: An overlay that mimics the scan lines of a Cathode Ray Tube (CRT) display, contributing to a retro-futuristic aesthetic.

Crucially, the animation prioritizes user accessibility by incorporating the `prefers-reduced-motion` CSS media query. This ensures that users who have indicated a preference for less motion in their operating system settings will experience a static background, aligning with best practices for web accessibility. The overall effect is designed to be extremely subtle, intended to be perceived more as an atmospheric enhancement rather than a prominent visual feature.

## Related

[[Portfolio]]
