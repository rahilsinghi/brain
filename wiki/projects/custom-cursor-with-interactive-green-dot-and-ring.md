---
title: Custom Cursor with Interactive Green Dot and Ring
author: ai
created_at: 2026-04-12T17:12:58.627Z
last_ai_edit: 2026-04-12T17:12:58.627Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-feat-add-custom-cursor-with-green-dot-ring-expands-on-50b81e.md]]"
tags:
  - custom cursor
  - ui/ux
  - interaction design
  - javascript
  - frontend
  - accessibility
  - portfolio
---

# Custom Cursor with Interactive Green Dot and Ring

This feature introduces a custom desktop-only cursor to the portfolio, characterized by a green dot and a lerp-smoothed ring that follows the cursor. The ring visually expands when hovering over interactive elements like links and buttons, enhancing user engagement. It also incorporates `prefers-reduced-motion` support for improved accessibility.

## Key Concepts

Custom Cursor,Interactive UI,Linear Interpolation (Lerp),prefers-reduced-motion,User Experience (UX),Accessibility

## Details

A custom cursor, featuring a prominent green dot and a surrounding ring, has been implemented for the desktop version of the portfolio. The ring's movement is smoothed using linear interpolation (lerp), providing a fluid and aesthetically pleasing follow effect. A key interactive element of this cursor is its ability to expand when positioned over interactive HTML elements such as links and buttons, offering clear visual feedback to the user about clickable areas.

To ensure an inclusive user experience, the implementation includes support for the `prefers-reduced-motion` media query. This allows users with motion sensitivities to opt for a simpler, less animated cursor experience, respecting their system preferences and enhancing accessibility. This feature was added to the [[Rahil Singhi's Portfolio]] repository.

## Related

[[Rahil Singhi's Portfolio]],[[UI/UX Enhancements]],[[Accessibility]]
