---
title: RhymeSheet Integration in raag Project
author: ai
created_at: 2026-04-12T18:06:43.696Z
last_ai_edit: 2026-04-12T18:06:43.696Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-integrate-rhymesheet-into-player-cards-and-ingestion-22c957.md]]"
tags:
  - raag
  - rhymesheet
  - rhymeannotator
  - spotify
  - ingestion
  - frontend
  - backend
  - player
  - ui
  - data_processing
  - claude
---

# RhymeSheet Integration in raag Project

This feature integrates the RhymeSheet functionality across the `raag` project, enhancing the user experience by displaying rhyme information within the player and song context cards. It also incorporates a new `RhymeAnnotator` into the data ingestion pipeline to enrich song data with detailed rhyme metrics.

## Key Concepts

[[RhymeSheet]],[[RhymeAnnotator]],[[Spotify Store]],[[Ingestion Pipeline]],[[MiniPlayer]],[[SongContextCard]],API Response Enrichment

## Details

The `RhymeSheet` feature has been seamlessly integrated into various components of the `raag` project:

*   **Player Interaction**: The `PlayButton` now accepts a `songId` and stores the `currentSongDbId` within the [[Spotify Store]], ensuring the player is aware of the currently active track.
*   **MiniPlayer UI**: A new lyrics button has been added to the `MiniPlayer` component, allowing users to toggle the display of the `RhymeSheetPanel` directly from the playback interface.
*   **Song Context**: The `SongContextCard` now includes a dedicated "View Rhyme Sheet" button, providing an accessible entry point to the rhyme information for a given song.
*   **Data Consistency**: To streamline database lookups, the `song-` prefix is now stripped from graph node IDs.
*   **Ingestion Pipeline Enhancement**: The `RhymeAnnotator` has been wired into the existing `ingestion pipeline`. It now runs sequentially after the `BarAnnotator`, ensuring that song data is enriched with rhyme information during processing.
*   **API Response**: The song context API response has been updated to include new fields: `rhyme_words`, `start_ms`, and `end_ms`, providing detailed timing and content for identified rhymes.

## Related

[[raag]],[[Claude-powered Word-Level Rhyme Annotator for Raag]],[[CLAP Encoder Compatibility and Lyrics Ingestion in raag]],[[CLAP Encoder Compatibility and Lyrics Ingestion (raag eb48f40)]],[[BarAnnotator]]
