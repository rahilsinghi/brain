---
title: "Flock Project: Host Page Session Resolution Fix"
author: ai
created_at: 2026-04-12T21:40:11.042Z
last_ai_edit: 2026-04-12T21:40:11.042Z
last_human_edit: null
last_embedded_hash: ad173f48945b6ae4
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-fix-host-page-uses-api-for-session-resolution-not-client-sup-7349cd.md]]"
tags:
  - flock
  - bugfix
  - supabase
  - api
  - sessionmanagement
  - backend
  - frontend
  - rls
  - polling
  - server-side
---


# Flock Project: Host Page Session Resolution Fix

This article details a critical bug fix in the Flock project where the host page failed to display participants due to incorrect session resolution. The issue stemmed from client-side Supabase attempting to read session data, which was blocked by Row Level Security (RLS). The fix involved refactoring the host page to use a server-side API for session resolution, ensuring proper data access and immediate polling.

## Key Concepts

[[Supabase]],Client-side vs. Server-side Session Resolution,Row Level Security (RLS),API Parameter Passing,Polling Mechanism,Service Role Key,Session Management

## Details

The `rahilsinghi/Flock` project experienced a significant bug where the host page remained stuck on "Waiting for travelers." The root cause was identified as the host page attempting to resolve a room code to a session ID using client-side Supabase, which was configured with an anonymous key. Supabase's Row Level Security (RLS) policies prevented anonymous reads from the `sessions` table, causing the `sessionId` to remain null and preventing the polling mechanism from initiating.

To resolve this, the following changes were implemented:

*   The existing Participants API was enhanced to accept a `?roomCode=` parameter, allowing server-side resolution of the room code to a session ID using a Supabase `service role key`.
*   The API was further extended to return city data for the 'sphere' visualization, completely eliminating the need for any client-side Supabase interactions on the host page.
*   The host page was updated to immediately poll the API using the `roomCode` upon mounting, capturing the `sessionId` directly from the API response.
*   All client-side Supabase imports were removed from the host page to streamline the logic and prevent future RLS-related issues.
*   The polling process now initiates immediately upon component mount, rather than waiting for a `sessionId` to be set locally.

This fix successfully addressed the primary demo-blocking bug, enabling the host screen to correctly display joining participants, update round states, and render the interactive sphere.

## Related

[[Flock Project]],[[API Feature: GET /health Route with Status, Uptime, and Article Counts]],[[Supabase]],[[API Parameter Passing]],[[Claude Opus 4.6]]
