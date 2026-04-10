import { readdirSync, statSync } from "node:fs";
import { join, relative, extname, basename } from "node:path";
import { readFrontmatter, writeFrontmatter } from "../frontmatter.js";
import type { WikiFrontmatter } from "../types.js";

export interface BackfillOptions {
  dryRun: boolean;
}

export interface BackfillResult {
  resolved: number;
  dangling: number;
  filesModified: number;
  changes: Array<{ file: string; from: string; to: string }>;
}

const WIKILINK_RE = /\[\[([^\]|]+)(\|[^\]]+)?\]\]/g;
const SKIP_DIRS = new Set(["code-architecture"]);

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function walkDir(dir: string): string[] {
  const results: string[] = [];
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return results;
  }
  for (const entry of entries) {
    const full = join(dir, entry);
    const stat = statSync(full, { throwIfNoEntry: false });
    if (!stat) continue;
    if (stat.isDirectory()) {
      if (SKIP_DIRS.has(entry)) continue;
      results.push(...walkDir(full));
    } else if (extname(entry) === ".md" && basename(entry) !== "index.md") {
      results.push(full);
    }
  }
  return results;
}

export function backfillLinks(vaultRoot: string, options: BackfillOptions): BackfillResult {
  const wikiDir = join(vaultRoot, "wiki");
  const files = walkDir(wikiDir);

  // Build title → canonical title map (case-insensitive)
  const titleMap = new Map<string, string>();
  const slugMap = new Map<string, string>();
  const nodeIds = new Set<string>();

  for (const file of files) {
    const id = relative(wikiDir, file);
    nodeIds.add(id);
    const { data } = readFrontmatter<WikiFrontmatter>(file);
    const title = data.title ?? basename(file, ".md");
    const titleKey = title.toLowerCase();
    if (!titleMap.has(titleKey)) titleMap.set(titleKey, title);
    const slugKey = slugify(title);
    if (!slugMap.has(slugKey)) slugMap.set(slugKey, title);
  }

  const result: BackfillResult = { resolved: 0, dangling: 0, filesModified: 0, changes: [] };

  for (const file of files) {
    const { data, content } = readFrontmatter<WikiFrontmatter>(file);
    const relPath = relative(wikiDir, file);
    let fileChanged = false;

    const newContent = content.replace(
      WIKILINK_RE,
      (fullMatch: string, target: string, pipePart?: string) => {
        if (pipePart) return fullMatch;
        const trimmed = target.trim();
        if (trimmed.includes("/")) return fullMatch;
        if (trimmed.startsWith("/")) return fullMatch;

        // Check if bare filename resolves to an existing node path
        const withMd = trimmed.endsWith(".md") ? trimmed : trimmed + ".md";
        for (const nodeId of nodeIds) {
          if (nodeId.endsWith("/" + withMd)) return fullMatch;
        }

        // Title resolution (case-insensitive)
        const titleKey = trimmed.toLowerCase();
        const byTitle = titleMap.get(titleKey);
        if (byTitle) {
          if (trimmed === byTitle) return fullMatch;
          result.resolved++;
          result.changes.push({ file: relPath, from: trimmed, to: byTitle });
          fileChanged = true;
          return `[[${byTitle}]]`;
        }

        // Slug fallback
        const slugKey = slugify(trimmed);
        const bySlug = slugMap.get(slugKey);
        if (bySlug) {
          if (trimmed === bySlug) return fullMatch;
          result.resolved++;
          result.changes.push({ file: relPath, from: trimmed, to: bySlug });
          fileChanged = true;
          return `[[${bySlug}]]`;
        }

        result.dangling++;
        return fullMatch;
      },
    );

    if (fileChanged && !options.dryRun) {
      writeFrontmatter(file, data as unknown as Record<string, unknown>, newContent);
      result.filesModified++;
    } else if (fileChanged) {
      // dry run: count as would-be modified (matches spec expectation)
      // Note: dry run returns resolved count but filesModified stays 0
    }
  }

  return result;
}
