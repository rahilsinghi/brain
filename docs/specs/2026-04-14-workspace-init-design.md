# Workspace Initializer — Design Spec

**Created:** 2026-04-14
**Author:** Rahil Singhi + Claude
**Status:** Approved, implementing tonight
**PRD:** `~/Desktop/career-datacenter/docs/PRD-BRAIN-WORKSPACE-INIT.md`

## Problem

Connecting a new repo to the brain ecosystem requires 5+ manual steps: brain-connect, edit timesheet config, write CLAUDE.md with employer context, wait for graphify, query brain for context. This should be one command.

## Solution

A daemon route `POST /workspace/init` that orchestrates the full setup, an MCP tool `brain_workspace_init` that calls it, and a `/init` skill for the user-facing command.

## Components

### 1. Daemon Route: `POST /workspace/init`

**Input:**
```json
{
  "repo_path": "/Users/rahil/Desktop/maison",
  "employer_id": "maison"
}
```

**Steps (sequential):**

1. **Validate** — confirm git repo exists at path, extract repo name + remote URL
2. **Timesheet integration** — `db.upsertRepoMapping(repo_path, employer_id, "workspace_init")`. This makes the 15-minute scanner pick up commits from this repo automatically.
3. **Post-commit hook** — Write `.git/hooks/post-commit` with graphify curl (same logic as `brain-connect.sh`). Append if hook exists, skip if brain hook already present.
4. **CLAUDE.md** — Generate employer-aware CLAUDE.md section. If file exists and already has "## Brain Context", skip. Otherwise append. Content includes:
   - Employer name and role
   - brain_query examples specific to the repo and employer
   - Timesheet commands with rate/cap
   - Graphify refresh instruction
5. **Workspace hub update** — Read `wiki/projects/{employer_id}-workspace.md`. If "Connected Repos" table exists, add a row for this repo. If hub doesn't exist, skip (user can create one via brain_ingest later).
6. **Trigger graphify** — POST to `/graphify` endpoint (fire-and-forget, already async)

**Output:**
```json
{
  "repo_name": "maison",
  "employer_id": "maison",
  "deep_link": "https://brain.rahilsinghi.com/?focus=project:maison&depth=2",
  "timesheet_connected": true,
  "hook_installed": true,
  "claude_md_updated": true,
  "hub_updated": true,
  "graphify_started": true
}
```

### 2. MCP Tool: `brain_workspace_init`

Added to `~/.claude/mcp/brain/index.ts`. Thin wrapper that:
1. Validates inputs
2. POSTs to `/workspace/init`
3. Returns formatted result

```typescript
brain_workspace_init({
  repo_path: "/Users/rahil/Desktop/maison",
  employer_id: "maison"
})
```

If `employer_id` is omitted, the tool attempts auto-detection: check the repo path and remote URL against known patterns in timesheet config. If ambiguous, return an error asking the user to specify.

### 3. Skill: `/init`

A skill file at `~/.claude/skills/brain-init.md` that:
1. Detects current repo root via `git rev-parse --show-toplevel`
2. Calls `brain_workspace_init` with the repo path
3. If employer_id needed, asks user
4. Reports what was set up
5. Suggests next steps (wait for graphify, check brain explorer)

### 4. CLAUDE.md Template

The generated brain context section:

```markdown
## Brain Context
This repo is connected to the brain knowledge graph.

**Employer:** {employer_name} | **Rate:** ${rate}/hr | **Cap:** {cap}h/week

### Commands
- `brain_query "{repo_name} architecture"` — codebase context from knowledge graph
- `brain_query "{employer_id} workspace"` — employer context, people, product vision
- `brain_graphify` — refresh code analysis after major structural changes
- `brain_timesheet` — check hours (auto-tracked from commits every 15min)
- Manual log: `brain timesheet log --employer {employer_id} --hours N --desc "..."`
```

## File Structure

```
src/api/routes/
└── workspace-init.ts     ← POST /workspace/init route

src/timesheet/
└── (existing db.ts)      ← upsertRepoMapping already exists

~/.claude/mcp/brain/
└── index.ts              ← add brain_workspace_init tool

~/.claude/skills/
└── brain-init.md         ← /init slash command skill
```

## What This Does NOT Do (Phase 2)

- SKILL.md generation from graphify communities (requires graphify data to exist first)
- Auto-employer detection from git remote URL patterns
- Skill refresh on re-graphify

These come in Phase 2 after the graphify pipeline has run on the repo.

## Implementation

4 changes:
1. New daemon route `src/api/routes/workspace-init.ts`
2. Register route in `src/api/server.ts`
3. Add `brain_workspace_init` tool to MCP server
4. Create `/init` skill file
