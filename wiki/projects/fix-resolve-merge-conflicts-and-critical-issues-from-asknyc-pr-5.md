---
title: "Fix: Resolve Merge Conflicts and Critical Issues from askNYC PR #5"
author: ai
created_at: 2026-04-12T17:17:54.185Z
last_ai_edit: 2026-04-12T17:17:54.185Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-resolve-merge-conflicts-and-fix-critical-issues-from-pr-c37d62.md]]"
tags:
  - asknyc
  - frontend
  - bugfix
  - merge
  - react
  - map
  - css
  - ssr
  - mapbox
  - optimization
---

# Fix: Resolve Merge Conflicts and Critical Issues from askNYC PR #5

This commit addresses merge conflicts and critical issues arising from Pull Request #5 in the `rahilsinghi/askNYC` repository. It integrates camera capture functionality from PR #4 into the cinematic map branch and resolves several frontend bugs, including those affecting the MiniMap, MapEvidenceCard, and SearchInput components.

## Key Concepts

Merge Conflicts,Pull Request Integration,Frontend Bug Fixes,Server-Side Rendering (SSR),Mapbox Integration,Component Unmounting,Camera Capture

## Details

This commit (`7d6957e`) by Rahil Singhi on 2026-03-28 involved significant refactoring and bug fixing for the `rahilsinghi/askNYC` project.

Key changes and fixes include:

*   **Merge Operation**: Merged the `main` branch, which included the camera capture features from [[askNYC: Remote Image Capture and Dashboard Integration (PR #4)]], into the cinematic map feature branch.
*   **MiniMap Fixes**: Addressed multiple issues with the MiniMap component:
    *   Implemented a `MAPBOX_TOKEN` guard to prevent errors.
    *   Added a CSS fallback mechanism.
    *   Used dynamic imports to prevent Server-Side Rendering (SSR) breakage.
    *   Restored backend pin syncing and `flyTo` behavior.
    *   Ensured proper cleanup of React roots on unmount to prevent memory leaks.
*   **MapEvidenceCard Fix**: Replaced dynamic Tailwind CSS classes with a static lookup map to improve reliability and prevent styling issues.
*   **SearchInput Fix**: Added a missing `cn` utility import to the SearchInput component.
*   **Dashboard Integration**: Modified the dashboard to utilize `displayImage` (captured and uploaded) for the `CameraFeed` component, ensuring the correct image source is used.
*   **Global CSS Maintenance**: Retained `flash` and `pulse-cyan` keyframes from [[askNYC: Remote Image Capture and Dashboard Integration (PR #4)]] in `globals.css`.
*   **Dependency Cleanup**: Removed unused packages, including `three`, `@types/three`, and `@googlemaps/js-api-loader`.
*   **Build Process Optimization**: Eliminated redundant `autoprefixer`, dead webpack configuration, and global Mapbox CSS to streamline the build process.

## Related

[[askNYC]],[[Commit: Fix Merge Conflicts and Critical Issues from PR #5 (askNYC)]],[[askNYC: Remote Image Capture and Dashboard Integration (PR #4)]],[[MiniMap]],[[MapEvidenceCard]],[[SearchInput]],[[CameraFeed]],[[Tailwind CSS]],[[React]],[[Server-Side Rendering]],[[Mapbox]]
