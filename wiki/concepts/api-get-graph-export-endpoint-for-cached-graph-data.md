---
title: "API: GET /graph-export Endpoint for Cached Graph Data"
author: ai
created_at: 2026-04-10T22:28:07.683Z
last_ai_edit: 2026-04-10T22:28:07.683Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-api-get-graph-export-serves-cached-graph-data-8bdfe2.md]]"
tags:
  - api
  - graph-export
  - caching
  - vectorstore
  - testing
  - feature
  - endpoint
  - commit
  - backend
---

# API: GET /graph-export Endpoint for Cached Graph Data

This commit introduces a new API endpoint, `GET /graph-export`, designed to serve cached graph data directly from disk. It enhances the application's API capabilities by providing efficient access to pre-processed graph information. The endpoint includes basic error handling, returning a 404 if the cache file is not found.

## Key Concepts

GET /graph-export API Endpoint,Cached Graph Data,Disk-based Caching,VectorStore.listAll(),API Endpoint Testing

## Details

This feature, introduced in commit `8282572`, adds a new API endpoint to the `rahilsinghi/brain` repository, enhancing its data serving capabilities.

### New Endpoint: `GET /graph-export`

- **Purpose**: This endpoint is responsible for retrieving and serving pre-cached graph data.
- **Implementation**: A new file, `src/api/routes/graph-export.ts`, was added to handle the logic. It reads the graph cache directly from disk.
- **Error Handling**: If the cached graph data file is not found on disk, the endpoint responds with a `404 Not Found` status.

### API Integration

- The `graphExportRoute` was registered within `src/api/server.ts`, ensuring it is available as part of the application's API. It was specifically placed to register after the `saveRoute`.

### Related Enhancements

- **VectorStore.listAll()**: A new method was added to the `VectorStore` class. This method allows for fetching all embedded chunks along with their associated vectors, which could be instrumental in preparing or managing the graph data that `graph-export` serves.

### Testing

- Dedicated tests were added in `tests/api/routes/graph-export.test.ts` to ensure the reliability of the new endpoint. These tests cover two critical scenarios:
    - A 'cache hit' case, verifying that the endpoint correctly serves existing cached data.
    - A '404' case, confirming the proper error response when the cached data is missing.

### Commit Details

- **Repository**: `rahilsinghi/brain`
- **SHA**: `8282572`
- **Date**: `2026-04-10T16:16:36Z`
- **Author**: Rahil Singhi
- **Co-Authored-By**: Claude Sonnet 4.6
- **Changes**: 3 files changed, with 112 additions and 0 deletions.

## Related

[[API Endpoints]],[[Graph Data]],[[Caching]],[[VectorStore]],[[API Testing]],[[rahilsinghi/brain Project]]
