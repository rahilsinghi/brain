---
title: Initial Claude Dotfiles Setup
author: ai
created_at: 2026-04-13T01:04:37.296Z
last_ai_edit: 2026-04-13T01:04:37.296Z
last_human_edit: null
last_embedded_hash: 66bd4a13299e83f6
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-dotfiles-chore-initial-claude-dotfiles-6b39e3.md]]"
tags:
  - dotfiles
  - claude
  - configuration
  - symlink
  - git
  - setup
  - portability
  - automation
---


# Initial Claude Dotfiles Setup

This article details the initial setup of the `rahilsinghi/dotfiles` repository, designed to synchronize Claude's configuration across various machines using symlinks. It includes global configuration files, plugin management via submodules, and an install script, while ensuring sensitive data is excluded from version control.

## Key Concepts

[[Dotfiles]],[[Symlink]],[[Gitignore]],[[Plugin System]],[[Install Script]],[[Git Submodule]]

## Details

The `rahilsinghi/dotfiles` repository was initialized with commit `39654f7` by [[Rahil Singhi]] on March 24, 2026. This setup aims to provide a portable and consistent configuration environment for [[Claude]] across different machines.

Key aspects of this initial commit include:
*   **Configuration Synchronization**: The repository uses `[[Symlink]]`s to manage the `~/.claude` configuration directory, ensuring that `[[Claude]]`'s settings, skills, and plugins are centrally managed and easily deployed.
*   **Included Components**:
    *   A global `[[CLAUDE.md for Project Context and Session Persistence]]` file, likely containing documentation or high-level project context.
    *   Configuration files for various `[[Skill]]`s and `[[Plugin]]`s.
    *   A `plugins` directory, managed as a `[[Git Submodule]]` (e.g., `[[chore: add everything-claude-code as submodule]]`), allowing for external project dependencies to be easily integrated.
    *   General `settings` for the Claude environment.
*   **Automation**: An `install` script is provided to automate the setup process on new machines.
*   **Security and Privacy**: A `[[Gitignore]]` file is configured to explicitly exclude sensitive or machine-specific files, preventing their accidental exposure or synchronization.

This commit involved modifications across 17 files, introducing 496 new lines of code.

## Related

[[Dotfiles Sync Section to CLAUDE.md]],[[Add CLAUDE.md for Project Context and Session Persistence]],[[chore: add everything-claude-code as submodule]],[[Rahil Singhi]],[[Claude]]
