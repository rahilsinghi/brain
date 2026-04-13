---
title: "Fix: Category Colors Not Visible in Brain Explorer"
author: ai
created_at: 2026-04-10T19:19:21.767Z
last_ai_edit: 2026-04-10T19:19:21.767Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-fix-category-colors-not-visible-switch-to-meshbasi-e443c4.md]]"
tags:
  - three.js
  - bugfix
  - rendering
  - colors
  - material
  - meshbasicmaterial
  - bloom
  - brain-explorer
  - graphics
  - frontend
---

# Fix: Category Colors Not Visible in Brain Explorer

This article details a critical rendering bug fix in the Brain Explorer project where `instanceColor` settings for categories were being washed out and not visible. The issue stemmed from `instanceColor` interacting incorrectly with `material.emissive` in Three.js. The solution involved switching to `MeshBasicMaterial` and carefully adjusting color boosting and bloom post-processing settings.

## Key Concepts

[[Three.js]],[[MeshBasicMaterial]],[[instanceColor (Three.js)]],[[material.color (Three.js)]],[[material.emissive (Three.js)]],[[Bloom effect (Graphics)]],[[Color rendering]]

## Details

The problem identified was that `instanceColor` in Three.js interacts multiplicatively with `material.color`, but not with `material.emissive`. In the existing setup, a high intensity (1.5) white emissive material was used. This configuration effectively 'washed out' all specific category colors provided by `instanceColor` to pure white, making them indistinguishable and preventing visual differentiation between categories.

The fix involved several key adjustments:

1.  **Material Change:** The material for the nodes was switched to `[[MeshBasicMaterial]]`. This material type does not react to external lighting, making it ideal for self-glowing nodes as intended for the category display, and simplifying color management by removing lighting calculations.
2.  **Color Boosting:** Category colors were boosted by a factor of 1.6x. This was necessary to ensure that the colors would be adequately bright and picked up by the subsequent post-processing effects, particularly the bloom effect.
3.  **Bloom Adjustment:** The [[Bloom effect (Graphics)]] settings were re-tuned to harmonize with the new color pipeline. This included lowering the bloom intensity to 1.8 and adjusting the threshold to 0.4. These modifications ensure the bloom effect appropriately enhances the boosted colors without over-saturating or obscuring them, maintaining the desired visual fidelity.

This change was implemented in the `rahilsinghi/brain-explorer` repository with commit SHA `47d0cf0` on 2026-04-10.

## Related

[[Brain Explorer]],[[Three.js]],[[MeshBasicMaterial]],[[Bloom Effect]]
