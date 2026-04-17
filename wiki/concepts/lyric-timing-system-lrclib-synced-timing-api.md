---
title: Lyric Timing System (LRCLIB Synced + Timing API)
author: ai
created_at: 2026-04-10T22:12:41.006Z
last_ai_edit: 2026-04-10T22:12:41.006Z
last_human_edit: null
last_embedded_hash: 8906c58c47baf2dd
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-lyric-timing-system-lrclib-synced-timing-api-03eff3.md]]"
tags:
  - feature
  - lyrics
  - timing
  - api
  - lrclib
  - integration
  - backend
  - rahilsinghi
---


# Lyric Timing System (LRCLIB Synced + Timing API)

This commit introduces a comprehensive lyric timing system, integrating LRCLIB for synced lyric timestamps and providing a new API for timing operations. It enables estimated bar timing based on song duration and section structure, enhancing the application's ability to display synchronized lyrics.

## Key Concepts

- [[LRCLIB]] integration for synced lyrics,- Estimated bar timing,- API endpoints for timing (GET /api/songs/{id}/timing, POST /api/songs/{id}/compute-timing),- Lyrics sync router

## Details

This feature, implemented in the `rahilsinghi/raag` repository (SHA: `7618ef9`), establishes a robust system for synchronizing lyrics. Authored by Rahil Singhi (and co-authored by Claude Opus 4.6), the changes were committed on 2026-03-04T19:37:33Z and involved 3 file modifications, adding 295 lines of code.

Key functionalities introduced include:
*   **LRCLIB Integration**: The system now connects with LRCLIB to fetch synchronized lyrics, providing precise timestamps for lyric lines.
*   **Estimated Bar Timing**: It can calculate estimated bar timings by analyzing the song's duration and its structural sections.
*   **Timing API**: Two new API endpoints facilitate timing operations:
    *   `GET /api/songs/{id}/timing`: To retrieve timing information for a specific song.
    *   `POST /api/songs/{id}/compute-timing`: To trigger the computation of timing data for a song.
*   **Router Registration**: A dedicated `lyrics_sync` router has been registered within the main application to handle these new functionalities.

## Related

[[Rahil Singhi]],[[LRCLIB]],[[API Design]],[[Lyrics Synchronization]],[[raag project]]
