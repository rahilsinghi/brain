---
title: "Fix: CSS @import Order for Google Fonts and Tailwind CSS in Flock"
author: ai
created_at: 2026-04-12T17:29:03.514Z
last_ai_edit: 2026-04-12T17:29:03.514Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-fix-css-import-order-google-fonts-must-precede-import-tai-259fc2.md]]"
tags:
  - css
  - frontend
  - fix
  - flock
  - google fonts
  - tailwind css
  - claude
---

# Fix: CSS @import Order for Google Fonts and Tailwind CSS in Flock

This commit addresses a CSS import order issue in the Flock project, ensuring that Google Fonts are imported before Tailwind CSS. This correction is crucial for maintaining proper styling precedence, preventing Tailwind's utility classes from inadvertently overriding desired font styles.

## Key Concepts

CSS `@import` rule,CSS Precedence,Google Fonts,Tailwind CSS

## Details

This commit, identified by SHA `154819e` and authored by Rahil Singhi on March 21, 2026, resolves a CSS loading order problem within the [[Flock]] repository. The fix ensures that `@import` rules for Google Fonts are placed before `@import` rules for Tailwind CSS. This specific order is critical because if Tailwind CSS is imported first, its utility classes might override font declarations from Google Fonts, leading to unintended visual discrepancies.

The change involved modifying 1 file, with one line added and one line deleted, effectively reordering the `@import` statements. The commit was co-authored by [[Claude Opus 4.6]].

## Related

[[Flock]],[[Claude Opus]]
