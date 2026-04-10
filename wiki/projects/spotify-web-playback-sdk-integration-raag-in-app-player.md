---
title: Spotify Web Playback SDK Integration – Raag In-App Player
author: ai
created_at: 2026-04-10T02:40:53.477Z
last_ai_edit: 2026-04-10T02:40:53.477Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-spotify-web-playback-sdk-in-app-player-7e8a3b.md]]"
tags:
  - spotify
  - web-playback-sdk
  - oauth
  - zustand
  - music-player
  - raag
  - react
  - typescript
  - in-app-playback
  - frontend
  - api-integration
  - state-management
---

# Spotify Web Playback SDK Integration – Raag In-App Player

This commit introduces a full Spotify Web Playback SDK integration into the Raag application, enabling in-app music playback without redirecting users to external Spotify links. The implementation includes OAuth authentication flow, a floating mini-player UI, reusable play controls, and a Zustand-based state store for managing auth and player state across the app.

## Key Concepts

- **Spotify Web Playback SDK**: Browser-based SDK that allows web apps to become a Spotify playback device
- **OAuth Token Exchange**: Server-side callback route that exchanges authorization codes for access/refresh tokens
- **SpotifyCallback Component**: Reads tokens from the URL fragment after the OAuth redirect flow completes
- **SpotifySDK Component**: Loads the SDK script, initializes the player instance, and retrieves the `device_id`
- **SpotifyMiniPlayer**: Floating bottom bar UI component providing play/pause and skip controls
- **PlayButton**: Reusable component that renders a play icon when SDK is ready, or falls back to an external Spotify link
- **SpotifyLoginButton**: Login trigger with real-time SDK status indicator (Ready / Connecting states)
- **Zustand spotify-store**: Centralized state management for authentication tokens, token refresh logic, and player state
- **Type Declarations**: Custom TypeScript type definitions added for the Spotify Web Playback SDK

## Details

## Overview

Commit `436129a` in the `rahilsinghi/raag` repository adds 673 lines across 9 files to implement a complete Spotify in-app playback experience. This feature allows users to play music directly within the Raag interface rather than being redirected to Spotify's external client.

## Components Added

### `SpotifySDK`
Responsible for dynamically loading the Spotify Web Playback SDK script, initializing the player with the user's access token, and capturing the `device_id` assigned by Spotify. The device ID is required to transfer playback to the in-app player.

### `SpotifyMiniPlayer`
A floating bottom bar UI element that provides persistent playback controls (play/pause, skip forward/back) visible across pages. This component subscribes to player state from the Zustand store.

### `PlayButton`
A reusable component integrated into `SongCard`, `SongContextCard`, and `NodeDetailPanel`. When the SDK is active and ready, it triggers in-app playback. If the SDK is unavailable or the user is not authenticated, it gracefully falls back to an external Spotify link.

### `SpotifyLoginButton`
Provides a login entry point for Spotify OAuth. Displays a real-time status badge indicating whether the SDK is in a `Ready` or `Connecting` state.

### `SpotifyCallback`
Handles the OAuth redirect by reading the access token and other parameters from the URL fragment (`#access_token=...`). Passes tokens to the Zustand store for persistence.

## State Management

A new Zustand store (`spotify-store`) manages:
- **Auth state**: Access token, refresh token, expiry time
- **Token refresh**: Automated refresh logic before token expiry
- **Player state**: Current track, playback status, device ID

## API Route

A new server-side API route handles the OAuth callback, performing the secure server-side token exchange with Spotify's API using the client secret, keeping credentials off the client.

## Integration Points

Spotify playback controls and components were integrated into the following surfaces:
- `SongCard`
- `SongContextCard`
- `NodeDetailPanel`
- Chat page
- Universe page

## Technical Notes

- Custom TypeScript type declarations were added for the Spotify Web Playback SDK, which does not ship with official types.
- Co-authored with Claude Opus 4.6, indicating AI-assisted development.
- Net change: +673 additions, 0 deletions — entirely additive feature work.

## Related

- [[Raag Application]]
- [[Spotify OAuth Integration]]
- [[Zustand State Management]]
- [[SongCard Component]]
- [[NodeDetailPanel Component]]
- [[Web Playback SDK]]
- [[In-App Music Player]]
- [[Token Refresh Strategy]]
- [[Universe Page]]
- [[Chat Page]]
