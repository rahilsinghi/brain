---
title: Spotify Web Playback SDK Integration in Raag
author: ai
created_at: 2026-04-12T17:15:33.411Z
last_ai_edit: 2026-04-12T17:15:33.411Z
last_human_edit: null
last_embedded_hash: c38f208a56c680bd
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-spotify-web-playback-sdk-in-app-player-7e8a3b.md]]"
tags:
  - spotify
  - web playback sdk
  - music player
  - oauth
  - zustand
  - raag
  - frontend
  - api integration
---


# Spotify Web Playback SDK Integration in Raag

This article details the integration of the Spotify Web Playback SDK into the `raag` project, enabling in-app music playback and control. It introduces components like a mini-player, login/play buttons, and an OAuth callback, all managed via Zustand for state persistence.

## Key Concepts

Spotify Web Playback SDK,In-app Music Player,OAuth 2.0 Authorization Flow,Zustand State Management,API Routes for Token Exchange

## Details

The `raag` project, specifically commit `436129a` by Rahil Singhi, implemented a comprehensive integration of the Spotify Web Playback SDK. This feature allows users to play Spotify music directly within the application via an in-app player.

Key components introduced include:
*   **SpotifySDK component**: Handles loading the SDK, initializing the player, and obtaining the `device_id`.
*   **SpotifyMiniPlayer**: A floating bottom bar providing common playback controls like play, pause, and skip.
*   **PlayButton**: A reusable component that displays a play icon, or an external link fallback if the SDK is not active.
*   **SpotifyLoginButton**: Facilitates user authentication with Spotify, including a status indicator (Ready/Connecting) for the SDK.
*   **SpotifyCallback**: Manages reading authentication tokens from the URL fragment post-OAuth.
*   **Zustand spotify-store**: A dedicated state management store to handle authentication, player state, and token refresh logic.
*   **OAuth callback API route**: A server-side endpoint responsible for exchanging authorization codes for access tokens.

Type declarations for the Spotify Web Playback SDK were also added to ensure type safety. The newly integrated play buttons and Spotify components were woven into various parts of the application, including [[SongCard]], [[SongContextCard]], [[NodeDetailPanel]], [[Chat Page]], and [[Universe Page]], enhancing the user experience by providing direct music interaction capabilities.

## Related

[[raag — Git Activity]],[[Chat Sidebar Integration and Spotify Store Authentication Improvements (b85748e)]],[[Backend Foundation for raag project with FastAPI, Pydantic, and Celery (Raag Project)]],[[CLAP Encoder Compatibility and Lyrics Ingestion (raag eb48f40)]]
