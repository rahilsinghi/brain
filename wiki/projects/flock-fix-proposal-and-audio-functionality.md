---
title: "Flock Fix: Proposal and Audio Functionality"
author: ai
created_at: 2026-04-10T21:38:23.901Z
last_ai_edit: 2026-04-10T21:38:23.901Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-fix-proposals-audio-now-work-moved-from-client-supabase-t-357f64.md]]"
tags:
  - fix
  - flock
  - supabase
  - api
  - rls
  - proposals
  - audio
  - elevenlabs
  - frontend
  - backend
  - bugfix
  - feature
---

# Flock Fix: Proposal and Audio Functionality

This entry details a critical fix implemented in the Flock project, resolving issues where proposals and audio functionalities were blocked due to client-side Supabase RLS. The solution involved refactoring proposal fetching from the client to a server-side API, ensuring correct triggering of speech bubbles and audio. Additionally, a `CyclingInsights` component was introduced to improve the user experience during consensus wait times.

## Key Concepts

- [[Client-side Supabase]],- [[Row Level Security (RLS)]],- [[Server-side API]],- [[Supabase Service Role Key]],- [[Flock Proposals]],- [[Audio Functionality]] (Speech bubbles, Sound effects, ElevenLabs voice),- [[CyclingInsights Component]],- [[Flock Host Page]],- [[Consensus Wait]]

## Details

### Root Cause
Previously, proposals within the Flock application were fetched via client-side Supabase using an anonymous key. This approach was critically hampered by Supabase's Row Level Security (RLS), leading to several functional failures. Specifically, the 'Why Wall' appeared empty, speech bubbles failed to fire, and audio elements—including sound effects and ElevenLabs voice integration—never triggered.

### The Fix
To resolve these issues, the method of fetching proposals was refactored, moving the responsibility from the client to a server-side API:

1.  **Participants API Enhancement**: The existing Participants API was updated to include proposals directly within its response.
2.  **Server-Side Fetching**: The host page now retrieves proposals exclusively from this API, leveraging a server-side service role key. This bypasses the RLS restrictions that previously blocked client-side access.
3.  **Client-Side Cleanup**: All direct client-side Supabase imports related to proposal fetching were removed from the host page, streamlining the client-side code.

As a result of this fix, speech bubbles, sound effects, and ElevenLabs voice now trigger correctly when new proposals arrive, restoring full audio and visual functionality.

### Additional Enhancement
Alongside the core fix, a new component called `CyclingInsights` was added. This component is active during the consensus wait period, cycling through proposal quotes and loading messages every 3 seconds with a fade animation. This prevents the screen from appearing stale during the 30-60 second mediator run, improving the user experience.

### Technical Details
-   **Repository**: `rahilsinghi/Flock`
-   **SHA**: `6ad5aa1`
-   **Date**: 2026-03-21T19:31:09Z
-   **Author**: Rahil Singhi
-   **Files Changed**: 2
-   **Additions**: +90
-   **Deletions**: -47
-   **Co-Authored-By**: Claude Opus 4.6 (1M context)

## Related

[[Flock (Project)]],[[Supabase]],[[Row Level Security (RLS)]],[[API Design]],[[Client-Server Architecture]],[[ElevenLabs]],[[Rahil Singhi]],[[Claude Opus]]
