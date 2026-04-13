---
title: "Refactor: Extract `ingestContent()` to `src/api/ingest-core.ts`"
author: ai
created_at: 2026-04-11T00:13:07.293Z
last_ai_edit: 2026-04-11T00:13:07.293Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-refactor-extract-ingestcontent-into-src-api-ingest-corets-5dbf4a.md]]"
tags:
  - refactoring
  - api
  - code structure
  - ingestion
  - telegram bot
  - brain project
---

# Refactor: Extract `ingestContent()` to `src/api/ingest-core.ts`

This refactoring extracts the core `ingestContent()` logic into a dedicated module, `src/api/ingest-core.ts`, within the `rahilsinghi/brain` repository. This promotes code reuse by allowing the HTTP ingestion route to become a thin wrapper and enabling direct calls from other components, such as a Telegram bot, for consistent content ingestion.

## Key Concepts

API Refactoring,Code Reusability,Content Ingestion,HTTP API Wrapper,Telegram Bot Integration

## Details

This commit (`c78b054`) on April 8, 2026, by Rahil Singhi, introduces a significant refactoring within the `rahilsinghi/brain` repository. The core logic for ingesting content, previously embedded directly within the HTTP API route, has been extracted into a new shared function located at `src/api/ingest-core.ts`.

The primary motivation for this change is to improve code reusability and maintainability. By centralizing the `ingestContent()` functionality, the HTTP route (`/ingest`) now acts as a thin wrapper, delegating the actual ingestion process to this shared module. This architectural decision has several benefits:

*   **Consistency**: Ensures that all content ingestion paths, regardless of their origin (e.g., HTTP requests, internal processes, or external integrations), utilize the same robust logic for writing raw articles with frontmatter.
*   **Modularity**: Decouples the ingestion logic from the API endpoint, making both components easier to understand, test, and maintain independently.
*   **Extensibility**: Crucially, it enables other components, such as a [[Documentation Update: CLAUDE.md Telegram Bot]] or other bot-driven interfaces, to directly call the `ingestContent()` function. This avoids duplication of code and ensures a consistent ingestion experience across different interaction points.

The commit involved changes across 3 files, adding 142 lines of code and deleting 41, reflecting the relocation and restructuring of the ingestion pipeline.

Co-Authored-By: Claude Sonnet 4.6

## Related

[[brain — Git Activity]],[[API: POST /ingest Route (Fire-and-Forget)]],[[API Server Factory with Graceful Drain]],[[Documentation Update: CLAUDE.md Telegram Bot]],[[Brain Repository: Unstructured Content Copier with Frontmatter Injection]],[[Defining Shared Types for Frontmatter, Config, and Compile Strategy]],[[CLAUDE.md Update: Composite Tool Architecture and Session Persistence]]
