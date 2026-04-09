import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mkdirSync, rmSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { generatePlot } from "../../src/output/plots.js";

const tmpDir = join(import.meta.dirname, ".tmp-plots-test");

beforeEach(() => {
  mkdirSync(join(tmpDir, "output", "plots"), { recursive: true });
});

afterEach(() => {
  rmSync(tmpDir, { recursive: true, force: true });
});

describe("generatePlot", () => {
  it("generates Python script and calls uv run", async () => {
    const mockSynthesize = vi.fn().mockResolvedValue({
      answer: "Brain has 113 wiki articles and 648 vector chunks.",
      sourcePaths: [], chunks: [],
    });
    const pngAbsolute = join(tmpDir, "output", "plots", "brain-stats.png");
    const mockClaude = vi.fn().mockResolvedValue(
      `import matplotlib.pyplot as plt\nplt.bar(["articles", "chunks"], [113, 648])\nplt.savefig("${pngAbsolute}")`,
    );
    const mockExec = vi.fn().mockResolvedValue({ exitCode: 0, stdout: "", stderr: "" });

    const result = await generatePlot("brain stats", {
      vaultRoot: tmpDir,
      synthesizeFn: mockSynthesize,
      claudeFn: mockClaude,
      execFn: mockExec,
      store: {} as never,
      topK: 8,
      matplotlibRc: "templates/brutalist-matplotlib.json",
    });

    expect(result.pyPath).toMatch(/output\/plots\/.*\.py$/);
    expect(existsSync(join(tmpDir, result.pyPath))).toBe(true);
    expect(mockExec).toHaveBeenCalledWith(expect.arrayContaining(["uv", "run"]));
  });

  it("throws and cleans up on uv run failure", async () => {
    const mockSynthesize = vi.fn().mockResolvedValue({
      answer: "data", sourcePaths: [], chunks: [],
    });
    const mockClaude = vi.fn().mockResolvedValue("import matplotlib");
    const mockExec = vi.fn().mockResolvedValue({
      exitCode: 1, stdout: "", stderr: "ModuleNotFoundError",
    });

    await expect(
      generatePlot("test", {
        vaultRoot: tmpDir,
        synthesizeFn: mockSynthesize,
        claudeFn: mockClaude,
        execFn: mockExec,
        store: {} as never,
        topK: 8,
        matplotlibRc: "templates/brutalist-matplotlib.json",
      }),
    ).rejects.toThrow("uv run failed");
  });
});
