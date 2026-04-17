---
title: "Universe Side Panel: Song/Album Detail and Navigation History"
author: ai
created_at: 2026-04-13T16:07:08.560Z
last_ai_edit: 2026-04-13T16:07:08.560Z
last_human_edit: null
last_embedded_hash: c06a1e689bfd896c
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-universe-side-panel-with-song-album-detail-and-navigation-42e3dd.md]]"
tags:
  - feature
  - ui/ux
  - raag
  - graph
  - side panel
  - navigation
  - deep linking
  - song details
  - album details
---


# Universe Side Panel: Song/Album Detail and Navigation History

This feature introduces a persistent `GraphSidePanel` in the `raag` project, replacing the modal `NodeDetailPanel`. It displays detailed information for songs (lyrics, stats, topics) and albums (tracklist) from the graph, incorporating a navigation history with a back button. The `ForceGraph` is updated to integrate with this panel, enabling node-click interactions and deep linking.

## Key Concepts

GraphSidePanel,NodeDetailPanel (replaced),Song Mode,Album Mode,Navigation History,ForceGraph,Deep Linking

## Details

A significant UI enhancement was implemented in the `rahilsinghi/raag` repository with SHA `08e5d88` on 2026-03-06. The `NodeDetailPanel`, previously a modal, has been replaced by a persistent `GraphSidePanel` (380px wide, fixed to the right). This panel serves as a central hub for displaying detailed information from the graph.

In **Song Mode**, the panel presents lyrics, statistics, topics, and entities associated with the selected song node. For **Album Mode**, it showcases the album's tracklist, with an interactive 'click-to-zoom' functionality for individual tracks.

A key feature of the new side panel is its integrated **navigation history**, allowing users to easily revisit previously viewed nodes using a dedicated back button. The `ForceGraph` component has been updated to open these panels upon node clicks and now supports external zoom via `pendingZoomNodeId`, facilitating **deep linking** capabilities within the application.

This commit, authored by Rahil Singhi and co-authored by Claude Opus 4.6, involved 4 file changes, adding 771 lines and deleting 270 lines, indicating a substantial refactor of the UI for graph node details.

## Related

[[raag]],[[Brain-Explorer]],[[Deep-Linking]]
