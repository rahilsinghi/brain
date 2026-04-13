---
title: Backfill Script for Broken Wikilinks
author: ai
created_at: 2026-04-12T17:52:36.245Z
last_ai_edit: 2026-04-12T17:52:36.245Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-graph-backfill-script-to-rewrite-broken-wikilinks-8a0587.md]]"
tags:
  - wikilinks
  - backfill
  - script
  - brain-project
  - automation
  - content-management
  - markdown
  - maintenance
---

# Backfill Script for Broken Wikilinks

This script, part of the [[rahilsinghi/brain]] repository, automatically resolves and rewrites broken wikilinks within wiki articles. It performs case-insensitive matching against article titles and slugs to ensure links point to canonical destinations. The script supports a dry-run mode and is designed to be idempotent.

## Key Concepts

[[Wikilinks]],Case-insensitive matching,Canonical titles,Dry run,Idempotency,Content automation

## Details

The `backfill script for broken wikilinks` is a utility developed for the [[rahilsinghi/brain]] repository. Its primary function is to maintain the integrity of internal linking within the wiki by identifying and correcting `[[Title]]` style wikilinks that may have become broken due to case mismatches or title changes.

The script operates by iterating through all existing wiki articles. For each wikilink encountered, it attempts to resolve the target by performing a case-insensitive match against the titles and slugs of all available articles. Once a canonical match is found, the script rewrites the wikilink to use the precise canonical title, ensuring consistency and preventing broken links.

Key features of the script include:

*   **Case-insensitive resolution:** It can correctly identify links even if the case in the wikilink does not perfectly match the target article's title.
*   **Slug matching:** Beyond titles, it also considers slugs for robust resolution.
*   **Rewriting to canonical titles:** Ensures all internal links point to the exact, official title of the target article.
*   **Dry-run support:** A `--dry-run` flag allows users to preview the changes the script would make without actually modifying any files, which is crucial for verifying its operation.
*   **Exclusion of specific paths:** It intelligently skips `index.md` files and content within `code-architecture/` directories to avoid unintended modifications.
*   **Idempotent operation:** Running the script multiple times will produce the same result as running it once, as it only makes necessary corrections and does not introduce new inconsistencies.

This script was co-authored with [[Claude Opus 4.6 (1M context)]], highlighting the use of AI assistance in developing robust content management tools for the [[Brain Project]].

**Commit Details:**
*   **Repo:** [[rahilsinghi/brain]]
*   **SHA:** `6b63628`
*   **Date:** `2026-04-10T22:59:09Z`
*   **Author:** Rahil Singhi
*   **Files changed:** 3
*   **Additions:** +237
*   **Deletions:** -1

## Related

[[Brain Project]],[[Brain Repository Wiki Watcher and Nightly Operations]],[[Brain Explorer: Deep-Linking & Wikilink Navigation Feature]],[[Brain Explorer Update: Wikilink Rendering, Palette Filtering, and Code Cleanup]],[[rahilsinghi/brain]],[[CLAUDE.md for Claude Code Vault Integration]]
