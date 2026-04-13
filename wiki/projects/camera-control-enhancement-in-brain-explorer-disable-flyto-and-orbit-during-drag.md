---
title: "Camera Control Enhancement in Brain-Explorer: Disable FlyTo and Orbit During Drag"
author: ai
created_at: 2026-04-12T21:43:47.317Z
last_ai_edit: 2026-04-12T21:43:47.317Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-feat-camera-skip-flyto-and-disable-orbit-controls-d-7fb3f1.md]]"
tags:
  - camera
  - controls
  - brain-explorer
  - frontend
  - usability
  - feature
---

# Camera Control Enhancement in Brain-Explorer: Disable FlyTo and Orbit During Drag

This commit to the Brain-Explorer project introduces an enhancement to camera controls, preventing automatic `flyTo` animations and disabling orbit controls while a user is actively dragging the camera. This change aims to improve user experience by eliminating conflicts between user interaction and automated camera movements.

## Key Concepts

[[Brain-Explorer]],Camera Controls,Orbit Controls,FlyTo Functionality,User Experience (UX)

## Details

This commit (`bf9a607`) within the `rahilsinghi/brain-explorer` repository, authored by [[Rahil Singhi]] on 2026-04-12, focuses on refining the interactive camera experience. The core improvement involves disabling two potentially conflicting camera behaviors during a user's drag operation:

1.  **Skip `flyTo`**: Prevents any ongoing or triggered `flyTo` animations from interfering when the user is manually manipulating the camera.
2.  **Disable orbit controls**: Temporarily deactivates orbit controls to ensure smooth, uninterrupted dragging without unintended rotational movements.

These adjustments, implemented with 5 additions and 3 deletions across 1 file, contribute to a more intuitive and fluid user interaction with the 3D graph visualization.

## Related

[[Brain-Explorer]],[[Camera Controller Enhancements (brain-explorer)]],[[Brain Explorer: Deep-Linking & Wikilink Navigation Feature]],[[Rahil Singhi]]
