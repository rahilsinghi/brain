---
title: Song Deep Dive Page (Full-Page Lyric Explorer)
author: ai
created_at: 2026-04-10T17:16:24.524Z
last_ai_edit: 2026-04-10T17:16:24.524Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-song-deep-dive-page-full-page-lyric-explorer-at-song-28bf8a.md]]"
tags:
  - song deep dive
  - lyric explorer
  - spotify sync
  - ai analysis
  - music feature
  - web development
  - front-end
  - raag
---

# Song Deep Dive Page (Full-Page Lyric Explorer)

This feature introduces a premium full-page lyric explorer available at `/song/[id]`, designed to provide an in-depth song exploration experience. It integrates annotated, color-coded lyrics with AI-powered analysis, Spotify playback synchronization, and a rich sidebar displaying various song metrics and contextual information. The page enhances user engagement by offering detailed insights into a song's structure, meaning, and related entities.

## Key Concepts

- Full-page lyric explorer,- Annotated lyrics with MC color-coding,- Rhyme word highlights with group legend,- AI-powered analysis (translation, meaning, wordplay, cultural refs, flow notes, context),- Spotify playback synchronization (bars highlight and auto-scroll),- Rich sidebar (album art, stats grid, MC split bars, topics, entity mentions, featured artists),- Responsive design (mobile/desktop layouts)

## Details

The `Song Deep Dive Page`, accessible via `/song/[id]`, is a significant new feature (commit `cca23b0` by Rahil Singhi on 2026-03-07) implemented within the `rahilsinghi/raag` repository. This full-page lyric explorer aims to offer a premium and comprehensive song exploration experience.

Key functionalities include:
*   **Annotated Lyrics:** Lyrics are displayed grouped by section, enhanced with MC color-coding and color-coded rhyme word highlights, complete with a group legend for clarity.
*   **AI-Powered Analysis:** Users can click any bar to expand and view AI-generated analysis, covering aspects like translation, deeper meaning, wordplay, cultural references, flow notes, and general context.
*   **Spotify Synchronization:** A 'Synced mode' allows for real-time interaction with Spotify playback. As the song plays, corresponding lyrics bars highlight and auto-scroll, with the system automatically switching to this mode when Spotify playback begins.
*   **Rich Sidebar:** A detailed sidebar provides a wealth of information, including album art, a statistics grid (BPM, key, energy, duration, word count, lexical diversity), MC split bars, identified topics, entity mentions (with stance coloring), and featured artists. Entity mentions are interactive and link directly to the [[Universe Graph]] for further exploration.
*   **Responsive Design:** The page is designed to be responsive, with the sidebar intelligently hidden on mobile devices and displayed in a two-column layout on desktop for optimal viewing.

This feature represents a substantial enhancement, adding 921 lines of code across 6 files to provide an immersive and data-rich environment for song analysis.

## Related

[[Universe Graph]],[[rahilsinghi/raag]],[[Rahil Singhi]],[[AI-Powered Music Analysis]]
