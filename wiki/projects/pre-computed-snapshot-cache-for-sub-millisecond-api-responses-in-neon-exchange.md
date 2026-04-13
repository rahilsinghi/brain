---
title: Pre-computed Snapshot Cache for Sub-millisecond API Responses in Neon Exchange
author: ai
created_at: 2026-04-13T17:33:11.502Z
last_ai_edit: 2026-04-13T17:33:11.502Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-neon-exchange-feat-add-pre-computed-snapshot-cache-for-sub-millisec-210751.md]]"
tags:
  - caching
  - api
  - performance
  - fastapi
  - sse
  - neon exchange
  - optimization
  - snapshot
  - background task
  - low latency
  - json serialization
  - co-authored
---

# Pre-computed Snapshot Cache for Sub-millisecond API Responses in Neon Exchange

This update introduces a robust caching mechanism to the `rahilsinghi/neon-exchange` project, enabling sub-millisecond API response times for critical endpoints. It leverages a double-buffered `WorldSnapshot` with background rebuilding and pre-serialized JSON payloads. This significantly enhances the responsiveness and efficiency of the Neon Exchange API.

## Key Concepts

WorldSnapshot,Double-Buffered Caching,Atomic Pointer Swap,Background Task Processing,Server-Sent Events (SSE),JSON Serialization Optimization,FastAPI Lifespan Events,API Performance Optimization

## Details

This feature (`feat: Add pre-computed snapshot cache`) for the `rahilsinghi/neon-exchange` project, committed on March 7, 2026, by Rahil Singhi, introduces a sophisticated caching layer to achieve extremely low-latency API responses. The core of this implementation is the new `services/cache.py` module.

The `cache.py` service implements a double-buffered `WorldSnapshot`.

Key aspects of the implementation include:

*   **Double-Buffered `WorldSnapshot`**: Two snapshots of the world state are maintained. One is actively served to API requests, while the other is rebuilt in the background.
*   **Atomic Pointer Swap**: Once the background rebuild is complete, an atomic pointer swap instantaneously switches the active snapshot, ensuring uninterrupted service and consistency.
*   **Background Rebuild**: The snapshot is rebuilt asynchronously every 2 seconds, maintaining data freshness without blocking API requests.
*   **Pre-serialized JSON**: All data for critical endpoints (e.g., `bootstrap`, `market_state`, `districts`, `ticker lookup`) is pre-serialized into JSON format during the rebuild process. This eliminates the need for `json.dumps` in the hot path of API requests, drastically reducing latency.
*   **FastAPI Lifespan Integration**: The `main.py` entry point for the FastAPI application now manages the lifecycle of the cache's background task, ensuring it starts and stops cleanly with the application.
*   **Router Updates**: `world_router.py` and `market_router.py` were updated to fetch pre-serialized data directly from the cache snapshot, removing on-the-fly JSON serialization.
*   **Orchestrator Integration**: `orchestrator.py` was updated to allow agent tools to read from the cache, and the context builder now includes a signals summary, preparing the system for Phase 2 agent functionality.
*   **Debug Endpoint**: A new `/api/debug/cache-stats` endpoint was added to `market_router.py` to provide diagnostics on cache performance and state.

**Performance Benchmarks:**

*   **Read Latency**: 0 nanoseconds (ns)
*   **Rebuild Cost**: 1 millisecond (ms)
*   **Bootstrap Payload Size**: 19KB

This optimization was co-authored by Claude Opus 4.6, highlighting the use of AI in architectural design and implementation.

## Related

[[Neon Exchange]],[[Caching]],[[API Performance]],[[Server-Sent Events (SSE)]],[[Agent Tools]],[[Orchestrator]],[[AI-Assisted Development]]
