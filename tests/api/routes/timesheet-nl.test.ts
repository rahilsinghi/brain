import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Fastify from "fastify";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const mockGenerate = vi.fn();
vi.mock("../../../src/llm/provider.js", () => ({
  generate: (...args: unknown[]) => mockGenerate(...args),
}));

import { TimesheetDB } from "../../../src/timesheet/db.js";
import { timesheetNLRoute } from "../../../src/api/routes/timesheet-nl.js";

describe("POST /timesheet/nl", () => {
  let dir: string;
  let db: TimesheetDB;

  beforeEach(() => {
    mockGenerate.mockReset();
    dir = mkdtempSync(join(tmpdir(), "brain-ts-nl-api-"));
    db = new TimesheetDB(join(dir, "ts.db"));
    db.upsertEmployer({ id: "maison", rate_hourly: 50, weekly_cap_hours: 20, monthly_bonus: null, currency: "USD" });
  });

  afterEach(() => {
    db.close();
    rmSync(dir, { recursive: true, force: true });
  });

  async function buildApp() {
    const app = Fastify();
    app.decorate("timesheetDb", db);
    app.decorate("config", {
      timesheet: { scanner: { timezone: "America/New_York" } },
    } as never);
    await app.register(timesheetNLRoute);
    return app;
  }

  it("returns 200 with formatted response on success", async () => {
    mockGenerate.mockResolvedValue({
      text: JSON.stringify({ entries: [{ hours: 1, employer: "maison", category: "coding", description: "x" }] }),
      provider: "ollama",
      model: "qwen3:32b",
      inputTokens: 10,
      outputTokens: 10,
    });

    const app = await buildApp();
    const res = await app.inject({
      method: "POST",
      url: "/timesheet/nl",
      payload: { text: "1h maison coding", source: "mcp" },
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toContain("✓");
    expect(res.body).toContain("maison");
    await app.close();
  });

  it("returns 400 on empty text", async () => {
    const app = await buildApp();
    const res = await app.inject({
      method: "POST",
      url: "/timesheet/nl",
      payload: { text: "" },
    });

    expect(res.statusCode).toBe(400);
    await app.close();
  });

  it("returns 200 with error body on LLM failure (not 500)", async () => {
    mockGenerate.mockResolvedValue({
      text: JSON.stringify({ error: "not a timesheet entry", entries: [] }),
      provider: "ollama",
      model: "qwen3:32b",
      inputTokens: 10,
      outputTokens: 10,
    });

    const app = await buildApp();
    const res = await app.inject({
      method: "POST",
      url: "/timesheet/nl",
      payload: { text: "what time is it" },
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toContain("✗");
    await app.close();
  });
});
