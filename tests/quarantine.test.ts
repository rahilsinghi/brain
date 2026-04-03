import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { shouldQuarantine, quarantineFile } from "../src/quarantine.js";
import { readFrontmatter, writeFrontmatter } from "../src/frontmatter.js";
import { existsSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const TEST_DIR = join(import.meta.dirname, "__fixtures__/quarantine-test");
const RAW_DIR = join(TEST_DIR, "raw/articles");
const QUARANTINE_DIR = join(TEST_DIR, "raw/quarantine");

describe("quarantine", () => {
  beforeEach(() => {
    mkdirSync(RAW_DIR, { recursive: true });
    mkdirSync(QUARANTINE_DIR, { recursive: true });
  });

  afterEach(() => {
    rmSync(TEST_DIR, { recursive: true, force: true });
  });

  it("shouldQuarantine returns true when retry_count >= maxRetries", () => {
    expect(shouldQuarantine(3, 3)).toBe(true);
    expect(shouldQuarantine(4, 3)).toBe(true);
  });

  it("shouldQuarantine returns false when retry_count < maxRetries", () => {
    expect(shouldQuarantine(2, 3)).toBe(false);
    expect(shouldQuarantine(0, 3)).toBe(false);
  });

  it("moves a file to quarantine and updates frontmatter", () => {
    const file = join(RAW_DIR, "bad-file.md");
    writeFrontmatter(file, {
      status: "failed",
      source_type: "file_drop",
      ingested_at: "2026-04-03T09:00:00Z",
      retry_count: 3,
      last_error: "Parser crashed",
      parsed_at: null,
      compiled_to: null,
      processed_at: null,
      compile_progress: null,
    }, "# Bad content\n");

    const newPath = quarantineFile(file, QUARANTINE_DIR);

    expect(existsSync(file)).toBe(false);
    expect(existsSync(newPath)).toBe(true);

    const result = readFrontmatter(newPath);
    expect(result.data.status).toBe("quarantined");
    expect(result.data.quarantined_at).toBeTruthy();
    expect(result.content).toContain("# Bad content");
  });
});
