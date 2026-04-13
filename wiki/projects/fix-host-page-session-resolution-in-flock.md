---
title: "Fix: Host Page Session Resolution in Flock"
author: ai
created_at: 2026-04-12T17:39:42.802Z
last_ai_edit: 2026-04-12T17:39:42.802Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-fix-host-page-uses-api-for-session-resolution-not-client-sup-7349cd.md]]"
tags:
  - flock
  - bugfix
  - api
  - supabase
  - authentication
  - session
  - frontend
  - backend
  - real-time
  - host page
---

# Fix: Host Page Session Resolution in Flock

This article details a critical fix implemented in the Flock project addressing a demo-blocking bug where the host page failed to display participants. The issue stemmed from incorrect client-side Supabase authentication for session ID resolution, which was resolved by switching to server-side API calls with service role keys.
This enabled proper session handling, real-time updates, and accurate participant display on the host screen.

## Key Concepts

Client-side authentication,Server-side authentication,Supabase,Row Level Security (RLS),API Parameters,Real-time polling,Session management,Room code

## Details

### Context: Flock Project Host Page Bug

In the [[Flock Project]], the host page was designed to display joining participants, update round states, and render interactive elements like the sphere. A critical bug, identified in commit `26ae077` on 2026-03-21, prevented this functionality, causing the host page to remain stuck on "Waiting for travelers."

#### Root Cause
The core of the problem lay in the host page's method for resolving a `roomCode` to a `session ID`. It utilized client-side [[Supabase]] with an anonymous key for this operation. However, the `sessions` table in [[Supabase]] had [[Row Level Security (RLS)]] enabled, which blocked anonymous reads. Consequently, the `sessionId` variable remained null, preventing the necessary polling mechanism from initiating and thus halting all real-time updates and participant displays.

### Implemented Fix

To resolve this issue, the following changes were made:

1.  **API Enhancement**: The [[Participants API]] was updated to accept a `roomCode` as a query parameter. This allowed the `roomCode` to `session ID` resolution to occur server-side, leveraging a [[Supabase]] service role key that bypasses RLS restrictions.
2.  **Reduced Client-Side Dependency**: The [[Participants API]] was also modified to return city data for the sphere directly. This eliminated the need for any client-side [[Supabase]] calls on the host page, streamlining the data flow.
3.  **Immediate Polling**: The host page was modified to initiate [[Polling]] immediately upon mounting, using the `roomCode` obtained from the URL. It now captures the `sessionId` directly from the API response, ensuring that the necessary identifier is available without client-side resolution.
4.  **Client-Side Cleanup**: All client-side [[Supabase]] imports were removed from the host page, further simplifying the client-side logic and preventing similar authentication pitfalls.

### Impact

This fix successfully addressed the primary demo-blocking bug. The host screen now correctly displays participants as they join, updates the round state dynamically, and renders the sphere as intended. This significantly improved the user experience and the overall functionality of the [[Flock Project]] during demonstrations and live usage.

## Related

[[Flock Project]],[[Supabase]],[[Row Level Security (RLS)]],[[API]],[[Participants API]],[[Session Management]],[[Polling]],[[Room Code]],[[Session ID]],[[Aishwarya Session Prompt Update – Flock Repo State (e98074d)]],[[Chore: Add QR Code for Judges (Flock Project)]]
