---
title: "Fix: Move Glitch Styles and Address Hydration Mismatches in Portfolio"
author: ai
created_at: 2026-04-13T17:12:37.194Z
last_ai_edit: 2026-04-13T17:12:37.194Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-fix-move-glitch-styles-to-globalscss-fix-hydration-mism-c9ca41.md]]"
tags:
  - frontend
  - css
  - hydration
  - next.js
  - bugfix
  - portfolio
  - styling
  - javascript
  - react
---

# Fix: Move Glitch Styles and Address Hydration Mismatches in Portfolio

This commit refactors CSS glitch keyframes from inline styles to `globals.css` in the `rahilsinghi/portfolio` project to improve maintainability. It also resolves hydration mismatches in the `ProjectsTicker` component by using `useEffect` for client-side state computation and adds `suppressHydrationWarning` to the `<html>` tag to prevent theme flashing. Additionally, the change addresses a ticker overflow issue with `overflow-x-clip`.

## Key Concepts

CSS Keyframes,Hydration Mismatch,`useEffect` Hook,`suppressHydrationWarning`,`overflow-x-clip`,Inline Styles (`<style jsx>`),Global Stylesheets (`globals.css`),Frontend Development

## Details

The commit `92ca7f6` by Rahil Singhi, co-authored by Claude Opus 4.6 on 2026-04-08, implements several crucial frontend rendering and styling fixes within the `rahilsinghi/portfolio` repository.

Key changes include:

1.  **CSS Glitch Styles Refactoring**: The `404 glitch keyframes` that were previously defined within inline `<style jsx>` tags have been relocated to the centralized `globals.css` file. This improves the organization and maintainability of the stylesheet, making it easier to manage global styles.
2.  **ProjectsTicker Hydration Mismatch Resolution**: A significant `Hydration Mismatch` issue affecting the `ProjectsTicker` component was addressed. The fix involves computing the `isNew` state client-side within a `useEffect` hook. This ensures that the initial client-side render accurately matches the server-rendered HTML, preventing inconsistencies.
3.  **Theme Flash Prevention**: The `suppressHydrationWarning` prop was strategically added to the `<html>` tag. This is a common practice in Next.js applications to prevent a momentary "flash" or visual discrepancy, often related to theme application or dynamic content, when the client-side JavaScript takes over from the server-rendered HTML.
4.  **Ticker Overflow Fix**: An `overflow-x-clip` property was applied to resolve a `ticker overflow` issue. This CSS property effectively clips any content that extends beyond the element's padding box along the x-axis, ensuring that the ticker content remains within its intended boundaries and prevents unwanted horizontal scrolling or visual artifacts.

These modifications impacted 5 files, resulting in 240 additions and 280 deletions, contributing to a more robust and visually consistent user experience for the portfolio.

## Related

[[rahilsinghi/portfolio]],[[Hydration Mismatch]],[[Frontend Development]],[[Next.js]],[[useEffect]],[[suppressHydrationWarning]],[[CSS Keyframes]]
