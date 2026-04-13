---
title: Lyria Reset Context and Session Cleanup Fixes (Coro)
author: ai
created_at: 2026-04-11T00:07:17.158Z
last_ai_edit: 2026-04-11T00:07:17.158Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-fix-lyria-reset-context-on-bpm-change-5bb18f.md]]"
tags:
  - fix
  - lyria
  - coro
  - bpm
  - session
  - error
  - audio
  - bugfix
---

# Lyria Reset Context and Session Cleanup Fixes (Coro)

This article details two fixes implemented in the `rahilsinghi/Coro` repository. The first addresses an issue where Lyria's context was not properly reset upon changes to the beats per minute (BPM), and the second resolves problems with Lyria's session cleanup when a receive loop error occurred.

## Key Concepts

[[Lyria]],BPM (Beats Per Minute),Session Cleanup,Error Handling,Real-time Audio Processing

## Details

This commit, identified by SHA `7a21d9f` in the `[[Coro — Git Activity]]` repository, implements critical fixes related to the Lyria component. Dated 2026-02-28T16:40:03Z and authored by Rahil Singhi, this change involved 10 additions and 2 deletions across a single file.

The primary fix `lyria reset_context on bpm change` ensures that when the BPM (Beats Per Minute) is altered, Lyria's internal context is correctly reinitialized or reset. This is crucial for maintaining audio synchronization and proper functionality in real-time music applications. Without this fix, changes in BPM could lead to desynchronization or incorrect audio processing within the [[Coro Project]].

The second fix `lyria session cleanup on receive loop error` addresses an issue where Lyria's active sessions were not being properly terminated or cleaned up if an error occurred within its receive loop. This could potentially lead to resource leaks, stale connections, or other stability issues, particularly in long-running or high-stress scenarios. Ensuring robust session cleanup improves the overall reliability and performance of the Lyria integration within the project.

## Related

[[Coro — Git Activity]],[[Coro Project: Initial Scaffold]],[[Lyria]],[[BPM]],[[Session Cleanup]]
