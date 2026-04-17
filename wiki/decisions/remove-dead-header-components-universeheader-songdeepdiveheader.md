---
title: Remove Dead Header Components (UniverseHeader, SongDeepDiveHeader)
author: ai
created_at: 2026-04-12T18:25:40.928Z
last_ai_edit: 2026-04-12T18:25:40.928Z
last_human_edit: null
last_embedded_hash: 3dfc535db3da9a42
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-chore-remove-dead-header-components-replaced-by-appheader-2c2ce8.md]]"
tags:
  - chore
  - commit
  - refactoring
  - frontend
  - component
  - cleanup
---


# Remove Dead Header Components (UniverseHeader, SongDeepDiveHeader)

This commit, part of the `raag` project, removes the `UniverseHeader` and `SongDeepDiveHeader` components as they have been replaced by a single, unified `AppHeader` component across all pages.

## Key Concepts

[[AppHeader]],[[UniverseHeader]],[[SongDeepDiveHeader]],Component Refactoring,Code Cleanup

## Details

This commit (`695ed43`) to the [[raag]] repository, authored by Rahil Singhi on 2026-03-15, involved removing two outdated header components: `UniverseHeader` and `SongDeepDiveHeader`. These components were no longer imported or used, as all pages within the application now utilize a centralized and unified `AppHeader` component. This change contributes to code simplification and maintainability by consolidating header logic into a single point.

## Related

[[raag]]
