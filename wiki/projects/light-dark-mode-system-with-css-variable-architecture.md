---
title: Light/Dark Mode System with CSS Variable Architecture
author: ai
created_at: 2026-04-12T18:04:47.820Z
last_ai_edit: 2026-04-12T18:04:47.820Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-feat-theme-add-light-dark-mode-system-with-css-variable-444139.md]]"
tags:
  - theme
  - light/dark mode
  - css variables
  - react
  - portfolio
  - frontend
  - ui/ux
  - tailwind css
---

# Light/Dark Mode System with CSS Variable Architecture

This feature introduces a comprehensive light/dark mode system to the `rahilsinghi/portfolio` project. It leverages React context, localStorage, and the `prefers-color-scheme` media query for dynamic theme switching. The architecture uses CSS custom properties to ensure various UI elements and visual effects seamlessly adapt to the selected theme.

## Key Concepts

Light/Dark Mode,CSS Variables,React Context,localStorage,`prefers-color-scheme` media query,Theming,Tailwind CSS

## Details

This commit (`d10a46b`) introduces a robust light/dark mode system to the `rahilsinghi/portfolio` project, developed by [[Rahil Singhi]] with assistance from [[Claude Opus 4.6]]. Key components of this implementation include:
*   **ThemeProvider:** A [[React Context]] provider that manages the current theme state, persists user preference to [[localStorage]], and respects the `[[prefers-color-scheme]]` media query for initial theme detection.
*   **Anti-flash inline script:** An inline script is used to prevent a "flash of unstyled content" (FOUC) when loading the page, ensuring the correct theme is applied immediately.
*   **Theme-colors utility:** A utility specifically for canvas components to ensure they also adapt to the selected theme.
*   **CSS Variable Architecture:** All [[Tailwind CSS]] color tokens are remapped to [[CSS Variables]] (custom properties). These properties dynamically swap based on the `[data-theme]` attribute applied to the document root.
*   **Color Palette:**
    *   **Light Mode:** Features a warm off-white background (`#F0EDE6`), a dark green accent (`#00802A`), and `#E8E4DC` for surfaces.
    *   **Themed Elements:** Various visual effects and UI components such as grain, scanlines, grid drift, aurora, CRT sweep, cursor, and scrollbar are designed to automatically adapt their appearance based on the active theme.

## Related

[[Complete Portfolio Site with Animations, RAG Chat, and Visual Upgrades]],[[Rahil Singhi]],[[Claude Opus 4.6]],[[React Context]],[[localStorage]],[[prefers-color-scheme]],[[Tailwind CSS]],[[CSS Variables]]
