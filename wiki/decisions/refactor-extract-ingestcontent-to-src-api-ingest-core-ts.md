---
title: "Refactor: Extract `ingestContent()` to `src/api/ingest-core.ts`"
author: ai
created_at: 2026-04-12T17:19:08.643Z
last_ai_edit: 2026-04-12T17:19:08.643Z
last_human_edit: null
last_embedded_hash: bc7ce7068d3694f3
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-refactor-extract-ingestcontent-into-src-api-ingest-corets-5dbf4a.md]]"
tags:
  - refactoring
  - code architecture
  - api
  - telegram bot
  - brain project
  - ingestion
  - frontmatter
  - code reusability
---


# Refactor: Extract `ingestContent()` to `src/api/ingest-core.ts`

This refactoring centralized the `ingestContent()` function into a dedicated core API file, enabling its reuse across different parts of the [[Brain Project]]. It transforms the HTTP ingestion route into a thin wrapper and facilitates direct calls from components like the [[Telegram Bot]].

## Key Concepts

Refactoring,Code Reusability,API Design,Modularization,Frontmatter

## Details

This commit (`c78b054`) on `2026-04-08` by Rahil Singhi (co-authored by Claude Sonnet 4.6) involved extracting the `ingestContent()` logic into `src/api/ingest-core.ts` within the `rahilsinghi/brain` repository. The change resulted in 142 additions and 41 deletions across 3 files. The primary motivation was to create a shared function for writing raw articles, complete with [[Frontmatter]], thereby making the HTTP ingestion route a simplified wrapper. This architectural change also allows direct invocation of the same ingestion logic by the [[Telegram Bot]], promoting code reusability and consistency across different interfaces.

## Related

[[Brain Project]],[[Telegram Bot]],[[API]],[[ingestContent()]],[[src/api/ingest-core.ts]],[[Frontmatter]]
