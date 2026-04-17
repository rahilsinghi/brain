import { generate } from "../llm/provider.js";
import type { ReviewCommand } from "./telegram-review.js";

const VALID_CATEGORIES = new Set([
  "coding",
  "refactoring",
  "testing",
  "docs",
  "devops",
  "design",
  "research",
  "meeting",
  "communication",
]);

const TIME_RE = /^\d{1,2}:\d{2}[ap]$/i;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export interface ParseContext {
  now: Date;
  timezone: string;
  employers: string[];
}

export interface ParseResult {
  commands: ReviewCommand[];
  inferredDate: string;
  warnings: string[];
  error?: string;
  llmResponseRaw?: string;
  durationMs?: number;
  llmTokens?: number;
}

interface RawEntry {
  hours?: number;
  employer?: string;
  category?: string;
  description?: string;
  date?: string;
  start_time?: string;
  end_time?: string;
}

interface LLMJson {
  entries?: RawEntry[];
  error?: string;
}

function todayISODate(now: Date): string {
  return now.toISOString().slice(0, 10);
}

function stripCodeFences(text: string): string {
  return text
    .replace(/^\s*```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/, "")
    .trim();
}

function buildPrompt(text: string, ctx: ParseContext): string {
  const dayOfWeek = ctx.now.toLocaleDateString("en-US", { weekday: "short" });
  const employerList = ctx.employers.join(", ");
  const categoryList = [...VALID_CATEGORIES].join(", ");
  return `You extract timesheet entries from natural language. Return JSON only — no prose, no markdown fences.

CONTEXT:
Current time: ${ctx.now.toISOString()}  (${dayOfWeek}, ${ctx.timezone})
Known employers: ${employerList}
Valid categories: ${categoryList}

RULES:
1. Return {"entries": [...]} — array even if one entry.
2. Each entry: {hours: number, employer: string, category: string, description: string, date?: "YYYY-MM-DD", start_time?: "H:MMa|p", end_time?: "H:MMa|p"}
3. Employer MUST be from the known list. If user mentions an unknown employer, return {"error": "unknown employer: <X>. Known: <list>", "entries": []}.
4. Category MUST be from the valid list. Infer from verbs:
   - "coded", "built", "implemented", "debugged" → coding
   - "refactored", "cleaned up" → refactoring
   - "wrote tests", "added tests" → testing
   - "wrote spec", "docs", "readme" → docs
   - "deployed", "infra", "devops" → devops
   - "designed", "wireframed", "mockup" → design
   - "researched", "investigated" → research
   - "meeting", "call", "sync", "standup", "1:1" → meeting
   - "slack", "email", "discussion" → communication
5. Dates:
   - "yesterday" → yesterday's date
   - "this morning", "today" → today's date; omit the \`date\` field
   - "Monday" → most recent past Monday (if today isn't Monday)
   - Explicit "Apr 15" → that date
6. Times:
   - "3-5pm" → start_time: "3:00p", end_time: "5:00p"
   - "from 9:15 to 10:45 AM" → start_time: "9:15a", end_time: "10:45a"
   - If only duration given ("2h yesterday") → omit start/end; caller back-calculates.
7. Multiple activities → multiple entries. "2h coding then 1h meeting" → two entries.
8. Description: concise, under 100 chars. Preserve specifics (names, project names).
9. If input is not about work hours at all → return {"error": "not a timesheet entry", "entries": []}.
10. Hours: 0 < hours <= 12. Reject silly values.

INPUT:
${text}

Return ONLY valid JSON.`;
}

export async function parseTimesheetNL(
  text: string,
  ctx: ParseContext,
): Promise<ParseResult> {
  const warnings: string[] = [];
  const start = Date.now();

  let rawText = "";
  let llmTokens: number | undefined;
  try {
    const response = await generate({
      prompt: buildPrompt(text, ctx),
      json: true,
      maxTokens: 1024,
    });
    rawText = response.text;
    llmTokens = response.outputTokens;
  } catch (err) {
    return {
      commands: [],
      inferredDate: todayISODate(ctx.now),
      warnings,
      error: `LLM call failed: ${err instanceof Error ? err.message : String(err)}`,
      durationMs: Date.now() - start,
    };
  }

  const durationMs = Date.now() - start;
  const cleaned = stripCodeFences(rawText);

  let parsed: LLMJson;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    return {
      commands: [],
      inferredDate: todayISODate(ctx.now),
      warnings,
      error: "LLM output not valid JSON",
      llmResponseRaw: rawText,
      durationMs,
      llmTokens,
    };
  }

  if (typeof parsed.error === "string" && parsed.error.length > 0) {
    return {
      commands: [],
      inferredDate: todayISODate(ctx.now),
      warnings,
      error: parsed.error,
      llmResponseRaw: rawText,
      durationMs,
      llmTokens,
    };
  }

  if (!Array.isArray(parsed.entries)) {
    return {
      commands: [],
      inferredDate: todayISODate(ctx.now),
      warnings,
      error: "LLM output missing 'entries' array",
      llmResponseRaw: rawText,
      durationMs,
      llmTokens,
    };
  }

  if (parsed.entries.length === 0) {
    return {
      commands: [],
      inferredDate: todayISODate(ctx.now),
      warnings,
      error: "No entries produced",
      llmResponseRaw: rawText,
      durationMs,
      llmTokens,
    };
  }

  const knownEmployersLower = new Map<string, string>();
  for (const e of ctx.employers) knownEmployersLower.set(e.toLowerCase(), e);

  const commands: ReviewCommand[] = [];
  const dates: string[] = [];

  for (let i = 0; i < parsed.entries.length; i++) {
    const e = parsed.entries[i];
    const idx = i + 1;

    if (typeof e.hours !== "number" || !Number.isFinite(e.hours) || e.hours <= 0 || e.hours > 12) {
      return {
        commands: [],
        inferredDate: todayISODate(ctx.now),
        warnings,
        error: `Entry ${idx}: invalid hours (${e.hours}). Must be > 0 and <= 12.`,
        llmResponseRaw: rawText,
        durationMs,
        llmTokens,
      };
    }

    if (typeof e.employer !== "string" || e.employer.length === 0) {
      return {
        commands: [],
        inferredDate: todayISODate(ctx.now),
        warnings,
        error: `Entry ${idx}: missing employer`,
        llmResponseRaw: rawText,
        durationMs,
        llmTokens,
      };
    }
    const normalizedEmployer = knownEmployersLower.get(e.employer.toLowerCase());
    if (!normalizedEmployer) {
      return {
        commands: [],
        inferredDate: todayISODate(ctx.now),
        warnings,
        error: `Entry ${idx}: unknown employer "${e.employer}". Known: ${ctx.employers.join(", ")}`,
        llmResponseRaw: rawText,
        durationMs,
        llmTokens,
      };
    }

    if (typeof e.category !== "string" || !VALID_CATEGORIES.has(e.category)) {
      return {
        commands: [],
        inferredDate: todayISODate(ctx.now),
        warnings,
        error: `Entry ${idx}: invalid category "${e.category}". Valid: ${[...VALID_CATEGORIES].join(", ")}`,
        llmResponseRaw: rawText,
        durationMs,
        llmTokens,
      };
    }

    if (typeof e.description !== "string" || e.description.length === 0) {
      return {
        commands: [],
        inferredDate: todayISODate(ctx.now),
        warnings,
        error: `Entry ${idx}: missing description`,
        llmResponseRaw: rawText,
        durationMs,
        llmTokens,
      };
    }

    if (e.date !== undefined && !DATE_RE.test(e.date)) {
      return {
        commands: [],
        inferredDate: todayISODate(ctx.now),
        warnings,
        error: `Entry ${idx}: invalid date "${e.date}". Expected YYYY-MM-DD.`,
        llmResponseRaw: rawText,
        durationMs,
        llmTokens,
      };
    }

    if (e.start_time !== undefined && !TIME_RE.test(e.start_time)) {
      return {
        commands: [],
        inferredDate: todayISODate(ctx.now),
        warnings,
        error: `Entry ${idx}: invalid start_time "${e.start_time}". Expected "H:MMa" or "H:MMp".`,
        llmResponseRaw: rawText,
        durationMs,
        llmTokens,
      };
    }
    if (e.end_time !== undefined && !TIME_RE.test(e.end_time)) {
      return {
        commands: [],
        inferredDate: todayISODate(ctx.now),
        warnings,
        error: `Entry ${idx}: invalid end_time "${e.end_time}". Expected "H:MMa" or "H:MMp".`,
        llmResponseRaw: rawText,
        durationMs,
        llmTokens,
      };
    }

    const cmd: ReviewCommand = {
      type: "add",
      hours: e.hours,
      employerId: normalizedEmployer,
      category: e.category,
      description: e.description,
    };
    if (e.start_time) (cmd as { startTime?: string }).startTime = e.start_time;
    if (e.end_time) (cmd as { endTime?: string }).endTime = e.end_time;
    commands.push(cmd);
    dates.push(e.date ?? todayISODate(ctx.now));
  }

  const inferredDate = dates.slice().sort()[0];

  return {
    commands,
    inferredDate,
    warnings,
    llmResponseRaw: rawText,
    durationMs,
    llmTokens,
  };
}
