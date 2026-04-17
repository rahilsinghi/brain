---
title: Add 3D Tilt Effect on Featured Project Cards
author: ai
created_at: 2026-04-12T17:45:45.709Z
last_ai_edit: 2026-04-12T17:45:45.709Z
last_human_edit: null
last_embedded_hash: a080eed24310a77f
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-feat-add-3d-tilt-effect-on-featured-project-cards-a9b9f9.md]]"
tags:
  - ui/ux
  - frontend
  - animation
  - portfolio
  - 3d effect
  - javascript
---


# Add 3D Tilt Effect on Featured Project Cards

This commit introduces a subtle 3D tilt effect to featured project cards in the portfolio, where the cards subtly shift perspective based on mouse movement. The effect is limited to desktop users and respects system-wide reduced motion settings.

## Key Concepts

3D Tilt Effect,Perspective Shift,Mouse Tracking,Reduced Motion,UI/UX Enhancement

## Details

A new feature was implemented in the `rahilsinghi/portfolio` repository (SHA: `43a2302`) on 2026-03-11T23:06:38Z by Rahil Singhi. This update involved changes to 2 files, with 62 additions and 3 deletions.

The core functionality adds a subtle perspective shift to featured project cards, reacting to the user's mouse position. The rotation is capped at a maximum of 5 degrees to maintain subtlety and prevent disorientation. This UI enhancement is designed to be desktop-only, ensuring optimal experience on larger screens. Crucially, it incorporates respect for the user's `prefers-reduced-motion` setting, disabling the animation for users who prefer less motion.

## Related

[[3D Tilt Effect on Featured Project Cards]],[[Add 3D Tilt Effect to Featured Project Cards]],[[rahilsinghi/portfolio]],[[Portfolio]],[[Rahil Singhi]]
