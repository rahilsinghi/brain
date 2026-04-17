import type { TimesheetDB } from "./db.js";
import { applyReviewCommands } from "./telegram-review.js";
import { parseTimesheetNL, type ParseContext } from "./nl-parser.js";

export type NLSource =
  | "telegram_text"
  | "telegram_voice"
  | "mcp"
  | "cli"
  | "api";

export interface HandlerDeps {
  now: Date;
  timezone: string;
  db: TimesheetDB;
  source: NLSource;
}

export async function handleTimesheetNL(
  text: string,
  deps: HandlerDeps,
): Promise<string> {
  const trimmed = text.trim();
  if (!trimmed) {
    deps.db.logNLParse({
      timestamp: deps.now.toISOString(),
      source: deps.source,
      input_text: text,
      llm_response: null,
      entries_created: 0,
      error: "empty input",
      duration_ms: 0,
      llm_tokens: null,
    });
    return "✗ Empty input. Try: /ts 2h maison coding 3-5pm";
  }

  const ctx: ParseContext = {
    now: deps.now,
    timezone: deps.timezone,
    employers: deps.db.getEmployerIds(),
  };

  const parse = await parseTimesheetNL(trimmed, ctx);

  deps.db.logNLParse({
    timestamp: deps.now.toISOString(),
    source: deps.source,
    input_text: trimmed,
    llm_response: parse.llmResponseRaw ?? null,
    entries_created: parse.commands.length,
    error: parse.error ?? null,
    duration_ms: parse.durationMs ?? null,
    llm_tokens: parse.llmTokens ?? null,
  });

  console.log(
    `[ts-nl] parse(${deps.source}, ${trimmed.length} chars) → ${
      parse.error ? `error: ${parse.error}` : `${parse.commands.length} entries`
    } in ${parse.durationMs ?? 0}ms${parse.llmTokens ? ` (${parse.llmTokens} tok)` : ""}`,
  );

  if (parse.error) {
    return `✗ ${parse.error}`;
  }

  // Apply each add command individually so we can surface per-entry results.
  // applyReviewCommands accepts a single date; for NL-inserted entries we use
  // inferredDate (earliest date across all parsed entries).
  const results = applyReviewCommands(
    deps.db,
    parse.commands,
    [],
    parse.inferredDate,
  );

  const successCount = results.filter((r) => r.success).length;
  const lines: string[] = [];
  lines.push(`✓ Added ${successCount} entries`);

  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    const cmd = parse.commands[i] as {
      hours: number;
      employerId: string;
      category: string;
      description: string;
      startTime?: string;
      endTime?: string;
    };
    if (r.success) {
      const timeSuffix =
        cmd.startTime && cmd.endTime
          ? ` ${cmd.startTime}–${cmd.endTime}`
          : "";
      lines.push(
        `  • ${cmd.hours}h ${cmd.employerId} (${cmd.category}${timeSuffix}) — ${cmd.description}`,
      );
    } else {
      lines.push(`  ✗ ${r.error ?? r.message}`);
    }
  }

  lines.push("Reply with #N = Xh to edit or drop #N to remove.");
  return lines.join("\n");
}
