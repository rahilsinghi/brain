---
title: Add Three-Layer Background Animation to Portfolio
author: ai
created_at: 2026-04-13T16:05:38.228Z
last_ai_edit: 2026-04-13T16:05:38.228Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-feat-add-three-layer-background-animation-15d5d1.md]]"
tags:
  - animation
  - background
  - css
  - canvas
  - ui
  - ux
  - portfolio
  - accessibility
  - prefers-reduced-motion
---

# Add Three-Layer Background Animation to Portfolio

This feature introduces a subtle, three-layer background animation to the portfolio, comprising a drifting CSS grid, faint character rain on a canvas, and CRT scan lines. Designed with accessibility in mind, it respects the `prefers-reduced-motion` setting, making the effects barely visible unless actively sought out.

## Key Concepts

CSS Grid,HTML Canvas,CRT Scan Lines,prefers-reduced-motion,Background Animation

## Details

A new feature has been added to the `rahilsinghi/portfolio` repository, introducing a sophisticated three-layer background animation. This animation is composed of: 

1.  **Drifting Grid**: Implemented using pure CSS for a lightweight and performant effect.
2.  **Faint Character Rain**: Rendered on an HTML canvas, providing a dynamic, subtle overlay of falling characters.
3.  **CRT Scan Line Effect**: A visual filter that mimics the aesthetic of older Cathode Ray Tube displays.

The animation is designed to be extremely subtle, often barely noticeable unless a user is specifically looking for it. A key aspect of this implementation is its adherence to accessibility best practices, specifically respecting the `prefers-reduced-motion` media query. Users who have enabled this setting in their operating system will experience minimal or no animation, ensuring a comfortable experience for everyone. This commit is identified by SHA `59c6042` and was made by Rahil Singhi on 2026-03-12.

## Related

[[Portfolio]],[[CSS]],[[HTML Canvas]],[[prefers-reduced-motion]]
