# Graphify Workflow — Complete Setup Guide

How to connect any repo to the brain knowledge base, keep it updated, and use it everywhere.

## The Big Picture

```
ANY REPO                        BRAIN DAEMON                      OBSIDIAN / EXPLORER
─────────                       ────────────                      ───────────────────
brain graphify .  ──POST──►  /graphify route                     
                              │                                   
                              ├─ Python AST extraction            
                              ├─ Community drop generation        
                              ├─ Write to raw/graphify/{repo}/    
                              │                                   
                              ├─ Watcher picks up drops           wiki/{category}/{slug}.md
                              ├─ Gemini compiles to wiki    ───►  (viewable in Obsidian)
                              ├─ nomic-embed → LanceDB            
                              │                                   
                              ├─ Sentinel triggers rebuild        
                              ├─ UMAP + cross-layer edges         
                              └─ Push to brain-explorer     ───►  brain.rahilsinghi.com
                                                                  ?focus=project:{repo}&depth=2
```

## Step 1: Graphify a New Repo

### From CLI (any terminal):
```bash
cd ~/Desktop/my-new-repo
brain graphify .
# or: pnpm --dir ~/Desktop/brain graphify ~/Desktop/my-new-repo
```

### From Claude Code (any session):
```
/graphify
# Claude detects repo root, calls brain_graphify MCP tool
```

### From any Claude session (via MCP):
```
"Map this repo into my brain"
# Claude calls brain_graphify with the current workspace path
```

**What happens:**
1. Instant response with deep-link URL (~100ms)
2. Python extracts AST graph (~10-30s, background)
3. Community drops written to `raw/graphify/{repo}/` (~1s)
4. Gemini compiles community articles (~5-10 min, async)
5. Sentinel triggers graph rebuild + push
6. Deep link shows the repo neighborhood

## Step 2: View in Obsidian

Open the brain vault in Obsidian: `~/Desktop/brain`

### Where graphified content lives:

| Stage | Location | Status |
|-------|----------|--------|
| Raw community drops | `raw/graphify/{repo}/` | Pending → processed |
| Compiled wiki articles | `wiki/projects/{slug}.md` | Semantic titles, interlinked |
| Architecture overview | `wiki/projects/{repo}-architecture.md` | Full repo report |

### Obsidian Graph View

The Obsidian graph filter currently excludes `raw/` (intentional — raw drops are noisy). Compiled articles appear in `wiki/` and show up automatically in the graph view with `[[wikilinks]]` connecting:

- Community articles within the same repo (via internal relationships)
- Communities across repos (via shared concepts like `[[WebSocket Architecture]]`)
- Personal knowledge articles (career, decisions, etc.)

### How to filter the graph for one repo:
In Obsidian's graph view search bar, type:
```
path:wiki tag:#portfolio
```
Or search for the repo name in the articles.

## Step 3: Set Up Automatic Updates

### Option A: Add to cron-based sync (recommended for core repos)

Edit `.brain/config.yaml`:
```yaml
graphify:
  repos:
    - ~/Desktop/karen
    - ~/Desktop/brain
    - ~/Desktop/portfolio
    - ~/Desktop/ouroboros
    - ~/Desktop/my-new-repo      # ← add your repo here
  cron_schedule: "0 * * * *"     # Every hour
  max_nodes_per_repo: 2000
  output_dir: "raw/graphify"
```

Restart daemon: `launchctl stop com.rahilsinghi.brain-daemon && launchctl start com.rahilsinghi.brain-daemon`

Now the repo gets re-analyzed every hour. The `--incremental` flag means only changed files are re-extracted.

### Option B: On-demand only

Don't add to config. Run `brain graphify .` whenever you want a fresh snapshot. Good for repos you work on occasionally.

### Option C: Git hook (auto-graphify on push)

Add to `.git/hooks/post-commit` in the target repo:
```bash
#!/bin/bash
curl -s -X POST http://127.0.0.1:3577/graphify \
  -H "Content-Type: application/json" \
  -d "{\"repo_path\": \"$(git rev-parse --show-toplevel)\"}" > /dev/null 2>&1 &
```

Every commit triggers a background re-analysis. Zero friction.

## Step 4: Claude Always Uses Brain Context

### Global CLAUDE.md (already configured)

Your `~/.claude/CLAUDE.md` already has:
```markdown
## Brain Knowledge Graph
When answering questions about my projects, experience, skills, companies, or decisions,
query brain_query first. It has 375+ wiki articles of personal context. Prefer this over
asking me to re-explain things that are already documented.
```

This means Claude will proactively call `brain_query` when you ask about your projects.

### Per-project CLAUDE.md (recommended addition)

In each repo's `CLAUDE.md`, add:
```markdown
## Brain Context
This repo is connected to the brain knowledge graph via graphify.
When you need architectural context, call brain_query with questions about this repo.
Use brain_graphify to refresh the graph if you've made significant structural changes.
```

### What Claude gets from brain vs reading files:

| Without Brain | With Brain |
|---------------|------------|
| Read 50+ files to understand architecture | `brain_query "asknyc architecture"` → instant summary |
| 200K+ tokens of raw code in context | ~2K tokens of synthesized wiki knowledge |
| No cross-project connections | Knows how asknyc relates to karen, portfolio, etc. |
| Forgets between sessions | Persistent knowledge, always available |

## Step 5: Token Tracking

### Built-in Claude Code commands:

| Command | What it shows |
|---------|--------------|
| `/cost` | Token usage (input/output), estimated cost, duration for current session |
| `/context` | Context window breakdown: system prompt, tools, messages, free space |
| `/stats` | Usage patterns (Max/Pro subscribers) |

### Third-party token trackers:

| Tool | What it does | Install |
|------|-------------|---------|
| **ccusage** | Reads Claude's JSONL session logs, shows usage by date/project, web dashboard | `npm i -g ccusage` |
| **Claude-Code-Usage-Monitor** | Real-time CLI chart of token consumption | GitHub: Maciek-roboblog |
| **cccost** | Hooks Node fetch to track all API requests accurately | GitHub: badlogic |

### Measuring brain savings:

There's no existing tool that measures "tokens saved by brain_query vs reading files." But you can estimate:

**Without brain:** A typical architecture question requires reading 10-30 files = ~50K-150K input tokens.
**With brain:** `brain_query` returns ~2K tokens of synthesized context.

**Savings per query: ~95-98% of input tokens.** Over a full session with 20 architecture questions, that's ~1-3M tokens saved.

To track this precisely, you could add a simple counter to the brain MCP server that logs each query with a rough "files it replaced" estimate. But `/cost` before and after a session gives you the actual numbers.

## One-Command Repo Setup: `brain-connect`

Instead of doing each step manually, use the setup script:

```bash
brain-connect ~/Desktop/maison
```

This single command:
1. Installs a post-commit git hook (auto-graphify on every commit)
2. Adds brain context section to the repo's CLAUDE.md
3. Triggers initial graphify extraction
4. Prints the deep link URL

Output:
```
✓ Brain connected to maison
  - Post-commit hook: installed
  - CLAUDE.md: brain context added
  - Graphify: extraction started
  - Deep link: https://brain.rahilsinghi.com/?focus=project:maison&depth=2
```

After ~10 min, wiki articles appear in Obsidian and the explorer deep link works.

### Day 1 at a new company workflow:

```bash
# 1. Clone their repo
git clone git@github.com:maison/app.git ~/Desktop/maison

# 2. Connect to brain (one command)
brain-connect ~/Desktop/maison

# 3. Open Claude Code in the repo
cd ~/Desktop/maison && claude

# 4. Claude automatically has brain context via CLAUDE.md
# Every commit auto-syncs to brain
# brain_query gives you full context about the codebase
```

## Three Visualization Layers

| Layer | Tool | What it shows | When to use |
|-------|------|--------------|-------------|
| **Per-repo graph** | `graphify-out/graph.html` | Interactive vis.js graph of one repo's AST | "Show me the code architecture" |
| **Wiki articles** | Obsidian | Compiled knowledge with `[[wikilinks]]` | "What does this module do?" |
| **Cross-project graph** | brain-explorer (web) | 3D graph with neighborhood filtering | "How does this relate to my other work?" |

### Per-repo interactive graph (graph.html)

After graphifying a repo, open the generated HTML:
```bash
open ~/Desktop/brain/raw/graphify/maison/graphify-out/graph.html
```

Features:
- Click any node to see its connections and source file
- Search for classes/functions by name
- Filter by community (click legend dots)
- Zoom/pan with mouse
- Edges styled by confidence (solid = extracted, dashed = inferred)

## Complete New Repo Checklist

```
□ Run: brain-connect ~/Desktop/my-new-repo    (does everything below automatically)
  ├── □ Post-commit hook installed
  ├── □ CLAUDE.md brain context added
  └── □ Initial graphify triggered
□ Wait ~10 min for compilation
□ Verify: open brain.rahilsinghi.com/?focus=project:my-new-repo&depth=2
□ Verify: check wiki/projects/ in Obsidian for new articles
□ Verify: open raw/graphify/my-new-repo/graphify-out/graph.html for interactive graph
```

## Architecture Reference

### Daemon endpoints:
- `POST /graphify` — trigger on-demand analysis (202, fire-and-forget)
- `POST /synthesise` — query knowledge graph (brain_query)
- `POST /ingest` — save knowledge (brain_ingest)
- `GET /health` — daemon status
- `GET /graph-export` — raw graph JSON
- `POST /graph-push` — manual graph rebuild + push

### Key paths:
- Daemon: `~/Desktop/brain/src/index.ts` (launchd service)
- Config: `~/Desktop/brain/.brain/config.yaml`
- Wiki: `~/Desktop/brain/wiki/`
- Raw drops: `~/Desktop/brain/raw/graphify/{repo}/`
- Graph cache: `~/Desktop/brain/wiki/.graph-cache.json`
- Explorer: `~/Desktop/brain-explorer/`
- MCP server: `~/.claude/mcp/brain/index.ts`
- CLI: `~/Desktop/brain/src/cli/graphify.ts`
- Logs: `/tmp/brain-daemon.stdout.log`
