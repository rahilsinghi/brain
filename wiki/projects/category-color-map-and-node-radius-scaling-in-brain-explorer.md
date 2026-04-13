---
title: Category Color Map and Node Radius Scaling in Brain-Explorer
author: ai
created_at: 2026-04-12T22:10:19.099Z
last_ai_edit: 2026-04-12T22:10:19.099Z
last_human_edit: null
last_embedded_hash: 85bb0c22ee2a7d86
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-feat-category-color-map-and-node-radius-scaling-082e89.md]]"
tags:
  - brain-explorer
  - data-visualization
  - frontend
  - commit
  - feature
  - node-rendering
  - graph-visualization
---


# Category Color Map and Node Radius Scaling in Brain-Explorer

This commit introduces significant visual enhancements to the [[Brain-Explorer]] application. It implements a category-based color map to visually differentiate nodes and dynamic node radius scaling for emphasizing node importance. These features improve the clarity and interpretability of the graph visualization.

## Key Concepts

Brain-Explorer,Node radius scaling,Category color map,Data visualization,Graph visualization

## Details

This commit (`0e1df6b`) to the `rahilsinghi/brain-explorer` repository, authored by Rahil Singhi (with co-authorship from Claude Opus 4.6), focuses on enhancing the visual representation of data within the [[Brain-Explorer]] application.

The primary features introduced are:

*   **Category-based Color Map**: Nodes within the graph are now assigned colors based on their respective categories. This visual distinction aids users in quickly identifying and understanding different types of information or relationships represented by the nodes.
*   **Dynamic Node Radius Scaling**: The radius of each node can now be scaled dynamically. While the specific metric for scaling is not detailed in the commit message, this technique is typically used to represent attributes like importance, size, or number of connections, further improving the interpretability of the graph.

These changes involved modifications across 2 files, adding 61 lines of code without any deletions, indicating a pure addition of new functionality aimed at improving the [[Data Visualization]] capabilities of the [[Brain-Explorer]]. This builds upon previous efforts related to node styling, such as [[Brain-Explorer: Category Color Fidelity Fix with MeshBasicMaterial]], [[Brain-Explorer: Fix Category Colors Washed Out by Emissive Material]], and [[Brain-Explorer: Purple Brightening and Glow Color Map]].

## Related

[[Brain-Explorer]],[[Brain-Explorer: Category Color Fidelity Fix with MeshBasicMaterial]],[[Brain-Explorer: Fix Category Colors Washed Out by Emissive Material]],[[Brain-Explorer: Purple Brightening and Glow Color Map]],[[Brain-Explorer: Node Position Reading, Simulation Tick, and Drag Support]],[[Data Visualization]]
