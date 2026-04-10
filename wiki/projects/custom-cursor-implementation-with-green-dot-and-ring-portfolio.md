---
title: Custom Cursor Implementation with Green Dot and Ring (Portfolio)
author: ai
created_at: 2026-04-10T02:25:52.135Z
last_ai_edit: 2026-04-10T02:25:52.135Z
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
  - javascript
  - css
  - ui
  - desktop
  - hover-effects
  - prefers-reduced-motion
---

# Custom Cursor Implementation with Green Dot and Ring (Portfolio)

A custom desktop cursor feature added to Rahil Singhi's portfolio, featuring a green dot with a lerp-smoothed ring that follows the cursor. The ring expands on interactive elements like links and buttons, and includes accessibility support via prefers-reduced-motion.

## Key Concepts

- **Custom Cursor Design:** Replaces the default browser cursor with a styled green dot and surrounding ring
- **Lerp Smoothing:** Linear interpolation (lerp) is used to create a fluid, delayed follow effect for the cursor ring
- **Hover Expansion:** The cursor ring scales up when hovering over interactive elements (links and buttons)
- **Desktop-Only:** The custom cursor is scoped to desktop viewports, preserving default behavior on touch devices
- **prefers-reduced-motion:** Accessibility consideration that respects user system settings to reduce or disable animations
- **Crosshair Style:** The base cursor uses a crosshair visual metaphor as part of the design aesthetic

## Details

## Overview
This feature was introduced in commit `384eaa1` on March 11, 2026, authored by Rahil Singhi in the `rahilsinghi/portfolio` repository. It adds a fully custom cursor experience to the portfolio site.

## Implementation Details
- **Files Changed:** 2
- **Additions:** 232 lines
- **Deletions:** 0 lines

## Cursor Behavior
The cursor consists of two visual elements:
1. **Green Dot:** A small, precise indicator that follows the actual cursor position.
2. **Ring:** A larger circular outline that smoothly follows the cursor using lerp (linear interpolation), creating a lagging, fluid motion effect.

## Interactive States
When the user hovers over interactive elements such as `<a>` (links) or `<button>` elements, the ring expands in size, providing a visual affordance that indicates interactivity.

## Accessibility
The implementation respects the `prefers-reduced-motion` CSS media query. When a user has motion reduction enabled in their system preferences, the cursor animations are suppressed or minimized to avoid discomfort.

## Scope
The custom cursor is applied only on desktop devices. Mobile and touch-based devices retain the default cursor/touch behavior, ensuring a clean and appropriate experience across device types.

## Related

- [[Portfolio Project - Rahil Singhi]]
- [[CSS Animations and Transitions]]
- [[Linear Interpolation (Lerp) in UI]]
- [[Web Accessibility - prefers-reduced-motion]]
- [[Interactive Hover Effects]]
- [[JavaScript Cursor Tracking]]
