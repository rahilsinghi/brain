---
title: "Refactor: Extract ingestContent() into src/api/ingest-core.ts"
author: ai
created_at: 2026-04-10T02:56:48.185Z
last_ai_edit: 2026-04-10T02:56:48.185Z
last_human_edit: null
last_embedded_hash: d9b6fda2f01815d2
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-refactor-extract-ingestcontent-into-src-api-ingest-corets-5dbf4a.md]]"
tags:
  - refactor
  - ingestion
  - api
  - telegram
  - architecture
  - brain
  - typescript
  - content-pipeline
  - code-reuse
---


# Refactor: Extract ingestContent() into src/api/ingest-core.ts

This commit refactors the content ingestion logic in the rahilsinghi/brain repository by extracting a shared `ingestContent()` function into a dedicated module at `src/api/ingest-core.ts`. The refactor decouples core ingestion logic from the HTTP route handler, making it reusable across multiple consumers. This enables the Telegram bot to call the same ingestion logic directly without going through the HTTP layer.

## Key Concepts

- **ingestContent()**: A shared function responsible for writing raw articles with frontmatter to the knowledge base
- **ingest-core.ts**: New dedicated module housing the extracted core ingestion logic
- **Thin wrapper pattern**: The HTTP route is refactored to become a minimal wrapper around the shared core function
- **Code reuse**: Extracting shared logic allows multiple consumers (HTTP route, Telegram bot) to use the same ingestion pipeline
- **Frontmatter**: Structured metadata prepended to raw article content during ingestion

## Details

## Overview

Commit `c78b054` introduces a structural refactor to the content ingestion pipeline of the `rahilsinghi/brain` project. The core change is the extraction of ingestion logic into a reusable module.

## Changes

- **Files changed:** 3
- **Additions:** +142 lines
- **Deletions:** -41 lines
- **Date:** 2026-04-08
- **Author:** Rahil Singhi (Co-authored by Claude Sonnet 4.6)

## Motivation

Prior to this refactor, the logic for writing raw articles with frontmatter was likely embedded directly within the HTTP route handler. This tightly coupled the ingestion behavior to the HTTP transport layer, making it difficult to reuse from other entry points.

## What Changed

1. **New module `src/api/ingest-core.ts`** — Contains the extracted `ingestContent()` function that handles writing raw articles with frontmatter.
2. **HTTP route refactored** — The existing HTTP route becomes a thin wrapper that delegates to `ingestContent()`, keeping transport-layer concerns separate from business logic.
3. **Telegram bot enablement** — With the core logic now independently callable, the Telegram bot integration can invoke `ingestContent()` directly, bypassing the HTTP layer entirely.

## Architectural Impact

This refactor follows a clean separation of concerns pattern, isolating the ingestion domain logic from its transport mechanisms. It sets the foundation for multiple ingestion pathways (HTTP API, Telegram bot, and potentially others) sharing a single, consistent content pipeline.

## Related

- [[Brain Repository]]
- [[Telegram Bot Integration]]
- [[Content Ingestion Pipeline]]
- [[Frontmatter Schema]]
- [[API Architecture]]
- [[rahilsinghi/brain]]
