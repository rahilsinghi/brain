import * as lancedb from "@lancedb/lancedb";
import type { WikiChunk } from "../types.js";

const TABLE_NAME = "wiki_chunks";

export class VectorStore {
  private dbPath: string;
  private db: lancedb.Connection | null = null;

  constructor(dbPath: string) {
    this.dbPath = dbPath;
  }

  async init(): Promise<void> {
    this.db = await lancedb.connect(this.dbPath);
  }

  private async getTable(): Promise<lancedb.Table | null> {
    if (!this.db) throw new Error("VectorStore not initialized");
    const tables = await this.db.tableNames();
    if (!tables.includes(TABLE_NAME)) return null;
    return this.db.openTable(TABLE_NAME);
  }

  async upsertChunks(chunks: WikiChunk[]): Promise<void> {
    if (!this.db) throw new Error("VectorStore not initialized");
    if (chunks.length === 0) return;

    const records = chunks.map((c) => ({
      id: c.id,
      filePath: c.filePath,
      breadcrumb: c.breadcrumb,
      heading: c.heading,
      content: c.content,
      sectionHash: c.sectionHash,
      vector: c.vector ?? new Array(768).fill(0),
    }));

    const table = await this.getTable();
    if (table) {
      const filePaths = [...new Set(chunks.map((c) => c.filePath))];
      for (const fp of filePaths) {
        const escaped = fp.replace(/'/g, "''");
        await table.delete(`filePath = '${escaped}'`);
      }
      await table.add(records);
    } else {
      await this.db.createTable(TABLE_NAME, records);
    }
  }

  async deleteByFilePath(filePath: string): Promise<void> {
    const table = await this.getTable();
    if (!table) return;
    const escaped = filePath.replace(/'/g, "''");
    await table.delete(`filePath = '${escaped}'`);
  }

  async search(queryVector: number[], topK: number): Promise<WikiChunk[]> {
    const table = await this.getTable();
    if (!table) return [];

    const results = await table
      .vectorSearch(queryVector)
      .limit(topK)
      .toArray();

    return results.map((r) => ({
      id: r.id as string,
      filePath: r.filePath as string,
      breadcrumb: r.breadcrumb as string,
      heading: r.heading as string,
      content: r.content as string,
      sectionHash: r.sectionHash as string,
    }));
  }
}
