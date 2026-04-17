---
title: Brain-Explorer Force Simulation Tuning (354 Nodes)
author: ai
created_at: 2026-04-13T18:40:42.110Z
last_ai_edit: 2026-04-13T18:40:42.110Z
last_human_edit: null
last_embedded_hash: f10c00eb53190139
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-fix-simulation-tune-force-parameters-for-354-nodes-764a28.md]]"
tags:
  - brain-explorer
  - force simulation
  - d3-force
  - graph visualization
  - bugfix
  - performance
  - ui/ux
  - simulation tuning
---


# Brain-Explorer Force Simulation Tuning (354 Nodes)

This article details a crucial fix implemented in the Brain-Explorer project to tune force simulation parameters. The adjustments prevent node 'explosions' and ensure that the graph visualization remains contained within the camera's view, particularly when rendering 354 nodes. Key parameters like charge, center, velocityDecay, alpha, and linkDistance were modified to achieve a more stable and aesthetically pleasing layout.

## Key Concepts

Force simulation,d3-force,Graph visualization,Node explosion,Charge (force parameter),Center (force parameter),Velocity decay,Alpha (simulation parameter),Link distance

## Details

A critical fix was applied to the Brain-Explorer's force simulation parameters to address issues with node stability and containment, specifically when visualizing 354 nodes. The goal was to prevent nodes from exploding out of view and to keep them tightly grouped within the camera's frustum.

Here are the specific parameter changes and their intended effects:

*   **Charge:** Reduced from `-30` to `-3`. This change significantly weakened the repulsion between nodes, preventing the `O(n²)` explosion that occurred with stronger repulsion, leading to a more controlled and less chaotic layout.
*   **Center:** Increased from `0.01` to `0.3`. This adjustment strengthened the force pulling nodes towards the center, ensuring a robust containment of the graph within the camera's view.
*   **Velocity Decay:** Increased from `0.4` to `0.75`. A higher damping factor was introduced to prevent nodes from overshooting their target positions, leading to a faster and more stable convergence of the simulation.
*   **Alpha:** Decreased from `1.0` to `0.15`. Lowering the initial alpha value reduced the simulation's initial energy. This change directly impacted the peak radius of the node spread, bringing it down from approximately `828` to `68`, indicating a much tighter initial layout.
*   **Link Distance:** Decreased from `15` to `12`. This reduction in preferred link length resulted in tighter connected clusters, improving the visual coherence of related nodes.

## Related

[[Brain-Explorer]],[[Brain-Explorer Force Simulation Tuning (354 Nodes)]],[[Brain-Explorer Graph Data Update (354 Nodes)]],[[Brain-Explorer v1.2: Force Simulation & Node Dragging Design Specification]],[[Brain-Explorer: Node Position Reading, Simulation Tick, and Drag Support]]
