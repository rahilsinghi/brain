---
title: Git Commit Source Integration
author: ai
created_at: 2026-04-10T19:05:32.395Z
last_ai_edit: 2026-04-10T19:05:32.395Z
last_human_edit: null
last_embedded_hash: 7766d5790070455f
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-sources-add-git-commits-source-with-60-day-backfill-acr-1c385b.md]]"
tags:
  - git
  - commits
  - source
  - sync
  - backfill
  - github
  - api
  - wiki
  - knowledge-graph
  - automation
  - daemon
  - macos
  - error-handling
  - data-ingestion
---


# Git Commit Source Integration

This article details the implementation of a new `git-commits` synchronization source. It enables polling of GitHub commit data across active repositories, backfilling up to 60 days of history, and processing it into structured wiki articles, including knowledge graph edges through linked concepts, utilizing the Claude API.

## Key Concepts

`git-commits` source,Cursor-based polling,Historical data backfill,Knowledge graph generation,Per-item error handling,Slug truncation,`launchd` daemon,Claude API integration

## Details

This commit (`bfa63b9`) introduces a new `git-commits` source to ingest commit data from GitHub repositories.

### Core Functionality
The source polls the `/repos/{owner}/{repo}/commits` endpoint for each active repository using the `gh CLI`. It successfully ingested 601 commits from 15 repositories, compiling them into 15 per-repo wiki articles via the Claude API, complete with `[[wiki links]]` for knowledge graph edges.

### Key Features and Implementation Details
*   **New SyncSource:** `git-commits` with cursor-based polling and `skipStats` for efficient data retrieval.
*   **Historical Backfill:** A dedicated `pnpm seed:git-commits` step performs a 60-day historical backfill across all repositories.
*   **Daemonization:** The source operates as an hourly cron job, running alongside the existing [[GitHub Source]]. A `launchd` plist is provided for auto-starting the daemon on macOS login.
*   **Robustness:** Includes per-item error handling, ensuring that issues like `ENAMETOOLONG` errors no longer cause fatal failures.
*   **Content Formatting:** Implements slug truncation for verbose commit messages to maintain article readability.
*   **Testing:** The implementation is supported by 230 tests across 41 files, contributing to a total of 113 wiki articles and 648 vector chunks.

### Commit Metadata
*   **Repository:** `rahilsinghi/brain`
*   **SHA:** `bfa63b9`
*   **Date:** `2026-04-08T23:17:54Z`
*   **Author:** Rahil Singhi
*   **Co-Authored-By:** Claude Opus 4.6 <noreply@anthropic.com>
*   **Files Changed:** 27
*   **Additions:** +1496
*   **Deletions:** -35

## Related

[[Claude API]],[[GitHub Source]],[[Knowledge Graph]],[[Cursor-Based Polling]],[[Daemonization]]
