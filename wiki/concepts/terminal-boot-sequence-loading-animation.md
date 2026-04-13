---
title: Terminal Boot Sequence Loading Animation
author: ai
created_at: 2026-04-12T22:03:13.483Z
last_ai_edit: 2026-04-12T22:03:13.483Z
last_human_edit: null
last_embedded_hash: eb1c3a6ea55c5211
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-feat-add-terminal-boot-sequence-loading-animation-4db9c9.md]]"
tags:
  - feature
  - frontend
  - animation
  - ui
  - ux
  - portfolio
  - javascript
  - sessionstorage
  - accessibility
---


# Terminal Boot Sequence Loading Animation

This feature introduces a terminal-style boot sequence loading animation that appears on the user's first visit to the portfolio website. The animation lasts 2.4 seconds, includes a progress bar, and can be skipped by clicking. It also respects the user's `prefers-reduced-motion` settings.

## Key Concepts

Terminal UI,Loading Animation,Session Storage,Progress Bar,User Experience,Accessibility,prefers-reduced-motion

## Details

A new terminal-style boot sequence loading animation has been implemented for the portfolio website. This animation is designed to provide an engaging introductory experience for new visitors.

**Key Features:**
*   **First-Visit Only:** The animation is triggered only on a user's initial visit, determined by checking `sessionStorage` to avoid repeated displays within the same browsing session.
*   **Duration:** The sequence runs for a fixed duration of 2.4 seconds.
*   **Progress Bar:** A visual progress bar indicates the loading status during the animation.
*   **Skip Functionality:** Users can click anywhere on the screen to bypass the animation immediately.
*   **Accessibility:** The feature respects the `prefers-reduced-motion` media query, automatically disabling or simplifying the animation for users who prefer reduced motion, enhancing accessibility.

## Related

[[rahilsinghi/portfolio]],[[Boot Screen and Easter Egg Improvements (rahilsinghi/portfolio, a286207)]],[[Boot Screen Visibility and Easter Egg Discoverability Improvements]],[[Add Easter Egg Hint to Boot Screen (Commit 98f9029)]],[[User Experience]],[[Accessibility]]
