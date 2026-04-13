---
title: Integrate Telegram Bot into Brain Daemon Boot and Shutdown
author: ai
created_at: 2026-04-12T22:19:57.679Z
last_ai_edit: 2026-04-12T22:19:57.679Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-telegram-integrate-bot-into-daemon-boot-and-shutdown-c68be7.md]]"
tags:
  - telegram
  - bot
  - daemon
  - boot
  - shutdown
  - brain project
  - integration
  - graceful shutdown
  - opt-in
---

# Integrate Telegram Bot into Brain Daemon Boot and Shutdown

This commit integrates an opt-in Telegram bot into the Brain project's daemon, ensuring it starts during boot and gracefully shuts down in parallel with the server drain. The bot requires a `bot_token` and `allowed_user_ids` for activation and tracks `startTime` for uptime reporting.

## Key Concepts

[[Telegram Bot]] Integration,[[Daemon Boot]],[[Graceful Shutdown]],Opt-in Feature,Parallel Execution,Uptime Reporting

## Details

This feature, implemented in the `rahilsinghi/brain` repository (SHA: `e2cbaeb`) by [[Rahil Singhi]] on 2026-04-08, adds a Telegram bot to the Brain project's daemon. The integration ensures that the bot is started as part of the daemon's boot process and stopped during shutdown. Key aspects of this implementation include:

*   **Opt-in Mechanism**: The bot functionality is optional and only activates if a `bot_token` and non-empty `allowed_user_ids` are provided, enhancing security and configurability.
*   **Uptime Reporting**: The daemon captures its `startTime` upon boot, allowing for consistent and accurate uptime reporting for the bot and potentially other daemon services.
*   **Parallel Shutdown**: During the daemon's shutdown sequence, the server drain and the bot's stop command are executed concurrently. This parallel processing helps to minimize shutdown times and ensures a more responsive system.

The commit involved changes to 1 file, with 33 additions and 2 deletions.

## Related

[[brain — Git Activity]],[[Brain Project]],[[Daemon Entry Point with Graceful Shutdown]],[[Add Grammy Dependency for Telegram Bot]],[[Add Grammy Dependency for Telegram Bot (brain)]],[[Add TelegramConfig Type and Defaults]],[[API Server Factory with Graceful Drain]],[[API Health Check Endpoint (GET /health)]]
