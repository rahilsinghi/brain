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

## Phase 2 Hardening (Optional, Before Phase 3)

These were flagged during code review. Not blockers, but would improve robustness:

### Partial embedding failure handling
- **File:** `src/embedder/sync.ts` — `syncFile()`
- **Issue:** If `embed()` fails on chunk N of M, frontmatter hash still gets updated. The file is marked as synced but has partial embeddings.
- **Fix:** Only update `last_embedded_hash` after ALL chunks are successfully embedded. Wrap the embedding loop in try/catch; on failure, delete the partial chunks and don't update the hash.

### Additional test coverage for healer utilities
- **Files:** `tests/lint/healer.test.ts`
- **Missing tests for:** `writeProposal()` (verify file creation, content structure), `appendAISynthesis()` (verify append behavior, content preservation)
- **Estimate:** 3-4 new tests

### Knowledge compounding (/save + novelty threshold)
- **Spec ref:** §6 Query & Synthesis, §12 Claude Code Integration
- **Status:** `query.novelty_threshold` is in config (0.85) but unused. `synthesize.ts` always returns results with no score filtering.
- **What's needed:** After synthesis, compare answer embedding against existing wiki chunks. If novelty score > 0.85 AND user says `/save`, write the synthesis to wiki. Otherwise, display only.
- **Complexity:** Medium — needs cosine similarity helper + frontmatter write for new wiki article

### Wire `discoverConnections` into runner Phase 3
- **File:** `src/lint/connector.ts` has `discoverConnections()` exported but never called
- **What's needed:** In `runner.ts` Phase 3 step, call `discoverConnections()` and increment `stats.connectionsDiscovered`
- **Complexity:** Low

---

## Phase 3: Auto-Ingestion (Next Up)

**Goal:** Poll MCP sources on cron schedules, write new items to raw/ for the existing pipeline to process. Idempotent via sync-state.json cache.

**Spec ref:** §4.2 (Sources 3-6), §4.3 (Sync State Cache), §11.1 (Cron schedules)

### New files to create
```
src/
├── sources/
│   ├── sync-state.ts       ← Read/write .brain/sync-state.json
│   ├── markpush.ts         ← Poll MarkPush MCP push_history
│   ├── github.ts           ← Poll GitHub starred repos, PRs, issues
│   ├── gmail.ts            ← Poll Gmail (label:Brain OR is:starred)
│   └── calendar.ts         ← Poll Google Calendar daily events
```

### Sync State Cache
- **File:** `.brain/sync-state.json`
- **Structure:** Per-source tracking of processed IDs/URLs
- **Pattern:** Load cache → poll API → filter out processed → write new items to raw/ → append new IDs → save cache
- **Every poll must be idempotent** — if daemon restarts mid-poll, no duplicates

### Source 3: MarkPush MCP
- **Trigger:** Hourly cron (`config.cron.mcp_sources`)
- **MCP tools:** `mcp__markpush__push_history` → get recent pushes
- **Flow:** Poll push_history → filter by sync-state processed_urls → for each new URL: fetch full content via WebFetch → write to `raw/articles/{slug}.md` with `source_type: markpush`
- **Privacy:** Only processes explicitly pushed content

### Source 4: GitHub MCP
- **Trigger:** Hourly cron
- **MCP tools:** `mcp__github__*` (need to check available tools — may need authenticate first)
- **Flow:** Poll starred repos + recent PRs + recent issues → filter by sync-state → write to `raw/repos/{name}.md` or `raw/conversations/{slug}.md` with `source_type: github`
- **What to capture:** README + description for repos; title + body + key comments for PRs/issues

### Source 5: Gmail MCP
- **Trigger:** Hourly cron
- **MCP tools:** `mcp__gmail__*` (need to check available tools — may need authenticate first)
- **Flow:** Search `label:Brain OR is:starred newer_than:1h` → filter by sync-state processed Message-IDs → extract subject, sender, body → strip signatures → `raw/emails/{subject-slug}.md`
- **Privacy:** ONLY processes labeled/starred emails. Never bulk-ingest.

### Source 6: Google Calendar MCP
- **Trigger:** Daily cron at 10 PM (`config.cron.calendar`)
- **MCP tools:** `mcp__claude_ai_Google_Calendar__*` (need to authenticate first)
- **Flow:** List today's events → filter by sync-state event IDs → extract title, attendees, description → append to `daily/{date}.md` under `## Meetings`
- **Lightweight:** Meeting metadata only, not full calendar sync

### Daemon wiring
- **Modify:** `src/index.ts` — add hourly cron for MarkPush + GitHub + Gmail, daily cron for Calendar
- **Modify:** `src/types.ts` — add SyncState type
- **New config fields:** Already exist in BrainConfig (`cron.mcp_sources`, `cron.calendar`)

### Pre-requisites
- Authenticate MCP servers: MarkPush, GitHub, Gmail, Google Calendar
- Verify available MCP tool signatures (list_devices, push_history, etc.)
- Ensure MCP servers are configured in `.mcp.json`

### Estimated tasks: 8-10
1. Sync state reader/writer
2. MarkPush source + tests
3. GitHub source + tests
4. Gmail source + tests
5. Calendar source + tests
6. Wire all sources into daemon cron
7. Integration test with mocked MCP
8. End-to-end test with real MCP (manual)

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
| `novelty_threshold` config unused | `src/config.ts` | Medium — implement in Phase 2 hardening |
| `discoverConnections` built but not wired | `src/lint/connector.ts` | Low — wire in Phase 2 hardening |
| `connectionsDiscovered` / `webSearchesUsed` always 0 | `src/lint/runner.ts` | Low — fix when wiring connector |
| Placeholder parsers for pdf/audio/image | `src/parser/placeholder-parser.ts` | Phase 4 — replace with real parsers |
| `tsconfig.json` has `bun-types` but tests run under Vitest/Node | `tsconfig.json` | Low — `skipLibCheck: true` masks it |
| No chunked/staged compile strategies | `src/compiler/queue.ts` | Future — only single-pass implemented |
| Apache Arrow peer dep warning (v21 vs LanceDB wants <=18.1) | `package.json` | Low — works fine, cosmetic warning |

---

## Quick Start for Next Session

```
cd ~/Desktop/brain
pnpm test                    # Verify 53 tests pass
cat docs/REMAINING-WORK.md   # This file — pick up where you left off
cat CLAUDE.md                # Project context for Claude Code
```

**To start Phase 3:**
1. Read this file's Phase 3 section
2. Check MCP server availability: run `! mcp__markpush__list_devices` etc. in Claude Code
3. Use `superpowers:brainstorming` if design questions arise, otherwise go straight to `superpowers:writing-plans`
4. Execute via `superpowers:subagent-driven-development`
