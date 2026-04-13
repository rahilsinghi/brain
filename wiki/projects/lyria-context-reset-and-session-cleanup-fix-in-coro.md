---
title: Lyria Context Reset and Session Cleanup Fix in Coro
author: ai
created_at: 2026-04-12T17:08:52.395Z
last_ai_edit: 2026-04-12T17:08:52.395Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-fix-lyria-reset-context-on-bpm-change-5bb18f.md]]"
tags:
  - coro
  - lyria
  - fix
  - bpm
  - session
  - error handling
  - audio processing
---

# Lyria Context Reset and Session Cleanup Fix in Coro

This article details a fix implemented in the Coro project to address issues with Lyria's context management. Specifically, it ensures Lyria's context is properly reset upon BPM changes and handles session cleanup robustly when receive loop errors occur.

## Key Concepts

[[Lyria]],BPM Change,Session Cleanup,Receive Loop Error,[[Coro Project]]

## Details

This commit addresses two distinct but related issues concerning the Lyria integration within the [[Coro Project]].

1.  **`lyria reset_context on bpm change`**: This fix ensures that Lyria's internal context is correctly reset or re-initialized whenever the Beats Per Minute (BPM) setting changes. Failing to do so could lead to inconsistencies or incorrect behavior in Lyria's audio processing or synchronization.

2.  **`lyria session cleanup on receive loop error`**: This enhancement improves the stability of the system by ensuring that any active Lyria sessions are properly terminated and resources cleaned up if an error occurs within the receive loop. This prevents resource leaks or orphaned processes that could accumulate over time.

**Commit Details:**
*   **Repository:** `rahilsinghi/Coro`
*   **SHA:** `7a21d9f`
*   **Date:** `2026-02-28T16:40:03Z`
*   **Author:** Rahil Singhi
*   **Files changed:** 1
*   **Additions:** +10
*   **Deletions:** -2

## Related

[[Coro]],[[Coro Project: Lyria Context Reset and Session Cleanup Fix]]
