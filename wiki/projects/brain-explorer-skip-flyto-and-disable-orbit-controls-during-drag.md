---
title: "Brain-Explorer: Skip FlyTo and Disable Orbit Controls During Drag"
author: ai
created_at: 2026-04-13T16:04:32.259Z
last_ai_edit: 2026-04-13T16:04:32.259Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-feat-camera-skip-flyto-and-disable-orbit-controls-d-7fb3f1.md]]"
tags:
  - camera
  - brain-explorer
  - ui
  - interaction
  - enhancement
  - feature
  - bugfix
---

# Brain-Explorer: Skip FlyTo and Disable Orbit Controls During Drag

This commit enhances the user experience in the Brain-Explorer by preventing automatic `flyTo` camera movements and disabling orbit controls while a user is actively dragging elements. This ensures smoother and more predictable interactions, avoiding conflicts between user manipulation and camera behavior.

## Key Concepts

Camera Control,User Interaction,Drag Operations,Orbit Controls,FlyTo Functionality

## Details

The commit `bf9a607` in the `rahilsinghi/brain-explorer` repository, authored by Rahil Singhi on 2026-04-12, implements a crucial user experience enhancement. It modifies the camera control logic to:

1.  **Skip `flyTo` actions during drag:** Prevents the camera from automatically moving to a new focus point if the user is already dragging an element.
2.  **Disable orbit controls during drag:** Temporarily disengages the orbit camera controls when a drag operation is in progress.

This change, involving 5 additions and 3 deletions in a single file, resolves potential conflicts where automatic camera adjustments or continuous orbiting could interfere with the user's attempt to reposition or interact with nodes via dragging. The result is a more stable and intuitive interface for navigating and manipulating the knowledge graph within the [[Brain-Explorer]].

## Related

[[Brain-Explorer]],[[Camera Control Enhancement in Brain-Explorer: Disable FlyTo and Orbit During Drag]],[[Camera Controller Enhancements (brain-explorer)]],[[Brain-Explorer: Node Position Reading, Simulation Tick, and Drag Support]],[[User Experience]]
