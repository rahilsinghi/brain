---
title: Telegram Bot for Knowledge Ingestion and Queries (Brain Project)
author: ai
created_at: 2026-04-12T17:21:14.291Z
last_ai_edit: 2026-04-12T17:21:14.291Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-telegram-add-telegram-bot-for-knowledge-ingest-and-quer-98cc4b.md]]"
tags:
  - telegram
  - bot
  - grammy
  - knowledge
  - ingestion
  - queries
  - brain project
  - rahilsinghi/brain
  - authentication
  - commands
  - error handling
---

# Telegram Bot for Knowledge Ingestion and Queries (Brain Project)

A new Telegram bot, built using grammY, has been integrated into the [[brain]] project to facilitate knowledge ingestion and querying. This bot features prefix routing, user authentication via `allowed_user_ids`, standard commands, and robust error handling. It leverages core functions extracted from existing HTTP routes for efficient operation.

## Key Concepts

[[Telegram Bot]],[[grammY]],[[Prefix Routing]],[[User Authentication]],[[Telegram Bot Commands]],[[Knowledge Ingestion]],[[Knowledge Querying]],[[Text Truncation]],[[Voice Note Processing]],[[Error Handling]],[[Core Functions]],[[Software Testing]]

## Details

This feature introduces a new Telegram bot designed to interact with the [[brain]] knowledge base. The bot, implemented using the `grammY` framework, supports both knowledge ingestion and querying through a system of prefix routing (e.g., `?query` for queries and implicit prefix for ingestion).

Key features and technical details include:

*   **grammY Framework**: The bot is built on `grammY`, a modern Telegram bot framework for Node.js, providing a robust foundation for handling Telegram API interactions.
*   **Prefix Routing**: Distinguishes between query requests and ingestion tasks based on message prefixes, allowing for a single entry point for diverse interactions.
*   **User Authentication**: Implements an `allowed_user_ids` guard, restricting access to authorized users and enhancing security.
*   **Standard Commands**: Includes essential commands like `/start`, `/help`, and `/status` to provide user guidance and operational insights.
*   **Text Processing**: Features sentence-boundary truncation to manage message length and improve readability for responses.
*   **Voice Note Rejection**: Automatically rejects voice note inputs, focusing the bot's functionality on text-based interactions for knowledge processing.
*   **Error Handling**: Incorporates comprehensive error handling mechanisms to ensure stability and provide informative feedback in case of issues.
*   **Shared Core Functions**: Critical functions for ingestion (`ingest-core`) and health checks (`health-core`) have been extracted from existing HTTP routes, promoting code reuse and modularity.

This development involved changes across 19 files, adding 856 lines of code and removing 93. The implementation is supported by an extensive test suite, comprising 223 tests spread across 40 files, ensuring reliability and correctness.

*   **Repository**: [[brain]] (`rahilsinghi/brain`)
*   **Commit SHA**: `36aca24`
*   **Date**: 2026-04-08T19:40:58Z
*   **Author**: [[Rahil Singhi]]

## Related

[[brain]],[[Knowledge Ingestion]],[[Knowledge Querying]],[[Telegram Bot]],[[grammY]],[[Prefix Routing]],[[User Authentication]],[[Telegram Bot Commands]],[[Text Truncation]],[[Voice Note Processing]],[[Error Handling]],[[Core Functions]],[[HTTP Routes]],[[Software Testing]],[[Rahil Singhi]],Add Grammy Dependency for Telegram Bot (brain),CLAUDE.md Update: API Layer Status and Source File Tree (c7e91ad),CLAUDE.md Update: Gemini Provider, Test Count, and Source Files,CLAUDE.md Update: Gemini Provider, Test Count, and Source Files (Commit cfd4de5),CLAUDE.md Update: Page Flow, Theme System, and Key Files,CLAUDE.md Update: Page Flow, Theme System, and Key Files,CLAUDE.md Update: Seed & Activate Phases,CLAUDE.md Update with Telegram Bot Documentation,CLAUDE.md Telegram Bot Documentation Update (rahilsinghi/brain),Chore: Add Grammy Dependency for Telegram Bot
