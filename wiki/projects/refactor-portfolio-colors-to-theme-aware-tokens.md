---
title: Refactor Portfolio Colors to Theme-Aware Tokens
author: ai
created_at: 2026-04-13T16:02:51.700Z
last_ai_edit: 2026-04-13T16:02:51.700Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-refactor-components-convert-all-inline-colors-to-theme-a-9f1c75.md]]"
tags:
  - refactoring
  - theming
  - ui
  - ux
  - css
  - react
  - portfolio
---

# Refactor Portfolio Colors to Theme-Aware Tokens

This commit refactors the `rahilsinghi/portfolio` repository to replace hardcoded inline colors with theme-aware CSS variables and utility functions. It introduces a sun/moon toggle for theme switching and updates numerous UI components and canvas effects to dynamically adapt to the selected theme.

## Key Concepts

Theme-Aware Styling,CSS Variables,React Context (useTheme),Component Refactoring,UI/UX Design,Accessibility

## Details

The commit 10fc431 in the `rahilsinghi/portfolio` repository focuses on converting all inline color definitions to a more maintainable and theme-aware system. Key changes include:

1.  **Theme Toggle**: Implementation of a sun/moon toggle in the navigation bar with an animated icon swap, supporting both desktop and mobile views.
2.  **Inline Style Conversion**: Hardcoded `rgba(0,255,65,...)` values and other inline styles within components like `Experience`, [[Circuit Dividers]], [[Add 3D Tilt Effect on Featured Project Cards|FeaturedProjects]], [[Add Code Typing Background and Morphing Numbers to Hackathon Section (Portfolio)|HackathonProjects]], `CursorGlow`, and [[Add 'Recent' Section to Navigation Dots (Portfolio)|SectionDots]] were replaced with dynamic CSS variables.
3.  **Canvas Component Integration**: Canvas-based components, including [[Binary Dissolution Hover Effect on Headshot|BinaryDissolve]], [[Add Code Typing Background and Morphing Numbers to Hackathon Section (Portfolio)|CodeTypingBg]], [[Add Circuit Dividers, Magnetic Nav, Particle Field, Scroll-Draw Timeline, Scroll Velocity Effects to Portfolio|ParticleField]], `KnowledgeGraph` (likely referring to the [[Brain-Explorer]] or a similar visualization), `BackgroundGrid`, `ReactiveAurora`, and `CursorCodeTrail`, were updated to utilize `useTheme` and custom `getAccentRGB`/`getBgRGB` utility functions to fetch theme-specific colors.
4.  **Navigation Overlay**: The navigation overlay and backdrop were also updated to consume theme variables, ensuring a consistent aesthetic across the application.

This refactoring significantly improves the project's maintainability, enhances user experience with theme customization, and lays the groundwork for more advanced styling features.

## Related

[[Add 'Recent' Section to Navigation Dots (Portfolio)]],[[Add 3D Tilt Effect on Featured Project Cards]],[[Add Code Typing Background and Morphing Numbers to Hackathon Section (Portfolio)]],[[Add Circuit Dividers, Magnetic Nav, Particle Field, Scroll-Draw Timeline, Scroll Velocity Effects to Portfolio]],[[Binary Dissolution Hover Effect on Headshot]],[[Brain-Explorer]],[[Portfolio]]
