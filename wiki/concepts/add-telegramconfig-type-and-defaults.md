---
title: Add TelegramConfig Type and Defaults
author: ai
created_at: 2026-04-12T21:48:44.739Z
last_ai_edit: 2026-04-12T21:48:44.739Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-telegram-add-telegramconfig-type-and-config-defaults-425543.md]]"
tags:
  - telegram
  - configuration
  - bot
  - brain project
  - environment variables
  - yaml
---

# Add TelegramConfig Type and Defaults

This update introduces the `TelegramConfig` type and default settings for the Telegram bot within the `rahilsinghi/brain` project. It establishes an opt-in mechanism, allowing the bot to be enabled or disabled based on configuration, and specifies that the Telegram token can be sourced from a YAML file or an environment variable.

## Key Concepts

TelegramConfig type,Configuration defaults,Bot opt-in mechanism,Environment variables,YAML configuration

## Details

The `rahilsinghi/brain` repository received an update (commit `04d0e8a`) that integrates the `TelegramConfig` type and establishes default configuration values for the Telegram bot. This new configuration is designed to make the bot's functionality opt-in.

Key aspects of this implementation include:
*   **Opt-in Mechanism**: The bot is disabled by default if the provided token is `null` or if the `allowed_user_ids` list is empty. This ensures that the bot only becomes active when explicitly configured.
*   **Token Sourcing**: The `TELEGRAM_BOT_TOKEN` can be defined in two ways: either loaded from a configuration YAML file or retrieved from the `TELEGRAM_BOT_TOKEN` environment variable. This provides flexibility for deployment and secret management.

## Related

[[Chore: Add Grammy Dependency for Telegram Bot (brain)]],[[CLAUDE.md Telegram Bot Documentation Update (rahilsinghi/brain)]],[[Brain Project]]
