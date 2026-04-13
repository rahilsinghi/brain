import { generate } from "../llm/provider.js";
import { readFrontmatter, writeFrontmatter, updateFrontmatter } from "../frontmatter.js";
import { join, extname, basename } from "node:path";
import { mkdirSync, readdirSync, statSync } from "node:fs";
import type { WikiFrontmatter } from "../types.js";

interface CompileResult {
  success: boolean;
  wikiPath: string | null;
  error: string | null;
}

interface LLMCompileOutput {
  title: string;
  summary: string;
  concepts: string;
  details: string;
  backlinks: string;
  tags: string[];
  category: "concepts" | "projects" | "people" | "decisions";
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

interface TitleCache {
  titles: string[];
  timestamp: number;
}

const TITLE_CACHE_TTL_MS = 5 * 60 * 1000;
let titleCache: TitleCache | null = null;

function walkWikiDir(dir: string): string[] {
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
      results.push(...walkWikiDir(full));
    } else if (extname(entry) === ".md" && basename(entry) !== "index.md") {
      results.push(full);
    }
  }
  return results;
}

function getExistingTitles(vaultRoot: string): string[] {
  const now = Date.now();
  if (titleCache && now - titleCache.timestamp < TITLE_CACHE_TTL_MS) {
    return titleCache.titles;
  }

  const wikiDir = join(vaultRoot, "wiki");
  const files = walkWikiDir(wikiDir);

  const allTitles: string[] = [];
  for (const file of files) {
    const { data } = readFrontmatter(file);
    const title = (data as Record<string, unknown>).title as string | undefined;
    if (title) allTitles.push(title);
  }

  const capped = allTitles.sort((a, b) => a.localeCompare(b)).slice(0, 500);
  titleCache = { titles: capped, timestamp: now };
  return capped;
}

export function _clearTitleCache(): void {
  titleCache = null;
}

export async function compileSinglePass(
  rawFilePath: string,
  vaultRoot: string,
): Promise<CompileResult> {
  const { data: rawFm, content } = readFrontmatter(rawFilePath);
  const sourceType = (rawFm as Record<string, unknown>).source_type as string | undefined;
  updateFrontmatter(rawFilePath, { status: "processing" });

  try {
    const existingTitles = getExistingTitles(vaultRoot);
    const titleListSection =
      existingTitles.length > 0
        ? `\n  IMPORTANT: Prefer linking to existing articles from this list:\n  ${existingTitles.join(", ")}\n  If a related topic is not in the list, still include it as a [[link]].`
        : "";

    let prompt: string;
    if (sourceType === "graphify-community") {
      const rawFmTyped = rawFm as Record<string, unknown>;
      const repo = (rawFmTyped.repo as string | undefined) ?? "unknown-repo";
      const communityId = (rawFmTyped.community_id as string | undefined) ?? "unknown";
      prompt = `You are a knowledge compiler analysing a code community (cluster) detected by static analysis.

The community was found in the repository: ${repo}
Its raw cluster identifier is: ${communityId}

Given the following analysis content, produce a structured wiki article about this code community.

IMPORTANT TITLE RULE: Do NOT use generic names like "Community N" or "Cluster N". Invent a meaningful semantic title that captures the purpose or theme of this cluster (e.g. "Auth Token Lifecycle", "Data Pipeline Orchestration", "Payment Gateway Integration").

Return a JSON object with these fields:
- title: A meaningful semantic title describing this code community's purpose (NOT "Community N")
- aliases: Array containing the original cluster identifier (e.g. ["Community ${communityId}"])
- summary: 2-3 sentence summary of what this code community does and why it exists
- concepts: Key concepts as a markdown bullet list
- details: Detailed content as markdown, including notable files and their roles. Reference external dependencies using [[wikilinks]].${titleListSection}
- backlinks: Related topics as markdown links using [[Topic Name]] format, including [[${repo}]] and any key dependency modules
- tags: Array of lowercase tags (include "code-community", "${repo}", "graphify")
- category: Always "projects"

Raw analysis content:
${content}

Return ONLY valid JSON, no markdown code fences.`;
    } else {
      prompt = `You are a knowledge compiler. Given the following raw content, produce a structured wiki article.

Return a JSON object with these fields:
- title: A clear, concise title for the wiki article
- summary: 2-3 sentence summary
- concepts: Key concepts as a markdown bullet list
- details: Detailed content as markdown
- backlinks: Related topics as markdown links using [[Topic Name]] format.${titleListSection}
- tags: Array of lowercase tags
- category: One of "concepts", "projects", "people", or "decisions"

Raw content:
${content}

Return ONLY valid JSON, no markdown code fences.`;
    }

    const response = await generate({
      prompt,
      maxTokens: 8192,
      json: true,
    });

    let text = response.text;
    // Strip markdown code fences if present (Gemini sometimes adds them)
    text = text.replace(/^```json\s*\n?/, "").replace(/\n?```\s*$/, "");
    const parsed: LLMCompileOutput = JSON.parse(text);
    const aliases = (parsed as Record<string, unknown>).aliases as string[] | undefined;

    const slug = slugify(parsed.title);
    const wikiDir = join(vaultRoot, "wiki", parsed.category);
    mkdirSync(wikiDir, { recursive: true });
    const wikiPath = join(wikiDir, `${slug}.md`);

    const now = new Date().toISOString();
    const wikiFm: WikiFrontmatter = {
      title: parsed.title,
      author: "ai",
      created_at: now,
      last_ai_edit: now,
      last_human_edit: null,
      last_embedded_hash: null,
      sources: [`[[${rawFilePath}]]`],
      tags: parsed.tags,
    };
    if (aliases && aliases.length > 0) {
      (wikiFm as Record<string, unknown>).aliases = aliases;
    }

    const wikiContent = `# ${parsed.title}\n\n${parsed.summary}\n\n## Key Concepts\n\n${parsed.concepts}\n\n## Details\n\n${parsed.details}\n\n## Related\n\n${parsed.backlinks}\n`;

    writeFrontmatter(wikiPath, wikiFm as unknown as Record<string, unknown>, wikiContent);

    updateFrontmatter(rawFilePath, {
      status: "processed",
      compiled_to: `[[${parsed.title}]]`,
      processed_at: now,
    });

    return { success: true, wikiPath, error: null };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    const currentFm = readFrontmatter(rawFilePath);
    updateFrontmatter(rawFilePath, {
      status: "failed",
      retry_count: ((currentFm.data.retry_count as number) ?? 0) + 1,
      last_error: msg,
    });
    return { success: false, wikiPath: null, error: msg };
  }
}
