---
title: First-Visit Theme Chooser Overlay for Portfolio
author: ai
created_at: 2026-04-12T21:24:52.778Z
last_ai_edit: 2026-04-12T21:24:52.778Z
last_human_edit: null
last_embedded_hash: 307a55879acfdfa6
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-feat-theme-add-first-visit-theme-chooser-overlay-199797.md]]"
tags:
  - ui
  - theme
  - frontend
  - portfolio
  - first-visit
  - javascript
  - usability
  - accessibility
  - claude
---


# First-Visit Theme Chooser Overlay for Portfolio

This feature introduces a full-screen, blurred overlay on the portfolio site's first visit, presenting Dark and Light theme options with mini UI previews. Users can select a theme, which scales up while the other fades, then the overlay exits smoothly, persisting the choice via localStorage for future visits. It includes a skip option and reduced-motion support for accessibility.

## Key Concepts

First-Visit Experience,Theme Selection,Full-Screen Overlay,UI Previews,localStorage (Web Storage),Reduced Motion Support

## Details

A new feature (`feat(theme)`) has been added to the `rahilsinghi/portfolio` repository (SHA: `33b4864`). This enhancement introduces a full-screen blurred overlay that appears immediately after the initial boot screen, but only on the user's very first visit.

The overlay presents two interactive cards, representing 'Dark' and 'Light' themes. Each card features mini UI previews, subtle scanlines, and corner brackets, designed to bob with offset phases, adding a dynamic visual element. When a user selects a theme, the chosen card scales up while the alternative option gracefully fades out, before the entire overlay smoothly exits.

The user's theme preference is persisted using `localStorage`, ensuring that the chooser overlay only appears once. The feature also includes a 'skip' option and supports the `prefers-reduced-motion` media query, providing an accessible experience for users with motion sensitivities.

## Related

[[Boot Screen and Easter Egg Improvements (rahilsinghi/portfolio, a286207)]],[[Add Easter Egg Hint to Boot Screen (Commit 98f9029)]],[[Animated Login Modal and Chat Sidebar Transitions (raag)]],[[Add CLAUDE.md for Project Context and Session Persistence]],[[rahilsinghi/portfolio]]
