---
title: "Fix: Host Page Session Resolution via Server-Side API"
author: ai
created_at: 2026-04-10T21:20:42.855Z
last_ai_edit: 2026-04-10T21:20:42.855Z
last_human_edit: null
last_embedded_hash: d417403e5163d878
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-fix-host-page-uses-api-for-session-resolution-not-client-sup-7349cd.md]]"
tags:
  - fix
  - supabase
  - rls
  - api
  - host page
  - session resolution
  - flock
  - backend
  - frontend
  - realtime
  - bugfix
---


# Fix: Host Page Session Resolution via Server-Side API

This article details a critical bug fix in the Flock application where the host page failed to resolve session IDs, causing it to be stuck on 'Waiting for travelers'. The issue stemmed from attempting client-side Supabase resolution with an anonymous key, which was blocked by Row Level Security. The fix involved migrating session resolution to a server-side API, utilizing a service role key, to ensure proper participant tracking and real-time updates.

## Key Concepts

Supabase Row Level Security (RLS),Client-side vs. Server-side API calls,Supabase Anonymous Key,Supabase Service Role Key,Session Management,Real-time Updates,API Design Principles

## Details

This article describes a critical bug fix implemented in the `rahilsinghi/Flock` repository, specifically identified by commit `26ae077` on March 21, 2026.

### Root Cause

The host page in the Flock application was experiencing a significant delay, often getting stuck on "Waiting for travelers." This issue was traced back to its method of resolving a room code to a session ID. The application attempted to use **client-side Supabase** with an **anonymous key** for this resolution. However, the `sessions` table in Supabase had **Row Level Security (RLS)** enabled, which prevented anonymous reads. Consequently, the `sessionId` remained null, and the necessary polling for real-time updates never initiated.

### The Fix

To resolve this, the following changes were implemented:

*   The `Participants API` was updated to accept a `?roomCode=` parameter. This API now handles the session ID resolution **server-side**, leveraging a **service role key** for appropriate access permissions, thereby bypassing the RLS restriction.
*   The API was also enhanced to return city data for the sphere, eliminating any remaining client-side Supabase dependencies for this functionality.
*   The host page now immediately initiates polling using the `roomCode` and captures the `sessionId` directly from the API response.
*   All client-side Supabase imports were removed from the host page to streamline its operation and reduce security risks associated with anonymous keys.
*   Polling for updates now starts upon component mount, ensuring immediate data fetching rather than waiting for a `sessionId` to be resolved client-side.

### Outcome

This fix addressed the primary demo-blocking bug in the application. As a result, the host screen now correctly displays participants as they join, updates the round state in real-time, and renders the sphere, providing a much smoother and functional user experience.

---
**Commit Details:**
- **Repository:** `rahilsinghi/Flock`
- **SHA:** `26ae077`
- **Date:** `2026-03-21T19:15:04Z`
- **Author:** Rahil Singhi
- **Files Changed:** 5
- **Additions:** +38
- **Deletions:** -23
- **Co-Authored-By:** Claude Opus 4.6 (1M context)

## Related

[[Supabase]],[[Row Level Security (RLS)]],[[Flock (Project)]],[[API Development]],[[Client-Server Architecture]],[[Session Management]]
