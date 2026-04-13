---
title: "Fix: Escape Single Quotes in Vector Store Delete Filter (402de4e)"
author: ai
created_at: 2026-04-10T22:12:27.263Z
last_ai_edit: 2026-04-10T22:12:27.263Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-fix-escape-single-quotes-in-vector-store-delete-filter-7c531c.md]]"
tags:
  - bug fix
  - vector store
  - escaping
  - filter
  - deletion
  - code change
  - rahil singhi
---

# Fix: Escape Single Quotes in Vector Store Delete Filter (402de4e)

This entry documents a bug fix implemented in the `rahilsinghi/brain` repository. The change addresses an issue where single quotes were not properly escaped within a delete filter for a vector store, preventing correct operation. The fix ensures that such filters are correctly parsed and executed.

## Key Concepts

- [[Vector Stores]],- [[Character Escaping]],- [[Bug Fixes]],- [[Delete Filter]]

## Details

This commit, identified by SHA `402de4e`, was authored by Rahil Singhi on April 4, 2026, at 00:03:49 UTC. It targets the `rahilsinghi/brain` project and specifically resolves a bug where single quotes in a filter used for deleting entries from a vector store were not being correctly escaped. This oversight could lead to syntax errors or incorrect filtering logic. The change involved 2 additions and 1 deletion across a single file, indicating a precise modification to correct the escaping mechanism, thereby ensuring robust and reliable deletion operations within the vector store.

## Related

[[Vector Stores]],[[Character Escaping]],[[Bug Fixes]],[[rahilsinghi/brain project]]
