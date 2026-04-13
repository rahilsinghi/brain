---
title: "Raag Chat UI Enhancement: Distinct Tool Output Cards"
author: ai
created_at: 2026-04-10T22:24:05.774Z
last_ai_edit: 2026-04-10T22:24:05.774Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-enhanced-chat-output-ui-with-distinct-card-types-per-tool-b27987.md]]"
tags:
  - raag
  - ui
  - chat
  - frontend
  - card_components
  - lyrics_search
  - song_context
  - backend_update
  - ai_prompt
  - feature_enhancement
---

# Raag Chat UI Enhancement: Distinct Tool Output Cards

This update to the Raag project significantly enhances the chat output user interface by introducing distinct card types for different tool results. It features a new `LyricCard` for lyric search results and a `SongContextCard` for song context information, improving clarity and functionality.

## Key Concepts

- `LyricCard`,- `SongContextCard`,- Chat UI/Output,- Tool Output Display,- `search_by_lyrics` tool,- `get_song_context` tool,- System Prompt Optimization

## Details

This commit, identified by `609077a` in the `rahilsinghi/raag` repository, focuses on a major overhaul of the chat output UI. Authored by Rahil Singhi and co-authored by Claude Opus 4.6, the update introduces specialized components for displaying tool execution results more effectively.

### Key UI Enhancements:

*   **New `LyricCard` Component:** Designed specifically for results from the `search_by_lyrics` tool. This card displays lyrics in a quote-style format, includes an 'MC' (matching count) indicator, a section tag, album art, and a relevance score. This replaces a previously broken cast to `SongCard` for lyric search results.
*   **New `SongContextCard` Component:** Introduced for displaying comprehensive information from the `get_song_context` tool. This card presents full statistics about the song, relevant topics, and a collapsible lyrics preview, offering a richer user experience.
*   **ChatMessage Routing Fix:** The commit rectifies an issue where `search_by_lyrics` results were incorrectly attempting to render as `SongCard`, leading to display errors. It now correctly routes these results to the new `LyricCard`.
*   **Section Labels with Counts:** The chat output now includes clear section labels such as "Matching tracks," "Lyrics found," and "Bars," along with their respective counts, to provide better context and organization.

### Backend and Prompt Adjustments:

*   **Backend Update:** The backend was modified to include `album_title` in the data returned for lyric search results, enabling its display within the new `LyricCard`.
*   **System Prompt Shortening:** The AI's system prompt has been made more concise, aiming to elicit shorter and more direct responses from the language model.

### Commit Details:

*   **Repo:** `rahilsinghi/raag`
*   **SHA:** `609077a`
*   **Date:** `2026-03-04T01:54:14Z`
*   **Author:** Rahil Singhi
*   **Co-Authored-By:** Claude Opus 4.6 <noreply@anthropic.com>
*   **Files changed:** 6
*   **Additions:** +473
*   **Deletions:** -42

## Related

[[Raag Project]],[[Chat User Interface]],[[Lyric Search Functionality]],[[Song Context Analysis]],[[Tool Use in LLMs]]
