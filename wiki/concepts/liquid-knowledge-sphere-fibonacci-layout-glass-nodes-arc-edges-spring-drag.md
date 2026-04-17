---
title: "Liquid Knowledge Sphere: Fibonacci Layout, Glass Nodes, Arc Edges, Spring Drag"
author: ai
created_at: 2026-04-13T15:38:49.103Z
last_ai_edit: 2026-04-13T15:38:49.103Z
last_human_edit: null
last_embedded_hash: dad5aa65ddf41fd9
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-feat-liquid-knowledge-sphere-fibonacci-layout-gla-84ad92.md]]"
tags:
  - brain-explorer
  - visualization
  - ui/ux
  - fibonacci layout
  - 3d graphics
  - webgl
  - three.js
  - glassmorphism
  - user interaction
  - knowledge graph
---


# Liquid Knowledge Sphere: Fibonacci Layout, Glass Nodes, Arc Edges, Spring Drag

This update to the [[Brain-Explorer]] project introduces a 'Liquid Knowledge Sphere' visualization, replacing the previous force-directed simulation with a static Fibonacci sphere layout. Key visual enhancements include glass-like nodes using `MeshTransmissionMaterial`, gradient Great Arc edges with additive blending, and a glassmorphic [[Brain Explorer: Article Panel Redesign with Metadata Fallback and Spring Animation]] and [[Brain-Explorer: Tooltip Redesign]]. It also features a spring-based cosmetic drag with a snap-back effect, removing the `d3-force-3d` dependency for a more refined and controlled user experience.

## Key Concepts

Fibonacci Sphere Layout,Glass Nodes (MeshTransmissionMaterial),Great Arc Gradient Edges,Additive Blending,Selective Bloom,Glassmorphism,Spring-based Cosmetic Drag,Dependency Removal (d3-force-3d)

## Details

This commit (`6d30225`) to the [[Brain-Explorer]] repository marks a significant overhaul of the knowledge graph visualization. The core change involves moving from a dynamic force-directed simulation to a static Fibonacci sphere layout, offering a more structured and aesthetically pleasing arrangement of nodes.

Key visual and interactive features introduced:
*   **Fibonacci Sphere Layout**: Nodes are now arranged in a static pattern based on a Fibonacci sphere, providing a balanced distribution.
*   **Glass Orbs (Nodes)**: Individual nodes are rendered using `MeshTransmissionMaterial`, creating a translucent, glass-like appearance.
*   **Great Arc Gradient Edges**: Connections between nodes are visualized as [[Brain-Explorer: Great Arc Gradient Edges]] with a subtle gradient and additive blending for a more ethereal look.
*   **Visual Effects Tuning**: The display now incorporates selective bloom effects, while environmental fog has been removed to enhance clarity and focus on the nodes.
*   **Glassmorphic UI**: The [[Brain Explorer: Article Panel Redesign with Metadata Fallback and Spring Animation]] and [[Brain-Explorer: Tooltip Redesign]] have been redesigned with a glassmorphic aesthetic, providing a sleek, semi-transparent overlay.
*   **Spring-based Cosmetic Drag**: Users can now interact with nodes using a cosmetic drag feature that includes a spring-like snap-back animation, improving the tactile feel of interaction without permanently altering the static layout.
*   **Dependency Removal**: The `d3-force-3d` library, previously used for force simulation, has been removed, streamlining the codebase and potentially improving performance and control over the visualization.

## Related

[[Brain-Explorer]],[[Brain-Explorer: Liquid Knowledge Sphere Plan Task Completion]],[[Brain-Explorer: Liquid Knowledge Sphere Specification Updates]],[[Brain Explorer: Article Panel Redesign with Metadata Fallback and Spring Animation]],[[Brain-Explorer: Tooltip Redesign]],[[Brain-Explorer: Great Arc Gradient Edges]],[[Brain-Explorer: Visual Effects Retuning (Fog Removal, Bloom, Camera Update)]],[[Brain-Explorer Force Simulation Tuning (354 Nodes)]]
