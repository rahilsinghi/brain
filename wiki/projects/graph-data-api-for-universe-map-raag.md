---
title: Graph Data API for Universe Map (raag)
author: ai
created_at: 2026-04-12T21:44:28.278Z
last_ai_edit: 2026-04-12T21:44:28.278Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-graph-data-api-for-universe-map-1fe746.md]]"
tags:
  - api
  - graph
  - data
  - raag
  - cache
  - filtering
  - nodes
  - spotify
  - universe map
---

# Graph Data API for Universe Map (raag)

This commit introduces a new Graph Data API for the raag project, enabling filtered retrieval and refreshing of graph data for a 'Universe Map'. It includes endpoints for fetching graph nodes based on view mode, album, or music collection, and for clearing/recomputing the in-memory cache.

## Key Concepts

`GET /api/graph/data` endpoint,`POST /api/graph/refresh` endpoint,Graph node generation (albums, songs, MCs, features, entities, topics),In-memory cache with 5-minute TTL,Filtering by `view_mode`, `album_id`, `mc`,Trivia/summary text generation for nodes

## Details

A new Graph Data API has been implemented within the [[raag]] repository to support the 'Universe Map' feature. The API provides two primary endpoints:

*   **`GET /api/graph/data`**: This endpoint allows clients to retrieve graph nodes, with filtering capabilities based on `view_mode`, `album_id`, and `mc` (music collection).
*   **`POST /api/graph/refresh`**: This endpoint is used to clear the existing in-memory cache and trigger a recomputation of the graph data, ensuring the latest information is available.

The system is designed to build various types of nodes, including: albums, songs, music collections (MCs), features, entities, and topics. Each node type also generates associated trivia or summary text. An in-memory cache with a 5-minute Time-To-Live (TTL) is utilized to optimize performance and reduce computational load. The graph, songs, and [[Spotify]] routers are registered in `main.py` to handle these new functionalities.

## Related

[[raag]],[[API Server Factory with Graceful Shutdown]],[[Brain-Explorer]],[[Category Color Map and Node Radius Scaling for Brain-Explorer]],[[Spotify]],[[Claude-powered Word-Level Rhyme Annotator for Raag]],[[API: GET /graph-export Endpoint for Cached Graph Data]]
