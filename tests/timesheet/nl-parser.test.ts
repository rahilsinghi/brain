import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the generate() client before importing the parser
const mockGenerate = vi.fn();
vi.mock("../../src/llm/provider.js", () => ({
  generate: (...args: unknown[]) => mockGenerate(...args),
}));

import { parseTimesheetNL } from "../../src/timesheet/nl-parser.js";

const ctx = {
  now: new Date("2026-04-17T10:00:00-04:00"),
  timezone: "America/New_York",
  employers: ["maison", "wilbo"],
};

beforeEach(() => {
  mockGenerate.mockReset();
});

function mockLLM(jsonString: string): void {
  mockGenerate.mockResolvedValue({
    text: jsonString,
    provider: "ollama",
    model: "qwen3:32b",
    inputTokens: 100,
    outputTokens: 50,
  });
}

describe("parseTimesheetNL — happy paths", () => {
  it("single entry with explicit times", async () => {
    mockLLM(JSON.stringify({
      entries: [{
        hours: 2,
        employer: "maison",
        category: "coding",
        description: "PoC implementation",
        date: "2026-04-16",
        start_time: "3:00p",
        end_time: "5:00p",
      }],
    }));
    const result = await parseTimesheetNL("worked on maison PoC 3-5pm yesterday", ctx);
    expect(result.error).toBeUndefined();
    expect(result.commands).toHaveLength(1);
    expect(result.commands[0]).toEqual({
      type: "add",
      hours: 2,
      employerId: "maison",
      category: "coding",
      description: "PoC implementation",
      startTime: "3:00p",
      endTime: "5:00p",
    });
    expect(result.inferredDate).toBe("2026-04-16");
  });

  it("single entry with duration only (no times)", async () => {
    mockLLM(JSON.stringify({
      entries: [{
        hours: 2,
        employer: "maison",
        category: "coding",
        description: "debugging",
      }],
    }));
    const result = await parseTimesheetNL("2h maison debugging", ctx);
    expect(result.error).toBeUndefined();
    expect(result.commands).toHaveLength(1);
    expect(result.commands[0]).toMatchObject({
      type: "add",
      hours: 2,
      employerId: "maison",
      category: "coding",
      description: "debugging",
    });
    expect((result.commands[0] as { startTime?: string }).startTime).toBeUndefined();
    expect(result.inferredDate).toBe("2026-04-17");
  });

  it("multiple entries in one message", async () => {
    mockLLM(JSON.stringify({
      entries: [
        { hours: 2, employer: "maison", category: "coding", description: "coding" },
        { hours: 1, employer: "maison", category: "meeting", description: "Fredrik 1:1" },
      ],
    }));
    const result = await parseTimesheetNL("2h coding then 1h Fredrik 1:1", ctx);
    expect(result.error).toBeUndefined();
    expect(result.commands).toHaveLength(2);
    expect(result.commands[0]).toMatchObject({ hours: 2, category: "coding" });
    expect(result.commands[1]).toMatchObject({ hours: 1, category: "meeting" });
  });

  it("uses earliest entry's date as inferredDate when explicit dates present", async () => {
    mockLLM(JSON.stringify({
      entries: [
        { hours: 1, employer: "maison", category: "coding", description: "x", date: "2026-04-16" },
        { hours: 2, employer: "maison", category: "coding", description: "y", date: "2026-04-15" },
      ],
    }));
    const result = await parseTimesheetNL("...", ctx);
    expect(result.inferredDate).toBe("2026-04-15");
  });

  it("records llmResponseRaw and durationMs for telemetry", async () => {
    mockLLM(JSON.stringify({
      entries: [{ hours: 1, employer: "maison", category: "coding", description: "x" }],
    }));
    const result = await parseTimesheetNL("1h maison coding", ctx);
    expect(result.llmResponseRaw).toContain("entries");
    expect(typeof result.durationMs).toBe("number");
    expect(result.durationMs!).toBeGreaterThanOrEqual(0);
  });
});

describe("parseTimesheetNL — validation failures", () => {
  it("rejects unknown employer from LLM", async () => {
    mockLLM(JSON.stringify({
      entries: [{ hours: 2, employer: "asknyc", category: "coding", description: "x" }],
    }));
    const result = await parseTimesheetNL("2h asknyc work", ctx);
    expect(result.error).toContain("unknown employer");
    expect(result.commands).toHaveLength(0);
  });

  it("rejects invalid category", async () => {
    mockLLM(JSON.stringify({
      entries: [{ hours: 2, employer: "maison", category: "strategy", description: "x" }],
    }));
    const result = await parseTimesheetNL("2h maison strategy", ctx);
    expect(result.error).toContain("invalid category");
    expect(result.commands).toHaveLength(0);
  });

  it("rejects hours <= 0", async () => {
    mockLLM(JSON.stringify({
      entries: [{ hours: 0, employer: "maison", category: "coding", description: "x" }],
    }));
    const result = await parseTimesheetNL("0h maison", ctx);
    expect(result.error).toMatch(/hours/i);
    expect(result.commands).toHaveLength(0);
  });

  it("rejects hours > 12", async () => {
    mockLLM(JSON.stringify({
      entries: [{ hours: 20, employer: "maison", category: "coding", description: "x" }],
    }));
    const result = await parseTimesheetNL("20h maison", ctx);
    expect(result.error).toMatch(/hours/i);
    expect(result.commands).toHaveLength(0);
  });

  it("rejects malformed date", async () => {
    mockLLM(JSON.stringify({
      entries: [{ hours: 2, employer: "maison", category: "coding", description: "x", date: "not-a-date" }],
    }));
    const result = await parseTimesheetNL("...", ctx);
    expect(result.error).toMatch(/date/i);
    expect(result.commands).toHaveLength(0);
  });

  it("rejects malformed time", async () => {
    mockLLM(JSON.stringify({
      entries: [{ hours: 2, employer: "maison", category: "coding", description: "x", start_time: "noon" }],
    }));
    const result = await parseTimesheetNL("...", ctx);
    expect(result.error).toMatch(/time/i);
    expect(result.commands).toHaveLength(0);
  });

  it("all-or-nothing: one bad entry kills the batch", async () => {
    mockLLM(JSON.stringify({
      entries: [
        { hours: 2, employer: "maison", category: "coding", description: "ok" },
        { hours: 1, employer: "asknyc", category: "meeting", description: "bad" },
      ],
    }));
    const result = await parseTimesheetNL("...", ctx);
    expect(result.error).toContain("unknown employer");
    expect(result.commands).toHaveLength(0);
  });
});

describe("parseTimesheetNL — LLM output handling", () => {
  it("passes through LLM-signalled error (not a timesheet)", async () => {
    mockLLM(JSON.stringify({ error: "not a timesheet entry", entries: [] }));
    const result = await parseTimesheetNL("what time is it", ctx);
    expect(result.error).toBe("not a timesheet entry");
    expect(result.commands).toHaveLength(0);
  });

  it("rejects non-JSON response", async () => {
    mockLLM("<html>server error</html>");
    const result = await parseTimesheetNL("...", ctx);
    expect(result.error).toMatch(/not valid JSON/i);
    expect(result.commands).toHaveLength(0);
  });

  it("rejects JSON missing entries field", async () => {
    mockLLM(JSON.stringify({ foo: "bar" }));
    const result = await parseTimesheetNL("...", ctx);
    expect(result.error).toMatch(/entries/i);
    expect(result.commands).toHaveLength(0);
  });

  it("employer match is case-insensitive", async () => {
    mockLLM(JSON.stringify({
      entries: [{ hours: 1, employer: "Maison", category: "coding", description: "x" }],
    }));
    const result = await parseTimesheetNL("1h Maison coding", ctx);
    expect(result.error).toBeUndefined();
    expect(result.commands[0]).toMatchObject({ employerId: "maison" });
  });

  it("strips markdown code fences if model adds them", async () => {
    mockLLM('```json\n{"entries":[{"hours":1,"employer":"maison","category":"coding","description":"x"}]}\n```');
    const result = await parseTimesheetNL("...", ctx);
    expect(result.error).toBeUndefined();
    expect(result.commands).toHaveLength(1);
  });
});
