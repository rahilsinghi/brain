---
title: "Liquid Knowledge Sphere: Fibonacci Layout, Glass Nodes, Arc Edges, Spring Drag in Brain-Explorer"
author: ai
created_at: 2026-04-13T17:15:58.088Z
last_ai_edit: 2026-04-13T17:15:58.088Z
last_human_edit: null
last_embedded_hash: 1f259cc14838a560
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-feat-liquid-knowledge-sphere-fibonacci-layout-gla-84ad92.md]]"
tags:
  - brain-explorer
  - 3d visualization
  - ui/ux
  - fibonacci layout
  - glasomorphism
  - rendering
  - interaction design
  - three.js
  - performance
---


# Liquid Knowledge Sphere: Fibonacci Layout, Glass Nodes, Arc Edges, Spring Drag in Brain-Explorer

This update to the Brain-Explorer project introduces the "Liquid Knowledge Sphere" visualization, replacing the previous force-directed simulation with a static Fibonacci sphere layout. Key visual enhancements include glass orb nodes using `MeshTransmissionMaterial`, great arc gradient edges with additive blending, and a glassmorphic design for the ArticlePanel and Tooltip. Interaction is improved with spring-based cosmetic drag that snaps back to position.

## Key Concepts

Liquid Knowledge Sphere,Fibonacci Sphere Layout,Glass Nodes (MeshTransmissionMaterial),Great Arc Gradient Edges,Spring-based Cosmetic Drag,Glassmorphic UI Design,Additive Blending

## Details

The `Brain-Explorer` project underwent a significant visual and interaction overhaul, introducing the 'Liquid Knowledge Sphere' visualization. This update transitions from a dynamic force-directed simulation to a more structured and aesthetically refined static Fibonacci sphere layout for nodes.

**Key Features and Enhancements:**
*   **Fibonacci Sphere Layout**: Nodes are now arranged in a static Fibonacci sphere pattern, providing a balanced and organized spatial distribution.
*   **Glass Orb Nodes**: Nodes are rendered as visually striking glass orbs, achieved using Three.js's `MeshTransmissionMaterial`, enhancing their appearance and adding depth.
*   **Great Arc Gradient Edges**: Connections between nodes are visualized as great arc gradient edges, utilizing additive blending for a smoother, more integrated look.
*   **Visual Effects Refinement**: Selective bloom effects have been applied to highlight certain elements, while environmental fog has been removed to improve clarity and focus.
*   **Glassmorphic UI**: The ArticlePanel and Tooltip user interface elements now feature a glassmorphic design, aligning with the new visual theme.
*   **Spring-Based Cosmetic Drag**: User interaction with nodes is enhanced through a spring-based cosmetic drag mechanism. This allows for temporary manipulation of node positions with a satisfying snap-back effect, maintaining the overall layout integrity. This change also facilitated the removal of the `d3-force-3d` dependency, streamlining the project's codebase.

## Related

[[Brain-Explorer]],[[Brain-Explorer: Upgrade to MeshTransmissionMaterial Glass Orbs for Nodes]],[[Brain-Explorer: Great Arc Gradient Edges]],[[Brain-Explorer: Tooltip Redesign with Category Pills and Connection Badge]],[[Brain Explorer: Article Panel Redesign with Metadata Fallback and Spring Animation]],[[Brain-Explorer: Force Simulation & Node Dragging Design Specification]],[[Brain-Explorer: Skip FlyTo and Disable Orbit Controls During Drag]],[[Brain-Explorer: Visual Effects Retuning (Fog Removal, Bloom, Camera Update)]]
