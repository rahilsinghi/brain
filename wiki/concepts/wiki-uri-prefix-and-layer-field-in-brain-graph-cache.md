---
title: Wiki URI Prefix and Layer Field in Brain Graph Cache
author: ai
created_at: 2026-04-13T18:20:38.852Z
last_ai_edit: 2026-04-13T18:20:38.852Z
last_human_edit: null
last_embedded_hash: 7dfb3f67de4a49d7
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-graph-apply-wiki-uri-prefix-and-layer-field-at-cache-a9f3f3.md]]"
tags:
  - brain
  - graph
  - cache
  - wiki
  - uri
  - metadata
  - umap
  - rebuildgraphcache
  - deep-linking
---


# Wiki URI Prefix and Layer Field in Brain Graph Cache

This feature introduces a standardized `wiki://` URI prefix and a `layer: 'wiki'` field for all nodes and links within the Brain Project's graph cache. These identifiers are stamped during the `rebuildGraphCache` process, following UMAP generation, to ensure consistent data representation and facilitate deep-linking.

## Key Concepts

`wiki://` URI prefix,Layer field (`layer: 'wiki'`),[[Brain Project]] graph cache,[[UMAP-js for Graph Position Computation]] generation,Nodes and links,`scanWiki()` function,`rebuildGraphCache()` function,Link defaults (relation, confidence, confidence_score)

## Details

The `wiki://` URI prefix and the `layer: 'wiki'` field are applied to all nodes and links within the [[Brain Project]]'s graph cache. This standardization occurs during the `rebuildGraphCache` process, specifically after [[UMAP-js for Graph Position Computation]] generation. While the internal `scanWiki()` function operates using path-based identifiers, the `rebuildGraphCache` step is responsible for stamping these canonical URI prefixes and layer metadata.

In addition to the URI prefix and layer field, default link attributes such as `relation`, `confidence`, and `confidence_score` are also established at this stage. This ensures a consistent and enriched data structure for graph elements, aiding in features like deep-linking and structured graph navigation.

## Related

[[Brain Project]],[[UMAP-js for Graph Position Computation]],[[API: POST /graph-push Endpoint for Graph Cache Rebuild and Explorer Update]],[[Brain Explorer: Deep-Linking & Wikilink Navigation Feature]],[[Brain Explorer: Wikilink Rendering, Palette Filtering, and Code Cleanup]],[[Brain Vault Structure and Project Configuration Scaffold]]
