---
title: Light/Dark Mode Theming System with CSS Variable Architecture
author: ai
created_at: 2026-04-11T01:31:04.030Z
last_ai_edit: 2026-04-11T01:31:04.030Z
last_human_edit: null
last_embedded_hash: e2513ac1eb7a9711
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-feat-theme-add-light-dark-mode-system-with-css-variable-444139.md]]"
tags:
  - theming
  - light mode
  - dark mode
  - css variables
  - react
  - frontend
  - ui/ux
  - portfolio
  - web development
---


# Light/Dark Mode Theming System with CSS Variable Architecture

This feature introduces a comprehensive light/dark mode theming system to the `rahilsinghi/portfolio` project. It leverages React Context, local storage, and `prefers-color-scheme` to manage theme state, ensuring a consistent user experience with anti-flash inline scripts for smooth transitions. All UI components, including canvas elements, adapt dynamically through CSS custom properties controlled by a `[data-theme]` attribute.

## Key Concepts

Light/Dark Mode,Theming System,CSS Custom Properties (CSS Variables),React Context,localStorage,prefers-color-scheme,Anti-Flash Inline Script,Tailwind CSS,Canvas Components

## Details

A new theming system has been implemented in the `rahilsinghi/portfolio` repository (SHA: `d10a46b`) to provide users with a dynamic light/dark mode experience. The core of this system is a `ThemeProvider` component, which utilizes [[React Context]] to manage the current theme state. This state is persisted using [[localStorage]] and intelligently defaults to the user's system preference via `prefers-color-scheme`.

To prevent a 'flash of unstyled content' (FOUC), an anti-flash inline script is used. The architecture relies heavily on [[CSS Custom Properties (CSS Variables)]], with all [[Tailwind CSS]] color tokens remapped to these variables. The active theme (light or dark) is controlled by a `[data-theme]` attribute on the root HTML element, which swaps the custom property values.

### Theme Palettes
*   **Light Mode**: Features a warm off-white background (`#F0EDE6`), a dark green accent (`#00802A`), and `E8E4DC` for surfaces.
*   **Dark Mode**: (Implied, but not explicitly detailed beyond being the inverse of light mode's specified values).

### Adaptive Components
A wide array of UI elements and effects have been updated to adapt seamlessly to the selected theme:
*   **Background Effects**: `Grain`, `scanlines`, `grid drift`, `aurora`
*   **Visual Effects**: `CRT sweep`
*   **Interactive Elements**: [[Custom Cursor]]
*   **Navigation**: `Scrollbar`

This implementation also includes a `theme-colors` utility specifically designed for canvas components, ensuring that even dynamic graphical elements respect the chosen theme. The work was co-authored with [[Claude Opus 4.6]].

## Related

[[rahilsinghi/portfolio]],[[React Context]],[[localStorage]],[[prefers-color-scheme]],[[Tailwind CSS]],[[CSS Custom Properties (CSS Variables)]],[[Custom Cursor]],[[Claude Opus 4.6]]
