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

  /**
   * Hybrid search: vector similarity + keyword boosting.
   * Fetches 2x topK from vector search, then boosts chunks containing
   * query keywords. Returns topK results ordered by combined score.
   */
  async hybridSearch(
    queryVector: number[],
    queryText: string,
    topK: number,
  ): Promise<WikiChunk[]> {
    const table = await this.getTable();
    if (!table) return [];

    // Fetch 3x candidates from vector search for re-ranking
    const candidateLimit = Math.min(topK * 3, 50);
    const results = await table
      .vectorSearch(queryVector)
      .limit(candidateLimit)
      .toArray();

    // Extract keywords from query (lowercase, 3+ chars, no stop words)
    const stopWords = new Set([
      "the", "and", "for", "are", "but", "not", "you", "all", "can",
      "her", "was", "one", "our", "out", "has", "his", "how", "its",
      "may", "new", "now", "old", "see", "way", "who", "did", "get",
      "let", "say", "she", "too", "use", "what", "when", "where",
      "which", "with", "this", "that", "from", "have", "been", "does",
      "each", "make", "like", "long", "look", "many", "some", "than",
      "them", "then", "into", "just", "over", "such", "take", "about",
    ]);
    const keywords = queryText
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length >= 3 && !stopWords.has(w));

    // Score each candidate: vector rank + keyword boost
    const scored = results.map((r, index) => {
      const content = (r.content as string).toLowerCase();
      const heading = (r.heading as string).toLowerCase();
      const breadcrumb = (r.breadcrumb as string).toLowerCase();
      const allText = `${content} ${heading} ${breadcrumb}`;

      // Vector score: inverse rank (higher = better)
      const vectorScore = 1.0 - index / candidateLimit;

      // Keyword score: fraction of query keywords found in chunk
      let keywordHits = 0;
      for (const kw of keywords) {
        if (allText.includes(kw)) keywordHits++;
      }
      const keywordScore = keywords.length > 0 ? keywordHits / keywords.length : 0;

      // Combined score: 60% vector + 40% keyword
      const combinedScore = vectorScore * 0.6 + keywordScore * 0.4;

      return { row: r, combinedScore };
    });

    // Sort by combined score (descending) and take topK
    scored.sort((a, b) => b.combinedScore - a.combinedScore);
    const topResults = scored.slice(0, topK);

    return topResults.map((s) => ({
      id: s.row.id as string,
      filePath: s.row.filePath as string,
      breadcrumb: s.row.breadcrumb as string,
      heading: s.row.heading as string,
      content: s.row.content as string,
      sectionHash: s.row.sectionHash as string,
    }));
  }

  async listAll(): Promise<(WikiChunk & { vector: number[] })[]> {
    const table = await this.getTable();
    if (!table) return [];

    const results = await table.query().toArray();

    return results.map((r) => ({
      id: r.id as string,
      filePath: r.filePath as string,
      breadcrumb: r.breadcrumb as string,
      heading: r.heading as string,
      content: r.content as string,
      sectionHash: r.sectionHash as string,
      vector: Array.from(r.vector as Float32Array),
    }));
  }
}
