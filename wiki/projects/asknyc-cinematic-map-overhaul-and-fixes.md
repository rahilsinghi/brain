---
title: "askNYC: Cinematic Map Overhaul and Fixes"
author: ai
created_at: 2026-04-13T17:38:31.921Z
last_ai_edit: 2026-04-13T17:38:31.921Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-cinematic-map-overhaul-with-fixes-5-fe643b.md]]"
tags:
  - asknyc
  - frontend
  - map
  - ui
  - refactor
  - mapbox
  - tailwind
  - dependency management
---

# askNYC: Cinematic Map Overhaul and Fixes

This commit introduces a major cinematic map overhaul for the askNYC application, integrating a landmark glow effect and resolving several critical issues. Key updates include dynamic Mapbox token handling and backend pin synchronization for the MiniMap, alongside refactoring of the MapEvidenceCard to use static Tailwind classes. It also addresses merge conflicts and removes unused dependencies to streamline the frontend.

## Key Concepts

Mapbox,Tailwind CSS,Frontend Development,Dependency Management,Merge Conflict Resolution,MiniMap,MapEvidenceCard

## Details

This commit, identified by SHA `9afa7d7` and authored by Rahil Singhi on 2026-03-28T14:04:36Z, represents a significant update to the `rahilsinghi/askNYC` repository. It integrates the changes from Pull Request #5, focusing on a cinematic map overhaul and landmark glow feature, along with various fixes.

Key changes implemented in this commit include:

*   **MiniMap Enhancements**: The MiniMap component now features a `MAPBOX_TOKEN` guard for secure and dynamic loading, along with dynamic imports to optimize performance. Backend pin synchronization ensures that the map accurately reflects data from the server.
*   **MapEvidenceCard Refactoring**: The `MapEvidenceCard` component has been updated to use static Tailwind CSS classes, eliminating dynamic interpolation for improved predictability and performance.
*   **Dependency Cleanup**: Unused dependencies, specifically `three` (Three.js) and `@googlemaps/js-api-loader`, were removed to reduce the project's bundle size and complexity.
*   **Merge Conflict Resolution**: Critical merge conflicts with Pull Request #4, which involved camera capture functionalities, were successfully resolved to ensure a stable integration of new features.

## Related

[[askNYC — Git Activity]],[[askNYC: Merge Conflict Resolution and Critical Frontend Fixes (PR #5)]],[[askNYC: Remote Image Capture and Dashboard Integration (PR #4)]],[[Mapbox]],[[Tailwind CSS]],[[Three.js]],[[Google Maps API]]
