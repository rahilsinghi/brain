---
status: processed
source_type: file_drop
source_id: null
ingested_at: 2026-04-10T12:30:00Z
parsed_at: 2026-04-10T12:30:00Z
compiled_to: "[[Claude How To]]"
processed_at: 2026-04-10T12:51:13.598Z
retry_count: 3
last_error: "[GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent: [503 Service Unavailable] This model is currently experiencing high demand. Spikes in demand are usually temporary. Please try again later."
compile_progress: null
---









# Claude How To: Comprehensive Project Profile

## Project Summary

**Claude How To** is a visual, example-driven tutorial and reference guide for Claude Code, Anthropic's official CLI and integrated development environment. Current version: **v2.2.0** (March 2026), actively maintained and synced with Claude Code 2.1+ releases. The project teaches developers to master Claude Code features — from basic slash commands to advanced subagents, MCP servers, hooks, and plugins — through structured learning modules, production-ready templates, and interactive self-assessments. 5,900+ GitHub stars, 690+ forks. Maintained by @luongnv89 with community contributions.

## Content Structure

The repository organizes Claude Code features into **10 progressive learning modules** (numbering reflects recommended learning order):

1. **01-slash-commands** — User-invoked command shortcuts (9 templates: optimize, pr, commit, generate-api-docs, push-all, unit-test-expand, doc-refactor, setup-ci-cd)
2. **02-memory** — Persistent context files (CLAUDE.md variants for project, directory, and personal scopes; 3 production templates)
3. **03-skills** — Reusable auto-invoked capabilities (6 skills: code-review, brand-voice, claude-md, doc-generator, blog-draft, refactor, each with SKILL.md + templates/scripts)
4. **04-subagents** — Specialized AI assistants with isolated contexts (9 agents: code-reviewer, test-engineer, documentation-writer, secure-reviewer, implementation-agent, debugger, clean-code-reviewer, data-scientist)
5. **05-mcp** — Model Context Protocol configurations (4 JSON templates: github-mcp, database-mcp, filesystem-mcp, multi-mcp)
6. **06-hooks** — Event-driven bash automation (8 example hooks covering format, commit, security, logging, validation, notifications; documents 25 hook events across 4 hook types)
7. **07-plugins** — Bundled feature collections (3 complete plugins: pr-review, devops-automation, documentation; each with agents, commands, MCP, hooks)
8. **08-checkpoints** — Session snapshots and rewind mechanics (examples and configuration guide)
9. **09-advanced-features** — Planning mode, extended thinking, background tasks, permission modes, headless mode, session management (config-examples.json with full setup options)
10. **10-cli** — Command-line reference with flags, options, and scripting patterns

**Supplementary Documentation**: LEARNING-ROADMAP.md (progressive path with self-assessment), CATALOG.md (feature reference with installation commands), QUICK_REFERENCE.md, INDEX.md (100+ file inventory), claude_concepts_guide.md (83KB deep conceptual reference), clean-code-rules.md, STYLE_GUIDE.md, resources.md.

## Directory Structure

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

## Current State — Completeness

**Maturity Level**: Production-ready, actively maintained.

**Coverage**: 10/10 feature categories comprehensively documented. All examples are copy-paste ready, not theoretical.

**Version Alignment**: Synced with Claude Code v2.1.84 (March 2026). Recent v2.2.0 changelog shows update of 55+ slash commands, 25 hook events (expanded from 18), new agent hook type, Auto Mode, Channels, Voice Dictation, WebSocket MCP transport, plugin LSP support.

**Interactive Learning**: Self-assessment skill (`/self-assessment`) provides interactive proficiency quiz across 10 feature areas with personalized learning paths. Lesson-quiz skill (`/lesson-quiz [topic]`) delivers 8-10 targeted questions per module.

**Template Completeness**: 100+ production-ready files spanning slash commands, skills (6 complete), subagents (9 agents), plugins (3 full-featured bundles), MCP configs (4), hooks (8+), memory templates (3 scopes), advanced feature configs. All include detailed SKILL.md, agent descriptions, and examples.

**Testing & Quality**: Automated testing pipeline (pytest, ruff linting, bandit security scans, mypy type checking), CI/CD workflows, codecov coverage tracking. Pre-commit hooks configured. All links validated (markdown-link-check).

**Documentation Depth**: README covers problem/solution, learning methodology, time estimates (11-13 hours full path), feature comparisons, example workflows (code review, documentation, DevOps). CATALOG.md (25KB) serves as complete feature reference. LEARNING-ROADMAP.md provides 3-level path with milestone checkpoints. claude_concepts_guide.md (83KB) offers deep conceptual explanations.

**Community & Maintenance**: Active development (last commit March 2026), contributor guidelines established (CONTRIBUTING.md), security reporting process defined. Community has contributed examples. MIT licensed, forks indicate active adoption by teams.

**Offline Access**: `scripts/build_epub.py` generates EPUB ebook with all content and rendered Mermaid diagrams for offline reading.

**Gaps/Limitations**: No video tutorials (though remotion-video.md prompt exists for generation). Some advanced features documented at conceptual level rather than with full step-by-step walkthrough. Plugin ecosystem only shows 3 example plugins (not exhaustive marketplace reference).
