---
title: Light/Dark Mode System with CSS Variable Architecture (rahilsinghi/portfolio)
author: ai
created_at: 2026-04-12T22:05:29.402Z
last_ai_edit: 2026-04-12T22:05:29.402Z
last_human_edit: null
last_embedded_hash: b7ae4c502ccfed11
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-feat-theme-add-light-dark-mode-system-with-css-variable-444139.md]]"
tags:
  - theme
  - light-mode
  - dark-mode
  - css
  - react
  - portfolio
  - ui
  - frontend
  - css-variables
  - usability
---


# Light/Dark Mode System with CSS Variable Architecture (rahilsinghi/portfolio)

This feature introduces a comprehensive light/dark mode system to the `rahilsinghi/portfolio` repository, leveraging React context, localStorage, and the `prefers-color-scheme` media query. It dynamically swaps theme colors via CSS custom properties and a `data-theme` attribute, ensuring various UI elements adapt seamlessly.

## Key Concepts

Light/Dark Mode,CSS Custom Properties,React Context,localStorage,prefers-color-scheme,Tailwind CSS,Anti-Flash Inline Script

## Details

A new light/dark mode system has been implemented in the `rahilsinghi/portfolio` project. This system uses a `ThemeProvider` (built with [[React Context]]) to manage the current theme, storing user preferences in [[localStorage]] and respecting the user's system preference via `prefers-color-scheme`. An anti-flash inline script is included to prevent a momentary flash of the incorrect theme on page load.

The core of the theme switching mechanism involves remapping all [[Tailwind CSS]] color tokens to [[CSS Custom Properties]]. These custom properties are then dynamically swapped based on a `data-theme` attribute applied to the HTML element. In light mode, the design utilizes a warm off-white background (`#F0EDE6`), a dark green accent (`#00802A`), and light surfaces (`#E8E4DC`).

Crucially, several visual components and effects across the portfolio, including 'Grain', 'scanlines', 'grid drift', 'aurora', 'CRT sweep', the custom cursor, and scrollbars, are configured to adapt their appearance according to the active theme.

## Related

[[rahilsinghi/portfolio]],[[React Context]],[[localStorage]],[[prefers-color-scheme]],[[Tailwind CSS]],[[CSS Custom Properties]],[[HTML data-* attributes]],[[Claude Opus]]
