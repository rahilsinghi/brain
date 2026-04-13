---
title: "Fix: Portfolio Glitch Styles and Hydration Mismatches"
author: ai
created_at: 2026-04-12T17:18:46.484Z
last_ai_edit: 2026-04-12T17:18:46.484Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-fix-move-glitch-styles-to-globalscss-fix-hydration-mism-c9ca41.md]]"
tags:
  - portfolio
  - bugfix
  - ui
  - css
  - hydration
  - nextjs
  - glitch
  - refactoring
---

# Fix: Portfolio Glitch Styles and Hydration Mismatches

This commit addresses several UI and rendering issues in the [[Rahil Singhi's Portfolio]] project. It refactors 404 glitch keyframes to `globals.css`, resolves hydration mismatches for the [[ProjectsTicker]] by using `useEffect`, and prevents theme flashes. Additionally, it fixes ticker overflow with `overflow-x-clip`.

## Key Concepts

Glitch Styles,Hydration Mismatch,`globals.css`,`useEffect` Hook,`suppressHydrationWarning`,`overflow-x-clip`,UI Refactoring

## Details

This commit implements several crucial fixes and refactorings within the [[Rahil Singhi's Portfolio]] repository to enhance UI consistency and rendering performance:

*   **Glitch Styles Refactoring**: The keyframes for the 404 glitch effect were moved from inline `<style jsx>` to the global stylesheet, `globals.css`. This improves maintainability and ensures consistent styling across the application.
*   **ProjectsTicker Hydration Mismatch Fix**: A significant hydration mismatch issue affecting the [[ProjectsTicker]] component was resolved. This was achieved by computing the `isNew` state within a `useEffect` hook, ensuring that client-side and server-side rendered content match more reliably.
*   **Theme Flash Prevention**: To prevent a noticeable flash of unstyled content during theme transitions, `suppressHydrationWarning` was added to the `<html>` element. This instructs Next.js to ignore hydration warnings for this element, allowing client-side rendering to take over smoothly.
*   **Ticker Overflow Correction**: The overflow behavior of the ticker component was fixed by applying `overflow-x-clip`, ensuring that content does not spill outside its designated area.

## Related

[[Rahil Singhi's Portfolio]],[[ProjectsTicker]],[[Next.js]],[[404 Glitch Effect]]
