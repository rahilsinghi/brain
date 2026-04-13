---
title: Spring-Based Cosmetic Drag with Snap-Back in Brain-Explorer
author: ai
created_at: 2026-04-13T17:11:11.170Z
last_ai_edit: 2026-04-13T17:11:11.170Z
last_human_edit: null
last_embedded_hash: 2ee2aa919c51caab
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-feat-drag-spring-based-cosmetic-drag-with-snap-back-79a3eb.md]]"
tags:
  - brain-explorer
  - animation
  - drag
  - spring
  - ui/ux
  - d3-force
  - state machine
---


# Spring-Based Cosmetic Drag with Snap-Back in Brain-Explorer

This feature implements a new drag mechanism in the `rahilsinghi/brain-explorer` repository, replacing the `d3-force` simulation's reheat/pin/unpin drag with a direct position write during drag. Upon release, nodes now return to their rest positions using a spring-animated snap-back effect, managed by a clear IDLE → DRAGGING → SNAPPING → IDLE state machine.

## Key Concepts

D3-Force Simulation,Spring Animation,Snap-Back Animation,State Machine,User Interface Dragging

## Details

This commit, identified by SHA `59754cd` and dated `2026-04-12T20:26:31Z`, introduces a significant change to the node dragging behavior within the `rahilsinghi/brain-explorer` project. Authored by Rahil Singhi and co-authored by Claude Opus 4.6, the update modified 3 files, adding 90 lines and deleting 42.

Previously, node dragging relied on the `d3-force` simulation's internal reheat, pin, and unpin mechanisms. The new approach bypasses this by directly writing position data to nodes as they are dragged. When a user releases a node, instead of remaining in the dragged position or snapping instantly, a smooth, spring-animated snap-back effect returns the node to its designated 'rest' position within the graph layout. This behavior is precisely controlled by a state machine that transitions between `IDLE`, `DRAGGING`, and `SNAPPING` states.

## Related

[[Brain-Explorer]],[[D3-Force Simulation]],[[Spring Animation]],[[Snap-Back Animation]],[[State Machine]],[[Claude Opus 4.6]],[[Rahil Singhi]],[[Adding `isDragging` Flag to Brain-Explorer's Zustand Store]],[[Brain-Explorer v1.2: Force Simulation & Node Dragging Design Specification]],[[Brain-Explorer: Node Position Reading, Simulation Tick, and Drag Support]]
