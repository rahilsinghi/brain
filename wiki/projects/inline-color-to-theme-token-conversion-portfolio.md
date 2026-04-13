---
title: Inline Color to Theme Token Conversion (Portfolio)
author: ai
created_at: 2026-04-11T00:26:25.495Z
last_ai_edit: 2026-04-11T00:26:25.495Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-refactor-components-convert-all-inline-colors-to-theme-a-9f1c75.md]]"
tags:
  - refactoring
  - theming
  - frontend
  - css
  - javascript
  - portfolio
  - ui/ux
  - react
---

# Inline Color to Theme Token Conversion (Portfolio)

This commit refactored the `rahilsinghi/portfolio` repository to replace all hardcoded inline colors with theme-aware CSS variables, enhancing UI flexibility and maintainability. It also introduced a sun/moon toggle for theme switching and updated various UI components, including canvas-based elements, to utilize the new theme system.

## Key Concepts

Theme-aware design,CSS variables,Refactoring,UI components,Dark/Light Mode Toggle,SVG styling,React hooks (useTheme),Front-end development

## Details

This refactoring effort in the `rahilsinghi/portfolio` repository (SHA: `10fc431`) systematically converted hardcoded color values to theme-aware tokens. Key changes include:

*   **Theme Toggle**: Implementation of a sun/moon toggle in the navigation bar with an animated icon swap, supporting both desktop and mobile views.
*   **CSS Variable Adoption**: Replaced `rgba(0,255,65,...)` and other hardcoded colors with CSS variables in SVG elements and inline styles across various components, including:
    *   `Experience`
    *   `CircuitDivider`
    *   `FeaturedProjects`
    *   `HackathonProjects`
    *   `CursorGlow`
    *   `SectionDots`
*   **Canvas Component Integration**: Canvas-based components were updated to integrate `useTheme` hooks and color utility functions (`getAccentRGB`, `getBgRGB`) for dynamic theme application. Affected components include:
    *   `BinaryDissolve`
    *   `CodeTypingBg`
    *   `ParticleField`
    *   `KnowledgeGraph`
    *   `BackgroundGrid`
    *   `ReactiveAurora`
    *   `CursorCodeTrail`
*   **Navigation Overlay Update**: The navigation overlay and backdrop now utilize theme variables for consistent styling.

This change significantly improves the portfolio's theming capabilities, making it easier to switch between light and dark modes and to maintain a consistent visual style.

## Related

[[Portfolio]],[[Experience Section Redesign (f79010f)]],[[3D Tilt Effect on Featured Project Cards]],[[Binary Dissolution Hover Effect on Headshot]],[[Custom Cursor with Green Dot and Expanding Ring (Portfolio)]],[[Claude How To]]
