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

### Phase 3b: Calendar Source — Pending MCP Auth
- Google Calendar MCP requires auth via claude.ai web interface (not CLI)
- When auth resolved: implement `src/sources/calendar.ts` (stub exists), same SyncSource interface
- Flow: `gcal_list_events(timeMin: last_poll)` → extract title + attendees + description → `calendar/events/{date}-{slug}.md`

---

## Phase 4: Voice & Polish

**Goal:** Voice notes, output generation, Apple Shortcuts, daily logs.

**Spec ref:** §4.2 (Source 7), §8 (Visual System), §11.1 (voice watcher)

### Voice Note Ingestion
- **Trigger:** chokidar watches `raw/voice/`
- **Parser:** Whisper API or local whisper.cpp
- **Flow:** Audio file lands → Whisper transcribes → write transcription .md with `source_type: voice` → keep original audio as attachment
- **Apple Shortcuts:** Automate record → transcribe → drop into vault via iCloud
- **New file:** `src/parser/voice-parser.ts` (replaces placeholder-parser for audio)

### Marp Slide Generation
- **Package:** `@marp-team/marp-cli`
- **Theme:** `templates/brutalist-marp.css` (already exists)
- **Flow:** User says "make slides about X" → query wiki → assemble outline → write .md with Marp directives → render to `output/slides/`

### matplotlib Plot Generation
- **Runtime:** Python via `uv run` targeting local `.venv/`
- **Theme:** `templates/brutalist-matplotlib.json` (already exists)
- **Flow:** User says "plot X" → extract data from wiki → write Python script → `uv run` → save plot to `output/plots/`
- **Isolation:** .venv/ is local to brain, no global pollution

### Daily Knowledge Logs
- **File:** `daily/{date}.md`
- **Auto-populated by:** Calendar source (meetings), lint/heal runner (changes)
- **User additions:** Manual notes, reflections
- **Summary:** End-of-day auto-summary of what was ingested, compiled, healed

### PDF and Image Parsing
- **PDF:** pdf2md or similar → replace placeholder-parser for .pdf
- **Images:** Claude Vision API → description .md, image as attachment
- **New files:** `src/parser/pdf-parser.ts`, `src/parser/image-parser.ts`

### Estimated tasks: 10-12

---

## Known Technical Debt

| Item | File | Priority |
|------|------|----------|
| `embedBatch` is exported but never called | `src/embedder/embedder.ts` | Low — remove or use in sync |
| `novelty_threshold` config unused | `src/config.ts` | Phase 5 — implement knowledge compounding |
| `webSearchesUsed` always 0 | `src/lint/runner.ts` | Low — no web search integration yet |
| `main()` in cli.ts needs MCP wiring | `src/sources/cli.ts` | Phase 3 follow-up — needs MCP tool injection at call site |
| Placeholder parsers for pdf/audio/image | `src/parser/placeholder-parser.ts` | Phase 4 — replace with real parsers |
| `tsconfig.json` has `bun-types` but tests run under Vitest/Node | `tsconfig.json` | Low — `skipLibCheck: true` masks it |
| No chunked/staged compile strategies | `src/compiler/queue.ts` | Future — only single-pass implemented |
| Apache Arrow peer dep warning (v21 vs LanceDB wants <=18.1) | `package.json` | Low — works fine, cosmetic warning |

---

## Quick Start for Next Session

```
cd ~/Desktop/brain
pnpm test                    # Verify 108 tests pass
cat docs/REMAINING-WORK.md   # This file — pick up where you left off
cat CLAUDE.md                # Project context for Claude Code
```

**Next up:** Phase 4 (Voice & Polish) or Phase 5 (Knowledge Compounding). See `docs/NEXT-PHASE.md` for assessment.

**To test live sources:**
1. GitHub: daemon handles automatically on hourly cron
2. Gmail + MarkPush: run `/brain-sync` in Claude Code (MCP tools needed)
3. Calendar: awaiting MCP auth (Phase 3b)
