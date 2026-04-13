---
title: Light/Dark Mode System with CSS Variable Architecture
author: ai
created_at: 2026-04-11T01:28:08.251Z
last_ai_edit: 2026-04-11T01:28:08.251Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-feat-theme-add-light-dark-mode-system-with-css-variable-444139.md]]"
tags:
  - theme
  - dark mode
  - light mode
  - css variables
  - react
  - frontend
  - ui
  - portfolio
---

# Light/Dark Mode System with CSS Variable Architecture

This feature introduces a comprehensive light/dark mode system for the `rahilsinghi/portfolio` project, utilizing a React `ThemeProvider` with `localStorage` and `prefers-color-scheme` integration. It dynamically swaps themes by remapping Tailwind color tokens to CSS custom properties controlled by a `[data-theme]` attribute. Various UI elements, including grain, scanlines, and the cursor, automatically adapt to the selected theme.

## Key Concepts

ThemeProvider (React Context),localStorage for theme persistence,prefers-color-scheme media query,CSS Variables (Custom Properties),[data-theme] attribute,Tailwind CSS color remapping

## Details

This implementation for the `rahilsinghi/portfolio` project introduces a robust light/dark mode system:

*   **Core Implementation**: A `ThemeProvider` is used, leveraging React context to manage the current theme state. It integrates `localStorage` to remember user preferences and respects the system's `prefers-color-scheme` media query for initial theme detection.
*   **Flash of Unstyled Content (FOUC) Prevention**: An anti-flash inline script is included to prevent momentary display of the incorrect theme during page load.
*   **Canvas Component Integration**: A `theme-colors` utility is provided specifically for `canvas` components, ensuring that custom drawn elements also adhere to the active theme.
*   **CSS Variable Architecture**: All Tailwind CSS color tokens are remapped to CSS custom properties (variables). These variables are dynamically swapped based on a `[data-theme]` attribute applied to the root element, allowing for efficient theme switching.
*   **Theme Palette**: The light mode is defined with a warm off-white background (`#F0EDE6`), a dark green accent (`#00802A`), and `E8E4DC` for surfaces.
*   **Adaptive UI Elements**: The following visual effects and components are designed to adapt their appearance according to the selected theme:
    *   Grain effect
    *   Scanlines
    *   Grid drift
    *   Aurora effect
    *   CRT sweep effect
    *   Cursor
    *   Scrollbar

This system ensures a cohesive and customizable visual experience across the entire portfolio.

## Related

[[rahilsinghi/portfolio]],[[React Context]],[[localStorage]],[[prefers-color-scheme]],[[CSS Variables]],[[Tailwind CSS]],[[Canvas Components]]
