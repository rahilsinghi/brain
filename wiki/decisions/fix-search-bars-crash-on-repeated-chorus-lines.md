---
title: "Fix: search_bars Crash on Repeated Chorus Lines"
author: ai
created_at: 2026-04-10T22:13:29.461Z
last_ai_edit: 2026-04-10T22:13:29.461Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-fix-resolve-search-bars-crash-on-repeated-chorus-lines-2ea13a.md]]"
tags:
  - fix
  - bug
  - crash
  - search
  - lyrics
  - chorus
  - python
  - sqlalchemy
  - raag
  - f2fef8d
  - multiple_results_found
  - commit
---

# Fix: search_bars Crash on Repeated Chorus Lines

This commit (`f2fef8d`) resolves a crash in the `search_bars` functionality of the `rahilsinghi/raag` repository. The crash, triggered by repeated lyric lines, was caused by a `MultipleResultsFound` error, which was fixed by updating a database query method and also safely modifying `_enrich_song`.

## Key Concepts

- MultipleResultsFound error,- `scalar_one_or_none()` (SQLAlchemy method),- `scalars().first().limit(1)` (SQLAlchemy method),- `_enrich_song` function,- search_bars functionality,- Repeated lyric lines (choruses/hooks)

## Details

The commit `f2fef8d` in the `rahilsinghi/raag` repository addresses a critical issue within the `search_bars` component. Previously, when the system encountered repeated lyric lines, such as choruses or hooks, it would result in a `MultipleResultsFound` error, leading to a crash.

The core of the fix involved modifying the database query logic. The problematic `scalar_one_or_none()` method, which expects zero or one result but errors on multiple, was replaced with `scalars().first()` combined with `limit(1)`. This new approach correctly retrieves the first available result without raising an error if more than one match exists, thus preventing the `MultipleResultsFound` exception.

Additionally, the `_enrich_song` function was updated to ensure continued stability and safety within the application's data enrichment processes. This change was authored by Rahil Singhi and co-authored by Claude Opus 4.6 on 2026-03-04.

## Related

[[rahilsinghi/raag]],[[MultipleResultsFound]],[[SQLAlchemy]],[[search_bars]],[[Rahil Singhi]],[[Claude Opus 4.6]]
