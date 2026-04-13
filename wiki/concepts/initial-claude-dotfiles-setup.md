---
title: Initial Claude Dotfiles Setup
author: ai
created_at: 2026-04-12T21:06:06.469Z
last_ai_edit: 2026-04-12T21:06:06.469Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-dotfiles-chore-initial-claude-dotfiles-6b39e3.md]]"
tags:
  - dotfiles
  - configuration
  - claude
  - git
  - symlink
  - automation
  - development
  - setup
  - portability
  - ai
  - rahil singhi
---

# Initial Claude Dotfiles Setup

This commit establishes the initial `.claude` dotfiles configuration, enabling portable synchronization of settings across machines using symlinks. It includes core `CLAUDE.md` content, skills, plugins via submodule, and an install script, while sensitive files are gitignored for security and portability.

## Key Concepts

Dotfiles,Configuration Management,Symlink,Git Submodules,Portability,AI-Assisted Development

## Details

This wiki article documents the commit `39654f7` to the `rahilsinghi/dotfiles` repository, dated March 24, 2026, by Rahil Singhi. The commit, co-authored by Claude Opus 4.6, focused on initializing the `.claude` dotfiles configuration.

The primary objective is to create a portable setup for Claude-related configurations, allowing them to be easily synced and applied across different machines. This is achieved by managing the `~/.claude` directory via symlinks.

Key elements introduced in this initial setup include:
*   A global `CLAUDE.md` file, likely containing overarching project context or usage instructions.
*   Definitions for 'skills', indicating custom functionalities or behaviors for the Claude environment.
*   'Plugins' managed as a git submodule, enabling modular extensions to the Claude setup.
*   General settings files to customize the environment.
*   An `install` script to automate the setup process, streamlining deployment on new systems.

To ensure security and maintain portability, sensitive or machine-specific files are explicitly added to `.gitignore`, preventing their inclusion in the public repository.

## Related

[[Add Dotfiles Sync Section to CLAUDE.md]],[[CLAUDE.md]],[[Add everything-claude-code as Git Submodule to raag]],[[Add Pretext Submodule (Karen Project)]],[[Claude-powered Word-Level Rhyme Annotator for Raag]]
