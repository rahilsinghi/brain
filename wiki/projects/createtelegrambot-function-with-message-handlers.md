---
title: createTelegramBot() Function with Message Handlers
author: ai
created_at: 2026-04-12T17:24:28.167Z
last_ai_edit: 2026-04-12T17:24:28.167Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-telegram-implement-createtelegrambot-with-message-han-8c0e04.md]]"
tags:
  - telegram
  - bot
  - grammy
  - routing
  - authentication
  - error handling
  - brain project
  - feature
---

# createTelegramBot() Function with Message Handlers

This commit implements the `createTelegramBot()` function within the `rahilsinghi/brain` repository, establishing a grammY bot with robust message handling capabilities. Key features include prefix-based routing, user authentication via `allowed_user_ids` guard, and dedicated command handlers for `/start`, `/help`, and `/status`. The bot also incorporates voice note rejection and comprehensive error handling for synthesis and ingestion processes.

## Key Concepts

grammY bot,Prefix-based routing,Telegram bot commands,User authentication,Error handling,Voice note rejection

## Details

The `createTelegramBot()` function was implemented in the `rahilsinghi/brain` repository as part of commit `77d3859` on `2026-04-08` by [[Rahil Singhi]] and [[Claude Sonnet 4.6]]. This implementation establishes a [[Telegram Bot]] using the grammY framework with the following core functionalities:

*   **Prefix-Based Routing:** Messages are routed based on prefixes (e.g., `?query` for queries and `ingest` for ingestion tasks), allowing for distinct processing paths.
*   **User Authentication:** An `allowed_user_ids` guard is integrated to restrict bot access to authorized users.
*   **Standard Commands:** Essential commands such as `/start`, `/help`, and `/status` are handled to provide basic interaction and information.
*   **Voice Note Rejection:** The bot is configured to reject voice note messages, focusing on text-based interactions.
*   **Robust Error Handling:** Comprehensive error handling mechanisms are in place for both synthesis failures (e.g., when generating responses) and ingestion failures (e.g., when processing incoming data), ensuring stability and providing feedback to the user or logs.

## Related

[[brain]],[[Add Grammy Dependency for Telegram Bot (brain)]],[[Add Voice Watcher, Daily Summary Cron, System Activity Logging (Brain Project)]],[[API Feature: POST /synthesise Endpoint with Robust Error Handling]],[[API: POST /ingest Route (Fire-and-Forget)]],[[Rahil Singhi]],[[Claude Sonnet 4.6]]
