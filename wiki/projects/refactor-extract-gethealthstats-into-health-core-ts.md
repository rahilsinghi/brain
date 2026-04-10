---
title: "Refactor: Extract getHealthStats() into health-core.ts"
author: ai
created_at: 2026-04-10T02:20:22.844Z
last_ai_edit: 2026-04-10T02:20:22.844Z
last_human_edit: null
last_embedded_hash: 39267948b42a54c7
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-refactor-extract-gethealthstats-into-src-api-health-corets-34a0e4.md]]"
tags:
  - refactor
  - health-stats
  - api
  - telegram-bot
  - code-reuse
  - brain
  - daemon
  - extraction
  - architecture
---


# Refactor: Extract getHealthStats() into health-core.ts

This commit by Rahil Singhi extracts shared health statistics logic into a dedicated module at `src/api/health-core.ts`. The refactor separates the core daemon health gathering function from the HTTP route handler, making it reusable across multiple consumers. This change enables the Telegram bot's `/status` command to leverage the same underlying health stat logic as the HTTP endpoint.

## Key Concepts

- **Extraction Refactor**: Moving shared logic out of a route handler into a standalone, importable core module
- **Thin Wrapper Pattern**: The HTTP route is reduced to a lightweight wrapper that delegates to the core function
- **Code Reuse**: The extracted `getHealthStats()` function can now be consumed by multiple interfaces (HTTP API and Telegram bot)
- **Daemon Health Stats**: Centralized logic for gathering runtime/health metrics of the brain daemon
- **Separation of Concerns**: Decoupling transport layer (HTTP route) from business/domain logic (`health-core.ts`)

## Details

## Commit Details

| Field | Value |
|---|---|
| **Repository** | rahilsinghi/brain |
| **SHA** | `945298f` |
| **Date** | 2026-04-08T18:28:12Z |
| **Author** | Rahil Singhi |
| **Files Changed** | 3 |
| **Additions** | +155 |
| **Deletions** | -40 |

## Summary

This refactor introduces `src/api/health-core.ts` as a new shared module containing the `getHealthStats()` function. Previously, this logic lived directly inside an HTTP route handler, making it inaccessible to other parts of the system.

## Motivation

The primary driver for this change was enabling the **Telegram bot's `/status` command** to surface the same daemon health information available via the HTTP API. Rather than duplicating logic, the health stat gathering is centralized.

## Architectural Impact

- **Before:** HTTP route handler contained inline logic for gathering daemon health stats.
- **After:** `getHealthStats()` lives in `health-core.ts`; both the HTTP route and the Telegram bot import and call it.

```
src/api/health-core.ts   ← new shared module
       ↑               ↑
HTTP Route Handler   Telegram Bot /status
```

## Files Changed

1. `src/api/health-core.ts` — new file containing extracted `getHealthStats()` function
2. HTTP route handler — refactored to thin wrapper calling `getHealthStats()`
3. Telegram bot handler — updated to import and use `getHealthStats()`

## Related

- [[rahilsinghi/brain Repository]]
- [[Daemon Health Monitoring]]
- [[Telegram Bot Integration]]
- [[HTTP API Architecture]]
- [[getHealthStats Function]]
- [[src/api/health-core.ts Module]]
