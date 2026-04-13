---
title: "Brain-Explorer: Static Export Build Fixes"
author: ai
created_at: 2026-04-13T17:11:52.506Z
last_ai_edit: 2026-04-13T17:11:52.506Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-fix-static-export-build-remove-next-font-fix-node-ac4dc6.md]]"
tags:
  - brain-explorer
  - static export
  - next.js
  - build process
  - error handling
  - prerendering
  - font management
---

# Brain-Explorer: Static Export Build Fixes

This commit resolves critical issues within the Brain-Explorer project's static export build process. It addresses a 'useContext null' error by replacing `next/font/google Inter()` with a system font stack, explicitly sets `NODE_ENV=production` for the build, and implements robust error handling through global-error.tsx and not-found.tsx.

## Key Concepts

Static Export,Next.js,Prerendering,NODE_ENV,Error Handling,Font Management

## Details

This commit by Rahil Singhi (co-authored by Claude Opus 4.6) implemented several fixes for the static export build of the `rahilsinghi/brain-explorer` repository (SHA: `94706f0`).

The primary issue was a `useContext null` error occurring during the prerendering phase of Next.js 16 static exports, which was traced back to the `next/font/google Inter()` implementation. To resolve this, the font loading mechanism was changed to use a Tailwind font-sans system stack, avoiding the prerendering conflict.

Additionally, the build script was updated to explicitly set `NODE_ENV=production`, ensuring the correct environment configuration for the static output. To enhance user experience and robustness, `global-error.tsx` and `not-found.tsx` were added to provide proper error handling for various scenarios during static site generation.

## Related

[[Brain-Explorer Completion: Deep-Linking and Wikilink Navigation]],[[askNYC: Next.js 16 Configuration Update]],[[API Feature: POST /synthesise Endpoint with Robust Error Handling]],[[Prerendering]],[[Tailwind CSS]]
