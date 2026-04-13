---
title: "RaaG Chat UI Enhancement: Distinct Tool Cards"
author: ai
created_at: 2026-04-10T17:37:41.480Z
last_ai_edit: 2026-04-10T17:37:41.480Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-enhanced-chat-output-ui-with-distinct-card-types-per-tool-b27987.md]]"
tags:
  - raag
  - ui
  - chat
  - lyrics
  - songcontext
  - cardcomponents
  - enhancement
  - commit
  - tooling
  - frontend
---

# RaaG Chat UI Enhancement: Distinct Tool Cards

This update significantly improves the RaaG project's chat interface by introducing specialized UI components for different tool outputs. It adds `LyricCard` for lyric search results and `SongContextCard` for song context, ensuring a more informative and visually distinct presentation of data. The update also includes crucial routing fixes and minor UI enhancements.

## Key Concepts

LyricCard,SongContextCard,Chat UI,Tool Output Display,RaaG,Search by Lyrics,Get Song Context

## Details

This commit (`609077a`) introduces a major enhancement to the RaaG project's chat output user interface, focusing on creating distinct and informative card types for different tool results.

### New Card Components

*   **LyricCard:** A new component designed specifically for `search_by_lyrics` results. It features a quote-style presentation, an "MC" indicator, a section tag, album art, and a score, providing a rich and specific display for lyrical content.
*   **SongContextCard:** A new component for `get_song_context` results. This card presents full song statistics, relevant topics, and a collapsible lyrics preview, offering comprehensive song information at a glance.

### Chat Message Routing Fix
A critical fix was implemented for `ChatMessage` routing. This ensures that `search_by_lyrics` results now correctly render using the new `LyricCard` instead of an incorrectly cast `SongCard`, resolving a previous UI display issue.

### UI Enhancements
*   Section labels with counts (e.g., "Matching tracks", "Lyrics found", "Bars") were added to provide better organization and summarization of search results within the chat.

### Backend & System Prompt Changes
*   The backend was updated to include `album_title` in lyric search results, enriching the data available for display in the `LyricCard`.
*   The system prompt used for AI responses was shortened to encourage more concise outputs, improving chat efficiency and readability.

### Commit Information
*   **Repository:** `rahilsinghi/raag`
*   **SHA:** `609077a`
*   **Date:** `2026-03-04T01:54:14Z`
*   **Author:** Rahil Singhi
*   **Files Changed:** 6
*   **Additions:** +473 lines
*   **Deletions:** -42 lines

This commit was co-authored by Claude Opus 4.6.

## Related

[[RaaG Project]],[[Chat UI]],[[LyricCard Component]],[[SongContextCard Component]],[[Tool Integration]],[[RaaG Components]]
