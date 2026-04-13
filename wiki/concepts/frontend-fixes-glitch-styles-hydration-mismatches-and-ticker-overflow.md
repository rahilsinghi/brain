---
title: "Frontend Fixes: Glitch Styles, Hydration Mismatches, and Ticker Overflow"
author: ai
created_at: 2026-04-12T21:19:59.810Z
last_ai_edit: 2026-04-12T21:19:59.810Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-fix-move-glitch-styles-to-globalscss-fix-hydration-mism-c9ca41.md]]"
tags:
  - frontend
  - fix
  - css
  - hydration
  - next.js
  - styling
  - userexperience
  - projects
---

# Frontend Fixes: Glitch Styles, Hydration Mismatches, and Ticker Overflow

This commit addresses several frontend issues in the portfolio, including relocating 404 glitch effects to `globals.css` to prevent inline style conflicts. It resolves hydration mismatches in the ProjectsTicker component and ensures proper ticker overflow handling with `overflow-x-clip`.

## Key Concepts

Glitch styles,Hydration mismatch,`globals.css`,ProjectsTicker component,`useEffect` hook,`suppressHydrationWarning` attribute,CSS `overflow-x-clip` property

## Details

This commit (`92ca7f6`) by Rahil Singhi on 2026-04-08 focused on several frontend fixes within the `rahilsinghi/portfolio` repository. Key changes include:

*   **Glitch Styles Relocation**: The `404 glitch keyframes` were moved from inline `<style jsx>` tags to `globals.css`. This change standardizes style management and prevents potential conflicts or issues with inline styles.
*   **ProjectsTicker Hydration Mismatch Fix**: A hydration mismatch issue affecting the [[ProjectsTicker]] component was resolved. This was achieved by computing the `isNew` state within a `useEffect` hook, ensuring that client-side rendering aligns with server-side rendering.
*   **Theme Flash Prevention**: The `suppressHydrationWarning` attribute was added to the `<html>` tag to prevent a brief 'flash' of incorrect theme styles during hydration, improving the user experience.
*   **Ticker Overflow Correction**: The ticker overflow issue was fixed by applying `overflow-x-clip`, ensuring content beyond the element's padding box is clipped, which is particularly useful for horizontal scrolling elements like the [[ProjectsTicker]].

This work was co-authored by Claude Opus 4.6.

## Related

[[ProjectsTicker]],[[Portfolio]],[[Boot Screen and Easter Egg Improvements (rahilsinghi/portfolio, a286207)]]
