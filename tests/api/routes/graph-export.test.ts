import { describe, it, expect, beforeEach, afterEach } from "vitest";
import Fastify from "fastify";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graphExportRoute } from "../../../src/api/routes/graph-export.js";
import type { GraphCache } from "../../../src/types.js";

const TEST_VAULT = join(import.meta.dirname, "__fixtures__/graph-export-test");

const mockCache: GraphCache = {
  generated_at: "2026-04-10T00:00:00Z",
  node_count: 2,
  nodes: [
    {
      id: "projects/a.md",
      title: "A",
      tags: [],
      category: "projects",
      source_type: "ai",
      created_at: "2026-04-10",
      connection_count: 1,
      x: 0,
      y: 0,
      z: 0,
    },
    {
      id: "skills/b.md",
      title: "B",
      tags: [],
      category: "skills",
      source_type: "ai",
      created_at: "2026-04-10",
      connection_count: 1,
      x: 1,
      y: 1,
      z: 1,
    },
  ],
  links: [{ source: "projects/a.md", target: "skills/b.md" }],
};

function buildApp() {
  const app = Fastify();
  app.decorate("vaultRoot", TEST_VAULT);
  app.decorate("config", { graph: { cache_path: "wiki/.graph-cache.json" } });
  app.register(graphExportRoute);
  return app;
}

describe("GET /graph-export", () => {
  beforeEach(() => {
    const cacheDir = join(TEST_VAULT, "wiki");
    mkdirSync(cacheDir, { recursive: true });
    writeFileSync(join(cacheDir, ".graph-cache.json"), JSON.stringify(mockCache));
  });

  afterEach(() => {
    rmSync(TEST_VAULT, { recursive: true, force: true });
  });

  it("returns cached graph data", async () => {
    const app = buildApp();
    await app.ready();

    const res = await app.inject({ method: "GET", url: "/graph-export" });
    expect(res.statusCode).toBe(200);

    const body = res.json();
    expect(body.node_count).toBe(2);
    expect(body.nodes).toHaveLength(2);
    expect(body.links).toHaveLength(1);

    await app.close();
  });

  it("returns 404 when cache does not exist", async () => {
    rmSync(TEST_VAULT, { recursive: true, force: true });
    mkdirSync(TEST_VAULT, { recursive: true });

    const app = buildApp();
    await app.ready();

    const res = await app.inject({ method: "GET", url: "/graph-export" });
    expect(res.statusCode).toBe(404);

    const body = res.json();
    expect(body.error).toBe("cache_not_found");

    await app.close();
  });
});
