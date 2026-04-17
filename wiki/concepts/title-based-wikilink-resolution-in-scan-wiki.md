---
title: Title-Based Wikilink Resolution in `scan-wiki`
author: ai
created_at: 2026-04-13T18:16:33.342Z
last_ai_edit: 2026-04-13T18:16:33.342Z
last_human_edit: null
last_embedded_hash: e448a92379dff659
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-graph-title-based-wikilink-resolution-in-scan-wiki-a0780d.md]]"
tags:
  - wikilink
  - resolution
  - scan-wiki
  - brain
  - graph
  - id mapping
  - case-insensitive
  - title
  - slug
  - feature
---


# Title-Based Wikilink Resolution in `scan-wiki`

This feature enhances the `scan-wiki` utility within the [[Brain Project]] by implementing a robust, title-based wikilink resolution mechanism. It uses `titleToId` and `slugToId` maps to enable case-insensitive lookup, ensuring that wikilinks can be resolved even if the exact file path or filename is not provided. The resolution process follows a defined hierarchy, with duplicate titles handled by a first-match-wins strategy.

## Key Concepts

[[Wikilink Resolution]],`scan-wiki` utility,`titleToId` map,`slugToId` map,Case-insensitive resolution,Resolution Chain,[[Brain Project]]

## Details

The `feat(graph): title-based wikilink resolution in scan-wiki` commit (SHA: `9e54274`) introduces a significant improvement to how wikilinks are resolved within the [[Brain Project]]'s `scan-wiki` utility. Previously, wikilink resolution might have been more reliant on exact file paths or filenames, leading to fragility.

This enhancement addresses that by adding two new internal data structures: `titleToId` and `slugToId` maps. These maps facilitate case-insensitive resolution of article IDs based on their titles and slugs, respectively. This means that a wikilink like `[[My Article]]` can now successfully resolve to `my-article.md` even if the casing doesn't perfectly match.

The resolution process follows a strict hierarchy:
1.  **Exact Path:** Attempts to resolve the wikilink using its full, explicit path.
2.  **Filename:** If the exact path fails, it tries to resolve using the filename component of the wikilink.
3.  **Title:** Next, it consults the `titleToId` map for a case-insensitive match on the article's title.
4.  **Slug:** If a title match isn't found, it falls back to the `slugToId` map for a case-insensitive match on the article's slug.
5.  **Drop:** If none of the above yield a match, the wikilink is considered unresolvable or 'dropped'.

For scenarios where multiple articles might share the same title (or result in the same slug), the system implements a "first-match-wins" policy. This ensures determinism, albeit potentially requiring content creators to maintain unique titles for optimal wikilink behavior.

This change improves the robustness and user-friendliness of wikilink creation and maintenance, making the [[Brain Project]] more adaptable to varying input styles.

## Related

[[Brain Project]],[[Brain Explorer Completion: Deep-Linking and Wikilink Navigation]],[[Brain Explorer: Deep-Linking & Wikilink Navigation Feature]],[[Brain Explorer: Wikilink Rendering, Palette Filtering, and Code Cleanup]],[[Wikilink Resolution]],[[Case-Insensitive Resolution]],[[titleToId map]],[[slugToId map]]
