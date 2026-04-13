---
title: Flock Phone Room Page Session State Polling Fix
author: ai
created_at: 2026-04-12T17:45:00.655Z
last_ai_edit: 2026-04-12T17:45:00.655Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-fix-phone-room-page-polls-session-state-every-3s-as-realtime-2c3c18.md]]"
tags:
  - fix
  - flock
  - frontend
  - realtime
  - polling
  - session
  - bugfix
---

# Flock Phone Room Page Session State Polling Fix

This commit addresses a race condition in the [[Flock Project]]'s phone room page where the lobby would incorrectly display "Waiting for everyone to join" even after a session round had started. A 3-second polling mechanism was implemented alongside Realtime subscriptions to ensure the page accurately reflects session state and round changes.

## Key Concepts

Realtime updates,Polling (computer science),Session state management,Race condition,Frontend development

## Details

The lobby of the phone room page in the [[Flock Project]] experienced an issue where it remained stuck on the "Waiting for everyone to join" message, despite the session having advanced to the next round. This occurred because the initial data fetch raced with the join API, and [[Realtime Updates]] could sometimes lag, preventing the UI from updating correctly.

To resolve this, a 3-second polling interval was added. This polling mechanism now runs concurrently with the existing Realtime subscription, acting as a fallback to ensure the phone room page reliably picks up and displays round changes.

- **Repo:** `rahilsinghi/Flock`
- **SHA:** `a070972`
- **Date:** `2026-03-21T17:09:02Z`
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +26
- **Deletions:** -21
- **Co-Authored-By:** Claude Opus 4.6 (1M context)

## Related

[[Flock Project]],[[Realtime Updates]],[[Session State]],[[Aishwarya Session Prompt Update – Flock Backend State Snapshot]]
