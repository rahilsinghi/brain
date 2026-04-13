---
title: "Refactoring Ingestion Logic: Extracting ingestContent() to ingest-core.ts"
author: ai
created_at: 2026-04-13T15:32:03.363Z
last_ai_edit: 2026-04-13T15:32:03.363Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-refactor-extract-ingestcontent-into-src-api-ingest-corets-5dbf4a.md]]"
tags:
  - refactoring
  - code organization
  - api
  - telegram
  - ingestion
  - brain project
  - backend
  - reusability
---

# Refactoring Ingestion Logic: Extracting ingestContent() to ingest-core.ts

This refactoring extracts the core content ingestion logic into a shared module, `src/api/ingest-core.ts`, within the [[Brain Project]]. This design change allows the HTTP API route to act as a thin wrapper and enables other components, such as a [[Telegram Bot Integration]], to directly utilize the same ingestion functionality.

## Key Concepts

[[Refactoring]],[[Code Reusability]],[[API Design]],[[Module Extraction]],[[Content Ingestion]]

## Details

The commit `c78b054` in the `rahilsinghi/brain` repository, authored by Rahil Singhi on 2026-04-08, involved extracting the `ingestContent()` function into a dedicated module: `src/api/ingest-core.ts`. This move was motivated by the need to centralize the logic for writing raw articles, including the handling of frontmatter.

Prior to this change, the HTTP route likely contained the full ingestion logic. By extracting it, the HTTP API (`API: POST /ingest Route for Fire-and-Forget Ingestion`) now serves as a minimalist wrapper, primarily handling request parsing and error management, while delegating the core processing to `ingest-core.ts`. A significant benefit of this refactoring is enabling the [[Telegram Bot Integration]] to call the identical ingestion logic directly, promoting consistency and reducing duplication across different interaction points with the [[Brain Project]]'s ingestion pipeline. This contributes to a cleaner architecture and improved maintainability.

## Related

[[Brain Project]],[[API: POST /ingest Route (Fire-and-Forget)]],[[API: POST /ingest Route for Fire-and-Forget Ingestion]],[[Add Grammy Dependency for Telegram Bot (Brain Project)]],[[Brain Project: Phase 4 Telegram Test Result]],[[TelegramConfig Type and Defaults]]
