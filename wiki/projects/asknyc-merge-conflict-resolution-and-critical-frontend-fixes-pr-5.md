---
title: "askNYC: Merge Conflict Resolution and Critical Frontend Fixes (PR #5)"
author: ai
created_at: 2026-04-13T17:11:30.534Z
last_ai_edit: 2026-04-13T17:11:30.534Z
last_human_edit: null
last_embedded_hash: 468fad3bb53410a3
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-resolve-merge-conflicts-and-fix-critical-issues-from-pr-c37d62.md]]"
tags:
  - asknyc
  - frontend
  - bugfix
  - merge
  - refactor
  - mapbox
  - react
  - ssr
  - tailwind
  - webpack
  - dependencies
  - ui
---


# askNYC: Merge Conflict Resolution and Critical Frontend Fixes (PR #5)

This commit resolves significant merge conflicts and critical frontend issues arising from merging the `main` branch (including PR #4's camera capture feature) into the cinematic map branch of the `askNYC` project. It addresses problems with the MiniMap, MapEvidenceCard, SearchInput, and ensures proper display of captured images, while also cleaning up unused packages and configurations.

## Key Concepts

Merge Conflicts,Frontend Development,Mapbox Integration,Server-Side Rendering (SSR),UI Components,Package Management,Webpack Configuration,Tailwind CSS

## Details

This commit (`7d6957e`) by Rahil Singhi on 2026-03-28 involved merging the `main` branch, which contained the [[askNYC: Remote Image Capture and Dashboard Integration (PR #4)]], into the `cinematic map branch` (likely related to [[askNYC: 3D Map-Dominant Dashboard UI Redesign]]). The merge resulted in `18` files changed, `+669` additions, and `-312` deletions, indicating substantial refactoring and conflict resolution.

Key issues addressed include:

*   **MiniMap Fixes**: Resolved issues with the [[MiniMap]] component by adding a `MAPBOX_TOKEN` guard, implementing CSS fallbacks, ensuring dynamic imports to prevent Server-Side Rendering (SSR) breakage, restoring backend pin syncing and `flyTo` behavior, and properly cleaning up React roots on unmount.
*   **MapEvidenceCard Fixes**: Replaced dynamic Tailwind classes with a static lookup map to improve stability and predictability of the [[MapEvidenceCard]] component.
*   **SearchInput Fixes**: Added a missing `cn` import to the [[SearchInput]] component.
*   **Dashboard Display**: Ensured the dashboard correctly uses `displayImage` (captured and uploaded) for the [[CameraFeed]] component, integrating with the image capture feature from [[askNYC: Remote Image Capture and Dashboard Integration (PR #4)]].
*   **Global CSS**: Preserved `flash` and `pulse-cyan` keyframes in `globals.css` that were introduced in [[askNYC: Remote Image Capture and Dashboard Integration (PR #4)]].
*   **Dependency Cleanup**: Removed unused packages, specifically `three`, `@types/three`, and `@googlemaps/js-api-loader`, streamlining the project dependencies.
*   **Configuration Cleanup**: Eliminated redundant `autoprefixer`, a `dead webpack config`, and global Mapbox CSS, further tidying the project's build process.

## Related

[[askNYC]],[[askNYC: Remote Image Capture and Dashboard Integration (PR #4)]],[[askNYC: Merge Conflict Resolution and Critical Frontend Fixes (PR #5)]],[[askNYC: 3D Map-Dominant Dashboard UI Redesign]],[[MAPBOX_TOKEN]],[[MiniMap]],[[MapEvidenceCard]],[[SearchInput]],[[CameraFeed]],[[React]],[[Tailwind CSS]],[[three.js]],[[Webpack]],[[Server-Side Rendering]]
