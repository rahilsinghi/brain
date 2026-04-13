---
title: Wikilink Backfill Script for Brain Repository
author: ai
created_at: 2026-04-11T00:32:12.211Z
last_ai_edit: 2026-04-11T00:32:12.211Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-graph-backfill-script-to-rewrite-broken-wikilinks-8a0587.md]]"
tags:
  - brain
  - wikilinks
  - script
  - automation
  - data integrity
  - backfill
---

# Wikilink Backfill Script for Brain Repository

This script automates the process of identifying and rewriting broken wikilinks within the `rahilsinghi/brain` repository. It resolves `[[Title]]` links case-insensitively by matching titles and slugs, ensuring they point to canonical article titles. The script is idempotent and supports a dry-run mode for validation.

## Key Concepts

Wikilinks,Backfill Script,Case-Insensitive Matching,Canonical Titles,Idempotency,Dry Run Mode

## Details

A new feature commit (SHA: `6b63628`) authored by Rahil Singhi on 2026-04-10 introduces a backfill script to correct `wikilinks` within the [[rahilsinghi/brain]] repository. The script processes all wiki articles, resolving `[[Title]]` links by performing case-insensitive matching against existing article titles and their slugs. Upon successful resolution, it rewrites these links to their canonical titles.

Key characteristics of the script:
-   **Repository**: [[brain — Git Activity]]
-   **Functionality**: Resolves and rewrites `[[Title]]` formatted wikilinks.
-   **Matching**: Uses case-insensitive matching based on title and slug.
-   **Output**: Rewrites links to their canonical forms.
-   **Idempotency**: Running the script multiple times will produce the same result without further changes if links are already canonical.
-   **Dry Run Mode**: Supports a `--dry-run` flag for previewing changes before applying them.
-   **Exclusions**: Skips `index.md` and content within the `code-architecture/` directory.

This script is crucial for maintaining the integrity and navigability of the wiki by ensuring that internal links are always valid and point to the correct resources. The development was co-authored by Claude Opus 4.6 (1M context).

## Related

[[brain — Git Activity]],[[Brain Repository Wiki Watcher and Nightly Operations]],[[Brain Explorer Update: Wikilink Rendering, Palette Filtering, and Code Cleanup]],[[Brain Explorer: Deep-Linking & Wikilink Navigation Feature]],[[Brain Explorer: Deep-Linking and Wikilink Event Implementation]],[[Parse-Then-Compile Pipeline]]
