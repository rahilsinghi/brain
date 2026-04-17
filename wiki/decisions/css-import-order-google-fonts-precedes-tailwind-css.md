---
title: "CSS @import Order: Google Fonts Precedes Tailwind CSS"
author: ai
created_at: 2026-04-10T17:15:50.333Z
last_ai_edit: 2026-04-10T17:15:50.333Z
last_human_edit: null
last_embedded_hash: bfd882cb1342c119
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-fix-css-import-order-google-fonts-must-precede-import-tai-259fc2.md]]"
tags:
  - css
  - import-order
  - google-fonts
  - tailwindcss
  - fix
  - styling
  - web-development
  - rahil-singhi
  - claude-opus
---


# CSS @import Order: Google Fonts Precedes Tailwind CSS

This article details a fix addressing an incorrect CSS `@import` order where Google Fonts were being overridden by Tailwind CSS. The solution involved ensuring that `@import` rules for Google Fonts are placed before those for Tailwind CSS to maintain proper styling application. This specific correction was implemented in the `rahilsinghi/Flock` repository.

## Key Concepts

- CSS `@import` rule,- CSS specificity and cascade,- Google Fonts integration,- Tailwind CSS,- Styling conflicts

## Details

The `fix: CSS @import order — Google Fonts must precede @import tailwindcss` commit (SHA: `154819e`) in the `rahilsinghi/Flock` repository on 2026-03-21 resolved a common issue related to CSS `@import` order. When stylesheets are imported, their order can significantly impact how styles are applied due to the cascading nature of CSS. If Google Fonts are imported *after* Tailwind CSS, Tailwind's utility classes or base styles might inadvertently override font-family declarations from Google Fonts, leading to unexpected typography.

The corrective action involved reordering the `@import` statements in the stylesheet. By ensuring that the Google Fonts `@import` rule appears *before* the Tailwind CSS `@import` rule, the Google Fonts are loaded and applied first, allowing Tailwind's styles to build upon or extend them without overriding critical font declarations. This fix was authored by Rahil Singhi, with assistance from Claude Opus 4.6 (1M context).

**Commit Details:**
- **Repo:** `rahilsinghi/Flock`
- **SHA:** `154819e`
- **Date:** `2026-03-21T17:41:32Z`
- **Author:** Rahil Singhi
- **Co-Author:** Claude Opus 4.6 (1M context)
- **Files changed:** `1`
- **Additions:** `+1`
- **Deletions:** `-1`

## Related

[[CSS @import Rule]],[[Tailwind CSS]],[[Google Fonts]],[[CSS Specificity]],[[Cascading Style Sheets]],[[Web Development Best Practices]]
