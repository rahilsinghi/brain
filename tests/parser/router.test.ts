import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { routeAndParse } from "../../src/parser/router.js";
import { readFrontmatter } from "../../src/frontmatter.js";
import { writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const TEST_DIR = join(import.meta.dirname, "__fixtures__/parser-test");

describe("routeAndParse", () => {
  beforeEach(() => {
    mkdirSync(TEST_DIR, { recursive: true });
  });

  afterEach(() => {
    rmSync(TEST_DIR, { recursive: true, force: true });
  });

  it("passes .md files through and sets status to pending", async () => {
    const file = join(TEST_DIR, "article.md");
    writeFileSync(file, "---\nstatus: unparsed\nsource_type: file_drop\ningested_at: '2026-04-03'\nparsed_at: null\ncompiled_to: null\nprocessed_at: null\nretry_count: 0\nlast_error: null\ncompile_progress: null\n---\n\n# Test Article\n\nSome content.\n");
    await routeAndParse(file);
    const result = readFrontmatter(file);
    expect(result.data.status).toBe("pending");
    expect(result.data.parsed_at).not.toBeNull();
  });

  it("passes .txt files through and sets status to pending", async () => {
    const file = join(TEST_DIR, "note.txt");
    writeFileSync(file, "---\nstatus: unparsed\nsource_type: file_drop\ningested_at: '2026-04-03'\nparsed_at: null\ncompiled_to: null\nprocessed_at: null\nretry_count: 0\nlast_error: null\ncompile_progress: null\n---\n\nPlain text note.\n");
    await routeAndParse(file);
    const result = readFrontmatter(file);
    expect(result.data.status).toBe("pending");
  });

  it("converts .html files to markdown and sets status to pending", async () => {
    const file = join(TEST_DIR, "page.html");
    writeFileSync(file, "---\nstatus: unparsed\nsource_type: markpush\ningested_at: '2026-04-03'\nparsed_at: null\ncompiled_to: null\nprocessed_at: null\nretry_count: 0\nlast_error: null\ncompile_progress: null\n---\n\n<h1>Hello</h1><p>World</p>\n");
    await routeAndParse(file);
    const result = readFrontmatter(file);
    expect(result.data.status).toBe("pending");
    expect(result.content).toContain("Hello");
    expect(result.content).toContain("World");
    expect(result.content).not.toContain("<h1>");
  });

  it("marks unsupported file types as failed", async () => {
    const file = join(TEST_DIR, "mystery.xyz");
    writeFileSync(file, "---\nstatus: unparsed\nsource_type: file_drop\ningested_at: '2026-04-03'\nparsed_at: null\ncompiled_to: null\nprocessed_at: null\nretry_count: 0\nlast_error: null\ncompile_progress: null\n---\n\nbinary gibberish\n");
    await routeAndParse(file);
    const result = readFrontmatter(file);
    expect(result.data.status).toBe("failed");
    expect(result.data.retry_count).toBe(1);
    expect(result.data.last_error).toContain("Unsupported");
  });

  it("marks PDF/audio/image as failed with not yet implemented for Phase 1", async () => {
    const file = join(TEST_DIR, "doc.pdf");
    writeFileSync(file, "---\nstatus: unparsed\nsource_type: file_drop\ningested_at: '2026-04-03'\nparsed_at: null\ncompiled_to: null\nprocessed_at: null\nretry_count: 0\nlast_error: null\ncompile_progress: null\n---\n\nfake pdf content\n");
    await routeAndParse(file);
    const result = readFrontmatter(file);
    expect(result.data.status).toBe("failed");
    expect(result.data.last_error).toContain("not yet implemented");
  });
});
