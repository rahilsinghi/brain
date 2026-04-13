---
title: Frontend Types, API Helpers, and Rhyme Color Palette in Raag
author: ai
created_at: 2026-04-12T21:50:01.698Z
last_ai_edit: 2026-04-12T21:50:01.698Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-frontend-types-api-helpers-and-rhyme-color-palette-7e3048.md]]"
tags:
  - frontend
  - types
  - api
  - rhyme
  - ui
  - raag
  - development
---

# Frontend Types, API Helpers, and Rhyme Color Palette in Raag

This commit introduces new frontend types (`RhymeWord`, `BarTiming`) and updates `BarResult` to support rhyme-related fields within the `raag` project. It also adds API helpers for fetching and computing song timings, while ensuring no duplicate `fetchSongDetail` calls. A 16-color palette is implemented to visually represent rhyme groups, enhancing the user interface.

## Key Concepts

[[RhymeWord]] Type,[[BarTiming]] Type,[[BarResult]] Update,[[fetchSongTiming]] API Helper,[[computeSongTiming]] API Helper,[[Rhyme Color Palette]]

## Details

This feature commit for the [[raag]] repository (`rahilsinghi/raag`) at SHA `cfa6d45` on March 4, 2026, by Rahil Singhi (co-authored by Claude Opus 4.6), includes the following changes:

*   **Type Definitions:** New `RhymeWord` and `BarTiming` types have been added, and the existing `BarResult` type has been updated to incorporate new rhyme-related fields. These types are crucial for structuring and handling rhyme data within the frontend.
*   **API Helpers:** Two new API helper functions, `fetchSongTiming` and `computeSongTiming`, were introduced. These helpers streamline the process of retrieving and calculating song timing information. A fix was also implemented to prevent duplicate calls to `fetchSongDetail`.
*   **Rhyme Color Palette:** A 16-color palette has been implemented, specifically designed for rhyme groups A-P. A `getRhymeColor` helper function was added to facilitate easy access and application of these colors, which will be used to visually distinguish different rhyme groups in the UI.

## Related

[[raag]],[[Claude-powered Word-Level Rhyme Annotator for Raag]],[[Chat UI Improvements: Bar Chunks, Grid Layout, and Universe Linking (raag)]],[[Claude API Rate Limit Retry with Backoff in raag]],[[API Refinements Post Code Review]]
