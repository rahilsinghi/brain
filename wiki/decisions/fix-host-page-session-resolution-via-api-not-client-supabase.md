---
title: "Fix: Host Page Session Resolution via API (not client Supabase)"
author: ai
created_at: 2026-04-10T17:20:50.389Z
last_ai_edit: 2026-04-10T17:20:50.389Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-fix-host-page-uses-api-for-session-resolution-not-client-sup-7349cd.md]]"
tags:
  - supabase
  - api
  - fix
  - session
  - rls
  - client-side
  - server-side
  - flock
  - bugfix
  - architecture
  - polling
---

# Fix: Host Page Session Resolution via API (not client Supabase)

This commit addresses a critical bug where the host page failed to resolve session IDs, causing it to get stuck on 'Waiting for travelers.' The issue stemmed from attempting client-side session resolution with an anonymous Supabase key, which was blocked by Row Level Security (RLS).

The fix involves migrating session resolution to a server-side API endpoint that utilizes a Supabase service role key, enabling immediate polling and resolving the primary demo-blocking issue.

## Key Concepts

- [[Supabase]],- [[Row Level Security (RLS)]],- [[API]] (Application Programming Interface),- [[Client-side vs. Server-side Processing]],- [[Session Management]],- [[Polling]],- [[Supabase Service Role Key]],- [[Supabase Anon Key]]

## Details

This entry documents a crucial architectural fix implemented in the Flock project.

**Commit Details:**
*   **Repo:** rahilsinghi/Flock
*   **SHA:** 26ae077
*   **Date:** 2026-03-21T19:15:04Z
*   **Author:** Rahil Singhi
*   **Files changed:** 5
*   **Additions:** +38
*   **Deletions:** -23

### Root Cause
The host page was experiencing a critical failure, consistently getting stuck on the "Waiting for travelers" state. This was traced back to its method of resolving a `roomCode` into a `sessionId`. The original implementation attempted to perform this resolution client-side using a client-initialized Supabase instance with an anonymous key (`anon key`). However, the `sessions` table in Supabase was protected by Row Level Security (RLS) policies that blocked anonymous read access. Consequently, the `sessionId` remained `null`, preventing the polling mechanism for participant updates from ever initiating.

### Fix Implementation
To resolve this, the following changes were made:

1.  **API Parameter Expansion:** The existing Participants API endpoint was extended to accept a `?roomCode=` query parameter.
2.  **Server-Side Resolution:** The API now handles the `roomCode` to `sessionId` resolution on the server-side. This crucial step is performed using a Supabase `service role key`, which bypasses RLS and allows secure access to the `sessions` table.
3.  **Reduced Client-Side Dependency:** The API now also returns necessary 'cities' data for the sphere rendering, eliminating any further need for client-side Supabase calls related to this functionality.
4.  **Immediate Polling:** Upon mounting, the host page now immediately initiates polling using the `roomCode` directly. It then captures the `sessionId` from the API response, ensuring a swift and correct state transition.
5.  **Client-Side Cleanup:** All client-side Supabase imports and related logic were removed from the host page component, simplifying its architecture and reducing potential security vulnerabilities.
6.  **Polling Lifecycle Change:** Polling for session updates now commences immediately upon component mount, rather than waiting for a `sessionId` to be asynchronously resolved client-side.

### Impact
This fix successfully addresses the **#1 demo-blocking bug**. The host screen now accurately displays participants as they join, correctly updates the round state, and renders the sphere content without delay or error, significantly improving the application's core functionality and user experience for hosts.

## Related

[[Supabase]],[[Row Level Security (RLS)]],[[API Design]],[[Client-Side Architecture]],[[Server-Side Architecture]],[[Session Management]],[[Flock Project]]
