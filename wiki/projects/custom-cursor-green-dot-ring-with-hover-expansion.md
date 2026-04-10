---
title: "Custom Cursor: Green Dot + Ring with Hover Expansion"
author: ai
created_at: 2026-04-10T02:27:30.383Z
last_ai_edit: 2026-04-10T02:27:30.383Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-feat-add-custom-cursor-with-green-dot-ring-expands-on-50b81e.md]]"
tags:
  - cursor
  - animation
  - lerp
  - accessibility
  - portfolio
  - javascript
  - css
  - ux
  - desktop
  - hover
  - prefers-reduced-motion
  - frontend
---

# Custom Cursor: Green Dot + Ring with Hover Expansion

A custom desktop cursor implementation added to Rahil Singhi's portfolio featuring a green dot and a lerp-smoothed ring that follows the cursor. The ring expands when hovering over interactive elements like links and buttons, and includes accessibility support via prefers-reduced-motion.

## Key Concepts

- **Custom Cursor**: Replaces the default browser cursor with a styled green dot and surrounding ring element
- **Lerp Smoothing**: Linear interpolation used to create a fluid, delayed follow effect for the cursor ring
- **Hover Expansion**: The ring scales up when the cursor enters interactive elements (links, buttons) for visual feedback
- **Desktop-Only**: The custom cursor is scoped to desktop viewports, preserving default behavior on touch/mobile devices
- **prefers-reduced-motion**: Accessibility media query respected to disable or simplify animations for users who opt out of motion effects

## Details

## Overview
This feature introduces a fully custom cursor experience on Rahil Singhi's portfolio site. The implementation replaces the default system cursor on desktop with a two-part visual: a small green dot that tracks the cursor precisely, and a larger ring element that follows with lerp (linear interpolation) smoothing for a fluid lag effect.

## Implementation Details
- **Commit SHA:** `384eaa1`
- **Date:** 2026-03-11
- **Files Changed:** 2
- **Additions:** +232 lines
- **Deletions:** 0 lines

## Behavior
### Default State
The green dot sits at the exact cursor position while the ring smoothly interpolates toward the cursor position each animation frame, creating a trailing effect.

### Interactive Hover State
When the cursor moves over interactive elements such as `<a>` tags and `<button>` elements, the ring expands in size to provide a clear affordance that the element is clickable.

### Desktop Scope
The custom cursor logic is applied only on desktop environments. Mobile and touch devices retain their default cursor/touch behavior, avoiding conflicts with touch interactions.

## Accessibility
The implementation respects the `prefers-reduced-motion` CSS media query. Users who have indicated a preference for reduced motion in their operating system settings will have the smoothing animation disabled or simplified, ensuring the feature does not cause discomfort for motion-sensitive users.

## Technical Notes
- Lerp smoothing formula applied per animation frame: `current += (target - current) * factor`
- Ring expansion likely achieved via CSS class toggle or CSS custom property update on hover detection through JavaScript event listeners

## Related

- [[Portfolio Website]]
- [[CSS Animations]]
- [[JavaScript Animation Loop]]
- [[Linear Interpolation (Lerp)]]
- [[Accessibility and Motion Preferences]]
- [[Interactive UI Feedback]]
- [[Rahil Singhi]]
