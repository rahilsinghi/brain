# Brain Graphify On-Demand — Design Spec

**Date:** 2026-04-13
**Status:** Approved
**Approach:** Thin Shell (Approach A) — CLI + MCP tool POST to daemon, all heavy lifting async

## Overview

A one-command system to map any code repository into the brain knowledge graph.
From any repo, invoke `brain graphify .` (CLI) or `brain_graphify` (MCP tool) to:

1. Extract AST-based code graph (tree-sitter, community detection)
2. Generate community-level wiki articles (architecture + per-cluster summaries)
3. Connect to the brain-explorer 3D visualization with contextual filtering
4. Return an instant deep-link URL for the N-degree neighborhood view

**Philosophy:** Fire-and-forget. The command returns in <1s. All extraction, compilation, embedding, and graph rebuilding happens asynchronously in the daemon.

## Architecture

```
User (any repo)
  ├─ CLI: brain graphify .          ─┐
  └─ MCP: brain_graphify(cwd)       ─┤
                                      ▼
                        POST /graphify (daemon:3577)
                              │
                              ▼ (responds immediately with deep-link)
                    Spawn Python subprocess
                              │
                              ▼ (~10-30s)
                    graphify_cli.py --repos <path>
                              │
                    ┌─────────┴──────────┐
                    ▼                    ▼
          {repo}-graph.json     {repo}-architecture.md
                    │
                    ▼ (parse communities)
          Write community raw drops
          raw/graphify/{repo}/community-{N}.md
          raw/graphify/{repo}/architecture-overview.md
          raw/graphify/{repo}/.sentinel
                    │
                    ▼ (chokidar watcher, automatic)
          Compiler (Gemini 2.5 Flash)
          → wiki/{category}/{slug}.md per community
                    │
                    ▼ (wiki watcher, automatic)
          Embedder (nomic-embed-text → LanceDB)
                    │
                    ▼ (sentinel completion check)
          Graph cache rebuild
          → UMAP + cross-layer edges + push to explorer
                    │
                    ▼
          brain.rahilsinghi.com/?focus=project:{repo}&depth=2
```

## Section 1: `/graphify` API Route

### Endpoint

`POST /graphify` on the daemon (Fastify, port 3577)

### Request

```typescript
interface GraphifyRequest {
  repo_path: string;    // Absolute path to the repo (clients must path.resolve before sending)
  force?: boolean;      // Skip incremental cache, full re-extract (default: false)
  depth?: number;       // Neighborhood depth for deep-link URL (default: 2)
}
```

### Response (immediate, <1s)

```typescript
interface GraphifyResponse {
  status: "accepted";
  repo_name: string;      // path.basename(repo_path), e.g. "asknyc"
  message: string;        // "Graph extraction started in background."
  deep_link: string;      // "https://brain.rahilsinghi.com/?focus=project:asknyc&depth=2"
}
```

No `estimated_articles` — the daemon cannot know the community count before extraction finishes. Fire-and-forget only.

### Validation

- `repo_path` must exist and be a directory
- `repo_path` must contain a `.git/` directory (must be a git repo)
- Return 400 with descriptive error if validation fails

### Background Work (after response)

1. **Spawn graphify Python CLI** as subprocess:
   ```
   python3 scripts/graphify/graphify_cli.py \
     --repos <repo_path> \
     --output-dir raw/graphify/<repo_name> \
     --incremental
   ```
   Add `--force` flag if `force: true` (skip file mtime caching).

2. **Wait for extraction** to complete (~10-30s depending on repo size)

3. **Parse `{repo}-graph.json`** — group nodes by `community` field

4. **Generate community raw drops** (see Section 3)

5. **Write sentinel file** (see Section 5)

6. **Exit** — watcher handles the rest

### File: `src/api/routes/graphify.ts`

New Fastify route, registered in `src/api/server.ts`.

## Section 2: CLI + MCP Tool (Thin Shells)

### CLI: `brain graphify <path>`

**Entry point:** `src/cli/graphify.ts`
**Package.json script:** `"graphify": "bun run src/cli/graphify.ts"`
**Global access:** Shell alias or symlink

**Behavior:**

1. Parse args: `<path>` (default: `.`), `--force` flag
2. `path.resolve(repo_path)` — always send absolute path to daemon
3. Validate: `git -C <path> rev-parse` check (is it a git repo?)
4. POST to `http://localhost:3577/graphify` with 2-second timeout
5. On success: print confirmation + deep-link
6. On connection refused: print actionable error with `brain start` hint
7. Optionally: `open <deep_link>` on macOS to launch browser

**Output:**
```
✓ Graph extraction started for asknyc
  View: https://brain.rahilsinghi.com/?focus=project:asknyc&depth=2
```

**Error:**
```
✖ Brain daemon is not responding on port 3577. Is it running?
  Try: launchctl start com.rahilsinghi.brain-daemon
```

### MCP Tool: `brain_graphify`

**File:** `~/.claude/mcp/brain/index.ts`

**Schema:**
```typescript
server.tool("brain_graphify", {
  description: "Map a code repository into the brain knowledge graph. Extracts AST structure, generates community-level wiki articles, and connects to the 3D graph visualization.",
  parameters: {
    repo_path: { type: "string", description: "Absolute path to the repository" },
    force: { type: "boolean", description: "Force full re-extraction (skip cache)", optional: true }
  }
});
```

**Handler:** POST to `http://localhost:3577/graphify`, return deep-link URL.

### Slash Command: `/graphify`

**File:** `~/.claude/commands/graphify.md`

Instructions for Claude:
- Run `git rev-parse --show-toplevel` to find the repo root
- Call `brain_graphify` with the absolute repo root path
- Print the deep-link URL
- Give a one-sentence summary of what architectural analysis to expect based on the repo

## Section 3: Community-Level Raw Drop Generation

### Pipeline inside the `/graphify` handler (after extraction):

**Step 1:** Read `{repo}-graph.json` (NetworkX node-link format)

**Step 2:** Group nodes by `community` field (typically 5-15 communities)

**Step 3:** For each community, generate a raw drop markdown file:

```markdown
---
status: pending
source_type: graphify-community
repo: asknyc
community_id: 3
ingested_at: 2026-04-13T10:30:00Z
parsed_at: 2026-04-13T10:30:00Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# asknyc — Community 3

## Files in this cluster
- src/api/routes/ask.ts (hub: 12 connections)
- src/agents/orchestrator.ts (hub: 8 connections)
- src/tools/nyc-open-data.ts (4 connections)

## Key symbols
- class AskOrchestrator (god node, 15 connections)
- function routeQuery
- function fetchOpenData

## Internal relationships
- orchestrator.ts calls ask.ts, nyc-open-data.ts
- ask.ts imports from orchestrator.ts

## External dependencies
- orchestrator.ts (Community 3) calls db_client.ts (Community 1)
- ask.ts (Community 3) imports auth_guard.ts (Community 5)
```

**Critical: Cross-community edges** — partition all edges into internal (both endpoints in same community) and external (endpoints in different communities). Include both in the raw drop. External edges create the `[[wikilinks]]` between community articles.

**Step 4:** Write architecture overview drop:
- Copy `{repo}-architecture.md` to `raw/graphify/{reponame}/architecture-overview.md`
- Inject `status: pending` + `source_type: graphify-architecture` + `repo: {reponame}` frontmatter

**Step 5:** Write sentinel file (see Section 5)

### Compiler Prompt Branch for `graphify-community`

In `src/compiler/compile.ts`, detect `source_type: graphify-community` in frontmatter and use a specialized prompt:

> "You are synthesizing a code community cluster from a software repository. You MUST:
> 1. Invent a highly descriptive, semantic title based on the files and key symbols (e.g., 'AskNYC Authentication Pipeline', NOT 'AskNYC Community 3')
> 2. Include `aliases: ['Community 3']` in the output YAML frontmatter so cross-links from other articles referencing 'Community 3' resolve correctly
> 3. Reference external dependencies using `[[wikilinks]]` to other community articles
> 4. Categorize as 'projects'"

This ensures Gemini produces semantically named, interlinked articles without any changes to the compilation pipeline itself — just a prompt conditional.

### Node metadata requirement

The Python `graphify_cli.py` must inject `repo: "{reponame}"` into every node's metadata in the exported JSON. This is required for the explorer's `?focus=project:{repo}` filtering to find seed nodes. Currently the `source_file` field contains file paths — the `repo` field must be explicitly added at the export step.

## Section 4: Brain Explorer — N-Degree Neighborhood View

### URL Parameters

```
?focus=project:asknyc        # Focus on all nodes for a project
?focus=wiki://asknyc-auth     # Focus on a specific node ID
&depth=2                      # BFS traversal depth (default: 2)
```

### Client-Side Filtering Logic

1. **Parse URL params** on page load (`new URLSearchParams`)
2. **Find seed nodes:**
   - `project:X` → filter nodes where `node.repo === X`
   - `wiki://X` or `code://X` → filter nodes where `node.id === X`
3. **BFS traversal** to depth N:
   - Build adjacency list from edges
   - Walk from seed nodes, collecting neighbors at each depth level
   - Track visited nodes to avoid cycles
4. **Filter edges** (critical — the edge-filtering trap):
   ```typescript
   const validNodeIds = new Set(filteredNodes.map(n => n.id));
   const filteredEdges = allEdges.filter(
     e => validNodeIds.has(e.source) && validNodeIds.has(e.target)
   );
   ```
   If both endpoints aren't in the filtered set, drop the edge. Otherwise `react-force-graph-3d` crashes on undefined node references.
5. **Camera auto-focus:**
   ```typescript
   graphRef.current.zoomToFit(400, 50, () => true);
   ```
   Use the `onEngineStop` event to trigger after force simulation settles.

### Rendering behavior

- **With `focus` param:** Only filtered nodes/edges rendered. Everything else hidden (not dimmed — full removal for 60fps performance with large graphs).
- **Without `focus` param:** Full graph, current behavior unchanged.
- **Unknown `focus` value:** Show all nodes, log warning to console.
- **`depth=0`:** Only seed nodes, no neighbors.

### Implementation scope

~100-150 lines of new code in `~/Desktop/brain-explorer`:
- URL param parsing utility
- BFS traversal function
- Node/edge filtering before render
- Camera auto-focus on filtered subgraph

No new backend routes. No dynamic UI controls. Just URL-driven filtering.

## Section 5: Graph Rebuild Orchestration

### The sentinel pattern

After writing all community raw drops, the `/graphify` handler writes:

```
raw/graphify/{reponame}/.sentinel
```

Contents:
```json
{
  "total_drops": 12,
  "repo": "asknyc",
  "created_at": "2026-04-13T10:30:00Z"
}
```

### Completion detection

After each successful compilation or DLQ quarantine of a file from `raw/graphify/{reponame}/`:

1. Check if a `.sentinel` file exists for that repo
2. Count processed drops: `successful_compiles + dlq_quarantines`
3. If `processed_count >= sentinel.total_drops` → trigger graph rebuild

```typescript
const processedCount = successfulCompiles + dlqQuarantines;
if (processedCount >= sentinel.total_drops) {
  // All community articles processed — rebuild graph
  await rebuildGraphCache(vaultRoot, cachePath, embeddings, seed, graphifyDir);
  await pushGraphToRepo(cache, explorerRepoPath);
  console.log(`[graphify] Graph rebuilt for ${sentinel.repo}`);
}
```

**DLQ-aware:** If 1 of 12 community articles fails and gets quarantined, the remaining 11 still trigger the rebuild. Better to show a graph missing one node than to never rebuild.

### Timing

| Step | Duration | Cumulative |
|------|----------|------------|
| CLI/MCP → daemon POST | <1s | <1s |
| Python extraction | 10-30s | ~30s |
| Community drops written | <1s | ~31s |
| Compiler (5-15 articles, serial) | 5-10 min | ~6-11 min |
| Embedding sync | 15-30s | ~6-11 min |
| Graph cache rebuild + push | 10-20s | ~6-12 min |
| Vercel redeploy | ~30s | ~7-13 min |

**Total: ~7-13 minutes** from command to full visualization.

### Status endpoint (optional, Phase 2)

`GET /graphify/{repo}` — returns current progress:

```json
{
  "repo": "asknyc",
  "extraction": "completed",
  "articles_compiled": 8,
  "articles_total": 12,
  "graph_rebuilt": false
}
```

Low priority. The fire-and-forget model means you just click the deep link after a few minutes.

## Files to Create/Modify

### New files:
- `src/api/routes/graphify.ts` — POST /graphify route + background orchestration
- `src/cli/graphify.ts` — CLI entry point
- `~/.claude/mcp/brain/index.ts` — add `brain_graphify` tool
- `~/.claude/commands/graphify.md` — slash command

### Modified files:
- `src/api/server.ts` — register graphify route
- `src/compiler/compile.ts` — add prompt branch for `source_type: graphify-community`
- `src/compiler/queue.ts` — sentinel completion check after each compile
- `graphify_cli.py` (Python) — add `repo` field to node metadata in export
- `brain-explorer` (React) — URL param parsing, BFS filter, camera auto-focus

### Config:
- No config changes needed — `config.yaml` graphify section already exists
- The on-demand `/graphify` route works independently of the cron-based sync

## Non-Goals

- No WebSocket/SSE push notifications
- No progress bar in CLI
- No blocking "wait for completion" mode
- No automatic browser refresh
- No dynamic filtering UI in explorer (just URL params)
- No output files dropped into the target repo (all output stays in brain vault)
- No per-file wiki articles (community-level only)
