---
title: Telegram Bot Integration into Brain Daemon Lifecycle
author: ai
created_at: 2026-04-13T16:13:06.374Z
last_ai_edit: 2026-04-13T16:13:06.374Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-telegram-integrate-bot-into-daemon-boot-and-shutdown-c68be7.md]]"
tags:
  - telegram
  - bot
  - daemon
  - integration
  - lifecycle
  - shutdown
  - uptime
  - brain project
---

# Telegram Bot Integration into Brain Daemon Lifecycle

This article details the integration of a Telegram bot directly into the Brain project's daemon boot and shutdown process. The bot is opt-in, requiring specific configuration, and features consistent uptime reporting by capturing the daemon's start time. Crucially, its shutdown is managed concurrently with other services, ensuring a graceful and efficient termination of all components.

## Key Concepts

Telegram Bot Integration,Daemon Lifecycle Management,Opt-in Configuration,Uptime Reporting,Parallel Shutdown

## Details

This commit (`e2cbaeb`) to the [[Brain Project]] repository introduces the core functionality for integrating a Telegram bot into the daemon's operational lifecycle. The integration is designed to be opt-in, meaning the bot will only activate if a `bot_token` is provided and `allowed_user_ids` are configured and non-empty. This ensures security and control over who can interact with the bot.

A key feature of this integration is the capture of the daemon's `startTime` at boot. This timestamp is crucial for providing consistent and accurate uptime reporting for the bot service. During the shutdown sequence, the bot's termination process (`bot stop`) runs concurrently with other daemon shutdown procedures, such as draining the API server. This 'parallel shutdown' approach aims to improve the overall efficiency and responsiveness of the system's graceful termination, preventing bottlenecks and ensuring all services cease operation smoothly.

## Related

[[Brain Project]],[[Add Grammy Dependency for Telegram Bot (Brain Project)]],[[Add TelegramConfig Type and Defaults]],[[API Server Factory with Graceful Shutdown]],[[Brain Project Phase 5: Knowledge Compounding, Telegram Formatting, and Explorer Spec]]
