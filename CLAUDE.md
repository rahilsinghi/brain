# Brain — Claude Code Integration

This is a self-improving personal knowledge base. You (Claude Code) are the brain.

## Project Status

**Phase 1 (Core MVP):** Complete — ingestion pipeline, file watcher, compiler, parser middleware
**Phase 2 (Intelligence):** Complete — vector search, query/synthesis, lint & heal (hardened)
**Phase 3 (Auto-Ingestion):** Complete — MarkPush, GitHub, Gmail (direct OAuth2 API) sources + orchestrator + CLI
**Phase A (Seed & Activate):** Complete — seed script, YAML transforms, batch compile, embedding sync
**Phase B (API Layer):** Complete — Fastify HTTP API (ingest, synthesise, health) embedded in daemon
**Telegram Input:** Complete — grammY bot with prefix routing, ingest + synthesise, /start /help /status
**Git Commits Source:** Disabled (2026-04-13) — generated 2,581 low-value per-commit articles (96% of project wiki). Replaced by graphify community-level analysis
**Phase 3b (Calendar):** Not started — awaiting Google Calendar MCP auth
**Phase 4 (Voice & Polish):** Complete — voice transcription (whisper.cpp + OpenAI), cluster classification, daily logs, Marp slides, matplotlib plots
**Auth Bug Fix (2026-04-09):** All 6 Anthropic SDK calls pass apiKey explicitly. loadEnv strips quotes. Root cause was empty .env value.
**Gmail Direct API (2026-04-10):** Replaced MCP dependency with googleapis OAuth2. One-time `pnpm gmail:auth` consent flow. 41 emails ingested on first sync.
**Gemini Provider (2026-04-10):** LLM abstraction with Anthropic + Gemini (Vertex AI). Auto-fallback on billing errors. Uses askNYC GCP project ($1000 GenAI credits). 10 repo profiles compiled to wiki.
**Phase 5 (Knowledge Compounding):** Complete — novelty scoring, /save endpoint, synthesis cache, anti-ouroboros
**Brain MCP Server:** Complete — `~/.claude/mcp/brain/index.ts`, brain_query + brain_ingest tools, global `.mcp.json`
**Telegram Formatting Fix:** Complete — wiki links stripped to bold text before sending
**Graphify Phase 1 (Fork + CLI):** Complete — forked to github.com/rahilsinghi/graphify, CLI entry point, persistent venv at scripts/graphify/.venv
**Graphify Phase 2 (Brain Source):** Complete — `src/sources/graphify.ts` SyncSource, GraphifyConfig type, hourly cron wiring, 140 drops from brain repo
**Graphify Phase 3 (Graph Merge):** Complete — URI node IDs (`wiki://`, `code://`), `loadGraphifyGraphs`, cross-layer edges (20-cap by centrality), god-node detection (mean+2σ, z=-200), unified two-layer GraphCache merge in `rebuildGraphCache`
**Graphify Phase 4 (Embeddings + Query):** Complete — WikiChunk.confidential field, SynthesisMode ("local"/"remote"), confidentiality filter in synthesize(), Telegram passes "remote", HTTP API accepts mode param, MCP passes "local", file-summary pipeline validated
**Graphify Phase 5 (Explorer Fusion):** Complete — two-layer visualization with real data. Daemon sets `layer: "wiki"/"code"` on all nodes. Karen repo graphified (840 nodes, 66 communities). 820 cross-layer edges. 1921 total nodes (696 wiki + 1225 code). Bloom tuned for large graphs. Node click/focus interaction fixed (bounding sphere, nodeId passthrough, onPointerMissed race guard, deep-link one-shot). Sliding glass LayerToggle.
**Post-Phase 5 Stabilization (2026-04-12):** Fixed tilde expansion bug in graph-push route (wrote to literal `~/` dir). Fixed cross-layer edge matching (repo name prefix instead of exact filename). Fixed InstancedMesh raycasting (computeBoundingSphere after matrix update). Fixed useDrag nodeId mapping (pass resolved ID from InstancedNodes, bypass stale reverse map). Fixed onPointerMissed/clearFocus race (timestamp guard). Fixed deep-link readFocusParam re-focus loop (run once on mount).
**Daemon Resilience (2026-04-13):** Telegram bot isolated into subprocess (`src/telegram/worker.ts`) — Bun native fetch errors from grammY polling are uncatchable, so subprocess crash doesn't kill main daemon. Auto-restart with exponential backoff. Fixed launchd plist: `WorkingDirectory=/tmp` (macOS blocks launchd from `~/Desktop/` without FDA), absolute script path, logs to `/tmp/`. Bun binary requires Full Disk Access in System Settings. GCP billing re-linked askNYC project to correct billing account ($1000 GenAI credits). New Gemini API key (askNYC service account) added as `GEMINI_API_KEY_2`. Anthropic API key exhausted (expected — Gemini is primary via Vertex AI).
**Graphify On-Demand (2026-04-13):** `POST /graphify` API route, `brain graphify .` CLI, `brain_graphify` MCP tool, `/graphify` slash command. One command maps any repo: AST extraction → community-level raw drops → Gemini compilation → wiki articles → LanceDB embeddings → sentinel-triggered graph rebuild → push to brain-explorer. N-degree neighborhood filter in explorer (`?focus=project:X&depth=N`). Removed 2,581 commit-noise articles. Career-datacenter graphified (24 communities). Workflow guide: `docs/GRAPHIFY-WORKFLOW.md`. `brain-connect` setup script for new repos. 3,876 graph nodes.
**Voice Chunking (2026-04-14):** Long audio (>2min) split into 2-minute chunks with 5s overlap before whisper transcription. Fixes hallucination loops on recordings >2min. Caps at 20min. Deduplicates overlap text. Telegram bot now handles `message:audio` (.m4a files) in addition to `message:voice` (.ogg). 18-min Stumptown/Maison meeting fully transcribed (2,861 words, zero hallucination repeats vs 156 in single-pass).
**Timesheet Phase 2 (2026-04-15):** Telegram daily review (`/eod`, `/ts`, `/ts today`, `/ts week`), reply-to-message correction parsing (7 regex patterns), cap alerts (75%/90%/100% with dedup), `+Xh` quick-entry, 9 AM daily report cron. Files: `daily-report.ts`, `telegram-review.ts`, `alerts.ts`. 33 new tests.
**Timesheet Phase 3+4 (2026-04-15):** Weekly finalization (`/finalize`, Sunday cron), invoice generation (`/invoice employer month` → markdown + CSV to `output/invoices/`), wiki sync (`wiki/timesheet/{employer}/{YYYY-WNN}.md`). API routes: `GET /timesheet/status/month`, `GET /timesheet/status/entries`, `POST /timesheet/finalize`, `POST /timesheet/invoice`. MCP `brain_timesheet` tool enhanced with `month`/`entries` queries and `date` parameter. Files: `finalize.ts`, `invoice.ts`, `wiki-sync.ts`. 19 new tests.
**Timesheet NL (2026-04-17):** Natural-language entry across 4 entry points: `/ts 2h maison coding 3-5pm yesterday` (Telegram text), voice notes prefixed with "timesheet"/"ts"/"log time" (Telegram voice, bypasses cluster classifier), `brain_timesheet_add` MCP tool, `pnpm ts:add "<text>"` CLI. Local Qwen3 32B parses via Ollama's JSON mode → ReviewCommand[] → existing `applyReviewCommands`. All-or-nothing validation (unknown employer/bad category fails the whole batch). `nl_parse_log` table logs every call (input, LLM response, entries created, error, duration) for audit + replay. Files: `nl-parser.ts`, `nl-handler.ts`, `api/routes/timesheet-nl.ts`, `cli/timesheet-add.ts`. 33 new tests, 648/648 suite green.
**/eod Metadata Fix (2026-04-17):** `/eod` command used to return the daily report via synchronous command-response channel, which carries no `entry_ids`/`report_date` metadata — so drop replies after a manual `/eod` were classified as `ingest` and saved as wiki articles instead of dropping entries. Fix: route `/eod` through `deps.client.pushOutbound` (same path as 8 PM cron) with `category: "daily_report"`, `entry_ids`, `report_date`. Made `handleTimesheetCommand` async. Falls back to sync response on push failure. Bot now replies `📋 EOD report queued` while the full report arrives via outbound queue with metadata intact.
**Telegram Relay Bot (2026-04-16):** Always-on relay deployed to Fly.io (`brain-relay.fly.dev`). Receives all messages 24/7 via webhook, downloads voice/audio files before URLs expire, queues in SQLite on persistent volume. Daemon polls relay REST API every 15s, processes inbound items (ingest, query, voice, timesheet commands), posts responses back. Relay delivers responses + scheduled messages (daily reports, cap alerts). 165 new tests. Spec: `docs/specs/2026-04-15-telegram-relay-design.md`. Relay code: `relay/` directory.

**Spec:** `~/docs/superpowers/specs/2026-04-03-claude-native-brain-design.md`
**Phase 3 spec:** `~/docs/superpowers/specs/2026-04-06-brain-phase3-auto-ingestion-design.md`
**Phase 1 plan:** `~/docs/superpowers/plans/2026-04-03-brain-phase1-core.md`
**Phase 2 plan:** `~/docs/superpowers/plans/2026-04-03-brain-phase2-intelligence.md`
**Phase 3 plan:** `~/docs/superpowers/plans/2026-04-06-brain-phase3-auto-ingestion.md`
**Seed & Activate spec:** `~/docs/superpowers/specs/2026-04-07-brain-seed-and-activate-design.md`
**Seed & Activate plan:** `~/docs/superpowers/plans/2026-04-07-brain-seed-and-activate.md`
**API Layer spec:** `~/docs/superpowers/specs/2026-04-08-brain-api-layer-design.md`
**API Layer plan:** `~/docs/superpowers/plans/2026-04-08-brain-api-layer.md`
**Telegram Input spec:** `~/docs/superpowers/specs/2026-04-08-brain-telegram-input-design.md`
**Telegram Input plan:** `~/docs/superpowers/plans/2026-04-08-brain-telegram-input.md`
**Phase 4 spec:** `~/docs/superpowers/specs/2026-04-08-brain-phase4-voice-and-polish-design.md`
**Phase 4 plan:** `~/docs/superpowers/plans/2026-04-08-brain-phase4-voice-and-polish.md`
**Graphify On-Demand spec:** `docs/specs/2026-04-13-brain-graphify-on-demand-design.md`
**Graphify On-Demand plan:** `docs/plans/2026-04-13-brain-graphify-on-demand.md`
**Graphify Workflow guide:** `docs/GRAPHIFY-WORKFLOW.md`
**Remaining work:** `docs/REMAINING-WORK.md` (in this repo)

## Tech Stack

- Runtime: Bun + TypeScript strict
- Package manager: pnpm
- Testing: Vitest (387 tests across 65 files, all passing)
- Vector DB: LanceDB (local, .lancedb/)
- Embeddings: @xenova/transformers (nomic-embed-text, local)
- LLM: @anthropic-ai/sdk (Claude) + @google-cloud/vertexai (Gemini via Vertex AI, $1000 GCP credits)
- File watching: chokidar
- Scheduling: node-cron
- Markdown AST: unified + remark-parse + remark-frontmatter + remark-stringify
- Vault viewer: Obsidian (free tier)

## Architecture

```
API/MarkPush/GitHub/Gmail → orchestrator/API → raw/ drops (with frontmatter)
                                           ↓
raw/ drops → chokidar watcher → parser middleware → compile queue → wiki/ articles
                                                                       ↓
wiki/ changes → chokidar watcher → chunker → embedder → LanceDB vectors
                                                                       ↓
user query → embed question → vector search → context assembly → Claude synthesis
                                                                       ↓
nightly cron → git snapshot → lint scanner → healer → connector → daily log
```

**Brain Explorer Spec:** `docs/specs/2026-04-10-brain-explorer-design.md`
**Brain Explorer Daemon Plan (complete):** `docs/plans/2026-04-10-brain-explorer-daemon.md`
**Brain Explorer Frontend Plan (v1 complete):** `docs/plans/2026-04-10-brain-explorer-frontend.md`
**Brain Explorer v1 deployed:** brain.rahilsinghi.com — visual revamp needed (v1.1)
**Brain Explorer Repo:** `~/Desktop/brain-explorer` (github.com/rahilsinghi/brain-explorer)

### Source Files (86)

```
src/
├── config.ts               ← YAML config loader + .env
├── frontmatter.ts          ← Read/write/update/inject YAML frontmatter
├── types.ts                ← All shared types
├── quarantine.ts           ← Dead letter queue (3x fail → quarantine/)
├── snapshot.ts             ← Pre-heal git snapshots
├── watcher.ts              ← chokidar watchers (raw/ + wiki/)
├── index.ts                ← Daemon entry point (API + watchers + cron)
├── llm/
│   └── provider.ts         ← LLM abstraction (Anthropic + Gemini Vertex AI, project rotation, auto-fallback)
├── telegram/
│   ├── bot.ts              ← Telegram bot factory + message handlers
│   ├── truncate.ts         ← Sentence-boundary truncation for long replies
│   └── format.ts           ← Strip wiki link syntax for Telegram output
├── api/
│   ├── server.ts           ← Fastify factory + graceful shutdown
│   ├── fastify.d.ts        ← Fastify type augmentation
│   ├── ingest-core.ts      ← Shared ingest logic (HTTP + Telegram)
│   ├── health-core.ts      ← Shared health stats (HTTP + Telegram)
│   ├── synthesis-cache.ts  ← In-memory TTL cache for synthesis results
│   └── routes/
│       ├── health.ts       ← GET /health — daemon status
│       ├── ingest.ts       ← POST /ingest — write to raw/
│       ├── synthesise.ts   ← POST /synthesise — query knowledge graph
│       ├── save.ts         ← POST /save — persist synthesis to wiki (novelty gated)
│       ├── graph-export.ts ← GET /graph-export — serve cached graph JSON
│       ├── graph-push.ts   ← POST /graph-push — rebuild cache + push to explorer repo
│       └── graphify.ts     ← POST /graphify — on-demand repo analysis + community drops
├── compiler/
│   ├── compile.ts          ← Claude API single-pass compiler
│   ├── queue.ts            ← Compile queue (pending → processing → processed)
│   ├── token-guard.ts      ← Word count → strategy routing
│   └── index-updater.ts    ← wiki/index.md regeneration
├── parser/
│   ├── router.ts           ← Route by file extension
│   ├── passthrough.ts      ← .md/.txt direct to pending
│   ├── html-parser.ts      ← HTML → markdown via turndown
│   └── placeholder-parser.ts ← Phase 2+ stubs (pdf, audio, image)
├── embedder/
│   ├── chunker.ts          ← Markdown AST splitting at ## headings
│   ├── embedder.ts         ← nomic-embed-text via transformers.js
│   ├── vector-store.ts     ← LanceDB wrapper (upsert, delete, search)
│   └── sync.ts             ← Hash-based embedding sync pipeline
├── graph/
│   ├── scan-wiki.ts        ← Walk wiki/, extract frontmatter + [[links]]
│   ├── embeddings.ts       ← Average LanceDB chunk vectors per article
│   ├── export.ts           ← UMAP 768→3 with deterministic seed + god-node detection
│   ├��─ cache.ts            ← Orchestrator: scan → embed → UMAP → wiki:// prefix → merge code layer → write cache
│   ├── load-graphify.ts    ← Parse NetworkX JSON into Brain nodes/links with code:// prefix
│   ├── community-drops.ts  ← Parse graph JSON → community-level raw drops + sentinel
│   ├── cross-layer.ts      ← Wiki↔code cross-layer edges (20-cap by centrality)
│   └── push.ts             ← Write graph.json to explorer repo + git push
├── query/
│   ├── synthesize.ts       ← Vector search → Claude synthesis + novelty scoring
│   └── novelty.ts          ← Cosine similarity + novelty score computation
├── lint/
│   ├── scanner.ts          ← Broken links, orphans, format issues
│   ├── healer.ts           ← Conflict rules, contradiction flags, proposals
│   ├── connector.ts        ← Cross-references, daily summaries
│   └── runner.ts           ← 3-phase lint→heal→connect orchestrator
├── voice/
│   ├── transcribe.ts      ← TranscriptionProvider (local whisper.cpp + OpenAI)
│   ├── classify.ts        ← Hybrid prefix/AI cluster classification
│   └── voice-parser.ts    ← parseVoice — transcription + classify + markdown drop
├── daily/
│   └── log.ts             ← appendDailyEntry + writeDailySummary
├── output/
│   ├── slides.ts          ← Marp slide generation (wiki context → PDF)
│   └── plots.ts           ← matplotlib plot generation (wiki context → PNG)
└── sources/
    ├── types.ts            ← SyncSource, SyncState, RawDrop interfaces
    ├── slug.ts             ← slugify + uniqueSlug (hash suffix)
    ├── state.ts            ← JSON sync state store (atomic writes, ID pruning)
    ├── orchestrator.ts     ← Dedup, write to raw/, manage sync-state
    ├── markpush.ts         ← MarkPush MCP source (DI for push_history)
    ├── github.ts           ← GitHub source (gh CLI, event parsing, star threshold)
    ├── gmail.ts            ← Gmail source (DI + direct googleapis API, turndown)
    ├── gmail-auth.ts       ← OAuth2 client factory (credentials + refresh token)
    ├── git-commits.ts      ← Git commit history source (DISABLED — replaced by graphify)
    ├── graphify.ts         ← Graphify AST analysis source (shells out to Python CLI)
    ├── calendar.ts         ← Stub — deferred to Phase 3b
    └── cli.ts              ← /brain-sync entry point + report formatting
├── cli/
│   └── graphify.ts         ← brain graphify CLI — thin shell to daemon /graphify
├── seed/
│   ├── index.ts            ← CLI entry point (pnpm seed)
│   ├── runner.ts           ← Step orchestrator (--force, --only routing)
│   ├── log.ts              ← Structured per-step logging
│   ├── yaml-loader.ts      ← YAML/CSV loader with Zod validation
│   ├── schemas.ts          ← Zod schemas for career-datacenter files
│   ├── wiki-helpers.ts     ← Frontmatter helpers, link resolution
│   ├── unstructured.ts     ← Copy docs to raw/ for batch compile
│   └── transforms/
│       ├── profile.ts      ← profile + education + activities → wiki
│       ├── experience.ts   ← experience + metrics → wiki (cross-ref)
│       ├── projects.ts     ← projects + metrics → wiki
│       ├── skills.ts       ← skills → skills-inventory.md
│       ├── companies.ts    ← hospitality companies → wiki
│       ├── positioning.ts  ← positioning + role families → wiki
│       ├── stories.ts      ← STAR stories → wiki
│       ├── answers.ts      ← easy apply answers → wiki
│       └── tracking.ts     ← CSV tracking → wiki tables
```

## Vault Structure

- `raw/` — Unprocessed drops. Never read from here for Q&A.
- `wiki/` — Compiled knowledge. This is your primary knowledge source.
- `output/` — Generated slides, plots, reports.
- `proposals/` — AI suggestions for human-owned files. Review these.
- `daily/` — Daily knowledge logs.
- `templates/` — Visual themes (brutalist: black/cyan/green). Use for all output.
- `.brain/` — System config, lint reports, heal logs. Don't modify.
- `.lancedb/` — Vector store. Don't modify directly.

## Capturing Knowledge

When the user says "remember X" or invokes `/brain`:

**Quick capture** — write to `raw/conversations/{slug}.md` with frontmatter:
```yaml
---
status: pending
source_type: conversation
ingested_at: <ISO timestamp>
parsed_at: <ISO timestamp>
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---
```

**Direct wiki** — for well-structured knowledge, write directly to the appropriate `wiki/` subfolder with wiki frontmatter.

## Querying Knowledge

When the user asks "what do I know about X?" or similar:
1. Use `src/query/synthesize.ts` — embed the question, vector search LanceDB for top-K chunks
2. Assemble context from matching wiki chunks
3. Synthesize an answer via Claude with `[[wiki links]]` to sources
4. Do NOT auto-save the answer. Only save if user explicitly says `/save`.

**Anti-ouroboros:** Synthetic answers never auto-saved. Require explicit `/save` or novelty score > 0.85.

## Output Generation

- Slides: Use Marp format with `templates/brutalist-marp.css` theme
- Diagrams: Use Mermaid with dark/cyan/green theme from `templates/mermaid-theme.json`
- All outputs go to `output/` subdirectories

## Rules

- Never modify files in `.brain/` — that's system config
- Never read or index `.brain/.env` — contains API keys
- **Contradictions:** NEVER auto-resolve. Flag with `> [!WARNING]` callout + write proposal to `proposals/`
- **Human sovereignty:** Files with human edits <24h are hands-off. Use `proposals/` for suggestions.
- **Conflict resolution tiers:**
  1. AI files, no human edits → direct edit allowed
  2. AI files, human edits >24h → append-only (AI Synthesis section)
  3. Human files or human edits <24h → hands off, proposals/ only
- When in doubt, write to `proposals/` instead of editing human files
- Cost controls: max 20 heal operations, max 5 web searches per nightly run

## Telegram Bot

Set `TELEGRAM_BOT_TOKEN` in `.brain/.env` and add `allowed_user_ids` to `.brain/config.yaml`:

```yaml
telegram:
  allowed_user_ids: [123456789]
```

Bot is opt-in — disabled without both token and allowed users.
Send text to ingest, voice notes to transcribe, prefix with `?` to query.
Commands: /start, /help, /status, /slides <topic>, /plot <description>.

## Running

The daemon runs as a macOS launchd service (`com.rahilsinghi.brain`). It auto-starts on login and restarts on crash.

```bash
pnpm test              # Run all tests
pnpm status            # Check if daemon is running (launchd or manual)
pnpm restart           # Restart daemon via launchd
pnpm stop              # Stop daemon
pnpm start             # Start daemon manually (prefer launchd)
pnpm logs              # Tail stdout log
pnpm logs:err          # Tail stderr log
pnpm seed              # Full seed from career-datacenter + GitHub + embed
pnpm seed --force      # Re-compile all unstructured docs
pnpm seed --only tracking  # Refresh tracking articles from live CSVs
pnpm gmail:auth        # One-time OAuth consent flow for Gmail API
pnpm graphify <path>    # Map any repo into brain (or: brain graphify .)
pnpm backfill-links     # One-time: rewrite broken [[Title]] wikilinks
pnpm backfill-links:dry # Dry run: show what would change
```

### launchd management

```bash
launchctl list com.rahilsinghi.brain-daemon     # Check service status
launchctl stop com.rahilsinghi.brain-daemon     # Stop
launchctl start com.rahilsinghi.brain-daemon    # Start
launchctl unload ~/Library/LaunchAgents/com.rahilsinghi.brain-daemon.plist  # Disable
launchctl load ~/Library/LaunchAgents/com.rahilsinghi.brain-daemon.plist    # Re-enable
launchctl kickstart -kp gui/$(id -u)/com.rahilsinghi.brain-daemon  # Force restart
```

Plist: `~/Library/LaunchAgents/com.rahilsinghi.brain-daemon.plist`
Logs: `/tmp/brain-daemon.stdout.log`, `/tmp/brain-daemon.stderr.log`

**IMPORTANT: launchd + ~/Desktop/ FDA issue**
- macOS blocks launchd-spawned processes from accessing `~/Desktop/` without Full Disk Access
- The plist uses `WorkingDirectory=/tmp` and absolute script path to avoid this
- Bun binary (`~/.bun/bin/bun`) MUST be in System Settings > Privacy > Full Disk Access
- If daemon won't start, check `cat /tmp/brain-daemon.stderr.log` for "Operation not permitted"
- Telegram bot runs as isolated subprocess — its crashes won't kill the main daemon
