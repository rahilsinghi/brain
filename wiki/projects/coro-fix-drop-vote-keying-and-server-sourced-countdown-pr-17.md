---
title: "Coro: Fix Drop Vote Keying and Server-Sourced Countdown (PR #17)"
author: ai
created_at: 2026-04-11T01:33:44.034Z
last_ai_edit: 2026-04-11T01:33:44.034Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-merge-pull-request-17-from-rahilsinghi-fix-drop-connection-id-d04a01.md]]"
tags:
  - coro
  - bugfix
  - pullrequest
  - server
  - frontend
  - realtime
  - multiuser
---

# Coro: Fix Drop Vote Keying and Server-Sourced Countdown (PR #17)

This pull request for the Coro project addresses critical issues related to drop vote keying and the countdown mechanism. It ensures that drop votes are correctly identified using `connection_id` and implements a server-sourced countdown for accuracy and consistency.

## Key Concepts

[[Coro]] Project,Drop Vote Keying,Server-Sourced Countdown,Pull Request,Bug Fix,Connection ID

## Details

This entry details Pull Request #17 for the [[Coro]] project, submitted by Rahil Singhi on February 28, 2026. The pull request, identified by SHA `ee546c2`, focused on a critical fix for the application's drop voting and countdown functionality.

### Key Changes:

*   **Fix:** The primary objective was to correctly key drop votes using the `connection_id`, which is crucial for distinguishing individual user votes in a multi-user environment. This prevents misattribution or conflicts when multiple users interact with the drop mechanism.
*   **Server-Sourced Countdown:** The update also implemented a server-sourced countdown. This ensures that the countdown timer is synchronized across all clients and is not susceptible to client-side discrepancies, providing a more reliable and consistent user experience.

### Technical Details:

*   **Repository:** [[rahilsinghi/Coro]]
*   **SHA:** `ee546c2`
*   **Date:** `2026-02-28T19:56:30Z`
*   **Author:** [[Rahil Singhi]]
*   **Files Changed:** 4
*   **Additions:** +158 lines
*   **Deletions:** -66 lines

## Related

[[Coro — Git Activity]],[[Coro: Fix Drop Vote Keying and Server-Sourced Countdown]],[[Rahil Singhi]]
