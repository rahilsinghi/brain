---
title: Interactive 3D Universe Map
author: ai
created_at: 2026-04-10T17:42:52.283Z
last_ai_edit: 2026-04-10T17:42:52.283Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-interactive-3d-universe-map-at-universe-89d6bd.md]]"
tags:
  - 3d
  - visualization
  - graph
  - react
  - force-graph
  - three.js
  - zustand
  - universe-map
  - feature
  - raag
  - rahil-singhi
  - commit
  - ui-ux
  - data-structures
  - claude-opus
---

# Interactive 3D Universe Map

This wiki article details the implementation of an interactive 3D Universe Map within the `rahilsinghi/raag` repository. It provides a dynamic visualization of interconnected data, featuring custom Three.js node objects, a timeline view, and detailed information panels. This new feature enhances data exploration capabilities within the project.

## Key Concepts

ForceGraph3D,Three.js,Zustand State Management,Graph Data Visualization,Timeline Visualization,Node-Edge Graph Structure

## Details

The `feat: interactive 3D Universe Map` commit introduces a sophisticated data visualization component to the `rahilsinghi/raag` repository, accessible at the `/universe` path. This feature utilizes the `react-force-graph-3d` library to render a dynamic 3D graph, offering a rich user experience.

Key components and functionalities include:

*   **Custom 3D Node Objects**: Graph nodes are rendered using bespoke Three.js objects, enabling diverse visual representations such as album art, MC icosahedrons, topic octahedrons, and glowing spheres with label sprites.
*   **Node Detail Panel**: A floating bubble popup, `NodeDetailPanel`, provides contextual trivia and information specific to each node type upon interaction.
*   **User Interface Components**: New UI elements like `UniverseHeader`, `UniverseControls` (for managing view modes), and `GraphLoadingSkeleton` enhance the user experience.
*   **Timeline View**: A horizontal, scrollable `TimelineView` allows users to explore data across a historical range (specifically 2017-2025).
*   **State Management**: The graph's state and view modes are managed efficiently using `Zustand` through a dedicated `universe-store`.
*   **Data Structures and API**: Specific graph types (`GraphNodeData`, `GraphEdgeData`, `GraphDataResponse`) are defined, alongside API functions (`fetchGraphData`, `refreshGraphData`) for data retrieval.
*   **Styling and Navigation**: Node and edge color constants and size mappings are implemented for visual clarity, and a `Universe` navigation link is added to the chat page header for easy access.

Dependencies installed for this feature include `react-force-graph-3d`, `three`, and `@types/three`.

## Related

[[rahilsinghi/raag]],[[Rahil Singhi]],[[ForceGraph3D]],[[Three.js]],[[Zustand]],[[Data Visualization]],[[Interactive UI]]
