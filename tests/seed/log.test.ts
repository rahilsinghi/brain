import { describe, it, expect, vi } from "vitest";
import { SeedLogger } from "../../src/seed/log.js";

describe("SeedLogger", () => {
  it("formats load messages with entry count", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const log = new SeedLogger();
    log.load("experience.yaml", 4);
    expect(spy).toHaveBeenCalledWith("[load] experience.yaml → 4 entries (validated)");
    spy.mockRestore();
  });

  it("formats warning messages", () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const log = new SeedLogger();
    log.warn("activities.yaml — missing optional field 'relevance'");
    expect(spy).toHaveBeenCalledWith("[load] WARNING: activities.yaml — missing optional field 'relevance'");
    spy.mockRestore();
  });

  it("formats transform messages with article count", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const log = new SeedLogger();
    log.transform("experience", 4);
    expect(spy).toHaveBeenCalledWith("[transform] experience → 4 articles written");
    spy.mockRestore();
  });

  it("formats transform messages with single file path", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const log = new SeedLogger();
    log.transform("profile", "wiki/people/rahil-singhi.md");
    expect(spy).toHaveBeenCalledWith("[transform] profile → wiki/people/rahil-singhi.md");
    spy.mockRestore();
  });

  it("formats compile progress", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const log = new SeedLogger();
    log.compile(3, 13, "maison-talking-points.md");
    expect(spy).toHaveBeenCalledWith("[compile] 3/13 — maison-talking-points.md (compiling...)");
    spy.mockRestore();
  });

  it("formats embed progress", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const log = new SeedLogger();
    log.embed(44, 1247);
    expect(spy).toHaveBeenCalledWith("[embed] 44/44 articles embedded (1,247 chunks)");
    spy.mockRestore();
  });

  it("formats sync messages", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const log = new SeedLogger();
    log.sync("GitHub", "7 events → 4 raw drops (3 deduped)");
    expect(spy).toHaveBeenCalledWith("[sync] GitHub → 7 events → 4 raw drops (3 deduped)");
    spy.mockRestore();
  });

  it("formats validation results", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const log = new SeedLogger();
    log.validate(31, 0);
    expect(spy).toHaveBeenCalledWith("[validate] 31 articles checked — 31 valid, 0 malformed");
    spy.mockRestore();
  });

  it("formats link resolution", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const log = new SeedLogger();
    log.links(45, 2);
    expect(spy).toHaveBeenCalledWith("[link] Resolving wiki links — 45 refs resolved, 2 unresolved");
    spy.mockRestore();
  });

  it("prints summary report", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const log = new SeedLogger();
    log.summary({ yaml: 31, compiled: 13, github: 4, gmail: 5, totalEmbedded: 53, chunks: 1247, warnings: 1, errors: 0 });
    const output = spy.mock.calls.map(c => c[0]).join("\n");
    expect(output).toContain("Seed Complete");
    expect(output).toContain("YAML transforms:  31");
    expect(output).toContain("Compiled:         13");
    expect(output).toContain("Errors:            0");
    spy.mockRestore();
  });
});
