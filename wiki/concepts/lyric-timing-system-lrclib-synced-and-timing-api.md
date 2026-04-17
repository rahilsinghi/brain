---
title: Lyric Timing System - LRCLIB Synced and Timing API
author: ai
created_at: 2026-04-12T21:36:39.171Z
last_ai_edit: 2026-04-12T21:36:39.171Z
last_human_edit: null
last_embedded_hash: 154c0983e583d8ff
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-lyric-timing-system-lrclib-synced-timing-api-03eff3.md]]"
tags:
  - raag
  - lyrics
  - api
  - timing
  - lrclib
  - synchronization
---


# Lyric Timing System - LRCLIB Synced and Timing API

This commit introduces a lyric timing system for the [[raag]] project, integrating with LRCLIB to fetch synchronized lyrics timestamps. It provides new API endpoints for computing and retrieving estimated bar timings, enhancing the application's ability to display time-synced lyrical content. The `lyrics_sync` router has been registered to expose these new functionalities.

## Key Concepts

LRCLIB Integration,Lyric Synchronization,API Endpoints,Bar Timing Estimation

## Details

This commit implements a new lyric timing system for the [[raag]] project (SHA: `7618ef9`). The system integrates with LRCLIB to fetch synchronized lyrics, providing accurate timestamps for song lyrics. This feature significantly enhances the ability to display and interact with time-synced lyrical content within the application.

Key functionalities include:
- **Estimated Bar Timing**: Calculates bar timings based on song duration and structural sections.
- **LRCLIB Integration**: Utilizes the LRCLIB service for retrieving time-synced lyrics data.
- **API Endpoints**: New API endpoints have been added to manage lyric timing data:
    - `GET /api/songs/{id}/timing`: Retrieves the estimated bar timing and synchronized lyric timestamps for a given song ID.
    - `POST /api/songs/{id}/compute-timing`: Triggers the computation of bar timing and lyric synchronization for a specified song.
- **Router Registration**: The `lyrics_sync` router has been registered in the main application to expose these new API functionalities.

## Related

[[raag]],[[API Feature: POST /synthesise Endpoint with Robust Error Handling]],[[CLAP Encoder Compatibility and Lyrics Ingestion in raag]],[[Claude-powered Word-Level Rhyme Annotator for Raag]]
