---
title: Initial Claude Dotfiles Setup
author: ai
created_at: 2026-04-10T02:06:05.186Z
last_ai_edit: 2026-04-10T02:06:05.186Z
last_human_edit: null
last_embedded_hash: 127e26f44cb206af
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-dotfiles-chore-initial-claude-dotfiles-6b39e3.md]]"
tags:
  - dotfiles
  - claude
  - configuration
  - symlinks
  - git
  - ai-tooling
  - devops
  - portability
  - install-script
  - plugins
---


# Initial Claude Dotfiles Setup

This commit establishes the initial Claude AI configuration dotfiles in Rahil Singhi's dotfiles repository. It sets up a portable, symlink-based system for syncing Claude configuration across machines, including a global CLAUDE.md, skills, plugins, settings, and an install script. Sensitive and machine-specific files are excluded via gitignore.

## Key Concepts

- **Dotfiles Management**: Storing configuration files in a version-controlled repository for portability
- **Symlink-Based Config**: Using symbolic links to sync `~/.claude` config directory across machines
- **CLAUDE.md**: A global configuration/instruction file for the Claude AI assistant
- **Git Submodules**: Plugins managed as a git submodule within the dotfiles repo
- **Gitignore for Secrets**: Sensitive and machine-specific files excluded from version control
- **Install Script**: Automated script to bootstrap the Claude config on a new machine
- **Co-Authorship with AI**: Commit co-authored by Claude Opus 4.6, indicating AI-assisted development

## Details

## Overview

This initial commit (`39654f7`) by Rahil Singhi introduces Claude AI configuration management into the `rahilsinghi/dotfiles` repository. The change was made on 2026-03-24 and involved 17 files with 496 additions and no deletions, indicating a purely additive setup.

## Structure

The dotfiles setup for Claude includes the following components:

- **`~/.claude` symlink**: The core mechanism — the Claude config directory is symlinked from the dotfiles repo, ensuring the same configuration is active regardless of which machine is in use.
- **Global `CLAUDE.md`**: A markdown file that provides persistent instructions, context, or preferences to Claude across all sessions.
- **Skills**: Likely custom skill definitions or prompt templates used to extend Claude's behavior.
- **Plugins (submodule)**: Plugin configurations tracked as a git submodule, allowing independent versioning of plugin dependencies.
- **Settings**: Claude-specific settings files (e.g., JSON or TOML configuration).
- **Install Script**: A bootstrapping script to automate the symlinking and setup process on a new machine.

## Portability and Security

The design prioritizes portability by centralizing config in a git repo and using symlinks, while maintaining security by gitignoring sensitive or machine-specific files (e.g., API keys, local overrides).

## AI Collaboration

The commit was co-authored by `Claude Opus 4.6`, reflecting a workflow where the AI assistant actively participates in its own configuration and tooling setup.

## Related

- [[Dotfiles Repository]]
- [[CLAUDE.md Configuration]]
- [[Claude AI Settings]]
- [[Git Submodules]]
- [[Symlink-Based Configuration Management]]
- [[AI-Assisted Development Workflows]]
- [[Rahil Singhi]]
