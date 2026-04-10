import { describe, it, expect, vi } from "vitest";
import { createServer, stopServer } from "../../src/api/server.js";
import type { BrainConfig } from "../../src/types.js";

const mockConfig = {
  api: {
    port: 0,
    host: "127.0.0.1",
    synthesise_timeout_ms: 5000,
    default_top_k: 8,
  },
} as BrainConfig;

const mockStore = { search: vi.fn().mockResolvedValue([]) } as unknown;

describe("createServer", () => {
  it("creates a Fastify instance with all routes registered", async () => {
    const mockSynthesize = vi.fn().mockResolvedValue({
      answer: "test",
      sourcePaths: [],
      chunks: [],
      novelty_score: 0.9,
    });

    const server = createServer({
      store: mockStore as never,
      vaultRoot: "/tmp/test-vault",
      config: mockConfig,
      synthesizeFn: mockSynthesize,
    });

    await server.ready();

    // Verify routes are registered
    const healthRes = await server.inject({ method: "GET", url: "/health" });
    expect(healthRes.statusCode).toBe(200);

    const ingestRes = await server.inject({
      method: "POST",
      url: "/ingest",
      payload: { content: "test", source: "test" },
    });
    expect(ingestRes.statusCode).toBe(202);

    const synthRes = await server.inject({
      method: "POST",
      url: "/synthesise",
      payload: { query: "test" },
    });
    expect(synthRes.statusCode).toBe(200);

    await server.close();
  });
});

describe("stopServer", () => {
  it("resolves after in-flight request completes", async () => {
    let resolveHeld!: () => void;
    const held = new Promise<void>((r) => {
      resolveHeld = r;
    });

    const mockSynthesize = vi.fn().mockReturnValue(
      held.then(() => ({ answer: "done", sourcePaths: [], chunks: [], novelty_score: 0.9 })),
    );

    const server = createServer({
      store: mockStore as never,
      vaultRoot: "/tmp/test-vault",
      config: mockConfig,
      synthesizeFn: mockSynthesize,
    });

    await server.listen({ port: 0, host: "127.0.0.1" });
    const port = (server.server.address() as { port: number }).port;

    // Start an in-flight request
    const inflightPromise = fetch(`http://127.0.0.1:${port}/synthesise`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: "test" }),
    });

    // Give the request time to reach the handler
    await new Promise((r) => setTimeout(r, 50));

    // Start shutdown — should wait for in-flight request
    const shutdownPromise = stopServer(server, 5000);

    // Resolve the held request
    resolveHeld();

    // Both should complete
    const [response] = await Promise.all([inflightPromise, shutdownPromise]);
    expect(response.status).toBe(200);
  });
});
