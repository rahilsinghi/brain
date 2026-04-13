---
title: askNYC Cinematic Map Overhaul (feat)
author: ai
created_at: 2026-04-13T16:11:32.296Z
last_ai_edit: 2026-04-13T16:11:32.296Z
last_human_edit: null
last_embedded_hash: 52dab309be14c7b9
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-cinematic-map-overhaul-with-fixes-5-fe643b.md]]"
tags:
  - asknyc
  - map
  - cinematic
  - ui
  - frontend
  - bugfix
  - refactor
  - dependency
  - minimap
  - mapbox
  - tailwind
  - merge conflict
---


# askNYC Cinematic Map Overhaul (feat)

This commit introduces a cinematic map overhaul for the askNYC project, integrating landmark glows and addressing several issues. It includes fixes for the MiniMap, styling for MapEvidenceCard, and removal of unused dependencies. The update also resolves merge conflicts from previous pull requests, enhancing both visual appeal and system stability.

## Key Concepts

Cinematic Map Overhaul,Landmark Glow,MiniMap Enhancements,Dependency Management,Merge Conflict Resolution,Frontend UI Improvements

## Details

This commit, identified by SHA `9afa7d7` and authored by Rahil Singhi on March 28, 2026, implements a significant visual and functional overhaul of the map component within the [[askNYC]] project. The changes are derived from merging "PR #5 cinematic map + landmark glow with fixes" and address several technical debts and improvements.

Key changes and fixes include:
*   **Cinematic Map and Landmark Glow**: Integration of a cinematic map experience with glowing landmarks, significantly enhancing the visual appeal and user interaction within the application, particularly relevant to [[askNYC: 3D Map-Dominant Dashboard UI Redesign]].
*   **MiniMap Enhancements**: The MiniMap component received several stability and performance improvements:
    *   Implementation of a `MAPBOX_TOKEN` guard to ensure secure and proper initialization.
    *   Dynamic import of the MiniMap component, optimizing load times and resource utilization.
    *   Synchronization of pins with the backend, ensuring data consistency across the application.
*   **MapEvidenceCard Styling**: The `MapEvidenceCard` component's styling has been refactored to use static Tailwind classes, eliminating dynamic interpolation for improved performance and maintainability.
*   **Dependency Cleanup**: Unused dependencies, specifically `three` (likely Three.js) and `@googlemaps/js-api-loader`, were removed, streamlining the project and reducing bundle size.
*   **Merge Conflict Resolution**: This commit successfully resolves merge conflicts arising from the integration of "PR #5 cinematic map + landmark glow" with "PR #4 camera capture." This ensures a stable and coherent codebase, following up on efforts described in [[askNYC: Merge Conflict Resolution and Critical Frontend Fixes (PR #5)]] and integrating features from [[askNYC: Remote Image Capture and Dashboard Integration (PR #4)]].

Overall, the commit involved changes across 20 files, with +1042 additions and -673 deletions, indicating a substantial update to the map-related components.

## Related

[[askNYC]],[[askNYC: Merge Conflict Resolution and Critical Frontend Fixes (PR #5)]],[[askNYC: Remote Image Capture and Dashboard Integration (PR #4)]],[[askNYC: 3D Map-Dominant Dashboard UI Redesign]]
