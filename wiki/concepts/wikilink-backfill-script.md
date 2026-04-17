---
title: Wikilink Backfill Script
author: ai
created_at: 2026-04-13T18:33:55.319Z
last_ai_edit: 2026-04-13T18:33:55.319Z
last_human_edit: null
last_embedded_hash: 9fb7d3bea2d26e0a
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-graph-backfill-script-to-rewrite-broken-wikilinks-8a0587.md]]"
tags:
  - wikilink
  - script
  - backfill
  - automation
  - maintenance
  - brain project
  - markdown
  - utility
---


# Wikilink Backfill Script

This script automates the process of identifying and correcting broken wikilinks within wiki articles. It performs a case-insensitive resolution of `[[Title]]` links by matching against existing article titles and slugs, then rewrites them to their canonical forms. The script is idempotent and supports a dry-run mode for verification.

## Key Concepts

[[Wikilink]],Backfill Script,Canonicalization,Case-Insensitive Matching,Dry Run,Idempotency,[[Brain Project]]

## Details

The `wikilink-backfill-script` (identified by commit `6b63628`) is designed for the [[rahilsinghi/brain]] repository. Authored by Rahil Singhi and co-authored by Claude Opus 4.6, this utility traverses all markdown wiki articles to ensure internal links are correctly formatted and point to valid, canonical titles. Its core functionality involves:

*   **Case-Insensitive Resolution**: It can match `[[title]]` links regardless of casing against actual article titles and slugs.
*   **Canonical Rewriting**: Once a match is found, the script updates the link to use the exact, canonical title of the target article.
*   **Dry-Run Mode**: A `--dry-run` flag allows users to preview changes without modifying files, facilitating review and preventing unintended alterations.
*   **Exclusions**: It explicitly skips `index.md` and any files within the `code-architecture/` directory to avoid processing structural or generated content.
*   **Idempotency**: The script can be run multiple times without causing additional changes if the links are already canonical, ensuring consistent results.

This script is crucial for maintaining the integrity and navigability of the wiki, especially as content evolves and article titles might undergo minor changes.

## Related

[[Backfill Script for Broken Wikilinks]],[[Backfill Script for Broken Wikilinks (brain)]],[[Brain Repository Wiki Watcher and Nightly Operations]],[[Automated Knowledge System Maintenance]],[[Brain Explorer: Wikilink Rendering, Palette Filtering, and Code Cleanup]],[[CLAUDE.md]]
