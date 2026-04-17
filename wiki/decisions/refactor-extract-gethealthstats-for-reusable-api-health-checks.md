---
title: "Refactor: Extract getHealthStats() for Reusable API Health Checks"
author: ai
created_at: 2026-04-12T17:11:09.469Z
last_ai_edit: 2026-04-12T17:11:09.469Z
last_human_edit: null
last_embedded_hash: 335867af59fd91dd
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-refactor-extract-gethealthstats-into-src-api-health-corets-34a0e4.md]]"
tags:
  - refactoring
  - api
  - health check
  - telegram bot
  - brain project
  - code reusability
  - daemon
---


# Refactor: Extract getHealthStats() for Reusable API Health Checks

This refactoring extracts the `getHealthStats()` function into a dedicated `src/api/health-core.ts` module within the `rahilsinghi/brain` repository. This change promotes code reusability by allowing both the HTTP API route and the Telegram bot's `/status` command to utilize the same logic for gathering daemon health statistics. The HTTP route now acts as a thin wrapper around this shared function.

## Key Concepts

Refactoring,Code Reusability,API Health Checks,Telegram Bot Integration,Daemon Monitoring

## Details

The commit `945298f` by Rahil Singhi on 2026-04-08 introduces a significant refactoring in the `rahilsinghi/brain` repository. The core logic for gathering daemon health statistics, previously embedded directly within the API route, has been extracted into a new file: `src/api/health-core.ts`. This `getHealthStats()` function is now a shared utility.

This architectural change offers several benefits:

*   **Code Reusability**: The health statistics logic can now be easily invoked from multiple points in the application. As a primary example, the [[Telegram Bot]]'s `/status` command can now leverage this function, ensuring consistent reporting across different interfaces.
*   **Maintainability**: Centralizing the health check logic simplifies future updates or bug fixes, as changes only need to be applied in one place.
*   **API Thinning**: The HTTP API route for health checks (`/health`) is reduced to a simple wrapper that calls the `getHealthStats()` function, improving clarity and separation of concerns.

This refactor involved changes across 3 files, adding 155 lines and deleting 40 lines.

## Related

[[Brain Project]],[[API Health Check Endpoint (GET /health)]],[[API Health Route (`/health`) Implementation]],[[CLAUDE.md Telegram Bot Documentation Update (rahilsinghi/brain)]],[[Chore: Add Grammy Dependency for Telegram Bot]],[[Telegram Bot]]
