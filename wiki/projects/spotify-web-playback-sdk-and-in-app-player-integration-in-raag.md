---
title: Spotify Web Playback SDK and In-App Player Integration in raag
author: ai
created_at: 2026-04-13T17:10:30.085Z
last_ai_edit: 2026-04-13T17:10:30.085Z
last_human_edit: null
last_embedded_hash: 21dcac9639867703
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-spotify-web-playback-sdk-in-app-player-7e8a3b.md]]"
tags:
  - spotify
  - music
  - player
  - sdk
  - integration
  - frontend
  - backend
  - oauth
  - zustand
  - audio
  - ui
---


# Spotify Web Playback SDK and In-App Player Integration in raag

This update integrates the Spotify Web Playback SDK into the `raag` project, enabling in-app music playback and control. It introduces a mini-player, authentication flow, and reusable UI components for managing Spotify content directly within the application. The feature enhances user interaction with musical elements displayed on various pages.

## Key Concepts

- Spotify Web Playback SDK,- In-app music player,- OAuth 2.0 for Spotify authentication,- Zustand state management,- API routes for token exchange,- UI components: `SpotifySDK`, `SpotifyMiniPlayer`, `PlayButton`, `SpotifyLoginButton`, `SpotifyCallback`,- Integration with `SongCard`, `SongContextCard`, `NodeDetailPanel`, chat page, and universe page.

## Details

This commit (`436129a`) by Rahil Singhi, co-authored by Claude Opus 4.6, introduces a comprehensive Spotify integration into the `[[raag]]` project. The changes involved 9 files, adding 673 lines of code.

Key features and components added include:
*   **`SpotifySDK` Component**: Responsible for loading the Spotify Web Playback SDK, initializing the in-app player, and retrieving the device ID for playback control.
*   **`SpotifyMiniPlayer`**: A floating bottom bar UI element that provides essential playback controls such as play/pause and skip, enhancing the continuous music experience.
*   **`PlayButton`**: A versatile component designed to display a play icon or a fallback external link, making it easy to trigger music playback across different parts of the application.
*   **`SpotifyLoginButton`**: Facilitates user authentication with Spotify, featuring a status indicator to show whether the SDK is `Ready` or `Connecting`.
*   **`SpotifyCallback`**: Handles the OAuth redirect flow by reading access tokens from the URL fragment after successful user authentication.
*   **Zustand `spotify-store`**: Implements a centralized state management solution for Spotify-related data, including authentication status, player state, and token refresh mechanisms.
*   **OAuth Callback API Route**: A server-side endpoint for securely exchanging authorization codes for access and refresh tokens.
*   **Spotify Web Playback SDK Type Declarations**: Adds necessary TypeScript type definitions for robust development.

Playback functionality has been integrated into several key UI areas:
*   **`SongCard`**: Allows direct playback of songs displayed in card format.
*   **`SongContextCard`**: Extends playback capabilities to song context displays.
*   **`NodeDetailPanel`**: Enables music playback directly from detailed node views.
*   **Chat Page and Universe Page**: Embeds Spotify components to enrich the user experience within these core application pages.

## Related

[[raag]],[[Spotify Web Playback SDK]],[[Zustand]],[[OAuth]],[[API Routes]],[[Animated Login Modal and Chat Sidebar Transitions (raag)]]
