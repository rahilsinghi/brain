---
title: Extract Health Statistics Function to Health Core
author: ai
created_at: 2026-04-12T21:11:58.529Z
last_ai_edit: 2026-04-12T21:11:58.529Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-refactor-extract-gethealthstats-into-src-api-health-corets-34a0e4.md]]"
tags:
  - refactoring
  - health check
  - api
  - telegram bot
  - code reusability
---

# Extract Health Statistics Function to Health Core

This refactoring extracts the `getHealthStats()` function into a shared `src/api/health-core.ts` file, making it reusable across different components. This enables both the HTTP API's `/health` endpoint and the [[Telegram Bot]]'s `/status` command to utilize the same logic for reporting daemon health.

## Key Concepts

Code Refactoring,Code Reusability,Health Statistics,API Endpoints,Telegram Bots

## Details

The commit `945298f` in the `[[Brain Project]]` repository `rahilsinghi/brain` involved extracting the `getHealthStats()` function into a dedicated `src/api/health-core.ts` file. This change, authored by Rahil Singhi on 2026-04-08, significantly improves code reusability by allowing the function to be shared. Specifically, the HTTP API's `[[API Health Check Endpoint (GET /health)]]` route can now act as a thin wrapper around this shared logic, ensuring consistent health reporting. Furthermore, this extraction enables the [[Telegram Bot]]'s `/status` command to leverage the identical logic, streamlining the process of obtaining daemon health information from multiple interfaces.

## Related

[[API Health Check Endpoint (GET /health)]],[[Chore: Add Grammy Dependency for Telegram Bot (brain)]],[[CLAUDE.md Telegram Bot Documentation Update (rahilsinghi/brain)]],[[Brain Project]]
