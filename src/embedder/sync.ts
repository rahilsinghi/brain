import { createHash } from "node:crypto";
import { readdirSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { readFrontmatter, updateFrontmatter } from "../frontmatter.js";
import { chunkMarkdown } from "./chunker.js";
import { extractFacts } from "./fact-extractor.js";
import { VectorStore } from "./vector-store.js";
import type { WikiChunk } from "../types.js";

export function computeContentHash(content: string): string {
  return createHash("sha256").update(content).digest("hex").slice(0, 16);
}

export function shouldReembed(filePath: string): boolean {
  const { data, content } = readFrontmatter(filePath);
  const storedHash = data.last_embedded_hash as string | null;
  if (!storedHash) return true;
  // readFrontmatter returns content with a leading \n (from the \n\n separator
  // writeFrontmatter inserts between the closing --- and the body). Strip it so
  // the hash is computed against the canonical body string.
  const normalizedContent = content.startsWith("\n") ? content.slice(1) : content;
  const currentHash = computeContentHash(normalizedContent);
  return storedHash !== currentHash;
}

function collectWikiFiles(wikiDir: string): string[] {
  const files: string[] = [];
  if (!existsSync(wikiDir)) return files;

  for (const entry of readdirSync(wikiDir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const fullPath = join(wikiDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectWikiFiles(fullPath));
    } else if (entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }
  return files;
}

export async function syncFile(
  filePath: string,
  vaultRoot: string,
  store: VectorStore
): Promise<number> {
  const { content } = readFrontmatter(filePath);
  const relPath = relative(vaultRoot, filePath);

  await store.deleteByFilePath(relPath);

  const chunks = chunkMarkdown(content, relPath);
  if (chunks.length === 0) return 0;

  // Extract structured facts (tables, bold-key patterns, frontmatter)
  // and add as a companion chunk for better factual retrieval
  const { data } = readFrontmatter(filePath);
  const articleTitle = (data.title as string) || relPath;
  const factsText = extractFacts(content, articleTitle);
  if (factsText) {
    chunks.push({
      id: `${relPath}::FACTS`,
      filePath: relPath,
      breadcrumb: `${articleTitle} → Extracted Facts`,
      heading: "Extracted Facts",
      content: factsText,
      sectionHash: createHash("sha256").update(factsText).digest("hex").slice(0, 12),
    });
  }

  const { embed } = await import("./embedder.js");
  const chunksWithVectors: WikiChunk[] = [];
  try {
    for (const chunk of chunks) {
      const contextText = `${chunk.breadcrumb}\n\n${chunk.content}`;
      const vector = await embed(contextText);
      chunksWithVectors.push({ ...chunk, vector });
    }
  } catch (error) {
    // Clean up: delete any partial chunks that may have been stored
    await store.deleteByFilePath(relPath);
    throw error;
  }

  await store.upsertChunks(chunksWithVectors);

  const hash = computeContentHash(content);
  updateFrontmatter(filePath, { last_embedded_hash: hash });

  return chunksWithVectors.length;
}

export async function syncAll(
  vaultRoot: string,
  store: VectorStore
): Promise<{ synced: number; skipped: number; chunks: number }> {
  const wikiDir = join(vaultRoot, "wiki");
  const files = collectWikiFiles(wikiDir);
  let synced = 0;
  let skipped = 0;
  let totalChunks = 0;

  for (const file of files) {
    if (!shouldReembed(file)) {
      skipped++;
      continue;
    }
    const count = await syncFile(file, vaultRoot, store);
    totalChunks += count;
    synced++;
  }

  return { synced, skipped, chunks: totalChunks };
}
