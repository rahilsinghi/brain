---
title: "Fix: Search Bar Crash on Repeated Chorus Lines in raag"
author: ai
created_at: 2026-04-13T15:58:26.011Z
last_ai_edit: 2026-04-13T15:58:26.011Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-fix-resolve-search-bars-crash-on-repeated-chorus-lines-2ea13a.md]]"
tags:
  - bugfix
  - raag
  - database
  - sqlalchemy
  - orm
  - search
  - lyrics
  - error handling
  - python
---

# Fix: Search Bar Crash on Repeated Chorus Lines in raag

This article details a fix implemented in the `rahilsinghi/raag` project to resolve a crash occurring in the search bar functionality when processing songs with repeated lyric lines, such as choruses. The solution involved updating the database query method from `scalar_one_or_none()` to `scalars().first() with limit(1)` to correctly handle multiple matching results without raising a `MultipleResultsFound` exception. Additionally, the `_enrich_song` function was improved for safety.

## Key Concepts

Database Query Optimization,SQLAlchemy ORM,Error Handling (MultipleResultsFound),Lyric Processing,Code Safety

## Details

The `search_bars` functionality within the `rahilsinghi/raag` project was experiencing a crash when attempting to process songs that contained repeated lyric lines, commonly found in choruses or hooks. This issue stemmed from the use of `scalar_one_or_none()` in the database querying logic, which would raise a `MultipleResultsFound` exception if more than one record matched the query, preventing proper song enrichment.

The fix, identified in commit `f2fef8d`, involved a critical change in how database results were fetched. The method was updated from `scalar_one_or_none()` to `scalars().first() with limit(1)`. This change ensures that even if multiple records match the query, only the first one is retrieved, thus avoiding the `MultipleResultsFound` exception and allowing the search bar to function correctly with repeated lyric lines. This change specifically addresses scenarios where song enrichment processes might encounter ambiguity due to identical lyric strings.

Furthermore, the `_enrich_song` function was reviewed and modified to enhance its safety and robustness, ensuring that the song enrichment process is more resilient to potential data inconsistencies or unexpected query results.

## Related

[[raag]],[[SQLAlchemy]],[[MultipleResultsFound Exception]],[[_enrich_song function]],[[Claude Opus 4.6]],[[Search Bars]]
