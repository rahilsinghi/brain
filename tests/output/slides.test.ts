import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mkdirSync, rmSync, existsSync } from "node:fs";
import { join } from "node:path";
import { generateSlides } from "../../src/output/slides.js";

const tmpDir = join(import.meta.dirname, ".tmp-slides-test");

beforeEach(() => {
  mkdirSync(join(tmpDir, "output", "slides"), { recursive: true });
});

afterEach(() => {
  rmSync(tmpDir, { recursive: true, force: true });
});

describe("generateSlides", () => {
  it("generates Marp markdown and calls marp-cli", async () => {
    const mockSynthesize = vi.fn().mockResolvedValue({
      answer: "Brain is a knowledge base with voice and vector search.",
      sourcePaths: ["wiki/projects/brain.md"],
      chunks: [],
    });
    const mockClaude = vi.fn().mockResolvedValue(
      "---\nmarp: true\ntheme: brutalist\n---\n\n# Brain\n\nA knowledge base\n\n---\n\n# Features\n\n- Voice\n- Search",
    );
    const mockExec = vi.fn().mockResolvedValue({ exitCode: 0, stdout: "", stderr: "" });

    const result = await generateSlides("Brain overview", {
      vaultRoot: tmpDir,
      synthesizeFn: mockSynthesize,
      claudeFn: mockClaude,
      execFn: mockExec,
      store: {} as never,
      topK: 8,
      marpTheme: "templates/brutalist-marp.css",
    });

    expect(result.mdPath).toMatch(/output\/slides\/.*\.md$/);
    expect(existsSync(join(tmpDir, result.mdPath))).toBe(true);
    expect(mockExec).toHaveBeenCalledWith(
      expect.arrayContaining(["npx", "@marp-team/marp-cli"]),
    );
  });

  it("throws and cleans up on marp-cli failure", async () => {
    const mockSynthesize = vi.fn().mockResolvedValue({
      answer: "Some context", sourcePaths: [], chunks: [],
    });
    const mockClaude = vi.fn().mockResolvedValue("---\nmarp: true\n---\n\n# Test");
    const mockExec = vi.fn().mockResolvedValue({
      exitCode: 1, stdout: "", stderr: "Error: theme not found",
    });

    await expect(
      generateSlides("test", {
        vaultRoot: tmpDir,
        synthesizeFn: mockSynthesize,
        claudeFn: mockClaude,
        execFn: mockExec,
        store: {} as never,
        topK: 8,
        marpTheme: "templates/brutalist-marp.css",
      }),
    ).rejects.toThrow("marp-cli failed");
  });
});
