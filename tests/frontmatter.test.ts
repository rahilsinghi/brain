import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { readFrontmatter, writeFrontmatter, updateFrontmatter, injectRawFrontmatter } from "../src/frontmatter.js";
import { writeFileSync, readFileSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const TEST_DIR = join(import.meta.dirname, "__fixtures__/fm-test");

describe("frontmatter", () => {
  beforeEach(() => {
    mkdirSync(TEST_DIR, { recursive: true });
  });

  afterEach(() => {
    rmSync(TEST_DIR, { recursive: true, force: true });
  });

  it("reads YAML frontmatter from a markdown file", () => {
    const file = join(TEST_DIR, "test.md");
    writeFileSync(file, "---\nstatus: pending\nretry_count: 0\n---\n\n# Hello\n");
    const fm = readFrontmatter(file);
    expect(fm.data.status).toBe("pending");
    expect(fm.data.retry_count).toBe(0);
    expect(fm.content).toContain("# Hello");
  });

  it("writes a new file with frontmatter and content", () => {
    const file = join(TEST_DIR, "new.md");
    writeFrontmatter(file, { status: "pending", retry_count: 0 }, "# New Article\n");
    const raw = readFileSync(file, "utf-8");
    expect(raw).toContain("status: pending");
    expect(raw).toContain("# New Article");
  });

  it("updates specific frontmatter fields without touching content", () => {
    const file = join(TEST_DIR, "update.md");
    writeFileSync(file, "---\nstatus: pending\nretry_count: 0\n---\n\n# Content stays\n");
    updateFrontmatter(file, { status: "processing", retry_count: 1 });
    const result = readFrontmatter(file);
    expect(result.data.status).toBe("processing");
    expect(result.data.retry_count).toBe(1);
    expect(result.content).toContain("# Content stays");
  });

  it("injects raw frontmatter into a file without existing frontmatter", () => {
    const file = join(TEST_DIR, "plain.md");
    writeFileSync(file, "# Just content\n\nSome text here.\n");
    injectRawFrontmatter(file, "file_drop");
    const result = readFrontmatter(file);
    expect(result.data.status).toBe("unparsed");
    expect(result.data.source_type).toBe("file_drop");
    expect(result.data.retry_count).toBe(0);
    expect(result.content).toContain("# Just content");
  });

  it("does not re-inject frontmatter if it already exists", () => {
    const file = join(TEST_DIR, "existing.md");
    writeFileSync(file, "---\nstatus: processed\n---\n\n# Done\n");
    injectRawFrontmatter(file, "file_drop");
    const result = readFrontmatter(file);
    expect(result.data.status).toBe("processed");
  });
});
