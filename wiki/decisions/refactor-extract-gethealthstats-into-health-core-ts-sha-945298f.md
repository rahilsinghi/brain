---
title: "Refactor: Extract getHealthStats() into health-core.ts (SHA: 945298f)"
author: ai
created_at: 2026-04-10T02:19:26.041Z
last_ai_edit: 2026-04-10T02:19:26.041Z
last_human_edit: null
last_embedded_hash: 22290810ad22d003
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-refactor-extract-gethealthstats-into-src-api-health-corets-34a0e4.md]]"
tags:
  - refactor
  - typescript
  - health-stats
  - api
  - telegram-bot
  - code-reuse
  - brain-repo
  - daemon
  - extract-function
---


# Refactor: Extract getHealthStats() into health-core.ts (SHA: 945298f)

This commit by Rahil Singhi refactors the health statistics logic in the rahilsinghi/brain repository by extracting a shared `getHealthStats()` function into `src/api/health-core.ts`. The refactor decouples the core health-gathering logic from the HTTP route, making the HTTP handler a thin wrapper. This enables reuse of the same logic by the Telegram bot's `/status` command.

## Key Concepts

- **getHealthStats()**: Shared function extracted to centralize daemon health stat collection
- **health-core.ts**: New module located at `src/api/health-core.ts` housing the extracted logic
- **Thin Wrapper Pattern**: HTTP route is refactored to delegate to the shared function rather than implement logic directly
- **Code Reuse**: Extraction enables the Telegram bot `/status` command to consume the same health stats logic
- **Daemon Health Stats**: System-level health information gathered about a running daemon process

## Details

## Overview

Commit `945298f`, authored by Rahil Singhi on 2026-04-08, performs a targeted refactor in the `rahilsinghi/brain` repository to improve code reuse and separation of concerns around daemon health reporting.

## Changes Summary

| Attribute       | Value                        |
|----------------|------------------------------|
| Repository      | rahilsinghi/brain            |
| SHA             | 945298f                      |
| Date            | 2026-04-08T18:28:12Z         |
| Author          | Rahil Singhi                 |
| Files Changed   | 3                            |
| Additions       | +155                         |
| Deletions       | -40                          |

## Motivation

Prior to this refactor, the logic for gathering daemon health statistics was likely embedded directly within the HTTP route handler. This tightly coupled the implementation to a single delivery mechanism (HTTP), preventing reuse elsewhere.

## What Changed

- A new file `src/api/health-core.ts` was introduced to house the `getHealthStats()` function.
- The existing HTTP route handler was updated to become a thin wrapper that calls `getHealthStats()` and returns the result.
- The Telegram bot's `/status` command is now able to import and invoke `getHealthStats()` directly, using the same underlying logic as the HTTP endpoint.

## Impact

- **Reduced duplication**: A single source of truth for health stat collection.
- **Improved testability**: `getHealthStats()` can be unit tested independently of HTTP or Telegram transport layers.
- **Extensibility**: Any future consumer (CLI, webhook, etc.) can reuse the same function without duplicating logic.

## Related

- [[rahilsinghi/brain Repository]]
- [[Daemon Health Monitoring]]
- [[Telegram Bot /status Command]]
- [[API Module Structure]]
- [[Thin Wrapper Pattern]]
- [[Health Check Endpoint]]
