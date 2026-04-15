import { writeFileSync, mkdirSync } from "node:fs";
import { join, extname } from "node:path";
import type { RelayClient } from "./client.js";
import type { RelayInboundItem } from "./types.js";

const MAX_RESPONSE_LENGTH = 4096;
const MAX_RETRIES = 3;

export interface SyncDeps {
  client: RelayClient;
  ingestFn: (input: {
    content: string;
    source: string;
    vaultRoot: string;
  }) => { source_id: string };
  synthesizeFn: (
    query: string,
    store: unknown,
    topK: number,
  ) => Promise<{ answer: string }>;
  store: unknown;
  topK: number;
  vaultRoot: string;
  voiceDir: string;
}

async function processItem(
  item: RelayInboundItem,
  deps: SyncDeps,
): Promise<string> {
  switch (item.type) {
    case "ingest": {
      const result = deps.ingestFn({
        content: item.raw_text ?? "",
        source: "telegram",
        vaultRoot: deps.vaultRoot,
      });
      return `Saved. (${result.source_id})`;
    }

    case "query": {
      const query = (item.raw_text ?? "").replace(/^\?/, "").trim();
      const result = await deps.synthesizeFn(query, deps.store, deps.topK);
      const answer = result.answer;
      return answer.length > MAX_RESPONSE_LENGTH
        ? answer.slice(0, MAX_RESPONSE_LENGTH)
        : answer;
    }

    case "voice":
    case "audio": {
      if (item.file_status === "download_failed") {
        throw new DownloadFailedError(
          `File download failed for ${item.file_path ?? "unknown"}`,
        );
      }

      const fileName = item.file_path ?? "unknown";
      const data = await deps.client.downloadFile(fileName);

      mkdirSync(deps.voiceDir, { recursive: true });
      const ext = extname(fileName) || ".ogg";
      const outPath = join(deps.voiceDir, `${Date.now()}${ext}`);
      writeFileSync(outPath, Buffer.from(data));

      return "Transcribed (processing via voice pipeline)";
    }

    case "timesheet_entry":
      return "Timesheet entry queued";

    case "timesheet_command":
      return "Command received";

    case "timesheet_reply":
      return "Reply received";

    default:
      return `Unknown type: ${item.type}`;
  }
}

class DownloadFailedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DownloadFailedError";
  }
}

export async function syncRelayInbound(
  deps: SyncDeps,
): Promise<{ processed: number; failed: number }> {
  const items = await deps.client.fetchPending();
  let processed = 0;
  let failed = 0;

  for (const item of items) {
    let success = false;
    let lastError: string | null = null;

    // Download failures are not retryable
    if (
      (item.type === "voice" || item.type === "audio") &&
      item.file_status === "download_failed"
    ) {
      const errMsg = `File download failed for ${item.file_path ?? "unknown"}`;
      try {
        await deps.client.postFail(item.id, errMsg);
      } catch {
        // ignore postFail errors
      }
      failed++;
      continue;
    }

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        const response = await processItem(item, deps);
        await deps.client.postResponse(item.id, response, "completed");
        success = true;
        break;
      } catch (err) {
        lastError =
          err instanceof Error ? err.message : String(err);
      }
    }

    if (success) {
      processed++;
    } else {
      try {
        await deps.client.postFail(item.id, lastError ?? "Unknown error");
      } catch {
        // ignore postFail errors
      }
      failed++;
    }
  }

  return { processed, failed };
}
