---
title: Telegram Bot for Knowledge Ingest and Queries (Brain Project)
author: ai
created_at: 2026-04-13T15:34:04.742Z
last_ai_edit: 2026-04-13T15:34:04.742Z
last_human_edit: null
last_embedded_hash: 0f04e8259e021f17
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-telegram-add-telegram-bot-for-knowledge-ingest-and-quer-98cc4b.md]]"
tags:
  - telegram
  - bot
  - grammy
  - knowledge management
  - ingestion
  - querying
  - brain project
  - api
  - testing
  - feature
---


# Telegram Bot for Knowledge Ingest and Queries (Brain Project)

This article details the implementation of a grammY-based Telegram bot for the Brain Project, enabling both knowledge ingestion and querying functionalities. The bot features prefix routing, user authentication, standard commands, robust error handling, and intelligent text processing for effective interaction. Core functions have been extracted from HTTP routes to ensure reusability and maintainability.

## Key Concepts

Telegram Bot,grammY Framework,Knowledge Ingestion,Knowledge Querying,Prefix Routing,User Authentication,Sentence Boundary Truncation,Error Handling,Code Reusability,Automated Testing

## Details

A new Telegram bot has been integrated into the [[Brain Project]] to facilitate knowledge management directly through a chat interface. Built using the `grammY` framework, this bot supports distinct functionalities based on message prefixes: `?` for querying existing knowledge and a default mode (or specific ingest prefix) for ingesting new information.

Key features of the Telegram bot include:
*   **Prefix Routing**: Differentiates between query requests (`?query`) and knowledge ingestion based on message content.
*   **User Authentication**: Implements `allowed_user_ids` to restrict access and ensure secure operation.
*   **Standard Commands**: Supports `/start`, `/help`, and `/status` commands for user guidance and operational insights.
*   **Text Processing**: Incorporates sentence-boundary truncation to manage input length and ensure context preservation, and explicitly rejects voice notes to maintain data quality.
*   **Robust Error Handling**: Includes mechanisms to gracefully manage and report errors during operation.

To enhance code reusability and modularity, core functions related to ingestion (`ingest-core`) and health checks (`health-core`) have been extracted from existing [[API Server Factory with Graceful Drain]] HTTP routes. This ensures that the logic is shared and consistent across different interfaces. The implementation is backed by a comprehensive test suite, with 223 tests distributed across 40 files, ensuring high reliability and stability.

## Related

[[Brain Project]],[[Add Grammy Dependency for Telegram Bot (Brain Project)]],[[Add Grammy Dependency for Telegram Bot (brain)]],[[Chore: Add Grammy Dependency for Telegram Bot]],[[Add source_id to RawFrontmatter and Create raw/ Subdirectories for Phase 3 (Brain Project)]],[[API: POST /ingest Route for Fire-and-Forget Ingestion]],[[Brain Project: Connector for Cross-Reference Discovery and Daily Summaries]],[[API Feature: GET /health Route with Status, Uptime, and Article Counts]],[[API Server Factory with Graceful Drain]]
