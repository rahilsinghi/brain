---
title: Great Arc Bezier Tessellation for Brain-Explorer Edges
author: ai
created_at: 2026-04-12T21:09:23.077Z
last_ai_edit: 2026-04-12T21:09:23.077Z
last_human_edit: null
last_embedded_hash: 812e30ea48619f5f
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-feat-edges-add-great-arc-bezier-tessellation-and-ge-817f43.md]]"
tags:
  - bezier arcs
  - geometry
  - 3d rendering
  - brain-explorer
  - line segments
  - tessellation
  - commit
  - feature
---


# Great Arc Bezier Tessellation for Brain-Explorer Edges

This feature introduces a pure-function module for generating quadratic Bezier arc geometries for the [[Brain-Explorer]] project. It enables tessellation of arcs along a sphere's surface and produces interleaved Float32Arrays for efficient instanced LineSegments rendering with per-vertex gradient colors.

## Key Concepts

Great Arc Bezier Tessellation,Quadratic Bezier Curves,Sphere Surface Arcs,Instanced Rendering,LineSegments,Float32Arrays,Per-Vertex Gradient Colors

## Details

This implementation adds a new pure-function arc-geometry module to the `rahilsinghi/brain-explorer` repository. The module comprises two core functions:

*   `tessellateArc`: This function is responsible for generating quadratic Bezier points along a sphere's surface. It allows for configurable 'lift' to adjust the arc's curvature and height above the surface.
*   `buildArcGeometryArrays`: This function takes the tessellated arc points and produces optimized `Float32Arrays`. These arrays are interleaved, containing both position data and per-vertex gradient colors, making them suitable for instanced `LineSegments` rendering. This approach significantly improves rendering performance and visual quality for graph edges in the [[Brain-Explorer]] visualization.

## Related

[[Brain-Explorer]],[[Brain-Explorer: Category Color Fidelity Fix with MeshBasicMaterial]],[[Brain-Explorer: Camera Controller Enhancements]],[[Brain-Explorer: Floating Card Panel Redesign with Collapsible Sections and Staggered Animations]]
