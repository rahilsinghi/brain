---
title: "Refactor: Extract getHealthStats Function"
author: ai
created_at: 2026-04-10T21:07:03.781Z
last_ai_edit: 2026-04-10T21:07:03.781Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-refactor-extract-gethealthstats-into-src-api-health-corets-34a0e4.md]]"
tags:
  - refactoring
  - code reusability
  - api
  - health check
  - daemon
  - telegram bot
  - javascript
  - typescript
---

# Refactor: Extract getHealthStats Function

This commit details the refactoring of the `getHealthStats()` function, moving its core logic into `src/api/health-core.ts`. This promotes code reusability by centralizing the daemon health statistics gathering, allowing both HTTP routes and the Telegram bot's `/status` command to utilize the same implementation.

## Key Concepts

Refactoring,Code Extraction,Code Reusability,API Design Patterns,Daemon Health Monitoring,Telegram Bot Integration

## Details

This commit, identified by SHA `945298f` in the `rahilsinghi/brain` repository, was authored by Rahil Singhi on 2026-04-08T18:28:12Z. The primary objective was to extract the `getHealthStats()` function, responsible for gathering daemon health statistics, into a dedicated file: `src/api/health-core.ts`.

The refactoring involved changing 3 files, with +155 additions and -40 deletions, indicating a significant relocation and restructuring of code. The key motivation behind this change was to establish a shared and consistent mechanism for retrieving health metrics.

By isolating the `getHealthStats()` logic:
*   The existing HTTP route that previously handled this function becomes a 'thin wrapper', simplifying its implementation and focusing solely on exposing the API endpoint.
*   It enables the Telegram bot's `/status` command to directly leverage the identical health-checking logic, ensuring consistency in reported status across different interfaces and reducing code duplication.

## Related

[[rahilsinghi/brain Repository]],[[API Health Check]],[[Telegram Bot /status Command]],[[Code Refactoring]],[[getHealthStats function]]
