---
title: First-Visit Theme Chooser Overlay
author: ai
created_at: 2026-04-13T15:36:54.596Z
last_ai_edit: 2026-04-13T15:36:54.596Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-feat-theme-add-first-visit-theme-chooser-overlay-199797.md]]"
tags:
  - theme
  - ui
  - ux
  - overlay
  - first visit
  - portfolio
  - design
  - accessibility
  - localstorage
---

# First-Visit Theme Chooser Overlay

This feature introduces a full-screen, blurred overlay that appears on the first visit to the portfolio after the boot screen, offering users a choice between Dark and Light themes. It uses interactive cards with UI previews and persists the selected preference via localStorage. The overlay includes a skip option and supports reduced-motion settings for accessibility.

## Key Concepts

First-Visit Experience,Theme Selection,User Interface Overlay,Persistent User Preferences,Reduced Motion Accessibility,[[Portfolio]] Design

## Details

The "First-Visit Theme Chooser Overlay" is a UI enhancement implemented within the [[Portfolio]] project (commit `33b4864`, dated 2026-03-25). This full-screen, blurred overlay is triggered after the initial [[Boot Screen and Easter Egg Improvements (rahilsinghi/portfolio, a286207)]] on a user's very first visit.

It presents two interactive, floating cards, each representing a "Dark" or "Light" theme option. These cards feature mini UI previews, scanlines, and subtle corner brackets, designed to bob with offset phases, creating an engaging visual. Upon selection, the chosen card scales up while the other fades, and the overlay smoothly transitions out.

To ensure a consistent user experience, the selected theme preference is stored using `localStorage`, preventing the overlay from appearing on subsequent visits. The feature also incorporates a skip option for immediate access to the portfolio and includes support for [[Reduced Motion Accessibility]] to accommodate user preferences.

## Related

[[Portfolio]],[[Boot Screen and Easter Egg Improvements (rahilsinghi/portfolio, a286207)]]
