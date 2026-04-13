---
title: Git Commits Source Integration and 60-Day Backfill (Brain Project)
author: ai
created_at: 2026-04-12T17:06:18.272Z
last_ai_edit: 2026-04-12T17:06:18.272Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-sources-add-git-commits-source-with-60-day-backfill-acr-1c385b.md]]"
tags:
  - git
  - commits
  - source
  - backfill
  - automation
  - knowledge graph
  - brain project
  - claude
  - daemon
  - orchestration
  - macOS
---

# Git Commits Source Integration and 60-Day Backfill (Brain Project)

This commit introduces a new `git-commits` source to the `rahilsinghi/brain` project, enabling the ingestion of commit history from all active repositories. It performs a 60-day historical backfill and integrates new commits hourly, transforming them into individual wiki articles with interlinking via the [[Claude API]] to build a comprehensive [[Knowledge Graph]]. The system ingested 601 commits from 15 repositories, generating 113 new wiki articles.

## Key Concepts

[[Git Commits Source]],[[60-Day Backfill]],[[Cursor-Based Polling]],[[Daemon]],[[Orchestrator]],[[Slug Truncation]],[[Wiki Links]],[[Knowledge Graph]],[[Claude API]]

## Details

This feature, committed on 2026-04-08 by Rahil Singhi, adds a `git-commits` source to the `rahilsinghi/brain` repository. The primary goal is to automatically poll commit data from various repositories and transform it into structured wiki articles, enhancing the project's [[Knowledge Graph]].

**Key Features and Implementation:**

*   **New SyncSource:** Introduces `git-commits` as a new synchronization source, configured for [[Cursor-Based Polling]] and `skipStats` to optimize data ingestion.
*   **Historical Backfill:** A `pnpm seed:git-commits` command was added to perform a one-time 60-day historical backfill of commit data across all active repositories.
*   **Daemon Integration:** An hourly cron job (`[[Cron Job]]`) was set up alongside the existing GitHub source to ensure continuous and up-to-date commit ingestion.
*   **Orchestration:** The system's [[Orchestrator]] includes per-item error handling, preventing fatal errors from issues like `ENAMETOOLONG` (e.g., excessively long commit messages).
*   **Slug Truncation:** Implements [[Slug Truncation]] for verbose commit messages, ensuring clean and usable wiki article slugs.
*   **macOS Auto-Start:** A [[launchd]] plist is included to automatically start the daemon on macOS login, ensuring persistence.

**Outcomes:**

*   **Data Ingestion:** 601 commits were successfully ingested from 15 repositories.
*   **Wiki Article Generation:** These commits were compiled into 15 per-repo wiki articles using the [[Claude API]], automatically generating [[Wiki Links]] to establish relationships within the [[Knowledge Graph]].
*   **Testing:** The system is robust, with 230 tests across 41 files.
*   **Knowledge Base Expansion:** The integration resulted in 113 new wiki articles and 648 vector chunks added to the knowledge base.

This commit significantly enhances the `[[rahilsinghi/brain]]` project's ability to self-document and connect disparate pieces of information through automated commit analysis and wiki generation.

## Related

[[rahilsinghi/brain]],[[Claude API]],[[Knowledge Graph]],[[Daemon]],[[Orchestrator]],[[Cron Job]],[[Wikilink]],[[launchd]],[[gh CLI]],[[Cursor-Based Polling]],[[Slug Truncation]],[[Vector Chunks]]
