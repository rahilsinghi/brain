---
title: Universe Side Panel with Song/Album Detail and Navigation History
author: ai
created_at: 2026-04-10T02:19:23.427Z
last_ai_edit: 2026-04-10T02:19:23.427Z
last_human_edit: null
last_embedded_hash: 677640e2ee7c81be
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-universe-side-panel-with-song-album-detail-and-navigation-42e3dd.md]]"
tags:
  - raag
  - ui
  - graph
  - side-panel
  - navigation
  - force-graph
  - song
  - album
  - deep-linking
  - feature
---


# Universe Side Panel with Song/Album Detail and Navigation History

This commit introduces a persistent GraphSidePanel replacing the previous modal NodeDetailPanel in the Raag application's Universe view. The panel supports both song and album display modes with rich detail, and includes navigation history tracking with a back button. ForceGraph integration enables node-click panel opening and external zoom via deep linking.

## Key Concepts

- **GraphSidePanel**: A persistent 380px right-side panel replacing the modal-based NodeDetailPanel
- **Song Mode**: Displays lyrics, stats, topics, and entities for a selected song node
- **Album Mode**: Shows a tracklist with click-to-zoom functionality for album nodes
- **Navigation History**: Panel tracks user navigation with a back button for traversal
- **pendingZoomNodeId**: A mechanism for external zoom triggering to support deep linking
- **ForceGraph Integration**: Graph nodes now open the side panel on click

## Details

## Overview

This feature replaces the existing modal-based `NodeDetailPanel` with a persistent `GraphSidePanel` in the Universe view of the Raag application. The new panel is anchored to the right side of the screen at a fixed width of 380px, providing a non-disruptive browsing experience while exploring the music knowledge graph.

## Panel Modes

### Song Mode
When a song node is selected, the panel displays:
- Full song lyrics
- Song statistics
- Associated topics
- Named entities

### Album Mode
When an album node is selected, the panel displays:
- A complete tracklist
- Click-to-zoom functionality for individual tracks

## Navigation History

The panel maintains an internal navigation history stack, allowing users to move back through previously viewed nodes using a dedicated back button. This supports exploratory graph traversal without losing context.

## ForceGraph Integration

- Node clicks in the ForceGraph now trigger the side panel to open with the relevant node's details
- A new `pendingZoomNodeId` prop supports external zoom commands, enabling deep linking to specific nodes in the graph

## Change Statistics

- **Files changed:** 4
- **Additions:** +771
- **Deletions:** -270
- **Author:** Rahil Singhi
- **Co-Author:** Claude Opus 4.6
- **Date:** 2026-03-06

## Related

- [[Raag Universe View]]
- [[ForceGraph Node Interaction]]
- [[NodeDetailPanel]]
- [[Music Knowledge Graph]]
- [[Deep Linking in Graph Views]]
- [[Navigation History Pattern]]
