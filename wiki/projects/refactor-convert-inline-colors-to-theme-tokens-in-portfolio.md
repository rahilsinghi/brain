---
title: "Refactor: Convert Inline Colors to Theme Tokens in Portfolio"
author: ai
created_at: 2026-04-10T21:21:53.611Z
last_ai_edit: 2026-04-10T21:21:53.611Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-refactor-components-convert-all-inline-colors-to-theme-a-9f1c75.md]]"
tags:
  - refactor
  - theming
  - css-variables
  - portfolio
  - javascript
  - frontend
  - commit
  - design-tokens
---

# Refactor: Convert Inline Colors to Theme Tokens in Portfolio

This commit details a significant refactoring effort within the `rahilsinghi/portfolio` repository to replace hardcoded inline colors with theme-aware tokens and CSS variables. The update introduces a sun/moon toggle for theme switching and integrates dynamic theme variables across various components, including SVG styles and canvas-based elements, to support light and dark modes.

## Key Concepts

- Theming,- CSS Variables,- Refactoring,- Design Tokens,- Inline Styles

## Details

This commit, identified by SHA `10fc431` and authored by [[Rahil Singhi]] on 2026-03-25T02:41:23Z, focuses on enhancing the `rahilsinghi/portfolio` project's theming capabilities. The primary goal was to eliminate hardcoded `rgba(...)` color values and replace them with dynamic, theme-aware tokens.

Key changes implemented include:

*   **Theme Toggle:** Introduction of a sun/moon toggle in the navigation bar, featuring an animated icon swap, supported on both desktop and mobile interfaces.
*   **Color Variable Implementation:** Hardcoded `rgba` values were replaced with CSS variables across several components, including `Experience`, `CircuitDivider`, `FeaturedProjects`, `HackathonProjects`, and `CursorGlow`, particularly within SVG and inline styles.
*   **Canvas Component Integration:** Canvas-based components such as `BinaryDissolve`, `CodeTypingBg`, `ParticleField`, `KnowledgeGraph`, `BackgroundGrid`, `ReactiveAurora`, and `CursorCodeTrail` were updated to utilize `useTheme`, `getAccentRGB`, and `getBgRGB` hooks/functions for dynamic color rendering.
*   **Navigation Overlay Update:** The navigation overlay and backdrop were modified to also consume theme variables, ensuring consistent theming.

This refactoring involved changing 13 files, adding 201 lines, and deleting 64 lines. The commit was co-authored by Claude Opus 4.6.

## Related

[[Rahil Singhi]],[[Portfolio Website]],[[Theming System]],[[CSS Variables]],[[Code Refactoring]]
