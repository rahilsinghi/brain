import { describe, it, expect } from "vitest";
import { createCalendarSource } from "../../src/sources/calendar.js";
import type { CalendarDeps, CalendarEvent, CalendarSourceConfig } from "../../src/sources/calendar.js";
import type { SourceSyncState } from "../../src/sources/types.js";

function makeEvent(overrides: Partial<CalendarEvent> = {}): CalendarEvent {
  return {
    id: "evt-1",
    summary: "Team Standup",
    startTime: "2026-04-16T09:00:00-04:00",
    endTime: "2026-04-16T09:30:00-04:00",
    description: "Daily standup meeting",
    attendees: ["alice@example.com", "bob@example.com"],
    location: "Zoom",
    htmlLink: "https://calendar.google.com/event?eid=abc123",
    ...overrides,
  };
}

function makeConfig(overrides: Partial<CalendarSourceConfig> = {}): CalendarSourceConfig {
  return {
    accountId: "personal",
    calendarIds: ["primary"],
    skipColors: ["8"],
    skipKeywords: ["#private"],
    ...overrides,
  };
}

function makeDeps(events: CalendarEvent[]): CalendarDeps {
  return {
    listEvents: async () => events,
  };
}

function freshState(): SourceSyncState {
  return {
    last_poll: null,
    processed_ids: [],
  };
}

describe("createCalendarSource", () => {
  it("polls events and generates correct drops", async () => {
    const events = [makeEvent()];
    const deps = makeDeps(events);
    const source = createCalendarSource(deps, makeConfig());

    const result = await source.poll(freshState());

    expect(result.newItems).toHaveLength(1);
    expect(result.processedIds).toEqual(["evt-1"]);

    const drop = result.newItems[0];
    expect(drop.sourceId).toBe("evt-1");
    expect(drop.filename).toMatch(/^calendar\/personal\//);
    expect(drop.filename).toMatch(/\.md$/);
  });

  it("filters events by skipColors", async () => {
    const events = [
      makeEvent({ id: "evt-1", colorId: "8" }),  // graphite -> skip
      makeEvent({ id: "evt-2", colorId: "7" }),  // peacock -> keep
      makeEvent({ id: "evt-3" }),                  // no color -> keep
    ];
    const deps = makeDeps(events);
    const source = createCalendarSource(deps, makeConfig({ skipColors: ["8"] }));

    const result = await source.poll(freshState());

    expect(result.newItems).toHaveLength(2);
    expect(result.processedIds).toContain("evt-1"); // still tracked as processed
    expect(result.processedIds).toContain("evt-2");
    expect(result.processedIds).toContain("evt-3");
    // Only non-skipped events produce drops
    const dropIds = result.newItems.map((d) => d.sourceId);
    expect(dropIds).not.toContain("evt-1");
    expect(dropIds).toContain("evt-2");
    expect(dropIds).toContain("evt-3");
  });

  it("filters events by skipKeywords (case-insensitive)", async () => {
    const events = [
      makeEvent({ id: "evt-1", summary: "Doctor Appointment #private" }),
      makeEvent({ id: "evt-2", summary: "SKIP this one" }),
      makeEvent({ id: "evt-3", summary: "Team Planning" }),
    ];
    const deps = makeDeps(events);
    const source = createCalendarSource(
      deps,
      makeConfig({ skipKeywords: ["#private", "SKIP"] }),
    );

    const result = await source.poll(freshState());

    expect(result.newItems).toHaveLength(1);
    expect(result.newItems[0].sourceId).toBe("evt-3");
    // All IDs are tracked as processed
    expect(result.processedIds).toHaveLength(3);
  });

  it("handles all-day events", async () => {
    const events = [
      makeEvent({
        id: "evt-allday",
        summary: "Company Offsite",
        startTime: "2026-04-20",
        endTime: "2026-04-21",
        isAllDay: true,
      }),
    ];
    const deps = makeDeps(events);
    const source = createCalendarSource(deps, makeConfig());

    const result = await source.poll(freshState());

    expect(result.newItems).toHaveLength(1);
    const drop = result.newItems[0];
    expect(drop.content).toContain("Company Offsite");
    expect(drop.content).toContain("2026-04-20");
  });

  it("deduplicates by event ID via processed_ids", async () => {
    const events = [
      makeEvent({ id: "evt-1" }),
      makeEvent({ id: "evt-2", summary: "New Event" }),
    ];
    const deps = makeDeps(events);
    const source = createCalendarSource(deps, makeConfig());

    const state: SourceSyncState = {
      last_poll: "2026-04-15T00:00:00Z",
      processed_ids: ["evt-1"],
    };

    const result = await source.poll(state);

    expect(result.newItems).toHaveLength(1);
    expect(result.newItems[0].sourceId).toBe("evt-2");
    expect(result.processedIds).toEqual(["evt-2"]);
  });

  it("handles empty event list", async () => {
    const deps = makeDeps([]);
    const source = createCalendarSource(deps, makeConfig());

    const result = await source.poll(freshState());

    expect(result.newItems).toHaveLength(0);
    expect(result.processedIds).toHaveLength(0);
  });

  it("polls multiple calendars with correct drop paths", async () => {
    const primaryEvents = [makeEvent({ id: "evt-p1", summary: "Primary Meeting" })];
    const workEvents = [makeEvent({ id: "evt-w1", summary: "Work Sync" })];

    const deps: CalendarDeps = {
      listEvents: async (calendarId: string) => {
        if (calendarId === "primary") return primaryEvents;
        if (calendarId === "work@group.calendar.google.com") return workEvents;
        return [];
      },
    };

    const source = createCalendarSource(
      deps,
      makeConfig({
        accountId: "maison",
        calendarIds: ["primary", "work@group.calendar.google.com"],
      }),
    );

    const result = await source.poll(freshState());

    expect(result.newItems).toHaveLength(2);
    // All paths use the accountId prefix
    for (const drop of result.newItems) {
      expect(drop.filename).toMatch(/^calendar\/maison\//);
    }
    expect(result.processedIds).toContain("evt-p1");
    expect(result.processedIds).toContain("evt-w1");
  });

  it("generates correct markdown format in drops", async () => {
    const events = [
      makeEvent({
        id: "evt-fmt",
        summary: "Design Review",
        startTime: "2026-04-16T14:00:00-04:00",
        endTime: "2026-04-16T15:00:00-04:00",
        location: "Room 42",
        description: "Review Q2 designs",
        attendees: ["alice@example.com", "bob@example.com"],
        htmlLink: "https://calendar.google.com/event?eid=xyz",
      }),
    ];
    const deps = makeDeps(events);
    const source = createCalendarSource(deps, makeConfig());

    const result = await source.poll(freshState());

    const content = result.newItems[0].content;
    expect(content).toContain("# Design Review");
    expect(content).toContain("**When:**");
    expect(content).toContain("**Where:** Room 42");
    expect(content).toContain("**Calendar:** primary");
    expect(content).toContain("**Attendees:** alice@example.com, bob@example.com");
    expect(content).toContain("## Description");
    expect(content).toContain("Review Q2 designs");
    expect(content).toContain("[View in Google Calendar](https://calendar.google.com/event?eid=xyz)");
  });

  it("handles missing optional fields gracefully", async () => {
    const events = [
      makeEvent({
        id: "evt-minimal",
        summary: "Quick Call",
        description: undefined,
        attendees: undefined,
        location: undefined,
        htmlLink: undefined,
      }),
    ];
    const deps = makeDeps(events);
    const source = createCalendarSource(deps, makeConfig());

    const result = await source.poll(freshState());

    const content = result.newItems[0].content;
    expect(content).toContain("# Quick Call");
    expect(content).toContain("**Where:** N/A");
    expect(content).toContain("**Attendees:** None");
    expect(content).toContain("No description");
  });

  it("has source name 'calendar'", () => {
    const source = createCalendarSource(makeDeps([]), makeConfig());
    expect(source.name).toBe("calendar");
  });

  it("extracts date prefix from startTime for filename", async () => {
    const events = [
      makeEvent({
        id: "evt-date",
        summary: "Morning Sync",
        startTime: "2026-04-16T09:00:00-04:00",
      }),
    ];
    const deps = makeDeps(events);
    const source = createCalendarSource(deps, makeConfig());

    const result = await source.poll(freshState());

    // filename should contain date prefix from start time
    expect(result.newItems[0].filename).toMatch(/2026-04-16/);
  });
});
