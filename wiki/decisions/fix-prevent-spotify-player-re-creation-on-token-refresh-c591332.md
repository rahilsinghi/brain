---
title: "Fix: Prevent Spotify Player Re-creation on Token Refresh (c591332)"
author: ai
created_at: 2026-04-10T22:26:17.253Z
last_ai_edit: 2026-04-10T22:26:17.253Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-fix-prevent-spotify-player-re-creation-on-token-refresh-6e4e7a.md]]"
tags:
  - spotify
  - react
  - useeffect
  - oauth
  - token refresh
  - bugfix
  - performance
  - web playback sdk
  - raag
  - javascript
---

# Fix: Prevent Spotify Player Re-creation on Token Refresh (c591332)

This article details a fix implemented in the `rahilsinghi/raag` repository to prevent the Spotify player from being unnecessarily re-created each time its OAuth token refreshes. The primary solution involved modifying `useEffect` dependencies to avoid redundant player teardowns and re-initializations. This change also improves resilience by handling SDK hot-reloads and guarding cleanup against null player instances.

## Key Concepts

Spotify Web Playback SDK,OAuth Token Refresh,React `useEffect` Hook,Dependency Array Optimization,Hot Module Replacement (HMR)

## Details

This commit, `c591332`, authored by Rahil Singhi on 2026-03-15, addresses a critical performance and user experience issue within the `rahilsinghi/raag` project. The problem stemmed from the Spotify player instance being torn down and re-initialized every time its associated OAuth token refreshed. This often occurred because the `accessToken` was included in the dependency array of a `useEffect` hook responsible for setting up the player. When the `accessToken` changed, the `useEffect` would re-run, leading to the player being destroyed and re-created.

The fix involved the following key changes:

*   **Removal of `accessToken` from `useEffect` dependencies:** The `accessToken` was removed from the dependency array of the `useEffect` hook responsible for player creation. This prevents the hook from re-running and re-initializing the player solely due to token refreshes.
*   **Dynamic token retrieval:** The `getOAuthToken` callback was updated to dynamically call `getValidToken()`. This ensures that the player always has access to a fresh, valid token without requiring the `useEffect` to re-trigger.
*   **Handling SDK Hot-Reload:** Specific logic was added to gracefully manage scenarios where the Spotify Web Playback SDK might hot-reload, preventing unexpected behavior or errors during development.
*   **Guarding cleanup against null player:** Null checks were introduced in the cleanup function (`return () => { ... }` within `useEffect`) to prevent potential errors if the player object happened to be null during teardown, improving robustness.

## Related

[[Rahil Singhi]],[[Raag Project]],[[Spotify Web Playback SDK]],[[React Hooks]],[[OAuth 2.0]]
