---
title: Admin Refresh and Graph Metadata Display in Brain-Explorer
author: ai
created_at: 2026-04-12T22:23:22.265Z
last_ai_edit: 2026-04-12T22:23:22.265Z
last_human_edit: null
last_embedded_hash: ec2b72d3268d9044
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-explorer-feat-admin-refresh-cmd-shift-r-and-graph-metadata-302830.md]]"
tags:
  - brain-explorer
  - admin
  - refresh
  - graph
  - metadata
  - keyboard-shortcut
  - daemon
  - graph-push
  - ui
  - feature
  - developer-experience
---


# Admin Refresh and Graph Metadata Display in Brain-Explorer

This commit introduces two new features to [[Brain-Explorer]]: a keyboard-only "Admin Refresh" (Cmd+Shift+R) that triggers a daemon graph-push with status toast, and a "Graph Metadata" display showing node count and the graph's generation timestamp. These enhancements improve developer workflow and provide immediate insights into the graph's state.

## Key Concepts

Admin Refresh,Graph Metadata,Keyboard Shortcuts,Daemon Graph-Push,Status Toast,Node Count,Timestamp Display

## Details

This commit (`3c45fff`) implements two distinct features within the [[Brain-Explorer]] repository:

1.  **Admin Refresh (`Cmd+Shift+R`)**:
    *   Provides a keyboard-only shortcut (`Cmd+Shift+R`) to trigger a daemon graph-push operation.
    *   Upon activation, a status toast is displayed, informing the user of the action.
    *   This streamlines the process for developers to force an update of the graph data from the backend.

2.  **Graph Metadata Display**:
    *   Introduces a new UI element, `GraphMeta`, designed to show relevant metadata about the displayed graph.
    *   Specifically, it displays the current node count within the graph.
    *   It also shows a "time-ago" formatted timestamp, indicating when the graph data was last generated or updated.

These features collectively enhance the usability and developer experience of [[Brain-Explorer]] by offering quicker data synchronization and better visibility into the graph's operational state.

*   **Repository**: [[rahilsinghi/brain-explorer]]
*   **Commit SHA**: `3c45fff`
*   **Date**: 2026-04-10T18:26:03Z
*   **Author**: Rahil Singhi
*   **Co-Authored-By**: Claude Opus 4.6 (1M context)

## Related

[[Brain-Explorer]],[[API: POST /graph-push Endpoint for Graph Cache Rebuild and Explorer Update]],[[Admin Refresh and Graph Metadata Display Feature]],[[Admin Refresh and Graph Metadata Display in Brain-Explorer]],[[Admin Refresh and Graph Metadata Display]],[[API: POST /graph-push Endpoint for Graph Cache Rebuild and Explorer Update]],[[Admin Refresh and Graph Metadata Display]],[[Admin Refresh and Graph Metadata Display in Brain-Explorer]],[[Admin Refresh and Graph Metadata Display Feature]]
