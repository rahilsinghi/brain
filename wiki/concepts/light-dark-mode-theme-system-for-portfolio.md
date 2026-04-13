---
title: Light/Dark Mode Theme System for Portfolio
author: ai
created_at: 2026-04-10T21:34:46.538Z
last_ai_edit: 2026-04-10T21:34:46.538Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-feat-theme-add-light-dark-mode-system-with-css-variable-444139.md]]"
tags:
  - theme
  - light-dark-mode
  - css-variables
  - react
  - frontend
  - portfolio
  - tailwind
  - ui-ux
  - "2026"
  - commit
---

# Light/Dark Mode Theme System for Portfolio

This feature implements a comprehensive light/dark mode system for the `rahilsinghi/portfolio` project, leveraging React context, local storage, and `prefers-color-scheme`. It employs CSS custom properties for dynamic color switching and ensures a smooth user experience across various UI elements.

## Key Concepts

- Light/Dark Mode,- CSS Custom Properties (CSS Variables),- React Context API,- localStorage for persistence,- prefers-color-scheme media query,- Tailwind CSS color remapping,- Anti-flash inline script,- `data-theme` attribute

## Details

This commit (`d10a46b`), authored by Rahil Singhi and co-authored by Claude Opus 4.6 on 2026-03-25, introduces a robust theme system to the `rahilsinghi/portfolio` project.

Key components include a `ThemeProvider` utilizing React context for state management, `localStorage` for theme persistence, and the `prefers-color-scheme` media query for initial theme detection. An anti-flash inline script is implemented to prevent a flash of unstyled content (FOUC) during page load.

Color management is achieved by remapping all Tailwind CSS color tokens to CSS custom properties. These properties are dynamically swapped based on a `[data-theme]` attribute applied to the document root, allowing for seamless theme transitions.

Specific aesthetic choices are made for light mode, including a warm off-white background (`#F0EDE6`), a dark green accent (`#00802A`), and `#E8E4DC` for surfaces. Various visual effects and UI elements such as grain, scanlines, grid drift, aurora, CRT sweep, cursor, and scrollbar are designed to adapt automatically to the active theme.

The change involved 4 files, with 217 additions and 34 deletions.

## Related

[[Rahil Singhi]],[[rahilsinghi/portfolio]],[[React Context]],[[CSS Custom Properties]],[[Tailwind CSS]],[[Theming]],[[Light/Dark Mode]],[[Claude Opus 4.6]]
