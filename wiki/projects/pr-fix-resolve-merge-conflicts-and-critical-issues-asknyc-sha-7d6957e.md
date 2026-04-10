---
title: "PR Fix: Resolve Merge Conflicts and Critical Issues (askNYC, SHA 7d6957e)"
author: ai
created_at: 2026-04-10T02:52:42.115Z
last_ai_edit: 2026-04-10T02:52:42.115Z
last_human_edit: null
last_embedded_hash: c8b3f840e54b7ac5
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-resolve-merge-conflicts-and-fix-critical-issues-from-pr-c37d62.md]]"
tags:
  - asknyc
  - bug-fix
  - merge-conflict
  - mapbox
  - minimap
  - react
  - nextjs
  - ssr
  - tailwind
  - dependency-cleanup
  - camera-capture
  - frontend
  - refactor
---


# PR Fix: Resolve Merge Conflicts and Critical Issues (askNYC, SHA 7d6957e)

This commit resolves merge conflicts and addresses critical bugs introduced when merging the camera capture branch (PR #4) into the cinematic map branch of the askNYC project. Key fixes span MiniMap stability, MapEvidenceCard dynamic class handling, SearchInput imports, and dashboard image rendering. The change also performs housekeeping by removing unused dependencies and redundant configuration.

## Key Concepts

- **Merge Conflict Resolution**: Integrating changes from the main branch (PR #4 camera capture) into the cinematic map branch
- **MiniMap Stability**: Adding MAPBOX_TOKEN guard, CSS fallback, dynamic import to prevent SSR breakage, restoring backend pin syncing and flyTo behavior, and cleaning up React roots on unmount
- **Dynamic Tailwind Class Fix**: Replacing dynamic Tailwind class generation in MapEvidenceCard with a static lookup map to ensure proper class resolution
- **Missing Import Fix**: Restoring the `cn` utility import in SearchInput component
- **Dashboard Image Handling**: Using `displayImage` (supporting both captured and uploaded images) for the CameraFeed component
- **CSS Keyframe Preservation**: Retaining `flash` and `pulse-cyan` keyframes from PR #4 in globals.css
- **Dependency Cleanup**: Removing unused packages (`three`, `@types/three`, `@googlemaps/js-api-loader`) and redundant tooling (autoprefixer, dead webpack config, global mapbox CSS)

## Details

## Overview

**Repository:** rahilsinghi/askNYC  
**Commit SHA:** 7d6957e  
**Date:** 2026-03-28T14:04:25Z  
**Author:** Rahil Singhi  
**Files Changed:** 18  
**Additions:** +669  
**Deletions:** -312  

---

## Context

This commit merges the main branch — which included the camera capture feature from PR #4 — into the cinematic map feature branch. The integration surfaced several critical bugs and configuration conflicts that are addressed in this fix commit.

---

## Changes by Area

### MiniMap Component
- Added a `MAPBOX_TOKEN` environment variable guard to prevent runtime errors when the token is absent
- Implemented a CSS fallback for cases where Mapbox fails to initialize
- Switched to dynamic import to avoid Server-Side Rendering (SSR) breakage
- Restored backend pin syncing and `flyTo` behavior that was lost during the merge
- Added cleanup logic to properly unmount React roots on component unmount, preventing memory leaks

### MapEvidenceCard Component
- Replaced dynamically constructed Tailwind CSS class strings with a static lookup map
- This fix ensures Tailwind's purge/JIT compiler can statically analyze and include all required classes, preventing missing styles in production

### SearchInput Component
- Added the missing `cn` utility import (a classname merging helper, typically from `clsx`/`tailwind-merge`)
- This fix resolves a runtime error caused by an undefined reference to `cn`

### Dashboard
- Updated the CameraFeed component to use `displayImage`, which correctly handles both camera-captured images and user-uploaded images
- Previously, only one image source type was supported, causing display issues with the other

### globals.css
- Preserved the `flash` and `pulse-cyan` CSS keyframe animations introduced in PR #4
- These were at risk of being overwritten or removed during the merge conflict resolution

---

## Dependency and Configuration Cleanup

| Removed Item | Reason |
|---|---|
| `three` | Unused 3D library package |
| `@types/three` | Type definitions for unused `three` package |
| `@googlemaps/js-api-loader` | Unused Google Maps loader, superseded by Mapbox |
| `autoprefixer` (redundant) | Duplicate or unnecessary postcss plugin entry |
| Dead webpack config | Stale configuration file no longer in use |
| Global mapbox CSS import | Redundant global CSS import for Mapbox |

---

## Impact

- Resolves SSR compatibility issues with the MiniMap
- Eliminates runtime errors in SearchInput and MapEvidenceCard
- Reduces bundle size by removing unused three.js and Google Maps dependencies
- Improves code cleanliness and build configuration hygiene

## Related

- [[askNYC Project]]
- [[PR #4 Camera Capture Feature]]
- [[Cinematic Map Feature Branch]]
- [[MiniMap Component]]
- [[MapEvidenceCard Component]]
- [[Mapbox Integration]]
- [[Next.js SSR Dynamic Imports]]
- [[Tailwind CSS JIT and Dynamic Classes]]
- [[React Root Cleanup and Memory Leaks]]
- [[Dependency Management and Bundle Optimization]]
