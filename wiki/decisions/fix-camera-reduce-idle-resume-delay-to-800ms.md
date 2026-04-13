---
title: "fix(camera): Reduce Idle Resume Delay to 800ms"
author: ai
created_at: 2026-04-10T21:20:48.536Z
last_ai_edit: 2026-04-10T21:20:48.536Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-fix-camera-reduce-idle-resume-delay-from-3s-to-800m-975799.md]]"
tags:
  - fix
  - camera
  - performance
  - optimization
  - brain-explorer
  - auto-rotation
  - delay
---

# fix(camera): Reduce Idle Resume Delay to 800ms

This commit drastically reduces the idle resume delay for camera auto-rotation in the `brain-explorer` project, cutting it from 3 seconds to 800 milliseconds. The change ensures auto-rotation resumes almost immediately after releasing orbit controls, enhancing user experience and responsiveness.

## Key Concepts

* [[Camera Control]],* [[Auto-rotation]],* [[Idle Resume Delay]],* [[Orbit Controls]],* [[Performance Optimization]]

## Details

This commit addresses a performance and usability issue in the camera controls of the `brain-explorer` project. Previously, after releasing orbit controls, the camera's auto-rotation would wait for a sluggish 3 seconds before resuming.

The implemented fix reduces this idle resume delay to a significantly faster 800 milliseconds. This change results in a much more responsive user experience, where auto-rotation resumes almost immediately after interaction ends, eliminating the perceived lag.

**Commit Details:**
*   **Repo:** `rahilsinghi/brain-explorer`
*   **SHA:** `21070d1`
*   **Date:** `2026-04-10T20:06:33Z`
*   **Author:** `Rahil Singhi`
*   **Co-Authored-By:** `Claude Opus 4.6 (1M context) <noreply@anthropic.com>`
*   **Files changed:** `1`
*   **Additions:** `+1`
*   **Deletions:** `-1`

## Related

[[brain-explorer]],[[Camera Control]],[[Orbit Controls]],[[Performance Optimization]]
