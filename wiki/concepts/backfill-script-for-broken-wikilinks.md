---
title: Backfill Script for Broken Wikilinks
author: ai
created_at: 2026-04-12T21:53:43.611Z
last_ai_edit: 2026-04-12T21:53:43.611Z
last_human_edit: null
last_embedded_hash: 1f9eca6d851f6a0c
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-graph-backfill-script-to-rewrite-broken-wikilinks-8a0587.md]]"
tags:
  - script
  - wikilinks
  - brain
  - maintenance
  - automation
  - knowledge graph
  - python
---


# Backfill Script for Broken Wikilinks

This script iterates through all wiki articles within the `rahilsinghi/brain` repository to identify and rectify broken wikilinks. It resolves `[[Title]]` links case-insensitively by matching titles and slugs, then rewrites them to their canonical forms. The script supports a `--dry-run` mode and is idempotent, ensuring consistent results.

## Key Concepts

Wikilink Resolution,Canonicalization,Idempotency,Knowledge Graph Maintenance,Dry Run Mode

## Details

The backfill script, identified by commit SHA `6b63628` in the `rahilsinghi/brain` repository, automates the process of fixing internal wiki links. It systematically walks through all markdown articles, targeting `[[Title]]` formatted links.

Its core functionality involves:
*   **Case-insensitive Matching**: Resolves wikilinks against existing article titles and slugs regardless of case.
*   **Canonical Rewriting**: Replaces non-canonical or broken links with the correct, canonical title of the target article.
*   **Exclusion**: Skips specific paths like `index.md` and `code-architecture/` to prevent unintended modifications in sensitive areas.
*   **Dry Run Support**: Users can execute the script with a `--dry-run` flag to preview changes without actually modifying files, allowing for validation before committing changes.
*   **Idempotency**: Running the script multiple times will produce the same result as running it once, ensuring stability and preventing redundant or conflicting changes.

This script is crucial for maintaining the integrity and navigability of the [[Brain Project]]'s knowledge base, particularly as content evolves and article titles may change or be refined.

## Related

[[Brain Project]],[[Automated Knowledge System Maintenance (d145456)]],[[Brain Explorer Completion: Deep-Linking and Wikilink Navigation]],[[Rahil Singhi]],[[Claude Opus 4.6]]
