# Phase 3b: Calendar Source — Design Spec

**Date:** 2026-04-13
**Status:** Approved
**Depends on:** Phase 3 (Auto-Ingestion), Gmail Direct API

---

## Goal

Ingest Google Calendar events into the brain knowledge base as raw drops, compiled into wiki articles by the existing pipeline. All event types are captured (meetings, auto-created Gmail events, personal blocks). Snapshot-only polling — no change tracking.

## Approach

Extend the existing Gmail OAuth2 infrastructure to include Calendar read scope. Implement a new `SyncSource` using the `googleapis` Calendar API directly. Wire into the hourly cron alongside existing sources.

---

## 1. OAuth Scope Extension

**File:** `src/sources/gmail-auth.ts`

Add `https://www.googleapis.com/auth/calendar.readonly` to the `SCOPES` array alongside the existing `gmail.readonly` scope.

Export a new factory function:

```typescript
export function createCalendarClient(vaultRoot: string): calendar_v3.Calendar | null
```

Uses the same OAuth2 client (same credentials, same refresh token). Returns `null` if credentials or refresh token are missing.

**Consent re-run:** User runs `pnpm google:auth` once to grant the new calendar scope. The existing `GMAIL_REFRESH_TOKEN` in `.brain/.env` is replaced with a new token covering both scopes. Rename the script from `gmail:auth` to `google:auth` (keep `gmail:auth` as alias for backward compat).

## 2. Calendar SyncSource

**File:** `src/sources/calendar.ts`

Implements `SyncSource` interface:

```typescript
interface CalendarDeps {
  listEvents: (params: {
    calendarId: string;
    timeMin: string;
    timeMax: string;
    singleEvents: boolean;
    orderBy: string;
    maxResults: number;
  }) => Promise<CalendarEvent[]>;
}

interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  location?: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
  status: string;
  organizer?: { email: string; displayName?: string };
  attendees?: { email: string; displayName?: string; responseStatus?: string }[];
  eventType?: string;
  myResponseStatus?: string;
}
```

### poll(state) Logic

1. Compute time window:
   - `timeMin`: `state.last_poll` or `now - lookback_days` (default 7) on first run
   - `timeMax`: `now + lookahead_days` (default 7)
2. Call `deps.listEvents()` with `singleEvents: true`, `orderBy: "startTime"`, `maxResults: 100`
3. Filter out events with `status: "cancelled"`
4. For each event, produce a `RawDrop`:
   - `sourceId`: `calendar:{event.id}`
   - `filename`: `calendar/{date}-{slug}.md` where `date` is the event start date (YYYY-MM-DD) and `slug` is derived from the event summary
   - `content`: Markdown with frontmatter (see format below)
5. Return `{ newItems, processedIds }`. Orchestrator handles dedup via `processed_ids`.

### Drop Format

```markdown
---
status: pending
source_type: calendar
ingested_at: {ISO timestamp}
parsed_at: {ISO timestamp}
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---
# {Event Type Label}: {summary}

- **When:** {formatted date range with timezone}
- **Location:** {location or "(none)"}
- **Organizer:** {organizer email/name}
- **Attendees:** {comma-separated list with RSVP status}
- **Status:** {confirmed/tentative}
- **My RSVP:** {accepted/declined/tentative/needsAction}

## Description
{event description or "(no description)"}
```

**Event type label** is derived from event characteristics:
- 2+ attendees → "Meeting"
- Has location, no other attendees → "Event"
- All-day → "All-Day"
- Default → "Event"

### Date Formatting

- Timed events: `2026-04-09 2:00 PM – 2:30 PM EDT`
- All-day single: `2026-04-09 (all day)`
- All-day multi: `2026-04-09 – 2026-04-11 (all day)`
- Use `Intl.DateTimeFormat` with `America/New_York` timezone (from config or event timezone).

## 3. Production Wiring

**File:** `src/sources/calendar.ts` (factory function)

```typescript
export function createCalendarApiSource(
  vaultRoot: string,
  calendarConfig?: CalendarSourceConfig,
): SyncSource | null
```

Returns `null` if OAuth credentials are missing (graceful degradation, same as Gmail).

**File:** `src/index.ts`

Add to the hourly cron block:

```typescript
const calendar = createCalendarApiSource(vaultRoot, config.sources?.calendar);
if (calendar) sources.push(calendar);
```

Add calendar ingested count to the cron log line.

## 4. Type Extensions

**File:** `src/types.ts`

Add `"calendar"` to the `SourceType` union type.

## 5. Configuration

**File:** `.brain/config.yaml`

```yaml
sources:
  calendar:
    lookback_days: 7
    lookahead_days: 7
    calendar_id: "primary"
```

All fields optional with defaults. No `enabled` flag — presence of OAuth refresh token is the gate (same pattern as Gmail).

## 6. Auth Script Update

**File:** `scripts/gmail-auth.ts` → rename to `scripts/google-auth.ts`

Update the consent URL to request both scopes. Update the `.env` write to use the same `GMAIL_REFRESH_TOKEN` key (no migration needed — it's just a new token with wider scope).

**`package.json`:**
```json
"google:auth": "bun scripts/google-auth.ts",
"gmail:auth": "bun scripts/google-auth.ts"
```

## 7. Testing

**File:** `tests/sources/calendar.test.ts`

Unit tests with mocked `CalendarDeps`:

- Parses a standard meeting event (2 attendees, description, location)
- Parses an all-day event
- Parses an auto-created Gmail event (movie, reservation)
- Skips cancelled events
- Dedup: already-processed event IDs are skipped by orchestrator
- Formats attendee list with RSVP status
- Handles missing fields (no description, no location, no attendees)
- First-poll lookback window (7 days back)
- sourceId format: `calendar:{eventId}`
- Filename format: `calendar/{date}-{slug}.md`

## 8. Scope & Non-Goals

**In scope:**
- Polling primary calendar via googleapis
- All event types (meetings, auto-created, personal)
- Snapshot-only (no change tracking)
- Hourly cron alongside other sources

**Not in scope:**
- Multiple calendars (only `primary`)
- Recurring event pattern detection
- Meeting notes extraction from Google Docs links
- Calendar write operations (create/update/delete events)
- Daily schedule summary (can be added later as a lint/connector feature)
