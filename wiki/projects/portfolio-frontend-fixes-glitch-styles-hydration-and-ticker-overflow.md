---
title: "Portfolio Frontend Fixes: Glitch Styles, Hydration, and Ticker Overflow"
author: ai
created_at: 2026-04-11T00:12:39.187Z
last_ai_edit: 2026-04-11T00:12:39.187Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-fix-move-glitch-styles-to-globalscss-fix-hydration-mism-c9ca41.md]]"
tags:
  - frontend
  - next.js
  - css
  - bugfix
  - portfolio
  - hydration
  - ui
---

# Portfolio Frontend Fixes: Glitch Styles, Hydration, and Ticker Overflow

This commit addresses several frontend issues in the `rahilsinghi/portfolio` repository, including refactoring 404 glitch styles, resolving hydration mismatches in the ProjectsTicker component, and preventing theme flash. It also includes a fix for ticker overflow to improve UI stability.

## Key Concepts

Frontend Development,CSS Styling,Hydration Mismatches,Next.js,User Interface (UI) Fixes,Theming

## Details

This commit, identified by SHA `92ca7f6` and authored by Rahil Singhi, focuses on enhancing the stability and visual consistency of the `rahilsinghi/portfolio` website. Key changes include:

*   **404 Glitch Style Refactoring**: The `glitch` keyframes, previously defined inline using `<style jsx>`, were moved to the global stylesheet (`globals.css`). This improves maintainability and ensures consistent styling across the application.
*   **ProjectsTicker Hydration Mismatch Resolution**: A `hydration mismatch` in the [[ProjectsTicker]] component was fixed. This involved ensuring that the `isNew` computation, which likely determines the display state of certain elements, is performed within a `useEffect` hook. This approach guarantees that the client-side rendering matches the server-side generated HTML, preventing visual glitches or errors.
*   **Theme Flash Prevention**: The `suppressHydrationWarning` attribute was added to the `<html>` tag. This is a common technique in Next.js applications to prevent a brief 'flash' of incorrect theme (e.g., light mode before dark mode loads) during the initial page load.
*   **Ticker Overflow Fix**: The `overflow-x-clip` CSS property was applied to resolve an issue where content within the ticker component would overflow horizontally, disrupting the layout.

## Related

[[Rahil Singhi's Portfolio]],[[Custom 404 Page with Terminal Theme and Glitch Animation]],[[ProjectsTicker]]
