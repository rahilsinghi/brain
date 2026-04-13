---
title: Song Deep Dive Page (`/song/[id]`) in Raag
author: ai
created_at: 2026-04-13T15:42:45.963Z
last_ai_edit: 2026-04-13T15:42:45.963Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-song-deep-dive-page-full-page-lyric-explorer-at-song-28bf8a.md]]"
tags:
  - raag
  - feature
  - music
  - lyrics
  - spotify
  - ai
  - analysis
  - ui
  - ux
  - web
  - frontend
---

# Song Deep Dive Page (`/song/[id]`) in Raag

This feature introduces a premium song exploration page in the Raag application, offering an annotated, color-coded lyric explorer with AI-powered analysis for each bar, synchronized with Spotify playback. The page includes a rich sidebar displaying detailed song statistics, artist information, and entity mentions linked to a universe graph. It features a responsive design optimized for both mobile and desktop.

## Key Concepts

Annotated Lyrics,MC Color-coding,Rhyme Word Highlighting,AI-powered Lyric Analysis,Spotify Playback Synchronization,Song Statistics Grid,MC Split Bars,Topic Extraction,Entity Mention Extraction,Universe Graph Integration,Responsive Design

## Details

The `raag` repository, specifically commit `cca23b0` by Rahil Singhi (co-authored by Claude Opus 4.6), introduces a comprehensive "Song Deep Dive" page accessible at `/song/[id]`. This feature provides a premium exploration experience for music, focusing on detailed lyric analysis and rich contextual information.

Key functionalities include:
*   **Annotated Lyrics**: Lyrics are grouped by section and color-coded based on the MC (Master of Ceremonies) performing.
*   **Rhyme Word Highlights**: Color-coded highlights indicate rhyme words, accompanied by a group legend for clarity.
*   **AI-Powered Analysis**: Users can click any lyric bar to expand an AI-powered analysis that provides insights into translation, meaning, wordplay, cultural references, flow notes, and general context.
*   **Spotify Playback Synchronization**: The page offers a "synced mode" where lyric bars highlight and auto-scroll in real-time with Spotify playback. The system automatically switches to this mode when Spotify playback starts.
*   **Rich Sidebar**: A detailed sidebar provides a wealth of information:
    *   Album art
    *   A statistics grid including BPM, key, energy, duration, word count, and lexical diversity.
    *   MC split bars to visualize artist contributions.
    *   Extracted topics related to the song.
    *   Entity mentions with stance coloring, which link directly to the [[Universe Graph]] for further exploration.
    *   Featured artists information.
*   **Responsive Design**: The layout is optimized for different screen sizes, with the sidebar hidden on mobile devices and a two-column layout on desktops.

## Related

[[raag]],[[Spotify]],[[AI-powered analysis]],[[Universe Graph]]
