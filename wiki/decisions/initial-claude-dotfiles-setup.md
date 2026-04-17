---
title: Initial Claude Dotfiles Setup
author: ai
created_at: 2026-04-12T17:05:31.771Z
last_ai_edit: 2026-04-12T17:05:31.771Z
last_human_edit: null
last_embedded_hash: 4bc398074e5a929d
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-dotfiles-chore-initial-claude-dotfiles-6b39e3.md]]"
tags:
  - dotfiles
  - configuration
  - claude
  - symlink
  - git
  - submodule
  - portable-setup
  - chor
  - rahil-singhi
---


# Initial Claude Dotfiles Setup

This commit introduces the initial setup for Claude-specific dotfiles in the `rahilsinghi/dotfiles` repository. It enables a portable configuration across different machines using symlinks, including global settings, skills, and plugins. Sensitive files are properly ignored to maintain security.

## Key Concepts

[[Dotfiles]],[[Symlink]],[[Git Ignore]],[[Git Submodule]],Portable Configuration

## Details

This commit, identified by SHA `39654f7` and authored by [[Rahil Singhi]] on 2026-03-24, establishes the foundational `~/.claude` configuration within the `rahilsinghi/dotfiles` repository. The primary goal is to ensure a portable development environment by syncing configuration files via symlinks.

The setup includes:
*   A global [[CLAUDE.md]] for project context and instructions.
*   `skills` definitions.
*   `plugins` managed as a [[Git Submodule]].
*   General `settings`.
*   An `install` script to streamline deployment.

Crucially, sensitive and machine-specific files are excluded from version control using `.gitignore` to maintain security and flexibility across different environments.

Co-authored by [[Claude Opus 4.6]], this commit reflects an early integration of AI-assisted development practices.

## Related

[[Dotfiles]],[[CLAUDE.md]],[[SKILLS.md]],[[Rahil Singhi]],[[Add Dotfiles Sync Section to CLAUDE.md]],[[Add everything-claude-code Submodule]],[[Claude Opus 4.6]],[[Git Submodule]]
