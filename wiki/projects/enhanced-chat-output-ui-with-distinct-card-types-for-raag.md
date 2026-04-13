---
title: Enhanced Chat Output UI with Distinct Card Types for raag
author: ai
created_at: 2026-04-13T17:43:48.761Z
last_ai_edit: 2026-04-13T17:43:48.761Z
last_human_edit: null
last_embedded_hash: 84cf22ea7c10adfd
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-enhanced-chat-output-ui-with-distinct-card-types-per-tool-b27987.md]]"
tags:
  - raag
  - chat
  - ui
  - frontend
  - backend
  - lyrics
  - music
  - tooling
  - ux
  - llm
---


# Enhanced Chat Output UI with Distinct Card Types for raag

This feature introduces specialized UI components, `LyricCard` and `SongContextCard`, to display results from different music search tools within the `raag` chat interface. It improves the user experience by presenting tool-specific information in a structured and visually appealing manner, alongside backend updates for richer data and prompt optimization.

## Key Concepts

LyricCard,SongContextCard,ChatMessage Routing,Tool Integration,User Interface (UI) Enhancement,System Prompt Optimization,Music Search Features

## Details

This commit to the `rahilsinghi/raag` repository (SHA: `609077a`, authored by Rahil Singhi on 2026-03-04T01:54:14Z) significantly enhances the chat output UI, involving changes across 6 files with 473 additions and 42 deletions.

Key improvements include:

*   **New `LyricCard` Component:** Designed specifically for `search_by_lyrics` results, featuring a quote-style display with an MC indicator, section tag, album art, and score.
*   **New `SongContextCard` Component:** Utilized for `get_song_context` results, presenting comprehensive statistics, topics, and a collapsible lyrics preview.
*   **Improved `ChatMessage` Routing:** Corrects the display mechanism so that `search_by_lyrics` results are now rendered by the appropriate `LyricCard` instead of an incorrectly cast `SongCard`.
*   **Section Labels with Counts:** Adds descriptive labels such as "Matching tracks," "Lyrics found," and "Bars" with corresponding counts to organize and summarize search results.
*   **Backend Update:** The backend now includes `album_title` in lyric search results, providing richer data for the frontend display.
*   **System Prompt Optimization:** The system prompt for the AI has been shortened to encourage more concise and relevant responses.

## Related

[[raag]],[[System Prompt]],[[UI Component]]
