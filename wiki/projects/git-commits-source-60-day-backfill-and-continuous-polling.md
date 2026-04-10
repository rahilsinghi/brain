---
title: "Git Commits Source: 60-Day Backfill and Continuous Polling"
author: ai
created_at: 2026-04-10T02:07:33.561Z
last_ai_edit: 2026-04-10T02:07:33.561Z
last_human_edit: null
last_embedded_hash: 0bf49c2e16b023de
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-sources-add-git-commits-source-with-60-day-backfill-acr-1c385b.md]]"
tags:
  - git
  - sync-source
  - backfill
  - commits
  - knowledge-graph
  - daemon
  - cron
  - claude-api
  - wiki-generation
  - github-cli
  - launchd
  - cursor-polling
  - ingestion
  - brain-repo
---


# Git Commits Source: 60-Day Backfill and Continuous Polling

A new `git-commits` SyncSource was added to the brain repository that polls GitHub repositories for commit history using the GitHub CLI, enabling cursor-based incremental syncing and a 60-day historical backfill. The implementation ingested 601 commits across 15 repositories and compiled them into per-repo wiki articles via the Claude API, contributing to the knowledge graph via wiki links. Supporting infrastructure includes an hourly daemon, a macOS launchd plist for auto-start, and improved orchestrator error handling.

## Key Concepts

- **SyncSource (git-commits):** New data source that polls `/repos/{owner}/{repo}/commits` for each active repository via the GitHub CLI
- **Cursor-based polling:** Incremental sync mechanism that tracks position to avoid re-ingesting already-processed commits
- **60-day backfill:** Seed step (`pnpm seed:git-commits`) that ingests historical commit data going back 60 days
- **skipStats flag:** Option on the git-commits source to bypass statistical processing when not needed
- **Per-repo wiki articles:** Claude API compiles ingested commits into 15 individual wiki articles, one per repository
- **Wiki links / knowledge graph edges:** `[[wiki links]]` embedded in generated articles create navigable graph connections
- **Slug truncation:** Handles verbose commit messages by truncating slugs to avoid filesystem errors
- **ENAMETOOLONG handling:** Orchestrator now treats this error as non-fatal via per-item error handling
- **launchd plist:** macOS-native configuration for auto-starting the daemon on login
- **Hourly cron daemon:** Continuous polling schedule running alongside the existing GitHub source

## Details

## Overview

This commit introduces the `git-commits` SyncSource to the `rahilsinghi/brain` repository, extending the knowledge ingestion pipeline to include raw Git commit history from across all active repositories.

## Implementation Details

### Data Ingestion
- Uses the `gh` CLI to poll the GitHub API endpoint `/repos/{owner}/{repo}/commits` for each active repository
- 601 commits were ingested from 15 repositories during the initial backfill run
- Cursor-based polling ensures subsequent syncs only fetch new commits, avoiding duplication

### Seed Step
A dedicated seed script (`pnpm seed:git-commits`) performs the one-time 60-day historical backfill. This is run independently from the ongoing daemon.

### Daemon & Scheduling
- The git-commits daemon runs on an hourly cron schedule
- Runs in parallel with the existing GitHub source daemon
- A macOS `launchd` plist is included to automatically start the daemon on user login

### Wiki Article Generation
- The Claude API (co-authored: Claude Opus 4.6) compiles ingested commits into 15 per-repo wiki articles
- Articles include `[[wiki links]]` that form edges in the broader knowledge graph

### Orchestrator Improvements
- Per-item error handling prevents a single failure from halting the entire pipeline
- `ENAMETOOLONG` errors (caused by overly verbose commit message slugs) are now non-fatal
- Slug truncation logic added to prevent excessively long filenames

## Metrics (Post-Merge)
| Metric | Value |
|---|---|
| Commits ingested | 601 |
| Repositories processed | 15 |
| Wiki articles generated | 113 total (15 new per-repo) |
| Vector chunks | 648 |
| Test coverage | 230 tests across 41 files |
| Files changed in PR | 27 |
| Lines added | +1,496 |
| Lines removed | -35 |

## Commit Metadata
- **Repo:** rahilsinghi/brain
- **SHA:** `bfa63b9`
- **Date:** 2026-04-08T23:17:54Z
- **Author:** Rahil Singhi
- **Co-Author:** Claude Opus 4.6

## Related

- [[SyncSource Pipeline]]
- [[GitHub Source Daemon]]
- [[Knowledge Graph]]
- [[Claude API Integration]]
- [[Vector Chunks and Embeddings]]
- [[Wiki Article Generation]]
- [[Cursor-Based Polling]]
- [[macOS launchd Daemon]]
- [[Orchestrator Error Handling]]
- [[Seed Scripts]]
