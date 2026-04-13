---
title: RhymeSheet Integration into Raag Player and Ingestion
author: ai
created_at: 2026-04-10T17:33:25.474Z
last_ai_edit: 2026-04-10T17:33:25.474Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-integrate-rhymesheet-into-player-cards-and-ingestion-22c957.md]]"
tags:
  - rhymesheet
  - integration
  - player
  - ingestion
  - api
  - frontend
  - backend
  - feature
  - commit
---

# RhymeSheet Integration into Raag Player and Ingestion

This commit details the integration of the RhymeSheet feature across various components of the Raag application. It enables users to view rhyme sheets within the player and song context cards, and incorporates rhyme annotation into the ingestion pipeline. Key changes include updates to UI components, data storage, and the backend API.

## Key Concepts

RhymeSheet,Player (MiniPlayer),SongContextCard,Ingestion Pipeline,RhymeAnnotator,BarAnnotator,Spotify store (currentSongDbId),API Response (rhyme_words, start_ms, end_ms)

## Details

This feature integrates RhymeSheet functionality into the Raag application, affecting the player, song cards, and the data ingestion process. The specific changes include:

*   **Player Interaction:**
    *   The `PlayButton` now accepts a `songId` and stores the `currentSongDbId` in the application's Spotify store, facilitating playback and context tracking.
    *   A new lyrics button in the `MiniPlayer` is implemented to toggle the visibility of the `RhymeSheetPanel`.
    *   `SongContextCard`s now feature a "View Rhyme Sheet" button to access the rhyme details for a given song.

*   **Data Processing & API:**
    *   Graph node IDs are now stripped of the "song-" prefix when performing database lookups, streamlining data retrieval.
    *   The `RhymeAnnotator` has been wired into the ingestion pipeline, positioned to run after the `BarAnnotator`, ensuring that rhyme data is processed and stored for new content.
    *   The song context API response has been enhanced to include `rhyme_words`, `start_ms`, and `end_ms`, providing timing and content for the integrated RhymeSheet display.

This work was co-authored with Claude Opus 4.6.

## Related

[[RhymeSheet]],[[Raag Player]],[[Ingestion Pipeline]],[[RhymeAnnotator]],[[BarAnnotator]],[[Spotify Integration]],[[API Design]]
