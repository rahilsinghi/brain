---
title: Song Deep Dive Page (Raag Project)
author: ai
created_at: 2026-04-12T17:29:44.080Z
last_ai_edit: 2026-04-12T17:29:44.080Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-song-deep-dive-page-full-page-lyric-explorer-at-song-28bf8a.md]]"
tags:
  - raag
  - lyrics
  - spotify
  - frontend
  - feature
  - deep-dive
  - ai-analysis
  - music
  - visualization
---

# Song Deep Dive Page (Raag Project)

This feature introduces a premium full-page lyric explorer at `/song/[id]` within the Raag project, offering an in-depth look into song compositions. It includes annotated, color-coded lyrics, AI-powered analysis for each bar, and synchronization with Spotify playback. The page also features a rich sidebar displaying album art, detailed track statistics, MC split bars, topics, entity mentions linked to the Universe graph, and featured artists.

## Key Concepts

Annotated Lyrics,MC Color-Coding,Rhyme Word Highlights,AI-Powered Analysis (Translation, Meaning, Wordplay, Cultural References, Flow Notes, Context),Spotify Playback Synchronization,Rich Sidebar (Album Art, Stats Grid, MC Split Bars, Topics, Entity Mentions, Featured Artists),Universe Graph Integration for Entity Exploration,Responsive Design

## Details

The 'Song Deep Dive' page, located at the `/song/[id]` endpoint in the [[raag]] repository, provides a comprehensive and interactive experience for exploring musical compositions. Key features include:

*   **Annotated and Color-Coded Lyrics**: Lyrics are grouped by section, with MC color-coding for different artists and highlighted rhyme words, accompanied by a group legend for clarity.
*   **AI-Powered Bar Analysis**: Users can click on any lyric bar to expand an AI-generated analysis. This analysis covers various aspects, including translation, deeper meaning, wordplay, cultural references, flow notes, and general context, enriching the understanding of the song.
*   **Spotify Playback Synchronization**: The page offers a synchronized mode with [[Spotify]] playback. As the song plays, lyrics highlight and auto-scroll, with automatic switching when Spotify playback begins, providing an immersive listening and reading experience.
*   **Rich Sidebar Information**: A detailed sidebar complements the main lyric display, featuring:
    *   Album art.
    *   A statistics grid with metrics like BPM, key, energy, duration, word count, and lexical diversity.
    *   MC split bars visualizing artist contributions.
    *   Identified topics and entity mentions, with stance coloring, which link directly to the [[Brain Explorer]] (Universe graph) for further exploration.
    *   Featured artists.
*   **Responsive Design**: The page is designed to be fully responsive, adapting its layout for different screen sizes. The sidebar is hidden on mobile devices and displayed in a 2-column layout on desktop.

## Related

[[raag]],[[Claude-powered Word-Level Rhyme Annotator for Raag]],[[Brain Explorer]],[[Spotify]],[[Compact Grid LyricCards with Hindi/Romanized Toggle]]
