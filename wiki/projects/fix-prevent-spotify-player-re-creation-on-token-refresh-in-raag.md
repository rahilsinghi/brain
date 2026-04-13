---
title: "Fix: Prevent Spotify Player Re-creation on Token Refresh in raag"
author: ai
created_at: 2026-04-12T18:21:40.464Z
last_ai_edit: 2026-04-12T18:21:40.464Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-fix-prevent-spotify-player-re-creation-on-token-refresh-6e4e7a.md]]"
tags:
  - spotify
  - raag
  - frontend
  - bug fix
  - oauth
  - token management
  - react
  - useeffect
---

# Fix: Prevent Spotify Player Re-creation on Token Refresh in raag

This commit addresses a bug in the `rahilsinghi/raag` project where the Spotify player would unnecessarily re-initialize upon OAuth token refreshes. The fix involves modifying `useEffect` dependencies to prevent player teardown and improving SDK hot-reload handling for a smoother user experience.

## Key Concepts

[[Spotify Player]],[[OAuth Token]] refresh,[[useEffect Hook]],[[SDK Hot-Reload]],Dependency management

## Details

The commit `c591332` in the `rahilsinghi/raag` repository implements a crucial bug fix to prevent the Spotify player from being torn down and re-created every time the OAuth token refreshes. Previously, the `accessToken` was included in the dependency array of a `useEffect` hook responsible for player initialization, causing the effect to re-run and re-instantiate the player whenever the token was updated.

To resolve this, `accessToken` was removed from the `useEffect` dependencies. Instead, the `getOAuthToken` callback now dynamically calls `getValidToken()` within its scope, ensuring that the player always operates with a current and valid token without triggering a full re-initialization. Additionally, the change includes improved handling for SDK hot-reloads and guards cleanup operations against null player instances, increasing the robustness and stability of the player integration. This update involved 89 lines of additions and 78 lines of deletions, indicating a significant refactor of the player's lifecycle management.

## Related

[[raag]],[[Chat History Feature (raag)]],[[Backend Foundation for raag project with FastAPI, Pydantic, and Celery]]
