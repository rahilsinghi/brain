import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdirSync, rmSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ingestContent } from "../../src/api/ingest-core.js";

const TEST_VAULT = join(import.meta.dirname, "__fixtures__/ingest-core-test");

describe("ingestContent", () => {
  beforeEach(() => {
    mkdirSync(TEST_VAULT, { recursive: true });
  });

  afterEach(() => {
    rmSync(TEST_VAULT, { recursive: true, force: true });
  });

  it("writes file to raw/api/articles/ with slug and timestamp", () => {
    const result = ingestContent({
      content: "# Meeting notes\n\nDiscussed roadmap.",
      source: "telegram",
      vaultRoot: TEST_VAULT,
    });

    expect(result.source_id).toMatch(/^api\/articles\/meeting-notes-\d+\.md$/);
    expect(result.raw_path).toMatch(/^raw\/api\/articles\/meeting-notes-\d+\.md$/);
    expect(result.ingested_at).toBeTruthy();

    const fullPath = join(TEST_VAULT, result.raw_path);
    expect(existsSync(fullPath)).toBe(true);
  });

  it("writes correct frontmatter system fields", () => {
    const result = ingestContent({
      content: "Some knowledge",
      source: "web",
      title: "Test Article",
      vaultRoot: TEST_VAULT,
    });

    const fileContent = readFileSync(join(TEST_VAULT, result.raw_path), "utf-8");
    expect(fileContent).toContain("status: pending");
    expect(fileContent).toContain("source_type: api");
    expect(fileContent).toContain("channel: web");
    expect(fileContent).toContain("parsed_at: null");
    expect(fileContent).toContain("compiled_to: null");
    expect(fileContent).toContain("retry_count: 0");
    expect(fileContent).toContain("Some knowledge");
  });

  it("spreads user metadata but system fields override", () => {
    const result = ingestContent({
      content: "Content here",
      source: "voice",
      metadata: { speaker: "rahil", status: "hacked" },
      vaultRoot: TEST_VAULT,
    });

    const fileContent = readFileSync(join(TEST_VAULT, result.raw_path), "utf-8");
    expect(fileContent).toContain("speaker: rahil");
    expect(fileContent).toContain("status: pending");
  });

  it("falls back to first non-empty line when title is null", () => {
    const result = ingestContent({
      content: "\n\n  Hello world\nMore content",
      source: "telegram",
      vaultRoot: TEST_VAULT,
    });

    expect(result.source_id).toMatch(/hello-world/);
  });

  it("uses 'untitled' when content is only whitespace lines", () => {
    const result = ingestContent({
      content: "   \n  \n   ",
      source: "telegram",
      vaultRoot: TEST_VAULT,
    });

    expect(result.source_id).toMatch(/untitled/);
  });
});
