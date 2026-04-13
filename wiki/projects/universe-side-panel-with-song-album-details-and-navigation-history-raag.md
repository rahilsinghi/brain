---
title: Universe Side Panel with Song/Album Details and Navigation History (raag)
author: ai
created_at: 2026-04-12T21:11:34.978Z
last_ai_edit: 2026-04-12T21:11:34.978Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-universe-side-panel-with-song-album-detail-and-navigation-42e3dd.md]]"
tags:
  - raag
  - ui
  - graph
  - feature
  - song
  - album
  - navigation
  - deep linking
  - panel
---

# Universe Side Panel with Song/Album Details and Navigation History (raag)

This feature introduces a persistent `GraphSidePanel` in the `raag` project, replacing the previous modal `NodeDetailPanel`. The new panel offers detailed views for songs and albums, including lyrics, stats, tracklists, and a navigation history for enhanced user experience. It also integrates deep linking capabilities via the `ForceGraph`.

## Key Concepts

GraphSidePanel,NodeDetailPanel,Song/Album Details,Navigation History,Deep Linking,ForceGraph,Lyrics, Stats, Topics, Entities, Tracklist

## Details

The [[raag]] project (repository `rahilsinghi/raag`) now features a significant UI enhancement with the introduction of a persistent `GraphSidePanel`. This 380px right-hand panel replaces the older modal `NodeDetailPanel`, providing a more integrated and comprehensive display for graph node details.

Key functionalities of the `GraphSidePanel` include:
*   **Song Mode**: When a song node is selected, the panel displays detailed information such as lyrics, statistics, associated topics, and entities.
*   **Album Mode**: For album nodes, the panel presents a tracklist, allowing users to click to zoom into individual tracks within the graph.
*   **Navigation History**: The panel maintains a navigation history, enabling users to easily traverse previously viewed node details using a built-in back button.
*   **[[ForceGraph]] Integration**: The ForceGraph component has been updated to seamlessly open these panels upon node clicks. Additionally, it now supports external zoom actions via a `pendingZoomNodeId` parameter, facilitating [[Deep Linking]] to specific nodes within the graph.

This update, committed by Rahil Singhi (Co-Authored-By Claude Opus 4.6) on 2026-03-06 (SHA: `08e5d88`), marks a substantial improvement in the interactivity and information accessibility of the raag project's graph interface.

## Related

[[raag]],[[ForceGraph]],[[Deep Linking]],[[NodeDetailPanel]],[[GraphSidePanel]]
