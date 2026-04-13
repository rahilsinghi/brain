---
title: Graph Data API for Universe Map (raag)
author: ai
created_at: 2026-04-13T16:05:08.129Z
last_ai_edit: 2026-04-13T16:05:08.129Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-graph-data-api-for-universe-map-1fe746.md]]"
tags:
  - api
  - graph
  - data
  - universe map
  - raag
  - fastapi
  - cache
  - nodes
  - backend
---

# Graph Data API for Universe Map (raag)

This article details the implementation of a graph data API within the `raag` project, designed to expose structured information about a 'Universe Map'. It introduces `GET /api/graph/data` for querying graph nodes with various filters and `POST /api/graph/refresh` for cache management. The API supports diverse node types including albums, songs, and entities, complete with generated trivia and summary text, and utilizes an in-memory cache for performance.

## Key Concepts

Graph Data API,Universe Map,In-memory Cache,Node Generation (Albums, Songs, MCs, Features, Entities, Topics),FastAPI Routers

## Details

This feature introduces a dedicated API within the `[[raag]]` repository to serve graph data for a 'Universe Map' visualization, likely intended for integration with a frontend component like [[Brain-Explorer]]. The implementation, associated with commit `616db32` by [[Rahil Singhi]] and co-authored by [[Claude Opus 4.6]], involved significant additions (`+461`) across two files.

Key functionalities of this API include:

*   **`GET /api/graph/data`**: This endpoint allows clients to retrieve graph nodes. It supports various filtering options, including `view_mode`, `album_id`, and `mc` (presumably 'music category' or 'main concept').
*   **`POST /api/graph/refresh`**: A dedicated endpoint to clear the existing in-memory cache and trigger a recomputation of the graph data, ensuring fresh data can be loaded.
*   **Node Generation**: The API is responsible for building a comprehensive set of nodes. These nodes represent diverse categories such as `albums`, `songs`, `MCs` (main concepts), `features`, `entities`, and `topics` within the 'Universe Map'.
*   **Content Generation**: For each node type, the API generates specific trivia or summary text, enriching the data presented to the user.
*   **Caching**: An in-memory cache with a 5-minute Time-To-Live (TTL) is implemented to optimize performance and reduce computational load for frequently requested data.
*   **Router Integration**: The `graph`, `songs`, and `spotify` routers are registered within `main.py`, indicating a modular structure for handling different data domains.

This API is a foundational step towards visualizing and interacting with a complex knowledge graph, likely feeding into dynamic interfaces for exploration.

## Related

[[raag]],[[Brain-Explorer]],[[Brain Project]],[[Claude Opus 4.6]],[[API: GET /graph-export Endpoint for Cached Graph Data]],[[API: POST /graph-push Endpoint for Graph Cache Rebuild and Explorer Update]],[[Backend Foundation for raag project with FastAPI, Pydantic, and Celery]],[[Rahil Singhi]],[[FastAPI]]
