---
title: "Fix: Move Glitch Styles to globals.css and Resolve Hydration Mismatches"
author: ai
created_at: 2026-04-10T02:56:50.744Z
last_ai_edit: 2026-04-10T02:56:50.744Z
last_human_edit: null
last_embedded_hash: 3088df8ab24fbbb8
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-fix-move-glitch-styles-to-globalscss-fix-hydration-mism-c9ca41.md]]"
tags:
  - css
  - hydration
  - next.js
  - react
  - bug-fix
  - animations
  - portfolio
  - keyframes
  - useeffect
  - overflow
---


# Fix: Move Glitch Styles to globals.css and Resolve Hydration Mismatches

This commit addresses several frontend issues in the rahilsinghi/portfolio repository, including relocating 404 glitch animation keyframes from inline JSX styles to a global stylesheet and resolving Next.js hydration mismatches. The changes improve rendering consistency between server and client, particularly for the ProjectsTicker component and theme handling.

## Key Concepts

- **Hydration Mismatch**: A Next.js/React issue where server-rendered HTML differs from client-rendered output, causing warnings or broken UI
- **CSS Keyframes**: Animation definitions moved from component-scoped `<style jsx>` to `globals.css` for broader accessibility and cleaner separation of concerns
- **`suppressHydrationWarning`**: A React attribute added to `<html>` to prevent warnings caused by theme-related class differences between server and client renders
- **`useEffect` for Client-Only Logic**: Using React's `useEffect` hook to defer computations (like `isNew`) to the client side, avoiding server/client HTML mismatches
- **`overflow-x-clip`**: A CSS property used to fix ticker overflow without affecting scroll behavior, unlike `overflow-x-hidden`

## Details

## Overview

Commit `92ca7f6` in the `rahilsinghi/portfolio` repository introduces a set of bug fixes targeting CSS architecture and React hydration stability. The commit was authored by Rahil Singhi on April 8, 2026, with co-authorship from Claude Opus 4.6.

## Changes Summary

- **Files Changed:** 5
- **Additions:** +240 lines
- **Deletions:** -280 lines

## Detailed Fix Breakdown

### 1. Glitch Keyframes Moved to `globals.css`
The 404 page previously used an inline `<style jsx>` block to define glitch animation keyframes. These have been relocated to `globals.css`. This improves maintainability and ensures the styles are globally available without relying on scoped JSX styling.

### 2. ProjectsTicker Hydration Mismatch Fix
The `isNew` flag computation in the `ProjectsTicker` component was previously calculated during render, causing a mismatch between server-rendered and client-rendered HTML. By moving this logic into a `useEffect` hook, the value is only computed on the client side after hydration, eliminating the mismatch.

### 3. `suppressHydrationWarning` on `<html>`
A `suppressHydrationWarning` attribute was added to the root `<html>` element to prevent React from logging warnings related to theme class differences (e.g., dark/light mode) that are applied before React hydrates the page.

### 4. Ticker Overflow Fix
The `ProjectsTicker` component's overflow issue was resolved by applying `overflow-x-clip` instead of a previously used approach, correctly clipping content without interfering with scroll containment.

## Related

- [[rahilsinghi/portfolio]]
- [[Next.js Hydration]]
- [[React useEffect]]
- [[CSS Animations and Keyframes]]
- [[globals.css Architecture]]
- [[suppressHydrationWarning]]
- [[ProjectsTicker Component]]
- [[Theme Flash Prevention]]
