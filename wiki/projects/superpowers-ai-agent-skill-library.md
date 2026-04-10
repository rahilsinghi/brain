---
title: "Superpowers: AI Agent Skill Library"
author: ai
created_at: 2026-04-10T12:51:49.230Z
last_ai_edit: 2026-04-10T12:51:49.230Z
last_human_edit: null
last_embedded_hash: a3db5551b572dfdc
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/repo-profiles/superpowers-project-profile.md]]"
tags:
  - ai agents
  - coding workflow
  - skill library
  - zero-dependency
  - tdd
  - debugging
  - code review
  - brainstorming
  - planning
  - plugins
  - markdown
  - bash
  - claude code
  - cursor
  - copilot cli
  - codex
  - opencode
  - gemini
  - software development
  - best practices
  - anti-patterns
---


# Superpowers: AI Agent Skill Library

Superpowers is a zero-dependency skill library designed to guide AI coding agents (e.g., Claude Code, Cursor, Copilot CLI) through a systematic software development workflow. It enforces processes like design validation, test-driven development, and systematic debugging, moving agents beyond immediate code generation. The project emphasizes TDD, complexity reduction, and evidence-based verification to ensure high-quality outputs.

## Key Concepts

- **AI Coding Agents**: Software entities that assist in or perform coding tasks.,- **Skill Library**: A collection of predefined procedures, best practices, and anti-patterns for AI agents.,- **Zero-Dependency**: The project itself has no external software dependencies.,- **Skill-based Plugin Architecture**: A system where each skill is a reusable, self-contained guide for agents.,- **Test-Driven Development (TDD)**: A software development process where tests are written before the code.,- **Systematic Debugging**: A structured, evidence-based approach to identifying and fixing software defects.,- **Subagent-Driven Development**: A parallel or sequential workflow where individual tasks are handled by dedicated AI subagents.,- **Git Worktrees**: Isolated, project-local development branches for concurrent work.,- **Behavior Shaping Content**: Skills are designed not just as information, but to actively guide and correct agent behavior.,- **Anti-Patterns**: Common, counterproductive practices documented for agents to avoid.

## Details

Superpowers is a zero-dependency skill library for Claude Code and other AI coding agents, including Cursor, Codex, OpenCode, GitHub Copilot CLI, and Gemini. It provides a complete software development workflow, from brainstorming and design through implementation, testing, debugging, collaboration, and completion. The project's core philosophy is to enforce systematic processes, such as design validation before implementation, test-driven development (TDD), systematic debugging, parallel subagent coordination, and comprehensive code review, rather than allowing agents to immediately jump into coding. It prioritizes TDD, complexity reduction, evidence-based verification, and process over guessing.

### Tech Stack
*   **Package system:** ES modules (type: "module"), package.json-based (no dependencies)
*   **Testing infrastructure:** Node.js 22+ compatible, browser-based visual companion (isolated)
*   **Scripting:** Bash (Unix/Linux/macOS), Windows batch scripts (`run-hook.cmd`)
*   **Hook system:** JSON-based configuration for platform-specific injection (Claude Code, Cursor, Copilot CLI)
*   **Documentation:** Markdown with embedded Graphviz diagrams (ASCII DOT format rendered via `render-graphs.js`)
*   **Deployment:** Multi-platform (Claude Code official marketplace, GitHub Copilot CLI marketplace, Cursor plugins, Codex custom install, OpenCode, Gemini extensions)

### Architecture
Superpowers employs a **skill-based plugin architecture** where each skill is a reusable reference guide. These skills are implemented as Markdown documents with YAML frontmatter (name + description). Skills are designed to shape agent behavior and are not mere prose narratives; they are rigorously tested through adversarial pressure testing with subagents.

#### Skill System
*   **Core Skills:** 15 published skills cover testing, debugging, design, implementation, collaboration, and meta-skills (skill-writing itself).
*   **Skill Discovery:** Skills are automatically exposed to agents via a `SessionStart` hook, and agents invoke them using a "Skill" tool.
*   **Skill Location:** Personal skills are stored in platform-specific locations, e.g., `~/.claude/skills/` for Claude Code or `~/.agents/skills/` for Codex.
*   **SKILL.md Format:** Comprises YAML frontmatter (name, description) and a markdown body detailing process flows, checklists, anti-patterns, and reference tables.
*   **Supporting Files:** Extensive reference documents (e.g., API guides) and utilities are maintained as separate markdown or tool files.

#### Integration with Claude Code
*   **Hook Mechanism:** A `SessionStart` hook runs a bash script (`hooks/session-start`) when a user starts a session.
*   **Context Injection:** The hook injects the `using-superpowers` skill as an `<EXTREMELY_IMPORTANT>` context block to ensure agents read the skill introduction.
*   **Platform Detection:** The hook script detects the current platform (e.g., Claude Code via `CLAUDE_PLUGIN_ROOT`, Cursor via `CURSOR_PLUGIN_ROOT`) and outputs the correct JSON structure for each.
*   **Skill Triggering:** Agents are designed to detect conditions (e.g., "let's build a feature") and invoke relevant skills via the Skill tool before starting any work.
*   **Legacy Migration:** The hook provides warnings if old skill directories are detected and advises migration.

#### Skill Execution Flow (Mandatory Workflow)
1.  **Brainstorming:** Explore context, ask clarifying questions, propose approaches, present design, save design doc, user review, transition to planning.
2.  **Using Git Worktrees:** Create isolated workspaces, establish a clean Git baseline, verify `.gitignore` safety.
3.  **Writing Plans:** Decompose designs into bite-sized tasks (2-5 minutes each) with exact file paths, complete code, verification steps, and task-specific checkpoints.
4.  **Subagent-Driven Development OR Executing Plans:** Dispatch a fresh subagent per task (subagent-driven with in-context review) or execute plans in parallel sessions with human checkpoints.
5.  **TDD During Implementation:** Follow the RED-GREEN-REFACTOR cycle: write failing test → verify fails → write minimal code → verify passes → refactor → commit.
6.  **Systematic Debugging:** Conduct root cause investigation (read errors, reproduce, check changes) → gather evidence → fix → verify.
7.  **Code Review Gates:** Perform spec compliance review (code matches specification) and code quality review (style, patterns, testing).
8.  **Finishing:** Verify tests pass, present merge/PR/keep/discard options, clean up worktree.

#### Key Anti-Patterns Documented
*   "This is too simple to need a design" — every project needs a design (even if short).
*   Writing code before tests — a violation of TDD; requires deletion and restart.
*   Skipping systematic debugging for quick fixes — symptom fixes lead to new bugs.
*   Guessing on implementation without plans — wastes time on unproven approaches.

### Directory Structure Highlights
*   `superpowers/`: Root directory.
*   `.claude-plugin/`: Claude Code plugin metadata.
*   `hooks/`: SessionStart hook configuration and scripts.
*   `skills/`: Contains the 15 published skills (e.g., `brainstorming/`, `test-driven-development/`, `systematic-debugging/`).
*   `agents/`: Agent profiles (e.g., `code-reviewer.md`).
*   `commands/`: Slash command definitions.
*   `docs/`: Design documents, plans, and platform-specific documentation.
*   `tests/`: Various integration and trigger tests.
*   `package.json`: ES module configuration (version 5.0.7, no dependencies).

### Key Components
**Mandatory Workflow Skills**
*   `brainstorming`
*   `writing-plans`
*   `subagent-driven-development` or `executing-plans`
*   `test-driven-development`
*   `systematic-debugging`
*   `requesting-code-review`
*   `finishing-a-development-branch`

**Supporting Skills**
*   `using-git-worktrees`
*   `verification-before-completion`
*   `receiving-code-review`
*   `dispatching-parallel-agents`
*   `using-superpowers` (intro skill)
*   `writing-skills`

**Visual Companion**
An optional browser-based visual companion is available for brainstorming, offering mockups, diagrams, and comparisons. It runs on an isolated Node.js server, managed via PID monitoring (60-second grace + 30-minute idle timeout; Windows uses idle timeout only).

### Integration Points
*   **How It Hooks Into Claude Code:** The `SessionStart` hook, triggered on startup/clear/compact commands, runs a bash script that detects the platform, reads `skills/using-superpowers/SKILL.md`, and injects it as context, outputting platform-specific JSON.
*   **MCP / Plugin System:** Features zero dependencies, a plugin manifest (`.claude-plugin/plugin.json`) for marketplace registration, and multi-platform deployment. It supports marketplace integration (e.g., `obra/superpowers-marketplace`) for auto-updates.
*   **Custom Hooks (Cursor):** Uses `hooks-cursor.json` for Cursor IDE, detecting the platform via `CURSOR_PLUGIN_ROOT` and outputting snake_case JSON for compatibility.

### Development Setup
**Installation Methods**
Users can install Superpowers via official marketplaces (Claude Code, Cursor, Copilot CLI), custom marketplaces, or direct URL installation for platforms like Codex, OpenCode, and Gemini.

**Local Development (Contributing)**
Contributors are encouraged to fork the repository and use the `superpowers:writing-skills` skill to develop and test new skills. Development involves adversarial pressure testing across multiple sessions.

**Strict PR Requirements (94% rejection rate)**
*   Complete PR template with real answers.
*   Search for existing PRs (open and closed).
*   Verify a real, not speculative, problem.
*   Confirm changes belong in the core library.
*   Show a human partner the complete diff before submission.

**Rejected Categories of PRs**
*   Third-party dependencies.
*   Compliance rewrites of skills without evaluation evidence.
*   Project-specific or personal configurations.
*   Bulk/spray-and-pray PRs.
*   Speculative fixes.
*   Domain-specific skills (should be separate plugins).
*   Fork-specific changes or fabricated content.

**Testing**
The project includes tests for the brainstorm server, Claude Code harness integration, skill triggering, and subagent execution flows. Skills are primarily tested via subagent pressure scenarios, applying TDD principles to documentation.

### Current State
**What's Working**
*   Core workflow: brainstorming → planning → subagent execution → TDD implementation → code review → finishing.
*   Multi-platform support for major AI coding agents.
*   15 published skills covering the full development cycle.
*   Enforcement of TDD and systematic debugging methodologies.
*   Subagent coordination with two-stage review.
*   `using-superpowers` skill auto-injected at session start.
*   Cross-platform hook system and Git worktree isolation.

**Known Fixes (5.0.5+)**
Recent fixes include ESM compatibility for the brainstorm server, improved Windows PID monitoring, enhanced hook reliability, and restored user choice between `subagent-driven-development` and `executing-plans`.

**Incomplete / Not Yet Implemented**
*   Full visual companion scope monitoring (potential for high token usage).
*   Full Anthropic compliance (project has tested philosophy that differs from published guidance).
*   Integrated skill marketplace (skills are directory-managed).
*   Automated skill testing (currently manual subagent testing).
*   Custom hooks for all platforms (only Cursor has alternative hook config).

### Philosophy & Design Decisions
*   **YAGNI ruthlessly:** Remove unnecessary features at design time.
*   **Test-driven always:** Write tests first; delete code written before tests.
*   **Systematic over ad-hoc:** Process-first (brainstorm → plan → execute) rather than jumping into code.
*   **Evidence over claims:** Verify before declaring success; systematic debugging before fixes.
*   **"Human partner" language:** Deliberate terminology for agent accountability.
*   **Zero dependencies:** Pure markdown + bash scripts; no external tools required.
*   **Behavior shaping content:** Skills are carefully tuned to shape agent behavior (e.g., anti-pattern lists, Red Flag tables, rationalization prevention).

## Related

[[AI Coding Agents]],[[Claude Code]],[[Cursor IDE]],[[GitHub Copilot CLI]],[[Gemini CLI]],[[Test-Driven Development (TDD)]],[[Systematic Debugging]],[[Git Worktrees]],[[Code Review]],[[Subagent-Driven Development]]
