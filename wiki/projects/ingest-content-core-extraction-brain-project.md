---
title: Ingest Content Core Extraction (brain project)
author: ai
created_at: 2026-04-11T00:13:27.925Z
last_ai_edit: 2026-04-11T00:13:27.925Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-refactor-extract-ingestcontent-into-src-api-ingest-corets-5dbf4a.md]]"
tags:
  - refactoring
  - api
  - code architecture
  - telegram bot
  - brain project
  - frontmatter
---

# Ingest Content Core Extraction (brain project)

This commit refactors the `ingestContent()` function into a dedicated core module, `src/api/ingest-core.ts`, within the `rahilsinghi/brain` repository. This change promotes code reuse by allowing both the HTTP ingestion route and the Telegram bot to leverage the same logic for writing raw articles with frontmatter.

## Key Concepts

[[ingestContent()]],[[Refactoring]],[[Frontmatter]],[[API Design]],[[Telegram Bot]],Code Reusability

## Details

The commit `c78b054` by Rahil Singhi, dated 2026-04-08, extracts the `ingestContent()` logic into a new file, `src/api/ingest-core.ts`. This refactoring separates the core content ingestion mechanism from its API endpoint, allowing the HTTP route to become a thin wrapper around the shared function.

The primary benefit of this extraction is enabling other services, such as a [[Telegram Bot]], to directly call the same robust logic for processing and writing raw articles that include frontmatter. This enhances modularity and reduces potential inconsistencies across different ingestion pathways.

**Commit Details:**
- **Repository:** [[brain]]
- **SHA:** `c78b054`
- **Date:** `2026-04-08T18:26:35Z`
- **Author:** [[Rahil Singhi]]
- **Files changed:** `3`
- **Additions:** `+142`
- **Deletions:** `-41`
- **Co-Authored-By:** [[Claude Sonnet 4.6]]

## Related

[[brain]],[[API: POST /ingest Route (Fire-and-Forget)]],[[API: POST /ingest Route for Fire-and-Forget Ingestion]],[[Defining Shared Types for Frontmatter, Config, and Compile Strategy]],[[Documentation Update: CLAUDE.md Telegram Bot]],[[Brain Repo - Phase 4 Telegram Test Result]],[[Claude Sonnet 4.6]],[[Rahil Singhi]]
