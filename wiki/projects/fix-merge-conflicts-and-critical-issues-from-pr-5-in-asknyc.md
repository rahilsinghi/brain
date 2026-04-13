---
title: "Fix: Merge Conflicts and Critical Issues from PR #5 in askNYC"
author: ai
created_at: 2026-04-11T00:11:55.395Z
last_ai_edit: 2026-04-11T00:11:55.395Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-resolve-merge-conflicts-and-fix-critical-issues-from-pr-c37d62.md]]"
tags:
  - bug fix
  - merge conflicts
  - asknyc
  - frontend
  - map
  - ui
  - refactoring
  - dependency management
  - ssr
  - mapbox
---

# Fix: Merge Conflicts and Critical Issues from PR #5 in askNYC

This commit addresses and resolves critical merge conflicts and bugs introduced during the integration of PR #5 (cinematic map branch) into the `rahilsinghi/askNYC` project. Key fixes include restoring MiniMap functionality, improving UI component robustness, and removing unused dependencies.

## Key Concepts

[[askNYC]],Merge Conflicts,Bug Fixes,[[MiniMap]],[[Mapbox Token Guard]],[[Dynamic Import]],Server-Side Rendering (SSR),[[React Roots Cleanup]],[[MapEvidenceCard]],[[Tailwind CSS]],[[SearchInput]],[[CameraFeed]],[[Autoprefixer]],[[Webpack]],[[three.js]],Google Maps API

## Details

This commit (`7d6957e`) for the `rahilsinghi/askNYC` repository, authored by Rahil Singhi on 2026-03-28, focuses on resolving merge conflicts and critical issues that arose from merging the `main` branch (which included [[PR #4 camera capture]]) into the cinematic map branch ([[askNYC Cinematic Map Overhaul (feat)]], also referred to as PR #5).

Key changes and fixes include:

*   **MiniMap Enhancements**: The MiniMap component was significantly refactored to prevent Server-Side Rendering (SSR) breakage. This involved adding a `MAPBOX_TOKEN` guard, implementing a CSS fallback, and using dynamic imports for Mapbox to ensure it only loads client-side. Furthermore, backend pin syncing and `flyTo` behavior were restored, and React roots are now properly cleaned up on component unmount.
*   **MapEvidenceCard Fix**: The `MapEvidenceCard` component was updated to replace dynamic Tailwind classes with a more robust lookup map, improving stability and maintainability.
*   **SearchInput Correction**: A missing `cn` import was added to the `SearchInput` component to resolve build issues.
*   **Dashboard CameraFeed**: The dashboard's `CameraFeed` now correctly utilizes the `displayImage` (captured and uploaded) for rendering, ensuring accurate visual feedback.
*   **globals.css Preservation**: Critical `flash` and `pulse-cyan` keyframes from [[PR #4 camera capture]] were explicitly retained in `globals.css`.
*   **Dependency Cleanup**: Several unused packages, including `three`, `@types/three`, and `@googlemaps/js-api-loader`, were removed to reduce bundle size and project complexity.
*   **Build Tool Optimization**: Redundant `autoprefixer` configurations and dead `webpack` configuration entries were removed, along with global Mapbox CSS that was no longer needed.

## Related

[[askNYC — Git Activity]],[[askNYC Cinematic Map Overhaul (feat)]],[[Commit: Fix Merge Conflicts and Critical Issues from PR #5 (askNYC)]],[[askNYC Frontend Backend Integration Update (2026-03-28)]],[[askNYC: Mobile UI Enhancements & Pipeline Fixes]],[[askNYC: UI and Map Navigation Improvements (2026-03-28)]],[[Documentation Update: README and dev.sh Script for askNYC]],[[Build Fixes for askNYC Frontend Merge]],[[Add comprehensive system test with mock data (Career-Datacenter)]]
