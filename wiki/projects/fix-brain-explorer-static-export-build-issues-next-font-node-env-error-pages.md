---
title: "Fix: Brain-Explorer Static Export Build Issues (next/font, NODE_ENV, Error Pages)"
author: ai
created_at: 2026-04-11T00:12:06.320Z
last_ai_edit: 2026-04-11T00:12:06.320Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-fix-static-export-build-remove-next-font-fix-node-ac4dc6.md]]"
tags:
  - fix
  - static export
  - next.js
  - brain-explorer
  - frontend
  - build process
  - error handling
  - commit
---

# Fix: Brain-Explorer Static Export Build Issues (next/font, NODE_ENV, Error Pages)

This commit addresses several critical issues preventing a successful static export build for the `rahilsinghi/brain-explorer` project. It specifically resolves a `useContext` null error caused by `next/font`, enforces `NODE_ENV=production` during build, and implements dedicated error pages (`global-error.tsx`, `not-found.tsx`) for robust error handling.

## Key Concepts

Static Export,Next.js 16,next/font,useContext,Prerendering,Tailwind CSS,NODE_ENV,Error Handling,global-error.tsx,not-found.tsx

## Details

The `rahilsinghi/brain-explorer` project encountered build failures during static export due to multiple issues. The primary problem was a `useContext` null error triggered by `next/font/google Inter()`, which manifested during the prerendering phase of the Next.js 16 build process. To resolve this, `next/font` was removed and replaced with Tailwind CSS's default font-sans system stack, ensuring compatibility and stable prerendering.

Additionally, the build script was explicitly updated to set `NODE_ENV=production`. This ensures that Next.js builds are optimized for production environments and avoids potential discrepancies or unexpected behavior during the static export.

Finally, comprehensive error handling was implemented by adding `global-error.tsx` and `not-found.tsx` files. These pages provide proper fallback UI for unhandled errors and 404 routes, improving the user experience and robustness of the statically exported application.

## Related

[[Brain-Explorer]],[[chore: update next-env.d.ts and tsconfig.json for Next.js 16]],[[Tailwind CSS]],[[React]],[[Claude Opus]]
