---
title: Spotify Web Playback SDK Integration in Raag
author: ai
created_at: 2026-04-10T02:40:55.028Z
last_ai_edit: 2026-04-10T02:40:55.028Z
last_human_edit: null
last_embedded_hash: 01abeed75286db65
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-spotify-web-playback-sdk-in-app-player-7e8a3b.md]]"
tags:
  - spotify
  - web-playback-sdk
  - oauth
  - zustand
  - raag
  - music
  - in-app-player
  - react
  - typescript
  - api-integration
  - state-management
  - ui-components
---



# Spotify Web Playback SDK Integration in Raag

This commit introduces full Spotify in-app playback support to the Raag application, enabling users to play music directly within the app via the Spotify Web Playback SDK. The implementation includes OAuth authentication flow, a floating mini-player UI, and a Zustand-based state store for managing player and auth state. Play buttons are integrated across multiple UI components including song cards, context cards, and detail panels.

## Key Concepts

- **Spotify Web Playback SDK**: Browser-based SDK that allows web apps to act as a Spotify playback device
- **OAuth Token Exchange**: Server-side callback route that exchanges authorization codes for access/refresh tokens
- **Zustand Store**: Centralized state management for Spotify auth credentials and player state
- **Device ID**: Unique identifier assigned by Spotify SDK to the in-app player instance, required to transfer playback
- **Token Refresh**: Mechanism to renew expired Spotify access tokens without re-authentication
- **Floating Mini-Player**: Persistent bottom-bar UI component providing playback controls (play/pause/skip)
- **Fallback Behavior**: PlayButton component degrades gracefully to an external Spotify link when SDK is unavailable

## Details

## Overview

Commit `436129a` to the `rahilsinghi/raag` repository adds a comprehensive Spotify in-app playback system. The feature spans 9 files with 673 additions, co-authored with Claude Opus 4.6.

## Components Added

### SpotifySDK
Responsible for loading the Spotify Web Playback SDK script, initializing the player instance, and capturing the `device_id` assigned by Spotify. This device ID is required to transfer playback to the in-app player.

### SpotifyMiniPlayer
A floating bottom bar UI component that provides core playback controls:
- Play / Pause toggle
- Skip forward and backward
- Persistent visibility across pages

### PlayButton
A reusable button component with two modes:
- **SDK Mode**: Triggers in-app playback via the initialized Spotify player
- **Fallback Mode**: Renders an external link to open the track in Spotify when the SDK is not ready or unavailable

### SpotifyLoginButton
Handles initiating the Spotify OAuth flow and displays an SDK status indicator showing one of two states:
- `Ready`: SDK is initialized and playback is available
- `Connecting`: SDK is still loading or authenticating

### SpotifyCallback
A client-side component that reads OAuth tokens from the URL fragment (`#access_token`, `#refresh_token`, etc.) after the Spotify authorization redirect.

## State Management

### Zustand `spotify-store`
Centralized store managing:
- **Auth state**: Access token, refresh token, expiry
- **Player state**: Current track, playback status, device ID
- **Token refresh logic**: Automatically renews access tokens on expiry

## API Routes

### OAuth Callback Route
A server-side API route handles the secure token exchange, sending the authorization code to Spotify's token endpoint and returning credentials to the client.

## Type Declarations
Custom TypeScript type declarations were added for the Spotify Web Playback SDK, providing type safety across all SDK interactions.

## UI Integration

Play buttons and Spotify components were integrated into the following surfaces:
- **SongCard**: Inline play button on song listing cards
- **SongContextCard**: Play button within contextual song information panels
- **NodeDetailPanel**: Playback control in the graph node detail view
- **Chat Page**: Spotify components available during conversational music discovery
- **Universe Page**: Playback accessible within the music universe exploration view

## Authorship
Authored by Rahil Singhi on 2026-03-04, co-authored by Claude Opus 4.6.

## Related

- [[Raag Application]]
- [[Spotify OAuth Flow]]
- [[Zustand State Management]]
- [[Web Playback SDK]]
- [[SongCard Component]]
- [[NodeDetailPanel]]
- [[Music Universe Page]]
- [[Chat Page]]
- [[Token Refresh Strategy]]
