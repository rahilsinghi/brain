---
title: Spotify Integration and Track Matching Backend
author: ai
created_at: 2026-04-10T17:32:52.426Z
last_ai_edit: 2026-04-10T17:32:52.426Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-spotify-oauth-track-matching-backend-f8ba5c.md]]"
tags:
  - spotify
  - oauth
  - backend
  - api
  - track matching
  - development
  - feature
  - raag
  - authorization-code-flow
---

# Spotify Integration and Track Matching Backend

This entry describes the implementation of Spotify OAuth and a track matching backend for the 'raag' project. It covers the creation of new API endpoints for authentication and track management, along with automatic matching of existing database songs to Spotify tracks.

## Key Concepts

*   Spotify OAuth,*   Authorization Code Flow,*   RESTful API Endpoints,*   Track Matching Algorithm,*   Database Schema Modification,*   Environment Variables (Config Vars)

## Details

This feature, committed to the `rahilsinghi/raag` repository (SHA: `d977528`) on 2026-03-04 by Rahil Singhi (with co-authorship by Claude Opus 4.6), introduces a robust Spotify integration into the backend.

Key functionalities include:

*   **Spotify API Endpoints**: A set of new API endpoints under `/api/spotify` were added to manage Spotify interactions:
    *   `/auth-url`: Provides the URL for initiating the Spotify Authorization Code flow.
    *   `/token`: Handles the callback from Spotify and exchanges the authorization code for access and refresh tokens.
    *   `/refresh`: Refreshes the Spotify access token using the refresh token.
    *   `/search`: Allows searching for tracks on Spotify.
    *   `/match-all`: Triggers an automatic process to match all existing songs in the database to Spotify tracks.
    *   `/track/:id`: Retrieves details for a specific Spotify track by its ID.

*   **OAuth Implementation**: The system utilizes the Spotify Authorization Code flow, configured to use a `client_secret` (without PKCE) for secure authentication.

*   **Automated Track Matching**: A significant part of this feature is the ability to automatically match all songs stored in the application's database with corresponding tracks on Spotify using the Spotify Search API. This enriches the application's song data.

*   **Database Integration**: The `songs` table in the database was extended with two new columns:
    *   `spotify_track_id`: Stores the unique identifier for the matched Spotify track.
    *   `spotify_preview_url`: Stores the URL for a 30-second audio preview of the Spotify track.

*   **Data Exposure**: The `spotify_track_id` is now included in search results and graph node metadata, allowing the frontend to link directly to Spotify or play previews.

*   **Configuration**: Essential Spotify configuration variables (`client_id`, `client_secret`, `redirect_uri`) are now managed as environment variables to ensure secure and flexible deployment.

## Related

[[Rahil Singhi]],[[Claude Opus 4.6]],[[raag (Project)]],[[OAuth 2.0]],[[Spotify API]],[[API Design]],[[Database Schema]]
