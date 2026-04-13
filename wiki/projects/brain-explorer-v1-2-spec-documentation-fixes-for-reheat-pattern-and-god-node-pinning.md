---
title: "Brain-Explorer: v1.2 Spec Documentation Fixes for Reheat Pattern and God-Node Pinning"
author: ai
created_at: 2026-04-13T15:41:16.466Z
last_ai_edit: 2026-04-13T15:41:16.466Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-docs-fix-reheat-pattern-and-god-node-pinning-note-in-60f997.md]]"
tags:
  - documentation
  - brain-explorer
  - fix
  - simulation
  - nodes
  - pinning
  - reheat
  - god-node
  - specification
---

# Brain-Explorer: v1.2 Spec Documentation Fixes for Reheat Pattern and God-Node Pinning

This update clarifies documentation for the Brain-Explorer v1.2 specification, specifically addressing the `reheat()` pattern and the pinning behavior of 'god-nodes'. It details how `reheat()` prevents timer risks by avoiding `restart()` and confirms that 'god-node' pinning is set during simulation initialization, not via drag operations.

## Key Concepts

reheat() function,restart() function,God-Node pinning,Simulation initialization,Timer risk,Brain-Explorer v1.2 Specification

## Details

This commit, identified by SHA `90f7188`, introduces critical clarifications to the documentation for the [[Brain-Explorer]] project's v1.2 specification. The updates focus on two key areas:

1.  **`reheat()` Pattern**: The documentation now explicitly states that the `reheat()` function is preferred over `restart()` to mitigate the risk associated with one-tick timers. This ensures more robust and predictable simulation behavior.
2.  **God-Node Pinning**: Clarification is provided regarding 'god-node' pinning. The documentation now notes that the `fx`, `fy`, and `fz` properties for 'god-nodes' are set during the initial simulation setup (`simulation init`) and are not dynamically adjusted through drag `pin()` operations. This distinction is crucial for understanding how fixed nodes are handled within the [[Brain-Explorer v1.2: Force Simulation & Node Dragging Design Specification]].

## Related

[[Brain-Explorer]],[[Brain-Explorer v1.2 Specification Documentation Fixes]],[[Brain-Explorer v1.2: Force Simulation & Node Dragging Design Specification]],[[Brain-Explorer: Node Position Reading, Simulation Tick, and Drag Support]],[[Brain-Explorer Force Simulation Tuning (354 Nodes)]]
