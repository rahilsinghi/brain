---
title: "Telegram: New /slides and /plot Commands with Two-Message Pattern"
author: ai
created_at: 2026-04-13T17:23:36.351Z
last_ai_edit: 2026-04-13T17:23:36.351Z
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
  - generation
  - messaging
  - ux
  - error handling
  - authentication
  - testing
  - brain project
---

# Telegram: New /slides and /plot Commands with Two-Message Pattern

This update introduces `/slides` and `/plot` commands to the Brain Project's Telegram Bot, enabling users to generate and receive content directly through chat. It implements a robust two-message pattern, providing immediate 'Generating...' feedback and delivering the generated slides or plots as documents or photos. The feature includes authentication, input validation, and comprehensive error handling.

## Key Concepts

[[Telegram Bot]] Commands (`/slides`, `/plot`),Two-Message Pattern for User Interaction,Authentication Guard,Empty Input Validation,InputFile Delivery (`replyWithDocument`, `replyWithPhoto`),Error Fallback Mechanism,Dependency Injection (optional generation functions),Unit Testing

## Details

This commit (SHA: 5707175), authored by Rahil Singhi for the `rahilsinghi/brain` repository on 2026-04-09, significantly enhances the [[Brain Project]]'s [[Telegram Bot]] by adding two new interactive commands: `/slides` and `/plot`.

The core interaction model for these commands utilizes a 'two-message pattern' to improve user experience:
1.  **Immediate Acknowledgment**: Upon receiving a `/slides` or `/plot` command, the bot promptly sends a 'Generating...' message, informing the user that their request is being processed.
2.  **Content Delivery**: Once the generation process is complete, the bot delivers the requested content. Slides are sent using `replyWithDocument`, and plots are sent via `replyWithPhoto`, both as `InputFile` objects.

Key features and implementation details include:
*   **Command Registration**: The bot registers `bot.command("slides")` and `bot.command("plot")` to listen for these specific user inputs.
*   **Handler Functions**: Dedicated `handleSlidesCommand` and `handlePlotCommand` functions are responsible for the command's logic.
*   **Authentication Guard**: An integrated authentication mechanism ensures that only authorized users can execute these commands, maintaining system security.
*   **Empty Input Validation**: The system checks for and validates user input, preventing commands from proceeding with empty or invalid parameters.
*   **Error Fallback**: Robust error handling is in place to gracefully manage any issues during content generation or delivery, providing informative feedback to the user.

To ensure extensibility and testability, the system extends `HandlerDeps` and `TelegramBotDeps` to include optional `generateSlidesFn` and `generatePlotFn`. This allows for dependency injection of the actual content generation logic, making the system modular and easy to mock for testing. The commit involved changes across 2 files, with a net addition of 157 lines of code. This update introduced 7 new tests, and all 271 existing tests successfully passed, affirming the stability and correctness of the new features.

## Related

[[Brain Project]],[[Telegram Bot]],[[Authentication Guard]],[[Dependency Injection]],[[Unit Testing]],[[Command Line Interface]]
