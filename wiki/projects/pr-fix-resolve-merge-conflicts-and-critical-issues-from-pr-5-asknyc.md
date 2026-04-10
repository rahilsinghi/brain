---
title: "PR Fix: Resolve Merge Conflicts and Critical Issues from PR #5 (askNYC)"
author: ai
created_at: 2026-04-10T02:50:07.255Z
last_ai_edit: 2026-04-10T02:50:07.255Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-resolve-merge-conflicts-and-fix-critical-issues-from-pr-c37d62.md]]"
tags:
  - asknyc
  - bug-fix
  - merge-conflict
  - mapbox
  - minimap
  - tailwind
  - ssr
  - next.js
  - react
  - dependency-cleanup
  - camera
  - dashboard
  - css
  - typescript
---

# PR Fix: Resolve Merge Conflicts and Critical Issues from PR #5 (askNYC)

This commit (SHA: 7d6957e) by Rahil Singhi resolves merge conflicts introduced when integrating PR #4's camera capture feature into the cinematic map branch of the askNYC project. It addresses a range of critical bugs across MiniMap, MapEvidenceCard, SearchInput, and the dashboard, while also removing unused dependencies and cleaning up dead configuration. The changes span 18 files with 669 additions and 312 deletions.

## Key Concepts

- **Merge Conflict Resolution**: Integrating PR #4 (camera capture) changes into the cinematic map branch
- **MiniMap Fixes**: Added MAPBOX_TOKEN guard, CSS fallback, dynamic import to prevent SSR breakage, restored backend pin syncing and flyTo behavior, and cleaned up React roots on unmount
- **MapEvidenceCard Fix**: Replaced dynamic Tailwind CSS classes with a static lookup map to ensure reliable class resolution
- **SearchInput Fix**: Added the missing `cn` utility import
- **Dashboard Fix**: Updated CameraFeed to use `displayImage` for both captured and uploaded images
- **CSS Fix**: Preserved `flash` and `pulse-cyan` keyframe animations from PR #4 in globals.css
- **Dependency Cleanup**: Removed unused packages (`three`, `@types/three`, `@googlemaps/js-api-loader`) and dead config (redundant autoprefixer, webpack config, global mapbox CSS)

## Details

## Overview

This fix commit targets the `askNYC` repository (authored by Rahil Singhi) and resolves a series of critical issues that emerged after merging PR #4 (camera capture functionality) into the cinematic map branch.

---

## Changes by Component

### MiniMap
- Added a `MAPBOX_TOKEN` guard to prevent errors when the token is absent
- Implemented a CSS fallback for cases where Mapbox styles fail to load
- Converted the MiniMap import to a **dynamic import** to prevent **Server-Side Rendering (SSR) breakage**
- Restored **backend pin syncing** and **flyTo behavior** that were lost during the merge
- Added cleanup logic to properly destroy React roots on component unmount, preventing memory leaks

### MapEvidenceCard
- Replaced dynamically constructed Tailwind CSS class strings with a **static lookup map**
- This fix ensures Tailwind's class purging does not strip out classes that were previously generated at runtime

### SearchInput
- Added the missing `cn` import (likely a `classnames` or `clsx` utility wrapper), which was causing runtime errors

### Dashboard
- Updated the `CameraFeed` component to use `displayImage`, which correctly handles both camera-captured images and uploaded images

### globals.css
- Retained the `flash` and `pulse-cyan` CSS keyframe animations introduced in PR #4, which had been accidentally removed or overwritten during the merge

---

## Dependency and Configuration Cleanup

| Removed Item | Reason |
|---|---|
| `three` | Unused 3D library |
| `@types/three` | Type definitions for unused `three` package |
| `@googlemaps/js-api-loader` | Unused Google Maps loader |
| Redundant `autoprefixer` config | Duplicate/dead configuration |
| Dead `webpack.config` | No longer needed |
| Global Mapbox CSS import | Replaced by scoped or dynamic loading |

---

## Stats
- **Files Changed:** 18
- **Additions:** +669
- **Deletions:** -312
- **Net Change:** +357 lines

## Related

- [[askNYC Project]]
- [[PR #4 Camera Capture Feature]]
- [[Cinematic Map Branch]]
- [[MiniMap Component]]
- [[MapEvidenceCard Component]]
- [[Mapbox Integration]]
- [[Next.js SSR Dynamic Imports]]
- [[Tailwind CSS Class Purging]]
- [[React Root Cleanup and Memory Management]]
- [[Dependency Management]]
