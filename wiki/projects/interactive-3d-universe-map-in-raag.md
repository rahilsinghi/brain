---
title: Interactive 3D Universe Map in Raag
author: ai
created_at: 2026-04-13T17:49:35.547Z
last_ai_edit: 2026-04-13T17:49:35.547Z
last_human_edit: null
last_embedded_hash: ae8f24bdddd8e7b6
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-interactive-3d-universe-map-at-universe-89d6bd.md]]"
tags:
  - 3d map
  - data visualization
  - raag
  - force graph
  - three.js
  - zustand
  - ui/ux
  - feature
  - interactive map
  - timeline
---


# Interactive 3D Universe Map in Raag

This feature introduces an interactive 3D 'Universe Map' to the `raag` project, visualizing data nodes with custom Three.js objects, a NodeDetailPanel, and comprehensive UI controls. It includes a scrollable TimelineView for historical data and utilizes Zustand for state management, leveraging `react-force-graph-3d` for its core functionality.

## Key Concepts

ForceGraph3D,Three.js custom node objects (album art, MC icosahedrons, topic octahedrons, glowing spheres),NodeDetailPanel (floating bubble popup),UniverseHeader,UniverseControls (view modes),GraphLoadingSkeleton,TimelineView (horizontal scrollable 2017-2025 timeline),Zustand `universe-store` (graph state and view modes),Graph Data Types (GraphNodeData, GraphEdgeData, GraphDataResponse),API Functions (`fetchGraphData`, `refreshGraphData`),Node/edge color constants and size mappings,Dependency: `react-force-graph-3d`,Dependency: `three`,Dependency: `@types/three`

## Details

An interactive 3D 'Universe Map' was added to the `rahilsinghi/raag` repository, accessible at the `/universe` endpoint. This significant feature (SHA: `df63e54`, committed by Rahil Singhi on 2026-03-04) involved 14 file changes, adding 1433 lines and deleting 1. The map is built using `ForceGraph3D` and features custom Three.js objects for nodes, including album art, MC icosahedrons, topic octahedrons, and glowing spheres with label sprites. 

Key components introduced include:
*   A `NodeDetailPanel` providing a floating bubble popup with trivia specific to each node type.
*   UI elements such as `UniverseHeader`, `UniverseControls` for managing view modes, and a `GraphLoadingSkeleton` for improved user experience during data loading.
*   A `TimelineView`, which is a horizontally scrollable timeline covering the years 2017-2025, allowing for chronological data exploration.
*   The `universe-store` powered by [[Zustand]] for managing graph state and different view modes.
*   Defined graph types, including `GraphNodeData`, `GraphEdgeData`, and `GraphDataResponse`, to ensure data consistency.
*   API functions `fetchGraphData` and `refreshGraphData` for efficient data retrieval.
*   Configurable node and edge color constants and size mappings for visual differentiation.
*   A new 'Universe' navigation link was added to the chat page header. 

Dependencies installed include `react-force-graph-3d`, `three`, and `@types/three` to support the 3D rendering capabilities. This work was co-authored by [[Claude Opus 4.6]].

## Related

[[raag]],[[ForceGraph3D]],[[Three.js]],[[NodeDetailPanel]],[[TimelineView]],[[Zustand]],[[Graph Data Types]],[[API Functions]],[[react-force-graph-3d]],[[three]],[[@types/three]],[[Claude Opus 4.6]]
