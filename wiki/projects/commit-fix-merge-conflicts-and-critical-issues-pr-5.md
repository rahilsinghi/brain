---
title: "Commit: Fix Merge Conflicts and Critical Issues (PR #5)"
author: ai
created_at: 2026-04-10T15:07:31.723Z
last_ai_edit: 2026-04-10T15:07:31.723Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-resolve-merge-conflicts-and-fix-critical-issues-from-pr-c37d62.md]]"
tags:
  - fix
  - commit
  - merge-conflict
  - minimap
  - mapbox
  - tailwindcss
  - react
  - ssr
  - cleanup
  - refactor
  - asknyc
  - pr-5
  - pr-4
  - frontend
---

# Commit: Fix Merge Conflicts and Critical Issues (PR #5)

This commit resolves merge conflicts stemming from integrating `PR #4 camera capture` into the cinematic map branch of the `rahilsinghi/askNYC` repository. It addresses critical issues across several components, including the MiniMap, MapEvidenceCard, and SearchInput, while also performing significant code cleanup by removing unused packages and redundant configurations.

## Key Concepts

Merge Conflicts,MiniMap,MapEvidenceCard,SearchInput,Dashboard,CameraFeed,Tailwind CSS,Dynamic Import,Server-Side Rendering (SSR),React Roots,Unused Packages,Webpack Configuration,Mapbox,CSS Keyframes

## Details

This commit, identified by SHA `7d6957e` and authored by Rahil Singhi on 2026-03-28, primarily focuses on stabilizing the `cinematic map` branch of the `rahilsinghi/askNYC` project following the integration of `PR #4 camera capture`.

Key changes and fixes include:

*   **Merge Resolution**: Successfully merged the `main` branch, which included `PR #4 camera capture`, into the `cinematic map` branch, resolving conflicts.
*   **MiniMap Enhancements**: 
    *   Added a `MAPBOX_TOKEN` guard to prevent issues if the token is missing.
    *   Implemented CSS fallbacks for improved styling resilience.
    *   Converted MiniMap to use dynamic imports, preventing Server-Side Rendering (SSR) breakage.
    *   Restored backend pin syncing and `flyTo` behavior for interactive map functionality.
    *   Ensured proper cleanup of React roots upon component unmount to prevent memory leaks.
*   **MapEvidenceCard Fix**: Replaced dynamic Tailwind CSS classes with a static lookup map to improve performance and maintainability.
*   **SearchInput Fix**: Added the missing `cn` import, likely for class name utility functions.
*   **Dashboard CameraFeed Fix**: Updated the `CameraFeed` component within the dashboard to correctly use `displayImage` (supporting both captured and uploaded images).
*   **globals.css Fix**: Preserved the `flash` and `pulse-cyan` keyframes, which were introduced in `PR #4`, to maintain intended animations.
*   **Code Cleanup**: 
    *   Removed unused packages: `three`, `@types/three`, and `@googlemaps/js-api-loader`.
    *   Deleted redundant `autoprefixer` configuration.
    *   Removed dead `webpack` configuration files.
    *   Eliminated global `mapbox` CSS that was no longer required.

## Related

[[PR #5]],[[PR #4 camera capture]],[[rahilsinghi/askNYC]],[[Rahil Singhi]],[[MiniMap]],[[MapEvidenceCard]],[[SearchInput]],[[Dashboard]],[[CameraFeed]],[[Mapbox]],[[Tailwind CSS]],[[React]],[[Server-Side Rendering]],[[Webpack]]
