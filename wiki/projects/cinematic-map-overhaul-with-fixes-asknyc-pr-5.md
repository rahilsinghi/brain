---
title: "Cinematic Map Overhaul with Fixes (askNYC PR #5)"
author: ai
created_at: 2026-04-12T22:04:19.973Z
last_ai_edit: 2026-04-12T22:04:19.973Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-cinematic-map-overhaul-with-fixes-5-fe643b.md]]"
tags:
  - asknyc
  - frontend
  - map
  - bugfix
  - feature
  - merge
  - mapbox
  - tailwind
  - dependency cleanup
  - pull request
---

# Cinematic Map Overhaul with Fixes (askNYC PR #5)

This commit merges Pull Request #5, introducing a cinematic map overhaul with landmark glow and several critical fixes for the askNYC project. Key improvements include safeguarding the MiniMap with `MAPBOX_TOKEN`, dynamically importing map components, and ensuring backend pin synchronization.

## Key Concepts

MiniMap,MapEvidenceCard,Dynamic Import,Backend Pin Synchronization,Tailwind CSS,Merge Conflicts,Mapbox Token

## Details

This commit, with SHA `9afa7d7` by Rahil Singhi on 2026-03-28, merges Pull Request #5 into the `rahilsinghi/askNYC` repository. The PR primarily focuses on a cinematic map overhaul, enhancing the visual presentation with landmark glow effects. Alongside this feature, several critical fixes and optimizations were implemented:

*   **MiniMap Enhancements**: The MiniMap component now includes a `MAPBOX_TOKEN` guard to prevent rendering issues without proper authentication. It also utilizes dynamic imports to improve loading performance and ensures synchronization of pins with the backend.
*   **MapEvidenceCard**: Tailwind CSS classes for the `MapEvidenceCard` were standardized to static classes, avoiding dynamic interpolation issues and improving stability.
*   **Dependency Cleanup**: Unused dependencies such as `three` and `@googlemaps/js-api-loader` were removed, reducing the project's footprint and potential conflicts.
*   **Merge Conflict Resolution**: The commit successfully resolves merge conflicts that arose with a previous Pull Request #4, which involved camera capture functionalities.

In total, this commit involved changes across 20 files, with +1042 additions and -673 deletions, indicating a substantial update to the codebase.

## Related

[[askNYC — Git Activity]],[[askNYC Cinematic Map Overhaul (feat)]],[[Cinematic Map Overhaul and Fixes (PR #5)]],[[askNYC: Remote Image Capture and Dashboard Integration (PR #4)]],[[MAPBOX_TOKEN]],[[Tailwind CSS]],[[MiniMap]],[[MapEvidenceCard]],[[Backend Pin Synchronization]],[[Dynamic Import]],[[Merge Conflicts]]
