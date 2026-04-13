---
title: "Dotfiles Feature: Skills, Agents, Hooks, and Prompt Amplifier"
author: ai
created_at: 2026-04-12T17:24:51.513Z
last_ai_edit: 2026-04-12T17:24:51.513Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-dotfiles-feat-add-skills-agents-hooks-and-prompt-amplifier-9b089d.md]]"
tags:
  - dotfiles
  - automation
  - workflow
  - skills
  - agents
  - hooks
  - prompt engineering
  - documentation
  - development
---

# Dotfiles Feature: Skills, Agents, Hooks, and Prompt Amplifier

This commit to the `rahilsinghi/dotfiles` repository introduces a significant expansion of capabilities, adding three new skills, four custom agents, and six hook scripts. It also includes comprehensive documentation updates and configuration changes to support these new features, enhancing automation and developer workflow.

## Key Concepts

Skills,Agents (AI),Hooks (Git/Pre-commit),Prompt Amplifier,Dotfiles,ESLint,Secret Blocker,Bash Validator

## Details

This feature commit (SHA: `aab3c96`) by [[Rahil Singhi]] on March 31, 2026, significantly overhauls the `[[rahilsinghi/dotfiles]]` repository by integrating a suite of new automation and workflow enhancements. The changes involved modifying 19 files, with 1128 additions and 12 deletions.

Key additions include:

*   **New Skills**: Three new utility skills were introduced: `scaffold-next` for project scaffolding, `env-check` for environment validation, and `deploy` for streamlined deployment processes.
*   **Custom Agents**: Four specialized [[Agents (AI)]] were added: `backend-builder`, `frontend-rapid`, `security-reviewer`, and `test-writer`. These agents are designed to automate and assist in various development phases.
*   **Hook Scripts**: Six new [[Hooks (Git/Pre-commit)]] were implemented to enforce code quality and security: a `secret blocker` to prevent sensitive information leaks, a `bash validator` for script integrity, a `[[Prompt Amplifier]]` (using `/+` syntax) to enhance prompt engineering, an `[[ESLint]]` hook to run on write operations, a `session init` hook, and a `completion verifier`.
*   **Documentation**: A comprehensive `SETUP.md` document was created, serving as a complete reference for the entire setup. The `[[CLAUDE.md]]` file was also updated to reflect all the new capabilities and their usage.
*   **Configuration**: The `settings.json` file was updated to wire up all the configurations for the newly added hooks.
*   **.gitignore Updates**: The `.gitignore` file was modified to exclude ephemeral directories such as `file-history`, `image-cache`, `ide`, and `telemetry`, ensuring a cleaner repository state.

This commit, co-authored by Claude Opus 4.6, demonstrates a significant step towards a more automated and robust development environment managed through dotfiles.

## Related

[[rahilsinghi/dotfiles]],[[CLAUDE.md]],[[Add Dotfiles Sync Section to CLAUDE.md]],[[Add CLAUDE.md for Project Context and Session Persistence]],[[Agent System Prompt Loading with PromptStore Integration]],[[Rahil Singhi]]
