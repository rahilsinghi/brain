---
title: Brain-Explorer v1.2 Specification Documentation Fixes
author: ai
created_at: 2026-04-12T21:28:41.440Z
last_ai_edit: 2026-04-12T21:28:41.440Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-docs-fix-reheat-pattern-and-god-node-pinning-note-in-60f997.md]]"
tags:
  - documentation
  - brain-explorer
  - reheat
  - god-node
  - pinning
  - simulation
  - specification
  - fix
---

# Brain-Explorer v1.2 Specification Documentation Fixes

This article details documentation updates for the Brain-Explorer v1.2 specification, clarifying the `reheat()` pattern and the mechanism for 'god-node' pinning. These changes prevent unintended behaviors and provide clearer guidance for developers.

## Key Concepts

Reheat Pattern,God-Node Pinning,Brain-Explorer v1.2 Specification,Graph Simulation

## Details

This commit (`90f7188`) to the `rahilsinghi/brain-explorer` repository, authored by Rahil Singhi on 2026-04-11, focuses on refining the documentation for the v1.2 specification. The primary changes address two key areas:

1.  **Reheat Pattern**: The documentation was updated to clarify that `reheat()` operations are distinct from `restart()`. The `reheat()` function is specifically designed to avoid the risks associated with a 'one-tick timer' that can occur with `restart()`, ensuring more stable and predictable simulation behavior.
2.  **God-Node Pinning**: Clarification was added regarding 'god-node' pinning. The `fx/fy/fz` properties for these special nodes are now explicitly stated to be set during the *simulation initialization* phase, rather than through a `drag pin()` action. This distinction is crucial for maintaining the intended fixed positions of 'god-nodes' within the graph simulation.

These documentation fixes aim to improve the accuracy and utility of the [[Brain-Explorer v1.2 Specification]], aiding developers in understanding and implementing the graph's behaviors correctly.

## Related

[[Brain-Explorer]],[[Brain-Explorer: Performance and Robustness Fixes (f05b40e)]],[[Brain Explorer Completion: Deep-Linking and Wikilink Navigation]],[[Brain-Explorer: Spec Compliance - Wikilink Rendering, Palette Filters, and Code Cleanup]],[[Brain Graph Report (2026-04-10)]]
