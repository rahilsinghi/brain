---
title: "Brain-Explorer: Category Color Fidelity Fix with MeshBasicMaterial"
author: ai
created_at: 2026-04-12T17:59:08.620Z
last_ai_edit: 2026-04-12T17:59:08.620Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-fix-category-colors-not-visible-switch-to-meshbasi-e443c4.md]]"
tags:
  - three.js
  - brain-explorer
  - bugfix
  - rendering
  - graphics
  - color
  - material
  - bloom
  - ui/ux
---

# Brain-Explorer: Category Color Fidelity Fix with MeshBasicMaterial

This commit resolves a critical rendering issue in the Brain-Explorer where node category colors appeared washed out due to incorrect interaction between `instanceColor` and `material.emissive` in Three.js. The solution involved transitioning to `MeshBasicMaterial` for self-glowing nodes and carefully recalibrating color boosting and bloom effects.

## Key Concepts

Three.js,MeshBasicMaterial,instanceColor,material.color,material.emissive,Bloom Effect,Color Pipeline,Rendering Bug

## Details

The Brain-Explorer experienced a rendering bug where the vibrant category colors of its nodes were being washed out to pure white. Investigation revealed that in Three.js, `instanceColor` multiplies with `material.color`, but not `material.emissive`. With a high intensity white `material.emissive` (set at 1.5), the intended category colors were completely overpowered, resulting in a monochromatic appearance.

The fix addressed this by:

1.  **Switching to `MeshBasicMaterial`**: Since the nodes are self-glowing and do not require external lighting, `MeshBasicMaterial` was chosen. This material does not interact with lights, simplifying the rendering pipeline for these specific objects.
2.  **Boosting Category Colors**: The category colors were boosted by a factor of 1.6x. This ensures that even with the new material and bloom settings, the colors are sufficiently bright to be picked up and rendered distinctly.
3.  **Adjusting Bloom Effects**: To integrate seamlessly with the new color pipeline, the bloom intensity was lowered to 1.8 and the bloom threshold was set to 0.4. These adjustments help maintain a balanced visual effect, preventing excessive glow while preserving color fidelity.

## Related

[[Brain-Explorer]],[[Brain-Explorer: Fix Category Colors Washed Out by Emissive Material]],[[Brain-Explorer UI Fixes: Solid Backgrounds and Softer Glow]],[[Brain-Explorer: Purple Brightening and Glow Color Map (279cb64)]],[[Brain-Explorer: Color Scheme Enhancement]],[[Add Additive Glow Halo Layer for Nodes]]
