import type { WikiFrontmatter, Author } from "../types.js";

export interface TransformResult {
  id: string;
  filePath: string;
  content: string;
}

export interface ResolvedResults extends Array<TransformResult> {
  resolvedCount: number;
  unresolvedCount: number;
}

export function slugFromId(id: string): string {
  return id.replace(/_/g, "-");
}

export function makeWikiFrontmatter(opts: {
  title: string;
  sources: string[];
  tags: string[];
}): WikiFrontmatter {
  const now = new Date().toISOString();
  return {
    title: opts.title,
    author: "ai" as Author,
    created_at: now,
    last_ai_edit: now,
    last_human_edit: null,
    last_embedded_hash: null,
    sources: opts.sources,
    tags: opts.tags,
  };
}

export function validateWikiFrontmatter(
  fm: Record<string, unknown>,
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (typeof fm.title !== "string" || !fm.title) errors.push("missing or empty 'title'");
  if (fm.author !== "ai" && fm.author !== "human") errors.push("'author' must be 'ai' or 'human'");
  if (typeof fm.created_at !== "string") errors.push("missing 'created_at'");
  if (typeof fm.last_ai_edit !== "string") errors.push("missing 'last_ai_edit'");
  if (!Array.isArray(fm.sources)) errors.push("'sources' must be an array");
  if (!Array.isArray(fm.tags)) errors.push("'tags' must be an array");
  return { valid: errors.length === 0, errors };
}

const REF_PATTERN = /\[\[ref:([^\]]+)\]\]/g;

export function resolveLinks(results: TransformResult[]): ResolvedResults {
  // Build ID → filename map (filename without .md extension for Obsidian links)
  const idToFilename = new Map<string, string>();
  for (const r of results) {
    const filename = r.filePath.replace(/^wiki\//, "").replace(/\.md$/, "");
    idToFilename.set(r.id, filename);
  }

  let resolvedCount = 0;
  let unresolvedCount = 0;

  const resolved = results.map((r) => {
    const content = r.content.replace(REF_PATTERN, (_match, refId: string) => {
      let filename = idToFilename.get(refId);
      if (!filename) filename = idToFilename.get(slugFromId(refId));

      if (filename) {
        resolvedCount++;
        const basename = filename.split("/").pop()!;
        return `[[${basename}]]`;
      }
      unresolvedCount++;
      return `${refId} (unlinked)`;
    });
    return { ...r, content };
  });

  const arr = resolved as ResolvedResults;
  arr.resolvedCount = resolvedCount;
  arr.unresolvedCount = unresolvedCount;
  return arr;
}
