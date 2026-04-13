# Phase 3b: Calendar Source Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ingest Google Calendar events into the brain knowledge base via the existing SyncSource pipeline, using googleapis with OAuth2.

**Architecture:** Extend `gmail-auth.ts` to add `calendar.readonly` scope and export a Calendar API client. New `calendar.ts` implements `SyncSource` — polls `events.list`, formats each event as a markdown drop with frontmatter, deduplicates via `processed_ids`. Wired into the hourly cron in `index.ts`.

**Tech Stack:** googleapis (already installed), node-cron (already wired), Vitest for tests.

**Spec:** `docs/specs/2026-04-13-brain-phase3b-calendar-source-design.md`

---

### Task 1: Extend OAuth Scope + Calendar Client Factory

**Files:**
- Modify: `src/sources/gmail-auth.ts`
- Modify: `scripts/gmail-auth.ts`
- Modify: `package.json`

- [ ] **Step 1: Add calendar scope and client factory to gmail-auth.ts**

Add the calendar import and export a `createCalendarClient` function:

```typescript
// At the top, add the calendar import:
import type { calendar_v3 } from "googleapis";

// After the GmailClient interface, add:
export interface CalendarClient {
  calendar: calendar_v3.Calendar;
}

// After createGmailClient function, add:
/**
 * Create an authenticated Google Calendar API client from stored credentials + refresh token.
 * Same credentials and token as Gmail — calendar.readonly scope must be granted.
 * Returns null if credentials or refresh token are missing.
 */
export function createCalendarClient(vaultRoot: string): CalendarClient | null {
  const credPath = join(vaultRoot, ".brain", "gmail-credentials.json");
  if (!existsSync(credPath)) {
    console.warn("[calendar] No credentials file at .brain/gmail-credentials.json — skipping");
    return null;
  }

  const refreshToken = process.env.GMAIL_REFRESH_TOKEN;
  if (!refreshToken) {
    console.warn("[calendar] No GMAIL_REFRESH_TOKEN in env — run `pnpm google:auth` first");
    return null;
  }

  const raw = readFileSync(credPath, "utf-8");
  const creds: GmailCredentials = JSON.parse(raw);
  const installed = creds.installed ?? creds.web;
  if (!installed) {
    console.error("[calendar] Invalid credentials file — missing 'installed' or 'web' key");
    return null;
  }

  const oauth2 = new google.auth.OAuth2(
    installed.client_id,
    installed.client_secret,
    installed.redirect_uris[0],
  );

  oauth2.setCredentials({ refresh_token: refreshToken });

  const calendar = google.calendar({ version: "v3", auth: oauth2 });

  return { calendar };
}
```

- [ ] **Step 2: Update auth script scopes and messaging**

In `scripts/gmail-auth.ts`, update the scope array on line 45:

```typescript
const authUrl = oauth2.generateAuthUrl({
  access_type: "offline",
  prompt: "consent",
  scope: [
    "https://www.googleapis.com/auth/gmail.modify",
    "https://www.googleapis.com/auth/calendar.readonly",
  ],
});
```

Update the console messages:

```typescript
console.log("\nRefresh token saved to .brain/.env");
console.log("Gmail + Calendar sources are now ready. Restart the daemon to activate.");
```

- [ ] **Step 3: Add google:auth alias to package.json**

In `package.json`, add alongside the existing `gmail:auth` script:

```json
"google:auth": "bun scripts/gmail-auth.ts",
```

Keep `gmail:auth` as-is for backward compatibility.

- [ ] **Step 4: Commit**

```bash
git add src/sources/gmail-auth.ts scripts/gmail-auth.ts package.json
git commit -m "feat(auth): add calendar.readonly scope + createCalendarClient factory"
```

---

### Task 2: Calendar SyncSource — Types + Event Formatting

**Files:**
- Create: `src/sources/calendar.ts`
- Test: `tests/sources/calendar.test.ts`

- [ ] **Step 1: Write failing tests for event formatting**

Create `tests/sources/calendar.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { formatCalendarEvent, createCalendarSource } from "../../src/sources/calendar.js";
import type { SourceSyncState } from "../../src/sources/types.js";

function makeMeetingEvent() {
  return {
    id: "evt-meeting-1",
    summary: "Rahil / Nathan",
    description: "Discuss product roadmap",
    location: "https://meet.google.com/abc-def-ghi",
    start: { dateTime: "2026-04-09T14:00:00-04:00" },
    end: { dateTime: "2026-04-09T14:30:00-04:00" },
    status: "confirmed",
    organizer: { email: "nathan.roe@bonafide.ai", displayName: "Nathan Roe" },
    attendees: [
      { email: "nathan.roe@bonafide.ai", displayName: "Nathan Roe", responseStatus: "accepted" },
      { email: "rahilsinghi300@gmail.com", displayName: "Rahil Singhi", responseStatus: "accepted" },
    ],
    eventType: "default",
  };
}

function makeAllDayEvent() {
  return {
    id: "evt-allday-1",
    summary: "Team Offsite",
    description: "",
    start: { date: "2026-04-15" },
    end: { date: "2026-04-17" },
    status: "confirmed",
    organizer: { email: "rahilsinghi300@gmail.com" },
    attendees: [],
    eventType: "default",
  };
}

function makeGmailAutoEvent() {
  return {
    id: "evt-gmail-1",
    summary: "Dhurandhar The Revenge",
    description: "To see detailed information for automatically created events...",
    location: "AMC Empire 25, 234 West 42nd Street, New York, NY 10036",
    start: { dateTime: "2026-04-07T16:00:00-04:00" },
    end: { dateTime: "2026-04-07T17:00:00-04:00" },
    status: "confirmed",
    organizer: { email: "rahilsinghi300@gmail.com" },
    attendees: [],
    eventType: "fromGmail",
  };
}

function makeCancelledEvent() {
  return {
    id: "evt-cancelled-1",
    summary: "Cancelled standup",
    status: "cancelled",
    start: { dateTime: "2026-04-10T09:00:00-04:00" },
    end: { dateTime: "2026-04-10T09:30:00-04:00" },
    organizer: { email: "someone@example.com" },
    attendees: [],
    eventType: "default",
  };
}

describe("formatCalendarEvent", () => {
  it("formats a meeting with attendees", () => {
    const md = formatCalendarEvent(makeMeetingEvent());
    expect(md).toContain("# Meeting: Rahil / Nathan");
    expect(md).toContain("**When:**");
    expect(md).toContain("2026-04-09");
    expect(md).toContain("**Location:** https://meet.google.com/abc-def-ghi");
    expect(md).toContain("**Organizer:** Nathan Roe (nathan.roe@bonafide.ai)");
    expect(md).toContain("Nathan Roe (accepted)");
    expect(md).toContain("Rahil Singhi (accepted)");
    expect(md).toContain("## Description");
    expect(md).toContain("Discuss product roadmap");
  });

  it("formats an all-day multi-day event", () => {
    const md = formatCalendarEvent(makeAllDayEvent());
    expect(md).toContain("# All-Day: Team Offsite");
    expect(md).toContain("2026-04-15");
    expect(md).toContain("2026-04-17");
    expect(md).toContain("(all day)");
  });

  it("formats a Gmail auto-created event", () => {
    const md = formatCalendarEvent(makeGmailAutoEvent());
    expect(md).toContain("# Event: Dhurandhar The Revenge");
    expect(md).toContain("AMC Empire 25");
  });

  it("handles missing description", () => {
    const event = { ...makeMeetingEvent(), description: undefined };
    const md = formatCalendarEvent(event);
    expect(md).toContain("(no description)");
  });

  it("handles missing location", () => {
    const event = { ...makeMeetingEvent(), location: undefined };
    const md = formatCalendarEvent(event);
    expect(md).toContain("**Location:** (none)");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm vitest run tests/sources/calendar.test.ts`
Expected: FAIL — `formatCalendarEvent` not found

- [ ] **Step 3: Implement CalendarEvent type + formatCalendarEvent**

Create `src/sources/calendar.ts`:

```typescript
import { uniqueSlug } from "./slug.js";
import type { SyncSource, SourceSyncState, SyncResult, RawDrop } from "./types.js";

// --- Calendar API types ---

export interface CalendarEvent {
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

export interface CalendarDeps {
  listEvents: (params: {
    calendarId: string;
    timeMin: string;
    timeMax: string;
    singleEvents: boolean;
    orderBy: string;
    maxResults: number;
  }) => Promise<CalendarEvent[]>;
}

export interface CalendarSourceConfig {
  lookback_days?: number;
  lookahead_days?: number;
  calendar_id?: string;
}

// --- Event formatting ---

function classifyEvent(event: CalendarEvent): string {
  if (event.start.date) return "All-Day";
  if (event.attendees && event.attendees.length >= 2) return "Meeting";
  return "Event";
}

function formatDate(start: CalendarEvent["start"], end: CalendarEvent["end"]): string {
  if (start.date) {
    const startDate = start.date;
    const endDate = end.date;
    if (endDate && endDate !== startDate) {
      return `${startDate} – ${endDate} (all day)`;
    }
    return `${startDate} (all day)`;
  }

  if (start.dateTime) {
    const s = new Date(start.dateTime);
    const e = end.dateTime ? new Date(end.dateTime) : s;
    const datePart = s.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "America/New_York",
    });
    const startTime = s.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/New_York",
    });
    const endTime = e.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
      timeZone: "America/New_York",
    });
    return `${datePart} ${startTime} – ${endTime}`;
  }

  return "(unknown time)";
}

function formatAttendees(attendees?: CalendarEvent["attendees"]): string {
  if (!attendees || attendees.length === 0) return "(none)";
  return attendees
    .map((a) => {
      const name = a.displayName || a.email;
      const rsvp = a.responseStatus ? ` (${a.responseStatus})` : "";
      return `${name}${rsvp}`;
    })
    .join(", ");
}

function formatOrganizer(organizer?: CalendarEvent["organizer"]): string {
  if (!organizer) return "(unknown)";
  if (organizer.displayName) {
    return `${organizer.displayName} (${organizer.email})`;
  }
  return organizer.email;
}

export function formatCalendarEvent(event: CalendarEvent): string {
  const label = classifyEvent(event);
  const when = formatDate(event.start, event.end);
  const location = event.location || "(none)";
  const organizer = formatOrganizer(event.organizer);
  const attendees = formatAttendees(event.attendees);
  const myRsvp = event.myResponseStatus || "unknown";
  const description = event.description?.trim() || "(no description)";

  return [
    `# ${label}: ${event.summary}`,
    "",
    `- **When:** ${when}`,
    `- **Location:** ${location}`,
    `- **Organizer:** ${organizer}`,
    `- **Attendees:** ${attendees}`,
    `- **Status:** ${event.status}`,
    `- **My RSVP:** ${myRsvp}`,
    "",
    "## Description",
    description,
    "",
  ].join("\n");
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm vitest run tests/sources/calendar.test.ts`
Expected: All 5 tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/sources/calendar.ts tests/sources/calendar.test.ts
git commit -m "feat(calendar): add CalendarEvent types + formatCalendarEvent"
```

---

### Task 3: Calendar SyncSource — poll() + Factory

**Files:**
- Modify: `src/sources/calendar.ts`
- Modify: `tests/sources/calendar.test.ts`

- [ ] **Step 1: Write failing tests for poll() and createCalendarSource**

Append to `tests/sources/calendar.test.ts`:

```typescript
describe("createCalendarSource", () => {
  function makeDeps(events: CalendarEvent[]): CalendarDeps {
    return {
      listEvents: async () => events,
    };
  }

  const emptyState: SourceSyncState = {
    last_poll: null,
    processed_ids: [],
  };

  const stateWithProcessed: SourceSyncState = {
    last_poll: "2026-04-09T00:00:00.000Z",
    processed_ids: ["evt-meeting-1"],
  };

  it("returns drops for new events", async () => {
    const source = createCalendarSource(makeDeps([makeMeetingEvent()]));
    const result = await source.poll(emptyState);
    expect(result.newItems).toHaveLength(1);
    expect(result.newItems[0].sourceId).toBe("calendar:evt-meeting-1");
    expect(result.newItems[0].filename).toMatch(/^calendar\/2026-04-09-/);
    expect(result.newItems[0].filename).toEndWith(".md");
    expect(result.newItems[0].content).toContain("source_type: calendar");
    expect(result.newItems[0].content).toContain("# Meeting: Rahil / Nathan");
  });

  it("skips cancelled events", async () => {
    const source = createCalendarSource(makeDeps([makeCancelledEvent()]));
    const result = await source.poll(emptyState);
    expect(result.newItems).toHaveLength(0);
    expect(result.processedIds).toContain("calendar:evt-cancelled-1");
  });

  it("returns processedIds for all events", async () => {
    const events = [makeMeetingEvent(), makeGmailAutoEvent()];
    const source = createCalendarSource(makeDeps(events));
    const result = await source.poll(emptyState);
    expect(result.processedIds).toEqual([
      "calendar:evt-meeting-1",
      "calendar:evt-gmail-1",
    ]);
  });

  it("returns empty when no events", async () => {
    const source = createCalendarSource(makeDeps([]));
    const result = await source.poll(emptyState);
    expect(result.newItems).toHaveLength(0);
    expect(result.processedIds).toHaveLength(0);
  });

  it("has name 'calendar'", () => {
    const source = createCalendarSource(makeDeps([]));
    expect(source.name).toBe("calendar");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm vitest run tests/sources/calendar.test.ts`
Expected: FAIL — `createCalendarSource` is not a function (not exported yet)

- [ ] **Step 3: Implement createCalendarSource + poll()**

Append to `src/sources/calendar.ts`:

```typescript
// --- Source factory (testable with DI) ---

function getEventDate(event: CalendarEvent): string {
  if (event.start.date) return event.start.date;
  if (event.start.dateTime) return event.start.dateTime.slice(0, 10);
  return "unknown";
}

export function createCalendarSource(
  deps: CalendarDeps,
  config?: CalendarSourceConfig,
): SyncSource {
  const calendarId = config?.calendar_id ?? "primary";
  const lookbackDays = config?.lookback_days ?? 7;
  const lookaheadDays = config?.lookahead_days ?? 7;

  return {
    name: "calendar",
    async poll(state: SourceSyncState): Promise<SyncResult> {
      const now = new Date();

      const timeMin = state.last_poll
        ? state.last_poll
        : new Date(now.getTime() - lookbackDays * 86_400_000).toISOString();

      const timeMax = new Date(
        now.getTime() + lookaheadDays * 86_400_000,
      ).toISOString();

      const events = await deps.listEvents({
        calendarId,
        timeMin,
        timeMax,
        singleEvents: true,
        orderBy: "startTime",
        maxResults: 100,
      });

      const newItems: RawDrop[] = [];
      const processedIds: string[] = [];

      for (const event of events) {
        const sourceId = `calendar:${event.id}`;
        processedIds.push(sourceId);

        if (event.status === "cancelled") continue;

        const date = getEventDate(event);
        const slug = uniqueSlug(event.summary || "event", event.id);
        const filename = `calendar/${date}-${slug}.md`;

        const now = new Date().toISOString();
        const body = formatCalendarEvent(event);

        const content = [
          "---",
          "status: pending",
          "source_type: calendar",
          `ingested_at: ${now}`,
          `parsed_at: ${now}`,
          "compiled_to: null",
          "processed_at: null",
          "retry_count: 0",
          "last_error: null",
          "compile_progress: null",
          "---",
          body,
        ].join("\n");

        newItems.push({ filename, content, sourceId });
      }

      return { newItems, processedIds };
    },
  };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm vitest run tests/sources/calendar.test.ts`
Expected: All 10 tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/sources/calendar.ts tests/sources/calendar.test.ts
git commit -m "feat(calendar): add createCalendarSource with poll() + dedup"
```

---

### Task 4: Production API Wiring + Factory

**Files:**
- Modify: `src/sources/calendar.ts`
- Modify: `src/types.ts`
- Modify: `src/index.ts`

- [ ] **Step 1: Add createCalendarApiSource factory**

Append to `src/sources/calendar.ts`:

```typescript
import { createCalendarClient } from "./gmail-auth.js";

// --- Direct API source (no MCP dependency) ---

/**
 * Create a Calendar SyncSource using the googleapis SDK directly.
 * Requires OAuth credentials at .brain/gmail-credentials.json
 * and GMAIL_REFRESH_TOKEN in .brain/.env (with calendar.readonly scope).
 *
 * Returns null if auth is not configured (non-fatal).
 */
export function createCalendarApiSource(
  vaultRoot: string,
  config?: CalendarSourceConfig,
): SyncSource | null {
  const client = createCalendarClient(vaultRoot);
  if (!client) return null;

  const deps: CalendarDeps = {
    async listEvents(params): Promise<CalendarEvent[]> {
      const res = await client.calendar.events.list({
        calendarId: params.calendarId,
        timeMin: params.timeMin,
        timeMax: params.timeMax,
        singleEvents: params.singleEvents,
        orderBy: params.orderBy,
        maxResults: params.maxResults,
      });
      return (res.data.items ?? []).map((item) => ({
        id: item.id!,
        summary: item.summary ?? "Untitled",
        description: item.description ?? undefined,
        location: item.location ?? undefined,
        start: {
          dateTime: item.start?.dateTime ?? undefined,
          date: item.start?.date ?? undefined,
        },
        end: {
          dateTime: item.end?.dateTime ?? undefined,
          date: item.end?.date ?? undefined,
        },
        status: item.status ?? "confirmed",
        organizer: item.organizer
          ? { email: item.organizer.email!, displayName: item.organizer.displayName ?? undefined }
          : undefined,
        attendees: (item.attendees ?? []).map((a) => ({
          email: a.email!,
          displayName: a.displayName ?? undefined,
          responseStatus: a.responseStatus ?? undefined,
        })),
        eventType: (item as Record<string, unknown>).eventType as string | undefined,
        myResponseStatus: (item.attendees ?? []).find((a) => a.self)?.responseStatus ?? undefined,
      }));
    },
  };

  return createCalendarSource(deps, config);
}
```

- [ ] **Step 2: Add CalendarSourceConfig to BrainConfig**

In `src/types.ts`, extend the `sources` field in `BrainConfig`:

```typescript
  sources?: {
    github?: {
      min_stars_for_readme: number;
      username: string;
    };
    calendar?: {
      lookback_days?: number;
      lookahead_days?: number;
      calendar_id?: string;
    };
  };
```

- [ ] **Step 3: Wire into hourly cron in index.ts**

In `src/index.ts`, add the import at the top alongside other source imports:

```typescript
import { createCalendarApiSource } from "./sources/calendar.js";
```

In the cron block (after the graphify conditional, around line 158), add:

```typescript
    const calendar = createCalendarApiSource(vaultRoot, config.sources?.calendar);
    if (calendar) sources.push(calendar);
```

Update the log line to include calendar count:

```typescript
    const calendarIngested =
      (report.results.calendar as { itemsIngested?: number } | undefined)
        ?.itemsIngested ?? 0;
    console.log(
      `[cron] Sync done: ${ghIngested} GitHub items, ${commitIngested} commits, ${gmailIngested} emails, ${calendarIngested} calendar events, ${graphifyIngested} graphify drops ingested`,
    );
```

Update the daily entry condition to include calendar:

```typescript
    if (ghIngested + commitIngested + gmailIngested + calendarIngested + graphifyIngested > 0) {
```

- [ ] **Step 4: Run full test suite**

Run: `pnpm vitest run`
Expected: All tests pass (existing + 10 new calendar tests)

- [ ] **Step 5: Commit**

```bash
git add src/sources/calendar.ts src/types.ts src/index.ts
git commit -m "feat(calendar): wire CalendarApiSource into daemon hourly cron"
```

---

### Task 5: Re-consent OAuth + Manual Verification

**Files:**
- Modify: `.brain/config.yaml` (add calendar config)

- [ ] **Step 1: Add calendar config to .brain/config.yaml**

Add under the `sources` section:

```yaml
sources:
  calendar:
    lookback_days: 7
    lookahead_days: 7
    calendar_id: "primary"
```

- [ ] **Step 2: Re-run OAuth consent**

Run: `pnpm google:auth`

Follow the browser consent flow — grant both Gmail and Calendar read access. Paste the authorization code.

Expected: "Refresh token saved to .brain/.env" + "Gmail + Calendar sources are now ready."

- [ ] **Step 3: Restart daemon and verify**

```bash
pnpm restart
sleep 5
pnpm logs | grep -i calendar
```

Expected: No errors on startup. Calendar source will activate on the next hourly cron.

- [ ] **Step 4: Manual trigger via source sync**

Trigger a manual sync to verify events are ingested:

```bash
ls raw/calendar/
```

Verify markdown files were created with correct frontmatter and event formatting.

- [ ] **Step 5: Commit config**

```bash
git add .brain/config.yaml
git commit -m "chore(config): add calendar source settings"
```

---

### Task 6: Update Docs

**Files:**
- Modify: `CLAUDE.md`
- Modify: `docs/REMAINING-WORK.md`

- [ ] **Step 1: Update CLAUDE.md**

Change the Phase 3b line from "Not started" to "Complete":

```
**Phase 3b (Calendar):** Complete — Google Calendar events via googleapis OAuth2. Polls primary calendar hourly, ingests all event types (meetings, auto-created, personal). Snapshot-only dedup.
```

Add `calendar.ts` to the source files tree in the Architecture section.

- [ ] **Step 2: Update REMAINING-WORK.md**

Move Phase 3b from "Pending MCP Auth" to the Completed section. Update the "All sources live" list to include Calendar.

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md docs/REMAINING-WORK.md
git commit -m "docs: update CLAUDE.md and REMAINING-WORK.md for Phase 3b completion"
```
