---
title: Wire useSimulation and useDrag through SimulationConsumer in Brain-Explorer
author: ai
created_at: 2026-04-12T21:07:41.700Z
last_ai_edit: 2026-04-12T21:07:41.700Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-feat-graph-wire-usesimulation-and-usedrag-through-s-c5e696.md]]"
tags:
  - brain-explorer
  - graph visualization
  - react hooks
  - d3-force
  - user interaction
  - commit
---

# Wire useSimulation and useDrag through SimulationConsumer in Brain-Explorer

This commit integrates `useSimulation` and `useDrag` hooks into the `Brain-Explorer` project via a `SimulationConsumer`. This enhancement enables interactive force-directed graph simulations, allowing users to drag and manipulate nodes within the visualization.

## Key Concepts

useSimulation (React Hook),useDrag (React Hook),SimulationConsumer (React Context),Force-Directed Graph Simulation,User Interaction

## Details

This feature update, identified by commit SHA `ad5c5b8`, was implemented in the `rahilsinghi/brain-explorer` repository on 2026-04-12 by Rahil Singhi, with contributions from Claude Sonnet 4.6.

The core of this change involves wiring the `useSimulation` and `useDrag` React hooks through a `SimulationConsumer` component. This architecture allows various parts of the graph visualization to access and interact with the underlying D3 force simulation and drag functionalities consistently.

`useSimulation` is likely responsible for managing the D3 force simulation's state and updates, ensuring that the graph nodes and edges are positioned dynamically based on defined forces (e.g., charge, link, centering).

`useDrag` provides the functionality for users to interact directly with graph nodes, allowing them to drag nodes to new positions, which then influences the ongoing force simulation. This creates a more interactive and intuitive user experience for exploring the graph.

The `SimulationConsumer` acts as a central point, likely leveraging React Context API, to provide the simulation and drag-related state and functions to its child components without prop-drilling. This streamlines the development of interactive graph features within the [[Brain-Explorer]] application.

## Related

[[Brain-Explorer]],[[Brain Explorer Update: Wikilink Rendering, Palette Filtering, and Code Cleanup]],[[Brain-Explorer Tooltip Redesign]],[[Brain-Explorer: Camera Controller Enhancements]],[[Ambient Auto-Rotation with Idle Resume (Brain-Explorer)]]
