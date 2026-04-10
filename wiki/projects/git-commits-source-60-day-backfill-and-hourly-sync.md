---
title: "Git-Commits Source: 60-Day Backfill and Hourly Sync"
author: ai
created_at: 2026-04-10T02:06:09.664Z
last_ai_edit: 2026-04-10T02:06:09.664Z
last_human_edit: null
last_embedded_hash: 6fc1f0a6e2b67b31
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-sources-add-git-commits-source-with-60-day-backfill-acr-1c385b.md]]"
tags:
  - git
  - sync-source
  - backfill
  - knowledge-graph
  - github
  - claude-api
  - daemon
  - cron
  - macos
  - launchd
  - vector-embeddings
  - wiki
  - ingestion
  - commits
---


# Git-Commits Source: 60-Day Backfill and Hourly Sync

A new `git-commits` SyncSource was added to the brain repository, enabling cursor-based polling of GitHub commit history across all active repos via the GitHub CLI. The feature includes a 60-day historical backfill seed step and an hourly daemon, ingesting 601 commits from 15 repositories and compiling them into 15 per-repo wiki articles via the Claude API. Supporting infrastructure includes per-item error handling, slug truncation, and a launchd plist for macOS auto-start.

## Key Concepts

- **SyncSource**: A modular data ingestion interface; `git-commits` is a new implementation using cursor-based polling
- **Cursor-based polling**: Incremental fetch strategy that tracks position in a data stream to avoid re-ingesting old records
- **60-day backfill**: A one-time seed step (`pnpm seed:git-commits`) to hydrate historical commit data
- **skipStats**: A flag on the git-commits source to bypass statistics collection during ingestion
- **Wiki links (`[[...]]`)**: Markdown-style links used to create knowledge graph edges between compiled articles
- **Slug truncation**: Shortening verbose commit message strings to produce valid, filesystem-safe article slugs
- **ENAMETOOLONG**: A previously fatal OS error caused by overly long file/slug names, now handled gracefully per-item
- **launchd plist**: A macOS-native configuration file enabling the sync daemon to auto-start on user login
- **Vector chunks**: Embeddings-ready text segments stored for semantic search; 648 chunks generated in this release

## Details

## Overview

Commit `bfa63b9` (2026-04-08) by Rahil Singhi introduces a `git-commits` SyncSource to the `rahilsinghi/brain` project. The change spans 27 files with +1496 additions and -35 deletions, co-authored with Claude Opus 4.6.

## Ingestion Pipeline

The source polls the GitHub API endpoint `/repos/{owner}/{repo}/commits` for each active repository using the `gh` CLI. On first run, a dedicated seed command performs a 60-day historical backfill:

```
pnpm seed:git-commits
```

After seeding, an hourly cron daemon takes over incremental syncing alongside the existing GitHub source.

## Knowledge Compilation

- **601 commits** ingested across **15 repositories**
- **15 per-repo wiki articles** generated via Claude API, each containing `[[wiki links]]` to form knowledge graph edges
- **113 total wiki articles** in the system post-merge
- **648 vector chunks** available for semantic search

## Engineering Improvements

| Area | Change |
|---|---|
| Error handling | Per-item error isolation in the orchestrator; `ENAMETOOLONG` is no longer fatal |
| Slug generation | Truncation applied to verbose commit messages to prevent filesystem errors |
| Daemon management | `launchd` plist added for automatic daemon startup on macOS login |
| Test coverage | 230 tests across 41 files |

## Source Configuration

The `git-commits` SyncSource exposes a `skipStats` option, allowing the ingestion pipeline to skip metric aggregation when not needed, improving throughput during large backfills.

## Related

- [[SyncSource Architecture]]
- [[GitHub CLI Integration]]
- [[Knowledge Graph]]
- [[Wiki Link Compilation]]
- [[Claude API Integration]]
- [[Vector Embeddings]]
- [[Daemon and Cron Scheduling]]
- [[launchd Configuration]]
- [[Cursor-Based Polling]]
- [[Brain Repository]]
