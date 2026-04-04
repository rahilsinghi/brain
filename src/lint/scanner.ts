import { readdirSync, existsSync } from "node:fs";
import { join, basename, relative } from "node:path";
import { readFrontmatter } from "../frontmatter.js";
import type { LintIssue, WikiFrontmatter } from "../types.js";

const REQUIRED_WIKI_FIELDS: (keyof WikiFrontmatter)[] = [
  "title",
  "author",
  "created_at",
  "last_ai_edit",
  "sources",
  "tags",
];

const WIKILINK_REGEX = /\[\[([^\]|]+?)(?:\|[^\]]+)?\]\]/g;

function collectWikiFiles(dir: string): string[] {
  const files: string[] = [];
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name === ".gitkeep") continue;
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectWikiFiles(fullPath));
    } else if (entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }
  return files;
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function scanForIssues(vaultRoot: string): LintIssue[] {
  const issues: LintIssue[] = [];
  const wikiDir = join(vaultRoot, "wiki");
  const files = collectWikiFiles(wikiDir);

  // Map from normalised title → relative path (for link resolution)
  const titleToRelPath = new Map<string, string>();
  // Set of all known slugs (from title + filename) for link resolution
  const knownSlugs = new Set<string>();
  // Map from relative path → list of [[link targets]] found in that file
  const outboundLinks = new Map<string, string[]>();

  // First pass: collect titles, slugs, outbound links, and format issues
  for (const file of files) {
    const { data, content } = readFrontmatter<Partial<WikiFrontmatter>>(file);
    const relPath = relative(vaultRoot, file);

    // Register title and slug for link resolution
    if (data.title) {
      titleToRelPath.set(data.title, relPath);
      knownSlugs.add(slugify(data.title));
    }
    knownSlugs.add(basename(file, ".md"));

    // Collect outbound wikilinks
    const links: string[] = [];
    const regex = new RegExp(WIKILINK_REGEX.source, "g");
    let match: RegExpExecArray | null;
    while ((match = regex.exec(content)) !== null) {
      links.push(match[1].trim());
    }
    outboundLinks.set(relPath, links);

    // Format issue: missing required frontmatter fields (undefined means absent from YAML)
    const missingFields = REQUIRED_WIKI_FIELDS.filter((f) => data[f] === undefined);
    if (missingFields.length > 0) {
      issues.push({
        type: "format_issue",
        filePath: relPath,
        description: `Missing required frontmatter fields: ${missingFields.join(", ")}`,
        severity: "warning",
      });
    }
  }

  // Second pass: detect broken links
  for (const [filePath, links] of outboundLinks) {
    for (const link of links) {
      const linkSlug = slugify(link);
      const hasSlash = link.includes("/");

      let found: boolean;
      if (hasSlash) {
        // Treat as a relative path within wiki/
        const targetFile = join(vaultRoot, "wiki", `${link}.md`);
        found = existsSync(targetFile);
      } else {
        found = titleToRelPath.has(link) || knownSlugs.has(linkSlug);
      }

      if (!found) {
        issues.push({
          type: "broken_link",
          filePath,
          description: `Broken link: [[${link}]] — no matching article found`,
          severity: "warning",
        });
      }
    }
  }

  // Third pass: detect orphan articles (no inbound wikilinks)
  const linkedRelPaths = new Set<string>();
  for (const links of outboundLinks.values()) {
    for (const link of links) {
      // Resolve link to a relative path
      const slug = slugify(link);
      const byTitle = titleToRelPath.get(link);
      if (byTitle) {
        linkedRelPaths.add(byTitle);
        continue;
      }
      // Fall back: match by slug against all known titles
      for (const [title, relPath] of titleToRelPath) {
        if (slugify(title) === slug) {
          linkedRelPaths.add(relPath);
        }
      }
    }
  }

  for (const file of files) {
    const relPath = relative(vaultRoot, file);
    if (basename(file) === "index.md") continue;
    if (!linkedRelPaths.has(relPath)) {
      issues.push({
        type: "orphan_article",
        filePath: relPath,
        description: "Orphan article: no inbound [[wikilinks]] found",
        severity: "warning",
      });
    }
  }

  return issues;
}
