---
title: "Cinematic Map Overhaul and Fixes (PR #5)"
author: ai
created_at: 2026-04-10T15:18:42.016Z
last_ai_edit: 2026-04-10T15:18:42.016Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-cinematic-map-overhaul-with-fixes-5-fe643b.md]]"
tags:
  - map
  - cinematic
  - mapbox
  - tailwind
  - optimization
  - dependency management
  - frontend
  - feature
  - pr5
  - bugfix
---

# Cinematic Map Overhaul and Fixes (PR #5)

This commit introduces a significant overhaul of the map component for the `askNYC` project, incorporating cinematic map features and landmark glows. It includes critical fixes and performance improvements, such as dynamic imports for the MiniMap and refactoring of `MapEvidenceCard`'s styling. Unused dependencies were also removed, and merge conflicts with a previous camera capture PR were resolved.

## Key Concepts

Minimap enhancements,Dynamic module imports,Backend synchronization,Tailwind CSS best practices,Dependency management,Merge conflict resolution,Cinematic mapping,Landmark glow effect

## Details

This commit (`9afa7d7`) by Rahil Singhi on 2026-03-28 at `rahilsinghi/askNYC` represents a substantial update to the application's mapping capabilities. It integrates the features proposed in Pull Request #5, focusing on a more dynamic and visually appealing cinematic map experience, alongside various bug fixes and optimizations.

**Key Changes and Improvements:**

*   **MiniMap Enhancements:**
    *   Implemented a `MAPBOX_TOKEN` guard to ensure the Mapbox token is properly handled, improving security and robustness.
    *   Introduced dynamic imports for the MiniMap component, optimizing the application's initial load time by only loading the map resources when needed.
    *   Ensured backend pin synchronization, allowing map pins to accurately reflect data stored on the backend.

*   **MapEvidenceCard Refinement:**
    *   Refactored `MapEvidenceCard` to use static Tailwind CSS classes exclusively. This change avoids dynamic interpolation for styling, which can lead to performance issues or incorrect rendering in certain scenarios.

*   **Dependency Optimization:**
    *   Removed two unused dependencies: `three` and `@googlemaps/js-api-loader`. This significantly reduces the overall bundle size of the application, leading to faster downloads and better performance.

*   **Conflict Resolution:**
    *   Successfully resolved merge conflicts that arose due to simultaneous work on [[PR #4 camera capture]], ensuring a smooth integration of both features.

## Related

[[PR #4 camera capture]],[[Rahil Singhi]],[[askNYC]]
