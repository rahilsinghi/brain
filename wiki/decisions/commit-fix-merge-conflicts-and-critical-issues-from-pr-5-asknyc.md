---
title: "Commit: Fix Merge Conflicts and Critical Issues from PR #5 (askNYC)"
author: ai
created_at: 2026-04-10T21:10:33.072Z
last_ai_edit: 2026-04-10T21:10:33.072Z
last_human_edit: null
last_embedded_hash: b25f054998a50214
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-resolve-merge-conflicts-and-fix-critical-issues-from-pr-c37d62.md]]"
tags:
  - fix
  - merge
  - conflicts
  - pr5
  - asknyc
  - minimap
  - mapbox
  - react
  - tailwind
  - ssr
  - webpack
  - cleanup
  - bugfix
---


# Commit: Fix Merge Conflicts and Critical Issues from PR #5 (askNYC)

This commit resolves merge conflicts stemming from integrating `main` (including PR #4) into the `cinematic map` branch of the `rahilsinghi/askNYC` repository. It addresses several critical issues, including fixes for the MiniMap, MapEvidenceCard, SearchInput, and dashboard components, while also removing unused dependencies and cleaning up CSS and configuration files.

## Key Concepts

- [[Merge Conflicts]],- [[MiniMap]],- [[Mapbox]],- [[Server-Side Rendering (SSR)]],- [[React]],- [[Tailwind CSS]],- [[Webpack]],- [[CameraFeed]]

## Details

This commit, identified by SHA `7d6957e`, was authored by Rahil Singhi on 2026-03-28T14:04:25Z. It represents a significant `fix` commit for the `rahilsinghi/askNYC` repository, involving changes across 18 files with 669 additions and 312 deletions.

Key actions and resolutions include:

*   **Merge Operation:** Integration of the `main` branch (which incorporated changes from [[PR #4: Camera Capture]]) into the `cinematic map` branch, necessitating resolution of merge conflicts.
*   **MiniMap Fixes:**
    *   Implemented a `MAPBOX_TOKEN` guard to prevent issues.
    *   Added CSS fallbacks.
    *   Utilized dynamic imports to prevent [[SSR breakage]].
    *   Restored backend pin syncing and `flyTo` behavior.
    *   Ensured proper cleanup of React roots upon component unmount.
*   **MapEvidenceCard Fix:** Replaced dynamic [[Tailwind CSS]] classes with a static lookup map for improved stability and maintainability.
*   **SearchInput Fix:** Added the missing `cn` import.
*   **Dashboard Fix:** Updated the [[CameraFeed]] component to correctly use `displayImage` (captured and uploaded images).
*   **globals.css Fix:** Preserved `flash` and `pulse-cyan` keyframes introduced in [[PR #4: Camera Capture]].
*   **Dependency Cleanup:**
    *   Removed unused packages: `three`, `@types/three`, and `@googlemaps/js-api-loader`.
    *   Eliminated redundant `autoprefixer` configuration.
    *   Removed dead [[Webpack]] configuration.
    *   Removed global Mapbox CSS that was no longer needed.

## Related

[[PR #4: Camera Capture]],[[PR #5]],[[askNYC Project]],[[Rahil Singhi]],[[MiniMap Component]],[[MapEvidenceCard Component]],[[SearchInput Component]],[[Dashboard Component]],[[CameraFeed Component]]
