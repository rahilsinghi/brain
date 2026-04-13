---
title: "Portfolio: Theme-Aware Color Refactor and Dark/Light Mode Toggle"
author: ai
created_at: 2026-04-11T00:29:15.894Z
last_ai_edit: 2026-04-11T00:29:15.894Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-refactor-components-convert-all-inline-colors-to-theme-a-9f1c75.md]]"
tags:
  - refactor
  - frontend
  - ui
  - theming
  - css
  - javascript
  - portfolio
  - dark mode
---

# Portfolio: Theme-Aware Color Refactor and Dark/Light Mode Toggle

This commit refactors the `rahilsinghi/portfolio` repository to use theme-aware color tokens, replacing hardcoded RGB values with CSS variables and helper functions. It also introduces a sun/moon toggle to the navigation bar, allowing users to switch between light and dark modes with an animated icon.

## Key Concepts

[[Theme-aware design]],[[CSS Variables]],[[Dark/Light Mode Toggle]],[[Component Refactoring]],Inline styles

## Details

This significant refactor, committed to `rahilsinghi/portfolio` (SHA: `10fc431`), focuses on modernizing the website's color management and enhancing user experience with a new dark/light mode toggle. The changes involve 13 files, with 201 additions and 64 deletions.

Key changes include:

*   **Sun/Moon Toggle**: A new animated icon toggle has been added to the navigation bar for both desktop and mobile views, enabling users to switch between themes.
*   **CSS Variable Adoption**: Hardcoded `rgba(0,255,65,...)` values in SVG and inline styles across various components have been replaced with dynamic CSS variables. Affected components include:
    *   [[Experience Section Redesign]]
    *   `CircuitDivider`
    *   [[3D Tilt Effect on Featured Project Cards]]
    *   `HackathonProjects`
    *   `CursorGlow`
    *   `SectionDots`
*   **Canvas Component Integration**: Canvas-based components now utilize `useTheme`, `getAccentRGB`, and `getBgRGB` hooks to ensure their visuals adapt to the selected theme. These components are:
    *   `BinaryDissolve`
    *   `CodeTypingBg`
    *   `ParticleField`
    *   [[Brain Explorer Update: Wikilink Rendering, Palette Filtering, and Code Cleanup]]
    *   `BackgroundGrid`
    *   `ReactiveAurora`
    *   `CursorCodeTrail`
*   **Navigation Overlay Update**: The navigation overlay and backdrop have been updated to also leverage theme-specific variables for consistent theming.

This refactor improves maintainability and provides a more cohesive visual experience across the portfolio website.

## Related

[[rahilsinghi/portfolio]],[[Experience Section Redesign]],[[3D Tilt Effect on Featured Project Cards]],[[Binary Dissolution Hover Effect on Headshot]],[[Brain Explorer Update: Wikilink Rendering, Palette Filtering, and Code Cleanup]],[[Custom Cursor Implementation with Green Dot and Ring (Portfolio)]]
