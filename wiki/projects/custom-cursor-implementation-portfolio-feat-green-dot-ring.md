---
title: "Custom Cursor Implementation – Portfolio (feat: green dot + ring)"
author: ai
created_at: 2026-04-10T02:27:26.150Z
last_ai_edit: 2026-04-10T02:27:26.150Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-feat-add-custom-cursor-with-green-dot-ring-expands-on-50b81e.md]]"
tags:
  - cursor
  - animation
  - portfolio
  - lerp
  - accessibility
  - css
  - javascript
  - ui
  - hover-effects
  - desktop
  - prefers-reduced-motion
  - rahil-singhi
---

# Custom Cursor Implementation – Portfolio (feat: green dot + ring)

This commit adds a custom desktop cursor to Rahil Singhi's portfolio site, featuring a green dot and a lerp-smoothed ring that expands when hovering over interactive elements like links and buttons. The implementation is desktop-only and includes accessibility support via the `prefers-reduced-motion` media query.

## Key Concepts

- **Custom Cursor**: A CSS/JS-driven cursor replacing the default browser cursor, consisting of a green dot and an animated ring
- **Lerp Smoothing**: Linear interpolation used to create a smooth, lagging follow effect for the cursor ring
- **Hover Expansion**: The ring scales up when the cursor hovers over interactive elements (links, buttons) to provide visual feedback
- **Desktop-Only**: The custom cursor behavior is scoped to desktop environments, leaving touch/mobile unaffected
- **Prefers-Reduced-Motion**: Accessibility consideration that disables or reduces cursor animations for users who have opted into reduced motion settings

## Details

## Overview

Commit `384eaa1` introduces a fully custom cursor experience to the `rahilsinghi/portfolio` repository. The change adds **232 lines** across **2 files** with no deletions, indicating a net-new feature addition.

## Cursor Design

The cursor is composed of two visual elements:
- **Green Dot**: A small, precise indicator that tracks the exact pointer position
- **Ring**: A larger circular outline that follows the dot with a lerp-smoothed delay, creating a trailing animation effect

## Interaction Behavior

When the user hovers over interactive elements such as `<a>` tags or `<button>` elements, the ring expands in size, providing a clear visual affordance that an element is clickable.

## Technical Details

- **Lerp (Linear Interpolation)**: Used to animate the ring's position toward the actual cursor position each frame, resulting in a smooth, organic follow motion
- **Desktop-Only Scope**: The cursor is conditionally applied only on desktop viewports, ensuring mobile and touch users see native cursor/touch behavior
- **Accessibility**: Respects the `prefers-reduced-motion` CSS media query, disabling or simplifying animations for users who have enabled reduced motion in their OS settings

## Commit Metadata

| Field | Value |
|---|---|
| Repository | rahilsinghi/portfolio |
| SHA | 384eaa1 |
| Date | 2026-03-11T23:06:32Z |
| Author | Rahil Singhi |
| Files Changed | 2 |
| Additions | +232 |
| Deletions | -0 |

## Related

- [[Portfolio Project – Rahil Singhi]]
- [[CSS Animations and Transitions]]
- [[Linear Interpolation (Lerp) in UI Animation]]
- [[Accessibility – prefers-reduced-motion]]
- [[Interactive Hover Effects]]
- [[Desktop UI Enhancements]]
