import { readFileSync, writeFileSync } from "node:fs";
import { stringify as yamlStringify, parse as yamlParse } from "yaml";
import type { RawFrontmatter, SourceType } from "./types.js";

const FM_REGEX = /^---\n([\s\S]*?)\n---\n/;

export interface ParsedFile<T = Record<string, unknown>> {
  data: T;
  content: string;
}

export function readFrontmatter<T = Record<string, unknown>>(filePath: string): ParsedFile<T> {
  const raw = readFileSync(filePath, "utf-8");
  const match = raw.match(FM_REGEX);
  if (!match) return { data: {} as T, content: raw };
  const data = yamlParse(match[1]) as T;
  const content = raw.slice(match[0].length);
  return { data, content };
}

export function writeFrontmatter(filePath: string, data: Record<string, unknown>, content: string): void {
  const yaml = yamlStringify(data, { lineWidth: 0 }).trim();
  const output = `---\n${yaml}\n---\n\n${content}`;
  writeFileSync(filePath, output, "utf-8");
}

export function updateFrontmatter(filePath: string, updates: Record<string, unknown>): void {
  const { data, content } = readFrontmatter(filePath);
  const merged = { ...data, ...updates };
  writeFrontmatter(filePath, merged, content);
}

export function injectRawFrontmatter(filePath: string, sourceType: SourceType): void {
  const raw = readFileSync(filePath, "utf-8");
  if (FM_REGEX.test(raw)) return;
  const fm: RawFrontmatter = {
    status: "unparsed",
    source_type: sourceType,
    ingested_at: new Date().toISOString(),
    parsed_at: null,
    compiled_to: null,
    processed_at: null,
    retry_count: 0,
    last_error: null,
    compile_progress: null,
  };
  writeFrontmatter(filePath, fm as unknown as Record<string, unknown>, raw);
}
