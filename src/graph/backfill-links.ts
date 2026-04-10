import { readdirSync, statSync } from "node:fs";
import { join, relative, extname, basename } from "node:path";
import { readFrontmatter, writeFrontmatter } from "../frontmatter.js";
import { slugify } from "../sources/slug.js";
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

  // Build lookup maps for resolution
  const titleMap = new Map<string, string>(); // lowercase title → canonical title
  const slugMap = new Map<string, string>();  // slug → canonical title
  const filenameSet = new Set<string>();      // bare filenames (without .md)

  for (const file of files) {
    const id = relative(wikiDir, file);
    filenameSet.add(basename(file, ".md"));
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
        const bareName = trimmed.endsWith(".md") ? trimmed.slice(0, -3) : trimmed;
        if (filenameSet.has(bareName)) return fullMatch;

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

    if (fileChanged) {
      result.filesModified++;
      if (!options.dryRun) {
        writeFrontmatter(file, data as unknown as Record<string, unknown>, newContent);
      }
    }
  }

  return result;
}

// CLI entry point
const isMain = process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/.*\//, ""));
if (isMain) {
  const dryRun = process.argv.includes("--dry-run");
  const vaultRoot = join(import.meta.dirname, "../..");

  console.log(dryRun ? "=== DRY RUN ===" : "=== BACKFILL ===");
  const result = backfillLinks(vaultRoot, { dryRun });

  for (const change of result.changes) {
    console.log(`  ${change.file}: [[${change.from}]] → [[${change.to}]]`);
  }

  console.log(`\nResolved: ${result.resolved}`);
  console.log(`Dangling: ${result.dangling}`);
  console.log(`Files modified: ${result.filesModified}`);
}
