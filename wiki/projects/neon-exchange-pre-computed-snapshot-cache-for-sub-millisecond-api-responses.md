---
title: "Neon-Exchange: Pre-computed Snapshot Cache for Sub-millisecond API Responses"
author: ai
created_at: 2026-04-12T21:52:20.577Z
last_ai_edit: 2026-04-12T21:52:20.577Z
last_human_edit: null
last_embedded_hash: 8e90758a1c4e31eb
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-neon-exchange-feat-add-pre-computed-snapshot-cache-for-sub-millisec-210751.md]]"
tags:
  - neon-exchange
  - caching
  - api
  - performance
  - fastapi
  - real-time
  - latency
  - software architecture
---


# Neon-Exchange: Pre-computed Snapshot Cache for Sub-millisecond API Responses

This update introduces a double-buffered, pre-computed snapshot cache to the `neon-exchange` project, enabling sub-millisecond API response times. It optimizes data delivery by pre-serializing JSON for all endpoints and rebuilding the cache in the background, significantly reducing latency for critical market data.

## Key Concepts

[[Snapshot Cache]],Double-buffered cache,Atomic pointer swap,Pre-serialized JSON,[[FastAPI Lifespan]],[[Server-Sent Events (SSE)]],API performance optimization,Real-time data,Low-latency API

## Details

This commit (`2480eed`) to the `rahilsinghi/neon-exchange` repository implemented a significant performance enhancement by introducing a pre-computed snapshot cache.

**Key changes include:**

*   **`services/cache.py`**: A new service was created to manage a double-buffered `WorldSnapshot`. This mechanism uses an atomic pointer swap to seamlessly update the cache without blocking read operations. The cache is rebuilt in the background every 2 seconds, and all data required for API endpoints (bootstrap, market state, districts, ticker lookup) is pre-serialized into JSON.
*   **`main.py`**: The [[FastAPI]] application's lifespan events were updated to correctly start and stop the background cache rebuilding task, ensuring proper resource management.
*   **`world_router.py`**: The [[Server-Sent Events (SSE)]] endpoint now reads directly from the pre-serialized `bootstrap_json` in the cache, eliminating the need for `json.dumps` in the hot path and reducing computational overhead.
*   **`market_router.py`**: All market-related API endpoints were modified to retrieve data directly from the cache snapshot. A new diagnostic endpoint, `/api/debug/cache-stats`, was added to provide insights into the cache's performance and status.
*   **`orchestrator.py`**: [[Agent tools]] were updated to read their necessary data from the new cache. The context builder now includes a signals summary, laying groundwork for [[Phase 2]] of the project.

**Performance Benchmarks:**

*   **Read Latency**: Achieves 0ns read latency for cached data.
*   **Rebuild Cost**: Cache rebuilds complete in approximately 1ms.
*   **Bootstrap Payload Size**: The bootstrap payload is efficiently sized at 19KB.

This enhancement ensures extremely fast API responses, crucial for real-time market data applications.

## Related

[[neon-exchange]],[[FastAPI]],[[Server-Sent Events (SSE)]],[[API performance]],[[Cache Management]],[[Agent tools]],[[Phase 2]]
