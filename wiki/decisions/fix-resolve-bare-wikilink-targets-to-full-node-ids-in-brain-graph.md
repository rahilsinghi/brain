---
title: "Fix: Resolve Bare Wikilink Targets to Full Node IDs in Brain Graph"
author: ai
created_at: 2026-04-12T17:08:28.606Z
last_ai_edit: 2026-04-12T17:08:28.606Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-fix-graph-resolve-bare-wikilink-targets-to-full-node-ids-6a8deb.md]]"
tags:
  - bugfix
  - graph
  - wikilink
  - nodeids
  - normalization
  - brainproject
  - claude
---

# Fix: Resolve Bare Wikilink Targets to Full Node IDs in Brain Graph

This commit addresses a critical bug in the `rahilsinghi/brain` graph processing that caused bare wikilink targets (e.g., `proj-karen.md`) to be incorrectly normalized. The fix ensures that these targets are resolved to their full, correct node IDs (e.g., `projects/proj-karen.md`) by building a comprehensive filename-to-ID lookup before target resolution and deduplication, preventing empty link arrays.

## Key Concepts

Wikilink Resolution,Node IDs,Graph Processing,Filename-to-ID Lookup,Data Normalization

## Details

The `normalizeTarget` function within the `rahilsinghi/brain` project was previously producing incorrect output for wikilink targets, specifically yielding bare filenames like `proj-karen.md`. However, the actual `node IDs` in the system are structured with their full path, such as `projects/proj-karen.md`.

This discrepancy led to a bug where the system failed to correctly identify and link related nodes, often resulting in empty link arrays. The resolution involved a two-step approach:

1.  **Post-Scan Lookup Build**: The filename-to-ID lookup table is now built *after* all nodes have been scanned and their full IDs are available. This ensures the lookup is comprehensive and accurate.
2.  **Pre-Deduplication Resolution**: Wikilink targets are now resolved to their full node IDs *before* any deduplication process occurs. This prevents the system from incorrectly discarding what it perceives as duplicate or unresolved links due to the mismatched target format.

This fix ensures that all wikilinks correctly point to their intended graph nodes, maintaining the integrity and navigability of the `Brain` graph.

## Related

[[brain — Git Activity]],[[Brain Explorer Update: Wikilink Rendering, Palette Filtering, and Code Cleanup]],[[Brain Explorer: Deep-Linking & Wikilink Navigation Feature]],[[Brain Explorer: Spec Compliance - Wikilink Rendering, Palette Filters, and Code Cleanup]],[[Brain-Explorer Graph Data Update (354 Nodes, 239 Edges)]],[[Karen Project]],[[CLAUDE Project Documentation Update]]
