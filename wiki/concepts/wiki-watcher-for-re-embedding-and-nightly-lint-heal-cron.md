---
title: Wiki Watcher for Re-embedding and Nightly Lint/Heal Cron
author: ai
created_at: 2026-04-12T21:37:13.170Z
last_ai_edit: 2026-04-12T21:37:13.170Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-wire-wiki-watcher-for-re-embedding-and-nightly-lint-heal-48fac4.md]]"
tags:
  - wiki
  - watcher
  - cron
  - embedding
  - knowledge graph
  - maintenance
  - automation
  - brain project
  - file system monitoring
---

# Wiki Watcher for Re-embedding and Nightly Lint/Heal Cron

This feature introduces a wiki watcher that monitors `.md` file changes, re-embedding them into a VectorStore if necessary. It also sets up a nightly cron job to perform linting and healing operations on the knowledge base, preceded by a git snapshot for safety.

## Key Concepts

[[Wiki Watcher]],[[Chokidar]],[[VectorStore]],[[Document Embedding]],[[Cron Job]],[[Knowledge Graph Maintenance]],[[Git Snapshot]],[[Linting]],[[Healing Process]]

## Details

The `startWatchers` function is responsible for initializing both a `VectorStore` instance and a `chokidar` file watcher specifically for markdown files within the wiki. When a `.md` file undergoes changes, the watcher triggers a re-embedding process via `syncFile`, but only if `shouldReembed` returns true, indicating the file requires an update to its vector representation. The `close()` function ensures proper shutdown by tearing down both the wiki watcher and any other raw file watchers.

Furthermore, the `index.ts` file schedules a `node-cron` job, configured by `config.cron.lint_heal`. This scheduled task performs critical nightly maintenance. Its workflow includes taking a pre-heal git snapshot to preserve the state of the knowledge base, and then executing `runLintHeal`, which incorporates various guardrails defined in the project configuration to ensure the integrity and quality of the knowledge graph.

## Related

[[brain — Git Activity]],[[Chokidar File Watcher with Parse-Then-Compile Pipeline (Brain Project)]],[[Brain Project Phase 2 Hardening: Embed Safety, Connection Discovery, and Healer Tests (33a3510)]],[[Brain Project Phase 2 Hardening: Partial Embed Safety and Connection Discovery]],[[Automated Knowledge System Maintenance (d145456)]],[[Brain Repository: Pre-Heal Snapshot (2026-04-09)]],[[Brain Project: Connector for Cross-Reference Discovery and Daily Summaries]]
