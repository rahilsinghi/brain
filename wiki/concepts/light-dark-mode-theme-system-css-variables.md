---
title: Light/Dark Mode Theme System (CSS Variables)
author: ai
created_at: 2026-04-10T17:31:52.412Z
last_ai_edit: 2026-04-10T17:31:52.412Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-feat-theme-add-light-dark-mode-system-with-css-variable-444139.md]]"
tags:
  - theme
  - light mode
  - dark mode
  - css variables
  - react
  - tailwindcss
  - frontend
  - ux
  - accessibility
  - portfolio
  - "2026"
---

# Light/Dark Mode Theme System (CSS Variables)

This entry details the implementation of a comprehensive light/dark mode system utilizing a CSS variable architecture. It integrates a React `ThemeProvider` with `localStorage` and `prefers-color-scheme`, and employs an anti-flash inline script for seamless transitions. Tailwind color tokens are remapped to custom CSS properties, enabling dynamic theme swapping via a `data-theme` attribute.

## Key Concepts

Light/Dark Mode,CSS Variable Architecture,React Context,localStorage,prefers-color-scheme,Anti-flash Inline Script,Tailwind CSS,CSS Custom Properties,data-theme Attribute,Theming UI Components

## Details

This commit, identified by `d10a46b` and authored by [[Rahil Singhi]] on 2026-03-25, introduces a robust light/dark mode theme system to the `[[Portfolio Project]]` repository. The implementation leverages a CSS variable architecture for flexible and maintainable theming.

Key components of the system include:
*   **ThemeProvider:** A React context provider that manages the current theme state, persisting user preferences via `localStorage` and respecting the user's system preference with `prefers-color-scheme`.
*   **Anti-flash Inline Script:** An embedded script designed to prevent "flash of unstyled content" (FOUC) or "flash of incorrect theme" (FOICT) on page load, ensuring a smooth theme application.
*   **Theme-colors Utility:** A specialized utility for canvas components, allowing them to adapt their color schemes according to the active theme.

A core aspect of the architecture involves remapping all [[Tailwind CSS]] color tokens. These tokens are converted into [[CSS Custom Properties]] (variables), which are then dynamically swapped based on the `[data-theme]` attribute applied to the document root or relevant container.

The system includes specific color palettes; for instance, light mode utilizes a warm off-white background (`#F0EDE6`), a dark green accent (`#00802A`), and `#E8E4DC` for surface elements. A wide array of UI elements and effects, such as grain, scanlines, grid drift, aurora, CRT sweep, cursor, and scrollbar, are designed to seamlessly adapt their appearance to the selected theme.

This feature involved changing 4 files, with +217 additions and -34 deletions, indicating a significant architectural change. The implementation was co-authored by [[Claude Opus 4.6]].

## Related

[[Rahil Singhi]],[[Portfolio Project]],[[React Context]],[[Tailwind CSS]],[[CSS Custom Properties]],[[Accessibility]],[[User Experience (UX)]],[[Web Development]],[[Front-end Development]],[[Theming]],[[Design Systems]],[[Claude Opus 4.6]]
