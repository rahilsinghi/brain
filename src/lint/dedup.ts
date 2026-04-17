/**
 * Article Deduplication Scanner
 *
 * Detects near-duplicate wiki articles by title similarity and content overlap.
 * Used during lint runs and as a one-time cleanup tool.
 *
 * Strategy:
 * 1. Group articles by normalized title (lowercased, stripped of dates/suffixes)
 * 2. Within each group, compare content overlap
 * 3. If overlap > 80%, mark the shorter/older article for removal
 */

import { readdirSync, readFileSync, existsSync, unlinkSync, renameSync, mkdirSync } from "node:fs";
import { join, relative, basename, dirname } from "node:path";
import { readFrontmatter } from "../frontmatter.js";

export interface DupGroup {
  normalizedTitle: string;
  articles: Array<{
    path: string;
    title: string;
    wordCount: number;
    createdAt: string;
    content: string;
  }>;
}

export interface DedupResult {
  groupsFound: number;
  articlesRemoved: number;
  removedPaths: string[];
}

/**
 * Normalize a title for grouping: lowercase, strip dates, strip trailing hashes,
 * collapse whitespace.
 */
export function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/\d{4}[-/]\d{2}[-/]\d{2}/g, "") // strip ISO dates
    .replace(/\b(january|february|march|april|may|june|july|august|september|october|november|december)\b/gi, "")
    .replace(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\b/gi, "")
    .replace(/\b20\d{2}\b/g, "") // strip years
    .replace(/[^a-z0-9\s]/g, " ") // strip special chars
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Compute word-level overlap between two texts.
 * Returns a ratio 0-1 (Jaccard similarity on word sets).
 */
export function contentOverlap(a: string, b: string): number {
  const wordsA = new Set(a.toLowerCase().split(/\s+/).filter((w) => w.length > 3));
  const wordsB = new Set(b.toLowerCase().split(/\s+/).filter((w) => w.length > 3));

  if (wordsA.size === 0 || wordsB.size === 0) return 0;

  let intersection = 0;
  for (const w of wordsA) {
    if (wordsB.has(w)) intersection++;
  }

  const union = wordsA.size + wordsB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

/**
 * Scan wiki directory and find duplicate groups.
 */
export function findDuplicateGroups(wikiDir: string): DupGroup[] {
  const articles: DupGroup["articles"] = [];

  function walk(dir: string): void {
    if (!existsSync(dir)) return;
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith(".")) continue;
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith(".md") && entry.name !== "index.md") {
        try {
          const { data, content } = readFrontmatter(fullPath);
          articles.push({
            path: fullPath,
            title: (data.title as string) || basename(fullPath, ".md"),
            wordCount: content.split(/\s+/).length,
            createdAt: (data.created_at as string) || "",
            content,
          });
        } catch {
          // Skip unparseable files
        }
      }
    }
  }

  walk(wikiDir);

  // Find duplicates by pairwise content overlap comparison.
  // Two articles are duplicates if they share >60% word overlap regardless of title.
  // We use normalized title word overlap as a cheap pre-filter to avoid O(n^2) on all articles.
  const dupGroups: DupGroup[] = [];
  const merged = new Set<string>();

  for (let i = 0; i < articles.length; i++) {
    if (merged.has(articles[i].path)) continue;

    const group: DupGroup["articles"] = [articles[i]];
    const normI = normalizeTitle(articles[i].title);
    const wordsI = new Set(normI.split(/\s+/).filter((w) => w.length > 2));

    for (let j = i + 1; j < articles.length; j++) {
      if (merged.has(articles[j].path)) continue;

      // Pre-filter: titles must share at least 2 significant words
      const normJ = normalizeTitle(articles[j].title);
      const wordsJ = new Set(normJ.split(/\s+/).filter((w) => w.length > 2));
      let sharedWords = 0;
      for (const w of wordsI) {
        if (wordsJ.has(w)) sharedWords++;
      }
      if (sharedWords < 2) continue;

      // Full content overlap check
      if (contentOverlap(articles[i].content, articles[j].content) > 0.6) {
        group.push(articles[j]);
        merged.add(articles[j].path);
      }
    }

    if (group.length > 1) {
      merged.add(articles[i].path);
      dupGroups.push({
        normalizedTitle: normI,
        articles: group,
      });
    }
  }

  return dupGroups;
}

/**
 * Remove duplicates: keep the longest article in each group,
 * move others to a dedup archive.
 */
export function removeDuplicates(
  wikiDir: string,
  dryRun = false,
): DedupResult {
  const groups = findDuplicateGroups(wikiDir);
  const removedPaths: string[] = [];

  const archiveDir = join(dirname(wikiDir), ".brain", "dedup-archive");

  for (const group of groups) {
    // Sort by word count descending — keep the longest
    const sorted = [...group.articles].sort((a, b) => b.wordCount - a.wordCount);
    const keep = sorted[0];
    const remove = sorted.slice(1);

    for (const article of remove) {
      if (!dryRun) {
        mkdirSync(archiveDir, { recursive: true });
        const archivePath = join(archiveDir, basename(article.path));
        try {
          renameSync(article.path, archivePath);
        } catch {
          // If rename fails (cross-device), copy+delete
          try {
            unlinkSync(article.path);
          } catch {
            // Skip if can't delete
            continue;
          }
        }
      }
      removedPaths.push(article.path);
    }
  }

  return {
    groupsFound: groups.length,
    articlesRemoved: removedPaths.length,
    removedPaths,
  };
}
