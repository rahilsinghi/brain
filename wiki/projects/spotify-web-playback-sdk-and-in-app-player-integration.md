---
title: Spotify Web Playback SDK and In-App Player Integration
author: ai
created_at: 2026-04-10T22:07:19.454Z
last_ai_edit: 2026-04-10T22:07:19.454Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-spotify-web-playback-sdk-in-app-player-7e8a3b.md]]"
tags:
  - spotify
  - web-playback-sdk
  - music-player
  - integration
  - oauth
  - zustand
  - frontend
  - backend
  - feature
  - commit
  - raag
---

# Spotify Web Playback SDK and In-App Player Integration

This commit introduces a comprehensive integration of the Spotify Web Playback SDK to enable in-app music playback. It includes components for SDK management, a mini-player, OAuth authentication, and Zustand-based state management for Spotify services. The feature allows users to play Spotify content directly within the application.

## Key Concepts

[[Spotify Web Playback SDK]],[[OAuth 2.0]],[[Zustand]],[[In-App Music Player]],[[Device ID]],[[Server-Side Token Exchange]],[[Frontend-Backend Integration]]

## Details

This commit, identified by SHA `436129a` in the `rahilsinghi/raag` repository, was authored by Rahil Singhi on 2026-03-04T16:21:16Z. It involved changes across 9 files, adding 673 lines of code with no deletions. 

The core of the feature is the integration of the Spotify Web Playback SDK for an in-app music experience. Key additions include:

*   **`SpotifySDK` component**: Responsible for loading the Spotify Web Playback SDK, initializing the player instance, and acquiring the unique `device_id` necessary for playback.
*   **`SpotifyMiniPlayer`**: A persistent, floating bottom bar component providing essential playback controls like play, pause, and skip, offering a seamless user experience.
*   **`PlayButton`**: A versatile, reusable component that intelligently displays a play icon to initiate Spotify playback or provides a fallback external link if Spotify integration isn't active or available.
*   **`SpotifyLoginButton`**: Facilitates user authentication with Spotify, featuring a status indicator (e.g., "Ready", "Connecting") to inform the user about the SDK's state.
*   **`SpotifyCallback`**: Handles the post-OAuth redirect, parsing authentication tokens from the URL fragment to complete the login process.
*   **`Zustand spotify-store`**: A dedicated Zustand store to manage Spotify-related state, including authentication tokens, player status, and logic for token refreshing.
*   **OAuth callback API route**: A server-side API endpoint was added to securely exchange the OAuth authorization code for Spotify access and refresh tokens, crucial for persistent authentication.
*   **Spotify Web Playback SDK type declarations**: Type definitions were included to enhance developer experience and ensure type safety when interacting with the SDK.
*   **Integration Points**: The new play functionality was integrated into various existing components, including `SongCard`, `SongContextCard`, and `NodeDetailPanel`, allowing users to initiate playback from multiple contexts.
*   **Page Integration**: Spotify components were also added to the `chat page` and `universe page`, extending the feature's reach across the application.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>

## Related

[[raag]],[[Rahil Singhi]],[[Claude Opus 4.6]],[[SongCard]],[[SongContextCard]],[[NodeDetailPanel]],[[Chat Page]],[[Universe Page]]
