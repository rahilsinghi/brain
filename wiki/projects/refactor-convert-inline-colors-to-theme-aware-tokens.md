---
title: "Refactor: Convert Inline Colors to Theme-Aware Tokens"
author: ai
created_at: 2026-04-10T17:21:44.484Z
last_ai_edit: 2026-04-10T17:21:44.484Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-refactor-components-convert-all-inline-colors-to-theme-a-9f1c75.md]]"
tags:
  - refactor
  - theming
  - css variables
  - inline styles
  - react
  - next.js
  - portfolio
  - components
  - ui/ux
  - dark mode
---

# Refactor: Convert Inline Colors to Theme-Aware Tokens

This refactoring effort in the `rahilsinghi/portfolio` repository involved converting all hardcoded inline colors across various components to theme-aware tokens and CSS variables. The update introduced a sun/moon toggle to the navigation, enhancing the site's theming capabilities.

## Key Concepts

- Theme-aware tokens,- CSS Variables (Custom Properties),- `useTheme` hook (React/Next.js context for theming),- Inline styles,- SVG styling,- Refactoring

## Details

This commit (`10fc431`) dated March 25, 2026, by Rahil Singhi (co-authored by Claude Opus 4.6), focused on a significant refactoring of color management within the `rahilsinghi/portfolio` project. The primary goal was to eliminate hardcoded color values and replace them with a robust, theme-aware system.

Key changes implemented include:

*   **Navigation Toggle**: Addition of a sun/moon toggle to the `Nav` component, featuring an animated icon swap, for both desktop and mobile views.
*   **Hardcoded Color Replacement**: Direct `rgba(0,255,65,...)` values were replaced with CSS variables within SVG elements and inline styles. Components affected include `Experience`, `CircuitDivider`, `FeaturedProjects`, `HackathonProjects`, and `CursorGlow`, `SectionDots`.
*   **Theme Integration in Canvas Components**: Canvas-based components such as `BinaryDissolve`, `CodeTypingBg`, `ParticleField`, `KnowledgeGraph`, `BackgroundGrid`, `ReactiveAurora`, and `CursorCodeTrail` were updated to utilize theme context via `useTheme` hooks. This allowed them to dynamically retrieve accent and background RGB values (e.g., `getAccentRGB`, `getBgRGB`) for consistent theming.
*   **Navigation Overlay Theming**: The `Nav` overlay and backdrop were updated to use theme-defined variables, ensuring their appearance adapts to the selected theme.

This refactoring involved changes across 13 files, adding 201 lines and deleting 64 lines, significantly improving the maintainability and theming flexibility of the codebase.

## Related

[[Rahil Singhi]],[[Theme Management]],[[CSS Variables]],[[Refactoring]],[[rahilsinghi/portfolio (Project)]]
