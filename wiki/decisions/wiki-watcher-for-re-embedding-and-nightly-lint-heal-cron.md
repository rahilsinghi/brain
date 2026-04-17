---
title: Wiki Watcher for Re-embedding and Nightly Lint/Heal Cron
author: ai
created_at: 2026-04-10T18:13:18.240Z
last_ai_edit: 2026-04-10T18:13:18.240Z
last_human_edit: null
last_embedded_hash: 22754fffa88781c5
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-wire-wiki-watcher-for-re-embedding-and-nightly-lint-heal-48fac4.md]]"
tags:
  - wiki
  - watcher
  - embedding
  - cron
  - linting
  - healing
  - automation
  - backend
  - chokidar
  - vectorstore
  - git
---


# Wiki Watcher for Re-embedding and Nightly Lint/Heal Cron

This feature introduces a wiki watcher that automatically re-embeds modified Markdown files into a VectorStore, improving data freshness. Additionally, it schedules a nightly cron job to perform linting and healing operations, preceded by a Git snapshot for safety.

## Key Concepts

*   Wiki Watcher,*   Automatic Re-embedding,*   Nightly Cron Job,*   Linting and Healing,*   VectorStore,*   Chokidar,*   Node-cron,*   Git Snapshot

## Details

This update, originating from commit `ec23707` in the `rahilsinghi/brain` repository by Rahil Singhi, introduces significant automation enhancements:

*   **Wiki Watcher Implementation**: The `startWatchers` function has been augmented to initialize a `VectorStore` alongside a `chokidar` based wiki watcher. This watcher actively monitors `.md` files.
*   **Automatic Re-embedding**: Upon detection of a change in a `.md` file, the wiki watcher triggers a re-embedding process via the `syncFile` function. This re-embedding only proceeds if the `shouldReembed` condition evaluates to `true`, preventing unnecessary processing.
*   **Resource Management**: The `close()` function has been updated to properly tear down and dispose of the wiki watcher, ensuring clean resource release alongside the existing raw watcher.
*   **Nightly Linting and Healing Cron**: A new `node-cron` job is now scheduled within `index.ts`. This job is configured based on `config.cron.lint_heal`.
*   **Pre-Heal Git Snapshot**: As a critical safeguard, the nightly cron job takes a pre-heal Git snapshot before initiating the `runLintHeal` process. This allows for easy rollback in case of unintended changes during linting or healing.
*   **Configurable Guardrails**: The `runLintHeal` function itself operates under specific guardrails defined within the system's configuration.

## Related

[[VectorStore]],[[Chokidar]],[[Node-cron]],[[Git snapshot]],[[Linting]],[[Embedding]],[[rahilsinghi/brain]],[[Cron Job Scheduling]]
