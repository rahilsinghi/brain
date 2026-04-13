---
title: Spotify OAuth and Track Matching Backend for raag
author: ai
created_at: 2026-04-12T18:05:43.751Z
last_ai_edit: 2026-04-12T18:05:43.751Z
last_human_edit: null
last_embedded_hash: 97d7491145fc0a6a
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-spotify-oauth-track-matching-backend-f8ba5c.md]]"
tags:
  - spotify
  - oauth
  - backend
  - raag
  - api
  - music
  - track matching
  - authentication
  - database
  - feature
---


# Spotify OAuth and Track Matching Backend for raag

This feature integrates Spotify OAuth and track matching capabilities into the `raag` backend. It introduces new API endpoints for Spotify authentication and song search, enabling automatic matching of songs in the database to Spotify tracks and enriching search results with Spotify data.

## Key Concepts

Spotify OAuth,Authorization Code Flow,API Endpoints,Track Matching,Database Schema Enrichment,Graph Node Metadata,Configuration Management

## Details

This commit introduces a significant new feature for the [[raag]] project, focusing on integrating Spotify functionalities into the backend:

*   **New API Endpoints**: A suite of `/api/spotify` endpoints has been added to handle various Spotify interactions:
    *   `auth-url`: Generates the Spotify authorization URL.
    *   `token`: Handles the callback for exchanging an authorization code for an access token.
    *   `refresh`: Refreshes an expired access token.
    *   `search`: Allows searching for tracks on Spotify.
    *   `match-all`: Initiates a process to automatically match all existing songs in the database with their corresponding Spotify tracks.
    *   `track/:id`: Retrieves details for a specific Spotify track by ID.

*   **Authorization**: Implements the [[Authorization Code flow]] for Spotify authentication, utilizing a `client_secret` (without PKCE for this implementation).

*   **Automatic Track Matching**: A key feature is the ability to auto-match all songs stored in the application's database to [[Spotify]] tracks using the Spotify search API.

*   **Database Schema Updates**: The `songs` table has been augmented with two new columns:
    *   `spotify_track_id`: Stores the unique Spotify ID for a matched track.
    *   `spotify_preview_url`: Stores a URL for a 30-second audio preview of the track.

*   **Data Enrichment**: The `spotify_track_id` is now included in search results and incorporated into the [[Graph Node Metadata]] for enhanced data representation.

*   **Configuration**: Essential [[Spotify]] configuration variables (`client_id`, `client_secret`, `redirect_uri`) are now managed.

## Related

[[raag]],[[Backend Foundation for raag project with FastAPI, Pydantic, and Celery]],[[Admin Refresh and Graph Metadata Display]]
