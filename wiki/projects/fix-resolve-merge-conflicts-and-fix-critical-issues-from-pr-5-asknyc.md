---
title: "fix: resolve merge conflicts and fix critical issues from PR #5 — askNYC"
author: ai
created_at: 2026-04-10T02:52:44.159Z
last_ai_edit: 2026-04-10T02:52:44.159Z
last_human_edit: null
last_embedded_hash: 16c3cb94f9062378
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-resolve-merge-conflicts-and-fix-critical-issues-from-pr-c37d62.md]]"
tags:
  - bug-fix
  - merge-conflict
  - asknyc
  - mapbox
  - minimap
  - react
  - tailwind-css
  - ssr
  - camera-capture
  - dependency-cleanup
  - next-js
  - frontend
  - typescript
  - css-keyframes
  - webpack
---


# fix: resolve merge conflicts and fix critical issues from PR #5 — askNYC

This commit (SHA: 7d6957e) by Rahil Singhi on March 28, 2026 resolves merge conflicts between the main branch (containing PR #4 camera capture features) and the cinematic map branch in the askNYC repository. It addresses critical bugs across multiple components including MiniMap, MapEvidenceCard, SearchInput, and the dashboard, while also cleaning up unused dependencies and dead configuration files. The patch spans 18 files with 669 additions and 312 deletions.

## Key Concepts

- **Merge Conflict Resolution**: Integrating PR #4 (camera capture) changes from main into the cinematic map branch
- **MiniMap Fixes**: Added MAPBOX_TOKEN guard, CSS fallback, dynamic import to prevent SSR breakage, restored backend pin syncing and flyTo behavior, and cleaned up React roots on unmount
- **MapEvidenceCard Fix**: Replaced dynamic Tailwind CSS classes with a static lookup map to ensure proper class resolution
- **SearchInput Fix**: Added missing `cn` utility import required for className merging
- **Dashboard Fix**: Updated CameraFeed to use `displayImage` for both captured and uploaded images
- **CSS Preservation**: Retained flash and pulse-cyan keyframe animations from PR #4 in globals.css
- **Dependency Cleanup**: Removed unused packages (`three`, `@types/three`, `@googlemaps/js-api-loader`) and dead config artifacts (redundant autoprefixer, webpack config, global Mapbox CSS)

## Details

## Overview

Commit `7d6957e` in the [rahilsinghi/askNYC](https://github.com/rahilsinghi/askNYC) repository represents a critical stabilization patch following the merge of PR #4 into the cinematic map feature branch. Authored by Rahil Singhi, this commit touches 18 files with a net change of +357 lines (+669 additions, -312 deletions).

---

## Component-Level Fixes

### MiniMap
- **MAPBOX_TOKEN Guard**: Added a conditional check to prevent runtime errors when the Mapbox token environment variable is absent.
- **CSS Fallback**: Introduced a fallback style to maintain visual consistency when Mapbox fails to initialize.
- **Dynamic Import (No SSR Breakage)**: Converted the Mapbox import to a dynamic/lazy import, preventing server-side rendering failures in Next.js or similar SSR environments.
- **Backend Pin Syncing Restored**: Re-established the connection between backend data and map pin rendering that was broken during the merge.
- **flyTo Behavior Restored**: Re-enabled the animated camera flyTo functionality for map navigation.
- **React Root Cleanup on Unmount**: Ensured React roots are properly destroyed when the MiniMap component unmounts, preventing memory leaks.

### MapEvidenceCard
- **Dynamic Tailwind Class Replacement**: Tailwind CSS purges classes that are dynamically constructed at runtime. Dynamic class strings (e.g., template literals) were replaced with a static lookup map, ensuring all required classes are included in the final CSS bundle.

### SearchInput
- **Missing `cn` Import**: Added the missing import for the `cn` utility function (commonly a wrapper around `clsx` or `tailwind-merge`) used for conditional class merging.

### Dashboard
- **CameraFeed displayImage Fix**: Updated the dashboard to pass `displayImage` — which unifies both captured camera frames and user-uploaded images — to the CameraFeed component, ensuring consistent image display regardless of source.

---

## Styles

### globals.css
- Preserved `flash` and `pulse-cyan` CSS keyframe animations introduced in PR #4, ensuring camera capture UI feedback animations remain functional after the merge.

---

## Dependency & Configuration Cleanup

| Removed Item | Reason |
|---|---|
| `three` | Unused 3D rendering library |
| `@types/three` | TypeScript types for removed `three` package |
| `@googlemaps/js-api-loader` | Replaced or unused Google Maps loader |
| Redundant `autoprefixer` config | Duplicate/dead configuration |
| Dead webpack config | No longer applicable to the build setup |
| Global Mapbox CSS import | Replaced by scoped or dynamic styles |

Removing these packages reduces bundle size and eliminates potential version conflict risks.

---

## Metadata

| Field | Value |
|---|---|
| Repository | rahilsinghi/askNYC |
| Commit SHA | 7d6957e |
| Date | 2026-03-28T14:04:25Z |
| Author | Rahil Singhi |
| Files Changed | 18 |
| Additions | +669 |
| Deletions | -312 |

## Related

- [[askNYC Project]]
- [[PR #4 Camera Capture Feature]]
- [[Cinematic Map Branch]]
- [[MiniMap Component]]
- [[MapEvidenceCard Component]]
- [[SearchInput Component]]
- [[CameraFeed Component]]
- [[Mapbox Integration]]
- [[Tailwind CSS Dynamic Classes]]
- [[Server-Side Rendering (SSR)]]
- [[React Memory Management]]
- [[Dependency Management]]
- [[Rahil Singhi]]
