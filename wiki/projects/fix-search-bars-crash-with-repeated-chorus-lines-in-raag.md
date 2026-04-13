---
title: "Fix: `search_bars` Crash with Repeated Chorus Lines in `raag`"
author: ai
created_at: 2026-04-10T17:20:29.167Z
last_ai_edit: 2026-04-10T17:20:29.167Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-fix-resolve-search-bars-crash-on-repeated-chorus-lines-2ea13a.md]]"
tags:
  - fix
  - bugfix
  - crash
  - raag
  - search_bars
  - lyrics
  - chorus
  - sqlalchemy
  - database
  - python
  - commit
  - f2fef8d
---

# Fix: `search_bars` Crash with Repeated Chorus Lines in `raag`

This commit resolves a `search_bars` crash in the `rahilsinghi/raag` repository caused by `MultipleResultsFound` errors when processing repeated lyric lines. The fix involves updating the database query method from `scalar_one_or_none()` to `scalars().first()` with `limit(1)`. An additional safety fix was applied to `_enrich_song`.

## Key Concepts

- `search_bars` (Functionality affected),- `MultipleResultsFound` (Specific error raised),- `scalar_one_or_none()` (Original SQLAlchemy method causing the issue),- `scalars().first()` (New SQLAlchemy method used in the fix),- `limit(1)` (SQL clause for single result retrieval),- `_enrich_song` (Related function receiving safety fix)

## Details

This commit, identified by SHA `f2fef8d`, addresses a critical crash within the `search_bars` functionality of the `rahilsinghi/raag` repository. The crash specifically occurred when the system processed songs containing repeated lyric lines, such as choruses or hooks.

The root cause of the crash was the `MultipleResultsFound` exception, which was triggered by the previous use of SQLAlchemy's `scalar_one_or_none()` method. This method expects either zero or exactly one result and raises an error if multiple matching rows are found. In the context of repeated lyric lines, it's possible for a query to return multiple identical or very similar entries, leading to this exception.

The resolution involved a change in the database query strategy. The problematic `scalar_one_or_none()` call was replaced with a combination of `scalars().first()` and `limit(1)`. This new approach ensures that even if a query potentially returns multiple results, only the first one is retrieved, effectively bypassing the `MultipleResultsFound` error and preventing the crash.

Furthermore, an additional safety fix was implemented within the `_enrich_song` function to enhance the overall stability and robustness of the application.

*   **Repository:** `rahilsinghi/raag`
*   **SHA:** `f2fef8d`
*   **Date:** `2026-03-04T00:56:30Z`
*   **Author:** Rahil Singhi
*   **Co-Authored By:** Claude Opus 4.6
*   **Files Changed:** 1
*   **Lines Added:** +3
*   **Lines Deleted:** -3

## Related

[[raag]],[[SQLAlchemy]],[[Error Handling]],[[Database Queries]],[[MultipleResultsFound]]
