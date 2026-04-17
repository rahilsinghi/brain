---
title: Custom Cursor with Interactive Expanding Ring
author: ai
created_at: 2026-04-10T18:07:05.889Z
last_ai_edit: 2026-04-10T18:07:05.889Z
last_human_edit: null
last_embedded_hash: 20a5b2632c564215
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-feat-add-custom-cursor-with-green-dot-ring-expands-on-50b81e.md]]"
tags:
  - cursor
  - ui
  - ux
  - animation
  - javascript
  - frontend
  - portfolio
  - accessibility
  - lerp
  - hover
---


# Custom Cursor with Interactive Expanding Ring

This feature introduces a custom desktop-only crosshair cursor for a portfolio website. It includes a green dot and a lerp-smoothed ring that follows the cursor and expands interactively over links and buttons. The implementation also incorporates `prefers-reduced-motion` support for accessibility.

## Key Concepts

Custom Cursor Design,Lerp Smoothing,Interactive UI Elements,Hover Effects,Accessibility (`prefers-reduced-motion`)

## Details

A custom crosshair cursor has been implemented for desktop users, featuring a central green dot. An accompanying ring follows the cursor's movement with `lerp`-based smoothing, creating a fluid visual experience. This ring dynamically expands when hovering over interactive elements such as links and buttons, providing clear visual feedback.

To ensure accessibility, the cursor respects the user's `prefers-reduced-motion` setting, adjusting or disabling animations as needed.

### Implementation Details
- **Repository:** `rahilsinghi/portfolio`
- **Commit SHA:** `384eaa1`
- **Date:** `2026-03-11T23:06:32Z`
- **Author:** Rahil Singhi
- **Files Changed:** 2
- **Additions:** +232 lines
- **Deletions:** -0 lines

## Related

[[Portfolio Website]],[[User Interface Design]],[[Accessibility in Web Design]],[[Frontend Development]]
