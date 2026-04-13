---
title: Integrate Telegram Bot into Daemon Boot and Shutdown
author: ai
created_at: 2026-04-12T18:20:31.063Z
last_ai_edit: 2026-04-12T18:20:31.063Z
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
  - brain
  - uptime
  - opt-in
  - parallel-execution
---

# Integrate Telegram Bot into Daemon Boot and Shutdown

This feature integrates an opt-in Telegram bot into the daemon's boot and shutdown lifecycle within the `rahilsinghi/brain` repository. It ensures consistent uptime reporting and implements a robust parallel shutdown mechanism for both the server and the bot.

## Key Concepts

Telegram Bot Integration,Daemon Boot,Graceful Shutdown,Uptime Reporting,Opt-in Configuration,Parallel Execution

## Details

This commit (`e2cbaeb`) introduces a significant feature to the `[[Brain Project]]` by integrating a Telegram bot directly into the daemon's boot and shutdown processes.

### Opt-in Mechanism
The Telegram bot functionality is entirely opt-in. It will only be activated and run if both a `bot_token` and a non-empty list of `allowed_user_ids` are provided in the system configuration. This design ensures that the bot operates only when explicitly configured and intended, providing flexibility and security.

### Uptime Tracking
Upon daemon boot, a `startTime` timestamp is captured. This allows for accurate and consistent reporting of the daemon's uptime, which is crucial for monitoring system health and performance over time.

### Parallel Shutdown
The shutdown procedure has been enhanced for efficiency and reliability. During system termination, the server's draining process and the Telegram bot's stopping sequence are initiated concurrently. This parallel execution ensures that resources are released and services are gracefully terminated without one process having to wait synchronously for the other, leading to a faster and more robust shutdown.

## Related

[[Brain Project]],[[Brain Repo - Phase 4 Telegram Test Result]],[[Add Grammy Dependency for Telegram Bot (brain)]],[[CLAUDE.md Telegram Bot Documentation Update (rahilsinghi/brain)]],[[Add Voice Watcher, Daily Summary Cron, and System Activity Logging (Brain Project)]]
