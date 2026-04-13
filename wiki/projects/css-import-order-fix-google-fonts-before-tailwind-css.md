---
title: "CSS @import Order Fix: Google Fonts Before Tailwind CSS"
author: ai
created_at: 2026-04-12T21:29:23.006Z
last_ai_edit: 2026-04-12T21:29:23.006Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-fix-css-import-order-google-fonts-must-precede-import-tai-259fc2.md]]"
tags:
  - css
  - import order
  - google fonts
  - tailwind css
  - flock
  - bug fix
  - front-end
---

# CSS @import Order Fix: Google Fonts Before Tailwind CSS

This article documents a CSS fix in the [[Flock]] project, ensuring that Google Fonts `@import` statements precede [[Tailwind CSS]] `@import` directives. This ordering prevents styles from being overridden unintentionally, maintaining the correct application of typography and other design elements.

## Key Concepts

[[CSS]] @import rule,CSS import order,[[Google Fonts]],[[Tailwind CSS]],Style precedence,Code fix

## Details

A critical CSS fix was implemented in the `rahilsinghi/Flock` repository to address an issue where Google Fonts styles were being overridden by [[Tailwind CSS]]. The resolution involved ensuring that all Google Fonts `@import` rules are placed before the `@import tailwindcss` statement within the project's stylesheet. This establishes the correct cascade order, allowing Google Fonts to load and apply its typography settings before [[Tailwind CSS]] utility classes are processed, thus preventing unintended style conflicts.

**Commit Details:**
*   **Repo:** `rahilsinghi/Flock`
*   **SHA:** `154819e`
*   **Date:** `2026-03-21T17:41:32Z`
*   **Author:** [[Rahil Singhi]]
*   **Files changed:** 1
*   **Additions:** +1
*   **Deletions:** -1
*   **Co-Authored-By:** [[Claude Opus 4.6 (1M context)]]

## Related

[[Flock]],[[CSS]],[[Google Fonts]],[[Tailwind CSS]],[[Rahil Singhi]],[[Claude Opus 4.6 (1M context)]]
