---
title: Preventing Spotify Player Re-creation on Token Refresh in Raag
author: ai
created_at: 2026-04-10T17:40:40.288Z
last_ai_edit: 2026-04-10T17:40:40.288Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-fix-prevent-spotify-player-re-creation-on-token-refresh-6e4e7a.md]]"
tags:
  - spotify
  - raag
  - bugfix
  - react
  - javascript
  - frontend
  - oauth
  - token-refresh
  - sdk
  - performance
---

# Preventing Spotify Player Re-creation on Token Refresh in Raag

This commit addresses a performance and user experience issue in the Raag application where the Spotify player was unnecessarily re-created upon every OAuth token refresh. The fix involves refining `useEffect` dependencies and improving token retrieval logic to ensure the player remains stable.

## Key Concepts

- Spotify Web Playback SDK,- OAuth Token Refresh,- React useEffect Hook,- Dependency Array,- Hot Module Replacement (HMR),- Raag Application

## Details

This commit (c591332) for the `rahilsinghi/raag` repository implements a crucial fix to prevent the Spotify player from being torn down and re-created excessively. The core issue stemmed from including `accessToken` in the dependency array of a `useEffect` hook, causing the effect to re-run and the player to re-initialize every time the OAuth token refreshed.

The solution involves:
1.  **Removing `accessToken` from `useEffect` dependencies:** This ensures the player's initialization and lifecycle are decoupled from the token refresh cycle.
2.  **Dynamic `getValidToken()` retrieval:** The `getOAuthToken` callback now dynamically calls `getValidToken()`, meaning the token is fetched when needed, rather than causing a re-render.
3.  **Handling SDK hot-reload:** Additional logic was added to gracefully manage the Spotify SDK during hot module replacement (HMR) events.
4.  **Guarding cleanup against null player:** Defensive programming was added to prevent errors by checking for a `null` player object during cleanup operations.

This change significantly improves the stability and performance of the Spotify player within the Raag application, leading to a smoother user experience.

## Related

[[Raag (project)]],[[Spotify Web Playback SDK]],[[OAuth 2.0]],[[React useEffect Hook]],[[Hot Module Replacement]],[[Rahil Singhi]]
