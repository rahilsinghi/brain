import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

vi.mock("child_process", async () => {
  const actual = await vi.importActual<typeof import("child_process")>("child_process");
  return { ...actual };
});

import * as cp from "child_process";
import { createGraphifySource } from "../../src/sources/graphify.js";
import type { SourceSyncState } from "../../src/sources/types.js";
import type { GraphifyConfig } from "../../src/types.js";

function makeState(): SourceSyncState {
  return { last_poll: null, processed_ids: [] };
}

function makeConfig(overrides: Partial<GraphifyConfig> = {}): GraphifyConfig {
  return {
    repos: [],
    semantic: false,
    cron_schedule: "0 * * * *",
    max_nodes_per_repo: 100,
    output_dir: "raw/graphify",
    ...overrides,
  };
}

describe("createGraphifySource", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "graphify-test-"));
    vi.restoreAllMocks();
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
    vi.restoreAllMocks();
  });

  it("has name set to graphify", () => {
    const source = createGraphifySource("/vault", makeConfig());
    expect(source.name).toBe("graphify");
  });

  it("returns empty drops when no repos configured", async () => {
    const source = createGraphifySource("/vault", makeConfig({ repos: [] }));
    const result = await source.poll(makeState());
    expect(result.newItems).toHaveLength(0);
    expect(result.processedIds).toHaveLength(0);
  });

  it("returns empty drops when repo paths don't exist", async () => {
    vi.spyOn(cp, "execFileSync").mockImplementation(() => Buffer.from(""));

    const config = makeConfig({
      repos: ["/nonexistent/path/myrepo"],
    });
    const source = createGraphifySource(tmpDir, config);
    const result = await source.poll(makeState());

    expect(result.newItems).toHaveLength(0);
  });

  it("collects architecture report as a RawDrop", async () => {
    // Create a fake repo dir and output files under vaultRoot/raw/graphify/
    const repoDir = fs.mkdtempSync(path.join(os.tmpdir(), "repo-myrepo-"));
    const repoName = path.basename(repoDir);
    const repoOutputDir = path.join(tmpDir, "raw/graphify", repoName);
    fs.mkdirSync(repoOutputDir, { recursive: true });

    const archContent = "# Architecture\n\nThis repo does stuff.";
    const archFile = path.join(repoOutputDir, `${repoName}-architecture.md`);
    fs.writeFileSync(archFile, archContent, "utf8");

    vi.spyOn(cp, "execFileSync").mockImplementation(() => Buffer.from(""));

    const config = makeConfig({ repos: [repoDir] });
    const source = createGraphifySource(tmpDir, config);
    const result = await source.poll(makeState());

    const archDrop = result.newItems.find((d) =>
      d.sourceId.includes("architecture"),
    );
    expect(archDrop).toBeDefined();
    expect(archDrop!.filename).toBe(
      `graphify/${repoName}/${repoName}-architecture.md`,
    );
    expect(archDrop!.content).toBe(archContent);
    expect(archDrop!.sourceId).toBe(`graphify:${repoName}:architecture`);

    fs.rmSync(repoDir, { recursive: true, force: true });
  });

  it("collects file-summary drops from summaries directory", async () => {
    // Create a fake repo dir and file-summaries output under vaultRoot/raw/graphify/
    const repoDir = fs.mkdtempSync(path.join(os.tmpdir(), "repo-myrepo2-"));
    const repoName = path.basename(repoDir);
    const repoOutputDir = path.join(tmpDir, "raw/graphify", repoName);
    const summariesDir = path.join(repoOutputDir, "file-summaries");
    fs.mkdirSync(summariesDir, { recursive: true });

    const summaryContent = "# src/index.ts\n\nEntry point for the app.";
    const summaryFile = "src-index.md";
    fs.writeFileSync(path.join(summariesDir, summaryFile), summaryContent, "utf8");

    vi.spyOn(cp, "execFileSync").mockImplementation(() => Buffer.from(""));

    const config = makeConfig({ repos: [repoDir] });
    const source = createGraphifySource(tmpDir, config);
    const result = await source.poll(makeState());

    const summaryDrop = result.newItems.find((d) =>
      d.sourceId.includes("src-index"),
    );
    expect(summaryDrop).toBeDefined();
    expect(summaryDrop!.filename).toBe(
      `graphify/${repoName}/file-summaries/${summaryFile}`,
    );
    expect(summaryDrop!.content).toBe(summaryContent);
    expect(summaryDrop!.sourceId).toBe(`graphify:${repoName}:src-index`);

    fs.rmSync(repoDir, { recursive: true, force: true });
  });

  it("returns empty drops when CLI fails", async () => {
    const repoDir = fs.mkdtempSync(path.join(os.tmpdir(), "repo-myrepo3-"));

    vi.spyOn(cp, "execFileSync").mockImplementation(() => {
      throw new Error("CLI execution failed");
    });

    const config = makeConfig({ repos: [repoDir] });
    const source = createGraphifySource(tmpDir, config);
    const result = await source.poll(makeState());

    expect(result.newItems).toHaveLength(0);

    fs.rmSync(repoDir, { recursive: true, force: true });
  });
});
