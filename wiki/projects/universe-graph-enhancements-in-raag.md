---
title: Universe Graph Enhancements in raag
author: ai
created_at: 2026-04-12T18:08:00.504Z
last_ai_edit: 2026-04-12T18:08:00.504Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-universe-graph-starfield-auto-rotate-hover-card-anim-5bef6b.md]]"
tags:
  - universe
  - graph
  - ui
  - frontend
  - raag
  - three.js
  - framer-motion
  - animation
  - starfield
  - auto-rotate
  - hover card
---

# Universe Graph Enhancements in raag

This commit introduces significant UI enhancements to the Universe Graph within the `raag` project, including a 2000-star particle starfield background, idle camera auto-rotation, and an interactive node hover card. It also refactors the GraphSidePanel with Framer Motion animations and updates the loading skeleton with a dynamic constellation effect.

## Key Concepts

Starfield background,Camera auto-rotation,Node hover card,Framer Motion animations,THREE.js,Graph loading skeleton

## Details

This update focuses on improving the visual and interactive experience of the Universe Graph in the [[raag]] project.

Key enhancements include:
*   **Starfield Background**: Integration of a 2000-star particle starfield sphere using [[THREE.js]] to provide an immersive background for the graph.
*   **Camera Auto-Rotation**: The camera now automatically rotates at a speed of 0.3 when idle, offering a dynamic view of the graph.
*   **Node Hover Card**: A new `NodeHoverCard` component appears as a floating glass card at the bottom-center of the screen on node hover. This card displays essential node information such as type, name, BPM, energy, and year.
*   **Animated Side Panel**: The `GraphSidePanel`'s animation has been upgraded from CSS-based transitions to [[Framer Motion]], enabling smooth slide-in/out effects with `AnimatePresence` for a more polished user experience.
*   **Enhanced Loading Skeleton**: The `GraphLoadingSkeleton` has been redesigned to feature an animated constellation with connecting lines, a pulsing center node, and a waveform loading indicator, improving visual feedback during data loading.

## Related

[[raag]],[[THREE.js]],[[Chat UI Animations with Framer Motion]],[[Chat Messages with Framer Motion Enter Animations and Smooth Tool Results (raag)]],[[Chat UX Enhancements with Framer Motion]],[[Brain-Explorer: Starfield Background and Exponential Fog]],[[Ambient Auto-Rotation with Idle Resume (Brain-Explorer)]],[[Ambient Auto-Rotation with Idle Resume in Brain-Explorer]],[[Camera Ambient Auto-Rotation with Idle Resume]],[[Brain-Explorer Tooltip Redesign]],[[Brain-Explorer: Tooltip Redesign with Category Pills and Connection Badge]],[[Brain-Explorer: Floating Card Panel Redesign with Collapsible Sections and Staggered Animations]]
