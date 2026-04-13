---
title: Extract Health Statistics Logic for API and Telegram Bot
author: ai
created_at: 2026-04-13T18:09:33.392Z
last_ai_edit: 2026-04-13T18:09:33.392Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-refactor-extract-gethealthstats-into-src-api-health-corets-34a0e4.md]]"
tags:
  - refactor
  - api
  - telegram
  - healthcheck
  - brain project
  - modularity
  - reusability
---

# Extract Health Statistics Logic for API and Telegram Bot

This refactor extracts the `getHealthStats()` function into a shared module within the `rahilsinghi/brain` repository. This allows both the HTTP API's `/health` route and the Telegram bot's `/status` command to utilize the same logic for gathering daemon health statistics, ensuring consistency and reusability.

## Key Concepts

Code Refactoring,Shared Logic,API Health Check,Telegram Bot Integration,Daemon Health Statistics,Modularity

## Details

The commit `945298f` by Rahil Singhi on 2026-04-08 involved refactoring the `rahilsinghi/brain` repository. The primary change was to extract the `getHealthStats()` function into a dedicated module located at `src/api/health-core.ts`. This moved the core logic for retrieving daemon health statistics out of the direct HTTP API handler.

This refactor offers several benefits:
*   **Code Reusability**: The `getHealthStats()` function can now be easily imported and used by multiple components. The HTTP route for the health check becomes a thin wrapper around this shared function.
*   **Consistency**: Ensures that both the API's `/health` endpoint and the [[Brain Project]]: [[Telegram Bot Integration]]'s `/status` command report the exact same set of health metrics, avoiding potential discrepancies.
*   **Modularity**: Improves the project's structure by separating concerns, making the codebase easier to understand, maintain, and test.

The change involved modifications across 3 files, with 155 additions and 40 deletions, indicating a significant reorganization of the health reporting mechanism.

## Related

[[Brain Project]],[[API Feature: GET /health Route with Status, Uptime, and Article Counts]],[[Add Grammy Dependency for Telegram Bot (brain)]],[[API Health Check Endpoint (GET /health)]],[[API Health Route (`/health`) Implementation]]
