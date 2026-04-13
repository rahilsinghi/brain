---
title: Light/Dark Mode System with CSS Variable Architecture (Portfolio)
author: ai
created_at: 2026-04-13T18:38:51.436Z
last_ai_edit: 2026-04-13T18:38:51.436Z
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
  - frontend
  - portfolio
  - tailwindcss
  - ui/ux
---

# Light/Dark Mode System with CSS Variable Architecture (Portfolio)

This feature introduces a robust light/dark mode system to the portfolio website, utilizing a React `ThemeProvider` for state management, `localStorage` for persistence, and `prefers-color-scheme` for initial detection. It rearchitects styling by mapping Tailwind CSS color tokens to CSS custom properties, enabling dynamic theme switching via a `data-theme` attribute for a cohesive visual experience across all components.

## Key Concepts

Light/Dark Mode,CSS Custom Properties (CSS Variables),React Context (ThemeProvider),LocalStorage,prefers-color-scheme media query,Tailwind CSS Integration,Anti-flash inline script,data-theme attribute

## Details

This commit (`d10a46b`) implements a comprehensive light/dark mode system for the `rahilsinghi/portfolio` repository. The core of the system is a React `ThemeProvider`, which manages the current theme state. It intelligently determines the initial theme preference by checking `localStorage` for a user's saved choice, falling back to the system's `prefers-color-scheme` media query if no preference is stored. To prevent flashes of unstyled content (FOUC) during theme transitions, an anti-flash inline script is injected.

A significant architectural change involves remapping all existing Tailwind CSS color tokens to CSS custom properties. These custom properties are then dynamically updated based on a `[data-theme]` attribute on the `html` element, allowing for seamless theme switching. The new light mode introduces a warm off-white background (`#F0EDE6`), a dark green accent (`#00802A`), and distinct surface colors (`#E8E4DC`).

The theme adaptation is holistic, affecting not just basic colors but also advanced visual elements. Components such as grain effects, scanlines, grid drift, aurora effects, CRT sweep, cursor, and scrollbar are all designed to adapt their appearance according to the active theme, ensuring a consistent and immersive user experience.

This work was co-authored with [[Claude Opus 4.6]], indicating the use of AI assistance in its development.

## Related

[[rahilsinghi/portfolio]],[[CLAUDE.md]]
