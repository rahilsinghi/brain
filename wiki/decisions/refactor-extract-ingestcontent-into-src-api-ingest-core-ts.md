---
title: "Refactor: Extract ingestContent() into src/api/ingest-core.ts"
author: ai
created_at: 2026-04-10T02:57:39.732Z
last_ai_edit: 2026-04-10T02:57:39.732Z
last_human_edit: null
last_embedded_hash: ac34a1a5316b1b18
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-refactor-extract-ingestcontent-into-src-api-ingest-corets-5dbf4a.md]]"
tags:
  - refactor
  - ingestion
  - api
  - telegram
  - architecture
  - typescript
  - brain-repo
  - ingest-core
  - co-authored-ai
  - thin-wrapper
---


# Refactor: Extract ingestContent() into src/api/ingest-core.ts

This commit refactors the content ingestion logic in the rahilsinghi/brain repository by extracting a shared `ingestContent()` function into a dedicated `ingest-core.ts` module. The HTTP route is reduced to a thin wrapper around this core function, enabling reuse across multiple consumers. This change specifically enables the Telegram bot to call the same ingestion logic directly without going through the HTTP layer.

## Key Concepts

- **ingestContent()**: A shared core function responsible for writing raw articles with frontmatter to the knowledge base
- **ingest-core.ts**: New module located at `src/api/ingest-core.ts` that houses the extracted shared ingestion logic
- **Thin wrapper pattern**: Architectural pattern where HTTP route handlers delegate to a core function, reducing duplication
- **Frontmatter**: Metadata written at the top of raw articles, managed by the ingestContent function
- **Telegram bot integration**: Secondary consumer of ingestContent(), now able to call ingestion logic directly without HTTP overhead
- **Co-authorship with AI**: Commit was co-authored with Claude Sonnet 4.6, indicating AI-assisted development

## Details

## Overview

Commit `c78b054` in the `rahilsinghi/brain` repository introduces a structural refactor to the content ingestion pipeline. The core change is the extraction of a reusable `ingestContent()` function into a new file at `src/api/ingest-core.ts`.

## Motivation

Prior to this change, the logic for writing raw articles with frontmatter was likely coupled directly to the HTTP route handler. This made it impossible to reuse the same logic from other entry points, such as a Telegram bot, without duplicating code or routing requests through HTTP.

## Changes

| Metric | Value |
|--------|-------|
| Files changed | 3 |
| Lines added | +142 |
| Lines deleted | -41 |
| Net change | +101 lines |

## Architectural Impact

- **Before**: Ingestion logic was embedded in the HTTP route handler
- **After**: Core logic lives in `ingest-core.ts`; HTTP route becomes a thin wrapper
- **Benefit**: The Telegram bot can now call `ingestContent()` directly, sharing the same article writing and frontmatter logic

## Key File

**`src/api/ingest-core.ts`** — New module exporting the `ingestContent()` function responsible for:
- Accepting raw article content
- Attaching frontmatter metadata
- Writing the article to the knowledge base

## Development Notes

This commit was co-authored with Claude Sonnet 4.6, reflecting an AI-assisted development workflow integrated into the project.

## Related

- [[rahilsinghi/brain Repository]]
- [[Telegram Bot Integration]]
- [[Content Ingestion Pipeline]]
- [[Frontmatter Handling]]
- [[API Route Architecture]]
- [[AI-Assisted Development]]
- [[Knowledge Base Architecture]]
