---
title: "fix: move glitch styles to globals.css, fix hydration mismatches"
author: ai
created_at: 2026-04-10T02:55:15.681Z
last_ai_edit: 2026-04-10T02:55:15.681Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-fix-move-glitch-styles-to-globalscss-fix-hydration-mism-c9ca41.md]]"
tags:
  - bug-fix
  - css
  - hydration
  - next.js
  - react
  - portfolio
  - animations
  - ssr
  - styled-jsx
  - rahil-singhi
---

# fix: move glitch styles to globals.css, fix hydration mismatches

This commit in the rahilsinghi/portfolio repository addresses several frontend issues including moving 404 glitch animation styles from inline JSX to globals.css and resolving Next.js hydration mismatches. Changes span 5 files with 240 additions and 280 deletions, resulting in a net reduction of code. The fix was co-authored with Claude Opus 4.6.

## Key Concepts

- **Glitch Keyframe Migration:** Moving CSS keyframe animations from inline `<style jsx>` blocks to a global stylesheet for better separation of concerns
- **Hydration Mismatch:** A Next.js/React issue where server-rendered HTML differs from client-rendered output, causing warnings or UI inconsistencies
- **useEffect for Client-Only Logic:** Using React's `useEffect` hook to defer computations (like `isNew`) to the client side, preventing server/client mismatches
- **suppressHydrationWarning:** A React prop added to elements like `<html>` to suppress hydration warnings caused by browser extensions or theme injection
- **Theme Flash Prevention:** Avoiding a flash of unstyled or incorrectly themed content during page load
- **overflow-x-clip:** A CSS utility used to prevent horizontal overflow in ticker/scrolling components without creating a new scroll context

## Details

## Overview

Commit `92ca7f6` in the `rahilsinghi/portfolio` repository introduces a set of bug fixes focused on CSS architecture and React hydration stability, authored by Rahil Singhi on April 8, 2026.

## Changes Made

### 1. Glitch Styles Moved to `globals.css`
The 404 page previously used an inline `<style jsx>` block to define CSS keyframe animations for a glitch effect. These styles were relocated to `globals.css` to:
- Improve maintainability and separation of concerns
- Avoid potential issues with styled-jsx scoping and SSR
- Centralize animation definitions

### 2. ProjectsTicker Hydration Mismatch Fix
The `ProjectsTicker` component was computing `isNew` (likely a flag determining if a project is recently added) during render, which caused differing outputs between server and client. The fix defers this computation to a `useEffect` hook, ensuring it only runs on the client side after hydration.

### 3. `suppressHydrationWarning` on `<html>`
Added the `suppressHydrationWarning` prop to the root `<html>` element to prevent React from logging hydration warnings triggered by theme-related attribute changes (e.g., `data-theme` or `class` modifications injected by theme scripts before React hydrates).

### 4. Ticker Overflow Fix
Replaced or added `overflow-x-clip` to the ticker component to properly contain horizontal overflow without inadvertently creating a new scrolling context, which `overflow-x-hidden` can sometimes cause.

## File Impact

| Metric | Value |
|---|---|
| Files Changed | 5 |
| Additions | +240 |
| Deletions | -280 |
| Net Change | -40 lines |

## Collaboration
This commit was co-authored with **Claude Opus 4.6**, an AI assistant by Anthropic.

## Related

- [[rahilsinghi/portfolio]]
- [[Next.js Hydration]]
- [[React useEffect]]
- [[CSS Keyframe Animations]]
- [[globals.css]]
- [[ProjectsTicker Component]]
- [[suppressHydrationWarning]]
- [[Theme Flash Prevention]]
- [[Claude Opus 4.6]]
