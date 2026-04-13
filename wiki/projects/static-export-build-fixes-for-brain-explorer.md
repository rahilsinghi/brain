---
title: Static Export Build Fixes for Brain-Explorer
author: ai
created_at: 2026-04-11T00:12:18.730Z
last_ai_edit: 2026-04-11T00:12:18.730Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-fix-static-export-build-remove-next-font-fix-node-ac4dc6.md]]"
tags:
  - nextjs
  - static-export
  - build-fix
  - brain-explorer
  - error-handling
  - tailwind
  - prerendering
---

# Static Export Build Fixes for Brain-Explorer

This commit addresses critical build issues in the Brain-Explorer project, primarily resolving a `useContext` null error encountered during Next.js 16 static exports. It achieves this by replacing `next/font/google Inter()` with a more compatible Tailwind font system. Additionally, the fix ensures correct `NODE_ENV` configuration and introduces dedicated error pages for improved application robustness.

## Key Concepts

Next.js 16,Static Export,Prerendering,useContext Hook,Tailwind CSS,Error Handling

## Details

The commit `94706f0` in the `rahilsinghi/brain-explorer` repository implements several fixes to ensure a stable static export build. The primary issue resolved was a `useContext` null error that occurred during prerendering when using `next/font/google Inter()` with Next.js 16's static export feature. This was mitigated by replacing the specific font import with a more generic Tailwind font-sans system stack, which relies on native system fonts.

To further stabilize the build process, an explicit `NODE_ENV=production` flag was added to the build script. This ensures that the application is built in a production environment, preventing development-specific configurations from interfering with the static export.

Finally, comprehensive error handling was implemented by adding `global-error.tsx` and `not-found.tsx` pages. These files provide proper user feedback and graceful redirection for unhandled errors and non-existent routes in the statically exported application.

## Related

[[Brain Explorer Update: Wikilink Rendering, Palette Filtering, and Code Cleanup]],[[chore: update next-env.d.ts and tsconfig.json for Next.js 16]]
