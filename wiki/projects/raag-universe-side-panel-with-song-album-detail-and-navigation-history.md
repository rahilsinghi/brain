---
title: "Raag: Universe Side Panel with Song/Album Detail and Navigation History"
author: ai
created_at: 2026-04-12T17:10:43.563Z
last_ai_edit: 2026-04-12T17:10:43.563Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-universe-side-panel-with-song-album-detail-and-navigation-42e3dd.md]]"
tags:
  - raag
  - ui
  - ux
  - side panel
  - graph visualization
  - song details
  - album details
  - navigation history
  - deep linking
  - feature
---

# Raag: Universe Side Panel with Song/Album Detail and Navigation History

This feature introduces a persistent `GraphSidePanel` in the `raag` project, replacing the modal `NodeDetailPanel`. It provides detailed views for songs (lyrics, stats, topics) and albums (tracklists), complete with navigation history and deep linking capabilities for graph nodes.

## Key Concepts

[[GraphSidePanel]],[[NodeDetailPanel]] (replaced),Song Mode,Album Mode,Navigation History,[[ForceGraph]],Deep Linking,UI/UX,Data Visualization

## Details

The `feat: Universe side panel with song/album detail and navigation history` commit (SHA: 08e5d88) for the [[raag]] repository by Rahil Singhi on 2026-03-06, introduces a significant UI enhancement. It replaces the previous modal `NodeDetailPanel` with a persistent `GraphSidePanel`, positioned as a 380px wide right-hand panel.

This new side panel offers two primary modes:

*   **Song Mode**: Displays comprehensive details including lyrics, statistics, topics, and entities related to the selected song.
*   **Album Mode**: Shows a tracklist, allowing users to click tracks for a zoom-in effect or to view individual song details.

The `GraphSidePanel` maintains a navigation history, enabling users to traverse back through previously viewed items using a dedicated back button. Its integration with the `[[ForceGraph]]` component allows for direct panel opening upon node clicks. Furthermore, it supports external deep linking functionality via the `pendingZoomNodeId` property, facilitating direct access to specific nodes within the graph visualization.

## Related

[[raag]],[[GraphSidePanel]],[[NodeDetailPanel]],[[ForceGraph]]
