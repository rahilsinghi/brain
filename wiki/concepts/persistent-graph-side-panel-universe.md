---
title: Persistent Graph Side Panel (Universe)
author: ai
created_at: 2026-04-10T17:06:24.122Z
last_ai_edit: 2026-04-10T17:06:24.122Z
last_human_edit: null
last_embedded_hash: 6d383029c5aaeeb4
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-universe-side-panel-with-song-album-detail-and-navigation-42e3dd.md]]"
tags:
  - ui
  - ux
  - feature
  - panel
  - graph
  - song
  - album
  - navigation
  - rahilsinghi
---


# Persistent Graph Side Panel (Universe)

This update replaces the modal NodeDetailPanel with a persistent GraphSidePanel (380px wide) on the right side of the UI. It provides detailed information for songs (lyrics, stats, topics, entities) and albums (tracklist with click-to-zoom), alongside a navigation history feature. The ForceGraph now interacts with this panel for node details and supports deep linking.

## Key Concepts

Persistent UI Panel,Song Details View,Album Details View,Navigation History,Deep Linking,UI/UX Improvement

## Details

The `feat: Universe side panel` commit, identified by SHA `08e5d88` in the `rahilsinghi/raag` repository, introduces a significant UI enhancement. Dated 2026-03-06, this change by Rahil Singhi (with Co-Authored-By: Claude Opus 4.6) involved 4 file changes, adding 771 lines and deleting 270.

Key changes include:
*   **Replacement of NodeDetailPanel:** The previous modal `NodeDetailPanel` is replaced by a persistent `GraphSidePanel`. This panel occupies 380px on the right side of the screen, improving user flow by not obscuring the main graph view.
*   **Song Mode:** When a song node is selected, the panel displays comprehensive details, including lyrics, statistical data, associated topics, and identified entities.
*   **Album Mode:** For album nodes, the panel presents a tracklist. Tracks within the list can be clicked to 'zoom' or navigate, presumably within the graph or to play the track.
*   **Navigation History:** The panel incorporates a navigation history, allowing users to move backward through previously viewed song or album details using a dedicated back button. This enhances exploratory browsing.
*   **ForceGraph Integration:** The `ForceGraph` component is updated to open details in this new side panel upon node clicks. It also now supports external zooming via `pendingZoomNodeId`, facilitating deep linking directly to specific nodes and their associated panel content.

## Related

[[NodeDetailPanel]],[[GraphSidePanel]],[[ForceGraph]],[[Raag Project]]
