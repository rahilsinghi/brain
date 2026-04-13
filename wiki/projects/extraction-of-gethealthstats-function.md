---
title: Extraction of getHealthStats() Function
author: ai
created_at: 2026-04-11T00:08:24.235Z
last_ai_edit: 2026-04-11T00:08:24.235Z
last_human_edit: null
last_embedded_hash: f69976c0ab421d0c
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-refactor-extract-gethealthstats-into-src-api-health-corets-34a0e4.md]]"
tags:
  - refactoring
  - api
  - health check
  - daemon
  - telegram bot
  - code reuse
  - brain project
---


# Extraction of getHealthStats() Function

This refactor extracts the `getHealthStats()` function into `src/api/health-core.ts` within the `rahilsinghi/brain` repository. This change promotes code reuse, allowing both the HTTP API's health route and the Telegram bot's `/status` command to utilize the same logic for gathering daemon health statistics.

## Key Concepts

Refactoring,Code Reuse,API Health Check,Telegram Bot Integration,Daemon Management

## Details

The `getHealthStats()` function was extracted into `src/api/health-core.ts` as part of a refactoring effort in the `rahilsinghi/brain` repository. This commit (SHA: `945298f`), authored by Rahil Singhi on 2026-04-08, involved changes across 3 files, adding 155 lines and deleting 40. The primary motivation was to create a shared utility for gathering daemon health statistics, ensuring that the HTTP API's health route acts as a thin wrapper around this core logic. This also enables the Telegram bot's `/status` command to leverage the identical, centralized health reporting mechanism.

## Related

[[brain — Git Activity]],[[API Health Check Endpoint (GET /health)]],[[API Health Route (`/health`) Implementation]],[[Daemon Entry Point with Graceful Shutdown]],[[Documentation Update: CLAUDE.md Telegram Bot]],[[Telegram Bot Update: /status Command and Graceful Shutdown]]
