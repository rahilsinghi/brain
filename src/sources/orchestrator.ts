import { mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { writeFrontmatter } from "../frontmatter.js";
import type {
  SyncSource,
  SyncStateStore,
  SyncRunReport,
  SourceReport,
  RawDrop,
} from "./types.js";

export class SyncOrchestrator {
  private vaultRoot: string;
  private store: SyncStateStore;

  constructor(vaultRoot: string, store: SyncStateStore) {
    this.vaultRoot = vaultRoot;
    this.store = store;
  }

  async run(sources: SyncSource[]): Promise<SyncRunReport> {
    const report: SyncRunReport = {
      timestamp: new Date().toISOString(),
      results: {},
    };

    for (const source of sources) {
      const sourceReport: SourceReport = {
        itemsIngested: 0,
        itemsSkipped: 0,
        errors: [],
      };
      report.results[source.name] = sourceReport;

      try {
        const state = this.store.load(source.name);
        const processedSet = new Set(state.processed_ids);

        const result = await source.poll(state);
        const newProcessedIds: string[] = [];

        for (const drop of result.newItems) {
          if (processedSet.has(drop.sourceId)) {
            sourceReport.itemsSkipped++;
            continue;
          }

          try {
            this.writeDrop(source.name, drop);
            newProcessedIds.push(drop.sourceId);
            sourceReport.itemsIngested++;
          } catch (writeErr: unknown) {
            const msg =
              writeErr instanceof Error ? writeErr.message : String(writeErr);
            sourceReport.errors.push(`${drop.sourceId}: ${msg}`);
          }
        }

        const now = new Date().toISOString();
        this.store.save(source.name, {
          last_poll: now,
          cursor: state.cursor,
          processed_ids: [...state.processed_ids, ...newProcessedIds],
        });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        sourceReport.errors.push(message);
      }
    }

    return report;
  }

  private writeDrop(sourceName: string, drop: RawDrop): void {
    const filePath = join(this.vaultRoot, "raw", drop.filename);
    mkdirSync(dirname(filePath), { recursive: true });

    const now = new Date().toISOString();
    const frontmatter: Record<string, unknown> = {
      status: "pending",
      source_type: sourceName,
      source_id: drop.sourceId,
      ingested_at: now,
      parsed_at: now,
      compiled_to: null,
      processed_at: null,
      retry_count: 0,
      last_error: null,
      compile_progress: null,
    };

    writeFrontmatter(filePath, frontmatter, drop.content);
  }
}
