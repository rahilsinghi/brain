---
title: "Fix: Move Glitch Styles to globals.css and Fix Hydration Mismatches"
author: ai
created_at: 2026-04-10T02:55:58.809Z
last_ai_edit: 2026-04-10T02:55:58.809Z
last_human_edit: null
last_embedded_hash: ec098b619ec841d3
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-fix-move-glitch-styles-to-globalscss-fix-hydration-mism-c9ca41.md]]"
tags:
  - hydration
  - nextjs
  - react
  - css
  - animations
  - portfolio
  - bug-fix
  - useeffect
  - glitch
  - styling
---


# Fix: Move Glitch Styles to globals.css and Fix Hydration Mismatches

This commit addresses several hydration and styling issues in the rahilsinghi/portfolio project. Key changes include migrating 404 glitch keyframe animations from inline JSX styles to globals.css, resolving hydration mismatches in the ProjectsTicker component, and adding theme flash prevention.

## Key Concepts

- **Hydration Mismatch**: A React/Next.js issue where server-rendered HTML differs from client-side rendered output, causing errors or inconsistencies
- **CSS Keyframes**: Animation definitions moved from inline `<style jsx>` blocks to a global stylesheet for better maintainability
- **suppressHydrationWarning**: A React prop applied to elements (like `<html>`) to suppress warnings caused by intentional server/client differences, such as theme flashing
- **useEffect Hook**: Used to defer client-only computations (like `isNew`) until after hydration, preventing mismatches
- **overflow-x-clip**: A CSS property used to fix ticker overflow rendering issues

## Details

## Overview

Commit `92ca7f6` in the `rahilsinghi/portfolio` repository introduces a set of fixes targeting hydration mismatches and CSS organization. The changes span 5 files with 240 additions and 280 deletions, resulting in a net reduction of code.

## Changes Breakdown

### 1. Glitch Keyframes Moved to globals.css
The 404 page previously defined glitch animation keyframes inline using `<style jsx>`. These have been relocated to `globals.css` to:
- Improve separation of concerns
- Reduce inline style bloat
- Make animations globally accessible and easier to maintain

### 2. ProjectsTicker Hydration Mismatch Fix
The `isNew` computation in `ProjectsTicker` was previously executed during render, causing a mismatch between server and client output. By moving this logic into a `useEffect` hook, the value is now only computed on the client side after hydration, eliminating the mismatch.

### 3. suppressHydrationWarning on `<html>`
Added the `suppressHydrationWarning` prop to the `<html>` element to prevent React from throwing warnings related to theme flash. This is a common pattern when using dark/light mode toggling that modifies the `<html>` element's attributes before React hydrates.

### 4. Ticker Overflow Fix
Applied `overflow-x-clip` to the ticker component to properly contain overflowing content without affecting scroll behavior, resolving a visual rendering bug.

## Collaboration
This commit was co-authored with Claude Opus 4.6, indicating AI-assisted development.

## Related

- [[Next.js Hydration]]
- [[React useEffect Hook]]
- [[CSS Animations and Keyframes]]
- [[globals.css Best Practices]]
- [[suppressHydrationWarning]]
- [[Dark Mode Theme Flash Prevention]]
- [[rahilsinghi/portfolio]]
