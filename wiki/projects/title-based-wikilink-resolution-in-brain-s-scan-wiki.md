---
title: Title-Based Wikilink Resolution in Brain's Scan-Wiki
author: ai
created_at: 2026-04-11T00:17:02.274Z
last_ai_edit: 2026-04-11T00:17:02.274Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-graph-title-based-wikilink-resolution-in-scan-wiki-a0780d.md]]"
tags:
  - graph
  - wikilinks
  - brain
  - content processing
  - linking
  - resolution
  - development
  - claude
  - commit
---

# Title-Based Wikilink Resolution in Brain's Scan-Wiki

This commit enhances the `scan-wiki` process in the `rahilsinghi/brain` repository by introducing title-based wikilink resolution. It adds `titleToId` and `slugToId` maps for case-insensitive matching, following a specific resolution chain to handle links to wiki articles.

## Key Concepts

[[Wikilink Resolution]],[[rahilsinghi/brain]],[[Graph Database]],[[Case-Insensitive Matching]],[[Title-to-ID Mapping]],[[Slug-to-ID Mapping]],[[Content Processing]]

## Details

The `rahilsinghi/brain` project's `scan-wiki` process now includes advanced wikilink resolution capabilities. This feature, introduced in commit `9e54274` on `2026-04-10` by Rahil Singhi (co-authored by Claude Opus 4.6), specifically adds `titleToId` and `slugToId` maps. These maps facilitate case-insensitive resolution of wikilinks.

The resolution chain is prioritized as follows:
1.  **Exact Path**: Attempts to match the wikilink directly to an existing file path.
2.  **Filename**: If path fails, it tries to match the wikilink to a filename.
3.  **Title**: Utilizes the newly introduced `titleToId` map for case-insensitive title matching.
4.  **Slug**: Falls back to the `slugToId` map for case-insensitive slug matching.
5.  **Drop**: If no match is found through the preceding steps, the link resolution fails.

Duplicate titles are handled by a "first-match-wins" principle, ensuring deterministic resolution in cases where multiple articles might share the same title or slug. This enhancement improves the robustness and user-friendliness of wikilink management within the brain repository.

## Related

[[Brain Explorer Update: Wikilink Rendering, Palette Filtering, and Code Cleanup]],[[Brain Repository: Unstructured Content Copier with Frontmatter Injection]],[[Chokidar File Watcher in Parse-Then-Compile Pipeline (rahilsinghi/brain)]],[[Compile Queue with Token Guard Routing, Quarantine, and Index Updates]],[[CLAUDE.md for Project Context and Session Persistence]],[[feat(seed): Wiki Frontmatter Helpers and [[ref:id]] Link Resolution]]
