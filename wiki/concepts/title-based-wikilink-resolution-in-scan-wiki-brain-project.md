---
title: Title-Based Wikilink Resolution in Scan-Wiki (Brain Project)
author: ai
created_at: 2026-04-13T15:38:24.666Z
last_ai_edit: 2026-04-13T15:38:24.666Z
last_human_edit: null
last_embedded_hash: 38038345fa2eb2cb
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-graph-title-based-wikilink-resolution-in-scan-wiki-a0780d.md]]"
tags:
  - wikilinks
  - knowledge graph
  - brain project
  - resolution
  - scan-wiki
  - title mapping
  - slug mapping
  - case-insensitive
  - feature
---


# Title-Based Wikilink Resolution in Scan-Wiki (Brain Project)

This feature enhances the Brain Project's `scan-wiki` process by introducing a robust, case-insensitive wikilink resolution mechanism. It utilizes `titleToId` and `slugToId` maps to resolve links, following a specific hierarchy of exact path, filename, title, and slug. Duplicate titles are handled by prioritizing the first encountered match.

## Key Concepts

[[Wikilink Resolution]],[[scan-wiki]],[[Knowledge Graph]],Case-Insensitive Matching,titleToId map,slugToId map,Resolution Chain,Duplicate Title Handling

## Details

The commit `9e54274` introduces a significant improvement to the wikilink resolution logic within the `scan-wiki` component of the [[Brain Project]]. Previously, wikilink resolution might have been more rigid, potentially failing if the exact filename wasn't used or if case sensitivity was an issue.

This enhancement addresses these challenges by adding `titleToId` and `slugToId` maps. These maps facilitate case-insensitive resolution, allowing wikilinks to be successfully resolved even if they refer to an article's title or a URL-friendly slug, rather than just its exact file path or filename.

The resolution process now follows a defined chain of priority:
1.  **Exact Path**: The system first attempts to resolve the wikilink using its precise file path.
2.  **Filename**: If an exact path match is not found, it tries to match against the article's filename.
3.  **Title**: Subsequently, it attempts to resolve the link using the article's `title` (case-insensitively, via `titleToId`).
4.  **Slug**: Finally, it tries to match against the article's `slug` (case-insensitively, via `slugToId`).
5.  **Drop**: If no match is found through any of these stages, the resolution fails (the wikilink is 'dropped').

A key aspect of this implementation is its handling of duplicate titles. In cases where multiple articles share the same title, the system employs a "first-match-wins" policy, resolving to the first article found with that title.

This feature significantly increases the robustness and user-friendliness of wikilinks within the knowledge graph, reducing the likelihood of broken links and improving navigation within the [[Brain Explorer]].

*(Co-Authored-By: Claude Opus 4.6 (1M context))*

## Related

[[Brain Project]],[[Brain Explorer: Deep-Linking & Wikilink Navigation Feature]],[[scan-wiki]]
