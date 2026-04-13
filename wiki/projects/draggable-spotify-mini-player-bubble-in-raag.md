---
title: Draggable Spotify Mini Player Bubble in raag
author: ai
created_at: 2026-04-12T18:19:14.504Z
last_ai_edit: 2026-04-12T18:19:14.504Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-draggable-spotify-mini-player-bubble-ed34c2.md]]"
tags:
  - spotify
  - ui
  - draggable
  - miniplayer
  - frontend
  - raag
  - feature
  - commit
---

# Draggable Spotify Mini Player Bubble in raag

This commit introduces a draggable Spotify mini-player bubble to the raag repository. The mini-player can be dragged around, snaps to a home position, clamps to the viewport, expands on click, and integrates a RhymeSheet toggle. It also includes a new SpotifyProvider wrapper and improved play error handling within the spotify-store.

## Key Concepts

Draggable UI,Floating UI Elements,Spotify API Integration,Viewport Clamping,RhymeSheet Integration,Error Handling

## Details

This feature, committed on 2026-03-06T22:39:38Z by Rahil Singhi (with co-authorship from Claude Opus 4.6), reworks the existing SpotifyMiniPlayer component within the [[raag]] repository. The key changes include:

*   **Draggable Functionality**: The mini-player is now implemented as a draggable floating bubble.
*   **Expansion on Click**: Clicking the bubble expands it, likely revealing more controls or information.
*   **Positioning Logic**: It snaps back to a predefined 'home' position (specifically, to the right of the chat input) and is clamped within the viewport boundaries, preventing it from being dragged off-screen.
*   **RhymeSheet Integration**: The mini-player now includes a toggle for the RhymeSheet, suggesting a close functional relationship between music playback and lyric/rhyme display.
*   **SpotifyProvider Wrapper**: A new `SpotifyProvider` wrapper has been added, likely to centralize Spotify API interactions and context management.
*   **Error Handling**: Improvements have been made to play error handling within the `spotify-store`, making the playback experience more robust.

This commit involved changes to 3 files, with 243 additions and 84 deletions.

## Related

[[raag]],[[Claude Opus]],[[Chat UI Improvements: Bar Chunks, Grid Layout, and Universe Linking]],[[CLAP Encoder Compatibility and Lyrics Ingestion in raag]],[[Spotify]]
