import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { parse as parseYaml } from "yaml";
import { google } from "googleapis";
import { uniqueSlug } from "./slug.js";
import { createGoogleOAuth2 } from "./google-auth.js";
import type { SyncSource, SourceSyncState, SyncResult, RawDrop } from "./types.js";

// --- Types ---

export interface CalendarDeps {
  listEvents(
    calendarId: string,
    timeMin: string,
    maxResults?: number,
  ): Promise<CalendarEvent[]>;
}

export interface CalendarEvent {
  id: string;
  summary: string;
  startTime: string;
  endTime: string;
  description?: string;
  attendees?: string[];
  location?: string;
  htmlLink?: string;
  colorId?: string;
  isAllDay?: boolean;
}

export interface CalendarSourceConfig {
  accountId: string;
  calendarIds: string[];
  skipColors: string[];
  skipKeywords: string[];
}

// --- Helpers ---

/**
 * Extract the date portion (YYYY-MM-DD) from an ISO datetime or date string.
 */
function extractDate(isoString: string): string {
  // All-day events are already YYYY-MM-DD; datetime strings have T separator
  return isoString.slice(0, 10);
}

/**
 * Format a calendar event as a markdown raw drop.
 */
function formatEventMarkdown(
  event: CalendarEvent,
  calendarId: string,
): string {
  const when = `${event.startTime} \u2013 ${event.endTime}`;
  const where = event.location || "N/A";
  const attendees =
    event.attendees && event.attendees.length > 0
      ? event.attendees.join(", ")
      : "None";
  const description = event.description || "No description";

  let md = `# ${event.summary}\n\n`;
  md += `**When:** ${when}\n`;
  md += `**Where:** ${where}\n`;
  md += `**Calendar:** ${calendarId}\n`;
  md += `**Attendees:** ${attendees}\n`;
  md += `\n## Description\n\n${description}\n`;

  if (event.htmlLink) {
    md += `\n[View in Google Calendar](${event.htmlLink})\n`;
  }

  return md;
}

/**
 * Check whether an event should be skipped based on color or keyword filters.
 */
function shouldSkip(
  event: CalendarEvent,
  config: CalendarSourceConfig,
): boolean {
  if (event.colorId && config.skipColors.includes(event.colorId)) {
    return true;
  }
  const summaryLower = event.summary.toLowerCase();
  for (const keyword of config.skipKeywords) {
    if (summaryLower.includes(keyword.toLowerCase())) {
      return true;
    }
  }
  return false;
}

// --- Source factory (DI-based, testable) ---

export function createCalendarSource(
  deps: CalendarDeps,
  config: CalendarSourceConfig,
): SyncSource {
  return {
    name: "calendar",
    async poll(state: SourceSyncState): Promise<SyncResult> {
      const processedSet = new Set(state.processed_ids);
      const timeMin =
        state.last_poll ?? new Date(Date.now() - 7 * 86400000).toISOString();

      const newItems: RawDrop[] = [];
      const processedIds: string[] = [];

      for (const calendarId of config.calendarIds) {
        const events = await deps.listEvents(calendarId, timeMin);

        for (const event of events) {
          if (processedSet.has(event.id)) {
            continue;
          }

          processedIds.push(event.id);

          if (shouldSkip(event, config)) {
            continue;
          }

          const datePrefix = extractDate(event.startTime);
          const slug = uniqueSlug(event.summary, event.id);
          const filename = `calendar/${config.accountId}/${datePrefix}-${slug}.md`;
          const content = formatEventMarkdown(event, calendarId);

          newItems.push({ filename, content, sourceId: event.id });
        }
      }

      return { newItems, processedIds };
    },
  };
}

// --- Production API source ---

interface CalendarYamlAccount {
  id: string;
  credentials: string;
  refresh_token_env: string;
  calendar_ids: string[];
}

interface CalendarYamlConfig {
  accounts?: CalendarYamlAccount[];
  skip_colors?: string[];
  skip_keywords?: string[];
}

/**
 * Create a Calendar SyncSource using the googleapis SDK directly.
 *
 * Reads config from `.brain/config.yaml` under the `calendar:` key.
 * Returns null if no accounts are configured or all auth fails (non-fatal).
 */
export function createCalendarApiSource(
  vaultRoot: string,
): SyncSource | null {
  const configPath = join(vaultRoot, ".brain", "config.yaml");
  if (!existsSync(configPath)) {
    console.warn("[calendar] No config.yaml found — skipping");
    return null;
  }

  const raw = readFileSync(configPath, "utf-8");
  const parsed = parseYaml(raw) as Record<string, unknown> | null;
  const calConfig = parsed?.calendar as CalendarYamlConfig | undefined;
  if (!calConfig?.accounts || calConfig.accounts.length === 0) {
    console.warn("[calendar] No calendar accounts configured — skipping");
    return null;
  }

  const skipColors = calConfig.skip_colors ?? [];
  const skipKeywords = calConfig.skip_keywords ?? [];

  // Build a composite deps that queries all accounts
  type AccountCalendar = {
    calendarId: string;
    listEvents: CalendarDeps["listEvents"];
  };

  const accountCalendars: AccountCalendar[] = [];

  for (const account of calConfig.accounts) {
    const oauth2 = createGoogleOAuth2(vaultRoot, {
      id: account.id,
      credentialsFile: account.credentials,
      refreshTokenEnvVar: account.refresh_token_env,
    });
    if (!oauth2) continue;

    const cal = google.calendar({ version: "v3", auth: oauth2 });

    for (const calendarId of account.calendar_ids) {
      accountCalendars.push({
        calendarId,
        async listEvents(
          _calendarId: string,
          timeMin: string,
          maxResults = 100,
        ): Promise<CalendarEvent[]> {
          const res = await cal.events.list({
            calendarId,
            timeMin,
            maxResults,
            singleEvents: true,
            orderBy: "startTime",
          });

          return (res.data.items ?? []).map((item) => ({
            id: item.id!,
            summary: item.summary ?? "Untitled",
            startTime: item.start?.dateTime ?? item.start?.date ?? "",
            endTime: item.end?.dateTime ?? item.end?.date ?? "",
            description: item.description ?? undefined,
            attendees: item.attendees?.map((a) => a.email!).filter(Boolean),
            location: item.location ?? undefined,
            htmlLink: item.htmlLink ?? undefined,
            colorId: item.colorId ?? undefined,
            isAllDay: !item.start?.dateTime,
          }));
        },
      });
    }
  }

  if (accountCalendars.length === 0) {
    console.warn("[calendar] All calendar account auth failed — skipping");
    return null;
  }

  // For the first account, build a simple source
  // (multi-account support: we merge all calendars into a single source)
  const firstAccount = calConfig.accounts.find((a) =>
    accountCalendars.some((ac) =>
      a.calendar_ids.includes(ac.calendarId),
    ),
  );
  if (!firstAccount) return null;

  const deps: CalendarDeps = {
    async listEvents(
      calendarId: string,
      timeMin: string,
      maxResults?: number,
    ): Promise<CalendarEvent[]> {
      const ac = accountCalendars.find((a) => a.calendarId === calendarId);
      if (!ac) return [];
      return ac.listEvents(calendarId, timeMin, maxResults);
    },
  };

  const allCalendarIds = accountCalendars.map((ac) => ac.calendarId);

  return createCalendarSource(deps, {
    accountId: firstAccount.id,
    calendarIds: allCalendarIds,
    skipColors,
    skipKeywords,
  });
}
