---
title: Interactive 3D Universe Map
author: ai
created_at: 2026-04-10T22:27:58.260Z
last_ai_edit: 2026-04-10T22:27:58.260Z
last_human_edit: null
last_embedded_hash: a11fa2ddc7d82820
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-interactive-3d-universe-map-at-universe-89d6bd.md]]"
tags:
  - 3d
  - visualization
  - graph
  - react
  - threejs
  - forcegraph
  - zustand
  - ui
  - data
  - universe
  - raag
  - timeline
  - interactive
---


# Interactive 3D Universe Map

This entry details the implementation of an interactive 3D universe map within the `rahilsinghi/raag` project, accessible at the `/universe` route. It leverages `react-force-graph-3d` and `Three.js` to visualize interconnected data points as custom 3D nodes, providing an immersive and navigable data exploration experience. The map includes features like a timeline view, node detail popups, and comprehensive UI controls.

## Key Concepts

ForceGraph3D,Three.js Custom Nodes,Node Detail Panel,Timeline View,Zustand State Management,Graph Data Visualization,API Integration

## Details

The Interactive 3D Universe Map is a significant feature added to the `rahilsinghi/raag` repository, located at the `/universe` path. This implementation, identified by SHA `df63e54` and authored by Rahil Singhi (with co-authorship by Claude Opus 4.6), involved substantial changes with 14 files modified and over 1400 lines of additions.

At its core, the map utilizes `react-force-graph-3d` to render a dynamic 3D graph. This is heavily customized using `Three.js` to create unique node objects:
*   **Album Art:** Nodes representing albums display their respective artwork.
*   **Musical Concepts (MC):** Represented by icosahedrons.
*   **Topics:** Visualized as octahedrons.
*   **General Data Points:** Depicted as glowing spheres with label sprites for clear identification.

User interaction is enhanced through several dedicated UI components:
*   **NodeDetailPanel:** A floating bubble popup that appears when a node is selected, displaying trivia pertinent to the node's type.
*   **UniverseHeader:** Provides context and navigation for the map.
*   **UniverseControls:** Offers various view modes and interaction options for the 3D graph.
*   **GraphLoadingSkeleton:** A placeholder displayed while graph data is being fetched.

A key navigation feature is the **TimelineView**, a horizontal scrollable component that allows users to filter or navigate data across the years 2017 to 2025. The map's state, including graph data and view modes, is managed using `Zustand` through a dedicated `universe-store`.

The system defines clear data structures for graph entities, including `GraphNodeData`, `GraphEdgeData`, and `GraphDataResponse`, and includes API functions (`fetchGraphData`, `refreshGraphData`) for data retrieval. Visual consistency is maintained through node and edge color constants and size mappings. A direct navigation link to the Universe map has also been integrated into the chat page header.

Dependencies installed for this feature include `react-force-graph-3d`, `three`, and `@types/three` to facilitate the 3D rendering and interaction.

## Related

[[rahilsinghi/raag]],[[Rahil Singhi]],[[ForceGraph3D]],[[Three.js]],[[Zustand]],[[Graph Data Visualization]],[[Timeline View]],[[UI Components]],[[API Integration]]
