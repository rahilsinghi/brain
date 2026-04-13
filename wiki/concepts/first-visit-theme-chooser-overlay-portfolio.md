---
title: First-Visit Theme Chooser Overlay (Portfolio)
author: ai
created_at: 2026-04-12T17:24:20.294Z
last_ai_edit: 2026-04-12T17:24:20.294Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-feat-theme-add-first-visit-theme-chooser-overlay-199797.md]]"
tags:
  - portfolio
  - ui
  - ux
  - theme
  - first-visit
  - localstorage
  - accessibility
  - animation
---

# First-Visit Theme Chooser Overlay (Portfolio)

This feature introduces a full-screen, blurred overlay that prompts users to select a theme (Dark/Light) on their initial visit to the portfolio website. It presents two interactive cards with mini UI previews, which animate independently. The user's theme preference is saved to local storage, ensuring the overlay only appears once.

## Key Concepts

Theme Selection,User Interface (UI),User Experience (UX),Local Storage,Accessibility (Reduced Motion),First-Visit Experience,Animated Overlays

## Details

Implemented as part of the [[rahilsinghi/portfolio]] project, this feature enhances the initial user experience by providing a personalized theme choice. After the [[Boot Screen]] concludes, a full-screen blurred overlay gracefully appears. It showcases two floating cards, representing 'Dark' and 'Light' themes, each featuring mini UI previews, scanline effects, and corner brackets. These cards bob with offset phases, creating a subtle animation. Upon selection, the chosen card scales up while the other fades out, and the overlay smoothly exits.

The system utilizes `localStorage` to persist the user's theme choice, ensuring the overlay is only displayed on the very first visit. A 'skip' option is also included for users who prefer to bypass the selection. Furthermore, the feature incorporates reduced-motion support, providing a more accessible experience for users with motion sensitivities.

## Related

[[rahilsinghi/portfolio]],[[Boot Screen and Easter Egg Improvements (rahilsinghi/portfolio, a286207)]],[[Portfolio]],[[Local Storage]],[[Reduced Motion Support]]
