# Brain — Remaining Work

> Pick up from here in the next session. All context needed is in this file + CLAUDE.md + the spec.

**Repo:** `github.com/rahilsinghi/brain` (private)
**Spec:** `~/docs/superpowers/specs/2026-04-03-claude-native-brain-design.md`

---

## Completed

### Phase 1: Core MVP (14 commits)
- Vault scaffold, .gitignore, .brain/.env secrets management
- Shared types (frontmatter schemas, config, compile strategy)
- Config loader (YAML + .env)
- Frontmatter utilities (read/write/update/inject)
- Token guard (word count → compile strategy routing)
- Dead letter queue (3 retries → quarantine/)
- Parser middleware (router, passthrough, HTML, placeholder stubs)
- Single-pass compiler (Claude API, structured JSON output)
- Compile queue (pending → processing → processed, with quarantine)
- Pre-heal git snapshots
- File watcher (chokidar on raw/, debounced compile)
- Daemon entry point (PID, graceful shutdown)
- Brutalist visual templates (Marp CSS, matplotlib rcParams, Mermaid theme)
- CLAUDE.md for vault integration

### Phase 2: Intelligence (15 commits)
- Phase 2 types (WikiChunk, LintIssue, HealAction, HealResult, LintHealStats)
- Markdown-aware AST chunker (split at ## headings, breadcrumbs, content hashing)
- LanceDB vector store (upsert with dedup, delete by filePath, vector search)
- Local embedder (nomic-embed-text via @xenova/transformers, lazy init)
- Hash-based embedding sync (shouldReembed, syncFile, syncAll)
- Query & synthesis (vector search → context assembly → Claude API)
- Lint scanner (broken links, orphan articles, format issues)
- Healer (3-tier conflict resolution, contradiction flags, proposals)
- Connector (cross-reference discovery, daily summary writer)
- Lint/heal runner (3-phase orchestrator, lint report, heal log, cost controls)
- Wiki watcher (re-embed on change)
- Nightly cron (git snapshot → lint → heal → connect)

**Test coverage:** 53 tests across 14 files, all passing.

---

## Phase 2 Hardening — Complete (2026-04-06)

- Partial embed failure: try/catch in sync.ts, cleanup on failure
- discoverConnections wired into runner, populates connectionsDiscovered
- Healer tests: writeProposal + appendAISynthesis coverage added
- Tests: 53 → 60

### Knowledge compounding (/save + novelty threshold) — Deferred to Phase 5
- **Spec ref:** §6 Query & Synthesis, §12 Claude Code Integration
- **Status:** `query.novelty_threshold` is in config (0.85) but unused. `synthesize.ts` always returns results with no score filtering.
- **What's needed:** After synthesis, compare answer embedding against existing wiki chunks. If novelty score > 0.85 AND user says `/save`, write the synthesis to wiki. Otherwise, display only.
- **Complexity:** Medium — needs cosine similarity helper + frontmatter write for new wiki article

---

## Phase 3: Auto-Ingestion — Complete (2026-04-06)

**Spec:** `~/docs/superpowers/specs/2026-04-06-brain-phase3-auto-ingestion-design.md`
**Plan:** `~/docs/superpowers/plans/2026-04-06-brain-phase3-auto-ingestion.md`

10 commits, 8 new source files, 48 new tests (108 total). Three sources implemented:
- **MarkPush:** cursor-based polling, DI for MCP push_history, unique slugs
- **GitHub:** gh CLI, 5 event types (Watch/Fork/Push/PR/Issue), star threshold (100), auth guard
- **Gmail:** label:Brain OR is:starred, text/plain + HTML via turndown, signature stripping, processed_ids dedup
- **Orchestrator:** sequential source polling, dedup, crash-safe state saves, error isolation
- **CLI:** `/brain-sync` with quiet mode, `main()` accepts sources parameter
- **Daemon:** GitHub on hourly cron via `config.cron.mcp_sources`

### Git Commits Source — Complete (2026-04-08)
- **Source:** `src/sources/git-commits.ts` — polls `/repos/{owner}/{repo}/commits` per active repo
- **Backfill:** `pnpm seed:git-commits` — 60-day backfill, 601 commits across 15 repos
- **Per-repo wiki articles:** Claude API summarizes commits per repo with `[[wiki links]]` and cross-references
- **Daemon:** hourly cron alongside existing GitHub source
- **Orchestrator fix:** per-item error handling (one bad file no longer kills entire source)
- **Filename safety:** slug truncation to prevent ENAMETOOLONG on verbose commit messages
- **Tests:** 7 new tests (230 total across 41 files)

### Phase 3b: Calendar Source — Pending MCP Auth
- Google Calendar MCP requires auth via claude.ai web interface (not CLI)
- When auth resolved: implement `src/sources/calendar.ts` (stub exists), same SyncSource interface
- Flow: `gcal_list_events(timeMin: last_poll)` → extract title + attendees + description → `calendar/events/{date}-{slug}.md`

---

## Phase 4: Voice & Polish — Complete (2026-04-08)

**Spec:** `~/docs/superpowers/specs/2026-04-08-brain-phase4-voice-and-polish-design.md`
**Plan:** `~/docs/superpowers/plans/2026-04-08-brain-phase4-voice-and-polish.md`

6 new source files, 41 new tests (271 total across 47 files). Features:
- **Voice transcription:** TranscriptionProvider with local whisper.cpp + OpenAI Whisper API (switchable via config)
- **Cluster classification:** Hybrid prefix detection + Claude Haiku AI fallback. Clusters: personal, work, life, language
- **Voice parser:** Two-step watcher handoff — voice watcher transcribes → writes markdown drop → raw watcher compiles. `.processed` sidecar guard for idempotency
- **Daily knowledge logs:** `daily/YYYY-MM-DD.md` with cluster sections, timestamped entries, 23:55 summary cron
- **Marp slides:** `/slides <topic>` via Telegram, wiki context → Claude → Marp CLI → PDF
- **matplotlib plots:** `/plot <description>` via Telegram, wiki context → Claude → uv run → PNG
- **Telegram updates:** Voice messages, /slides, /plot commands. Two-message pattern for slow operations
- **System activity logging:** Lint/heal and source sync results auto-append to daily log

### Auth Bug Fix (2026-04-09)

- **Root cause:** `ANTHROPIC_API_KEY=` in `.brain/.env` had empty value (wiped during duplicate cleanup)
- **Fix:** Restored key value + all 6 `new Anthropic()` calls now pass `apiKey: process.env.ANTHROPIC_API_KEY` explicitly + `loadEnv` strips surrounding quotes
- **Files changed:** `src/config.ts`, `src/query/synthesize.ts`, `src/voice/classify.ts`, `src/compiler/compile.ts`, `src/daily/log.ts`, `src/output/plots.ts`, `src/output/slides.ts`, `src/telegram/bot.ts`, `tests/telegram/bot.test.ts`
- **Status:** All features working — synthesis, compile, classify, voice pipeline confirmed end-to-end

### Still deferred to future phases
- **PDF parsing:** pdf2md or similar → replace placeholder-parser for .pdf
- **Image parsing:** Claude Vision API → description .md, image as attachment

---

## Gmail Direct API — Complete (2026-04-10)

- **MCP replaced:** Removed MCP dependency. Gmail now uses `googleapis` npm package with OAuth2 refresh token.
- **Auth flow:** `pnpm gmail:auth` — one-time browser consent, saves `GMAIL_REFRESH_TOKEN` to `.brain/.env`
- **Files added:** `src/sources/gmail-auth.ts` (OAuth2 client), `scripts/gmail-auth.ts` (consent CLI)
- **API source:** `createGmailApiSource()` in `gmail.ts` — wraps googleapis SDK into existing `GmailDeps` interface
- **Daemon wired:** Gmail added to hourly cron alongside GitHub + git-commits
- **First sync:** 41 emails ingested from 7-day window. Default hourly query: `category:personal newer_than:1d`
- **Tests:** 10 new tests (281 total across 49 files)

### Career-Datacenter Seed Status
- **Loaded via `pnpm seed`:** profile, experience, projects, skills, companies, positioning, stories, answers, tracking transforms
- **Wiki counts:** 63 companies, 34 projects, 5 people, 5 concepts, 4 experience, 4 decisions, 2 tracking
- **Local data:** Some career-datacenter files may have been updated locally since last seed run — worth re-checking

---

## Gemini Vertex AI Provider — Complete (2026-04-10)

- **LLM abstraction:** `src/llm/provider.ts` — unified `generate()` function for all 6 LLM call sites
- **Providers:** Anthropic SDK + Vertex AI (`@google-cloud/vertexai`) with auto-fallback
- **Auto mode:** Prefers Gemini (Vertex AI, $1000 GCP GenAI credits on askNYC project) over Anthropic (credits exhausted)
- **GCP project:** `nth-segment-491623-d2` (askNYC) via Application Default Credentials
- **Project rotation:** Supports multiple GCP projects for quota distribution
- **API response:** `/synthesise` now reports actual `provider` and `model` used (not hardcoded)
- **Tests:** 289 total across 50 files

## Repo Knowledge Enrichment — Complete (2026-04-10)

- **10 repo profiles** scanned via parallel agents, compiled to wiki, embedded (102 chunks)
- **Repos covered:** AskNYC, Career-Datacenter, gaze-diffuse, Karen, MarkPush, ouroboros, portfolio, superpowers, claw-code, claude-howto
- **Wiki articles:** Dense 200-400 line profiles with architecture, tech stack, key components, current state
- **Synthesis verified:** Queries like "What is Karen?" return rich context from new + existing wiki articles

---

## Phase 5: Knowledge Compounding — Complete (2026-04-10)

- **Novelty scoring:** `src/query/novelty.ts` — cosine similarity + `1 - maxSim` novelty metric
- **Synthesis cache:** `src/api/synthesis-cache.ts` — in-memory TTL cache (10min, 50 entries) keyed by query_id
- **`/save` route:** `POST /save { query_id, force? }` — persists synthesis to `wiki/synthesis/` if novelty > 0.85 (configurable). Force flag bypasses threshold.
- **Novelty in response:** `/synthesise` now returns `novelty_score` in every response
- **Anti-ouroboros:** Synthesis answers only saved via explicit `/save` call, never auto-saved
- **Tests:** 25 new tests (314 total across 54 files)

## Brain MCP Server — Complete (2026-04-10)

- **Server:** `~/.claude/mcp/brain/index.ts` — stdio MCP server proxying to brain HTTP API (localhost:3577)
- **Tools:** `brain_query` (proactive wiki search) + `brain_ingest` (explicit knowledge save)
- **Registration:** `~/.claude/.mcp.json` — available in all Claude Code sessions across all repos
- **Proactive trigger:** Tool description encourages Claude to query brain before asking user to re-explain documented knowledge

## Telegram Wiki Link Formatting — Complete (2026-04-10)

- **Formatter:** `src/telegram/format.ts` — strips `[[wiki/path|display]]`, `[[path#anchor]]`, `[[path.md]]` links to bold text
- **Wired into:** `src/telegram/bot.ts` — applied before truncation on synthesis replies

## Brain Explorer — Daemon Pipeline Complete (2026-04-10)

- **Graph scanner:** `src/graph/scan-wiki.ts` — walks wiki/, extracts frontmatter + `[[wiki links]]`
- **Embedding aggregation:** `src/graph/embeddings.ts` — averages LanceDB chunk vectors per article (strips `wiki/` prefix)
- **UMAP export:** `src/graph/export.ts` — 768→3 dim reduction with deterministic seed via `umap-js`
- **Cache orchestrator:** `src/graph/cache.ts` — ties scan + embeddings + UMAP + file write
- **Push:** `src/graph/push.ts` — writes `graph.json` to explorer repo, git commit+push
- **API routes:** `GET /graph-export` (serves cache), `POST /graph-push` (rebuild + push)
- **VectorStore.listAll()** — bulk embedding retrieval for graph pipeline
- **Nightly cron** — rebuilds graph cache after lint/heal cycle
- **Result:** 315 nodes with 3D UMAP positions at `wiki/.graph-cache.json`
- **Tests:** 23 new tests (346 total across 61 files)

### Brain Explorer Frontend — Not Started

- **Spec:** `docs/specs/2026-04-10-brain-explorer-design.md`
- **Daemon plan (complete):** `docs/plans/2026-04-10-brain-explorer-daemon.md`
- **Frontend plan:** Not yet written
- **Stack:** Next.js 15 + r3f + drei + postprocessing + d3-force-3d + cmdk
- **Visual:** Nebula/deep space, instanced nodes, bloom, camera arc fly-in
- **Deploy:** brain.rahilsinghi.com via Vercel (separate repo)

---

## Known Technical Debt

| Item | File | Priority |
|------|------|----------|
| `embedBatch` is exported but never called | `src/embedder/embedder.ts` | Low — remove or use in sync |
| ~~`novelty_threshold` config unused~~ | `src/config.ts` | Done — Phase 5 implemented |
| `webSearchesUsed` always 0 | `src/lint/runner.ts` | Low — no web search integration yet |
| `main()` in cli.ts needs MCP wiring | `src/sources/cli.ts` | Phase 3 follow-up — Gmail done (direct API), MarkPush still needs MCP |
| Placeholder parsers for pdf/audio/image | `src/parser/placeholder-parser.ts` | Phase 4 — replace with real parsers |
| `tsconfig.json` has `bun-types` but tests run under Vitest/Node | `tsconfig.json` | Low — `skipLibCheck: true` masks it |
| No chunked/staged compile strategies | `src/compiler/queue.ts` | Future — only single-pass implemented |
| Apache Arrow peer dep warning (v21 vs LanceDB wants <=18.1) | `package.json` | Low — works fine, cosmetic warning |

---

## Quick Start for Next Session

```
cd ~/Desktop/brain
pnpm test                    # Verify 346 tests pass
pnpm status                  # Check daemon (launchd managed)
cat docs/REMAINING-WORK.md   # This file — pick up where you left off
cat CLAUDE.md                # Project context for Claude Code
```

**Daemon:** Runs as macOS launchd service (`com.rahilsinghi.brain`). Auto-starts on login, restarts on crash. See CLAUDE.md for management commands.

**Next up:**
1. **Brain Explorer frontend** — Write implementation plan, scaffold Next.js app, deploy to brain.rahilsinghi.com
2. Test Telegram synthesis formatting (send `?what is maison` after prompt change)
3. Verify brain MCP server in a new session (brain_query + brain_ingest)
4. Phase 3b: Calendar source (awaiting Google Calendar MCP auth)

**All sources live:**
1. Telegram: `@rahil_brain_bot` — always on via launchd
2. GitHub + git-commits: hourly cron
3. Gmail: hourly cron (OAuth2, direct API)
4. Calendar: awaiting MCP auth (Phase 3b)

**LLM Provider:** Gemini Vertex AI (auto mode, $1000 credits on askNYC GCP project). Anthropic as fallback (credits exhausted, -$0.11).
