---
title: Git Commits Source and 60-Day Backfill for Brain Project
author: ai
created_at: 2026-04-13T17:06:51.933Z
last_ai_edit: 2026-04-13T17:06:51.933Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-sources-add-git-commits-source-with-60-day-backfill-acr-1c385b.md]]"
tags:
  - brain project
  - git
  - commits
  - data ingestion
  - backfill
  - knowledge graph
  - claude api
  - daemon
  - cron job
  - github
  - syncsource
---

# Git Commits Source and 60-Day Backfill for Brain Project

This feature introduces a new `git-commits` source to the Brain Project, enabling the ingestion of historical commit data from GitHub repositories. It performs a 60-day backfill, processing commits from 15 repositories and compiling them into wiki articles with generated wikilinks, contributing to the knowledge graph via the Claude API.

## Key Concepts

git-commits SyncSource,60-day historical backfill,Knowledge Graph,Claude API,Cursor-based polling,Per-item error handling,Slug truncation,launchd plist (macOS daemon),Hourly cron job

## Details

The `git-commits` source is a new `SyncSource` implemented in the `rahilsinghi/brain` repository (SHA `bfa63b9`, committed on `2026-04-08` by Rahil Singhi). It polls `repos/{owner}/{repo}/commits` for each active repository using the `gh CLI`.

Upon its introduction, 601 commits were ingested from 15 repositories, resulting in 15 per-repository wiki articles. These articles were generated using the Claude API, with automatic [[wiki links]] created to establish connections within the knowledge graph.

Key features and implementations include:
*   **New SyncSource**: `git-commits` with cursor-based polling and `skipStats`.
*   **Seed Step**: `pnpm seed:git-commits` command for an initial 60-day historical backfill.
*   **Daemon Integration**: An hourly cron job for continuous updates, running alongside the existing GitHub source.
*   **Orchestrator Enhancements**: Improved per-item error handling to prevent fatal failures, specifically addressing `ENAMETOOLONG` errors.
*   **Slug Truncation**: Implemented for verbose commit messages to ensure readability and system compatibility.
*   **macOS Daemon**: A `launchd` plist configuration ensures the daemon auto-starts on macOS login.

This update involved changes across 27 files, with 1496 additions and 35 deletions, contributing to a total of 230 tests across 41 files, 113 wiki articles, and 648 vector chunks within the Brain Project.

## Related

[[Brain Project]],[[Claude API]],[[Knowledge Graph]],[[API: Embed HTTP Server in Daemon Boot with Graceful Shutdown]],[[Add Voice Watcher, Daily Summary Cron, and System Activity Logging (Brain Project)]]
