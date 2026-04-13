---
title: "Portfolio: CSS Glitch Styles Relocation and Hydration Mismatch Fixes"
author: ai
created_at: 2026-04-13T15:31:42.512Z
last_ai_edit: 2026-04-13T15:31:42.512Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-fix-move-glitch-styles-to-globalscss-fix-hydration-mism-c9ca41.md]]"
tags:
  - fix
  - portfolio
  - css
  - styling
  - hydration
  - react
  - next.js
  - frontend
  - glitch
  - ticker
---

# Portfolio: CSS Glitch Styles Relocation and Hydration Mismatch Fixes

This update addresses styling and rendering issues within the `rahilsinghi/portfolio` project. It relocates 404 glitch keyframe styles to `globals.css` and resolves hydration mismatches in the `ProjectsTicker` component by using `useEffect`. Additionally, it prevents theme flashes with `suppressHydrationWarning` and corrects ticker overflow behavior.

## Key Concepts

CSS Styling,Keyframe Animations,Hydration Mismatch,React Hooks (useEffect),Next.js Rendering,Theming,CSS Overflow Properties

## Details

This commit (`92ca7f6`) for the `rahilsinghi/portfolio` repository, authored by Rahil Singhi and co-authored by Claude Opus 4.6 on 2026-04-08, involved 5 file changes with 240 additions and 280 deletions. The primary focus was on refining the application's styling and resolving client-side rendering discrepancies.

Key changes include:
*   **CSS Glitch Styles Relocation**: The `404 glitch keyframes` were moved from inline `<style jsx>` to the global stylesheet, `globals.css`. This improves maintainability and ensures consistent styling across the application.
*   **ProjectsTicker Hydration Mismatch Fix**: A significant rendering issue with the `ProjectsTicker` component, characterized by hydration mismatches, was resolved. This fix involved computing the `isNew` state within a `useEffect` hook, ensuring that client-side rendering aligns correctly with the server-rendered HTML.
*   **Theme Flash Prevention**: The `suppressHydrationWarning` attribute was added to the `<html>` tag. This is a common practice in Next.js applications to prevent a brief 'flash' of the incorrect theme or initial state during the hydration process, especially when themes are determined client-side.
*   **Ticker Overflow Correction**: The overflow behavior of the ticker component was addressed by applying `overflow-x-clip`. This ensures that content outside the ticker's horizontal bounds is clipped, preventing unwanted scrollbars or layout shifts.

## Related

[[Portfolio]],[[404 Glitch Effect]],[[ProjectsTicker]],[[Hydration Mismatch]],[[React useEffect Hook]],[[suppressHydrationWarning]],[[Theme Management]],[[CSS Overflow Property]],[[globals.css]],[[overflow-x-clip]]
