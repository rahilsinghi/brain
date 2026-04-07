import type { SourceType } from "../types.js";

export interface SourceSyncState {
  last_poll: string | null;
  cursor?: string;
  processed_ids: string[];
}

export interface SyncResult {
  newItems: RawDrop[];
  processedIds: string[];
}

export interface RawDrop {
  filename: string;
  content: string;
  sourceId: string;
}

export interface SyncSource {
  name: SourceType;
  poll(state: SourceSyncState): Promise<SyncResult>;
}

export interface SyncStateStore {
  load(sourceName: string): SourceSyncState;
  save(sourceName: string, state: SourceSyncState): void;
}

export interface SourceReport {
  itemsIngested: number;
  itemsSkipped: number;
  errors: string[];
}

export interface SyncRunReport {
  timestamp: string;
  results: Record<string, SourceReport>;
}
