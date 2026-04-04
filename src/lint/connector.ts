import { readdirSync, existsSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join, basename, relative } from "node:path";
import { readFrontmatter } from "../frontmatter.js";

const WIKILINK_REGEX = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;

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

export interface ConnectionResult {
  newLinksAdded: number;
  dailySummaryWritten: boolean;
}

export function discoverConnections(vaultRoot: string): {
  existingLinks: Map<string, Set<string>>;
  titles: Map<string, string>;
} {
  const wikiDir = join(vaultRoot, "wiki");
  const files = collectWikiFiles(wikiDir);

  const existingLinks = new Map<string, Set<string>>();
  const titles = new Map<string, string>();

  for (const file of files) {
    const { data, content } = readFrontmatter(file);
    const relPath = relative(vaultRoot, file);
    const title = (data.title as string) || basename(file, ".md");
    titles.set(relPath, title);

    const links = new Set<string>();
    let match: RegExpExecArray | null;
    const regex = new RegExp(WIKILINK_REGEX.source, "g");
    while ((match = regex.exec(content)) !== null) {
      links.add(match[1]);
    }
    existingLinks.set(relPath, links);
  }

  return { existingLinks, titles };
}

export function writeDailySummary(
  vaultRoot: string,
  changes: string[]
): void {
  const dailyDir = join(vaultRoot, "daily");
  mkdirSync(dailyDir, { recursive: true });
  const date = new Date().toISOString().split("T")[0];
  const dailyFile = join(dailyDir, `${date}.md`);

  const header = `# Daily Log — ${date}\n\n`;
  const section = `## Lint & Heal Changes\n\n${changes.map((c) => `- ${c}`).join("\n")}\n`;

  if (existsSync(dailyFile)) {
    const existing = readFileSync(dailyFile, "utf-8");
    writeFileSync(dailyFile, existing + "\n" + section, "utf-8");
  } else {
    writeFileSync(dailyFile, header + section, "utf-8");
  }
}
