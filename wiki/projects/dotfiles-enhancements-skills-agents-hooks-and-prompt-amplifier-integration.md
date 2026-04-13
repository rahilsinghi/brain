---
title: "Dotfiles Enhancements: Skills, Agents, Hooks, and Prompt Amplifier Integration"
author: ai
created_at: 2026-04-13T15:37:43.062Z
last_ai_edit: 2026-04-13T15:37:43.062Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-dotfiles-feat-add-skills-agents-hooks-and-prompt-amplifier-9b089d.md]]"
tags:
  - dotfiles
  - automation
  - cli
  - development tools
  - agents
  - hooks
  - git hooks
  - prompt engineering
  - documentation
  - ai agents
  - code quality
  - security
  - scaffolding
  - deployment
---

# Dotfiles Enhancements: Skills, Agents, Hooks, and Prompt Amplifier Integration

This commit introduces significant enhancements to the `rahilsinghi/dotfiles` repository, adding new CLI skills, custom AI agents, and a suite of development hook scripts. These updates streamline various development workflows, enhance code quality, and improve system security.

## Key Concepts

Skills (CLI),Custom Agents (AI),Git Hooks,Prompt Amplifier,ESLint,Scaffold-Next,Env-Check,Deploy,Backend-Builder Agent,Frontend-Rapid Agent,Security-Reviewer Agent,Test-Writer Agent,Secret Blocker (Hook),Bash Validator (Hook),Completion Verifier (Hook),Dotfiles

## Details

The `aab3c96` commit to the `rahilsinghi/dotfiles` repository introduces a comprehensive set of new functionalities designed to automate and streamline various development tasks. Authored by Rahil Singhi with assistance from Claude Opus 4.6, this update modifies 19 files, adding over a thousand lines of new code.

Key additions include:

*   **New Skills (CLI)**:
    *   `scaffold-next`: A skill likely used for generating new project structures or components based on predefined templates, particularly for Next.js projects.
    *   `env-check`: A utility skill to validate environment configurations, ensuring all necessary variables and settings are correctly in place.
    *   `deploy`: A skill to automate deployment processes, potentially integrating with various hosting or cloud services.

*   **Custom Agents (AI-powered)**:
    *   `backend-builder`: An agent designed to assist with backend development tasks, such as generating API endpoints, database schemas, or service logic.
    *   `frontend-rapid`: An agent focused on accelerating frontend development, possibly by creating UI components, structuring pages, or assisting with styling.
    *   `security-reviewer`: An agent dedicated to identifying potential security vulnerabilities in code, offering suggestions for remediation.
    *   `test-writer`: An agent capable of generating unit or integration tests for existing codebases, improving code coverage and reliability.

*   **Hook Scripts (Git Hooks and System Hooks)**:
    *   `secret blocker`: A hook that prevents sensitive information (e.g., API keys, passwords) from being committed to version control.
    *   `bash validator`: A hook to validate Bash scripts for syntax errors or adherence to coding standards.
    *   `prompt amplifier (/+)`: A hook or utility designed to enhance or expand prompts, potentially for AI agents or interactive CLI tools, ensuring more comprehensive input.
    *   `ESLint on write`: Integrates ESLint directly into the writing workflow, performing code linting and formatting checks automatically upon file save.
    *   `session init`: A hook to initialize development sessions, setting up environments or launching necessary tools.
    *   `completion verifier`: A hook to verify the successful completion of tasks or commands.

*   **Documentation and Configuration Updates**:
    *   `SETUP.md`: A new comprehensive reference document detailing the entire setup process for these new features.
    *   `CLAUDE.md`: Updated to reflect all the newly introduced capabilities, providing context and usage instructions.
    *   `settings.json`: Configured to wire up all the new hook scripts, specifying their behavior and triggers.
    *   `.gitignore`: Modified to exclude ephemeral directories such as `file-history`, `image-cache`, `ide`, and `telemetry`, ensuring a clean repository history.

## Related

[[Dotfiles]],[[CLAUDE.md]],[[Add Dotfiles Sync Section to CLAUDE.md]],[[Prompt Amplifier]],[[ESLint]]
