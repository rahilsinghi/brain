---
title: Telegram Bot Integration with Daemon Lifecycle (brain)
author: ai
created_at: 2026-04-11T01:40:13.471Z
last_ai_edit: 2026-04-11T01:40:13.471Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-telegram-integrate-bot-into-daemon-boot-and-shutdown-c68be7.md]]"
tags:
  - telegram
  - bot
  - daemon
  - integration
  - boot
  - shutdown
  - brain
  - development
  - automation
---

# Telegram Bot Integration with Daemon Lifecycle (brain)

This commit details the integration of a Telegram bot directly into the daemon's boot and shutdown processes within the `rahilsinghi/brain` repository. The bot's operation is opt-in, requiring specific configuration, and includes features for consistent uptime reporting and parallel shutdown alongside the server.

## Key Concepts

Telegram Bot,Daemon Lifecycle,Opt-in Configuration,Uptime Reporting,Parallel Shutdown

## Details

The `e2cbaeb` commit in the `rahilsinghi/brain` repository integrates a Telegram bot directly into the daemon's startup and graceful shutdown sequence. This integration ensures that the bot's lifecycle is managed alongside the main daemon process.

Key aspects of this integration include:

*   **Opt-in Mechanism**: The Telegram bot functionality is not enabled by default. It requires explicit configuration through the presence of a `bot_token` and a non-empty list of `allowed_user_ids`. This design ensures that the bot only becomes active when intentionally configured.
*   **Uptime Reporting**: The bot now captures its `startTime` at the moment of daemon boot. This allows for consistent and accurate reporting of the bot's operational uptime.
*   **Parallel Shutdown**: During the daemon's shutdown sequence, the bot's stopping process (`bot stop`) is executed concurrently with the server's drain operations. This parallel execution aims to optimize shutdown efficiency and ensure that all components are gracefully terminated in a timely manner.

## Related

[[brain — Git Activity]],[[Daemon Entry Point with Graceful Shutdown]],[[Chore: Add Grammy Dependency for Telegram Bot]],[[CLAUDE.md Telegram Bot Documentation Update (rahilsinghi/brain)]]
