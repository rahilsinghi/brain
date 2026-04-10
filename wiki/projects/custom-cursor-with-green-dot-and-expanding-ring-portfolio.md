---
title: Custom Cursor with Green Dot and Expanding Ring (Portfolio)
author: ai
created_at: 2026-04-10T02:27:26.282Z
last_ai_edit: 2026-04-10T02:27:26.282Z
last_human_edit: null
last_embedded_hash: 9ff02020523583d4
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-feat-add-custom-cursor-with-green-dot-ring-expands-on-50b81e.md]]"
tags:
  - cursor
  - animation
  - lerp
  - accessibility
  - portfolio
  - ui
  - javascript
  - css
  - hover-effects
  - desktop
  - prefers-reduced-motion
  - green-dot
  - interactive
---


# Custom Cursor with Green Dot and Expanding Ring (Portfolio)

A desktop-only custom cursor implementation added to Rahil Singhi's portfolio, featuring a green dot and a lerp-smoothed ring that expands on interactive elements like links and buttons. The implementation includes accessibility support via the prefers-reduced-motion media query. This was introduced in commit 384eaa1 on March 11, 2026.

## Key Concepts

- **Custom Cursor**: A CSS/JS-driven cursor replacement using a green dot and a circular ring overlay
- **Lerp Smoothing**: Linear interpolation used to create a smooth, lagging follow effect for the cursor ring
- **Interactive Hover Expansion**: The ring scales up when hovering over interactive elements such as links and buttons
- **Desktop-Only**: The custom cursor behavior is scoped to desktop viewport sizes, preserving default cursor on mobile/touch devices
- **prefers-reduced-motion**: Accessibility consideration that disables or reduces cursor animation for users who have opted into reduced motion settings
- **Crosshair Cursor**: The base cursor style uses a crosshair design as the primary pointer indicator

## Details

## Overview
This feature introduces a fully custom cursor experience to Rahil Singhi's portfolio site. The cursor consists of two visual elements: a small green dot that tracks the pointer precisely, and a larger ring that follows with a lerp-smoothed lag for a fluid, dynamic feel.

## Implementation Details
- **Files Changed:** 2
- **Additions:** 232 lines
- **Deletions:** 0 lines
- **Commit SHA:** 384eaa1
- **Date:** 2026-03-11T23:06:32Z

## Behavior
- The green dot snaps directly to the cursor position
- The ring follows using linear interpolation (lerp), creating a trailing smooth animation
- On hover over interactive elements (`<a>`, `<button>`, etc.), the ring expands to provide visual feedback
- The custom cursor is only activated on desktop devices to avoid conflicts with touch-based navigation

## Accessibility
The implementation respects the `prefers-reduced-motion` CSS media query. When a user has enabled reduced motion preferences in their OS or browser, the lerp animation and ring expansion effects are suppressed or disabled entirely, ensuring an inclusive experience.

## Visual Design
- Color: Green dot accent, consistent with portfolio theme
- Style: Crosshair-inspired base cursor
- Interaction states: Default and expanded ring on hover

## Related

- [[Rahil Singhi Portfolio]]
- [[CSS Custom Cursor Techniques]]
- [[Linear Interpolation in UI Animation]]
- [[prefers-reduced-motion Accessibility]]
- [[Interactive Hover Effects]]
- [[Desktop vs Mobile UI Differentiation]]
