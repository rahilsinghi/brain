---
title: "Fix: pnpm 10 Build Scripts for Native Modules (e939983)"
author: ai
created_at: 2026-04-10T21:25:29.781Z
last_ai_edit: 2026-04-10T21:25:29.781Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-fix-approve-sharp-esbuild-protobufjs-build-scripts-for-pnpm-1-143394.md]]"
tags:
  - pnpm
  - build
  - native-modules
  - sharp
  - esbuild
  - protobufjs
  - fix
  - commit
  - monorepo
---

# Fix: pnpm 10 Build Scripts for Native Modules (e939983)

This commit addresses an issue where pnpm 10's default behavior blocked build scripts for native modules, specifically affecting `sharp`, `esbuild`, and `protobufjs`. The fix involves explicitly approving these build scripts to restore functionality. Without this change, critical components like `sharp` would fail to load, leading to embedding synchronization issues.

## Key Concepts

- `pnpm 10`,- `Native Modules`,- `Build Scripts`,- `sharp`,- `esbuild`,- `protobufjs`,- `Embedding Sync`

## Details

This commit, identified by SHA `e939983`, resolves a critical build issue within the `rahilsinghi/brain` repository. The root cause was `pnpm 10`'s new default policy, which blocks build scripts for native modules unless explicitly approved.

### Problem
*   `pnpm 10` by default prevents native module build scripts from executing.
*   This particularly impacted the `sharp` library, preventing it from loading correctly.
*   The failure of `sharp` consequently led to a breakdown in 'embedding sync' functionalities.

### Solution
The fix involves modifying the project configuration to explicitly approve the necessary build scripts for `sharp`, `esbuild`, and `protobufjs` under `pnpm 10`.

### Commit Details
*   **Repository:** `rahilsinghi/brain`
*   **SHA:** `e939983`
*   **Date:** `2026-04-08T15:25:34Z`
*   **Author:** Rahil Singhi
*   **Co-Authored-By:** Claude Opus 4.6
*   **Files Changed:** 1
*   **Additions:** +7 lines
*   **Deletions:** -0 lines

## Related

[[pnpm]],[[Native Modules]],[[sharp]],[[esbuild]],[[protobufjs]],[[rahilsinghi/brain]]
