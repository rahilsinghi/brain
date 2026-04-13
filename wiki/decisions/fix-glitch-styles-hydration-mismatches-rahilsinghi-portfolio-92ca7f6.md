---
title: "Fix: Glitch Styles & Hydration Mismatches (rahilsinghi/portfolio 92ca7f6)"
author: ai
created_at: 2026-04-10T19:08:37.401Z
last_ai_edit: 2026-04-10T19:08:37.401Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-fix-move-glitch-styles-to-globalscss-fix-hydration-mism-c9ca41.md]]"
tags:
  - fix
  - hydration
  - css
  - glitch
  - portfolio
  - frontend
  - react
  - bugfix
  - stylesheet
---

# Fix: Glitch Styles & Hydration Mismatches (rahilsinghi/portfolio 92ca7f6)

This commit addresses several frontend issues within the `rahilsinghi/portfolio` project, primarily by moving glitch keyframes to a global stylesheet and resolving hydration mismatches in the ProjectsTicker component. It also implements a solution for theme flash prevention and fixes a ticker overflow issue.

## Key Concepts

* Hydration mismatch,* CSS Keyframes,* `globals.css`,* `useEffect` hook,* `suppressHydrationWarning`,* `overflow-x-clip`

## Details

This commit, identified by SHA `92ca7f6` and authored by Rahil Singhi on April 8, 2026, focuses on improving the stability and appearance of the `rahilsinghi/portfolio` website. Key changes include:

- **Glitch Styles Relocation**: The `404 glitch keyframes`, previously embedded inline using `<style jsx>`, have been moved to `globals.css`. This centralizes styling and improves maintainability.
- **ProjectsTicker Hydration Fix**: A hydration mismatch in the `ProjectsTicker` component was resolved by computing the `isNew` status within a `useEffect` hook. This ensures that client-side rendering matches the server-rendered output, preventing UI flickering or errors.
- **Theme Flash Prevention**: The `suppressHydrationWarning` attribute was added to the `<html>` tag to prevent a brief 'flash' of unstyled content or incorrect theme during initial page load, which is common with theme-switching implementations.
- **Ticker Overflow Solution**: The `ProjectsTicker` component's visual overflow issue was fixed by applying `overflow-x-clip`, ensuring content remains within its intended boundaries.

## Related

[[Rahil Singhi]],[[rahilsinghi/portfolio]],[[Frontend Hydration]],[[CSS Styling Best Practices]],[[Claude Opus 4.6]]
