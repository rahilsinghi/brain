---
title: Git Commits Source Integration and 60-Day Backfill
author: ai
created_at: 2026-04-13T15:05:59.684Z
last_ai_edit: 2026-04-13T15:05:59.684Z
last_human_edit: null
last_embedded_hash: 568265f92eb3ae12
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-sources-add-git-commits-source-with-60-day-backfill-acr-1c385b.md]]"
tags:
  - git
  - commits
  - syncsource
  - backfill
  - knowledge graph
  - wiki
  - daemon
  - cron
  - orchestrator
  - testing
  - brain
  - github
  - automation
---


# Git Commits Source Integration and 60-Day Backfill

This feature integrates a new `git-commits` source into the brain repository, enabling the ingestion of commit history from all active repositories. It includes a 60-day historical backfill mechanism and compiles ingested commits into per-repo wiki articles with [[wiki links]] to build a knowledge graph.

## Key Concepts

[[git-commits SyncSource]],Cursor-based polling,60-day historical backfill,Hourly cron job,Per-item error handling,Slug truncation,[[knowledge graph]],[[wiki links]],[[daemon]],[[orchestrator]]

## Details

A new `git-commits` SyncSource has been implemented within the `rahilsinghi/brain` repository (SHA: bfa63b9). This source is designed to poll `repos/{owner}/{repo}/commits` for each active repository using the `gh CLI`.

Key features and components of this integration include:

*   **Data Ingestion**: Initial seeding ingested 601 commits from 15 repositories, compiling them into 15 per-repo wiki articles. These articles incorporate `[[wiki links]]` to establish edges within the [[knowledge graph]].
*   **`SyncSource` Details**: The new `git-commits` SyncSource supports cursor-based polling and includes a `skipStats` option.
*   **Historical Backfill**: A `pnpm seed:git-commits` step allows for a 60-day historical backfill of commit data.
*   **Daemonization**: An hourly [[cron]] job integrates this source alongside existing GitHub sources, managed via a `launchd plist` for auto-start on macOS login.
*   **Orchestration Improvements**: The [[orchestrator]] now features per-item error handling, ensuring that issues like `ENAMETOOLONG` for verbose commit messages are no longer fatal to the entire process. Slug truncation is also applied for such messages.
*   **Testing**: The implementation is supported by 230 tests across 41 files, contributing to the system's robustness, which includes 113 wiki articles and 648 vector chunks.

This integration significantly enhances the `brain`'s ability to track and contextualize project development history.

## Related

[[brain]],[[CLAUDE.md for Project Context and Session Persistence]],[[Automated Data Ingestion and Wiki Maintenance]],[[Brain Repository Wiki Watcher and Nightly Operations]],[[Brain Project: Daemon Entry Point with Graceful Shutdown]],[[API: Embed HTTP Server in Daemon Boot with Graceful Shutdown]],[[Add Test Outputs for Validation Layer Testing]],[[Add .coverage and htmlcov to Gitignore]],[[Add Cluster Type and Transcription/Voice Configuration (Brain Project)]]
