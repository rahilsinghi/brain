---
title: "Timesheet Tracker Phase 2: Telegram Daily Review & Alerts"
author: ai
created_at: 2026-04-15T21:02:49.401Z
last_ai_edit: 2026-04-15T21:02:49.401Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/api/articles/timesheet-tracker-phase-2-complete-telegram-integration-1776286948775.md]]"
tags:
  - timesheet
  - telegram
  - bot
  - daily report
  - alerts
  - automation
  - database
  - testing
  - architecture
  - daemon
---

# Timesheet Tracker Phase 2: Telegram Daily Review & Alerts

Phase 2 of the Timesheet Tracker project introduced Telegram bot integration for daily review, automated cap alerts, and enhanced reporting. It features a deterministic regex-based command parser, ensuring low latency and reliability for managing timesheet entries and generating summaries. Key architectural decisions include reply-to-message context handling and worker subprocess isolation for database operations.

## Key Concepts

Daily Reports,Telegram Bot,Cap Alerts,Deterministic Regex Parsing,Worker Subprocess Isolation,Weekly Summary,End-of-Day Review,Reply-to-message context,TimesheetDB,Invoice Generation,MCP Tools

## Details

This phase of the Timesheet Tracker project, completed on April 15, 2026, focused on integrating advanced reporting and management features via a Telegram bot.

## What Shipped

### New Modules (3 files, 33 tests)
1.  `src/timesheet/daily-report.ts`: Generates formatted daily reports grouped by employer. Each entry includes number, hours, category, confidence icon, time range, description, and proof artifact stats (commit count + LOC). It detects gaps exceeding a configurable threshold (default 45 min) and displays weekly revenue and cap percentage for capped employers. Returns an `entryIds` array for mapping.
2.  `src/timesheet/telegram-review.ts`: Implements a deterministic regex parser for 7 command patterns, eschewing LLMs for reliability and performance. Commands include `ok` (approve all), `#N = Xh` (adjust hours), `#N = Xh category description` (adjust + update), `+Xh employer cat desc` (add manual entry), `+Xh employer cat desc HH:MMa-HH:MMp` (add with explicit times), `drop #N` (set to ignored), and `repo name = employer` (map new repo). Supports multiple commands per message, one per line.
3.  `src/timesheet/alerts.ts`: Manages cap threshold checks at 75%, 90%, and 100% of the weekly cap. It includes a deduplication mechanism to prevent redundant alerts for the same type, employer, and week. Messages inform users of remaining hours and percentages.

### Bot Integration
*   `/ts` command: Provides a weekly summary by default, with options for `/ts today` (today's report) and `/ts week` (day-by-day matrix).
*   `/eod` command: Triggers an end-of-day review, sending today's report and storing `reply-to-message` context in `reportMessageCache`.
*   Reply-to-report parsing: Allows corrections to apply to the correct date's entries by looking up `ctx.message.reply_to_message.message_id`.
*   `+Xh employer cat desc` quick-entry: Intercepted at the top of the text handler before brain ingestion.
*   Updated `/help` and `/start` messages.

### Daemon Changes
*   A 9 AM daily report cron job (configurable via `review.report_hour`).
*   Cap alert checks are run after every scanner cron tick.
*   The worker subprocess maintains its own [[TimesheetDB]] connection with employer sync.

### DB Methods Added
*   `updateEntryCategory(id, category)`: A proper method replacing internal access hacks.
*   `findAlert(employerId, week, type)`: Used for deduplication of alerts.
*   `insertAlert(...)`: Records sent alerts.

## Architecture Decisions
*   **Reply-to-message context**: Daily reports store `telegram_msg_id → { date, entryIds }` in an in-memory Map. This allows the parser to resolve `#N` to actual entry UUIDs based on the context of the replied message, preventing corrections from applying to incorrect dates.
*   **Worker subprocess isolation**: The Telegram worker operates with its own [[TimesheetDB]] connection, separate from the daemon process. Both sync employers from configuration on startup, ensuring data consistency while maintaining process isolation.
*   **No LLM in parser**: All command parsing is implemented using deterministic regex. This design choice eliminates [[latency]], [[Cost Tracking and Budget Enforcement in Ouroboros|cost]], and [[Anti-Hallucination Constraints in Resume Generation|hallucination risk]] associated with LLMs for this structured interaction.

## Test Coverage
*   `tests/timesheet/daily-report.test.ts`: 8 tests covering empty reports, single/multi-employer grouping, weekly revenue, confidence icons, gap detection, and entryId ordering.
*   `tests/timesheet/telegram-review.test.ts`: 19 tests, including 13 parser tests and 6 applier tests (approve, adjust, adjust+category, drop, add, repo_map, out-of-range error).
*   `tests/timesheet/alerts.test.ts`: 6 tests covering below-threshold, 75%/90%/100% alerts, deduplication, and skipping uncapped employers.

## What's Next
*   **Phase 3**: Weekly finalization and [[Invoice Generation|invoice PDF generation]] (including Sunday 6 PM auto-finalize and PDF with line items).
*   **Phase 4**: Enhanced [[MarkPush|MCP tools]] (basic `brain_timesheet` queries for status, today, and week already exist).

## Related

[[TelegramConfig Type and Defaults]],[[CLAUDE.md Update: Telegram Bot Documentation]],[[Brain Repo - Phase 4 Telegram Test Result]],[[Daemon Entry Point with Graceful Shutdown]],[[API: Embed HTTP Server in Daemon Boot with Graceful Shutdown]],[[Database Access Testing Suite]],[[Database Integrations Test Suite]],[[Anti-Hallucination Constraints in Resume Generation]],[[Cost Tracking and Budget Enforcement in Ouroboros]],[[Invoice Generation]],[[MarkPush]],[[MCP Tools]],[[TimesheetDB]],[[Alerts]],[[Daily Report]],[[Worker Subprocess]],[[Deterministic Regex Parsing]],[[Test Coverage]],[[Performance]]
