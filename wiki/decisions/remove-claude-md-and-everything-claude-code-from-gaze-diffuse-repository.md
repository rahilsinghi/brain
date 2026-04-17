---
title: Remove CLAUDE.md and everything-claude-code from Gaze-Diffuse Repository
author: ai
created_at: 2026-04-12T21:32:30.361Z
last_ai_edit: 2026-04-12T21:32:30.361Z
last_human_edit: null
last_embedded_hash: 08eae93bd8b11ded
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-chore-remove-claudemd-and-everything-claude-code-from-977b66.md]]"
tags:
  - git
  - repository
  - maintenance
  - gitignore
  - claudemd
  - everything-claude-code
  - gaze-diffuse
---


# Remove CLAUDE.md and everything-claude-code from Gaze-Diffuse Repository

This commit removes `CLAUDE.md` and the `everything-claude-code` submodule from the `rahilsinghi/gaze-diffuse` repository, moving them to local-only status and adding them to `.gitignore`. The change streamlines the repository by excluding documentation and code meant for local use.

## Key Concepts

[[CLAUDE.md]],[[Git Submodule]],`.gitignore`,Repository Maintenance,Local-only Files

## Details

On March 12, 2026, Rahil Singhi authored commit `d20d334` in the `rahilsinghi/gaze-diffuse` repository. This commit involved 4 file changes, with 4 additions and 157 deletions, indicating a significant removal of content. The primary action was to remove `CLAUDE.md` and the `everything-claude-code` submodule entry from `.gitmodules`.

The rationale behind this was to keep both `CLAUDE.md` and `everything-claude-code` as local-only resources, preventing them from being tracked in the main repository. They were subsequently added to the `.gitignore` file.

## Related

[[CLAUDE.md for Project Context and Session Persistence]],[[Add everything-claude-code as Git Submodule to raag]],[[Add .coverage and htmlcov to Gitignore]],[[Add .worktrees/ to .gitignore]],[[Add Tracking CSV Files to Gitignore]],[[Chore: Ignore Output Directories and Add Rescore Utility]],[[Chore: Remove CLAUDE.md from askNYC Repository]],[[rahilsinghi/gaze-diffuse]],[[Git Submodule]]
