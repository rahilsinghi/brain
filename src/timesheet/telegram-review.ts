import type { TimesheetDB } from "./db.js";
import type { EntryCategory } from "./types.js";


// ── Command types ──

export type ReviewCommand =
  | { type: "approve_all" }
  | { type: "adjust"; entryIndex: number; hours: number; category?: string; description?: string }
  | { type: "drop"; entryIndex: number }
  | { type: "add"; hours: number; employerId: string; category: string; description: string; startTime?: string; endTime?: string }
  | { type: "repo_map"; repoPattern: string; employerId: string }
  | { type: "unknown"; raw: string };

export interface CommandResult {
  success: boolean;
  message: string;
  error?: string;
  newEntryId?: string;
}

// ── Regex patterns ──

const RE_OK = /^ok$/i;
const RE_ADJUST = /^#(\d+)\s*=\s*(\d+(?:\.\d+)?)h(?:\s+(\S+)\s+(.+))?$/i;
const RE_DROP = /^drop\s+#(\d+)$/i;
const RE_ADD_WITH_TIMES = /^\+(\d+(?:\.\d+)?)h\s+(\S+)\s+(\S+)\s+(.+?)\s+(\d{1,2}:\d{2}[ap])-(\d{1,2}:\d{2}[ap])$/i;
const RE_ADD = /^\+(\d+(?:\.\d+)?)h\s+(\S+)\s+(\S+)\s+(.+)$/i;
const RE_REPO = /^repo\s+(\S+)\s*=\s*(\S+)$/i;

// ── Parser (pure, no side effects) ──

export function parseReviewCommands(text: string): ReviewCommand[] {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const commands: ReviewCommand[] = [];

  for (const line of lines) {
    let match: RegExpMatchArray | null;

    if (RE_OK.test(line)) {
      commands.push({ type: "approve_all" });
      continue;
    }

    match = line.match(RE_DROP);
    if (match) {
      commands.push({ type: "drop", entryIndex: parseInt(match[1], 10) });
      continue;
    }

    match = line.match(RE_ADJUST);
    if (match) {
      const cmd: ReviewCommand = {
        type: "adjust",
        entryIndex: parseInt(match[1], 10),
        hours: parseFloat(match[2]),
      };
      if (match[3] && match[4]) {
        (cmd as { category?: string }).category = match[3];
        (cmd as { description?: string }).description = match[4];
      }
      commands.push(cmd);
      continue;
    }

    match = line.match(RE_ADD_WITH_TIMES);
    if (match) {
      commands.push({
        type: "add",
        hours: parseFloat(match[1]),
        employerId: match[2],
        category: match[3],
        description: match[4],
        startTime: match[5],
        endTime: match[6],
      });
      continue;
    }

    match = line.match(RE_ADD);
    if (match) {
      commands.push({
        type: "add",
        hours: parseFloat(match[1]),
        employerId: match[2],
        category: match[3],
        description: match[4],
      });
      continue;
    }

    match = line.match(RE_REPO);
    if (match) {
      commands.push({
        type: "repo_map",
        repoPattern: match[1],
        employerId: match[2],
      });
      continue;
    }

    commands.push({ type: "unknown", raw: line });
  }

  return commands;
}

// ── Applier (mutates DB) ──

export function applyReviewCommands(
  db: TimesheetDB,
  commands: ReviewCommand[],
  entryIds: string[],
  date: string,
): CommandResult[] {
  const results: CommandResult[] = [];

  for (const cmd of commands) {
    switch (cmd.type) {
      case "approve_all": {
        for (const id of entryIds) {
          db.updateEntryStatus(id, "reviewed");
        }
        results.push({
          success: true,
          message: `Approved ${entryIds.length} entries.`,
        });
        break;
      }

      case "adjust": {
        const idx = cmd.entryIndex - 1; // 1-based to 0-based
        if (idx < 0 || idx >= entryIds.length) {
          results.push({
            success: false,
            message: `#${cmd.entryIndex} failed`,
            error: `Entry #${cmd.entryIndex} out of range (1–${entryIds.length})`,
          });
          break;
        }
        const entryId = entryIds[idx];
        const entry = db.getEntry(entryId);
        if (!entry) {
          results.push({
            success: false,
            message: `#${cmd.entryIndex} not found`,
            error: `Entry not found in DB`,
          });
          break;
        }

        // Recalculate end_time from start_time + new hours
        const startMs = new Date(entry.start_time).getTime();
        const newEndTime = new Date(startMs + cmd.hours * 3_600_000).toISOString();
        db.updateEntryHours(entryId, cmd.hours, newEndTime);

        if (cmd.category) {
          db.updateEntryCategory(entryId, cmd.category);
        }
        if (cmd.description) {
          db.updateEntryDescription(entryId, cmd.description);
        }

        results.push({
          success: true,
          message: `#${cmd.entryIndex} → ${cmd.hours}h`,
        });
        break;
      }

      case "drop": {
        const idx = cmd.entryIndex - 1;
        if (idx < 0 || idx >= entryIds.length) {
          results.push({
            success: false,
            message: `drop #${cmd.entryIndex} failed`,
            error: `Entry #${cmd.entryIndex} out of range (1–${entryIds.length})`,
          });
          break;
        }
        db.updateEntryStatus(entryIds[idx], "ignored");
        results.push({
          success: true,
          message: `Dropped #${cmd.entryIndex}`,
        });
        break;
      }

      case "add": {
        const now = new Date();
        const startTime = cmd.startTime
          ? parseTimeToISO(date, cmd.startTime)
          : now.toISOString();
        const endTime = cmd.endTime
          ? parseTimeToISO(date, cmd.endTime)
          : new Date(new Date(startTime).getTime() + cmd.hours * 3_600_000).toISOString();

        const newId = db.insertEntry({
          date,
          employer_id: cmd.employerId,
          hours: cmd.hours,
          start_time: startTime,
          end_time: endTime,
          category: cmd.category as EntryCategory,
          description: cmd.description,
          source: "manual",
          confidence: "high",
        });
        results.push({
          success: true,
          message: `Added ${cmd.hours}h ${cmd.employerId}`,
          newEntryId: newId,
        });
        break;
      }

      case "repo_map": {
        db.upsertRepoMapping(cmd.repoPattern, cmd.employerId, "telegram");
        results.push({
          success: true,
          message: `Mapped ${cmd.repoPattern} → ${cmd.employerId}`,
        });
        break;
      }

      case "unknown": {
        results.push({
          success: false,
          message: `Unknown command`,
          error: `Could not parse: "${cmd.raw}"`,
        });
        break;
      }
    }
  }

  return results;
}

// ── Helpers ──

function parseTimeToISO(date: string, timeStr: string): string {
  // Parse "9:00a" or "11:30p" format
  const match = timeStr.match(/^(\d{1,2}):(\d{2})([ap])$/i);
  if (!match) return `${date}T12:00:00`;

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const ampm = match[3].toLowerCase();

  if (ampm === "p" && hours !== 12) hours += 12;
  if (ampm === "a" && hours === 12) hours = 0;

  return `${date}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
}

