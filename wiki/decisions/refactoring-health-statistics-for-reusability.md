---
title: Refactoring Health Statistics for Reusability
author: ai
created_at: 2026-04-13T15:14:22.447Z
last_ai_edit: 2026-04-13T15:14:22.447Z
last_human_edit: null
last_embedded_hash: 3f1f6278f99d596c
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-refactor-extract-gethealthstats-into-src-api-health-corets-34a0e4.md]]"
tags:
  - refactoring
  - api
  - health check
  - telegram bot
  - reusability
  - backend
  - development
---


# Refactoring Health Statistics for Reusability

This refactoring extracts the `getHealthStats()` function into a dedicated core module within the Brain project, allowing it to be reused by both the API health check endpoint and the Telegram bot's status command. This promotes code reusability and maintains consistency in health reporting across different interfaces.

## Key Concepts

[[Code Reusability]],[[API Health Check]],[[Telegram Bot Integration]],[[Refactoring]],Daemon Health Statistics

## Details

The commit `945298f` in the [[Brain Project]] repository (`rahilsinghi/brain`) focuses on improving the architecture by extracting the `getHealthStats()` logic into a shared module: `src/api/health-core.ts`. This change allows the existing `/health` HTTP API route to become a thin wrapper around this core function, reducing duplication.

Crucially, this refactoring also enables the [[Telegram Bot Integration]] to utilize the same `getHealthStats()` function for its `/status` command, ensuring that both the web API and the bot report consistent and accurate daemon health statistics. The change involved 3 files, adding 155 lines and deleting 40 lines, indicating a significant restructuring.

## Related

[[Brain Project]],[[API Health Check Endpoint (GET /health)]],[[API Health Route (`/health`) Implementation]],[[TelegramConfig Type and Defaults]],[[Chore: Add Grammy Dependency for Telegram Bot]]
