---
title: Draggable Spotify Mini Player Bubble Feature
author: ai
created_at: 2026-04-10T22:25:32.919Z
last_ai_edit: 2026-04-10T22:25:32.919Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-draggable-spotify-mini-player-bubble-ed34c2.md]]"
tags:
  - spotify
  - mini player
  - draggable
  - ui
  - floating
  - raag
  - feature
  - frontend
  - javascript
  - error handling
  - ux
  - component
---

# Draggable Spotify Mini Player Bubble Feature

This commit introduces a significant UI enhancement by transforming the Spotify Mini Player into a draggable, floating bubble. It is designed to expand on click, snap to a home position near the chat input, and remains clamped within the viewport for an intuitive user experience. The feature also integrates RhymeSheet toggle functionality and includes robust error handling within the Spotify store.

## Key Concepts

* [[Draggable UI]],* [[Floating UI Elements]],* [[Spotify Integration]],* [[Viewport Clamping]],* [[Error Handling]]

## Details

This commit, identified by SHA `2b5f9e9` in the `rahilsinghi/raag` repository, focuses on reworking the existing Spotify Mini Player. The primary goal was to enhance its usability and aesthetic by making it a draggable, floating bubble. Key features of this update include:

*   **Draggable Interface:** The mini player can now be freely moved around the screen by the user.
*   **Floating Bubble:** It detaches from a fixed position, allowing for a more dynamic user experience.
*   **Expand on Click:** A single click on the bubble expands it, presumably revealing more controls or information.
*   **Snap to Home Position:** When released, the bubble intelligently snaps back to a predefined 'home' position, specifically to the right of the chat input.
*   **Viewport Clamping:** The bubble is constrained within the boundaries of the user's viewport, preventing it from being dragged off-screen.
*   **RhymeSheet Integration:** The update incorporates a toggle for the RhymeSheet, suggesting integration with lyrics or musical notation features.
*   **SpotifyProvider Wrapper:** A new `SpotifyProvider` wrapper was added, likely to manage Spotify API authentication and state more effectively.
*   **Play Error Handling:** Enhanced error handling mechanisms were implemented within the `spotify-store` to manage potential issues during playback.

This feature was authored by Rahil Singhi on 2026-03-06T22:39:38Z, involving 3 changed files with +243 additions and -84 deletions. Claude Opus 4.6 was also credited as a co-author.

## Related

[[raag Project]],[[Spotify Mini Player]],[[RhymeSheet]],[[User Interface/User Experience (UI/UX) Enhancements]],[[rahilsinghi]]
