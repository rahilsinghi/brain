---
title: "Brain-Explorer: Fix Category Colors Washed Out by Emissive Material"
author: ai
created_at: 2026-04-13T17:36:24.880Z
last_ai_edit: 2026-04-13T17:36:24.880Z
last_human_edit: null
last_embedded_hash: 14c2d3a476d65089
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-fix-category-colors-not-visible-switch-to-meshbasi-e443c4.md]]"
tags:
  - three.js
  - brain-explorer
  - rendering
  - bug fix
  - material
  - color
  - bloom
  - frontend
---


# Brain-Explorer: Fix Category Colors Washed Out by Emissive Material

This commit addresses a rendering issue in the Brain-Explorer where category colors were being washed out by the `material.emissive` property in Three.js. The solution involved switching to `MeshBasicMaterial`, boosting `instanceColor` values, and recalibrating bloom intensity to ensure accurate and vibrant category color representation.

## Key Concepts

[[Three.js]],[[MeshBasicMaterial]],[[material.emissive]],[[material.color]],[[instanceColor]],[[Bloom Effect]],[[Brain-Explorer]]

## Details

The commit `47d0cf0` for the `rahilsinghi/brain-explorer` repository resolves an issue where category-specific colors on nodes were not visible or appeared washed out.

**Problem:**
The `instanceColor` property in Three.js, used for node categorization, interacts multiplicatively with `material.color`, not `material.emissive`. The previous setup used a high-intensity white `material.emissive` (1.5 intensity), which effectively overrode and washed out all applied category `instanceColor` values, making them appear pure white.

**Solution:**
1.  **Material Change:** Switched the node material from the emissive-based material to `MeshBasicMaterial`. `MeshBasicMaterial` does not account for lighting and is suitable for self-glowing objects like the Brain-Explorer nodes, allowing `instanceColor` to directly control the visible color.
2.  **Color Boosting:** Category `instanceColor` values were boosted by a factor of 1.6x. This ensures that the colors are sufficiently bright for the subsequent bloom effect to pick them up effectively.
3.  **Bloom Adjustment:** The global bloom intensity was lowered to 1.8 and the threshold was set to 0.4. These adjustments were necessary to match the new color pipeline, preventing over-blooming while still providing the desired visual glow effect.

## Related

[[Brain-Explorer]],[[Brain-Explorer: Category Color Fidelity Fix with MeshBasicMaterial]],[[Brain-Explorer: Visual Effects Adjustment for Category Color Preservation]],[[Brain-Explorer: MeshTransmissionMaterial Glass Orbs for Nodes]],[[Brain-Explorer: Visual Effects Retuning (Fog Removal, Bloom, Camera Update)]],[[Brain-Explorer: Purple Brightening and Glow Color Map]]
