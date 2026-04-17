---
title: Static Export Build Fixes for Brain-Explorer
author: ai
created_at: 2026-04-12T21:19:08.198Z
last_ai_edit: 2026-04-12T21:19:08.198Z
last_human_edit: null
last_embedded_hash: 3a213c63a3445366
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-fix-static-export-build-remove-next-font-fix-node-ac4dc6.md]]"
tags:
  - bug fix
  - next.js
  - static export
  - prerendering
  - error handling
  - build process
  - brain-explorer
  - font
  - environment variables
---


# Static Export Build Fixes for Brain-Explorer

This article details a critical fix for the `brain-explorer` repository, addressing a `useContext` null error during Next.js 16 static prerendering caused by `next/font/google`. The solution involved replacing the problematic font import, explicitly setting `NODE_ENV=production` for the build, and implementing global error pages for robust error handling.

## Key Concepts

Next.js 16 Static Export,Prerendering Errors,next/font,Tailwind CSS font-sans,NODE_ENV,Error Handling (Next.js),Global Error Pages

## Details

A build error was encountered in the `rahilsinghi/brain-explorer` repository (SHA: `94706f0`) during the static export process for Next.js 16. The primary issue was a `useContext` null error occurring during prerendering, directly attributable to the `next/font/google Inter()` import.

To resolve this, the following changes were implemented:

1.  **Font Replacement**: The `next/font/google Inter()` import was removed and replaced with the `Tailwind font-sans` system stack, eliminating the `useContext` conflict during prerendering.
2.  **Environment Variable**: The build script was updated to explicitly set `NODE_ENV=production`, ensuring the correct environment configuration for the static export.
3.  **Error Pages**: `global-error.tsx` and `not-found.tsx` were added to provide proper error handling and a better user experience for cases where pages or routes are not found or encounter unexpected global errors.

## Related

[[Brain-Explorer]],[[Next.js 16]],[[Tailwind CSS]],[[Error Handling]],[[Static Export]],[[Prerendering]],[[next/font]],[[NODE_ENV]]
