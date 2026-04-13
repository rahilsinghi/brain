---
title: Brain-Explorer Force Simulation Tuning (354 Nodes)
author: ai
created_at: 2026-04-12T22:08:35.980Z
last_ai_edit: 2026-04-12T22:08:35.980Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-fix-simulation-tune-force-parameters-for-354-nodes-764a28.md]]"
tags:
  - brain-explorer
  - force simulation
  - graph visualization
  - d3-force
  - performance tuning
  - bug fix
---

# Brain-Explorer Force Simulation Tuning (354 Nodes)

This update details the tuning of force simulation parameters within the `brain-explorer` project to stabilize the visualization of 354 nodes. The adjustments aim to prevent an "explosion" of nodes, ensuring they remain contained within the camera frustum and form tighter clusters. Key parameters like charge, center, velocity decay, alpha, and link distance were modified to achieve a more controlled and aesthetically pleasing graph layout.

## Key Concepts

Force-directed graph drawing,Graph visualization,D3-force simulation,Camera frustum,Performance tuning

## Details

A critical fix was implemented in the `rahilsinghi/brain-explorer` repository (SHA `b912bcf`) to address issues with the force simulation when rendering 354 nodes. The previous parameter settings led to nodes expanding beyond the camera's view, creating an uncontrolled "explosion." The following parameters were adjusted:

*   **Charge**: Reduced from `-30` to `-3`. This change significantly weakens the repulsive force between nodes, thereby preventing an O(n²) explosion where node count drastically increases computational and visual instability.
*   **Center**: Increased from `0.01` to `0.3`. A stronger central force ensures better containment of the nodes within the camera frustum, preventing them from drifting too far from the center of the visualization.
*   **Velocity Decay**: Increased from `0.4` to `0.75`. This higher damping factor helps to quickly settle the simulation, preventing nodes from overshooting their target positions and reducing oscillation.
*   **Alpha**: Decreased from `1.0` to `0.15`. A lower initial alpha value implies less initial energy in the simulation, leading to a much smaller peak radius (approximately `68` units compared to the previous `828`), contributing to better containment.
*   **Link Distance**: Decreased from `15` to `12`. Reducing the preferred distance between linked nodes encourages the formation of tighter, more coherent clusters, improving the visual organization of the graph.

## Related

[[Brain-Explorer]],[[Brain-Explorer: Force Simulation & Node Dragging Design Specification]],[[Brain-Explorer: Performance and Robustness Fixes (f05b40e)]],[[Graph visualization]]
