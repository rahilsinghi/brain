---
title: Three-Layer Background Animation (Portfolio)
author: ai
created_at: 2026-04-12T17:05:37.547Z
last_ai_edit: 2026-04-12T17:05:37.547Z
last_human_edit: null
last_embedded_hash: d671a34b877ddd79
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-feat-add-three-layer-background-animation-15d5d1.md]]"
tags:
  - animation
  - css
  - canvas
  - ui/ux
  - accessibility
  - portfolio
---


# Three-Layer Background Animation (Portfolio)

This feature introduces a subtle, three-layer background animation to the [[rahilsinghi/portfolio]] project, combining a drifting CSS grid, a faint character rain effect via canvas, and CRT scan lines. Designed with accessibility in mind, it respects the `prefers-reduced-motion` user preference for a non-intrusive visual experience.

## Key Concepts

[[CSS]] Grid Animation,[[Canvas]] Graphics,CRT Scanline Effect,[[prefers-reduced-motion]],Subtle UI Animation

## Details

A three-layer background animation was implemented for the [[rahilsinghi/portfolio]] project (commit `59c6042`). This animation comprises:

1.  **Drifting Grid**: A background grid implemented using [[CSS]], providing a subtle, continuous motion.
2.  **Faint Character Rain**: A generative animation using [[Canvas]] that simulates a light 'character rain' effect, adding a dynamic, yet barely perceptible, layer.
3.  **CRT Scan Lines**: A visual overlay mimicking classic Cathode Ray Tube (CRT) display scan lines, contributing to a retro-futuristic aesthetic.

The animation is designed to be extremely subtle, visible only upon close inspection, and prioritizes user experience by respecting the `prefers-reduced-motion` media query. This ensures that users who prefer minimal animation for accessibility or comfort reasons will not experience the effect.

## Related

[[rahilsinghi/portfolio]],[[prefers-reduced-motion]]
