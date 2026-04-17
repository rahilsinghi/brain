---
title: "fix(frontend): defer React root unmount in MiniMap cleanup"
author: ai
created_at: 2026-04-13T16:12:18.839Z
last_ai_edit: 2026-04-13T16:12:18.839Z
last_human_edit: null
last_embedded_hash: 61c7878541a05027
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-frontend-defer-react-root-unmount-in-minimap-cleanup-f63b76.md]]"
tags:
  - react
  - frontend
  - bugfix
  - minimap
  - javascript
  - cleanup
  - racecondition
---


# fix(frontend): defer React root unmount in MiniMap cleanup

This commit addresses a React warning in the `MiniMap` component by deferring the `root.unmount()` call within the `useEffect` cleanup function. By using `setTimeout(0)`, a race condition during React's render cycle is avoided, preventing the "unmount while rendering" warning.

## Key Concepts

[[React]],[[useEffect]],[[Race Condition]],`root.unmount()`,`setTimeout(0)`

## Details

This commit, identified by SHA `e12e851` in the `rahilsinghi/askNYC` repository, resolves a frontend issue related to React's rendering lifecycle within a `MiniMap` component. Previously, `root.unmount()` was called synchronously in a `useEffect` cleanup, which created a race condition with React's ongoing render cycle. This led to an "unmount while rendering" warning. The implemented fix defers the `root.unmount()` call by wrapping it in `setTimeout(0)`, pushing the unmounting operation to the next event loop tick and effectively eliminating the race condition.

## Related

[[askNYC — Git Activity]],[[askNYC]]
