---
title: Git Commits Data Source Integration
author: ai
created_at: 2026-04-10T15:05:08.934Z
last_ai_edit: 2026-04-10T15:05:08.934Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-sources-add-git-commits-source-with-60-day-backfill-acr-1c385b.md]]"
tags:
  - git
  - commits
  - data source
  - backfill
  - automation
  - knowledge graph
  - wiki generation
  - gh cli
  - claude api
  - syncsource
  - daemon
  - orchestrator
  - macOS
  - rahil singhi
---

# Git Commits Data Source Integration

A new `git-commits` data source was added to the `rahilsinghi/brain` project, enabling the ingestion of 60 days of historical commit data from all repositories. This source utilizes the GitHub CLI for data retrieval and the Claude API to automatically generate linked wiki articles, significantly expanding the project's knowledge graph with commit-level details.

## Key Concepts

Git Commits Source,Data Backfill,GitHub CLI,Claude API,Knowledge Graph Edges,Cursor-based Polling,Per-item Error Handling,Daemon Automation,Slug Truncation

## Details

This entry details the integration of a new `git-commits` data source into the `rahilsinghi/brain` project.

### Overview
This feature, committed on **2026-04-08** by **Rahil Singhi** (co-authored by Claude Opus 4.6), introduces a `git-commits` source capable of performing a 60-day historical backfill of commit data across all active repositories. The primary goal is to enrich the project's [[Knowledge Graph]] by generating detailed wiki articles for each commit.

### Implementation Details
*   **Data Retrieval**: The system polls `/repos/{owner}/{repo}/commits` for each active repository, leveraging the `gh CLI` for efficient access.
*   **New SyncSource**: A `git-commits` SyncSource was implemented, featuring cursor-based polling and the `skipStats` option.
*   **Historical Backfill**: A dedicated `pnpm seed:git-commits` step handles the initial 60-day historical data ingestion.
*   **Daemonization**: An hourly cron job runs the daemon alongside existing GitHub data sources to ensure continuous updates.
*   **Orchestrator Improvements**: Enhanced per-item error handling prevents issues like `ENAMETOOLONG` from being fatal, improving data ingestion resilience.
*   **Content Generation**: The [[Claude API]] is utilized to compile ingested commit data into 15 per-repo [[Wiki Articles]], automatically creating [[wiki links]] for knowledge graph edges.
*   **Slug Truncation**: Verbose commit messages are now handled with slug truncation to maintain data consistency and usability.
*   **macOS Integration**: A `launchd plist` configuration allows for auto-starting the daemon upon macOS login.

### Impact and Results
*   **Ingestion Scale**: 601 commits were successfully ingested from 15 repositories.
*   **Wiki Output**: This process resulted in the creation of 113 new [[Wiki Articles]] and 648 vector chunks.
*   **Testing**: The new functionality is robust, supported by 230 tests across 41 files.

### Commit Details
*   **Repository**: `rahilsinghi/brain`
*   **SHA**: `bfa63b9`
*   **Date**: `2026-04-08T23:17:54Z`
*   **Files Changed**: 27
*   **Additions**: +1496
*   **Deletions**: -35

## Related

[[rahilsinghi/brain]],[[GitHub CLI]],[[Claude API]],[[Knowledge Graph]],[[Data Ingestion]],[[Wiki Article Generation]],[[Cursor-based Polling]],[[Daemon]]
