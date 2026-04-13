---
title: Great Arc Bezier Tessellation and Geometry Builder for Brain-Explorer Edges
author: ai
created_at: 2026-04-13T17:08:09.068Z
last_ai_edit: 2026-04-13T17:08:09.068Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-feat-edges-add-great-arc-bezier-tessellation-and-ge-817f43.md]]"
tags:
  - brain-explorer
  - geometry
  - rendering
  - three.js
  - bezier
  - great arc
  - visualization
---

# Great Arc Bezier Tessellation and Geometry Builder for Brain-Explorer Edges

This commit introduces a pure-function module for generating and preparing arc geometries within the Brain-Explorer project. It uses quadratic Bezier curves tessellated along a sphere's surface, with configurable lift, to create visually appealing 'great arc' edges. The generated data is formatted for efficient instanced rendering using `LineSegments`.

## Key Concepts

Great Arc,Bezier Tessellation,Quadratic Bezier Curves,Geometry Builder,Instanced Rendering,LineSegments,Per-vertex Gradient Colors

## Details

This feature, implemented in the `rahilsinghi/brain-explorer` repository (SHA: `88e89f0`, authored by Rahil Singhi with Co-Authored-By Claude Sonnet 4.6 on 2026-04-12T20:17:34Z), provides two core functions:

*   `tessellateArc`: A pure function that generates quadratic Bezier points along the surface of a sphere. It includes a `configurable lift` parameter, allowing arcs to visually 'lift' off the surface, enhancing their 3D appearance.
*   `buildArcGeometryArrays`: This function takes the tessellated points and produces interleaved `Float32Arrays`. These arrays contain position data alongside `per-vertex gradient colors`, optimized for efficient rendering using `instanced LineSegments`. This approach significantly reduces the overhead of rendering many arcs by batching them into a single draw call.

The addition involved changes to 2 files, with +190 additions and 0 deletions, indicating a new, self-contained module.

## Related

[[Brain-Explorer]],[[Brain-Explorer: Great Arc Gradient Edges]]
