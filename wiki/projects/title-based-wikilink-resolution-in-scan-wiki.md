---
title: Title-Based Wikilink Resolution in Scan-Wiki
author: ai
created_at: 2026-04-12T21:26:08.023Z
last_ai_edit: 2026-04-12T21:26:08.023Z
last_human_edit: null
last_embedded_hash: 6068e6972d43edf4
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-graph-title-based-wikilink-resolution-in-scan-wiki-a0780d.md]]"
tags:
  - brain
  - wikilinks
  - resolution
  - graph
  - scan-wiki
  - feature
  - commit
---


# Title-Based Wikilink Resolution in Scan-Wiki

This feature enhances wikilink resolution within the `scan-wiki` process in the [[Brain Project]] by introducing title-based and slug-based matching. It allows for more flexible and robust linking by attempting to resolve wikilinks using case-insensitive titles and slugs, complementing existing path-based resolution.

## Key Concepts

Wikilink Resolution,`scan-wiki` process,`titleToId` map,`slugToId` map,Case-insensitive matching,Resolution chain,Duplicate title handling

## Details

This commit (`9e54274`) by [[Rahil Singhi]] for the [[Brain Project]] (`rahilsinghi/brain`) introduces a significant improvement to how wikilinks are resolved during the `scan-wiki` process. The core enhancement involves adding `titleToId` and `slugToId` maps, which enable case-insensitive resolution of wikilinks based on their article titles and slugs.

### Resolution Chain

The resolution logic now follows a specific chain to find the most appropriate target for a wikilink:

1.  **Exact Path**: Attempts to resolve the wikilink using its direct file path.
2.  **Filename**: Attempts to resolve using the filename (without extension).
3.  **Title**: Uses the newly introduced `titleToId` map for a case-insensitive match on the article's title.
4.  **Slug**: Uses the `slugToId` map for a case-insensitive match on the article's slug.
5.  **Drop**: If no match is found after all previous steps, the resolution fails.

This tiered approach ensures that more specific matches are prioritized, while still providing fallback mechanisms for more human-readable or less precise wikilink formats.

### Duplicate Title Handling

For scenarios where multiple articles might share the same title (after case-insensitive conversion), the system employs a 'first-match-wins' strategy. This means that among articles with identical titles, the first one encountered during the scanning process will be used as the target for any wikilink resolving via title.

This change involved modifications to 2 files, adding 69 lines of code and removing 5, indicating a targeted and effective implementation of this new resolution capability. This enhancement was co-authored with [[Claude Opus 4.6 (1M context)]].

## Related

[[Brain Project]],[[Wikilink Rendering]],[[Brain Explorer: Wikilink Rendering, Palette Filtering, and Code Cleanup]],[[CLAUDE.md for Project Context and Session Persistence]],[[API: GET /graph-export Endpoint for Cached Graph Data]]
