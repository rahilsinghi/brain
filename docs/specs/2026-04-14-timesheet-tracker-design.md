# Timesheet Tracker — Design Spec

**Created:** 2026-04-14
**Author:** Rahil Singhi + Claude
**Status:** Approved design, pending implementation
**PRD:** `~/Desktop/career-datacenter/docs/PRD-TIMESHEET-TRACKER.md`

## Problem

Rahil has two concurrent freelance engagements requiring accurate, auditable hour tracking from Day 1:

- **Maison Labs:** $50/hr, 20 hrs/week cap, IC trial period Apr 16 – May 15, full-time $7k/mo starting Jun 22
- **Wilbo:** Equity-based + $1,800/mo sign-on bonus, terms pending from Brenton Andersen

Manual timesheets are error-prone. Work artifacts already flow through the brain pipeline (git commits, voice notes, emails). The timesheet tracker derives hours from these artifacts, surfaces them for daily review, and generates invoice-ready reports.

## Architecture Decision

**Approach B: SQLite Core + Brain Integration Layer.**

SQLite (via `bun:sqlite`) is the source of truth for all mutable timesheet data. Brain integration is a one-way sync — finalized weekly summaries are written to `wiki/timesheet/` for queryability via `brain_query`. The CLI and Telegram bot talk directly to SQLite. Gemini handles hour estimation and category classification. Reports are generated from the DB on demand.

**Why not a full SyncSource?** The SyncSource pattern is designed for ingesting knowledge, not tracking mutable state with status transitions (draft → reviewed → finalized → invoiced → paid). SQLite handles tabular, stateful data with fast aggregation. Brain still gets the knowledge via wiki sync.

**Why not a separate repo?** The brain daemon already provides the cron scheduler, Telegram bot, Gemini LLM provider, watcher pipeline, and MCP server. Building inside brain avoids duplicating all of that infrastructure.

## Data Model (SQLite)

Database file: `.brain/timesheet.db`. Migrations run as `CREATE TABLE IF NOT EXISTS` on daemon startup. Driver: `bun:sqlite` (zero external dependencies).

### Table: `employers`

| Column | Type | Description |
|--------|------|-------------|
| `id` | TEXT PK | `'maison'`, `'wilbo'`, `'personal'` |
| `rate_hourly` | REAL | 50.0, 0, 0 |
| `weekly_cap_hours` | REAL | 20, null, null |
| `monthly_bonus` | REAL | null, 1800, null |
| `currency` | TEXT | Default `'USD'` |

Loaded from `timesheet-config.yaml` on startup.

### Table: `repo_map`

| Column | Type | Description |
|--------|------|-------------|
| `pattern` | TEXT PK | Glob or path: `'maison/*'`, `'/Users/.../maison-travel'` |
| `employer_id` | TEXT FK | → employers |
| `source` | TEXT | `'config'` / `'auto_detected'` / `'user_assigned'` |
| `added_at` | TEXT | ISO timestamp |

Pattern matching order: (1) exact local path match (`/Users/.../maison-travel`), (2) glob on repo name from git remote (`maison/*` matches `github.com/maison/anything`), (3) glob on directory name (`maison-*` matches any local dir starting with `maison-`). The scanner extracts both the local path and the remote origin URL, testing each pattern against both. Auto-discovered repos are added with `source: 'user_assigned'` after Telegram confirmation.

### Table: `entries`

| Column | Type | Description |
|--------|------|-------------|
| `id` | TEXT PK | UUID |
| `date` | TEXT | ISO date (`2026-04-15`) |
| `employer_id` | TEXT FK | → employers |
| `hours` | REAL | Derived from `end_time - start_time`, or manual |
| `start_time` | TEXT | ISO timestamp with timezone offset |
| `end_time` | TEXT | ISO timestamp with timezone offset |
| `timezone` | TEXT | IANA timezone (`'America/New_York'`) |
| `confidence` | TEXT | `'high'` / `'medium'` / `'low'` |
| `category` | TEXT | `'coding'` / `'meeting'` / `'research'` / `'design'` / `'communication'` / `'devops'` / `'testing'` / `'docs'` |
| `description` | TEXT | Human-readable summary |
| `source` | TEXT | `'git_session'` / `'manual'` / `'voice_note'` / `'email'` / `'calendar'` |
| `status` | TEXT | `'draft'` / `'reviewed'` / `'finalized'` / `'invoiced'` / `'paid'` / `'ignored'` |
| `session_id` | TEXT | Immutable: `<repo_slug>_<first_commit_sha>` (nullable for manual) |
| `invoice_id` | TEXT FK | → invoices (nullable) |
| `created_at` | TEXT | ISO timestamp |
| `reviewed_at` | TEXT | ISO timestamp (nullable) |
| `finalized_at` | TEXT | ISO timestamp (nullable) |

**Status lifecycle:** `draft` → `reviewed` → `finalized` → `invoiced` → `paid`. Terminal state: `ignored` (tombstone for dropped entries — prevents scanner re-ingestion).

**Time boundary invariant:** Every row has non-null `start_time` and `end_time`. For manual entries without explicit times: `end_time = now`, `start_time = now - hours`. The gap intelligence layer depends on this invariant.

### Table: `proof_artifacts`

| Column | Type | Description |
|--------|------|-------------|
| `id` | TEXT PK | UUID |
| `entry_id` | TEXT FK | → entries |
| `type` | TEXT | `'commit'` / `'voice_note'` / `'email'` / `'calendar_event'` |
| `reference` | TEXT | SHA, file path, message ID |
| `timestamp` | TEXT | ISO timestamp |
| `url` | TEXT | Optional (GitHub URL, etc.) |
| `metadata` | TEXT | JSON blob (diff stats, LOC, etc.) |

### Table: `invoices`

| Column | Type | Description |
|--------|------|-------------|
| `id` | TEXT PK | Format: `'maison-2026-04'` |
| `employer_id` | TEXT FK | → employers |
| `period_start` | TEXT | ISO date |
| `period_end` | TEXT | ISO date |
| `total_hours` | REAL | Sum of included entries |
| `total_amount` | REAL | hours × rate |
| `currency` | TEXT | From employer |
| `generated_at` | TEXT | ISO timestamp |
| `sent_at` | TEXT | Nullable — when sent to employer |
| `paid_at` | TEXT | Nullable — when payment received |
| `notes` | TEXT | Free text |

### Table: `alerts`

| Column | Type | Description |
|--------|------|-------------|
| `id` | TEXT PK | UUID |
| `employer_id` | TEXT FK | → employers |
| `week` | TEXT | ISO week (`2026-W16`) |
| `type` | TEXT | `'pace_warning'` / `'cap_75'` / `'cap_90'` / `'cap_reached'` |
| `message` | TEXT | Alert text |
| `sent_at` | TEXT | ISO timestamp |
| `acknowledged` | BOOLEAN | Default false |

Deduplication: same `employer_id + week + type` is only sent once.

## Data Ingestion Pipeline

### Git Session Scanner

New file: `src/timesheet/scanner.ts`. Runs every 15 minutes via daemon cron.

**Scan flow per repo in `repo_map`:**

1. `git -C <repo_path> log --since=<last_scan> --author=<git_user> --format='%H|%aI|%s' --numstat`
2. Parse commits → `[{sha, timestamp, message, files, additions, deletions}]`
3. Cluster into sessions: commits within 30-min gaps belong to the same session
4. For each session, compute initial boundaries:
   - `start_time` = first commit timestamp − 15min buffer
   - `end_time` = last commit timestamp + 15min buffer
5. Pass to Gemini for refined estimation (see LLM Estimation section)
6. Deduplicate and upsert into SQLite

**Session clustering algorithm:**
```
Sort commits by timestamp ascending.
current_session = [first_commit]
For each subsequent commit:
  if (commit.timestamp - current_session.last.timestamp) > 30 minutes:
    close current_session, start new one
  else:
    add to current_session
```

The 30-minute gap threshold is configurable in `timesheet-config.yaml`.

**Session ID — immutable anchor:**
```
session_id = <repo_slug>_<first_commit_sha>
```

This prevents the mutation bug where growing sessions (new commits added) would generate a new hash-based ID and cause duplicate entries. The scanner looks up by first commit SHA: if it exists, UPDATE `end_time`, `hours`, and link new proof artifacts. If not, INSERT.

**Why local git, not GitHub API:** The old `git-commits.ts` source used `gh api` remotely. For timesheets, local `git log` is superior:
- No API rate limits
- Works offline
- Catches commits before they're pushed
- Sees local-only branches
- Sub-second execution

### Manual Entry

Daemon route: `POST /timesheet/log`

```typescript
{
  employer_id: "maison",
  hours: 2,
  description: "Schema design session with Fredrik",
  category: "meeting",
  start_time: "2026-04-15T14:00:00-04:00",  // optional
  end_time: "2026-04-15T16:00:00-04:00",     // optional
  timezone: "America/New_York"
}
```

If `start_time`/`end_time` provided, `hours` is derived. If only `hours` provided: `end_time = now`, `start_time = now - hours`. Confidence = `high` for entries with explicit times, `medium` for hours-only.

Telegram shorthand: `+2h maison meeting standup` → parsed and POSTed to same endpoint.

### Retroactive Backfill

`brain timesheet backfill --since 2026-04-13`

Scans full git history back to the specified date. Creates entries with `confidence: 'low'` and `status: 'draft'`. Surfaces in the first daily review for human correction.

### New Repo Auto-Discovery

When the scanner encounters a commit from a repo path not in `repo_map`, it's flagged. The daily report includes:

```
NEW REPOS DETECTED:
• /Users/.../maison-travel — reply: repo maison-travel = maison
```

User reply updates `repo_map` with `source: 'user_assigned'`.

### Future Sources (Phase 2+)

| Source | Trigger | Attribution |
|--------|---------|-------------|
| Voice notes | Brain watcher detects `raw/voice/` | Duration × 1.5, employer from cluster tag |
| Emails | Gmail source poll (hourly) | 0.25hr per substantive sent email, by domain |
| Calendar | Calendar source (stub exists) | Event duration, by organizer domain |
| Cross-source | Daily correlation scan | Match voice/email timestamps to git sessions |

## LLM Hour Estimation + Category Classification

### Three-Signal Model

New file: `src/timesheet/estimator.ts`.

**Signal 1 — Diff stats:** Additions, deletions, files changed per session.
**Signal 2 — Commit metadata:** Count, time span, message content, commit frequency pattern.
**Signal 3 — Manual input:** If present, overrides everything. Sets `confidence: 'high'`.

### Gemini Estimation Call

When no manual input exists, the scanner calls Gemini (via existing `src/llm/provider.ts`) to synthesize signals 1 and 2.

**Prompt template:**
```
You are estimating hours worked for a freelance software engineer's timesheet.

Session: {repo_name} ({employer})
Time window: {first_commit_time} → {last_commit_time} ({wall_clock_span})
Commits: {count}
Commit messages:
{numbered_commit_messages}

Diff stats:
- Files changed: {total_files}
- Lines added: {total_additions}
- Lines deleted: {total_deletions}

Consider:
- Wall clock span between first and last commit
- Complexity implied by commit messages and diff size
- Typical overhead: reading code before editing, testing, debugging
- Context-switching buffer at start and end of session

Respond with ONLY a JSON object:
{
  "estimated_hours": <number, rounded to 0.25>,
  "inferred_start_time": "<ISO timestamp with timezone>",
  "inferred_end_time": "<ISO timestamp with timezone>",
  "confidence": "high" | "medium" | "low",
  "category": "coding" | "refactoring" | "testing" | "docs" | "devops" | "design" | "research",
  "reasoning": "<one sentence>"
}
```

**Critical invariant:** The LLM returns `inferred_start_time` and `inferred_end_time` alongside `estimated_hours`. The scanner's naive 15-minute buffers are passed as context; Gemini returns adjusted bounds reflecting actual work complexity. SQLite stores Gemini's bounds. `hours` is always `end_time - start_time` — the math balances by construction.

**Cost:** ~500 input + ~80 output tokens per session via Vertex AI (Gemini). At 10 sessions/day = ~5,800 tokens/day. Negligible against $1000 GCP credits.

**Fallback:** If Gemini unavailable, use heuristic: `hours = max(wall_clock_span_hours, 0.5)` with `confidence: 'low'`.

### Category Classification

Handled in the same Gemini call (the `category` field). No separate request.

| Category | Auto-assigned | Manual-only |
|----------|:---:|:---:|
| `coding` | Yes | — |
| `refactoring` | Yes | — |
| `testing` | Yes | — |
| `docs` | Yes | — |
| `devops` | Yes | — |
| `design` | Yes | — |
| `research` | Yes | — |
| `meeting` | — | Yes |
| `communication` | — | Yes |

`meeting` and `communication` are never auto-assigned from git data.

### Confidence Scoring

| Level | Criteria |
|-------|----------|
| `high` | Manual entry with explicit times, OR 3+ commit session spanning 1+ hours |
| `medium` | 2+ commit session with reasonable span, LLM aligns with heuristic |
| `low` | Single commit, large unexplained gap, LLM diverges from wall clock, backfill entries |

Daily report sorts low-confidence entries to the top.

## Gap Intelligence

New file: `src/timesheet/gaps.ts`.

### Global Timeline Detection

Gaps are detected across ALL employers — not scoped to a single employer. This captures cross-employer context-switching overhead.

**Algorithm:**
```
1. Query all entries for the day, all employers, sorted by start_time
2. For each pair of consecutive entries:
   gap = next.start_time - current.end_time
   if gap > 45 minutes:
     Flag: "⚠️ Gap: {current.end_time}–{next.start_time} ({gap}h)"
     Include both employers if they differ:
     "⚠️ Gap: 11:45a–2:00p (2.25h between Maison and Wilbo sessions)"
3. Morning gap: if first entry starts after 10:00 AM, flag
4. Evening gap: not flagged (variable end times are normal)
```

**Gap resolution via Telegram:**
- `gap = 1h lunch` → personal, non-billable
- `gap = 1.5h maison research API docs` → creates billable entry for employer
- Unfilled gaps reappear in subsequent daily reports for 3 days
- After 3 days unaddressed → auto-resolve as `personal`, `confidence: 'low'`

## Daily Review + Telegram Flow

### Morning Report (9:00 AM local)

New file: `src/timesheet/daily-report.ts`. Cron at 9:00 AM. Summarizes **yesterday's** complete activity.

**Why 9 AM reviewing yesterday (not 6 PM same-day):** A 6 PM report misses evening commits. By reviewing yesterday at 9 AM, you see the complete, closed picture of a full day. `/eod` command available for same-day review when finishing early.

**Report format:**
```
📋 Timesheet — Tue Apr 15

MAISON (4.75h / 20h cap)
━━━━━━━━━━━━━━━━━━━━━
#1 ⚡ 2.5h coding [high]
   9:15a–11:45a — Auth middleware + session mgmt
   3 commits, +142/-38 LOC
#2 ⚡ 1.5h coding [medium]
   1:30p–3:00p — Travel search API integration
   2 commits, +89/-12 LOC
#3 ⚡ 0.75h meeting [low]
   3:15p–4:00p — (gap detected, no artifacts)

⚠️ Gap: 11:45a–1:30p (1.75h untracked)

WILBO (0h today)
━━━━━━━━━━━━━━━━━━━━━
No activity detected.

💰 Week so far: 4.75h × $50 = $237.50 (24% of cap)
📊 Pace: 4.75h/day → on track for 23.75h (⚠️ exceeds 20h cap)

NEW REPOS DETECTED:
• /Users/.../maison-travel — reply: repo maison-travel = maison

Reply: ok ✓ | #2 = 2h | +1h maison meeting standup | gap = 1h lunch
```

### Telegram Reply Parser

New file: `src/timesheet/telegram-review.ts`. Deterministic regex parsing — no LLM, zero token cost, zero latency.

| Command | Effect |
|---------|--------|
| `ok` | All entries → `reviewed` |
| `#2 = 2h` | Adjust entry hours (recalculates `end_time`) |
| `#3 = 0.75h meeting standup with Sandeep` | Adjust hours + update description |
| `+1.5h maison meeting schema review 2pm-3:30pm` | Add manual entry with times |
| `+2h wilbo coding storyboard pipeline` | Add manual entry (end=now, start=now-2h) |
| `gap = 1h lunch` | Fill gap as non-work (personal, 0 billable) |
| `gap = 1.5h maison research API docs` | Fill gap as billable work |
| `drop #3` | Set entry status to `ignored` (tombstone) |
| `repo maison-travel = maison` | Map new repo to employer |

Multiple commands per message, one per line. `ok` at the end finalizes all.

**Reply context tracking:** When the daemon sends the daily report, it caches the Telegram `message_id` → target date mapping. When parsing replies, the bot checks `reply_to_message_id` to scope commands to the correct day. No cross-day corruption.

**Error handling:** Unparseable lines get an immediate reply with the failing line and expected syntax.

### Cap Alerts

New file: `src/timesheet/alerts.ts`. Triggered both by the 15-minute scanner and the daily report.

| Threshold | Message |
|-----------|---------|
| 75% (15h) | "Maison: 15h logged (75% of 20h cap). 5h remaining." |
| 90% (18h) | "⚠️ Maison: 18h logged. 2h remaining before cap." |
| 100% (20h) | "🛑 Maison: Weekly cap reached. Additional hours non-billable." |
| Pacing | "📊 At current pace (4.5h/day), you'll hit 20h by Thursday." |

Sent via Telegram immediately on trigger. Deduped: same `employer_id + week + type` sent only once.

### Weekly Finalization

Sunday 8pm cron (or `brain timesheet finalize --week 2026-W16`):
1. All `reviewed` entries → `finalized`
2. Weekly summary written to wiki (see Brain Integration)
3. Telegram confirmation with summary
4. Entries still in `draft` are flagged: "3 unreviewed entries — review now or finalized as-is"

### Telegram Commands

| Command | Action |
|---------|--------|
| `/status` | Current week rollup |
| `/status today` | Today's entries by employer |
| `/status week` | Day-by-day matrix |
| `/invoice maison april` | Generate + display invoice |
| `paid maison-2026-04` | Mark invoice as paid |
| `+2h maison meeting standup` | Quick manual entry |
| `/eod` | Trigger same-day review |

## Brain Integration

### Wiki Sync (One-Way)

New file: `src/timesheet/wiki-sync.ts`. Runs on weekly finalization.

**Output:** `wiki/timesheet/{employer}/2026-W16.md` and monthly rollups at `wiki/timesheet/{employer}/2026-04.md`.

**Critical rule: SQLite is the sole source of truth.** Wiki files are generated output. They include a warning block below frontmatter:

```markdown
<!-- AUTO-GENERATED FROM TIMESHEET DB — DO NOT EDIT -->
<!-- Manual changes will be overwritten on next sync -->
<!-- To correct entries: brain timesheet log, or reply to Telegram report -->
```

Wiki articles flow through the normal brain pipeline (watcher → embedder → LanceDB) and become queryable via `brain_query`.

### MCP Tool: `brain_timesheet`

Added to `~/.claude/mcp/brain/index.ts`.

```typescript
{
  name: "brain_timesheet",
  description: "Query timesheet data — hours, revenue, status, entries",
  input_schema: {
    type: "object",
    properties: {
      query: { type: "string", enum: ["status", "today", "week", "month", "entries"] },
      employer: { type: "string", description: "Filter by employer (optional)" },
      date: {
        type: "string",
        description: "ISO date, week string, OR 'today', 'yesterday', 'current_week', 'current_month'"
      }
    },
    required: ["query"]
  }
}
```

**Temporal literal resolution:** The daemon route intercepts `'today'`, `'yesterday'`, `'current_week'`, `'current_month'` and resolves them to concrete date bounds in the local timezone. Claude never needs to compute dates.

### Invoice Generation

CLI: `brain timesheet invoice --employer maison --month 2026-04`
Telegram: `/invoice maison april`
Route: `POST /timesheet/invoice`

New file: `src/timesheet/invoice.ts`.

**Flow:**
1. Query `finalized` entries for employer + period
2. Aggregate by week and category
3. Generate markdown invoice → `output/invoices/maison-2026-04.md`
4. Generate CSV → `output/invoices/maison-2026-04.csv`
5. Entries → `status: 'invoiced'`, set `invoice_id`
6. Insert `invoices` table row

**Payment tracking:** `brain timesheet paid --invoice maison-2026-04` or Telegram `paid maison-2026-04` sets `paid_at` and transitions entries to `paid`.

## File Structure

```
src/timesheet/
├── db.ts                 ← SQLite schema, migrations, connection (bun:sqlite)
├── config.ts             ← Load timesheet-config.yaml, employer/repo maps
├── scanner.ts            ← Git log polling, session clustering, dedup
├── estimator.ts          ← Three-signal model, Gemini call, confidence
├── gaps.ts               ← Global timeline gap detection
├── alerts.ts             ← Cap tracking, pacing projections
├── daily-report.ts       ← Morning report generation (9 AM cron)
├── telegram-review.ts    ← Reply parser (deterministic regex)
├── wiki-sync.ts          ← Weekly summary → wiki/ articles (one-way)
├── invoice.ts            ← Invoice + CSV generation + payment tracking
├── status.ts             ← Status queries (today/week/month)
└── types.ts              ← TimesheetEntry, ProofArtifact, Session, etc.

src/api/routes/
├── timesheet-log.ts      ← POST /timesheet/log
├── timesheet-status.ts   ← GET /timesheet/status[/today|/week|/month]
├── timesheet-invoice.ts  ← POST /timesheet/invoice
└── timesheet-finalize.ts ← POST /timesheet/finalize

src/cli/
└── timesheet.ts          ← brain timesheet log/status/invoice/backfill/finalize

.brain/
├── timesheet.db          ← SQLite database
└── timesheet-config.yaml ← Employer definitions + repo maps
```

## Implementation Phases

### Phase 1 — Day 1 MVP (Apr 15)
- SQLite schema + startup migrations (`db.ts`)
- Config loader (`config.ts`, `timesheet-config.yaml` with Maison + Wilbo)
- Git scanner with session clustering + immutable session IDs (`scanner.ts`)
- Manual entry route (`POST /timesheet/log`)
- CLI: `brain timesheet log`, `brain timesheet status`
- Retroactive backfill from Apr 13
- 15-minute cron wired into daemon

### Phase 2 — Daily Review (Apr 16–17)
- Daily report generation at 9 AM (`daily-report.ts`)
- Telegram reply parser with reply-to-message context (`telegram-review.ts`)
- Cap alerts with Telegram delivery (`alerts.ts`)
- Telegram commands: `/status`, `/status today`, `/status week`, `/eod`

### Phase 3 — Intelligence (Apr 18–19)
- Gemini estimation with inferred time boundaries (`estimator.ts`)
- Category classification (same Gemini call)
- Global timeline gap detection (`gaps.ts`)
- Confidence scoring integration

### Phase 4 — Reports + Brain (Apr 20–21)
- Weekly finalization + one-way wiki sync (`wiki-sync.ts`)
- Invoice generation + CSV export (`invoice.ts`)
- MCP tool: `brain_timesheet` with temporal literals
- Payment tracking
- Auto-repo discovery in daily reports
- Monthly rollup articles

## Configuration

`.brain/timesheet-config.yaml`:
```yaml
employers:
  maison:
    rate_hourly: 50
    weekly_cap: 20
    currency: USD
    repos:
      - "maison/*"
    email_domains:
      - maison.cx
    contacts:
      - fredrik@maison.cx
      - sandeep@maison.cx
      - noel@maison.cx
  wilbo:
    rate_hourly: 0
    monthly_bonus: 1800
    currency: USD
    repos:
      - "wilbo-*"
      - "screenwriting-*"
    contacts:
      - brentonandersen@hotmail.com

scanner:
  poll_interval_minutes: 15
  session_gap_minutes: 30
  buffer_minutes: 15
  git_user: "Rahil Singhi"

alerts:
  cap_thresholds: [0.75, 0.90, 1.0]

review:
  report_hour: 9
  finalize_day: sunday
  finalize_hour: 20
  gap_threshold_minutes: 45
  gap_auto_resolve_days: 3
```

## Open Questions (Resolved)

1. **Should hour estimates be validated before finalizing?** Yes — daily Telegram review flow with `ok` approval.
2. **Separate DB or brain wiki?** SQLite for state, wiki for queryability. One-way sync.
3. **Overlapping work?** Global gap detection catches cross-employer transitions. User attributes via Telegram reply.
4. **External tool integration?** Not in scope. This system is self-contained.
