---
title: "dotfiles: Skills, Agents, Hooks, and Prompt Amplifier Integration"
author: ai
created_at: 2026-04-13T17:15:27.009Z
last_ai_edit: 2026-04-13T17:15:27.009Z
last_human_edit: null
last_embedded_hash: 62c8d6f9a4a6e55e
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-dotfiles-feat-add-skills-agents-hooks-and-prompt-amplifier-9b089d.md]]"
tags:
  - dotfiles
  - automation
  - ai
  - agents
  - hooks
  - prompt amplifier
  - workflow
  - development
  - claude
  - skills
---


# dotfiles: Skills, Agents, Hooks, and Prompt Amplifier Integration

This commit significantly enhances the `rahilsinghi/dotfiles` repository by integrating new automation and AI-driven capabilities. It introduces three new skills, four custom agents, and six versatile hook scripts, including a prompt amplifier.
The updates streamline development workflows, improve code quality, and provide robust documentation for the entire setup.

## Key Concepts

- **New Skills**: `scaffold-next`, `env-check`, `deploy` for common development tasks.,- **Custom Agents**: `backend-builder`, `frontend-rapid`, `security-reviewer`, `test-writer` for AI-assisted development.,- **Hook Scripts**: `secret blocker`, `bash validator`, `prompt amplifier`, `ESLint on write`, `session init`, `completion verifier` to automate and enforce best practices.,- **Prompt Amplifier**: A specific hook script designed to enhance prompt capabilities.,- **Documentation**: Comprehensive `SETUP.md` reference and an updated `CLAUDE.md`.

## Details

This feature commit (`aab3c96`) to the `rahilsinghi/dotfiles` repository introduces a suite of new tools and automations designed to enhance development workflows and leverage AI capabilities.

### New Capabilities:

*   **Skills**: Three new skills are added to the system:
    *   `scaffold-next`: For quickly setting up new Next.js projects or components.
    *   `env-check`: To validate environment configurations.
    *   `deploy`: For streamlined deployment processes.

*   **Custom Agents**: Four specialized AI agents are integrated to assist with various development tasks:
    *   `backend-builder`: Focused on generating and optimizing backend code.
    *   `frontend-rapid`: Designed for rapid frontend development and prototyping.
    *   `security-reviewer`: Aids in identifying potential security vulnerabilities.
    *   `test-writer`: Assists in generating comprehensive test cases and suites.

*   **Hook Scripts**: Six critical hook scripts are introduced to automate tasks and enforce development standards:
    *   `secret blocker`: Prevents accidental commitment of sensitive information.
    *   `bash validator`: Ensures the correctness and style of bash scripts.
    *   `prompt amplifier`: A unique hook identified by `(/+)` that enhances and refines AI prompts.
    *   `ESLint on write`: Automatically runs ESLint checks when files are saved.
    *   `session init`: Handles session initialization processes.
    *   `completion verifier`: Verifies the successful completion of tasks or processes.

### Documentation and Configuration Updates:

*   **`SETUP.md`**: A new, comprehensive `SETUP.md` file has been added, serving as a complete reference document for the entire `dotfiles` setup and its new features.
*   **`CLAUDE.md`**: The existing `CLAUDE.md` documentation has been updated to reflect all the newly integrated capabilities, especially those related to AI agents and the prompt amplifier.
*   **`settings.json`**: All new hook configurations and their settings are wired up in `settings.json`, ensuring proper functionality and customization.
*   **`.gitignore`**: The `.gitignore` file has been updated to exclude ephemeral directories such as `file-history`, `image-cache`, `ide`, and `telemetry`, preventing unnecessary files from being tracked in version control.

This update, co-authored by [[Claude Opus 4.6]], significantly expands the functionality and intelligence of the `rahilsinghi/dotfiles` environment.

## Related

[[rahilsinghi/dotfiles]],[[CLAUDE.md for Project Context and Session Persistence]],[[Prompt Amplifier]],[[Agent System Prompt Loading with PromptStore Integration]],[[Add everything-claude-code as Git Submodule to raag]],[[ESLint]],[[settings.json]],[[.gitignore]],[[Claude Opus 4.6]],[[Anthropic]]
