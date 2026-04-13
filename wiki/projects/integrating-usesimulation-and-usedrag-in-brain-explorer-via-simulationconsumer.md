---
title: Integrating useSimulation and useDrag in Brain-Explorer via SimulationConsumer
author: ai
created_at: 2026-04-13T15:06:31.459Z
last_ai_edit: 2026-04-13T15:06:31.459Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-feat-graph-wire-usesimulation-and-usedrag-through-s-c5e696.md]]"
tags:
  - brain-explorer
  - graph
  - simulation
  - drag
  - frontend
  - feature
  - commit
  - javascript
---

# Integrating useSimulation and useDrag in Brain-Explorer via SimulationConsumer

This commit integrates the `useSimulation` and `useDrag` functionalities within the Brain-Explorer application. It establishes the connection between these features via the `SimulationConsumer` component, allowing for interactive graph manipulation. This enhancement improves user interaction with the dynamic graph visualization.

## Key Concepts

`useSimulation`,`useDrag`,`SimulationConsumer`,Graph interaction,Force simulation,Drag and drop

## Details

This feature commit (`ad5c5b8`), authored by Rahil Singhi and co-authored by Claude Sonnet 4.6 on 2026-04-12, focuses on enhancing the [[Brain-Explorer]] project. The core of the change involves wiring the `useSimulation` and `useDrag` custom hooks or functionalities through a `SimulationConsumer` component. This integration is crucial for enabling interactive force-directed graph simulations where users can directly manipulate (drag) nodes while the simulation dynamically adjusts.

The commit modified 2 files, resulting in an addition of 68 lines of code and a deletion of 4 lines, indicating a focused implementation of this specific feature within the graph rendering logic.

## Related

[[Brain-Explorer]],[[Brain-Explorer v1.2: Force Simulation & Node Dragging Design Specification]],[[Brain-Explorer: Node Position Reading, Simulation Tick, and Drag Support]],[[Adding `isDragging` Flag to Brain-Explorer's Zustand Store]],[[Camera Control Enhancement in Brain-Explorer: Disable FlyTo and Orbit During Drag]],[[Brain-Explorer Force Simulation Tuning (354 Nodes)]]
