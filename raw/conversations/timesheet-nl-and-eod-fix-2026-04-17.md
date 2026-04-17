---
status: pending
source_type: conversation
ingested_at: 2026-04-17T17:35:00Z
parsed_at: 2026-04-17T17:35:00Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# Timesheet Natural-Language Entry + /eod Metadata Fix (2026-04-17)

Shipped a natural-language timesheet entry system in one session plus fixed a subtle relay bug that caused drop replies after `/eod` to be classified as wiki ingests.

## What Shipped

Four entry points, all converging on the same parser and applier:

- **Telegram text** — `/ts 2h maison coding 3-5pm yesterday`
- **Telegram voice** — Voice notes prefixed with "timesheet", "ts", "time sheet", or "log time"; whisper transcribes, prefix is stripped, bypasses the cluster classifier
- **Claude Code MCP** — `brain_timesheet_add` tool; Claude decides when to call it based on user request
- **CLI** — `pnpm ts:add "2h maison coding 3-5pm yesterday"` or the `BRAIN_API_URL` env var points at the Mac Studio from the MacBook

## Architecture (Thin Adapter)

The feature adds ~400 lines of new code on top of existing infrastructure:

1. `parseTimesheetNL(text, ctx)` — Pure function. Builds a strict JSON-schema prompt, calls `generate({ json: true })` against local Qwen3 32B via Ollama, validates the response (employer must be known, category from 9-value enum, hours 0-12, date YYYY-MM-DD, times H:MMa/p), returns a `ReviewCommand[]` of type "add".

2. `handleTimesheetNL(text, deps)` — Shared handler. Parse → write telemetry row → apply commands → format response string. Used by all four entry points.

3. `applyReviewCommands(db, cmds, [], inferredDate)` — Existing function, unchanged. Writes entries to SQLite with `source: "manual"`, `status: "draft"`.

4. `nl_parse_log` table — Every parse (success or failure) writes a row: input text, raw LLM response, entries created, error, duration, token count, source tag. Full audit trail for billable data.

## Design Decisions Made During Brainstorming

- **Explicit prefix** over smart auto-detect. Predictability beats magic for billable hours.
- **Auto-insert** without confirmation prompt. Matches existing `+Xh` flow. Mistakes get caught in the 8 PM daily review.
- **All-or-nothing on multi-entry**. If any entry fails validation, the whole batch is rejected with a specific error. Prevents confusion where only some entries land.
- **Spoken prefix for voice**, not a dedicated command. User says "timesheet, two hours maison coding from three to five PM yesterday" — whisper transcribes, prefix detection strips the trigger word.
- **Four entry points from day one**, sharing one handler. Marginal cost of CLI + MCP is small once the parser is solid.

## Performance (M3 Ultra, Qwen3 32B local)

- CLI smoke test: 4.6s per call (includes HTTP roundtrip)
- HTTP path: 4.2s
- All local, zero API cost
- Telemetry logs: source, input, output, duration, tokens — for debugging + replay

## The /eod Metadata Fix

Discovered immediately after shipping: user typed `/eod`, got a report, replied `drop #2` and `drop #3`. Instead of dropping entries, **the drop commands got saved as wiki ingest articles** (`raw/api/articles/drop-2-*.md`).

Root cause: the relay has two delivery channels to Telegram:
- **Outbound queue** (`client.pushOutbound`) — carries metadata: `category`, `entry_ids`, `report_date`. Used by the nightly 8 PM cron. Relay server tracks these; follow-up user replies are tagged as `timesheet_reply` type.
- **Command response** (`postResponse`) — synchronous reply channel. No metadata. Used by `handleTimesheetCommand` for things like `/status`, `/help`.

`/eod` was using the command-response channel, so the relay had no `entry_ids` to associate with replies. Drop commands got default classification → `ingest`.

Fix: route `/eod` through `client.pushOutbound` with `category: "daily_report"`, `entry_ids: report.entryIds`, `report_date: today`. Same path as the 8 PM cron. Falls back to sync response if push fails. Made `handleTimesheetCommand` async.

Now `/eod` replies with `📋 EOD report queued — replies will route back to today's entries.` and the full report arrives via outbound with metadata intact.

## The Session Also Fixed

Removed the `git push` warning from `~/.claude/hooks/validate-bash.py`. Force-push to main/master still blocked; plain pushes go through. Smooths subagent-driven workflows.

## Test Coverage

- **Phase 1 core** — 36 unit + integration tests (nl-parse-log, nl-parser, nl-handler)
- **Phase 2 Telegram text** — 2 new relay sync tests (with-DB and without)
- **Phase 3 voice** — 4 new voice-parser tests (prefix detection, fallthrough, backward compat)
- **Phase 4 HTTP** — 3 route tests (200 success, 400 empty, 200 error)
- **Phase 5 CLI** — manual smoke test (usage message, daemon-unreachable, success path)
- **Full suite** — 648/648 passing across 90 files, zero regressions

## Methodology

Used subagent-driven development: one fresh subagent per task with the plan's code inlined in the prompt. Haiku for mechanical tasks (DB schema, MCP tool, CLI), Sonnet for the parser + handler + relay wiring. Two-stage review after each task (spec compliance, then code quality). One subagent hit a rate limit mid-task; the follow-up recovered from the partial state without trouble.

Time to ship: ~2 hours of wall time from spec approval to all-green. Zero rollbacks.

## Related

[[Brain Project]]
[[Timesheet Tracker]]
[[Ollama Local Inference Setup on Mac Studio M3 Ultra]]
[[Telegram Relay Bot]]
[[brain_query]]
[[brain_timesheet_add]]
