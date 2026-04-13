---
title: Graph Data API for Universe Map
author: ai
created_at: 2026-04-10T22:14:08.954Z
last_ai_edit: 2026-04-10T22:14:08.954Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-graph-data-api-for-universe-map-1fe746.md]]"
tags:
  - api
  - graph
  - universe-map
  - raag
  - caching
  - data-model
  - development
---

# Graph Data API for Universe Map

This feature introduces a Graph Data API within the `raag` repository to power the Universe Map. It provides endpoints for retrieving structured graph data with various filters and for refreshing its in-memory cache. The API generates interconnected nodes for various entities like albums, songs, and topics.

## Key Concepts

Graph Data API,Universe Map,In-memory Caching,API Endpoints (GET /api/graph/data, POST /api/graph/refresh),Node Generation (Albums, Songs, MCs, Features, Entities, Topics)

## Details

This commit, identified by SHA `616db32` and authored by [[Rahil Singhi]] on 2026-03-04, implements a new Graph Data API for the [[Universe Map]] within the `[[raag (repository)]]` project.

Key functionalities and components include:

*   **API Endpoints:**
    *   `GET /api/graph/data`: Retrieves graph data, supporting filters by `view_mode`, `album_id`, and `mc` (main concept/music critic).
    *   `POST /api/graph/refresh`: Allows for clearing the in-memory cache and recomputing the graph data, ensuring fresh information.
*   **Node Generation:** The API is responsible for building various types of interconnected nodes that represent data entities for the Universe Map. These include:
    *   Albums
    *   Songs
    *   MCs (Main Concepts/Music Critics)
    *   Features
    *   Entities
    *   Topics
*   **Content Enrichment:** For each generated node type, the API also creates and includes dynamic trivia or summary text to provide additional context.
*   **Caching Mechanism:** An in-memory cache is utilized to optimize performance, featuring a 5-minute Time-To-Live (TTL) for cached data.
*   **Integration:** The `graph` router, alongside existing `songs` and `spotify` routers, has been registered in `main.py`, fully integrating the API into the application's backend.

## Related

[[Universe Map]],[[Rahil Singhi]],[[raag (repository)]],[[API]],[[Graph Data]]
