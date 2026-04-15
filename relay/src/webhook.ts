import type { InboundType } from "./types.js";

export interface ClassifyResult {
  type: InboundType | "timesheet_command";
  command?: string;
  reply_to_queue_id?: string;
}

const TIMESHEET_ENTRY_RE = /^\+\d+(?:\.\d+)?h\s/;

const TIMESHEET_COMMANDS = new Set([
  "ts",
  "eod",
  "finalize",
  "invoice",
  "start",
  "help",
  "status",
  "slides",
  "plot",
]);

export function classifyMessage(
  text: string,
  replyToOutboundId: string | null,
): ClassifyResult {
  if (replyToOutboundId !== null) {
    return { type: "timesheet_reply", reply_to_queue_id: replyToOutboundId };
  }

  if (text.startsWith("?")) {
    return { type: "query" };
  }

  if (TIMESHEET_ENTRY_RE.test(text)) {
    return { type: "timesheet_entry" };
  }

  if (text.startsWith("/")) {
    const command = text.slice(1).split(/\s+/)[0];
    if (command !== undefined && TIMESHEET_COMMANDS.has(command)) {
      return { type: "timesheet_command", command };
    }
  }

  return { type: "ingest" };
}

export function getAckMessage(type: string): string {
  switch (type) {
    case "ingest":
      return "⏳ Queued for ingestion";
    case "query":
      return "🔍 Queued — will answer when brain is online";
    case "voice":
    case "audio":
      return "🎤 Saved — will transcribe when brain is online";
    case "timesheet_entry":
    case "timesheet_command":
    case "timesheet_reply":
      return "⏱ Queued";
    default:
      return "⏳ Queued";
  }
}
