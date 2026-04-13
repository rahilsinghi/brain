---
title: "Fix: Strip 'wiki/' Prefix from LanceDB Paths for Embedding Aggregation"
author: ai
created_at: 2026-04-12T17:53:07.593Z
last_ai_edit: 2026-04-12T17:53:07.593Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-fix-graph-strip-wiki-prefix-from-lancedb-paths-in-embedding-3e0d5a.md]]"
tags:
  - fix
  - graph
  - lancedb
  - embeddings
  - brainproject
  - filepaths
  - normalization
  - knowledgegraph
  - umap
---

# Fix: Strip 'wiki/' Prefix from LanceDB Paths for Embedding Aggregation

This fix addresses an inconsistency where LanceDB stored file paths with a 'wiki/' prefix, while the `scan-wiki` process used paths without it for node IDs. The `aggregateEmbeddings()` function was updated to normalize these paths, enabling correct embedding aggregation and subsequent graph cache generation.

## Key Concepts

[[LanceDB]],[[Embedding Aggregation]],[[Graph Cache]],[[UMAP]],File Path Normalization,Node ID

## Details

A critical fix was implemented within the `rahilsinghi/brain` repository to resolve a discrepancy in how file paths were handled by LanceDB and the `scan-wiki` process. LanceDB, used for storing data, saved file paths in the format `wiki/category/slug.md`. However, the `scan-wiki` utility, which generates node IDs for the knowledge graph, expected and used paths in the format `category/slug.md`.

This inconsistency prevented accurate correlation between stored embeddings and their respective graph nodes. To rectify this, the `aggregateEmbeddings()` function was modified to strip the `wiki/` prefix from LanceDB paths, ensuring they matched the node IDs used by `scan-wiki`.

This normalization was crucial for the successful generation of the initial graph cache, which subsequently produced 315 nodes with UMAP 3D positions. The change was introduced in commit `c8f43c9` on 2026-04-10.

## Related

[[rahilsinghi/brain]],[[Brain Project]],[[Brain Graph Report (2026-04-10)]],[[Brain-Explorer: Graph Data Types, Position Normalization, and Neighbor Map]],[[Brain Project Phase 2 Hardening: Partial Embed Safety and Connection Discovery]],[[Compile Queue Enhancements (rahilsinghi/brain)]],[[Compilation and Embedding of Wiki Articles in the Brain Project]]
