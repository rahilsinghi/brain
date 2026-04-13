---
title: "Fix: Phone Room Page Polling for Session State"
author: ai
created_at: 2026-04-12T21:45:42.786Z
last_ai_edit: 2026-04-12T21:45:42.786Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-fix-phone-room-page-polls-session-state-every-3s-as-realtime-2c3c18.md]]"
tags:
  - fix
  - flock
  - frontend
  - polling
  - realtime
  - session
  - race condition
  - bugfix
---

# Fix: Phone Room Page Polling for Session State

This update addresses a race condition in the Flock project's phone room page where the lobby would remain stuck on 'Waiting for everyone to join' despite the session advancing. It introduces a 3-second polling mechanism to fetch session state as a fallback, ensuring the client consistently picks up round changes even if Realtime updates are delayed.

## Key Concepts

[[Race Condition]],[[Realtime Updates]],[[Session State]],[[Polling]],[[Frontend Development]],[[Flock]]

## Details

A critical bug in the [[Flock]] project's phone room page caused the lobby to display 'Waiting for everyone to join' even after the game session had progressed to Round 1. This issue stemmed from an initial data fetch racing with the join API, compounded by potential lag in Realtime updates.

To resolve this, a 3-second polling mechanism was implemented. This polling now runs concurrently with the existing Realtime subscription, acting as a robust fallback. It ensures that the phone client reliably retrieves the current session state and round changes, preventing the UI from getting stuck.

**Commit Details:**
- **Repo:** `rahilsinghi/Flock`
- **SHA:** `a070972`
- **Date:** `2026-03-21T17:09:02Z`
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +26 lines
- **Deletions:** -21 lines

This fix improves the user experience by ensuring timely UI updates and eliminating a common point of confusion during session transitions.

## Related

[[Flock]],[[Aishwarya Session Prompt Update – Flock Backend State Snapshot]],[[Audio Layer Implementation for Flock Project]],[[Chore: Add QR Code for Judges (Flock Project)]],[[Chore: Remove @clerk/nextjs Dependency and Dynamic Agent Labels (Flock)]]
