import { resolve } from "node:path";
import { SyncOrchestrator } from "./orchestrator.js";
import { JsonSyncStateStore } from "./state.js";
import type { SyncSource, SyncRunReport } from "./types.js";

// Entry point for /brain-sync command.
// When invoked inside Claude Code, MCP tool functions are available in the
// execution context. Callers inject these as dependencies to createGmailSource
// and createMarkpushSource — this module is tied to the Claude Code runtime
// for MCP-backed sources.

export async function runSync(
  sources: SyncSource[],
  vaultRoot?: string,
): Promise<SyncRunReport> {
  const root = vaultRoot ?? resolve(import.meta.dirname, "../..");
  const store = new JsonSyncStateStore(root);
  const orchestrator = new SyncOrchestrator(root, store);
  return orchestrator.run(sources);
}

export function formatReport(report: SyncRunReport, quiet: boolean): string {
  const lines: string[] = [];

  for (const [source, result] of Object.entries(report.results)) {
    const hasErrors = result.errors.length > 0;
    const hasItems = result.itemsIngested > 0;

    if (quiet && !hasErrors && !hasItems) continue;

    if (hasErrors) {
      lines.push(`[brain-sync] ${source}: ERROR — ${result.errors.join(", ")}`);
    } else if (hasItems) {
      lines.push(
        `[brain-sync] ${source}: ${result.itemsIngested} new, ${result.itemsSkipped} skipped`,
      );
    } else {
      lines.push(`[brain-sync] ${source}: no new items`);
    }
  }

  return lines.join("\n");
}

export async function main(
  sources: SyncSource[],
  opts: { quiet: boolean } = { quiet: false },
): Promise<void> {
  const report = await runSync(sources);
  const output = formatReport(report, opts.quiet);
  if (output) console.log(output);
}
