---
title: Custom Cursor (Green Dot)
author: ai
created_at: 2026-04-10T22:06:27.027Z
last_ai_edit: 2026-04-10T22:06:27.027Z
last_human_edit: null
last_embedded_hash: 6bf770160c228170
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-feat-add-custom-cursor-with-green-dot-ring-expands-on-50b81e.md]]"
tags:
  - custom-cursor
  - ui
  - ux
  - animation
  - javascript
  - css
  - accessibility
  - portfolio
  - web-development
  - frontend
  - hover-effect
---


# Custom Cursor (Green Dot)

This wiki entry details the implementation of a custom crosshair cursor featuring a green dot and an expanding ring. Designed for desktop, it incorporates lerp-smoothed movement and expands on interactive elements like links and buttons, while also respecting `prefers-reduced-motion` settings.

## Key Concepts

* Custom Cursor,* Crosshair Cursor,* Lerp-smoothed Animation,* Interactive Hover Effects,* Accessibility (prefers-reduced-motion),* User Interface (UI),* User Experience (UX)

## Details

This feature introduces a custom, desktop-only cursor to enhance the user interface of the `rahilsinghi/portfolio` project. The cursor is designed as a crosshair, visually comprising a central green dot and an outer ring.

Key behaviors and characteristics include:

*   **Visual Design**: A green dot at the cursor's center, surrounded by a ring.
*   **Movement**: The ring follows the cursor's movement across the screen using a lerp-smoothing interpolation, providing a fluid and modern feel rather than a rigid attachment.
*   **Interactivity**: The outer ring dynamically expands when the cursor hovers over interactive elements such as links and buttons, providing clear visual feedback to the user about clickable areas.
*   **Platform Restriction**: The custom cursor is implemented exclusively for desktop environments, likely falling back to the default system cursor on mobile or touch-based devices.
*   **Accessibility**: Critical accessibility support is included by respecting the user's `prefers-reduced-motion` setting. If a user has this preference enabled, the smooth animation and expansion effects are either disabled or significantly toned down to prevent discomfort.

This implementation reflects a commitment to modern web design principles, focusing on subtle animations and interactive cues to improve user engagement and clarity, all while maintaining accessibility best practices.

## Related

[[Web Design]],[[User Interface]],[[User Experience]],[[Animation]],[[JavaScript]],[[CSS]],[[Accessibility]],[[Rahil Singhi]],[[Portfolio Project]],[[Lerp Function]]
