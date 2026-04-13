---
title: Liquid Knowledge Sphere Design Specification (Brain-Explorer)
author: ai
created_at: 2026-04-13T18:20:20.957Z
last_ai_edit: 2026-04-13T18:20:20.957Z
last_human_edit: null
last_embedded_hash: 723836882e04247c
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-docs-add-liquid-knowledge-sphere-design-spec-81d7fd.md]]"
tags:
  - documentation
  - design
  - brain-explorer
  - visualization
  - gpu-accelerated
  - fibonacci sphere
  - glassmorphism
  - ui/ux
  - roadmap
---


# Liquid Knowledge Sphere Design Specification (Brain-Explorer)

This document outlines the design specification for a 'Liquid Knowledge Sphere' visualization within the Brain-Explorer project. It details a transition from force-directed simulations to a GPU-accelerated static Fibonacci sphere layout, featuring glass nodes, gradient edges, and a glassmorphic user interface. The implementation is planned as a layered migration with six independent steps.

## Key Concepts

Force-directed simulation,GPU-accelerated visualization,Fibonacci sphere layout,Glass nodes,Gradient edges,Glassmorphic UI,Layered migration,[[Brain-Explorer]]

## Details

This design specification, authored by Rahil Singhi and co-authored by [[Claude Opus 4.6 (1M context)]], details a significant overhaul for the visualization component of the [[Brain-Explorer]] project. The core idea is to move away from computationally intensive force-directed simulations to a more performant GPU-accelerated static Fibonacci sphere layout.

The new visualization paradigm, dubbed 'Liquid Knowledge Sphere,' will feature:
*   **Static Fibonacci Sphere Layout**: Nodes will be arranged on a sphere using a Fibonacci spiral distribution, providing a more organized and predictable structure compared to dynamic simulations.
*   **Glass Nodes**: The nodes themselves will adopt a translucent, glass-like appearance, likely utilizing advanced rendering techniques like [[Brain-Explorer: MeshTransmissionMaterial Glass Orbs for Nodes]].
*   **Gradient Edges**: Connections between nodes will be rendered with gradients, potentially as [[Brain-Explorer: Great Arc Gradient Edges]], enhancing visual appeal and possibly indicating direction or strength.
*   **Glassmorphic UI**: The overall user interface will incorporate glassmorphic design principles, characterized by translucency, frosted effects, and subtle background blur.

The transition to this new design is planned as a 'layered migration' consisting of six independent steps, allowing for incremental development and integration. This approach aims to provide a more performant, visually appealing, and scalable knowledge exploration experience.

**Commit Details:**
*   **Repository:** `rahilsinghi/brain-explorer`
*   **SHA:** `524bf73`
*   **Date:** `2026-04-12T19:48:03Z`
*   **Author:** [[Rahil Singhi]]
*   **Files changed:** 1
*   **Additions:** +292 lines
*   **Deletions:** -0 lines

## Related

[[Brain-Explorer]],[[Brain-Explorer: Liquid Knowledge Sphere Plan Task Completion]],[[Brain-Explorer: Liquid Knowledge Sphere Specification Updates]],[[Brain-Explorer: MeshTransmissionMaterial Glass Orbs for Nodes]],[[Brain-Explorer: Great Arc Gradient Edges]],[[Brain-Explorer: Force Simulation & Node Dragging Design Specification]],[[Claude Opus 4.6 (1M context)]],[[Rahil Singhi]]
