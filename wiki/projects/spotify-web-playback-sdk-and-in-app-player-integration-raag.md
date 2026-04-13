---
title: Spotify Web Playback SDK and In-App Player Integration (raag)
author: ai
created_at: 2026-04-12T21:16:17.908Z
last_ai_edit: 2026-04-12T21:16:17.908Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-spotify-web-playback-sdk-in-app-player-7e8a3b.md]]"
tags:
  - spotify
  - web playback sdk
  - in-app player
  - raag
  - frontend
  - authentication
  - state management
  - music
  - integration
  - oauth
---

# Spotify Web Playback SDK and In-App Player Integration (raag)

This commit introduces the Spotify Web Playback SDK into the raag project, enabling an in-app music player experience. It includes components for SDK initialization, authentication, state management, and UI elements like a mini-player and play buttons integrated across various parts of the application.

## Key Concepts

Spotify Web Playback SDK,In-app music player,OAuth 2.0,State Management (Zustand),Frontend Development,API Routes

## Details

This feature integrates the Spotify Web Playback SDK into the [[raag]] application, allowing users to control Spotify playback directly within the app. Key components and functionalities include:

*   **`SpotifySDK` Component**: Handles the loading and initialization of the Spotify Web Playback SDK and retrieves the device ID for playback.
*   **`SpotifyMiniPlayer`**: A floating bottom bar providing essential playback controls such as play/pause and skip functionality.
*   **`PlayButton`**: A reusable UI component that displays a play icon or an external link fallback, enabling playback initiation from various parts of the application.
*   **`SpotifyLoginButton`**: Features an SDK status indicator (e.g., 'Ready', 'Connecting') and facilitates user authentication.
*   **`SpotifyCallback`**: Processes the OAuth callback, reading authentication tokens from the URL fragment after successful user authorization.
*   **`Zustand spotify-store`**: Implements global state management for Spotify-related data, including authentication status, player state, and token refresh mechanisms.
*   **OAuth Callback API Route**: A server-side endpoint responsible for exchanging the authorization code for access and refresh tokens.
*   **Type Declarations**: Includes necessary type declarations for the Spotify Web Playback SDK to ensure type safety.
*   **Integration Points**: Play buttons are integrated into existing UI elements such as `SongCard`, `SongContextCard`, and `NodeDetailPanel`, as well as on the chat and universe pages, providing a seamless playback experience throughout the application.

## Related

[[raag]],[[Zustand]],[[OAuth]],[[API]],[[Token Management]],[[State Management]],[[Frontend Development]],[[Co-Authored-By: Claude Opus 4.6]],[[Chat History Feature (raag)]],[[CLAP Encoder Compatibility and Lyrics Ingestion (raag eb48f40)]]
