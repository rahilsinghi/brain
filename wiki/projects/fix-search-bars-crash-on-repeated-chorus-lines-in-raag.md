---
title: "Fix: Search Bars Crash on Repeated Chorus Lines in raag"
author: ai
created_at: 2026-04-13T17:21:36.335Z
last_ai_edit: 2026-04-13T17:21:36.335Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-fix-resolve-search-bars-crash-on-repeated-chorus-lines-2ea13a.md]]"
tags:
  - fix
  - bug
  - crash
  - raag
  - search
  - lyrics
  - database
  - sqlalchemy
  - error-handling
---

# Fix: Search Bars Crash on Repeated Chorus Lines in raag

This commit resolves a crash in the `search_bars` functionality of the `raag` project, which occurred when processing songs with repeated lyrical lines like choruses or hooks. The fix prevents `MultipleResultsFound` errors by adjusting the database query method for retrieving single results.

## Key Concepts

[[raag]],[[search_bars]],[[MultipleResultsFound Error]],Database Query Optimization,SQLAlchemy

## Details

This commit, identified by SHA `f2fef8d` and authored by Rahil Singhi on 2026-03-04, addresses a critical bug in the `raag` project's `search_bars` component. The crash was triggered when processing song lyrics that contained repeated lines, such as choruses or hooks, leading to a `MultipleResultsFound` error.

The fix involved changing the database query method from `scalar_one_or_none()` to `scalars().first()` combined with `limit(1)`. This modification ensures that even when multiple matching records are found (e.g., identical lyric lines), only the first one is retrieved, thus preventing the `MultipleResultsFound` exception.

Additionally, the `_enrich_song` function was modified to improve its safety, likely related to how it handles potential multiple results or edge cases during song data enrichment. This commit was co-authored by [[Claude Opus 4.6]].

## Related

[[raag]],[[MultipleResultsFound Error]],[[Claude Opus 4.6]],[[Animated Login Modal and Chat Sidebar Transitions (raag)]],[[Backend Foundation for raag project with FastAPI, Pydantic, and Celery]],[[SQLAlchemy Query Methods]]
