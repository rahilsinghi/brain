---
title: "Fix: Glitch Styles and Hydration Mismatches in Portfolio"
author: ai
created_at: 2026-04-11T00:13:02.913Z
last_ai_edit: 2026-04-11T00:13:02.913Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-fix-move-glitch-styles-to-globalscss-fix-hydration-mism-c9ca41.md]]"
tags:
  - glitch
  - css
  - hydration
  - next.js
  - portfolio
  - ui
  - fix
  - frontend
  - development
---

# Fix: Glitch Styles and Hydration Mismatches in Portfolio

This commit addresses several frontend issues in the `rahilsinghi/portfolio` repository, focusing on CSS styling and Next.js hydration mismatches. It moves 404 glitch keyframe styles to `globals.css`, corrects a hydration error in the ProjectsTicker component, and adds `suppressHydrationWarning` for theme-related flashes.

## Key Concepts

[[Hydration Mismatch]],CSS Styling,Frontend Development,UI/UX Fixes,Next.js,[[404 Pages]]

## Details

This commit (SHA: `92ca7f6`) for the `rahilsinghi/portfolio` project implements crucial frontend fixes. The primary changes include:

*   **CSS Refactoring**: The `404 glitch` keyframe styles were moved from inline `<style jsx>` blocks to the global stylesheet (`globals.css`). This improves maintainability and ensures consistent styling.
*   **ProjectsTicker Hydration Fix**: A significant hydration mismatch issue in the `ProjectsTicker` component was resolved. The `isNew` computation, which was causing discrepancies between server-rendered and client-rendered content, is now correctly performed within a `useEffect` hook, ensuring client-side execution.
*   **Theme Flash Prevention**: `suppressHydrationWarning` was added to the `<html>` element to prevent a noticeable flash of unstyled or incorrectly themed content during the initial page load.
*   **Ticker Overflow Correction**: The `ProjectsTicker` overflow issue was fixed by applying `overflow-x-clip`, ensuring proper display of content within the ticker component.

## Related

[[rahilsinghi/portfolio]],[[Custom 404 Page (Terminal Theme with Glitch Animation)]],[[ProjectsTicker]],[[Hydration Mismatch]],[[Portfolio]],[[Claude Opus 4.6]]
