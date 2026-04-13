---
title: Song Deep Dive Page
author: ai
created_at: 2026-04-10T22:11:13.348Z
last_ai_edit: 2026-04-10T22:11:13.348Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-song-deep-dive-page-full-page-lyric-explorer-at-song-28bf8a.md]]"
tags:
  - feature
  - song
  - lyrics
  - explorer
  - ai
  - spotify
  - ui
  - frontend
  - project-raag
  - cca23b0
  - 2026-03-07
---

# Song Deep Dive Page

Introduces a new full-page lyric explorer available at `/song/[id]`, designed to provide a premium song exploration experience. This feature includes annotated, color-coded lyrics, AI-powered analysis, real-time Spotify playback synchronization, and a rich interactive sidebar.
Users can explore detailed song statistics, topics, and entity mentions, with links to the Universe Graph for further discovery.

## Key Concepts

Song Deep Dive Page,Lyric Explorer,Annotated Lyrics,MC Color-coding (for lyrics and rhyme words),AI-powered Music Analysis,Spotify Playback Synchronization,Interactive Sidebar,Universe Graph Integration,Responsive Web Design

## Details

The `rahilsinghi/raag` repository, under SHA `cca23b0`, saw the introduction of the "Song Deep Dive page" by Rahil Singhi on 2026-03-07. This new full-page lyric explorer, accessible at `/song/[id]`, aims to provide a premium and immersive song exploration experience.

Key features of the Song Deep Dive page include:

*   **Annotated Lyrics:** Lyrics are grouped by section and enhanced with MC color-coding, providing visual cues for different elements and facilitating understanding.
*   **Rhyme Word Highlights:** Color-coded highlights are applied to rhyme words, accompanied by a group legend to visually represent rhyme schemes and patterns.
*   **AI-Powered Analysis:** Users can click any lyric bar to expand detailed AI-powered analysis, offering insights into: translation, meaning, wordplay, cultural references, flow notes, and context.
*   **Synced Spotify Playback:** A "synced mode" integrates with Spotify playback, causing lyric bars to highlight and auto-scroll in real-time as the song plays. The system automatically switches to this mode when Spotify playback begins.
*   **Rich Interactive Sidebar:** A comprehensive sidebar provides extensive additional information, including:
    *   Album art
    *   A statistics grid (BPM, key, energy, duration, words, lexical diversity)
    *   MC split bars
    *   Identified topics
    *   Entity mentions with stance coloring
    *   Featured artists
*   **Universe Graph Integration:** Entity mentions within the sidebar are dynamically linked to the [[Universe Graph]] for further exploration, allowing users to delve deeper into related concepts and connections.
*   **Responsive Design:** The page is designed to be responsive, adapting its layout for different devices. The sidebar is hidden on mobile devices, while a two-column layout is presented on desktop.

This feature involved changes across 6 files, with a significant addition of 921 lines of code. It was co-authored by Rahil Singhi and Claude Opus 4.6.

## Related

[[Project Raag]],[[Rahil Singhi]],[[Claude Opus]],[[Universe Graph]],[[Spotify Integration]],[[AI Analysis Tools]]
