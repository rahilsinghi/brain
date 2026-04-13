---
title: "Telegram Bot: Add /slides and /plot Commands"
author: ai
created_at: 2026-04-13T16:03:56.315Z
last_ai_edit: 2026-04-13T16:03:56.315Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-telegram-add-slides-and-plot-commands-with-two-messag-0cee36.md]]"
tags:
  - telegram
  - bot
  - commands
  - slides
  - plot
  - authentication
  - validation
  - file delivery
  - error handling
  - testing
  - brain project
---

# Telegram Bot: Add /slides and /plot Commands

This update introduces `/slides` and `/plot` commands to the Telegram bot in the `brain` project. These commands feature an authentication guard, input validation, an immediate 'Generating...' reply, and deliver generated content as `InputFile` documents or photos, complete with error fallback. The implementation includes extending HandlerDeps and TelegramBotDeps and is validated by 7 new tests, ensuring all 271 tests pass.

## Key Concepts

Telegram Bot Commands,Two-message pattern (Telegram),Authentication Guard,Input Validation,File Delivery (Telegram),Error Handling,Dependency Injection (HandlerDeps, TelegramBotDeps),Unit Testing

## Details

This commit (`5707175`) to the `rahilsinghi/brain` repository implements two new commands for the Telegram bot: `/slides` and `/plot`. The core functionality involves:

*   **Command Registration**: `bot.command("slides")` and `bot.command("plot")` are registered within the bot.
*   **Handler Functions**: `handleSlidesCommand` and `handlePlotCommand` are exported, encapsulating the logic for each command.
*   **Authentication**: Both commands are protected by an authentication guard to ensure only authorized users can invoke them.
*   **Input Validation**: The commands include empty-input validation, providing a better user experience.
*   **Two-Message Pattern**: An immediate 'Generating...' reply is sent to the user, followed by the actual content once it's ready. This prevents timeouts and indicates activity.
*   **Content Delivery**: Generated content is delivered as an `InputFile` using `replyWithDocument` for slides and `replyWithPhoto` for plots.
*   **Error Fallback**: Robust error handling is included to manage failures gracefully.
*   **Dependency Extension**: The `HandlerDeps` and `TelegramBotDeps` interfaces are extended with optional `generateSlidesFn` and `generatePlotFn` to support the new functionalities.
*   **Test Coverage**: The changes are accompanied by 7 new tests, contributing to a total of 271 passing tests, ensuring the reliability of the new features.

## Related

[[brain — Git Activity]],[[Brain Project: Daemon Entry Point with Graceful Shutdown]],[[Add Grammy Dependency for Telegram Bot (brain)]],[[Add Grammy Dependency for Telegram Bot (Brain Project)]],[[Rahil Singhi]],[[Add TelegramConfig Type and Defaults]]
