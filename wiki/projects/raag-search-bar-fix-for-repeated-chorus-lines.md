---
title: Raag Search Bar Fix for Repeated Chorus Lines
author: ai
created_at: 2026-04-12T17:38:36.525Z
last_ai_edit: 2026-04-12T17:38:36.525Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-fix-resolve-search-bars-crash-on-repeated-chorus-lines-2ea13a.md]]"
tags:
  - raag
  - bugfix
  - sqlalchemy
  - search
  - lyrics
  - chorus
  - python
---

# Raag Search Bar Fix for Repeated Chorus Lines

This commit resolves a crash in the `search_bars` functionality of the `raag` project that occurred when processing repeated lyric lines (choruses or hooks). The fix involves modifying the SQLAlchemy query method to `scalars().first()` with `limit(1)` to prevent `MultipleResultsFound` errors and includes a safety enhancement to the `_enrich_song` function.

## Key Concepts

search_bars,SQLAlchemy,MultipleResultsFound,_enrich_song,Chorus lines,Repeated lyrics,Bugfix

## Details

The `search_bars` component within the `raag` project was experiencing a crash due to `MultipleResultsFound` errors. This issue specifically manifested when the system encountered repeated lyric lines, such as choruses or hooks, which could lead to multiple identical results being returned by a database query that expected a single scalar. To address this, the `scalar_one_or_none()` SQLAlchemy method was replaced with `scalars().first()` combined with `limit(1)`. This change ensures that the query explicitly retrieves at most one result, thereby preventing the `MultipleResultsFound` exception.

Additionally, a safety fix was implemented in the `_enrich_song` function to improve overall robustness and prevent potential related issues.

## Related

[[raag]],[[CLAP Encoder Compatibility and Lyrics Ingestion (raag eb48f40)]],[[Claude-powered Word-Level Rhyme Annotator for Raag]],[[Compact Grid LyricCards with Hindi/Romanized Toggle]],[[Compact LyricCards with Hindi/Romanized Toggle]],[[MultipleResultsFound]]
