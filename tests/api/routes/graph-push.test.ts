import { describe, it, expect } from "vitest";
import Fastify from "fastify";
import { graphPushRoute } from "../../../src/api/routes/graph-push.js";

function buildApp(repoPath = "") {
  const app = Fastify();
  app.decorate("vaultRoot", "/tmp/test");
  app.decorate("store", { search: async () => [], listAll: async () => [] });
  app.decorate("config", {
    graph: {
      explorer_repo_path: repoPath,
      umap_seed: 42,
      cache_path: "wiki/.graph-cache.json",
    },
  });
  app.register(graphPushRoute);
  return app;
}

describe("POST /graph-push", () => {
  it("returns 400 when explorer_repo_path is not configured", async () => {
    const app = buildApp("");
    await app.ready();

    const res = await app.inject({ method: "POST", url: "/graph-push" });
    expect(res.statusCode).toBe(400);
    expect(res.json().error).toBe("not_configured");

    await app.close();
  });
});
