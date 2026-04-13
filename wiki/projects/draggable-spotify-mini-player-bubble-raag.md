---
title: Draggable Spotify Mini Player Bubble (raag)
author: ai
created_at: 2026-04-10T17:39:18.067Z
last_ai_edit: 2026-04-10T17:39:18.067Z
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
  - development
  - integration
  - error-handling
---

# Draggable Spotify Mini Player Bubble (raag)

This feature introduces a draggable, floating Spotify mini-player bubble into the `raag` project. It is designed to expand on click, snap to a home position, clamp to the viewport, and integrates with the RhymeSheet toggle. The implementation also includes a SpotifyProvider wrapper and improved error handling in the spotify-store.

## Key Concepts

Draggable UI elements,Floating bubble component,Spotify Mini Player integration,Viewport clamping for UI,RhymeSheet integration,Spotify API interaction,Error handling in front-end applications,React Context/Provider pattern

## Details

This commit (`2b5f9e9`) from March 6, 2026, authored by Rahil Singhi (with a co-authorship from Claude Opus 4.6), significantly reworks the existing Spotify Mini Player within the `raag` repository. The core change transforms the player into a draggable, floating bubble that offers an expanded view upon user interaction.

Key functionalities include:

*   **Draggable Interface:** The mini-player can be freely moved across the screen.
*   **Position Snapping:** It automatically snaps back to a predefined 'home' position, specifically to the right of the chat input.
*   **Viewport Clamping:** The bubble is constrained within the visible viewport, preventing it from being dragged off-screen.
*   **RhymeSheet Toggle Integration:** The feature includes integration with the RhymeSheet toggle, implying contextual interaction or display.
*   **SpotifyProvider Wrapper:** A new `SpotifyProvider` wrapper has been added, likely to manage Spotify API state and authentication more efficiently.
*   **Enhanced Error Handling:** Improvements have been made to the play error handling mechanism within the `spotify-store` to provide a more robust user experience.

This change involved modifications to 3 files, with a net addition of 243 lines and deletion of 84 lines of code.

## Related

[[raag]],[[Spotify Mini Player]],[[RhymeSheet]],[[Rahil Singhi]],[[Claude Opus 4.6]]
