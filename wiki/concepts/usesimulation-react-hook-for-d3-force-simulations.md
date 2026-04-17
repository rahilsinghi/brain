---
title: useSimulation React Hook for D3 Force Simulations
author: ai
created_at: 2026-04-12T21:33:21.327Z
last_ai_edit: 2026-04-12T21:33:21.327Z
last_human_edit: null
last_embedded_hash: b39d1f672484c829
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-feat-simulation-add-usesimulation-react-hook-6c286c.md]]"
tags:
  - react
  - hook
  - d3
  - force simulation
  - performance
  - lifecycle
  - brain-explorer
---


# useSimulation React Hook for D3 Force Simulations

This article describes the `useSimulation` React hook, designed for integrating D3 force simulations into React components. It manages simulation state using React refs to prevent excessive re-renders and provides stable callbacks for controlling the simulation lifecycle.

## Key Concepts

[[React Hook]],[[D3 Force Simulation]],[[useEffect]],[[React Refs]],[[Stable Callbacks]],[[Component Lifecycle]]

## Details

The `useSimulation` React hook, implemented in `rahilsinghi/brain-explorer` (SHA: `de7b168`), provides a robust way to manage D3 force simulations within React applications. It wraps the `force-simulation.ts` logic, leveraging React's `useEffect` hook to handle the simulation's lifecycle.

Key features and implementation details include:

*   **React Lifecycle Integration**: The hook utilizes `useEffect` to manage the simulation's setup, updates, and cleanup. This ensures the simulation starts when the component mounts and stops gracefully upon unmount, preventing memory leaks and unnecessary processing.
*   **Performance Optimization**: All simulation-related state is stored in `React Refs`. This design choice is crucial for performance, as it prevents the component from re-rendering at the simulation's typical 60 frames per second (`60fps`) tick rate, which would otherwise lead to significant performance overhead.
*   **Stable Callbacks**: The hook exposes several stable callbacks, including `tick`, `reheat`, `pin`, `unpin`, and `restoreDecay`. These callbacks are guaranteed to have stable identities across renders, making them safe to use in dependency arrays of other `useEffect` hooks or to pass down to child components without causing unnecessary re-renders in the children.
*   **Cleanup**: A critical aspect of the `useEffect` implementation is the cleanup function, which ensures the simulation is properly stopped when the component unmounts, maintaining application stability and resource efficiency.

## Related

[[Brain-Explorer]],[[force-simulation.ts]]
