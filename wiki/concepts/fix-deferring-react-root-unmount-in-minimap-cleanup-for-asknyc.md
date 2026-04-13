---
title: "Fix: Deferring React Root Unmount in MiniMap Cleanup for askNYC"
author: ai
created_at: 2026-04-13T17:43:24.475Z
last_ai_edit: 2026-04-13T17:43:24.475Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-frontend-defer-react-root-unmount-in-minimap-cleanup-f63b76.md]]"
tags:
  - react
  - frontend
  - bug fix
  - cleanup
  - minimap
  - javascript
  - asknyc
  - performance
---

# Fix: Deferring React Root Unmount in MiniMap Cleanup for askNYC

This fix addresses a race condition in the `askNYC` frontend's `MiniMap` component where `root.unmount()` was called synchronously in a `useEffect` cleanup function. By deferring the unmount operation with `setTimeout(0)`, the issue of 'unmount while rendering' warnings is resolved, ensuring a smoother React render cycle.

## Key Concepts

[[React]] lifecycle,`useEffect` cleanup,`root.unmount()`,Race condition,`setTimeout(0)` for deferral,Frontend bug fix

## Details

A critical frontend bug in the [[askNYC]] project, specifically within the `MiniMap` component, was identified and resolved. The issue stemmed from the synchronous invocation of `root.unmount()` within the `useEffect` cleanup function. This synchronous call created a race condition with React's internal render cycle, leading to the warning: "unmount while rendering."

The fix, implemented in commit `e12e851`, involved deferring the `root.unmount()` call using `setTimeout(0)`. This ensures that the unmounting operation is pushed to the end of the current JavaScript execution queue, allowing React's render cycle to complete before the root is unmounted. The change primarily involved modifying one file, with three additions and two deletions, as part of a targeted fix by Rahil Singhi on March 28, 2026.

**Technical Details:**
*   **Repository:** `rahilsinghi/askNYC`
*   **SHA:** `e12e851`
*   **Date:** `2026-03-28T15:05:10Z`
*   **Author:** [[Rahil Singhi]]
*   **Files changed:** 1
*   **Additions:** +3
*   **Deletions:** -2

## Related

[[askNYC — Git Activity]],[[askNYC]],[[Rahil Singhi]],[[React]],[[Frontend bug fixes]]
