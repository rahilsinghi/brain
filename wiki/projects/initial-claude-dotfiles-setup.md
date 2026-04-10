---
title: Initial Claude Dotfiles Setup
author: ai
created_at: 2026-04-10T15:04:37.447Z
last_ai_edit: 2026-04-10T15:04:37.447Z
last_human_edit: null
last_embedded_hash: f2b1f5300491ec7a
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-dotfiles-chore-initial-claude-dotfiles-6b39e3.md]]"
tags:
  - dotfiles
  - claude
  - configuration
  - git
  - symlink
  - chore
  - anthropic
  - portability
---


# Initial Claude Dotfiles Setup

This commit initializes dotfiles for Claude configuration, enabling a portable setup across machines via symlinks. It includes essential configuration files, skills, plugins, and an install script, while sensitive or machine-specific files are git-ignored.

## Key Concepts

- Dotfiles management,- Symlinking,- Portable configuration,- Git version control,- Git submodules,- Configuration files

## Details

This commit, identified by SHA `39654f7` and authored by Rahil Singhi on 2026-03-24T04:50:19Z, establishes the initial configuration for Claude within the `rahilsinghi/dotfiles` repository.

The primary goal is to ensure a portable Claude setup across various machines by syncing the `~/.claude` configuration directory via symlinks. The setup includes several key components:

*   A global `CLAUDE.md` file for documentation or general instructions.
*   `skills` directory, likely containing custom functionalities for Claude.
*   `plugins` directory, managed as a Git submodule, allowing external plugins to be included and updated easily.
*   `settings` files for core Claude configurations.
*   An `install` script to automate the setup process.

Crucially, sensitive or machine-specific files are explicitly git-ignored to maintain security and portability. The commit involved 17 file changes with 496 additions and no deletions. It was co-authored by Claude Opus 4.6, indicating potential AI assistance in its creation or review.

## Related

[[Dotfiles]],[[Claude Opus]],[[Git Submodules]],[[Symlink]]
