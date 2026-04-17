---
title: "Fix: Brain-Explorer Simulation Creation with useMemo"
author: ai
created_at: 2026-04-13T16:03:04.824Z
last_ai_edit: 2026-04-13T16:03:04.824Z
last_human_edit: null
last_embedded_hash: 9269a952608e3bd4
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-fix-simulation-create-simulation-in-usememo-instead-9e0552.md]]"
tags:
  - brain-explorer
  - react
  - hooks
  - useeffect
  - usememo
  - simulation
  - rendering
  - fix
---


# Fix: Brain-Explorer Simulation Creation with useMemo

This article details a fix in the Brain-Explorer project where the simulation creation was moved from `useEffect` to `useMemo` to resolve a rendering issue. The original `useEffect` implementation caused child components to render with outdated data, leading to incorrect geometry and visual glitches. Switching to `useMemo` ensures the simulation data is available synchronously before child components render.

## Key Concepts

[[React Hooks]],`useEffect`,`useMemo`,[[Component Rendering]],Simulation Lifecycle,[[Brain-Explorer]]

## Details

In the [[Brain-Explorer]] project, an issue was identified where the force simulation, responsible for node positioning, was being initialized within a `useEffect` hook. The fundamental problem with this approach is that `useEffect` runs *after* a component has rendered. Consequently, child components, specifically `Edges` and `InstancedNodes`, would execute their own `useMemo` hooks *before* critical data structures like `positionsRef` and `nodeIndexMap` were populated by the `useEffect` call.

This led to a scenario where `Edge` geometry, which depends on `positionsRef` for accurate coordinates, was being created with all-zero positions. Since the `Edge` geometry was not subsequently re-created or updated after `positionsRef` was eventually populated, the visualization of connections between nodes was incorrect or absent.

The fix involved relocating the simulation creation logic to a `useMemo` hook. Unlike `useEffect`, `useMemo` runs synchronously *during* the render phase. This ensures that `positionsRef` and `nodeIndexMap` are populated *before* any child components render, guaranteeing that `Edges` and `InstancedNodes` have access to the correct, up-to-date simulation data from the outset. The `useEffect` hook is now solely retained for cleanup operations, such as stopping the simulation when the component unmounts.

## Related

[[Brain-Explorer]],[[Brain-Explorer: Force Simulation & Node Dragging Design Specification]],[[Camera Controller Enhancements (brain-explorer)]],[[Brain-Explorer: Node Position Reading, Simulation Tick, and Drag Support]],[[Brain-Explorer Force Simulation Tuning (354 Nodes)]]
