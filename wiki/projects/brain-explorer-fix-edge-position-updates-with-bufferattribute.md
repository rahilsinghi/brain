---
title: "Brain-Explorer: Fix Edge Position Updates with BufferAttribute"
author: ai
created_at: 2026-04-12T22:01:56.491Z
last_ai_edit: 2026-04-12T22:01:56.491Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-fix-edges-use-bufferattribute-instead-of-float32buf-84273b.md]]"
tags:
  - brain-explorer
  - fix
  - rendering
  - three.js
  - gpu
  - bufferattribute
  - dynamic updates
---

# Brain-Explorer: Fix Edge Position Updates with BufferAttribute

This article details a fix in the `brain-explorer` project addressing an issue where dynamic updates to edge positions were not propagating to the GPU. The problem stemmed from `Float32BufferAttribute` creating a copy of the position array, leading to desynchronization. The solution involved switching to `BufferAttribute` to maintain a reference to the array, ensuring correct dynamic updates.

## Key Concepts

BufferAttribute,Float32BufferAttribute,GPU Rendering,Dynamic Updates,Three.js (implied)

## Details

A critical rendering issue in the [[Brain-Explorer]] project (commit `6deaca9` by Rahil Singhi on 2026-04-12T17:47:56Z) was identified and resolved. The problem manifested as edge positions not updating dynamically on the GPU, despite updates being made in the application logic.

The root cause was the use of `Float32BufferAttribute` for handling `edgePositionsRef`. `Float32BufferAttribute`, by design, copies the input array. This meant that `edgePositionsRef` and the geometry's internal position buffer were distinct objects. When the `useFrame` hook (presumably from React Three Fiber) attempted to write dynamic position updates, it modified the original `edgePositionsRef`, but the GPU was rendering the untouched, copied version stored within the geometry.

The fix involved replacing `Float32BufferAttribute` with `BufferAttribute`. Unlike its `Float32` counterpart, `BufferAttribute` stores the array by reference. This change ensures that any modifications made to the `edgePositionsRef` array are directly reflected in the geometry's buffer, allowing dynamic updates to propagate correctly to the GPU and resolve the rendering discrepancy.

**Repository:** `rahilsinghi/brain-explorer`
**SHA:** `6deaca9`
**Date:** `2026-04-12T17:47:56Z`
**Author:** [[Rahil Singhi]]
**Files changed:** 1
**Additions:** +4
**Deletions:** -1

## Related

[[Brain-Explorer]],[[Rahil Singhi]]
