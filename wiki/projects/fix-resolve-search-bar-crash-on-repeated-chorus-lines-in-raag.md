---
title: "Fix: Resolve Search Bar Crash on Repeated Chorus Lines in raag"
author: ai
created_at: 2026-04-12T21:39:24.857Z
last_ai_edit: 2026-04-12T21:39:24.857Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-fix-resolve-search-bars-crash-on-repeated-chorus-lines-2ea13a.md]]"
tags:
  - bugfix
  - raag
  - database
  - lyrics
  - python
  - sqlalchemy
---

# Fix: Resolve Search Bar Crash on Repeated Chorus Lines in raag

This commit addresses a crash in the `raag` project's search bar functionality, specifically when encountering repeated lyric lines like choruses. The fix involves modifying the database query method to correctly handle multiple results for the same lyric, preventing `MultipleResultsFound` errors.

## Key Concepts

[[raag]],Database Query,Error Handling,Lyrics Processing,Chorus Lines,SQLAlchemy `scalar_one_or_none()`,SQLAlchemy `scalars().first()`

## Details

This commit (SHA: `f2fef8d`) for the `rahilsinghi/raag` repository resolves a critical issue where the search bar would crash when processing songs containing repeated lyric lines, such as choruses or hooks. The crash was caused by the `scalar_one_or_none()` SQLAlchemy method, which raises a `MultipleResultsFound` exception if more than one record matches the query. To fix this, the code was updated to use `scalars().first()` in conjunction with `limit(1)`, ensuring that only a single result is returned even if multiple identical lyric lines exist in the database.

Additionally, the `_enrich_song` function was modified to enhance its safety and robustness, preventing potential issues related to data enrichment processes. This change involved a minimal modification of 3 additions and 3 deletions across 1 file.

## Related

[[raag]],[[Claude-powered Word-Level Rhyme Annotator for Raag]],[[CLAP Encoder Compatibility and Lyrics Ingestion in raag]]
