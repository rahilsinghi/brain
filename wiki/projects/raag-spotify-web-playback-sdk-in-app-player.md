---
title: "Raag: Spotify Web Playback SDK In-App Player"
author: ai
created_at: 2026-04-10T17:08:34.191Z
last_ai_edit: 2026-04-10T17:08:34.191Z
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
  - backend
  - oauth
  - zustand
  - music player
---

# Raag: Spotify Web Playback SDK In-App Player

This feature integrates the Spotify Web Playback SDK into the Raag project, enabling an in-app music player experience. It includes UI components like a mini-player and play buttons, alongside robust state management and OAuth authentication for seamless Spotify integration.

## Key Concepts

- Spotify Web Playback SDK,- OAuth 2.0 (Authorization Code Flow),- Zustand (state management),- Server-side token exchange,- Client-side UI components (MiniPlayer, PlayButton, LoginButton),- Device ID management,- Spotify API (for playback and authentication)

## Details

This commit (`436129a`), authored by Rahil Singhi on 2026-03-04, introduces a comprehensive integration of the Spotify Web Playback SDK into the `rahilsinghi/raag` project. The primary goal is to provide users with an in-app music playback experience directly within the application.

Key components and functionalities implemented include:

*   **SpotifySDK Component**: Responsible for loading the Spotify Web Playback SDK script, initializing the player instance, and obtaining the unique `device_id` necessary for directing playback.
*   **SpotifyMiniPlayer**: A floating bottom bar UI element that provides essential playback controls such as play/pause and skip functionality, accessible throughout the application.
*   **PlayButton**: A reusable UI component that intelligently displays a play icon for integrated Spotify content or a fallback external link if the SDK is not active or applicable.
*   **SpotifyLoginButton**: Facilitates user authentication with Spotify, featuring a status indicator to show whether the SDK is `Ready` or `Connecting`.
*   **SpotifyCallback**: A dedicated component to handle the OAuth redirect, parsing authentication tokens from the URL fragment.
*   **Zustand `spotify-store`**: A centralized state management solution for maintaining Spotify-related state, including authentication tokens, player status, and implementing token refresh logic.
*   **OAuth Callback API Route**: A server-side endpoint responsible for securely exchanging the authorization code received during OAuth for access and refresh tokens.
*   **Spotify Web Playback SDK Type Declarations**: Addition of TypeScript type definitions to enhance development experience and code safety.
*   **UI Integration**: Play buttons and Spotify components are seamlessly integrated across various parts of the application, including `SongCard`, `SongContextCard`, `NodeDetailPanel`, as well as the `chat page` and `universe page`, ensuring a consistent user experience.

This feature significantly enhances the Raag application's multimedia capabilities by directly embedding Spotify playback functionality.

## Related

[[Raag]],[[Spotify API]],[[OAuth 2.0]],[[Zustand]]
