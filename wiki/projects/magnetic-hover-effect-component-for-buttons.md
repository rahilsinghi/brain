---
title: Magnetic Hover Effect Component for Buttons
author: ai
created_at: 2026-04-10T02:35:43.602Z
last_ai_edit: 2026-04-10T02:35:43.602Z
last_human_edit: null
last_embedded_hash: f4c25ff6a0d4ca73
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-feat-add-magnetic-hover-effect-component-for-buttons-d5d0de.md]]"
tags:
  - animation
  - hover-effect
  - ui-component
  - accessibility
  - reduced-motion
  - spring-animation
  - portfolio
  - desktop
  - buttons
  - interactive-ui
  - frontend
---


# Magnetic Hover Effect Component for Buttons

A magnetic hover effect component was added to the rahilsinghi/portfolio repository that causes button elements to subtly pull toward the user's cursor with a spring-like return animation. The component is designed exclusively for desktop environments and respects the user's reduced-motion accessibility preferences. This enhancement was introduced in commit 8c9269f on March 11, 2026.

## Key Concepts

- **Magnetic Hover Effect:** A UI interaction where elements appear to be attracted toward the cursor, creating a tactile, physics-based feel
- **Spring Animation:** A motion style that simulates physical spring mechanics, providing a natural return-to-origin effect after cursor interaction
- **Desktop-Only Component:** The effect is intentionally scoped to desktop devices, avoiding touch-based or mobile environments where hover semantics differ
- **Reduced-Motion Awareness:** The component checks for the user's `prefers-reduced-motion` media query setting, disabling or toning down animation for accessibility compliance
- **Progressive Enhancement:** The interaction layer is additive, with 49 lines added and no deletions, indicating it was built on top of existing button infrastructure

## Details

## Overview

This commit introduces a new interactive UI component to the `rahilsinghi/portfolio` project that applies a magnetic hover effect to button elements. The effect gives the impression that buttons are physically attracted to the user's cursor, enhancing the perceived interactivity and polish of the portfolio site.

## Behavior

- **Cursor Attraction:** As the cursor moves near a button, the element subtly shifts in the direction of the cursor, simulating magnetic pull.
- **Spring Return:** When the cursor leaves the element's vicinity, the button animates back to its original position using spring-like easing, giving a natural and satisfying feel.

## Implementation Details

- **Files Changed:** 1
- **Lines Added:** 49
- **Lines Removed:** 0
- This was a purely additive change, introducing a new component without modifying existing code.

## Accessibility

The component is built with accessibility in mind:
- It detects the `prefers-reduced-motion` media query and disables or reduces the animation for users who have opted into reduced motion settings in their operating system.

## Platform Scope

- The effect is **desktop-only**, ensuring that it does not interfere with touch-based navigation or mobile UX patterns where hover states behave differently or are unavailable.

## Commit Metadata

| Field | Value |
|---|---|
| Repository | rahilsinghi/portfolio |
| Commit SHA | 8c9269f |
| Date | 2026-03-11T23:07:20Z |
| Author | Rahil Singhi |

## Related

- [[Portfolio Project]]
- [[UI Animation Components]]
- [[Accessibility and Reduced Motion]]
- [[Spring Physics in UI Design]]
- [[Interactive Button Components]]
- [[Desktop-Only Features]]
- [[CSS Media Queries]]
