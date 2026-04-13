---
title: "Fix: Proposal and Audio Functionality in Flock Project"
author: ai
created_at: 2026-04-12T18:11:40.963Z
last_ai_edit: 2026-04-12T18:11:40.963Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-fix-proposals-audio-now-work-moved-from-client-supabase-t-357f64.md]]"
tags:
  - flock
  - supabase
  - api
  - rls
  - elevenlabs
  - audio
  - fix
  - frontend
  - backend
  - ui
  - ux
  - commit
---

# Fix: Proposal and Audio Functionality in Flock Project

This commit resolves a critical issue in the [[Flock Project]] where client-side Supabase calls for proposals were blocked by Row Level Security (RLS), leading to an empty UI and non-triggering audio. The fix involved migrating proposal fetching to a server-side API, ensuring proper display of proposals and activation of [[ElevenLabs TTS]] and sound effects. A new `CyclingInsights` component was also added to enhance user experience during waiting periods.

## Key Concepts

[[Flock Project]],Supabase,Row Level Security (RLS),API (Application Programming Interface),Client-side vs. Server-side,[[ElevenLabs TTS]],CyclingInsights component

## Details

This commit (`6ad5aa1`) to the `rahilsinghi/Flock` repository addresses a significant bug related to proposal fetching and audio playback.

**Root Cause Analysis:**
Proposals within the [[Flock Project]] were being fetched client-side directly from Supabase using an anonymous key. This method was inadvertently blocked by Supabase's Row Level Security (RLS) policies. As a consequence, the "Why Wall" appeared empty, speech bubbles failed to fire, and audio elements (such as those from [[ElevenLabs TTS]]) did not trigger when new proposals arrived.

**Implemented Fixes:**
1.  **API Integration for Proposals:** The Participants API was updated to include proposals directly within its response payload.
2.  **Server-Side Proposal Fetching:** The Host page now retrieves proposals from this API. This is a server-side operation, utilizing a Supabase service role key, which bypasses RLS restrictions.
3.  **Client-Side Supabase Removal:** All direct client-side Supabase imports were removed from the Host page to prevent recurrence of RLS-related issues.
4.  **Audio and UI Activation:** With the proposals correctly fetched, speech bubbles, sound effects, and the [[ElevenLabs TTS]] voice now trigger as intended when new proposals are received.

**Additional Feature - CyclingInsights Component:**
To improve the user experience during the consensus waiting period (which can last 30-60 seconds for mediator runs), a `CyclingInsights` component was introduced. This component cycles through proposal quotes and loading messages every 3 seconds with a smooth fade animation, preventing the screen from appearing static and providing engaging feedback to the user.

## Related

[[Flock Project]],[[ElevenLabs TTS]],[[Claude Opus 4.6]]
