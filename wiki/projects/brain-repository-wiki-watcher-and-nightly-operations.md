---
title: Brain Repository Wiki Watcher and Nightly Operations
author: ai
created_at: 2026-04-10T22:13:00.525Z
last_ai_edit: 2026-04-10T22:13:00.525Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-wire-wiki-watcher-for-re-embedding-and-nightly-lint-heal-48fac4.md]]"
tags:
  - wiki watcher
  - re-embedding
  - cron job
  - linting
  - healing
  - chokidar
  - vectorstore
  - automation
  - git snapshot
  - brain repository
---

# Brain Repository Wiki Watcher and Nightly Operations

This feature introduces a wiki watcher to the `rahilsinghi/brain` repository, enabling automatic re-embedding of modified Markdown files into a VectorStore. It also schedules a nightly cron job to perform linting and healing operations, preceded by a Git snapshot for safety.

## Key Concepts

Wiki Watcher,Re-embedding,VectorStore,Chokidar,Node-cron,Linting,Healing,Git Snapshot,Automatic Syncing

## Details

This enhancement to the `rahilsinghi/brain` repository implements a robust system for wiki content management and maintenance:

*   **Wiki Watcher Implementation:** The `startWatchers` function now initializes a `VectorStore` and sets up a `chokidar`-based wiki watcher. This watcher continuously monitors `.md` files for changes. Upon detecting a modification, it triggers a re-embedding process via `syncFile`, contingent on `shouldReembed` returning true, ensuring the VectorStore remains up-to-date with wiki content.
*   **Resource Management:** A new `close()` method has been added to gracefully tear down the wiki watcher, ensuring proper resource release alongside the existing raw watcher teardown process.
*   **Nightly Lint/Heal Cron Job:** The `index.ts` file now includes functionality to schedule a `node-cron` job. This job is configured to run based on the `config.cron.lint_heal` settings, typically nightly. Before executing the `runLintHeal` operation, the cron job automatically takes a pre-heal `git snapshot`. This snapshot acts as a safety measure, allowing for a reversible healing process governed by configured guardrails.

## Related

[[rahilsinghi/brain]],[[VectorStore]],[[Chokidar]],[[Node-cron]],[[Linting]],[[Healing]],[[Git Snapshots]],[[Re-embedding]]
