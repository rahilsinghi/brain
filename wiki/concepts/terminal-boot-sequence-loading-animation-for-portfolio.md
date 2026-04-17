---
title: Terminal Boot Sequence Loading Animation for Portfolio
author: ai
created_at: 2026-04-13T16:11:22.647Z
last_ai_edit: 2026-04-13T16:11:22.647Z
last_human_edit: null
last_embedded_hash: 20c2da79fdc07913
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-feat-add-terminal-boot-sequence-loading-animation-4db9c9.md]]"
tags:
  - portfolio
  - frontend
  - animation
  - ux
  - sessionstorage
  - accessibility
  - feature
---


# Terminal Boot Sequence Loading Animation for Portfolio

This feature introduces a terminal-style boot sequence loading animation to the portfolio website, displayed only on the user's first visit. The 2.4-second sequence includes a progress bar, is skippable by clicking, and respects `prefers-reduced-motion` settings for accessibility.

## Key Concepts

[[Loading Animations]],[[User Experience (UX)]],[[Session Storage]],[[Accessibility (prefers-reduced-motion)]]

## Details

A terminal boot sequence loading animation has been implemented for the [[Portfolio]] website. This animation enhances the initial user experience by simulating a classic computer boot-up process.

Key features of this implementation:

*   **First-Visit Only**: The animation is designed to run only once per user session, leveraging `sessionStorage` to track if the user has previously visited. This ensures a novel experience without becoming repetitive.
*   **Duration**: The sequence is timed at 2.4 seconds, providing a brief, engaging introduction without causing excessive delay.
*   **Progress Bar**: A visual progress bar is included within the terminal display, offering feedback to the user on the loading status.
*   **Skippable**: Users have the option to skip the animation by clicking anywhere on the screen, allowing for faster access to content for those who prefer it.
*   **Accessibility**: The animation respects the user's `prefers-reduced-motion` operating system setting, automatically disabling or simplifying the animation for users sensitive to motion, thereby improving accessibility.

## Related

[[Boot Screen Visibility and Easter Egg Discoverability Improvements]],[[rahilsinghi/portfolio]],[[Add Easter Egg Hint to Boot Screen (Commit 98f9029)]],[[Boot Screen and Easter Egg Improvements (rahilsinghi/portfolio, a286207)]],[[Add Terminal Easter Eggs to Portfolio]]
