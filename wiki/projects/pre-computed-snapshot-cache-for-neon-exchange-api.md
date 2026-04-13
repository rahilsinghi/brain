---
title: Pre-computed Snapshot Cache for Neon Exchange API
author: ai
created_at: 2026-04-10T22:17:09.588Z
last_ai_edit: 2026-04-10T22:17:09.588Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-neon-exchange-feat-add-pre-computed-snapshot-cache-for-sub-millisec-210751.md]]"
tags:
  - caching
  - performance
  - api
  - fastapi
  - neon-exchange
  - optimization
  - snapshot
  - background-task
  - sse
  - python
  - double-buffering
---

# Pre-computed Snapshot Cache for Neon Exchange API

This feature introduces a highly optimized pre-computed snapshot cache to the Neon Exchange API, drastically reducing API response times to sub-millisecond latency. It utilizes a double-buffered `WorldSnapshot` and atomic pointer swaps, with background rebuilding every 2 seconds, to serve pre-serialized JSON payloads for critical endpoints. This significantly enhances performance by eliminating inline computation and JSON serialization from the hot path.

## Key Concepts

- Pre-computed snapshot cache,- Double-buffered data structures,- Atomic pointer swap,- Background task / Asynchronous processing,- Pre-serialized JSON,- FastAPI Lifespan events,- Server-Sent Events (SSE) optimization,- API performance optimization,- Zero-latency data reads,- Diagnostic endpoints

## Details

A significant performance enhancement was implemented for the Neon Exchange API by introducing a pre-computed snapshot cache. This feature, introduced in commit `2480eed`, aims to deliver sub-millisecond API response times by serving pre-serialized data.

### Core Cache Implementation

Residing in `services/cache.py`, the core of this system is a `WorldSnapshot` which is double-buffered. This design allows for atomic pointer swaps, ensuring that a consistent, complete snapshot is always available while a new one is being rebuilt in the background. The cache rebuilds every 2 seconds, and critically, all data for key API endpoints (bootstrap, market state, districts, ticker lookup) is pre-serialized into JSON during this rebuild process. This eliminates the need for `json.dumps()` in the API's hot path.

### API Integration

*   **`main.py`**: The application's `FastAPI` lifespan events are used to start and stop the background cache rebuilding task, ensuring proper resource management.
*   **`world_router.py`**: The Server-Sent Events (SSE) endpoint for `bootstrap_json` now reads directly from the pre-serialized snapshot, avoiding any inline computation or serialization.
*   **`market_router.py`**: All endpoints within this router have been updated to read their data directly from the cache snapshot, benefiting from the pre-computed and pre-serialized nature. A new diagnostic endpoint, `/api/debug/cache-stats`, was added to provide insights into the cache's performance and state.

### Orchestrator Integration

*   **`orchestrator.py`**: Agent tools within the orchestrator now read data from this central cache. Furthermore, the context builder has been updated to include a signals summary, preparing for future development (Phase 2).

### Performance Benchmarks

Initial benchmarks demonstrate the effectiveness of this caching strategy:
*   **Read Latency**: 0ns (effectively instantaneous as data is readily available in memory).
*   **Rebuild Cost**: Approximately 1ms.
*   **Bootstrap Payload Size**: 19KB.

This robust caching mechanism significantly improves the responsiveness and scalability of the Neon Exchange API.

### Authorship

This feature was primarily developed by Rahil Singhi, with contributions from Claude Opus 4.6.

## Related

[[Neon Exchange]],[[API Caching]],[[Performance Optimization]],[[FastAPI]],[[Server-Sent Events]],[[Rahil Singhi]],[[Claude Opus 4.6]]
