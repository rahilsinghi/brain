import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mkdirSync, rmSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { appendDailyEntry, writeDailySummary } from "../../src/daily/log.js";

const tmpDir = join(import.meta.dirname, ".tmp-daily-test");

beforeEach(() => {
  mkdirSync(tmpDir, { recursive: true });
});

afterEach(() => {
  rmSync(tmpDir, { recursive: true, force: true });
});

describe("appendDailyEntry", () => {
  it("creates daily file with frontmatter and all section headers if missing", () => {
    appendDailyEntry(tmpDir, "personal", "Voice: thinking about apartments...");
    const date = new Date().toISOString().split("T")[0];
    const filePath = join(tmpDir, "daily", `${date}.md`);
    expect(existsSync(filePath)).toBe(true);
    const content = readFileSync(filePath, "utf-8");
    expect(content).toContain(`title: "${date} — Daily Log"`);
    expect(content).toContain("## Personal");
    expect(content).toContain("## Work");
    expect(content).toContain("## Life");
    expect(content).toContain("## Language");
    expect(content).toContain("## System Activity");
    expect(content).toContain("Voice: thinking about apartments...");
  });

  it("appends entry under correct cluster section", () => {
    appendDailyEntry(tmpDir, "work", "First work entry");
    appendDailyEntry(tmpDir, "personal", "A personal thought");
    appendDailyEntry(tmpDir, "work", "Second work entry");
    const date = new Date().toISOString().split("T")[0];
    const filePath = join(tmpDir, "daily", `${date}.md`);
    const content = readFileSync(filePath, "utf-8");
    const workSection = content.split("## Work")[1].split("##")[0];
    expect(workSection).toContain("First work entry");
    expect(workSection).toContain("Second work entry");
    const personalSection = content.split("## Personal")[1].split("##")[0];
    expect(personalSection).toContain("A personal thought");
  });

  it("appends system activity entries under System Activity section", () => {
    appendDailyEntry(tmpDir, "system", "Nightly lint: 2 issues found");
    const date = new Date().toISOString().split("T")[0];
    const filePath = join(tmpDir, "daily", `${date}.md`);
    const content = readFileSync(filePath, "utf-8");
    const systemSection = content.split("## System Activity")[1] ?? "";
    expect(systemSection).toContain("Nightly lint: 2 issues found");
  });

  it("prepends HH:MM timestamp to each entry", () => {
    appendDailyEntry(tmpDir, "personal", "A thought");
    const date = new Date().toISOString().split("T")[0];
    const filePath = join(tmpDir, "daily", `${date}.md`);
    const content = readFileSync(filePath, "utf-8");
    expect(content).toMatch(/- \d{2}:\d{2} — A thought/);
  });
});

describe("writeDailySummary", () => {
  it("inserts summary blockquote after heading", async () => {
    appendDailyEntry(tmpDir, "personal", "Voice: test note");
    const mockClaude = vi.fn().mockResolvedValue("2 voice notes captured. Focus on testing.");
    const date = new Date().toISOString().split("T")[0];
    await writeDailySummary(tmpDir, date, mockClaude);
    const filePath = join(tmpDir, "daily", `${date}.md`);
    const content = readFileSync(filePath, "utf-8");
    expect(content).toContain("> 2 voice notes captured. Focus on testing.");
    expect(mockClaude).toHaveBeenCalledWith(expect.stringContaining("test note"));
  });

  it("does nothing if daily file does not exist", async () => {
    const mockClaude = vi.fn();
    await writeDailySummary(tmpDir, "2026-01-01", mockClaude);
    expect(mockClaude).not.toHaveBeenCalled();
  });
});
