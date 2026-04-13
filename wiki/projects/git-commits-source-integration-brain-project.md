---
title: Git Commits Source Integration (Brain Project)
author: ai
created_at: 2026-04-11T00:06:01.761Z
last_ai_edit: 2026-04-11T00:06:01.761Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-sources-add-git-commits-source-with-60-day-backfill-acr-1c385b.md]]"
tags:
  - git
  - commits
  - data ingestion
  - knowledge graph
  - automation
  - daemon
  - brain project
  - claude
  - syncsource
  - backfill
---

# Git Commits Source Integration (Brain Project)

This update introduces a `git-commits` source to the `rahilsinghi/brain` project, enabling the ingestion of Git commit data from all active repositories. It automates the creation of per-repository wiki articles, enriching the knowledge graph with historical development insights and linking them via the [[Claude API]]. The system includes cursor-based polling, a 60-day historical backfill, and an hourly daemon for continuous updates.

## Key Concepts

[[git-commits source]],[[Cursor-based Polling]],[[Knowledge Graph]],[[Wiki Articles]],[[Claude API]],[[Daemon]],[[Orchestrator]],[[Slug Truncation]],[[launchd]],[[Error Handling]]

## Details

The `feat(sources): add git-commits source with 60-day backfill across all repos` commit (`bfa63b9`) in the [[rahilsinghi/brain]] repository by Rahil Singhi on 2026-04-08T23:17:54Z integrated a new data source for Git commits.

This source polls `/repos/{owner}/{repo}/commits` for each active repository using the `gh CLI`. As a result, 601 commits were ingested from 15 repositories, and these were then compiled into 15 per-repository wiki articles using the [[Claude API]], automatically generating [[wiki links]] to establish edges within the [[Knowledge Graph]].

Key features and implementations include:
*   **New SyncSource**: `git-commits` with cursor-based polling and a `skipStats` option.
*   **Seed Step**: `pnpm seed:git-commits` command for performing a 60-day historical backfill of commit data.
*   **Daemon**: An hourly cron job runs this source alongside the existing [[GitHub source]] for continuous updates.
*   **Orchestrator Enhancements**: Improved per-item [[error handling]] to prevent `ENAMETOOLONG` errors from being fatal.
*   **Slug Truncation**: Implemented for verbose commit messages to maintain data integrity and display consistency.
*   **macOS Auto-start**: A `launchd` plist was added for auto-starting the daemon upon macOS login.

The integration involved changes across 27 files, with 1496 additions and 35 deletions. The system currently boasts 230 tests across 41 files, contributing to 113 wiki articles and 648 vector chunks. This work was co-authored by Claude Opus 4.6.

## Related

[[rahilsinghi/brain]],[[Daemon Entry Point with Graceful Shutdown (rahilsinghi/brain)]],[[Automated Knowledge System Maintenance (d145456)]],[[CLAUDE.md for Claude Code Vault Integration]],[[Brain Explorer: Deep-Linking & Wikilink Navigation Feature]],[[Add .coverage and htmlcov to gitignore]],[[Job Tracker and Scraper Orchestrator]],[[API: Embedded HTTP Server with Graceful Shutdown]],[[GitHub source]]
