---
title: Claude How To
author: ai
created_at: 2026-04-10T12:51:13.598Z
last_ai_edit: 2026-04-10T12:51:13.598Z
last_human_edit: null
last_embedded_hash: e13e9a973a1f3d4e
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/repo-profiles/claude-howto-project-profile.md]]"
tags:
  - claude
  - claude code
  - anthropic
  - cli
  - ide
  - tutorial
  - documentation
  - project
  - github
  - learning
  - development
  - ai
  - subagents
  - hooks
  - plugins
  - mcp
  - reference
  - open-source
---


# Claude How To

Claude How To is a visual, example-driven tutorial and reference guide designed to help developers master Anthropic's official CLI and IDE, Claude Code. It features 10 progressive learning modules, production-ready templates, and interactive self-assessments covering topics from basic commands to advanced subagents, MCP servers, hooks, and plugins. Actively maintained (v2.2.0, March 2026) with over 5,900 GitHub stars, the project provides comprehensive, production-ready examples.

## Key Concepts

Claude Code,Anthropic CLI,Integrated Development Environment (IDE),Slash Commands,Memory (Claude Code),Skills (Claude Code),Subagents (Claude Code),Model Context Protocol (MCP),Hooks (Claude Code),Plugins (Claude Code),Checkpoints (Claude Code),Advanced Features (Claude Code),Command-Line Interface (CLI),Learning Modules,Production-ready Templates,Self-assessments,GitHub,Offline Access (EPUB),AI Assistants

## Details

# Claude How To: Comprehensive Project Profile

## Project Overview
**Claude How To** is a visual, example-driven tutorial and reference guide for [[Claude Code]], Anthropic's official CLI and integrated development environment. It is actively maintained by @luongnv89 with community contributions, and its current version is **v2.2.0** (March 2026), actively synced with Claude Code 2.1+ releases.

The project's goal is to teach developers to master [[Claude Code]] features—from basic [[Slash Commands]] to advanced [[Subagents (Claude Code)]], [[Model Context Protocol (MCP)]] servers, [[Hooks (Claude Code)]], and [[Plugins (Claude Code)]]—through structured learning modules, production-ready templates, and interactive self-assessments. It has garnered significant community attention, with over 5,900 GitHub stars and 690+ forks.

## Content Structure and Learning Path
The repository organizes [[Claude Code]] features into 10 progressive learning modules, numbered to suggest a recommended learning order:

*   **01-slash-commands**: User-invoked command shortcuts. Includes 9 templates for tasks like optimize, PR, commit, generate-api-docs, unit-test-expand, and setup-ci-cd.
*   **02-memory**: Persistent context files. Features 3 production templates for CLAUDE.md variants (project, directory, personal scopes).
*   **03-skills**: Reusable auto-invoked capabilities. Provides 6 skills: code-review, brand-voice, claude-md, doc-generator, blog-draft, refactor, each with `SKILL.md` and associated templates/scripts.
*   **04-subagents**: Specialized AI assistants with isolated contexts. Offers 9 agent definitions, including code-reviewer, test-engineer, documentation-writer, secure-reviewer, and debugger.
*   **05-mcp**: [[Model Context Protocol (MCP)]] configurations. Contains 4 JSON templates: github-mcp, database-mcp, filesystem-mcp, and multi-mcp.
*   **06-hooks**: Event-driven bash automation. Includes 8 example hooks covering format, commit, security, logging, validation, and notifications, documenting 25 hook events across 4 types.
*   **07-plugins**: Bundled feature collections. Presents 3 complete plugins: pr-review, devops-automation, and documentation, each comprising agents, commands, MCP, and hooks.
*   **08-checkpoints**: Session snapshots and rewind mechanics. Provides examples and a configuration guide.
*   **09-advanced-features**: Covers planning mode, extended thinking, background tasks, permission modes, headless mode, and session management, with comprehensive configuration examples.
*   **10-cli**: A command-line reference featuring flags, options, and scripting patterns.

### Supplementary Documentation
The project also includes crucial supplementary documentation:

*   **LEARNING-ROADMAP.md**: A progressive learning path with self-assessment opportunities.
*   **CATALOG.md**: A comprehensive feature reference (25KB) with all installation commands.
*   **QUICK_REFERENCE.md**: A concise reference guide.
*   **INDEX.md**: An inventory of 100+ files by category.
*   **claude_concepts_guide.md**: An 83KB deep conceptual reference for [[Claude Code]].
*   **clean-code-rules.md**, **STYLE_GUIDE.md**, and **resources.md**.

## Directory Structure
The project's organization facilitates easy navigation and learning:

```
claude-howto/
├── .claude/
│   └── skills/
│       ├── self-assessment/       (interactive SKILL.md + README)
│       └── lesson-quiz/           (per-lesson knowledge checks + question-bank.md)
├── 01-slash-commands/             (9 .md templates + README)
├── 02-memory/                     (3 CLAUDE.md variants + README)
├── 03-skills/                     (6 skills with SKILL.md, templates/, scripts/)
│   ├── code-review/               (review-checklist.md, finding-template.md, scripts/)
│   ├── brand-voice/               (tone-examples.md)
│   ├── refactor/                  (code-smells.md, refactoring-catalog.md, refactoring-plan.md)
│   ├── doc-generator/
│   ├── blog-draft/
│   └── claude-md/
├── 04-subagents/                  (9 .md agent definitions + README)
├── 05-mcp/                        (4 .json configs + README)
├── 06-hooks/                      (8 .sh examples + README with 25 events documented)
├── 07-plugins/                    (3 complete plugins with .claude-plugin/ manifests)
│   ├── pr-review/                 (agents/, commands/, hooks/, mcp/)
│   ├── devops-automation/         (agents/, commands/, hooks/, mcp/)
│   └── documentation/             (agents/, commands/, mcp/, templates/)
├── 08-checkpoints/                (checkpoint-examples.md + README)
├── 09-advanced-features/          (config-examples.json, planning-mode-examples.md + README)
├── 10-cli/                        (README with bash usage patterns)
├── scripts/                       (build_epub.py for offline EPUB generation; tests/ with pytest)
├── resources/                     (favicons/, icons/, logos/ — includes claude-howto-logo.svg/png)
├── prompts/                       (remotion-video.md for video generation)
├── slides/                        (presentation assets)
├── .github/                       (workflows/, ISSUE_TEMPLATE/, TESTING.md, SECURITY_REPORTING.md)
├── README.md                      (876 lines; landing page structure with comparisons, FAQ, workflows)
├── LEARNING-ROADMAP.md            (interactive path with 3 levels, 6 milestones)
├── CATALOG.md                     (25KB feature reference with all installation commands)
├── QUICK_REFERENCE.md
├── INDEX.md                       (100+ file inventory by category)
├── claude_concepts_guide.md       (83KB conceptual deep-dive)
├── CHANGELOG.md                   (v2.2.0 March 2026 synced with Claude Code 2.1.84)
├── CONTRIBUTING.md                (contributor guidelines + types of contributions)
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── STYLE_GUIDE.md
├── LICENSE                        (MIT)
└── Various config files           (.cspell.json, .pre-commit-config.yaml, .gitignore, pyproject.toml)
```

## Maturity and Features

*   **Maturity Level**: The project is considered production-ready and is actively maintained.
*   **Coverage**: It comprehensively documents 10/10 [[Claude Code]] feature categories, with all examples being copy-paste ready rather than theoretical.
*   **Version Alignment**: The project is precisely synced with [[Claude Code]] v2.1.84 (March 2026). The v2.2.0 changelog highlights recent updates, including 55+ slash commands, 25 hook events (expanded from 18), a new agent hook type, Auto Mode, Channels, Voice Dictation, WebSocket MCP transport, and plugin LSP support.
*   **Interactive Learning**: It incorporates interactive learning tools like the `/self-assessment` skill for proficiency quizzes across 10 feature areas, offering personalized learning paths. The `/lesson-quiz [topic]` skill delivers 8-10 targeted questions per module.
*   **Template Completeness**: Over 100 production-ready files are provided, spanning slash commands, 6 complete skills, 9 subagents, 3 full-featured plugins, 4 MCP configurations, 8+ hooks, and 3 memory templates. Each includes detailed `SKILL.md` files, agent descriptions, and examples.
*   **Testing & Quality**: The project maintains a robust automated testing pipeline, including `pytest`, `ruff` linting, `bandit` security scans, and `mypy` type checking. It leverages CI/CD workflows and codecov for coverage tracking, with pre-commit hooks configured and all links validated by `markdown-link-check`.
*   **Documentation Depth**: The `README.md` provides an extensive overview including problem/solution, learning methodology, time estimates (11-13 hours for the full path), feature comparisons, and example workflows (code review, documentation, DevOps). `CATALOG.md` (25KB) serves as a complete feature reference, `LEARNING-ROADMAP.md` details a 3-level path with milestone checkpoints, and `claude_concepts_guide.md` (83KB) offers deep conceptual explanations.
*   **Community & Maintenance**: Demonstrates active development (last commit March 2026), clear contributor guidelines (`CONTRIBUTING.md`), and a defined security reporting process. Community contributions are integrated, and the MIT license, along with numerous forks, indicates active adoption.
*   **Offline Access**: A `scripts/build_epub.py` is included to generate an EPUB ebook containing all content and rendered Mermaid diagrams for convenient offline reading.

## Gaps and Limitations

Despite its comprehensive nature, some areas for potential future expansion include:

*   Lack of integrated video tutorials (though a `remotion-video.md` prompt exists for generation).
*   Some advanced features are documented at a conceptual level rather than with full step-by-step walkthroughs.
*   The plugin ecosystem showcases only 3 example plugins, not an exhaustive marketplace reference.

## Related

[[Claude Code]],[[Anthropic CLI]],[[AI Assistants]],[[GitHub]],[[Model Context Protocol (MCP)]],[[Slash Commands]],[[Skills (Claude Code)]],[[Subagents (Claude Code)]],[[Hooks (Claude Code)]],[[Plugins (Claude Code)]],[[Integrated Development Environment]]
