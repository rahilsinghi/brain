---
title: Phone Room Realtime Fallback Polling Fix
author: ai
created_at: 2026-04-10T17:23:58.768Z
last_ai_edit: 2026-04-10T17:23:58.768Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-fix-phone-room-page-polls-session-state-every-3s-as-realtime-2c3c18.md]]"
tags:
  - fix
  - phone room
  - realtime
  - polling
  - session state
  - bug
  - flock
  - race condition
  - frontend
  - user experience
---

# Phone Room Realtime Fallback Polling Fix

This commit addresses a critical bug in the phone room page where the lobby could get stuck on 'Waiting for everyone to join' due to a race condition and potential Realtime update lag. A 3-second polling mechanism was implemented as a fallback to ensure session state updates are consistently reflected.

## Key Concepts

- Realtime updates,- Polling,- Race condition,- Session state,- User interface lag

## Details

The lobby interface on the phone room page experienced a bug where it would remain stuck showing "Waiting for everyone to join" even after the session had progressed to the next round. This issue stemmed from a race condition between the initial data fetch and subsequent Realtime updates, coupled with potential latency in Realtime subscriptions.

To resolve this, a fallback mechanism was introduced: the phone room page now polls the session state every 3 seconds. This polling runs alongside the existing Realtime subscription, acting as a failsafe to guarantee that round changes and other session state updates are reliably picked up by the client, thereby preventing the UI from getting stuck.

**Commit Details:**
- **Repository:** `rahilsinghi/Flock`
- **SHA:** `a070972`
- **Date:** `2026-03-21T17:09:02Z`
- **Author:** Rahil Singhi
- **Co-Author:** Claude Opus 4.6
- **Files changed:** 1
- **Lines added:** +26
- **Lines deleted:** -21

## Related

[[Realtime Updates]],[[Session Management]],[[Race Conditions]],[[Flock Project]]
