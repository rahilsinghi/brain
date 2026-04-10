import { describe, it, expect, beforeEach, afterEach } from "vitest";
import Fastify from "fastify";
import { mkdirSync, rmSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { saveRoute } from "../../../src/api/routes/save.js";
import { cacheSynthesis } from "../../../src/api/synthesis-cache.js";
import type { SynthesisResult } from "../../../src/query/synthesize.js";

const TEST_VAULT = join(import.meta.dirname, "__fixtures__/save-test");

function makeSynthesis(overrides?: Partial<SynthesisResult>): SynthesisResult {
  return {
    answer: "Karen is a multi-channel escalation engine.",
    sourcePaths: ["wiki/projects/karen.md"],
    chunks: [],
    provider: "gemini",
    model: "gemini-2.5-flash",
    novelty_score: 0.9,
    ...overrides,
  };
}

function buildApp() {
  const app = Fastify();
  app.decorate("vaultRoot", TEST_VAULT);
  app.decorate("config", {
    query: { novelty_threshold: 0.85 },
  });
  app.register(saveRoute);
  return app;
}

describe("POST /save", () => {
  beforeEach(() => {
    mkdirSync(TEST_VAULT, { recursive: true });
  });

  afterEach(() => {
    rmSync(TEST_VAULT, { recursive: true, force: true });
  });

  it("saves a synthesis result above novelty threshold", async () => {
    const app = buildApp();
    await app.ready();

    cacheSynthesis("q-save-1", "what is karen", makeSynthesis());

    const res = await app.inject({
      method: "POST",
      url: "/save",
      payload: { query_id: "q-save-1" },
    });

    expect(res.statusCode).toBe(201);
    const body = res.json();
    expect(body.saved).toBe(true);
    expect(body.path).toMatch(/^wiki\/synthesis\//);
    expect(body.novelty_score).toBe(0.9);

    const fullPath = join(TEST_VAULT, body.path);
    expect(existsSync(fullPath)).toBe(true);

    const content = readFileSync(fullPath, "utf-8");
    expect(content).toContain("Karen is a multi-channel escalation engine.");
    expect(content).toContain("author: ai");
    expect(content).toContain("tags:");

    await app.close();
  });

  it("rejects below novelty threshold without force", async () => {
    const app = buildApp();
    await app.ready();

    cacheSynthesis(
      "q-save-2",
      "what is karen",
      makeSynthesis({ novelty_score: 0.5 }),
    );

    const res = await app.inject({
      method: "POST",
      url: "/save",
      payload: { query_id: "q-save-2" },
    });

    expect(res.statusCode).toBe(409);
    const body = res.json();
    expect(body.error).toBe("below_novelty_threshold");
    expect(body.novelty_score).toBe(0.5);

    await app.close();
  });

  it("saves below threshold when force is true", async () => {
    const app = buildApp();
    await app.ready();

    cacheSynthesis(
      "q-save-3",
      "what is karen",
      makeSynthesis({ novelty_score: 0.5 }),
    );

    const res = await app.inject({
      method: "POST",
      url: "/save",
      payload: { query_id: "q-save-3", force: true },
    });

    expect(res.statusCode).toBe(201);
    expect(res.json().saved).toBe(true);

    await app.close();
  });

  it("returns 404 for unknown query_id", async () => {
    const app = buildApp();
    await app.ready();

    const res = await app.inject({
      method: "POST",
      url: "/save",
      payload: { query_id: "nonexistent" },
    });

    expect(res.statusCode).toBe(404);
    expect(res.json().error).toBe("query_not_found");

    await app.close();
  });

  it("returns 400 for missing query_id", async () => {
    const app = buildApp();
    await app.ready();

    const res = await app.inject({
      method: "POST",
      url: "/save",
      payload: {},
    });

    expect(res.statusCode).toBe(400);

    await app.close();
  });
});
