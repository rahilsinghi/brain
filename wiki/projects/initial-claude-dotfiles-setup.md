---
title: Initial Claude Dotfiles Setup
author: ai
created_at: 2026-04-09T02:06:25.578Z
last_ai_edit: 2026-04-09T02:06:25.578Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-dotfiles-chore-initial-claude-dotfiles-6b39e3.md]]"
tags:
  - dotfiles
  - claude
  - configuration
  - symlinks
  - git
  - automation
  - ai-assisted
  - devtools
  - setup
  - portability
---

# Initial Claude Dotfiles Setup

This commit establishes the initial Claude AI configuration dotfiles in Rahil Singhi's dotfiles repository. It sets up a portable, symlink-based system for syncing Claude configuration across machines, including a global CLAUDE.md, skills, plugins, settings, and an install script. Sensitive and machine-specific files are excluded via gitignore.

## Key Concepts

- **Dotfiles Management**: Configuration files tracked in version control for portability across machines
- **Symlink-based Setup**: Uses symbolic links to sync `~/.claude` config directory from the repository
- **CLAUDE.md**: Global Claude AI configuration/instructions file
- **Submodule Plugins**: Plugin dependencies managed as Git submodules
- **Gitignore Hygiene**: Sensitive and machine-specific files excluded from version control
- **Install Script**: Automated script to bootstrap the configuration on new machines
- **Co-authored with AI**: Commit co-authored with Claude Opus 4.6

## Details

## Overview

This commit (`39654f7`) introduces the foundational Claude AI configuration into Rahil Singhi's dotfiles repository, dated 2026-03-24.

## Changes

| Metric | Value |
|--------|-------|
| Files Changed | 17 |
| Lines Added | +496 |
| Lines Deleted | 0 |

## Structure

The setup includes the following components:

- **`~/.claude` symlink**: The core configuration directory is managed via a symlink pointing back to the tracked dotfiles location, enabling portability.
- **`CLAUDE.md`**: A global markdown file providing Claude with persistent instructions, context, or behavioral guidelines.
- **Skills**: Likely structured prompt templates or capability definitions for Claude.
- **Plugins (submodule)**: External plugin dependencies tracked as a Git submodule, keeping them versioned but separate.
- **Settings**: Configuration settings for the Claude environment.
- **Install Script**: A script to automate setup on new machines, creating necessary symlinks and initializing submodules.

## Security Considerations

Sensitive and machine-specific files (e.g., API keys, local overrides) are intentionally excluded via `.gitignore` to prevent accidental exposure in the repository.

## Collaboration Note

This commit was co-authored with **Claude Opus 4.6**, reflecting an AI-assisted development workflow.

## Related

- [[Dotfiles Repository]]
- [[Claude AI Configuration]]
- [[CLAUDE.md]]
- [[Git Submodules]]
- [[Symlink-based Dotfiles]]
- [[Rahil Singhi]]
- [[Install Scripts]]
