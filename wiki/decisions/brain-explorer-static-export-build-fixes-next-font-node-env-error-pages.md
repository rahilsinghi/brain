---
title: "Brain-Explorer: Static Export Build Fixes (next/font, NODE_ENV, Error Pages)"
author: ai
created_at: 2026-04-13T15:30:45.882Z
last_ai_edit: 2026-04-13T15:30:45.882Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-fix-static-export-build-remove-next-font-fix-node-ac4dc6.md]]"
tags:
  - brain-explorer
  - next.js
  - static export
  - build fix
  - next/font
  - node_env
  - error handling
  - prerendering
  - tailwindcss
---

# Brain-Explorer: Static Export Build Fixes (next/font, NODE_ENV, Error Pages)

This article details a critical fix for the `brain-explorer` project, resolving a `useContext` null error during Next.js 16 static prerendering caused by `next/font/google`. The solution involved replacing the font import with a Tailwind font stack, explicitly setting `NODE_ENV=production` for builds, and implementing proper `global-error.tsx` and `not-found.tsx` pages for robust error handling.

## Key Concepts

Next.js Static Export,useContext Null Error,next/font/google,Tailwind CSS Font Stack,NODE_ENV,Error Handling (global-error.tsx, not-found.tsx),Prerendering

## Details

A significant issue was identified in the `[[Brain-Explorer]]` project where `next/font/google Inter()` caused a `useContext` null error during the prerendering phase of a [[Next.js 16 Configuration Update]] static export. This prevented the successful generation of static assets. 

The fix involved several key changes:

1.  **Font Replacement**: The problematic `next/font/google Inter()` import was removed and replaced with a system-defined `font-sans` stack, utilizing [[Tailwind CSS]] utility classes to ensure consistent typography without prerendering conflicts.
2.  **Environment Variable Enforcement**: `NODE_ENV=production` was explicitly added to the build script to ensure that Next.js builds were always executed in a production environment, which can affect optimization and error handling behaviors.
3.  **Error Page Implementation**: To provide a more robust and user-friendly experience, `global-error.tsx` and `not-found.tsx` components were introduced. These pages ensure that any unexpected errors or requests for non-existent paths are handled gracefully, improving the overall stability of the static export.

This resolution, co-authored by [[Claude Opus 4.6]], addresses the prerendering bug and enhances the build process for static deployment of the `brain-explorer` application.

## Related

[[Brain-Explorer]],[[Next.js 16 Configuration Update]],[[Tailwind CSS]],[[Claude Opus 4.6]]
