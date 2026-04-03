import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { processQueue } from "../../src/compiler/queue.js";
import { writeFrontmatter, readFrontmatter } from "../../src/frontmatter.js";
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

vi.mock("../../src/compiler/compile.js", () => ({
  compileSinglePass: vi.fn().mockResolvedValue({
    success: true,
    wikiPath: "/mock/wiki/article.md",
    error: null,
  }),
}));

const TEST_DIR = join(import.meta.dirname, "__fixtures__/queue-test");

describe("processQueue", () => {
  beforeEach(() => {
    mkdirSync(join(TEST_DIR, "raw/articles"), { recursive: true });
    mkdirSync(join(TEST_DIR, "raw/quarantine"), { recursive: true });
    mkdirSync(join(TEST_DIR, "wiki/concepts"), { recursive: true });
  });

  afterEach(() => {
    rmSync(TEST_DIR, { recursive: true, force: true });
  });

  it("processes files with status: pending", async () => {
    const file = join(TEST_DIR, "raw/articles/pending-article.md");
    writeFrontmatter(
      file,
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
      "# Pending Article\n\nContent here.\n",
    );

    const results = await processQueue(TEST_DIR, { maxRetries: 3 });
    expect(results.processed).toBe(1);
    expect(results.failed).toBe(0);
    expect(results.quarantined).toBe(0);
  });

  it("skips files that are not status: pending", async () => {
    const file = join(TEST_DIR, "raw/articles/processed.md");
    writeFrontmatter(
      file,
      {
        status: "processed",
        source_type: "file_drop",
        ingested_at: "2026-04-03T11:00:00Z",
        parsed_at: "2026-04-03T11:00:01Z",
        compiled_to: "[[Some Article]]",
        processed_at: "2026-04-03T11:00:02Z",
        retry_count: 0,
        last_error: null,
        compile_progress: null,
      },
      "# Already done\n",
    );

    const results = await processQueue(TEST_DIR, { maxRetries: 3 });
    expect(results.processed).toBe(0);
  });

  it("quarantines files that exceed max retries", async () => {
    const { compileSinglePass } = await import("../../src/compiler/compile.js");
    vi.mocked(compileSinglePass).mockResolvedValueOnce({
      success: false,
      wikiPath: null,
      error: "LLM failed",
    });

    const file = join(TEST_DIR, "raw/articles/doomed.md");
    writeFrontmatter(
      file,
      {
        status: "pending",
        source_type: "file_drop",
        ingested_at: "2026-04-03T09:00:00Z",
        parsed_at: "2026-04-03T09:00:01Z",
        compiled_to: null,
        processed_at: null,
        retry_count: 2,
        last_error: "Previous failure",
        compile_progress: null,
      },
      "# Doomed content\n",
    );

    const results = await processQueue(TEST_DIR, { maxRetries: 3 });
    expect(results.quarantined).toBe(1);
  });
});
