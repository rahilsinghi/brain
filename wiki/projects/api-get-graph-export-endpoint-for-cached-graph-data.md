---
title: "API: GET /graph-export Endpoint for Cached Graph Data"
author: ai
created_at: 2026-04-12T22:25:10.316Z
last_ai_edit: 2026-04-12T22:25:10.316Z
last_human_edit: null
last_embedded_hash: 95a5e825b44676dc
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-api-get-graph-export-serves-cached-graph-data-8bdfe2.md]]"
tags:
  - api
  - graph
  - cache
  - backend
  - brain project
  - feature
  - testing
  - vectorstore
---


# API: GET /graph-export Endpoint for Cached Graph Data

This commit introduces a new API endpoint, `/graph-export`, to the Brain Project. It allows retrieval of cached graph data directly from disk, providing a mechanism to serve pre-processed knowledge graph information.

## Key Concepts

[[GET /graph-export]],Cached Graph Data,API Endpoint,[[VectorStore.listAll()]],API Testing

## Details

This feature, committed to the `rahilsinghi/brain` repository, implements a dedicated API route for serving cached graph data.

Key changes include:

*   **New Route Implementation**: A new file `src/api/routes/graph-export.ts` was added. This file contains the logic to read the graph cache from disk and return its content. If the cache is not found, it responds with a `404` status.
*   **Route Registration**: The `graphExportRoute` is registered within the `src/api/server.ts` file, ensuring it is accessible after the `saveRoute`.
*   **VectorStore Integration**: The `VectorStore.listAll()` method was added to facilitate fetching all embedded chunks, complete with their associated vectors. This method is crucial for populating the graph data.
*   **Unit Tests**: Comprehensive tests were added in `tests/api/routes/graph-export.test.ts` to cover two primary scenarios: a successful cache hit and the appropriate `404` response when the cache is missing.

## Related

[[brain — Git Activity]],[[API: GET /graph-export Endpoint for Cached Graph Data]],[[API Server Factory with Graceful Shutdown]],[[Brain Project]],[[VectorStore]]
