---
title: Universe Graph Phase 4 Enhancements
author: ai
created_at: 2026-04-10T22:22:04.538Z
last_ai_edit: 2026-04-10T22:22:04.538Z
last_human_edit: null
last_embedded_hash: ac21c601212f7aea
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-universe-graph-starfield-auto-rotate-hover-card-anim-5bef6b.md]]"
tags:
  - universe graph
  - starfield
  - auto-rotate
  - hover card
  - animation
  - framer-motion
  - three.js
  - raag
  - feature
  - frontend
  - ui/ux
  - commit
  - phase 4
---


# Universe Graph Phase 4 Enhancements

This commit introduces significant visual and interactive upgrades to the Raag project's Universe Graph as part of Phase 4. Key features include a THREE.js-powered starfield, automatic camera rotation, a detailed Node Hover Card, and smooth, framer-motion driven animations for the side panel and loading skeleton, enhancing the user experience.

## Key Concepts

Universe Graph,Particle Starfield,Auto-Rotate Feature,Node Hover Card,Animated Side Panel,Loading Skeleton (UI),THREE.js,Framer Motion,AnimatePresence

## Details

This commit (`d231edb`) by Rahil Singhi on 2026-03-15 marks a significant set of enhancements for the `universe graph` component within the `rahilsinghi/raag` repository. It involved changes across 5 files, adding 336 lines and deleting 77 lines.

These enhancements, categorized as "Phase 4 universe enhancements," primarily focus on improving the visual fidelity and user interaction of the graph:

*   **Starfield Background**: A dynamic background was introduced using THREE.js, featuring a sphere populated with 2000 particle stars.
*   **Auto-Rotate**: The camera now automatically rotates at a speed of 0.3 when it is idle, providing a subtle animation to the graph.
*   **Node Hover Card (NodeHoverCard)**: A new floating 'glass card' appears at the bottom-center of the screen when hovering over a node. This card displays crucial node information including type, name, BPM, energy, and year.
*   **Animated Side Panel**: The `GraphSidePanel`'s animation was upgraded from CSS-based sliding to `framer-motion`, utilizing `AnimatePresence` for smoother, more fluid slide-in/out transitions.
*   **Enhanced Loading Skeleton**: The `GraphLoadingSkeleton` received visual upgrades, now featuring an animated constellation with connecting lines, a pulsing central node, and a waveform-style loading indicator.

## Related

[[Raag Project]],[[THREE.js]],[[Framer Motion]]
