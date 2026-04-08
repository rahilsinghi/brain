import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { getUnstructuredFiles, copyToRaw } from "../../src/seed/unstructured.js";
import { writeFileSync, mkdirSync, rmSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const TEST_DIR = join(import.meta.dirname, "__fixtures__/unstructured-test");
const VAULT_DIR = join(TEST_DIR, "vault");
const SOURCE_DIR = join(TEST_DIR, "source");

describe("unstructured", () => {
  beforeEach(() => {
    mkdirSync(join(SOURCE_DIR, "prep"), { recursive: true });
    mkdirSync(join(SOURCE_DIR, "docs"), { recursive: true });
    mkdirSync(join(VAULT_DIR, "raw", "articles"), { recursive: true });
    // Create files that match manifest entries
    writeFileSync(
      join(SOURCE_DIR, "prep", "mews_rogers_leo_prep.md"),
      "# Mews Rogers Leo Prep\n\nSome prep content.",
    );
    writeFileSync(
      join(SOURCE_DIR, "docs", "bullet_bank.md"),
      "# Bullet Bank\n\nSome doc content.",
    );
  });

  afterEach(() => {
    rmSync(TEST_DIR, { recursive: true, force: true });
  });

  it("getUnstructuredFiles returns list of source files that exist", () => {
    const files = getUnstructuredFiles(SOURCE_DIR);
    expect(files.length).toBeGreaterThan(0);
    expect(files.some((f) => f.sourcePath.includes("mews_rogers_leo_prep.md"))).toBe(true);
  });

  it("copyToRaw writes files to raw/articles/ with frontmatter", () => {
    const files = getUnstructuredFiles(SOURCE_DIR);
    const written = copyToRaw(files, VAULT_DIR);
    expect(written.length).toBeGreaterThan(0);
    const rawPath = written[0];
    expect(existsSync(rawPath)).toBe(true);
    const content = readFileSync(rawPath, "utf-8");
    expect(content).toContain("status: pending");
    expect(content).toContain("source_type: seed_yaml");
  });

  it("returns empty for missing source files", () => {
    const files = [{ sourcePath: "/nonexistent/file.md", targetSlug: "test" }];
    const written = copyToRaw(files, VAULT_DIR);
    expect(written).toEqual([]);
  });
});
