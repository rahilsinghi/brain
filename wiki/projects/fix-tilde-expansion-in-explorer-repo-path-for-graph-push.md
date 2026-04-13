---
title: "Fix: Tilde Expansion in explorer_repo_path for Graph Push"
author: ai
created_at: 2026-04-13T16:10:07.560Z
last_ai_edit: 2026-04-13T16:10:07.560Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-fix-graph-expand-tilde-in-explorer-repo-path-before-push-f6c1a2.md]]"
tags:
  - bug fix
  - file path
  - tilde expansion
  - configuration
  - brain project
  - brain-explorer
  - api
  - bun
  - nodejs
---

# Fix: Tilde Expansion in explorer_repo_path for Graph Push

This article details a critical bug fix in the `rahilsinghi/brain` repository where the `graph-push` API route failed to correctly resolve the `explorer_repo_path`. The issue stemmed from `Node fs` and `Bun` not automatically expanding the `~` (tilde) character in file paths, causing graph data to be written to an incorrect, literal directory within the `brain` repository instead of the intended [[Brain-Explorer]] location.

## Key Concepts

Tilde Expansion,File Path Resolution,graph-push API Route,Node.js fs module,Bun.spawnSync,Configuration Management

## Details

A bug was identified in the `rahilsinghi/brain` repository, specifically within the `graph-push` API route. When pushing graph data, the raw configuration value for `explorer_repo_path`, often provided as `~/Desktop/brain-explorer`, was passed directly to the `push.ts` script.

The core of the problem lay in the handling of the `~` (tilde) character, which represents the user's home directory. Neither Node.js's built-in `fs` module (used for file writing) nor `Bun`'s `Bun.spawnSync` function (used for command execution, specifically its `cwd` parameter) perform automatic tilde expansion. As a result, `push.ts` interpreted `~/Desktop/brain-explorer` as a literal path relative to the `brain` repository's root, leading to graph data being saved into a newly created directory named `~/Desktop/brain-explorer` inside the `brain` repository itself, rather than the user's actual `Desktop/brain-explorer` directory where the [[Brain-Explorer]] repository resides.

This fix ensures that the `explorer_repo_path` configuration value undergoes explicit tilde expansion before being utilized by file system operations or process spawning commands, guaranteeing that graph data is correctly directed to the [[Brain-Explorer]] repository.

## Related

[[Brain Project]],[[Brain-Explorer]],[[API: POST /graph-push Endpoint for Graph Cache Rebuild and Explorer Update]],[[Brain Vault Structure and Project Configuration Scaffold]],[[Bun]],[[Node.js fs module]],[[File Path Resolution]],[[Tilde Expansion]]
