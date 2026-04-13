---
title: Graph Data API for Universe Map in raag
author: ai
created_at: 2026-04-13T17:24:21.205Z
last_ai_edit: 2026-04-13T17:24:21.205Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-graph-data-api-for-universe-map-1fe746.md]]"
tags:
  - api
  - graph
  - data
  - raag
  - universe map
  - caching
  - nodes
  - albums
  - songs
  - spotify
  - llm
  - co-authored
---

# Graph Data API for Universe Map in raag

This commit introduces a new graph data API within the `[[raag]]` project, designed to power a 'Universe Map'. It provides endpoints for fetching graph data with filtering capabilities and for refreshing an in-memory cache. The API generates graph nodes for various entities like albums, songs, and artists, complete with generated trivia, to create a dynamic knowledge graph.

## Key Concepts

Graph Data API,Universe Map,In-memory Caching,Node Generation,Trivia/Summary Generation,API Endpoints,Microservice Architecture (implied by API),LLM Co-authorship

## Details

This feature, committed to the `rahilsinghi/raag` repository (SHA: `616db32`), establishes a robust graph data API for the 'Universe Map' functionality. Authored by Rahil Singhi with co-authorship from Claude Opus 4.6, it involved changes across 2 files, adding 461 lines of code and deleting 1.

Key functionalities include:

*   **`GET /api/graph/data`**: An endpoint allowing clients to retrieve graph data. It supports filtering based on `view_mode`, `album_id`, and `mc` (presumably Music Creator/Artist) parameters, enabling tailored views of the Universe Map.
*   **`POST /api/graph/refresh`**: An endpoint to explicitly clear the in-memory cache and trigger a recomputation of the entire graph structure. This ensures that the Universe Map can be updated with the latest data on demand.
*   **Node Generation**: The API is responsible for constructing various types of nodes that populate the graph. These include:
    *   Albums
    *   Songs
    *   MCs (Music Creators/Artists)
    *   Features
    *   General entities
    *   Topics
*   **Content Enrichment**: For each generated node type, the system creates informative trivia or summary text, enriching the contextual data available within the graph.
*   **In-Memory Caching**: To optimize performance and reduce redundant computations, an in-memory cache is implemented with a Time-To-Live (TTL) of 5 minutes. This ensures frequently accessed graph data is served quickly.
*   **Router Registration**: The newly developed graph, songs, and Spotify routers are registered within the `main.py` application file, integrating them into the overall `raag` project's API structure.

## Related

[[raag]],[[API: GET /graph-export Endpoint for Cached Graph Data]],[[API Health Check Endpoint (GET /health)]],[[Brain-Explorer Graph Data Update (354 Nodes)]],[[Brain-Explorer: Graph Data Types, Position Normalization, and Neighbor Map]],[[Add LLM Model Constants and Company Info Helper (Commit a9513cd)]]
