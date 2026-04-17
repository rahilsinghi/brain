---
title: "Fix: Strip 'wiki/' Prefix from LanceDB Paths for Embedding Aggregation"
author: ai
created_at: 2026-04-13T18:34:07.935Z
last_ai_edit: 2026-04-13T18:34:07.935Z
last_human_edit: null
last_embedded_hash: 4d6af73e94af16d3
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-fix-graph-strip-wiki-prefix-from-lancedb-paths-in-embedding-3e0d5a.md]]"
tags:
  - fix
  - lancedb
  - embeddings
  - graph
  - brain
  - normalization
  - umap
  - pathing
  - commit
---


# Fix: Strip 'wiki/' Prefix from LanceDB Paths for Embedding Aggregation

This commit addresses a discrepancy in file path storage between LanceDB and the wiki scanning process within the `brain` repository. It ensures consistent node identification by stripping the 'wiki/' prefix during embedding aggregation, enabling the generation of the initial graph cache with 3D UMAP positions.

## Key Concepts

[[LanceDB]],Embedding Aggregation,File Path Normalization,[[UMAP]],Graph Cache,Node ID Consistency

## Details

This commit, identified by SHA `c8f43c9` and authored by [[Rahil Singhi]] on April 10, 2026, resolves a pathing inconsistency in the `[[brain]]` repository. While `LanceDB` stores `filePaths` with a `wiki/` prefix (e.g., `wiki/category/slug.md`), the `scan-wiki` process uses `category/slug.md` as node IDs. To reconcile this, the `aggregateEmbeddings()` function was updated to normalize paths by stripping the `wiki/` prefix.

This fix was crucial for the successful generation of the first graph cache, which now includes 315 nodes with [[UMAP]]-computed 3D positions.

The change involved modifications to 2 files, adding 5 lines and deleting 2 lines of code. This commit was co-authored by `Claude Opus 4.6 (1M context)`.

## Related

[[Brain Project: Wiki Article Compilation and Embedding Enhancement]],[[Brain Vault Structure and Project Configuration Scaffold]],[[Brain-Explorer: Force Simulation & Node Dragging Design Specification]],[[Brain-Explorer Force Simulation Tuning (354 Nodes)]],[[Brain-Explorer Graph Data Update (354 Nodes, 239 Edges)]],[[Brain-Explorer: InstancedMesh Rendering for Nodes]]
