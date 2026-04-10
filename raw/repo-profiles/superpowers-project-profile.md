---
status: pending
source_type: file_drop
source_id: null
ingested_at: 2026-04-10T12:30:00Z
parsed_at: 2026-04-10T12:30:00Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# Superpowers Project Profile

## Project Summary

**Superpowers** is a zero-dependency skill library for Claude Code and other AI coding agents (Cursor, Codex, OpenCode, GitHub Copilot CLI, Gemini). It provides a complete software development workflow: from brainstorming and design through implementation, testing, debugging, collaboration, and completion. Rather than agents immediately jumping into code, superpowers enforces systematic processes — design validation before implementation, test-driven development, systematic debugging, parallel subagent coordination, and comprehensive code review. Current stable version: 5.0.7 (released March 31, 2026). The project emphasizes TDD, complexity reduction, evidence-based verification, and process over guessing.

## Tech Stack

- **Package system:** ES modules (type: "module"), package.json-based (no dependencies)
- **Testing infrastructure:** Node.js 22+ compatible, browser-based visual companion (isolated)
- **Scripting:** Bash (Unix/Linux/macOS), Windows batch scripts (run-hook.cmd)
- **Hook system:** JSON-based configuration for platform-specific injection (Claude Code, Cursor, Copilot CLI)
- **Documentation:** Markdown with embedded Graphviz diagrams (ASCII DOT format rendered via render-graphs.js)
- **Deployment:** Multi-platform (Claude Code official marketplace, GitHub Copilot CLI marketplace, Cursor plugins, Codex custom install, OpenCode, Gemini extensions)

## Architecture

Superpowers uses a **skill-based plugin architecture** where each skill is a reusable reference guide implemented as a Markdown document with YAML frontmatter (name + description). Skills are language for shaping agent behavior and are NOT prose narratives—they're tested through adversarial pressure testing with subagents.

### Skill System
- **Core Skills:** 15 published skills covering testing, debugging, design, implementation, collaboration, and meta (skill-writing itself)
- **Skill Discovery:** Skills are automatically exposed to agents via SessionStart hook; agents invoke using Skill tool
- **Skill Location:** Personal skills live in `~/.claude/skills/` (Claude Code), `~/.agents/skills/` (Codex), per-platform locations for others
- **SKILL.md Format:** Frontmatter (name, description) + markdown body with process flows, checklists, anti-patterns, reference tables
- **Supporting Files:** Heavy reference docs (API guides, 100+ lines) live as separate markdown files; tools/utilities as separate files

### Integration with Claude Code
- **Hook Mechanism:** SessionStart hook runs `hooks/session-start` bash script when user starts a session
- **Context Injection:** Hook injects `using-superpowers` skill as `<EXTREMELY_IMPORTANT>` context block (ensures agents read skill introduction)
- **Platform Detection:** Hook script detects platform (Claude Code via `CLAUDE_PLUGIN_ROOT`, Cursor via `CURSOR_PLUGIN_ROOT`, Copilot CLI via `COPILOT_CLI=1`) and outputs correct JSON structure for each
- **Skill Triggering:** Agents detect conditions (e.g., "let's build a feature") and invoke skills via Skill tool before any work
- **Legacy Migration:** Hook warns if old `~/.config/superpowers/skills` directory exists and advises moving to `~/.claude/skills`

### Skill Execution Flow
1. **Brainstorming:** Explore project context, ask clarifying questions, propose 2-3 approaches, present design in sections, save design doc, user review, transition to planning
2. **Using Git Worktrees:** Create isolated workspace (project-local or global), establish clean git baseline, verify .gitignore safety
3. **Writing Plans:** Break design into bite-sized tasks (2-5 minutes each) with exact file paths, complete code, verification steps, task-specific checkpoints
4. **Subagent-Driven Development OR Executing Plans:** Dispatch fresh subagent per task (subagent-driven: same session, in-context review; executing-plans: parallel sessions, human checkpoints)
5. **TDD During Implementation:** Write failing test → verify fails → write minimal code → verify passes → refactor → commit
6. **Systematic Debugging:** Root cause investigation (read errors, reproduce, check changes) → evidence gathering → fix → verification
7. **Code Review Gates:** Spec compliance review (code matches spec) → code quality review (style, patterns, testing)
8. **Finishing:** Verify tests pass, present merge/PR/keep/discard options, cleanup worktree

### Key Anti-Patterns Documented
- "This is too simple to need a design" — every project needs a design (can be short)
- Writing code before tests — iron law violation; delete and restart
- Skipping systematic debugging for quick fixes — symptom fixes create new bugs
- Guessing on implementation without plans — wastes time on unproven approaches

## Directory Structure

```
superpowers/
├── .claude-plugin/
│   ├── plugin.json           # Claude Code plugin metadata (name, version, author, keywords)
│   └── marketplace.json      # Marketplace registry info
├── .codex/
│   └── INSTALL.md            # Codex-specific installation instructions
├── .cursor-plugin/           # Cursor IDE integration
├── .opencode/                # OpenCode integration
├── .github/
│   └── PULL_REQUEST_TEMPLATE.md    # Strict PR guidelines (94% rejection rate enforced)
├── hooks/
│   ├── hooks.json            # SessionStart hook registration (JSON)
│   ├── hooks-cursor.json     # Cursor-specific hook config
│   ├── session-start          # Bash script injecting using-superpowers into context
│   └── run-hook.cmd          # Windows hook runner
├── skills/                   # 15 published skills
│   ├── brainstorming/         # Design refinement (Socratic dialogue, design presentation)
│   │   ├── SKILL.md
│   │   ├── visual-companion.md  # Browser-based mockups/diagrams during brainstorming
│   │   └── spec-document-reviewer-prompt.md
│   ├── test-driven-development/     # RED-GREEN-REFACTOR cycle, testing anti-patterns
│   ├── systematic-debugging/        # 4-phase root-cause investigation (root-cause-tracing, defense-in-depth)
│   ├── writing-plans/               # Bite-sized task decomposition (2-5 min each, exact file paths)
│   ├── writing-skills/              # TDD applied to skill documentation; testing with subagents
│   │   ├── SKILL.md
│   │   ├── anthropic-best-practices.md  # Official Anthropic guidance (complementary, not authoritative)
│   │   ├── persuasion-principles.md     # Behavior shaping patterns
│   │   ├── testing-skills-with-subagents.md
│   │   └── examples/
│   ├── subagent-driven-development/ # Fresh subagent per task, two-stage review (spec → quality)
│   ├── executing-plans/             # Batch execution with human checkpoints (parallel sessions)
│   ├── dispatching-parallel-agents/ # Concurrent task workflows
│   ├── using-git-worktrees/         # Isolated worktree creation (project-local or global)
│   ├── using-superpowers/           # Intro skill; auto-injected at session start
│   ├── verification-before-completion/ # Verification before success claims
│   ├── requesting-code-review/      # Pre-review checklist and presentation
│   ├── receiving-code-review/       # Responding to feedback with rigor
│   └── finishing-a-development-branch/ # Merge/PR/keep decision workflow
├── agents/
│   └── code-reviewer.md       # Agent profile for code review (system prompt template)
├── commands/
│   ├── brainstorm.md          # /brainstorm slash command definition
│   ├── write-plan.md
│   └── execute-plan.md
├── docs/
│   ├── superpowers/specs/     # Design documents (YYYY-MM-DD-<topic>-design.md)
│   ├── superpowers/plans/     # Implementation plans (YYYY-MM-DD-<feature-name>.md)
│   ├── README.codex.md        # Codex-specific docs
│   ├── README.opencode.md     # OpenCode-specific docs
│   ├── testing.md             # Testing methodology reference
│   └── plans/                 # Historical execution plans
├── tests/
│   ├── brainstorm-server/     # Brainstorm visual companion server tests
│   ├── claude-code/           # Claude Code harness integration tests
│   ├── explicit-skill-requests/ # Skill invocation tests
│   ├── opencode/              # OpenCode tests
│   ├── skill-triggering/      # Auto-trigger behavior tests
│   └── subagent-driven-dev/   # Subagent execution tests
├── scripts/
│   └── bump-version.sh        # Version management script
├── package.json               # ES module config (version 5.0.7, no dependencies)
├── CLAUDE.md                  # Contributor guidelines for AI agents (enforces strict PR standards)
├── README.md                  # Installation (marketplace vs manual), basic workflow
├── CHANGELOG.md               # Recent fixes (ESM, Windows PID monitoring, hook reliability)
├── LICENSE                    # MIT
├── CODE_OF_CONDUCT.md
├── RELEASE-NOTES.md           # Comprehensive release history
├── gemini-extension.json      # Gemini CLI extension metadata
├── GEMINI.md                  # Gemini installation
└── AGENTS.md -> CLAUDE.md     # Symlink to contributor guidelines
```

## Key Components

### Mandatory Workflow Skills
1. **brainstorming** — Before any code: explore context, ask questions, propose approaches, present design, save spec, user review
2. **writing-plans** — Create detailed task breakdown (2-5 min chunks, exact paths, complete code, test/commit steps)
3. **subagent-driven-development** or **executing-plans** — Execute plan with subagents or human checkpoints
4. **test-driven-development** — RED-GREEN-REFACTOR cycle enforced during implementation
5. **systematic-debugging** — 4-phase root-cause before fixes (error analysis → reproduce → evidence gathering → fix)
6. **requesting-code-review** — Pre-review checklist and structured presentation
7. **finishing-a-development-branch** — Test verification, merge/PR decision, cleanup

### Supporting Skills
- **using-git-worktrees** — Isolated development branches with safety verification
- **verification-before-completion** — Confirm fixes before claiming success
- **receiving-code-review** — Handle feedback with rigor
- **dispatching-parallel-agents** — Concurrent subagent workflows
- **using-superpowers** — Intro skill (auto-injected at session start)
- **writing-skills** — Create new skills using TDD methodology (subagent pressure testing)

### Visual Companion
Brainstorming offers optional browser-based mockups, diagrams, comparisons during design questions (separate from terminal-based conceptual questions; per-question decision). Uses isolated Node.js server; available but not required.

### Brainstorm Server
Optional Node.js-based visual companion for brainstorming (rendered at localhost); manages lifecycle via parent PID monitoring (60-second grace + 30-minute idle timeout); Windows uses idle timeout only (PID namespace invisible).

## Integration Points

### How It Hooks Into Claude Code
1. **SessionStart hook** (hooks/hooks.json) triggers on startup/clear/compact commands
2. Hook runs `hooks/session-start` bash script (detects platform via env vars)
3. Script reads `skills/using-superpowers/SKILL.md` and injects as context
4. Script outputs JSON (platform-specific format: Claude Code vs Cursor vs Copilot CLI)
5. Agent sees `using-superpowers` in system context at session start
6. When agent detects brainstorming/debugging/planning conditions, it invokes Skill tool

### MCP / Plugin System
- **Zero dependencies** — skills are pure markdown, no external tools required
- **Plugin manifest** (.claude-plugin/plugin.json) registers with Claude Code marketplace
- **Multi-platform:** Official marketplace (Claude), custom marketplace (Claude Code), Cursor plugins, Codex (custom URL), OpenCode (custom URL), Gemini extensions
- **Marketplace integration:** GitHub marketplace fork (`obra/superpowers-marketplace`), auto-updates via `/plugin update superpowers`

### Custom Hooks (Cursor)
- **hooks-cursor.json:** Alternative hook format for Cursor IDE (snake_case `additional_context` vs nested structure)
- Detects Cursor via `CURSOR_PLUGIN_ROOT` environment variable
- Outputs snake_case JSON for Cursor compatibility

## Development Setup

### Installation Methods
1. **Claude Code Official Marketplace:** `/plugin install superpowers@claude-plugins-official`
2. **Claude Code Custom Marketplace:** Register marketplace first (`/plugin marketplace add obra/superpowers-marketplace`), then install from it
3. **Cursor:** Search "superpowers" in marketplace or `/add-plugin superpowers`
4. **Codex:** Fetch and follow `https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/.codex/INSTALL.md`
5. **OpenCode:** Fetch and follow `https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/.opencode/INSTALL.md`
6. **GitHub Copilot CLI:** `copilot plugin marketplace add obra/superpowers-marketplace` + `copilot plugin install superpowers@superpowers-marketplace`
7. **Gemini CLI:** `gemini extensions install https://github.com/obra/superpowers`

### Local Development (Contributing)
1. Fork repository
2. Use `superpowers:writing-skills` skill to develop/test new skills
3. Run adversarial pressure testing across multiple sessions
4. **PR Requirements (STRICT — 94% rejection rate):**
   - Complete PR template with real answers (no placeholders)
   - Search for existing PRs (open AND closed) — no duplicates
   - Verify real problem (not speculative)
   - Confirm change belongs in core (not domain-specific)
   - Show human partner complete diff before submitting
5. **Rejected Categories:**
   - Third-party dependencies (zero-dependency by design)
   - Compliance rewrites of skills without eval evidence
   - Project-specific or personal configuration
   - Bulk/spray-and-pray PRs
   - Speculative fixes (must solve real problem)
   - Domain-specific skills (publish as separate plugin)
   - Fork-specific changes
   - Fabricated content or hallucinated functionality

### Testing
- `tests/brainstorm-server/` — Visual companion server lifecycle
- `tests/claude-code/` — Claude Code harness integration
- `tests/skill-triggering/` — Auto-trigger conditions
- `tests/subagent-driven-dev/` — Subagent execution flows
- Skills are tested via subagent pressure scenarios (RED-GREEN-REFACTOR on documentation)

## Current State

### What's Working
- **Core workflow:** brainstorming → planning → subagent execution → TDD implementation → code review → finishing
- **Multi-platform support:** Claude Code, Cursor, Codex, OpenCode, Copilot CLI, Gemini
- **Skill execution:** 15 published skills covering full development cycle
- **TDD enforcement:** Test-first methodology with anti-pattern guides
- **Systematic debugging:** 4-phase root-cause process with defensive strategies
- **Subagent coordination:** Fresh subagent per task with two-stage review (spec compliance → code quality)
- **Session start injection:** Using-superpowers skill auto-injected at startup
- **Cross-platform hook system:** Detects platform and outputs correct JSON format
- **Git worktree isolation:** Smart directory selection, .gitignore safety verification

### Known Fixes (5.0.5+)
- Brainstorm server ESM fix (renamed server.js → server.cjs for Node 22+ module resolution)
- Windows PID monitoring disabled (skips BRAINSTORM_OWNER_PID on Windows; retains 30-min idle timeout)
- Hook reliability improved (stop-server.sh verifies process death, escalates to SIGKILL)
- Execution handoff restored (user choice between subagent-driven-development and executing-plans)

### Incomplete / Not Yet Implemented
- **Visual companion** scope monitoring (browser-based visual options still new, can be token-intensive)
- **Full Anthropic compliance** — superpowers has tested philosophy that differs from published guidance; compliance PRs rejected without eval evidence
- **Integrated skill marketplace** — skills managed as directories in repo; no built-in skill search/discovery UI
- **Automated skill testing** — pressure testing is manual subagent testing; no CI/CD test harness
- **Custom hooks for all platforms** — only Cursor has alternative hook config (hooks-cursor.json)

### Philosophy & Design Decisions
- **YAGNI ruthlessly** — remove unnecessary features at design time
- **Test-driven always** — write tests first; delete code written before tests
- **Systematic over ad-hoc** — process-first (brainstorm → plan → execute) rather than jumping into code
- **Evidence over claims** — verify before declaring success; systematic debugging before fixes
- **"Human partner" language** — deliberate terminology for agent accountability
- **Zero dependencies** — pure markdown + bash scripts; no external tools required
- **Behavior shaping content** — skills are not neutral documentation; carefully tuned to shape agent behavior (e.g., anti-pattern lists, Red Flag tables, rationalization prevention)
