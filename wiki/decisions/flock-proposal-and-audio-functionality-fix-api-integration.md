---
title: "Flock: Proposal and Audio Functionality Fix (API Integration)"
author: ai
created_at: 2026-04-10T17:35:20.291Z
last_ai_edit: 2026-04-10T17:35:20.291Z
last_human_edit: null
last_embedded_hash: a71265254c0639ca
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-fix-proposals-audio-now-work-moved-from-client-supabase-t-357f64.md]]"
tags:
  - fix
  - bugfix
  - supabase
  - api
  - rls
  - flock
  - proposals
  - audio
  - elevenlabs
  - frontend
  - backend
  - commit
  - webdevelopment
---


# Flock: Proposal and Audio Functionality Fix (API Integration)

This article details a critical fix in the Flock project that resolved issues with proposals not being fetched and associated audio features not triggering. The problem stemmed from client-side Supabase access being blocked by Row Level Security (RLS), which was resolved by migrating proposal fetching to a server-side API endpoint.

## Key Concepts

Client-side Supabase,Row Level Security (RLS),Server-side API,Service Role Key,ElevenLabs,CyclingInsights Component

## Details

### Root Cause: Client-side Supabase and RLS

Previously, proposals within the [[Flock]] application were fetched using client-side [[Supabase]] with an anonymous key. This approach was blocked by [[Row Level Security (RLS)]] configurations, leading to significant functionality issues:

*   The "Why Wall" appeared empty.
*   Speech bubbles for proposals never fired.
*   Audio cues associated with new proposals never triggered.

### The Fix: Server-side API Integration

To resolve the RLS blocking issue, the proposal fetching mechanism was entirely re-architected:

1.  **Participants API Enhancement**: The existing Participants API was updated to include proposals directly within its response.
2.  **Server-side Fetching**: The host page now retrieves proposals exclusively from this API endpoint. This crucial change allows proposals to be fetched server-side using a [[Service Role Key]], bypassing the client-side RLS restrictions.
3.  **Client-side Supabase Removal**: All direct client-side Supabase imports related to proposal fetching were removed from the host page, streamlining the client-side code and eliminating potential security vulnerabilities.

As a direct result of these changes, the following functionalities were restored and now trigger correctly when new proposals arrive:

*   Speech bubbles
*   Sound effects
*   [[ElevenLabs]] voice synthesis

### Additional Feature: CyclingInsights Component

Alongside the core fix, a new `CyclingInsights` component was introduced. This component is active during the consensus waiting period (typically 30-60 seconds, during the mediator run). It cycles through proposal quotes and loading messages every 3 seconds, incorporating a fade animation, to ensure the screen remains dynamic and informative rather than static during this waiting phase.

### Commit Details

*   **Repo:** `rahilsinghi/Flock`
*   **SHA:** `6ad5aa1`
*   **Date:** `2026-03-21T19:31:09Z`
*   **Author:** `Rahil Singhi`
*   **Co-Authored-By:** `Claude Opus 4.6 (1M context) <noreply@anthropic.com>`
*   **Files changed:** 2
*   **Additions:** +90
*   **Deletions:** -47

## Related

[[Flock]],[[Supabase]],[[Row Level Security (RLS)]],[[API]],[[ElevenLabs]],[[Service Role Key]]
