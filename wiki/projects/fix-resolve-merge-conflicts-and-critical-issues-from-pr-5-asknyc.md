---
title: "Fix: Resolve Merge Conflicts and Critical Issues from PR #5 (askNYC)"
author: ai
created_at: 2026-04-11T00:12:10.957Z
last_ai_edit: 2026-04-11T00:12:10.957Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-resolve-merge-conflicts-and-fix-critical-issues-from-pr-c37d62.md]]"
tags:
  - asknyc
  - fix
  - merge conflicts
  - minimap
  - mapbox
  - react
  - frontend
  - css
  - tailwind
  - dependencies
  - bugfix
  - cinematic map
---

# Fix: Resolve Merge Conflicts and Critical Issues from PR #5 (askNYC)

This commit addresses and resolves critical merge conflicts and outstanding issues stemming from the integration of PR #5 into the cinematic map branch of the `rahilsinghi/askNYC` project. Key fixes include enhancing MiniMap stability, correcting UI component rendering, and cleaning up unused dependencies to improve application performance and maintainability.

## Key Concepts

Merge Conflict Resolution,Dependency Management,Frontend Bug Fixes,React Component Lifecycle,Tailwind CSS,Dynamic Imports,Mapbox Integration

## Details

This commit (`SHA: 7d6957e`) on `2026-03-28T14:04:25Z` by Rahil Singhi primarily focuses on stabilizing the `askNYC` application after merging the main branch (which included PR #4's camera capture features) into the `cinematic map branch`. It involved significant code changes across 18 files, with 669 additions and 312 deletions.

The core issues addressed are:

*   **MiniMap Stabilization:**
    *   Implemented a `MAPBOX_TOKEN` guard to prevent errors when the token is unavailable.
    *   Added a CSS fallback for styling.
    *   Ensured dynamic import of the MiniMap component to prevent Server-Side Rendering (SSR) breakage.
    *   Restored backend pin syncing and `flyTo` behavior for map navigation.
    *   Added proper cleanup of React roots on unmount to prevent memory leaks.
*   **MapEvidenceCard Fix:** Replaced dynamic Tailwind CSS classes with a static lookup map to ensure consistent and correct styling.
*   **SearchInput Fix:** Corrected a missing `cn` import, which is likely a utility for conditional class merging.
*   **Dashboard Enhancement:** Modified the dashboard's `CameraFeed` to use `displayImage` (captured and uploaded images) for better integration.
*   **globals.css Fix:** Preserved `flash` and `pulse-cyan` keyframes from PR #4 to maintain intended animations and visual effects.
*   **Dependency Cleanup:**
    *   Removed unused `three`, `@types/three`, and `@googlemaps/js-api-loader` packages.
    *   Eliminated redundant `autoprefixer` and a dead `webpack` configuration.
    *   Removed global `mapbox` CSS that was no longer necessary, streamlining the stylesheet.

## Related

[[askNYC — Git Activity]],[[Fix Merge Conflicts and Critical Issues from PR #5 (askNYC)]],[[AskNYC Cinematic Map Overhaul (feat)]],[[askNYC: Floating Data Cards & Map FlyTo Fix (Commit 202fec2)]],[[Deferring React Root Unmount in MiniMap Cleanup]],[[Build Fixes for askNYC Frontend Merge]],[[CSS @import Order: Google Fonts Precedes Tailwind CSS]],[[askNYC Frontend Backend Integration Update (2026-03-28)]]
