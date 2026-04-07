import { readFileSync, writeFileSync, renameSync, existsSync } from "node:fs";
import { join } from "node:path";
import type { SyncStateStore, SourceSyncState } from "./types.js";

const MAX_PROCESSED_IDS = 500;

interface StateFile {
  [sourceName: string]: SourceSyncState;
}

export class JsonSyncStateStore implements SyncStateStore {
  private filePath: string;
  private tmpPath: string;

  constructor(vaultRoot: string) {
    this.filePath = join(vaultRoot, ".brain", "sync-state.json");
    this.tmpPath = join(vaultRoot, ".brain", "sync-state.tmp.json");
  }

  load(sourceName: string): SourceSyncState {
    const all = this.readAll();
    return all[sourceName] ?? { last_poll: null, processed_ids: [] };
  }

  save(sourceName: string, state: SourceSyncState): void {
    const all = this.readAll();
    const pruned =
      state.processed_ids.length > MAX_PROCESSED_IDS
        ? state.processed_ids.slice(-MAX_PROCESSED_IDS)
        : state.processed_ids;
    all[sourceName] = { ...state, processed_ids: pruned };
    writeFileSync(this.tmpPath, JSON.stringify(all, null, 2), "utf-8");
    renameSync(this.tmpPath, this.filePath);
  }

  private readAll(): StateFile {
    if (!existsSync(this.filePath)) return {};
    const raw = readFileSync(this.filePath, "utf-8");
    return JSON.parse(raw) as StateFile;
  }
}
