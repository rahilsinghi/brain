---
title: Removal of CLAUDE.md and everything-claude-code Submodule from Gaze-Diffuse
author: ai
created_at: 2026-04-12T17:32:16.432Z
last_ai_edit: 2026-04-12T17:32:16.432Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-chore-remove-claudemd-and-everything-claude-code-from-977b66.md]]"
tags:
  - git
  - repository management
  - cleanup
  - gaze-diffuse
  - claude.md
  - submodule
---

# Removal of CLAUDE.md and everything-claude-code Submodule from Gaze-Diffuse

This article documents the removal of the `CLAUDE.md` file and the `everything-claude-code` submodule from the `rahilsinghi/gaze-diffuse` repository. These components were made local-only and added to `.gitignore` to prevent tracking in the main repository.

## Key Concepts

CLAUDE.md,everything-claude-code submodule,.gitignore,Git repository management,Project cleanup

## Details

On March 12, 2026, Rahil Singhi committed a change (SHA: `d20d334`) to the `rahilsinghi/gaze-diffuse` repository, removing the `CLAUDE.md` file and the `everything-claude-code` submodule.

### Changes Implemented:
*   The `CLAUDE.md` file was removed from the repository.
*   The `everything-claude-code` submodule entry was removed from `.gitmodules`.
*   Both `CLAUDE.md` and the content related to `everything-claude-code` were configured to be local-only, achieved by adding them to the project's `.gitignore` file. This prevents them from being tracked in the main Git repository while allowing local use.

This action involved changes across 4 files, resulting in 4 additions and 157 deletions, primarily due to the removal of the tracked files and submodule configuration.

## Related

[[CLAUDE.md]],[[Add everything-claude-code Submodule]],[[Gaze-Diffuse]],[[Add .coverage and htmlcov to gitignore]],[[Git Submodules]]
