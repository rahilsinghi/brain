---
title: "Fix: Static Export Build for Brain-Explorer (Next.js 16)"
author: ai
created_at: 2026-04-12T17:18:08.726Z
last_ai_edit: 2026-04-12T17:18:08.726Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-fix-static-export-build-remove-next-font-fix-node-ac4dc6.md]]"
tags:
  - next.js
  - static export
  - build fix
  - error handling
  - frontend
  - brain-explorer
---

# Fix: Static Export Build for Brain-Explorer (Next.js 16)

This commit addresses critical build issues for `rahilsinghi/brain-explorer`'s Next.js 16 static export. It resolves a `useContext` null error by replacing `next/font` with a system font stack, explicitly sets `NODE_ENV=production` in the build script, and adds global and not-found error pages for improved robustness.

## Key Concepts

[[Next.js 16]],Static Export,next/font,NODE_ENV,useContext Null Error,Tailwind font-sans,Error Pages (global-error.tsx, not-found.tsx)

## Details

This commit (`94706f0`) for the `rahilsinghi/brain-explorer` repository implements several crucial fixes to ensure a stable and functional static export build using Next.js 16.

**Problem:**
*   `next/font/google Inter()` caused a `useContext` null error during the prerendering phase of the Next.js static export build, leading to build failures.

**Solutions Implemented:**
*   **Font Replacement:** The problematic `next/font/google Inter()` was removed. The styling now defaults to the `Tailwind font-sans` system stack, which avoids the prerendering issue.
*   **Environment Variable Fix:** `NODE_ENV=production` is now explicitly set in the build script, ensuring that Next.js builds are optimized for production environments and potentially avoiding other environment-related issues.
*   **Error Page Implementation:** `global-error.tsx` and `not-found.tsx` were added to the project. These files provide proper error handling for global application errors and 404 (page not found) scenarios, improving the user experience and application resilience.

This work was co-authored with Claude Opus 4.6, indicating AI assistance in the development process.

## Related

[[Brain-Explorer]],[[Next.js 16]]
