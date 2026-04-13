---
title: "Song Deep Dive Page: Full-Page Lyric Explorer in raag"
author: ai
created_at: 2026-04-12T21:30:15.036Z
last_ai_edit: 2026-04-12T21:30:15.036Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-song-deep-dive-page-full-page-lyric-explorer-at-song-28bf8a.md]]"
tags:
  - raag
  - lyrics
  - spotify
  - ai
  - frontend
  - feature
  - web development
  - music
---

# Song Deep Dive Page: Full-Page Lyric Explorer in raag

This feature introduces a comprehensive 'Song Deep Dive' page within the raag project, offering an immersive lyric exploration experience. It includes annotated, color-coded lyrics, AI-powered analysis for deeper understanding, and synchronized playback with Spotify.

## Key Concepts

Full-page lyric explorer,Annotated lyrics,Color-coded rhyme highlights,AI-powered analysis (translation, meaning, wordplay, cultural references, flow notes, context),Spotify synced playback,Rich sidebar (album art, stats, MC split, topics, entity mentions),Responsive design

## Details

The `song/[id]` route in the [[raag]] repository now hosts a premium song exploration experience. Key functionalities include:

*   **Annotated Lyrics**: Lyrics are grouped by section and feature MC color-coding for different artists, enhancing readability and understanding.
*   **Rhyme Word Highlights**: Color-coded rhyme words are highlighted with a group legend, visually demonstrating lyrical structure and complexity.
*   **AI-Powered Analysis**: Users can click on any bar to expand AI-generated analysis, providing insights into translation, meaning, wordplay, cultural references, flow notes, and contextual information.
*   **Spotify Sync**: The page offers a synchronized mode with [[Spotify]] playback. Lyrics highlight and auto-scroll in real-time as the song plays, automatically activating when Spotify starts.
*   **Rich Sidebar**: A detailed sidebar displays relevant information such as album art, a stats grid (BPM, key, energy, duration, words, lexical diversity), MC split bars, topics, and entity mentions with stance coloring. Featured artists are also listed.
*   **Universe Graph Integration**: Entity mentions within the lyrics link directly to the [[Universe graph]] (potentially via [[Brain-Explorer: Universe Linking]]) for further exploration of interconnected concepts.
*   **Responsive Design**: The interface is designed to be responsive, with the sidebar hidden on mobile devices and a two-column layout on desktop.

## Related

[[raag]],[[Spotify]],[[Claude-powered Word-Level Rhyme Annotator for Raag]],[[AI]],[[Universe graph]],[[Brain-Explorer: Universe Linking]]
