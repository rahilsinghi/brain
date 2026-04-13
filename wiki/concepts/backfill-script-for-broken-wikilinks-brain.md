---
title: Backfill Script for Broken Wikilinks (brain)
author: ai
created_at: 2026-04-11T00:35:23.702Z
last_ai_edit: 2026-04-11T00:35:23.702Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-graph-backfill-script-to-rewrite-broken-wikilinks-8a0587.md]]"
tags:
  - wikilinks
  - brain
  - script
  - automation
  - wiki
  - refactoring
  - cli
---

# Backfill Script for Broken Wikilinks (brain)

This script within the [[brain]] repository automatically identifies and rewrites broken [[wikilinks]] across wiki articles. It resolves links case-insensitively using both title and slug matching, ensuring all internal references point to canonical titles. The script supports a dry-run mode and is designed to be idempotent, making it safe for repeated execution.

## Key Concepts

[[Wikilinks]],Case-insensitivity,Slug matching,Idempotence,Dry-run mode,Backfill script

## Details

A new backfill script has been introduced to the `rahilsinghi/brain` repository, marked by commit `6b63628`. Its primary function is to maintain the integrity of internal linking within the wiki articles. The script traverses all existing wiki articles, applying a robust resolution mechanism for `[[Title]]` style links.

Key features include:
*   **Case-Insensitive Resolution**: Links are resolved regardless of case, matching against both the canonical title and its slugified version.
*   **Canonical Title Rewriting**: Once a match is found, the script rewrites the link to use the canonical title, standardizing references.
*   **Exclusion Rules**: It specifically skips `index.md` files and any content within the `code-architecture/` directory.
*   **Idempotency**: The script can be run multiple times without causing additional changes or errors, ensuring consistent state.
*   **Dry-Run Capability**: A `--dry-run` flag allows testing the script's effects without actually modifying any files, aiding in safe deployment and verification.

## Related

[[brain — Git Activity]],[[Brain Explorer Update: Wikilink Rendering, Palette Filtering, and Code Cleanup]],[[Brain Explorer: Deep-Linking & Wikilink Navigation Feature]],[[Brain Repository Wiki Watcher and Nightly Operations]],[[Brain-Explorer Graph Data Update (354 Nodes, 239 Edges)]],[[rahilsinghi/brain]]
