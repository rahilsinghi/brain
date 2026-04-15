import { existsSync, unlinkSync } from "node:fs";
import type { RelayDB } from "./db.js";

interface StaleFileRow {
  id: string;
  file_path: string;
}

export function cleanupOldFiles(
  db: RelayDB,
  filesDir: string,
  maxAgeDays = 7,
): number {
  const cutoff = new Date(Date.now() - maxAgeDays * 24 * 60 * 60 * 1000);
  const cutoffISO = cutoff.toISOString();

  const rows = (db as unknown as { db: { prepare: (sql: string) => { all: (arg: string) => StaleFileRow[] } } }).db
    .prepare(
      `SELECT id, file_path FROM inbound_queue
       WHERE file_path IS NOT NULL AND status IN ('completed', 'failed')
       AND processed_at IS NOT NULL AND processed_at < ?`,
    )
    .all(cutoffISO);

  let deleted = 0;
  for (const row of rows) {
    if (existsSync(row.file_path)) {
      unlinkSync(row.file_path);
      deleted++;
    }
  }
  return deleted;
}
