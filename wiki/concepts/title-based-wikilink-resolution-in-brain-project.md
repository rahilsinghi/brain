---
title: Title-Based Wikilink Resolution in Brain Project
author: ai
created_at: 2026-04-11T00:18:02.560Z
last_ai_edit: 2026-04-11T00:18:02.560Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-graph-title-based-wikilink-resolution-in-scan-wiki-a0780d.md]]"
tags:
  - wikilink
  - resolution
  - brain project
  - graph
  - scan-wiki
  - content processing
  - knowledge graph
  - claude opus
---

# Title-Based Wikilink Resolution in Brain Project

This feature enhances wikilink resolution within the `rahilsinghi/brain` repository's `scan-wiki` process by implementing title-based and slug-based matching. It provides a robust resolution chain that handles case-insensitivity and prioritizes exact matches. The system also addresses duplicate titles by applying a 'first-match-wins' rule.

## Key Concepts

- Wikilink Resolution,- `scan-wiki` Process,- `titleToId` Mapping,- `slugToId` Mapping,- Resolution Chain,- Case-Insensitive Matching,- Duplicate Title Handling

## Details

This enhancement, introduced in the `rahilsinghi/brain` repository (SHA `9e54274`), significantly improves how wikilinks are resolved during the `scan-wiki` operation. It introduces `titleToId` and `slugToId` maps, enabling case-insensitive resolution based on article titles and slugs. The resolution follows a specific chain: an exact path match is attempted first, followed by filename, then title, then slug. If no match is found after these steps, the wikilink is dropped. For instances where multiple articles share the same title or slug, the system employs a 'first-match-wins' strategy to ensure deterministic resolution. This update was co-authored by Claude Opus 4.6.

## Related

[[brain — Git Activity]],[[Brain Explorer: Deep-Linking & Wikilink Navigation Feature]],[[Brain Explorer Update: Wikilink Rendering]],[[Chokidar File Watcher in Parse-Then-Compile Pipeline (rahilsinghi/brain)]],[[Compile Queue Enhancements (rahilsinghi/brain)]],[[Brain Project Content Seeding (d37a02b)]]
