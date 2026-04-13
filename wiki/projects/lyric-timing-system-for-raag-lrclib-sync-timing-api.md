---
title: Lyric Timing System for Raag (LRCLIB Sync & Timing API)
author: ai
created_at: 2026-04-12T17:35:37.950Z
last_ai_edit: 2026-04-12T17:35:37.950Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-lyric-timing-system-lrclib-synced-timing-api-03eff3.md]]"
tags:
  - raag
  - lyrics
  - timing
  - synchronization
  - lrclib
  - api
  - music
---

# Lyric Timing System for Raag (LRCLIB Sync & Timing API)

This feature introduces a robust lyric timing system to the `raag` project, integrating with LRCLIB to fetch synchronized lyrics timestamps. It provides API endpoints for both retrieving and computing lyric timings, leveraging song duration and section structure for accurate synchronization.

## Key Concepts

Lyric Synchronization,LRCLIB Integration,Music Information Retrieval,API Endpoints,Song Structure Analysis

## Details

The `raag` project now incorporates a sophisticated lyric timing system, enabling precise synchronization of lyrics with music playback. This functionality is achieved through several key components:

*   **LRCLIB Integration**: The system connects with LRCLIB to retrieve pre-existing synchronized lyrics timestamps, ensuring high accuracy for a wide range of songs.
*   **Estimated Bar Timing**: For tracks without direct LRCLIB data, the system can estimate bar timings based on the song's overall duration and its identified structural sections (e.g., verses, choruses), providing a fallback for timing synchronization.
*   **API Endpoints**: Two primary API endpoints manage the lyric timing:
    *   `GET /api/songs/{id}/timing`: Allows retrieval of synchronized lyric timings for a given song ID.
    *   `POST /api/songs/{id}/compute-timing`: Initiates the computation and synchronization process for lyric timings for a specified song.
*   **Router Registration**: A dedicated `lyrics_sync` router has been integrated into the main application to handle all related timing requests and processing.

## Related

[[raag]],[[Raag API]],[[LRCLIB]],[[Lyrics Synchronization]],[[Music Information Retrieval]],[[API Endpoints]],[[Song Structure Analysis]],[[API Code Review Findings and Fixes (8be18ba)]],[[CLAP Encoder Compatibility and Lyrics Ingestion (raag eb48f40)]],[[Claude-powered Word-Level Rhyme Annotator for Raag]],[[Backend Foundation for raag project with FastAPI, Pydantic, and Celery]]
