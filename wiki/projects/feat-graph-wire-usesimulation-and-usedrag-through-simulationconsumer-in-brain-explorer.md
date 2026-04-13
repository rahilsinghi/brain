---
title: "feat(graph): Wire useSimulation and useDrag through SimulationConsumer in Brain-Explorer"
author: ai
created_at: 2026-04-13T18:07:31.843Z
last_ai_edit: 2026-04-13T18:07:31.843Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-feat-graph-wire-usesimulation-and-usedrag-through-s-c5e696.md]]"
tags:
  - brain-explorer
  - graph
  - simulation
  - dragging
  - react-hooks
  - front-end
  - feature
---

# feat(graph): Wire useSimulation and useDrag through SimulationConsumer in Brain-Explorer

This commit integrates the `useSimulation` and `useDrag` hooks within the `SimulationConsumer` component of the `brain-explorer` project. This enhancement enables interactive force-directed graph simulations, allowing users to drag and reposition nodes within the visualization.

## Key Concepts

[[Brain-Explorer]],Force-Directed Graph Simulation,Node Dragging,`useSimulation` Hook,`useDrag` Hook,`SimulationConsumer` Component

## Details

This feature commit, with SHA `ad5c5b8`, was authored by Rahil Singhi and co-authored by Claude Sonnet 4.6 on 2026-04-12. It introduces significant interaction capabilities to the `rahilsinghi/brain-explorer` repository by wiring the `useSimulation` and `useDrag` hooks through the `SimulationConsumer`.

The integration allows the `Brain-Explorer` to display a dynamic, force-directed graph where nodes can be interactively moved by the user. This involves connecting the simulation logic and drag event handling directly to the graph rendering components, enhancing the user experience by making the graph mutable and responsive to user input. The changes involved modifications to 2 files, adding 68 lines and deleting 4.

## Related

[[Brain-Explorer]],[[Brain-Explorer: Force Simulation & Node Dragging Design Specification]],[[Brain-Explorer: Node Position Reading, Simulation Tick, and Drag Support]],[[Brain-Explorer: Skip FlyTo and Disable Orbit Controls During Drag]],[[Brain-Explorer: v1.2 Specification Documentation Fixes for Reheat Pattern and God-Node Pinning]]
