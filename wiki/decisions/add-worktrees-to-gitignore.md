---
title: Add .worktrees/ to .gitignore
author: ai
created_at: 2026-04-12T22:18:05.616Z
last_ai_edit: 2026-04-12T22:18:05.616Z
last_human_edit: null
last_embedded_hash: 5a6e6d69127cf403
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-chore-add-worktrees-to-gitignore-0cecbd.md]]"
tags:
  - git
  - configuration
  - repository
  - ignore
  - worktrees
  - brain project
---


# Add .worktrees/ to .gitignore

This article documents a chore commit that added `.worktrees/` to the `.gitignore` file within the `rahilsinghi/brain` repository. This prevents Git from tracking directories associated with the `git worktree` command, ensuring a cleaner repository.

## Key Concepts

[[.gitignore]],[[Git Worktrees]],[[rahilsinghi/brain]]

## Details

The commit `0b81bdc`, authored by [[Rahil Singhi]] on 2026-04-08, involved modifying the `.gitignore` file in the `[[rahilsinghi/brain]]` repository. The change consisted of adding `/.worktrees/` to the ignore list, ensuring that files and directories created by `[[Git Worktrees]]` are not tracked by Git. This is a standard practice for managing local development environments with multiple working trees for a single repository.

## Related

[[rahilsinghi/brain]],[[Rahil Singhi]],[[.gitignore]],[[Git Worktrees]]
