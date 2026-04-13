---
title: "Fix: Resolve Bare Wikilink Targets to Full Node IDs in Brain Graph"
author: ai
created_at: 2026-04-13T18:08:11.519Z
last_ai_edit: 2026-04-13T18:08:11.519Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-fix-graph-resolve-bare-wikilink-targets-to-full-node-ids-6a8deb.md]]"
tags:
  - bugfix
  - graph
  - wikilinks
  - normalization
  - brain-project
  - claude-opus
---

# Fix: Resolve Bare Wikilink Targets to Full Node IDs in Brain Graph

This commit addresses a bug in the `rahilsinghi/brain` repository where bare wikilink targets were not being correctly resolved to their full node IDs, leading to empty links in the generated graph. The fix involves building a comprehensive filename-to-ID lookup after scanning all nodes and then using this lookup to normalize targets before deduplication, ensuring accurate graph connections.

## Key Concepts

Wikilinks,Node IDs,Graph Normalization,Filename-to-ID Lookup,Deduplication,Brain Graph

## Details

This commit (`f909ac1`) for the `rahilsinghi/brain` repository, authored by Rahil Singhi on 2026-04-10T19:18:02Z, with co-authorship from Claude Opus 4.6 (1M context), resolves a critical bug in the graph generation process.

**Problem:**
The `normalizeTarget` function was incorrectly producing bare filenames (e.g., `'proj-karen.md'`) for wikilink targets. However, the system's internal node IDs require a full path format (e.g., `'projects/proj-karen.md'`). This mismatch prevented the graph from correctly linking nodes, resulting in an empty `links` array for affected entries.

**Solution:**
The fix involves a two-step process:
1.  **Build Filename-to-ID Lookup:** After scanning all available nodes, a comprehensive lookup map is constructed to associate bare filenames with their corresponding full node IDs.
2.  **Resolve Targets:** Wikilink targets are now resolved against this filename-to-ID lookup *before* the deduplication process. This ensures that all targets are transformed into their canonical node ID format.

This change, impacting 2 files with 60 additions and 1 deletion, ensures that wikilinks are accurately translated into graph connections, thereby fixing issues with empty links and improving the integrity of the [[Brain Graph]].

## Related

[[Brain Project]],[[Brain Graph Report (2026-04-10)]],[[Brain Repository]],[[Brain Explorer Completion: Deep-Linking and Wikilink Navigation]],[[Brain Explorer Update: Wikilink Rendering, Palette Filtering, and Code Cleanup]],[[Backfill Script for Broken Wikilinks]],[[CLAUDE.md]]
