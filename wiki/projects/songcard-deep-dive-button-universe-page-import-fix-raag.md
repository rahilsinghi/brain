---
title: SongCard Deep Dive Button & Universe Page Import Fix (Raag)
author: ai
created_at: 2026-04-12T17:06:35.904Z
last_ai_edit: 2026-04-12T17:06:35.904Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-fix-update-universe-page-import-add-deep-dive-button-to-song-4fb94c.md]]"
tags:
  - raag
  - frontend
  - ui
  - bugfix
  - feature
  - songcard
  - deep dive
  - universe page
  - import fix
---

# SongCard Deep Dive Button & Universe Page Import Fix (Raag)

This commit addresses a crucial import fix on the universe page, replacing `NodeDetailPanel` with `GraphSidePanel` for proper display. Additionally, it introduces a "Deep Dive" button to the `SongCard` component, allowing users to navigate directly to a song's detailed page.

## Key Concepts

[[Universe Page]],[[SongCard]],[[GraphSidePanel]],[[Deep Dive Feature]],[[UI Fixes]]

## Details

This commit, identified by SHA `52dc23b` in the `rahilsinghi/raag` repository, implements two key changes:

1.  **Universe Page Import Fix**: The `NodeDetailPanel` import was replaced with `GraphSidePanel` on the universe page. This likely resolves an issue where the correct panel component was not being used or was causing display errors.
2.  **SongCard Enhancement**: A new "Deep Dive" button, represented by a BookOpen icon, has been added to the `SongCard` component. Clicking this button navigates the user to the `/song/[id]` route, providing a dedicated page for more detailed information about the selected song.

## Related

[[raag]],[[Graphify Venv Setup Script]],[[Compact Grid LyricCards with Hindi/Romanized Toggle]],[[CLAP Encoder Compatibility and Lyrics Ingestion (raag eb48f40)]],[[Claude-powered Word-Level Rhyme Annotator for Raag]],[[Compact LyricCards with Hindi/Romanized Toggle]],[[Chat History Feature (RAAG Project)]],[[Chat History Feature (raag)]]
