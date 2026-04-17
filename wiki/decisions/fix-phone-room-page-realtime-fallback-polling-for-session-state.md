---
title: "Fix: Phone Room Page Realtime Fallback Polling for Session State"
author: ai
created_at: 2026-04-10T21:24:18.101Z
last_ai_edit: 2026-04-10T21:24:18.101Z
last_human_edit: null
last_embedded_hash: 832fb2e81319770f
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-fix-phone-room-page-polls-session-state-every-3s-as-realtime-2c3c18.md]]"
tags:
  - fix
  - realtime
  - polling
  - session state
  - race condition
  - frontend
  - flock
  - bugfix
---


# Fix: Phone Room Page Realtime Fallback Polling for Session State

This commit addresses an issue in the Flock project where the lobby page could get stuck, failing to advance to the next round. A 3-second polling mechanism was introduced alongside existing Realtime subscriptions to ensure the phone room page reliably reflects session state changes, mitigating a race condition.

## Key Concepts

* Realtime Updates,* Polling,* Race Condition,* Session State,* Lobby Page

## Details

This fix (SHA: `a070972`) for the `rahilsinghi/Flock` repository, authored by Rahil Singhi on 2026-03-21, resolves a critical bug where the 'phone room' lobby page would remain stuck on "Waiting for everyone to join" even after the game session had progressed to Round 1.

The root cause was identified as a race condition: the initial data fetch for the page could occur before Realtime updates were fully propagated, or Realtime updates themselves might experience a slight lag. This created a scenario where the page's state did not correctly reflect the actual session progress.

To remediate this, a fallback mechanism was implemented: the phone room page now actively polls the session state every 3 seconds. This polling runs in conjunction with the existing Realtime subscription, ensuring that even if Realtime updates are delayed or missed, the page will eventually pick up the correct round changes and advance accordingly.

## Related

[[Flock (project)]],[[Realtime Updates]],[[Polling]],[[Race Condition]],[[Session State]],[[Lobby Page]]
