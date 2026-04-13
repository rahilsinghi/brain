---
title: Wiki Watcher for Re-embedding and Nightly Lint/Heal Cron
author: ai
created_at: 2026-04-13T15:55:26.763Z
last_ai_edit: 2026-04-13T15:55:26.763Z
last_human_edit: null
last_embedded_hash: 983bac2993c2f881
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-wire-wiki-watcher-for-re-embedding-and-nightly-lint-heal-48fac4.md]]"
tags:
  - wiki watcher
  - re-embedding
  - cron job
  - linting
  - healing
  - brain project
  - automation
  - vectorstore
  - chokidar
  - git snapshot
  - node-cron
---


# Wiki Watcher for Re-embedding and Nightly Lint/Heal Cron

This feature introduces a comprehensive wiki watcher system to the Brain project, enabling automatic re-embedding of `.md` files upon changes. It also schedules a nightly cron job for linting and healing operations, ensuring data consistency and integrity, preceded by a git snapshot for state preservation.

## Key Concepts

[[Wiki Watcher]],[[VectorStore]],[[Chokidar]],[[Re-embedding]],[[Lint/Heal Cron]],[[Git Snapshot]],[[Node-cron]],[[Config Guardrails]]

## Details

This implementation for the `rahilsinghi/brain` repository (SHA: `ec23707`, dated `2026-04-04T00:19:13Z`, authored by Rahil Singhi with Claude Sonnet 4.6) significantly enhances the project's data management and maintenance capabilities. Key changes include:

*   **Wiki Watcher Initialization**: The `startWatchers` function now initializes a [[VectorStore]] along with a [[Chokidar]]-based wiki watcher. This watcher monitors changes to `.md` files within the wiki.
*   **On-Change Re-embedding**: When a `.md` file is modified, the system triggers a re-embedding process via `syncFile`, provided that the `shouldReembed` condition evaluates to true. This ensures that the [[VectorStore]] remains up-to-date with the latest content.
*   **Graceful Shutdown**: The `close()` function has been updated to properly tear down the wiki watcher in addition to the existing raw watcher, ensuring clean resource management.
*   **Nightly Lint/Heal Cron Job**: The `index.ts` script now schedules a [[Node-cron]] job configured via `config.cron.lint_heal`. This job performs critical nightly maintenance:
    *   It first takes a [[Git Snapshot]] of the repository, capturing the state before maintenance begins.
    *   Subsequently, it executes `runLintHeal` operations, applying linting and healing routines to maintain data quality and consistency, all governed by [[Config Guardrails]].

This feature is crucial for [[Automated Knowledge System Maintenance]] within the [[Brain Project]], ensuring that the knowledge graph remains current and error-free.

## Related

[[Brain Project]],[[Brain Repository Wiki Watcher and Nightly Operations]],[[Automated Knowledge System Maintenance (d145456)]],[[Brain Repository: Pre-Heal Snapshot (2026-04-09)]],[[Automated Data Ingestion and Wiki Maintenance]],[[Brain Project: Wiki Article Compilation and Embedding Enhancement]],[[VectorStore]],[[Chokidar]],[[Re-embedding]],[[SyncFile]],[[Lint/Heal Cron]],[[Git Snapshot]],[[Node-cron]],[[Config Guardrails]]
