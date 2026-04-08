import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { slugify } from "../sources/slug.js";
import { writeFrontmatter } from "../frontmatter.js";

export interface IngestInput {
  content: string;
  source: string;
  title?: string | null;
  metadata?: Record<string, unknown> | null;
  vaultRoot: string;
}

export interface IngestResult {
  source_id: string;
  raw_path: string;
  ingested_at: string;
}

function firstLine(text: string): string {
  const line = text.split("\n").find((l) => l.trim().length > 0) ?? "untitled";
  return line.replace(/^#+\s*/, "").trim();
}

export function ingestContent(input: IngestInput): IngestResult {
  const { content, source, title, metadata, vaultRoot } = input;

  const slug = `${slugify(title ?? firstLine(content))}-${Date.now()}`;
  const relativePath = `api/articles/${slug}.md`;
  const rawPath = `raw/${relativePath}`;
  const fullPath = join(vaultRoot, rawPath);

  mkdirSync(join(fullPath, ".."), { recursive: true });

  const now = new Date().toISOString();
  const frontmatter: Record<string, unknown> = {
    ...(metadata ?? {}),
    status: "pending",
    source_type: "api",
    channel: source,
    source_id: relativePath,
    ingested_at: now,
    parsed_at: null,
    compiled_to: null,
    processed_at: null,
    retry_count: 0,
    last_error: null,
    compile_progress: null,
  };

  writeFrontmatter(fullPath, frontmatter, content);

  return { source_id: relativePath, raw_path: rawPath, ingested_at: now };
}
