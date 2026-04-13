---
title: Git Commits SyncSource with 60-Day Backfill
author: ai
created_at: 2026-04-12T21:07:04.124Z
last_ai_edit: 2026-04-12T21:07:04.124Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-sources-add-git-commits-source-with-60-day-backfill-acr-1c385b.md]]"
tags:
  - git
  - commits
  - syncsource
  - brain project
  - backfill
  - cron
  - daemon
  - knowledge graph
  - claude api
  - wiki articles
  - data ingestion
---

# Git Commits SyncSource with 60-Day Backfill

This feature introduces a new `git-commits` SyncSource to the [[Brain Project]], enabling the ingestion and processing of commit data from all active repositories. It performs a 60-day historical backfill and runs hourly via a cron job, compiling commits into wiki articles using the [[Claude API]].

## Key Concepts

SyncSource,Git Commits,Historical Backfill,Knowledge Graph,Claude API,Cron Job,Daemon,Slug Truncation,Error Handling,Vector Chunks,Wiki Articles

## Details

A new `git-commits` SyncSource has been implemented for the [[Brain Project]] (`rahilsinghi/brain`) to automatically collect and process commit data. This feature performs the following:

*   **Data Collection**: Polls `/repos/{owner}/{repo}/commits` for each active repository using the `gh CLI`.
*   **Historical Backfill**: A `pnpm seed:git-commits` command allows for a 60-day historical backfill of commit data.
*   **Regular Sync**: Runs as an hourly cron job, alongside existing [[GitHub]] sources, to keep the data up-to-date.
*   **Ingestion Statistics**: Ingested 601 commits from 15 repositories, which were then compiled into 15 per-repository [[wiki articles]] using the [[Claude API]], generating [[wiki links]] for [[knowledge graph]] edges.
*   **Robustness**: Includes per-item error handling (e.g., `ENAMETOOLONG` is no longer fatal) and slug truncation for verbose commit messages.
*   **Automation**: A `launchd` plist has been added for auto-starting the daemon on macOS login.
*   **System Metrics**: The implementation led to an increase of 230 tests across 41 files, 113 [[wiki articles]], and 648 [[vector chunks]].

This enhancement significantly expands the scope of information ingested into the knowledge graph, providing a more comprehensive view of project development history.

## Related

[[Brain Project]],[[Claude API]],[[wiki articles]],[[knowledge graph]],[[GitHub]],[[Add Voice Watcher, Daily Summary Cron, and System Activity Logging (Brain Project)]],[[API: Embed HTTP Server in Daemon Boot with Graceful Shutdown]],[[Aggregate Chunk Embeddings for Per-Article Centroids]]
