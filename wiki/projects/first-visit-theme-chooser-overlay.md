---
title: First-Visit Theme Chooser Overlay
author: ai
created_at: 2026-04-11T00:16:59.311Z
last_ai_edit: 2026-04-11T00:16:59.311Z
last_human_edit: null
last_embedded_hash: 513a579528e8d296
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-feat-theme-add-first-visit-theme-chooser-overlay-199797.md]]"
tags:
  - theme
  - ui/ux
  - frontend
  - animation
  - local storage
  - accessibility
  - portfolio
  - first-visit
---


# First-Visit Theme Chooser Overlay

This feature introduces a full-screen theme selection overlay for the [[Rahil Singhi's Portfolio]] website, appearing only on a user's initial visit after the boot screen. It allows users to choose between Dark and Light themes, with the preference stored in local storage for persistence. The overlay includes subtle animations and support for reduced motion.

## Key Concepts

Full-screen overlay,Theme selection (Dark/Light modes),UI previews,Local storage persistence,CSS animations,Reduced motion support,First-visit user experience

## Details

Implemented as a 'first-visit' experience for the [[Rahil Singhi's Portfolio]] (commit `33b4864`), this feature displays a full-screen, blurred overlay immediately following the [[Boot Screen and Easter Egg Improvements]]. The overlay presents two floating cards, representing 'Dark' and 'Light' theme options. Each card includes mini UI previews, scanlines, and corner brackets, animated with offset phases to create a subtle bobbing effect.

Upon user selection, the chosen card scales up while the other fades, and the entire overlay smoothly exits. The selected theme preference is then persisted using `localStorage`, ensuring the chooser is only displayed once per user. A 'skip' option is also provided for users to bypass the selection. The implementation includes support for reduced motion to enhance accessibility.

## Related

[[Rahil Singhi's Portfolio]],[[Boot Screen and Easter Egg Improvements]]
