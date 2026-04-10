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
  updateFrontmatter(rawFilePath, { status: "processing" });

  try {
    const existingTitles = getExistingTitles(vaultRoot);
    const titleListSection =
      existingTitles.length > 0
        ? `\n  IMPORTANT: Prefer linking to existing articles from this list:\n  ${existingTitles.join(", ")}\n  If a related topic is not in the list, still include it as a [[link]].`
        : "";

    const response = await generate({
      prompt: `You are a knowledge compiler. Given the following raw content, produce a structured wiki article.

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

Return ONLY valid JSON, no markdown code fences.`,
      maxTokens: 8192,
      json: true,
    });

    let text = response.text;
    // Strip markdown code fences if present (Gemini sometimes adds them)
    text = text.replace(/^```json\s*\n?/, "").replace(/\n?```\s*$/, "");
    const parsed: LLMCompileOutput = JSON.parse(text);

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
