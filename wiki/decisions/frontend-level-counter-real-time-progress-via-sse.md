---
title: "Frontend Level Counter: Real-time Progress via SSE"
author: ai
created_at: 2026-04-10T19:07:27.342Z
last_ai_edit: 2026-04-10T19:07:27.342Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-fix-frontend-derive-current-level-from-sse-events-not-just-ec024f.md]]"
tags:
  - frontend
  - fix
  - sse
  - escalation
  - level counter
  - real-time
  - karen
  - 310abac
  - commit
---

# Frontend Level Counter: Real-time Progress via SSE

This update resolves an issue where the frontend level counter displayed outdated progress by relying on a fetch-based `escalation.current_level`. The counter now accurately reflects real-time progress by deriving the maximum level from Server-Sent Events (SSE) such as `level_start` and `level_complete`, ensuring immediate and precise updates.

## Key Concepts

Server-Sent Events (SSE),Frontend Level Counter,Escalation,Fetch roundtrip,REFRESH_EVENTS

## Details

This change addresses a persistent issue where the frontend level counter would get stuck, specifically displaying "3/10", because it depended exclusively on `escalation.current_level`. This property required a network fetch, leading to outdated information and a poor user experience.

The solution involves a significant improvement in how the current level is determined:
1.  **SSE-driven Level Derivation:** Instead of fetching, the frontend now derives the maximum completed level by listening to `level_start` and `level_complete` Server-Sent Events (SSE). Since SSE provides real-time updates, this ensures the level counter is always current.
2.  **Sooner Escalation Object Refresh:** The `level_start` event has been added to the `REFRESH_EVENTS` list. This modification causes the `escalation` object to refresh its state more promptly, contributing to a more responsive and accurate display.

**Commit Details:**
*   **Repository:** `[[rahilsinghi/karen]]`
*   **SHA:** `310abac`
*   **Date:** `2026-04-04T20:47:14Z`
*   **Author:** `[[Rahil Singhi]]`
*   **Files Changed:** 4
*   **Additions:** +27
*   **Deletions:** -2

## Related

[[rahilsinghi/karen]],[[Rahil Singhi]],[[Server-Sent Events]],[[Escalation System]]
