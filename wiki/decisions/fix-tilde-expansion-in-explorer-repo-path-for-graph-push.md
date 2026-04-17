---
title: "Fix: Tilde Expansion in `explorer_repo_path` for Graph Push"
author: ai
created_at: 2026-04-13T18:26:53.194Z
last_ai_edit: 2026-04-13T18:26:53.194Z
last_human_edit: null
last_embedded_hash: 8bdd45337d9176e7
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-fix-graph-expand-tilde-in-explorer-repo-path-before-push-f6c1a2.md]]"
tags:
  - fix
  - graph
  - brain
  - explorer
  - path
  - tilde expansion
  - bun
  - nodejs
  - file system
  - bug
---


# Fix: Tilde Expansion in `explorer_repo_path` for Graph Push

This commit addresses a critical bug in the graph-push route where the `explorer_repo_path` containing a tilde (`~`) was not correctly expanded. Consequently, graph data was being written to an incorrect literal path within the `brain` repository instead of the intended `brain-explorer` directory.

## Key Concepts

[[graph-push]],`explorer_repo_path`,Tilde expansion,File paths,Bun.spawnSync,Node.js `fs` module

## Details

A bug was identified in the `graph-push` route (commit `8f7f5ab`) within the `rahilsinghi/brain` repository. The issue stemmed from the `explorer_repo_path` configuration, which was being passed as a raw value like `~/Desktop/brain-explorer` to the `push.ts` script.

Neither Node.js's `fs` module nor Bun's `Bun.spawnSync` utility perform automatic tilde expansion. As a result, the system interpreted `~/Desktop/brain-explorer` as a literal subdirectory within the `brain` repository's root, rather than expanding `~` to the user's home directory. This led to graph data being written to an unintended location, failing to update the actual `brain-explorer` repository.

The fix, authored by Rahil Singhi and co-authored by Claude Opus 4.6, involved ensuring that the tilde character in the `explorer_repo_path` is correctly expanded before being used as a file system path for `writeFileSync` operations or as the current working directory (`cwd`) for `Bun.spawnSync` commands. This correction, implemented on 2026-04-13, involved 5 additions and 1 deletion across 1 file.

## Related

[[API: POST /graph-push Endpoint for Graph Cache Rebuild and Explorer Update]],[[Brain project]],[[Brain-Explorer]],[[Bun]],[[Node.js]],[[File System]]
