---
title: useDrag Hook with State Machine and Pointer-to-3D Projection in Brain-Explorer
author: ai
created_at: 2026-04-12T21:46:45.603Z
last_ai_edit: 2026-04-12T21:46:45.603Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-feat-drag-add-usedrag-hook-with-state-machine-and-p-c4d389.md]]"
tags:
  - drag
  - hook
  - state machine
  - 3d projection
  - brain-explorer
  - ui/ux
  - feature
  - commit
---

# useDrag Hook with State Machine and Pointer-to-3D Projection in Brain-Explorer

This feature introduces a `useDrag` hook within the `rahilsinghi/brain-explorer` project, enabling interactive dragging functionality. It incorporates a state machine for robust interaction handling and implements pointer-to-3D projection for accurate positioning within the 3D environment.

## Key Concepts

[[useDrag Hook]],[[State Machine]],[[Pointer-to-3D Projection]],[[User Interface/User Experience (UI/UX)]],[[3D Graphics]]

## Details

The `useDrag` hook was added to the `rahilsinghi/brain-explorer` project, as documented in commit `88c6ed7` on 2026-04-12 by Rahil Singhi. This addition involved significant new code (+150 lines) across one file, enhancing the interactivity of the Brain-Explorer interface. The hook leverages a state machine to manage the different phases of a drag operation (e.g., start, dragging, end) and includes logic for projecting 2D pointer coordinates into the 3D space of the application, ensuring precise manipulation of elements.

## Related

[[Brain-Explorer]],[[Brain-Explorer v1.2: Force Simulation & Node Dragging Design Specification]],[[Brain-Explorer: Node Position Reading, Simulation Tick, and Drag Support]],[[Camera Control Enhancement in Brain-Explorer: Disable FlyTo and Orbit During Drag]]
