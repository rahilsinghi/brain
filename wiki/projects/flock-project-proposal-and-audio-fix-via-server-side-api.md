---
title: "Flock Project: Proposal and Audio Fix via Server-Side API"
author: ai
created_at: 2026-04-12T22:11:43.655Z
last_ai_edit: 2026-04-12T22:11:43.655Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-fix-proposals-audio-now-work-moved-from-client-supabase-t-357f64.md]]"
tags:
  - flock
  - fix
  - supabase
  - api
  - audio
  - proposals
  - rls
  - elevenlabs
  - frontend
  - backend
  - commit
  - claude
---

# Flock Project: Proposal and Audio Fix via Server-Side API

This update for the [[Flock Project]] resolves a critical issue where proposals and audio features were blocked due to client-side [[Supabase]] Row-Level Security (RLS). The fix involved moving proposal fetching to a server-side API endpoint, enabling speech bubbles, sound effects, and [[ElevenLabs]] voice synthesis to trigger correctly. Additionally, a [[CyclingInsights]] component was introduced to display dynamic messages during consensus waits.

## Key Concepts

Client-Side Supabase,Server-Side API,Row-Level Security (RLS),Speech Bubbles,Sound Effects,ElevenLabs Voice Synthesis,CyclingInsights Component,Consensus Wait

## Details

This commit addresses a significant bug within the [[Flock Project]] where proposals were not correctly displaying, and associated audio elements (speech bubbles, sound effects, and [[ElevenLabs]] voice) were failing to trigger.

**Root Cause:**
The core of the problem stemmed from proposals being fetched directly via client-side [[Supabase]] using an anonymous key. This approach was being blocked by [[Supabase]]'s Row-Level Security (RLS), leading to an empty 'Why Wall', non-firing speech bubbles, and inactive audio.

**Solution Implemented:**
1.  **API Integration for Proposals:** The Participants API was updated to include proposals within its response, centralizing data fetching.
2.  **Server-Side Fetching:** The host page now retrieves proposals from this new API endpoint, utilizing a server-side service role key to bypass RLS restrictions.
3.  **Client-Side Cleanup:** All previous client-side [[Supabase]] imports related to proposal fetching were removed from the host page.

**Result:**
With these changes, speech bubbles, sound effects, and [[ElevenLabs]] voice synthesis now trigger correctly and reliably upon the arrival of new proposals.

**Additional Enhancement:**
A `CyclingInsights` component was added to improve user experience during periods of consensus waiting. This component cycles through various proposal quotes and loading messages every 3 seconds with a fade animation, preventing the screen from appearing stale during the 30-60 second mediator run. This feature was co-authored with [[Claude Opus 4.6]].

## Related

[[Flock Project]],[[Supabase]],[[API]],[[ElevenLabs]],[[Claude Opus 4.6 (1M context)]],[[API Server Factory with Graceful Shutdown]],[[Audio Layer for Flock Project]],[[Audio Integration: ElevenLabs TTS, Quips, and Background Music in Karen Project]]
