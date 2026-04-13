---
title: Universe Map Graph Data API
author: ai
created_at: 2026-04-10T17:23:13.890Z
last_ai_edit: 2026-04-10T17:23:13.890Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-graph-data-api-for-universe-map-1fe746.md]]"
tags:
  - api
  - graph
  - data
  - universe map
  - caching
  - raag
  - backend
  - development
  - python
---

# Universe Map Graph Data API

This entry details the Graph Data API developed for the Universe Map project, enabling dynamic retrieval and visualization of interconnected data. It provides endpoints for fetching graph data with various filters and for refreshing an in-memory cache with a 5-minute Time-to-Live.

## Key Concepts

Graph Data API,Universe Map,In-memory caching,Time-to-Live (TTL),API Endpoints,Node Types (albums, songs, MCs, features, entities, topics),Data Relationships

## Details

The Graph Data API, implemented within the `raag` repository (SHA: `616db32`) by Rahil Singhi (with co-authorship by Claude Opus 4.6), provides programmatic access to the interconnected data of the Universe Map.

Key functionalities include:
*   **Data Retrieval:** A `GET /api/graph/data` endpoint allows fetching graph data. This endpoint supports filtering by `view_mode`, `album_id`, and `mc` (Musical Creator) to tailor the returned graph structure.
*   **Cache Management:** A `POST /api/graph/refresh` endpoint is available to explicitly clear the in-memory cache and trigger a recomputation of the graph data, ensuring fresh data is served.
*   **Graph Node Generation:** The API dynamically builds various types of nodes, including albums, songs, Musical Creators (MCs), features, entities, and topics. For each node type, relevant trivia or summary text is generated to enrich the graph data.
*   **Caching Strategy:** An in-memory caching mechanism is employed to optimize performance, with a Time-to-Live (TTL) of 5 minutes.
*   **System Integration:** The graph API's routers, along with existing `songs` and `spotify` routers, are registered within the `main.py` file, indicating its integration into a larger application architecture.

This API serves as a crucial component for rendering and interacting with the complex relationships within the Universe Map data.

## Related

[[Universe Map]],[[Rahil Singhi]],[[Raag (Software Project)]],[[Claude Opus 4.6]],[[API Design]],[[Caching Strategies]],[[Graph Data Structures]]
