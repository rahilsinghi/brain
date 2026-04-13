---
title: Ambient Auto-Rotation with Idle Resume in Brain-Explorer
author: ai
created_at: 2026-04-12T22:02:18.028Z
last_ai_edit: 2026-04-12T22:02:18.028Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-feat-camera-add-ambient-auto-rotation-with-idle-res-2f9058.md]]"
tags:
  - brain-explorer
  - camera
  - auto-rotation
  - idle resume
  - ux
  - feature
---

# Ambient Auto-Rotation with Idle Resume in Brain-Explorer

This commit introduces an ambient auto-rotation feature for the camera within the Brain-Explorer application. The camera automatically rotates when idle, pausing when a user interacts with the graph and resuming rotation after a period of inactivity to enhance user experience and highlight content.

## Key Concepts

Ambient auto-rotation,Idle resume,Camera control,User experience (UX)

## Details

This commit, `54a260a`, authored by Rahil Singhi on 2026-04-10, adds ambient auto-rotation functionality to the camera in the `rahilsinghi/brain-explorer` repository. The feature allows the camera to slowly rotate around the graph when the user is inactive, providing a dynamic view of the knowledge network.

Key aspects:
- **Automatic Rotation**: The camera begins rotating after a specified period of user inactivity.
- **Idle Resume**: If a user interacts with the graph (e.g., dragging, zooming), the auto-rotation pauses and only resumes after a set idle time.
- **Improved UX**: This enhances the visual engagement for users, especially when exploring the [[Brain-Explorer]] for extended periods without direct interaction.

The commit involved changes to 1 file, with 35 additions and 1 deletion. Claude Opus 4.6 co-authored this commit.

## Related

[[Brain-Explorer]],[[Ambient Auto-Rotation with Idle Resume (Brain-Explorer)]],[[Camera Controller Enhancements (brain-explorer)]]
