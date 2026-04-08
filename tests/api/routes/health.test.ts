import { describe, it, expect } from "vitest";
import Fastify from "fastify";
import { healthRoute } from "../../../src/api/routes/health.js";

describe("GET /health", () => {
  it("returns 200 with status shape", async () => {
    const app = Fastify();
    app.decorate("vaultRoot", "/tmp/test-vault");
    app.decorate("store", { search: async () => [] });
    app.register(healthRoute);
    await app.ready();

    const res = await app.inject({ method: "GET", url: "/health" });

    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.status).toBe("ok");
    expect(typeof body.uptime_s).toBe("number");
    expect(typeof body.lancedb_ready).toBe("boolean");
    expect(typeof body.wiki_article_count).toBe("number");
    expect(typeof body.raw_pending_count).toBe("number");

    await app.close();
  });
});
