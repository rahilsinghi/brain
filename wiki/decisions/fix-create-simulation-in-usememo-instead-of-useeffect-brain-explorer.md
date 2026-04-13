---
title: "Fix: Create Simulation in useMemo Instead of useEffect (Brain-Explorer)"
author: ai
created_at: 2026-04-12T21:42:15.050Z
last_ai_edit: 2026-04-12T21:42:15.050Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-fix-simulation-create-simulation-in-usememo-instead-9e0552.md]]"
tags:
  - bugfix
  - react
  - hooks
  - usememo
  - useeffect
  - simulation
  - brain-explorer
  - rendering
  - javascript
---

# Fix: Create Simulation in useMemo Instead of useEffect (Brain-Explorer)

This article details a bug fix in the Brain-Explorer project, where the graph simulation was moved from a `useEffect` hook to a `useMemo` hook. This change addresses an issue where graph elements like edge geometry were being rendered with incorrect, unpopulated position data due to `useEffect`'s asynchronous execution timing.

## Key Concepts

[[useMemo]],[[useEffect]],[[React Hooks]],[[Graph Simulation]],[[Brain-Explorer]],Rendering lifecycle,Performance optimization

## Details

This commit (`85b160e`) for the [[Brain-Explorer]] project addresses a critical rendering bug related to the timing of the graph simulation's creation.

**Problem:**
Previously, the simulation was created within a `useEffect` hook. Since `useEffect` runs *after* the component has rendered, child components like `Edges` and `InstancedNodes` were attempting to access `positionsRef` and `nodeIndexMap` *before* these references were populated by the simulation. This resulted in `Edge geometry` being created with all-zero positions, leading to an incorrect or invisible graph rendering.

**Solution:**
The simulation's instantiation was moved to a `useMemo` hook. `useMemo` executes synchronously during the render cycle, ensuring that `positionsRef` and `nodeIndexMap` are populated *before* any child components dependent on this data begin their rendering process. The `useEffect` hook was retained solely for cleanup purposes, specifically to stop the simulation when the component unmounts or dependencies change.

## Related

[[Brain-Explorer]],[[React Hooks]],[[useEffect]],[[useMemo]],[[Graph Visualization]]
