import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { readFrontmatter, writeFrontmatter } from "../../src/frontmatter.js";
import { existsSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const TEST_DIR = join(import.meta.dirname, "__fixtures__/compile-test");
const WIKI_DIR = join(TEST_DIR, "wiki/concepts");

vi.mock("@anthropic-ai/sdk", () => {
  return {
    default: class MockAnthropic {
      messages = {
        create: vi.fn().mockResolvedValue({
          content: [
            {
              type: "text",
              text: JSON.stringify({
                title: "Test Concept",
                summary: "A summary of the test concept.",
                concepts: "- Concept A\n- Concept B",
                details: "Detailed explanation here.",
                backlinks: "- [[Related Topic]]",
                tags: ["test", "concept"],
                category: "concepts",
              }),
            },
          ],
        }),
      };
    },
  };
});

describe("compileSinglePass", () => {
  beforeEach(() => {
    mkdirSync(join(TEST_DIR, "raw/articles"), { recursive: true });
    mkdirSync(WIKI_DIR, { recursive: true });
  });

  afterEach(() => {
    rmSync(TEST_DIR, { recursive: true, force: true });
  });

  it("compiles a raw file into a wiki article", async () => {
    const { compileSinglePass } = await import("../../src/compiler/compile.js");

    const rawFile = join(TEST_DIR, "raw/articles/test-article.md");
    writeFrontmatter(
      rawFile,
      {
        status: "pending",
        source_type: "file_drop",
        ingested_at: "2026-04-03T11:00:00Z",
        parsed_at: "2026-04-03T11:00:01Z",
        compiled_to: null,
        processed_at: null,
        retry_count: 0,
        last_error: null,
        compile_progress: null,
      },
      "# Some Raw Article\n\nThis is raw content about a test concept.\n",
    );

    const result = await compileSinglePass(rawFile, TEST_DIR);

    expect(result.success).toBe(true);
    expect(result.wikiPath).toBeTruthy();
    expect(existsSync(result.wikiPath!)).toBe(true);

    const wikiContent = readFrontmatter(result.wikiPath!);
    expect(wikiContent.data.title).toBe("Test Concept");
    expect(wikiContent.data.author).toBe("ai");
    expect(wikiContent.data.tags).toContain("test");

    const rawResult = readFrontmatter(rawFile);
    expect(rawResult.data.status).toBe("processed");
    expect(rawResult.data.compiled_to).toContain("Test Concept");
    expect(rawResult.data.processed_at).toBeTruthy();
  });
});
