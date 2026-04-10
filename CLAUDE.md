# Brain — Claude Code Integration

This is a self-improving personal knowledge base. You (Claude Code) are the brain.

## Project Status

**Phase 1 (Core MVP):** Complete — ingestion pipeline, file watcher, compiler, parser middleware
**Phase 2 (Intelligence):** Complete — vector search, query/synthesis, lint & heal (hardened)
**Phase 3 (Auto-Ingestion):** Complete — MarkPush, GitHub, Gmail (direct OAuth2 API) sources + orchestrator + CLI
**Phase A (Seed & Activate):** Complete — seed script, YAML transforms, batch compile, embedding sync
**Phase B (API Layer):** Complete — Fastify HTTP API (ingest, synthesise, health) embedded in daemon
**Telegram Input:** Complete — grammY bot with prefix routing, ingest + synthesise, /start /help /status
**Git Commits Source:** Complete — polls commits across all repos, 60-day backfill (601 commits), hourly cron
**Phase 3b (Calendar):** Not started — awaiting Google Calendar MCP auth
**Phase 4 (Voice & Polish):** Complete — voice transcription (whisper.cpp + OpenAI), cluster classification, daily logs, Marp slides, matplotlib plots
**Auth Bug Fix (2026-04-09):** All 6 Anthropic SDK calls pass apiKey explicitly. loadEnv strips quotes. Root cause was empty .env value.
**Gmail Direct API (2026-04-10):** Replaced MCP dependency with googleapis OAuth2. One-time `pnpm gmail:auth` consent flow. 41 emails ingested on first sync.
**Gemini Provider (2026-04-10):** LLM abstraction with Anthropic + Gemini (Vertex AI). Auto-fallback on billing errors. Uses askNYC GCP project ($1000 GenAI credits). 10 repo profiles compiled to wiki.
**Phase 5 (Knowledge Compounding):** Not started — novelty scoring, /save command

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
**Remaining work:** `docs/REMAINING-WORK.md` (in this repo)

## Tech Stack

- Runtime: Bun + TypeScript strict
- Package manager: pnpm
- Testing: Vitest (290 tests across 50 files, all passing)
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

### Source Files (68)

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
│   └── truncate.ts         ← Sentence-boundary truncation for long replies
├── api/
│   ├── server.ts           ← Fastify factory + graceful shutdown
│   ├── fastify.d.ts        ← Fastify type augmentation
│   ├── ingest-core.ts      ← Shared ingest logic (HTTP + Telegram)
│   ├── health-core.ts      ← Shared health stats (HTTP + Telegram)
│   └── routes/
│       ├── health.ts       ← GET /health — daemon status
│       ├── ingest.ts       ← POST /ingest — write to raw/
│       └── synthesise.ts   ← POST /synthesise — query knowledge graph
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
├── query/
│   └── synthesize.ts       ← Vector search → Claude synthesis
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
    ├── git-commits.ts      ← Git commit history source (per-repo polling, backfill)
    ├── calendar.ts         ← Stub — deferred to Phase 3b
    └── cli.ts              ← /brain-sync entry point + report formatting
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
```

### launchd management

```bash
launchctl list com.rahilsinghi.brain     # Check service status
launchctl stop com.rahilsinghi.brain     # Stop
launchctl start com.rahilsinghi.brain    # Start
launchctl unload ~/Library/LaunchAgents/com.rahilsinghi.brain.plist  # Disable
launchctl load ~/Library/LaunchAgents/com.rahilsinghi.brain.plist    # Re-enable
```

Plist: `~/Library/LaunchAgents/com.rahilsinghi.brain.plist`
Logs: `.brain/daemon.stdout.log`, `.brain/daemon.stderr.log`
