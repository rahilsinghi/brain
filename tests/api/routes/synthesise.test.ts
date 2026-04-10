import { describe, it, expect, vi } from "vitest";
import Fastify from "fastify";
import { synthesiseRoute } from "../../../src/api/routes/synthesise.js";

function buildApp(
  synthesizeFn: (...args: unknown[]) => Promise<unknown>,
  config = { api: { synthesise_timeout_ms: 5000, default_top_k: 8 } },
) {
  const app = Fastify();
  app.decorate("vaultRoot", "/tmp/test");
  app.decorate("store", { search: async () => [] });
  app.decorate("config", config);
  app.decorate("synthesizeFn", synthesizeFn);
  app.register(synthesiseRoute);
  return app;
}

describe("POST /synthesise", () => {
  it("returns 200 with full synthesis result", async () => {
    const mockSynthesize = vi.fn().mockResolvedValue({
      answer: "Kismet used a real-time event pipeline.",
      sourcePaths: ["wiki/experience/exp-kismet-ai-data.md"],
      chunks: [
        {
          id: "chunk-1",
          filePath: "wiki/experience/exp-kismet-ai-data.md",
          breadcrumb: "Experience > Kismet",
          heading: "Tech Stack",
          content: "Built real-time event pipeline...",
          sectionHash: "abc123",
        },
      ],
      provider: "gemini",
      model: "gemini-2.5-flash",
    });

    const app = buildApp(mockSynthesize);
    await app.ready();

    const res = await app.inject({
      method: "POST",
      url: "/synthesise",
      payload: { query: "What did I build at Kismet?" },
    });

    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.query_id).toBeTruthy();
    expect(body.answer).toContain("Kismet");
    expect(body.sources).toHaveLength(1);
    expect(body.sources[0].file).toBe("wiki/experience/exp-kismet-ai-data.md");
    expect(body.provider).toBe("gemini");
    expect(body.model).toBe("gemini-2.5-flash");
    expect(typeof body.latency_ms).toBe("number");

    expect(mockSynthesize).toHaveBeenCalledWith(
      "What did I build at Kismet?",
      expect.anything(),
      8,
    );

    await app.close();
  });

  it("passes custom top_k to synthesize", async () => {
    const mockSynthesize = vi.fn().mockResolvedValue({
      answer: "Answer",
      sourcePaths: [],
      chunks: [],
      provider: "gemini",
      model: "gemini-2.5-flash",
    });

    const app = buildApp(mockSynthesize);
    await app.ready();

    await app.inject({
      method: "POST",
      url: "/synthesise",
      payload: { query: "test", top_k: 3 },
    });

    expect(mockSynthesize).toHaveBeenCalledWith("test", expect.anything(), 3);
    await app.close();
  });

  it("returns 200 with empty sources when no chunks match", async () => {
    const mockSynthesize = vi.fn().mockResolvedValue({
      answer: "No relevant knowledge found.",
      sourcePaths: [],
      chunks: [],
      provider: "none",
      model: "none",
    });

    const app = buildApp(mockSynthesize);
    await app.ready();

    const res = await app.inject({
      method: "POST",
      url: "/synthesise",
      payload: { query: "Something I don't know about" },
    });

    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.sources).toEqual([]);
    expect(body.query_id).toBeTruthy();
    await app.close();
  });

  it("returns 502 when synthesize throws", async () => {
    const mockSynthesize = vi.fn().mockRejectedValue(new Error("Claude API down"));

    const app = buildApp(mockSynthesize);
    await app.ready();

    const res = await app.inject({
      method: "POST",
      url: "/synthesise",
      payload: { query: "test query" },
    });

    expect(res.statusCode).toBe(502);
    const body = res.json();
    expect(body.error).toBe("synthesis_failed");
    expect(body.query_id).toBeTruthy();
    expect(body.message).toContain("Claude API down");
    await app.close();
  });

  it("returns 504 when synthesize times out", async () => {
    const neverResolves = vi.fn().mockReturnValue(new Promise(() => {}));

    const app = buildApp(neverResolves, {
      api: { synthesise_timeout_ms: 100, default_top_k: 8 },
    });
    await app.ready();

    const res = await app.inject({
      method: "POST",
      url: "/synthesise",
      payload: { query: "test query" },
    });

    expect(res.statusCode).toBe(504);
    const body = res.json();
    expect(body.error).toBe("synthesis_timeout");
    expect(body.query_id).toBeTruthy();
    await app.close();
  });

  it("returns 400 for missing query", async () => {
    const app = buildApp(vi.fn());
    await app.ready();

    const res = await app.inject({
      method: "POST",
      url: "/synthesise",
      payload: {},
    });

    expect(res.statusCode).toBe(400);
    await app.close();
  });
});
