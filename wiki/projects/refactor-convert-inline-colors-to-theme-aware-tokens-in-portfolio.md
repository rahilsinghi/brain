---
title: "Refactor: Convert Inline Colors to Theme-Aware Tokens in Portfolio"
author: ai
created_at: 2026-04-12T21:42:04.708Z
last_ai_edit: 2026-04-12T21:42:04.708Z
last_human_edit: null
last_embedded_hash: 1b89e943763391d3
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-refactor-components-convert-all-inline-colors-to-theme-a-9f1c75.md]]"
tags:
  - refactor
  - portfolio
  - theming
  - css-variables
  - dark-mode
  - ui
  - components
  - front-end
---


# Refactor: Convert Inline Colors to Theme-Aware Tokens in Portfolio

This refactoring effort converted hardcoded inline colors across the portfolio website into theme-aware CSS variables and tokens, enabling dynamic theming. It introduced a sun/moon toggle for dark/light mode and updated various UI components and canvas elements to respect the new theme system.

## Key Concepts

Theming,CSS Variables,Design Tokens,Dark Mode,UI Refactoring,Component-Based Design

## Details

This commit (SHA: 10fc431) for the `rahilsinghi/portfolio` repository involved a significant refactoring of color management. The primary goal was to eliminate hardcoded inline colors and replace them with theme-aware tokens, facilitating a dynamic dark/light mode experience.

Key changes include:

*   **Sun/Moon Toggle**: A new animated sun/moon icon was added to the navigation bar, providing a visual cue and functional control for switching between light and dark themes on both desktop and mobile layouts.
*   **CSS Variable Integration**: Hardcoded `rgba(0,255,65,...)` values and other inline styles were replaced with CSS variables. This change was applied to various components including `Experience`, `CircuitDivider`, `FeaturedProjects`, `HackathonProjects`, `CursorGlow`, and `SectionDots`.
*   **Canvas Component Theming**: For canvas-based components like `BinaryDissolve`, `CodeTypingBg`, `ParticleField`, `KnowledgeGraph`, `BackgroundGrid`, `ReactiveAurora`, and `CursorCodeTrail`, the `useTheme` hook was integrated. This allows these components to dynamically retrieve and apply `getAccentRGB` and `getBgRGB` values, ensuring they align with the active theme.
*   **Navigation Overlay Update**: The navigation overlay and backdrop were updated to also utilize theme-specific variables, ensuring a consistent visual experience across the entire UI.

This refactoring improves maintainability, enhances user experience with a customizable theme, and standardizes color management across the project.

## Related

[[rahilsinghi/portfolio]],[[Binary Dissolution Hover Effect on Headshot]],[[Code Typing Background and Morphing Numbers to Hackathon Section (Portfolio)]],[[Add 3D Tilt Effect on Featured Project Cards]],[[Add Terminal Easter Eggs to Portfolio]],[[Animated Login Modal and Chat Sidebar Transitions (raag)]],[[Add 'Recent' Section to Navigation Dots (Portfolio)]],[[Add Education Section with NYU and SSN Cards to Portfolio]],[[Add Bio Text and Wrap Geometry Utilities (Portfolio)]],[[Refactoring]],[[CSS Variables]],[[Dark Mode]],[[UI/UX Design]]
