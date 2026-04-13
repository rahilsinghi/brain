---
title: Telegram Configuration and Defaults in Brain Repository
author: ai
created_at: 2026-04-11T00:29:38.614Z
last_ai_edit: 2026-04-11T00:29:38.614Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-telegram-add-telegramconfig-type-and-config-defaults-425543.md]]"
tags:
  - telegram
  - configuration
  - bot
  - brain
  - feature
  - defaults
  - environment-variables
---

# Telegram Configuration and Defaults in Brain Repository

This update introduces a `TelegramConfig` type and defines default settings for a Telegram bot within the [[brain — Git Activity]] repository. The bot is an opt-in feature, disabled by default unless a token and allowed user IDs are provided, supporting configuration via YAML or environment variables.

## Key Concepts

Telegram bot,Configuration management,Environment variables,Opt-in features

## Details

This commit (`04d0e8a`) by Rahil Singhi on 2026-04-08 adds the `TelegramConfig` type and establishes default configurations for the Telegram bot functionality in the `rahilsinghi/brain` repository. The key aspects of this update are:

*   **Opt-in Mechanism**: The Telegram bot is designed as an opt-in feature. It remains disabled if no `TELEGRAM_BOT_TOKEN` is provided or if the `allowed_user_ids` list is empty.
*   **Token Sourcing**: The Telegram bot token can be supplied either through the project's configuration YAML file or via the `TELEGRAM_BOT_TOKEN` environment variable.

This change involved modifications to 2 files, adding 12 lines of code.

## Related

[[brain — Git Activity]],[[CLAUDE.md Telegram Bot Documentation Update (rahilsinghi/brain)]]
