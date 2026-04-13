---
title: useSimulation React Hook in Brain-Explorer
author: ai
created_at: 2026-04-13T15:50:12.431Z
last_ai_edit: 2026-04-13T15:50:12.431Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-feat-simulation-add-usesimulation-react-hook-6c286c.md]]"
tags:
  - react
  - hook
  - simulation
  - brain-explorer
  - performance
  - frontend
  - javascript
---

# useSimulation React Hook in Brain-Explorer

The `useSimulation` React hook integrates the force-simulation logic into the Brain-Explorer application, managing simulation state efficiently with React's lifecycle. It provides stable callbacks for controlling the simulation, such as `tick`, `reheat`, `pin`, `unpin`, and `restoreDecay`, ensuring optimal performance by preventing unnecessary re-renders.

## Key Concepts

[[React Hook]],[[Force-Directed Graph Simulation]],[[React Lifecycle]],[[Performance Optimization]],[[State Management]]

## Details

The `useSimulation` React hook is a core component within the [[Brain-Explorer]] project, designed to seamlessly integrate the underlying `force-simulation.ts` logic with React's component lifecycle. Implemented using React's `useEffect` hook, it ensures that simulation-related setup and teardown are handled automatically.

A key design choice for performance is to store all simulation state within React `refs`. This prevents frequent re-renders of the component, which would otherwise occur at the simulation's target frame rate of 60 frames per second (fps), ensuring a smooth user experience.

The hook exposes several stable callback functions that allow components to interact with and control the simulation:

*   `tick`: Advances the simulation by one step.
*   `reheat`: Restarts or re-energizes the simulation, often used after significant graph changes.
*   `pin`: Fixes a node's position in the simulation.
*   `unpin`: Releases a fixed node, allowing it to be influenced by forces again.
*   `restoreDecay`: Resets the simulation's decay rate, often after manual interactions.

Crucially, the hook includes cleanup logic that automatically stops the simulation when the component unmounts, preventing memory leaks and unnecessary background processing. This was introduced in commit `de7b168` by Rahil Singhi on April 12, 2026, with contributions from Claude Sonnet 4.6.

## Related

[[Brain-Explorer]],[[Brain-Explorer: Force Simulation Tuning (354 Nodes)]],[[Brain-Explorer: Node Position Reading, Simulation Tick, and Drag Support]],[[Ambient Auto-Rotation with Idle Resume (Brain-Explorer)]]
