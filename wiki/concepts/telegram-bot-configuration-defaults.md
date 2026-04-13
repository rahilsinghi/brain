---
title: Telegram Bot Configuration Defaults
author: ai
created_at: 2026-04-12T17:47:55.149Z
last_ai_edit: 2026-04-12T17:47:55.149Z
last_human_edit: null
last_embedded_hash: 9796313cbb06a1c2
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-telegram-add-telegramconfig-type-and-config-defaults-425543.md]]"
tags:
  - telegram
  - configuration
  - bot
  - brain
  - feat
  - environmentvariables
---


# Telegram Bot Configuration Defaults

This commit introduces the `TelegramConfig` type and default configuration settings for the Telegram bot within the `rahilsinghi/brain` project. It establishes a clear mechanism to enable or disable the bot based on the presence of a token and `allowed_user_ids`.

## Key Concepts

[[TelegramConfig]],Telegram Bot,Configuration Management,Environment Variables,YAML Configuration

## Details

This feature (`feat(telegram)`) introduces the `TelegramConfig` type and establishes default configuration behaviors for the Telegram bot integrated into the [[Brain Project]] (`rahilsinghi/brain`).

The bot's operational status is now 'opt-in', meaning it will be disabled under two conditions:

*   **Null Token**: If the `TELEGRAM_BOT_TOKEN` is not provided.
*   **Empty `allowed_user_ids`**: If the list of `allowed_user_ids` is empty.

The `TELEGRAM_BOT_TOKEN` can be sourced either from a configuration YAML file or directly from the `TELEGRAM_BOT_TOKEN` environment variable, offering flexibility in deployment and secret management. This update was part of commit `04d0e8a` by Rahil Singhi on 2026-04-08.

## Related

[[Brain Project]],[[Add Grammy Dependency for Telegram Bot (brain)]],[[CLAUDE.md Telegram Bot Documentation Update (rahilsinghi/brain)]],[[Telegram Bot]]
