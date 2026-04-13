---
title: Graph Data API for Universe Map in Raag Project
author: ai
created_at: 2026-04-12T17:43:49.390Z
last_ai_edit: 2026-04-12T17:43:49.390Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-graph-data-api-for-universe-map-1fe746.md]]"
tags:
  - raag
  - api
  - graph
  - universe map
  - data generation
  - caching
  - fastapi
---

# Graph Data API for Universe Map in Raag Project

This feature introduces a new Graph Data API within the Raag project, enabling the dynamic generation and retrieval of graph data for a "Universe Map." It supports filtering by view mode, album, and music creator, with an in-memory cache for performance.

## Key Concepts

Graph Data API,Universe Map,In-memory Cache,API Endpoint Filtering,Node Generation (Albums, Songs, MCs, Features, Entities, Topics),Trivia/Summary Text Generation,FastAPI

## Details

A new Graph Data API has been implemented in the `rahilsinghi/raag` repository, specifically designed to serve data for a 'Universe Map' visualization. This API includes the following key functionalities:

*   **GET /api/graph/data**: This endpoint allows clients to retrieve graph data. It supports various filters, including `view_mode`, `album_id`, and `mc` (music creator), enabling flexible data presentation.
*   **POST /api/graph/refresh**: This endpoint provides a mechanism to clear the internal cache and trigger a recomputation of the graph data, ensuring fresh data is served when needed.

The system constructs graph nodes from various data types, including albums, songs, music creators (MCs), features, general entities, and topics. For each generated node, the API also creates relevant trivia or summary text to enrich the visualization.

To optimize performance, an in-memory cache with a 5-minute Time-To-Live (TTL) is utilized for frequently accessed graph data. The graph, songs, and Spotify routers are registered within the `main.py` application.

## Related

[[raag]],[[API: Embed HTTP Server in Daemon Boot with Graceful Shutdown]],[[API Server Factory with Graceful Shutdown]],[[Backend Foundation for raag project with FastAPI, Pydantic, and Celery]],[[CLAUDE.md Update: API Layer Status and Source File Tree]],[[Brain Graph Report (2026-04-10)]]
