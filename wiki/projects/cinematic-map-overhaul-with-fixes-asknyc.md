---
title: Cinematic Map Overhaul with Fixes (askNYC)
author: ai
created_at: 2026-04-12T18:03:23.938Z
last_ai_edit: 2026-04-12T18:03:23.938Z
last_human_edit: null
last_embedded_hash: 0d331a7c0d514601
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-cinematic-map-overhaul-with-fixes-5-fe643b.md]]"
tags:
  - asknyc
  - map
  - cinematic
  - minimap
  - mapbox
  - tailwind
  - frontend
  - bugfix
  - optimization
  - "pr #5"
---


# Cinematic Map Overhaul with Fixes (askNYC)

This commit integrates a cinematic map overhaul with landmark glow into the askNYC project, resolving several critical issues. Key improvements include enhanced MiniMap functionality, optimized styling, removal of unused dependencies, and resolution of merge conflicts.

## Key Concepts

Cinematic Map,Landmark Glow,MiniMap,Mapbox Token Guard,Dynamic Import,Backend Pin Sync,Tailwind CSS,Dependency Removal,Merge Conflict Resolution

## Details

This update integrates the cinematic map overhaul and landmark glow feature into the [[askNYC]] project, stemming from pull request #5. It includes several important fixes and optimizations:

*   **MiniMap Enhancements**: Implemented a `MAPBOX_TOKEN` guard to ensure secure API access, enabled dynamic import for the MiniMap component, and synchronized backend pin data for accurate display.
*   **MapEvidenceCard Styling**: Updated the `MapEvidenceCard` to use static Tailwind classes, eliminating dynamic interpolation for improved performance and maintainability.
*   **Dependency Cleanup**: Removed unused dependencies, specifically `three` and `@googlemaps/js-api-loader`, streamlining the project and reducing bundle size.
*   **Merge Conflict Resolution**: Successfully resolved merge conflicts that arose with pull request #4, which focused on [[askNYC: Remote Image Capture and Dashboard Integration (PR #4)]].

**Commit Details:**
*   **Repo:** rahilsinghi/askNYC
*   **SHA:** 9afa7d7
*   **Date:** 2026-03-28T14:04:36Z
*   **Author:** Rahil Singhi
*   **Files changed:** 20
*   **Additions:** +1042
*   **Deletions:** -673

## Related

[[askNYC: Cinematic Map Overhaul (feat)]],[[Cinematic Map Overhaul and Fixes (PR #5)]],[[Cinematic Map Overhaul with Fixes (askNYC)]],[[askNYC: Remote Image Capture and Dashboard Integration (PR #4)]],[[askNYC Backend and Frontend Deployment to Cloud Run]],[[askNYC]],[[askNYC: 3D Map-Dominant Dashboard UI Redesign (Pull Request #7)]]
