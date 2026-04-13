---
title: "CSS @import Order: Google Fonts Before Tailwind CSS"
author: ai
created_at: 2026-04-10T21:16:11.035Z
last_ai_edit: 2026-04-10T21:16:11.035Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-fix-css-import-order-google-fonts-must-precede-import-tai-259fc2.md]]"
tags:
  - css
  - import
  - google-fonts
  - tailwindcss
  - ordering
  - frontend
  - fix
  - best-practices
---

# CSS @import Order: Google Fonts Before Tailwind CSS

This article details a specific CSS ordering fix where `@import` rules for Google Fonts must precede `@import` for Tailwind CSS. This ensures that custom fonts are correctly applied and not overridden or rendered unavailable by subsequent stylesheet imports, adhering to best practices for CSS cascade.

## Key Concepts

- [[@import rule]],- [[CSS Cascade]],- CSS Specificity,- Google Fonts,- Tailwind CSS,- Frontend Best Practices

## Details

This article documents a critical CSS ordering fix implemented in the `rahilsinghi/Flock` repository (SHA: `154819e`) on 2026-03-21 by Rahil Singhi, co-authored by Claude Opus 4.6.

The issue arose from the incorrect application of styles due to the sequence of CSS `@import` rules. Specifically, the `@import` rule for Google Fonts was inadvertently placed *after* the `@import` rule for Tailwind CSS. This misordering meant that when subsequent styles or Tailwind's utility classes attempted to use the imported fonts, the font definitions were either not yet loaded or were potentially overridden by Tailwind's preflight styles, leading to Google Fonts not being rendered as intended.

The resolution involved reversing this order, ensuring that Google Fonts are imported *before* Tailwind CSS. This is a fundamental best practice for CSS, as foundational styles such as font definitions should generally be loaded earlier. This allows utility frameworks like Tailwind CSS to correctly utilize or build upon these foundational styles without encountering unexpected overrides or conflicts, ensuring the intended design is applied.

**Commit Details:**
- **Repository:** `rahilsinghi/Flock`
- **SHA:** `154819e`
- **Date:** `2026-03-21T17:41:32Z`
- **Author:** Rahil Singhi
- **Co-Author:** Claude Opus 4.6 (1M context) <noreply@anthropic.com>
- **Files Changed:** 1
- **Additions:** +1
- **Deletions:** -1

## Related

[[CSS]],[[@import rule]],[[CSS Cascade]],[[Google Fonts]],[[Tailwind CSS]],[[Frontend Development]]
