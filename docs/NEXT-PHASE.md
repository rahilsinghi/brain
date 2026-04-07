# Brain — What's Next

> Assessment of remaining phases as of 2026-04-07. Use this to decide what to build next.

## Current State

- **Phases 1-3 complete:** 39 commits, 32 source files, 22 test files, 108 tests passing
- **MCP auth status:** MarkPush (ready), GitHub (gh CLI, ready), Gmail (MCP, ready), Calendar (MCP, needs auth)
- **Phase 2 hardened:** partial embed safety, discoverConnections wired, healer test coverage added

## Option A: Phase 3b — Calendar Source (Small, ~1 hour)

**What:** Add Google Calendar as a 4th source. Stub already exists at `src/sources/calendar.ts`.

**Blocker:** Calendar MCP needs OAuth via claude.ai web interface. Once authed, implementation is trivial — same `SyncSource` interface, ~50 lines of code.

**Impact:** Low — meeting metadata is nice-to-have context, not core knowledge.

**Recommendation:** Do this when Calendar MCP auth is resolved. Don't prioritize it.

## Option B: Phase 4 — Voice & Polish (Medium, ~2-3 sessions)

**What:** Voice note ingestion, Marp slide generation, matplotlib plots, PDF/image parsing, daily logs.

**Key features:**
1. **Voice notes** — Whisper transcription for audio files in `raw/voice/`. Apple Shortcuts automation.
2. **Marp slides** — "Make slides about X" → query wiki → generate Marp markdown → render to `output/slides/`
3. **matplotlib plots** — "Plot X" → extract data → Python script → `output/plots/`
4. **PDF/image parsing** — Replace placeholder parsers with real ones (pdf2md, Claude Vision)
5. **Daily knowledge logs** — Auto-summary of what was ingested/compiled/healed

**Dependencies:** Whisper (local or API), Marp CLI, Python + uv for matplotlib, Claude Vision API for images.

**Impact:** High for daily workflow. Voice notes are the killer feature — frictionless capture from phone.

## Option C: Phase 5 — Knowledge Compounding (Medium, ~1 session)

**What:** Make the brain self-improving. When you ask a question and get a synthesized answer, the system can save novel answers back to the wiki.

**Key features:**
1. **Novelty scoring** — After synthesis, embed the answer and compare against existing wiki chunks via cosine similarity. Score 0-1.
2. **`/save` command** — Explicit trigger to save a synthesis to wiki
3. **Auto-save threshold** — If novelty > 0.85, prompt user to save (never auto-save without consent)
4. **Anti-ouroboros** — Synthetic answers get `source_type: auto_research` tag, lower priority in future searches

**Dependencies:** Cosine similarity helper (simple math on existing embeddings), minor changes to `synthesize.ts`.

**Impact:** This is the "self-improving" part of the spec. Without it, the brain only grows via manual ingestion. With it, every Q&A session can compound knowledge.

## Option D: Persistent Sync Server (Future)

**What:** Replace the "CLI trigger" model for Gmail/MarkPush with a persistent server that polls on true cron schedules, independent of Claude Code sessions.

**Why not now:** Current approach (daemon cron for GitHub + `/brain-sync` for MCP sources) works well enough. The source modules are already decoupled from the trigger layer, so migration is a ~1 session effort when needed.

## Recommendation

**Phase 5 (Knowledge Compounding) first.** It's the highest-leverage feature — it makes every other phase more valuable by turning passive ingestion into active learning. Phase 4 adds more input channels but doesn't change how knowledge grows. Phase 5 makes the existing channels compound.

After Phase 5: Voice notes from Phase 4 (the highest-value individual feature), then the rest of Phase 4.
