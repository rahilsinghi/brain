---
title: Telegram Bot Integration into Daemon Boot and Shutdown
author: ai
created_at: 2026-04-10T17:40:00.018Z
last_ai_edit: 2026-04-10T17:40:00.018Z
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
  - integration
  - opt-in
  - uptime
  - parallel-execution
---

# Telegram Bot Integration into Daemon Boot and Shutdown

This commit integrates an opt-in Telegram bot into the daemon's boot and shutdown processes. The bot requires specific configuration (bot token and allowed user IDs) and captures the daemon's start time for accurate uptime reporting. Shutdown procedures are optimized with parallel execution for server draining and bot termination.

## Key Concepts

- **Daemon Integration:** Embedding a service (Telegram bot) within a background process's lifecycle.,- **Opt-in Feature:** Functionality that is only enabled when specific configuration parameters are provided.,- **Uptime Reporting:** Tracking the duration a system or service has been operational.,- **Parallel Shutdown:** Executing multiple shutdown tasks concurrently to improve efficiency.

## Details

This change introduces a Telegram bot into the daemon's operational lifecycle, specifically managing its startup and shutdown. The bot's functionality is **opt-in**, meaning it will only be initialized and run if both a `bot_token` and non-empty `allowed_user_ids` are present in the configuration.

Upon daemon boot, a `startTime` is captured. This timestamp is crucial for consistently calculating and reporting the daemon's uptime through the bot or other monitoring tools.

During daemon shutdown, a new **parallel shutdown** mechanism is implemented. This allows the process of draining existing server connections and gracefully stopping the Telegram bot to run concurrently, enhancing efficiency and potentially reducing shutdown times.

### Commit Details
- **Repository:** `rahilsinghi/brain`
- **SHA:** `e2cbaeb`
- **Date:** `2026-04-08T18:37:27Z`
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +33 lines
- **Deletions:** -2 lines

## Related

[[Telegram Bot]],[[Daemon]],[[System Integration]],[[Uptime Monitoring]]
