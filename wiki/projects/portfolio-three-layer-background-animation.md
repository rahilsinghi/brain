---
title: Portfolio Three-Layer Background Animation
author: ai
created_at: 2026-04-13T01:04:45.518Z
last_ai_edit: 2026-04-13T01:04:45.518Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-feat-add-three-layer-background-animation-15d5d1.md]]"
tags:
  - animation
  - ui/ux
  - frontend
  - css
  - canvas
  - accessibility
  - portfolio
  - background
  - effect
---

# Portfolio Three-Layer Background Animation

This feature introduces a subtle three-layer background animation to the portfolio, incorporating a drifting CSS grid, faint canvas character rain, and a CRT scan line effect. Designed with accessibility in mind, it fully respects the `prefers-reduced-motion` setting.

## Key Concepts

Three-Layer Background,CSS Grid Animation,Canvas Animation,CRT Scan Line Effect,`prefers-reduced-motion` Media Query,Web Animation,UI/UX Enhancement

## Details

A new three-layer background animation was implemented for the `rahilsinghi/portfolio` project (commit `59c6042`). The animation is designed to be extremely subtle, enhancing the visual experience without being distracting.

The layers consist of:

1.  **Drifting Grid**: A background grid effect implemented using CSS.
2.  **Character Rain**: A faint, raining character effect rendered on an HTML Canvas element.
3.  **CRT Scan Line**: An overlay that simulates the scan lines found on older Cathode Ray Tube (CRT) displays.

Crucially, the entire animation respects the user's `prefers-reduced-motion` system setting, disabling or simplifying the effects for users who prefer minimal motion, thus ensuring accessibility and a comfortable viewing experience. The implementation involved 136 lines of additions across 2 files.

## Related

[[Add 'Recent' Section to Navigation Dots (Portfolio)]],[[Binary Dissolution Hover Effect on Headshot (Portfolio)]],[[Boot Screen and Easter Egg Improvements (rahilsinghi/portfolio, a286207)]],[[Add Code Typing Background and Morphing Numbers to Hackathon Section (Portfolio)]],[[Add 3D Tilt Effect on Featured Project Cards]],[[Add Terminal Easter Eggs to Portfolio]]
