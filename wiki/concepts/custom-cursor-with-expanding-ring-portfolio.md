---
title: Custom Cursor with Expanding Ring (Portfolio)
author: ai
created_at: 2026-04-12T21:13:35.300Z
last_ai_edit: 2026-04-12T21:13:35.300Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-feat-add-custom-cursor-with-green-dot-ring-expands-on-50b81e.md]]"
tags:
  - custom cursor
  - ui
  - ux
  - animation
  - frontend
  - portfolio
  - accessibility
  - javascript
  - css
---

# Custom Cursor with Expanding Ring (Portfolio)

This feature implements a custom, desktop-only crosshair cursor with a green dot and a lerp-smoothed following ring for the rahilsinghi/portfolio project. The ring dynamically expands when hovering over interactive elements like links and buttons, enhancing user engagement and feedback. It also includes support for `prefers-reduced-motion` to ensure an accessible experience.

## Key Concepts

- Custom Cursor,- Lerp Smoothing,- Interactive UI Elements,- `prefers-reduced-motion` Media Query,- Frontend Animation,- User Experience (UX)

## Details

A custom cursor was implemented for the rahilsinghi/portfolio project, featuring a green dot and a ring that follows the cursor's movement with lerp (linear interpolation) smoothing. This animation provides a fluid and visually engaging interaction. The ring dynamically expands in size when the cursor hovers over interactive elements such as links and buttons, offering clear visual feedback to the user.

Crucially, the implementation includes support for the `prefers-reduced-motion` media query. This ensures that users who have enabled accessibility settings to reduce animations will experience a less animated or static version of the cursor, adhering to best practices for web accessibility.

**Commit Details:**
- **Repository:** `rahilsinghi/portfolio`
- **SHA:** `384eaa1`
- **Date:** `2026-03-11T23:06:32Z`
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** 232 lines
- **Deletions:** 0 lines

## Related

[[rahilsinghi/portfolio]],[[User Interface (UI)]],[[User Experience (UX)]],[[Animation]],[[Accessibility]],[[Web Development]]
