import { describe, it, expect, beforeEach, afterEach } from "vitest";
import Fastify from "fastify";
import { mkdirSync, rmSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ingestRoute } from "../../../src/api/routes/ingest.js";

const TEST_VAULT = join(import.meta.dirname, "__fixtures__/ingest-test");

function buildApp() {
  const app = Fastify();
  app.decorate("vaultRoot", TEST_VAULT);
  app.decorate("store", null);
  app.register(ingestRoute);
  return app;
}

describe("POST /ingest", () => {
  beforeEach(() => {
    mkdirSync(TEST_VAULT, { recursive: true });
  });

  afterEach(() => {
    rmSync(TEST_VAULT, { recursive: true, force: true });
  });

  it("returns 202 with source_id for valid request", async () => {
    const app = buildApp();
    await app.ready();

    const res = await app.inject({
      method: "POST",
      url: "/ingest",
      payload: {
        content: "# Meeting notes\n\nDiscussed product roadmap.",
        source: "telegram",
      },
    });

    expect(res.statusCode).toBe(202);
    const body = res.json();
    expect(body.source_id).toMatch(/^api\/articles\//);
    expect(body.raw_path).toMatch(/^raw\/api\/articles\//);
    expect(body.ingested_at).toBeTruthy();

    await app.close();
  });

  it("writes file with correct frontmatter", async () => {
    const app = buildApp();
    await app.ready();

    const res = await app.inject({
      method: "POST",
      url: "/ingest",
      payload: {
        content: "Some knowledge content",
        source: "web",
        title: "Test Article",
      },
    });

    const body = res.json();
    const fullPath = join(TEST_VAULT, body.raw_path);
    expect(existsSync(fullPath)).toBe(true);

    const fileContent = readFileSync(fullPath, "utf-8");
    expect(fileContent).toContain("source_type: api");
    expect(fileContent).toContain("channel: web");
    expect(fileContent).toContain("status: pending");
    expect(fileContent).toContain("parsed_at: null");
    expect(fileContent).toContain("Some knowledge content");

    await app.close();
  });

  it("merges metadata into frontmatter without overwriting system fields", async () => {
    const app = buildApp();
    await app.ready();

    const res = await app.inject({
      method: "POST",
      url: "/ingest",
      payload: {
        content: "Content here",
        source: "voice",
        metadata: { speaker: "rahil", duration_s: 45 },
      },
    });

    const body = res.json();
    const fullPath = join(TEST_VAULT, body.raw_path);
    const fileContent = readFileSync(fullPath, "utf-8");
    expect(fileContent).toContain("speaker: rahil");
    expect(fileContent).toContain("duration_s: 45");
    expect(fileContent).toContain("source_type: api");

    await app.close();
  });

  it("generates unique slugs for rapid calls", async () => {
    const app = buildApp();
    await app.ready();

    const [res1, res2] = await Promise.all([
      app.inject({
        method: "POST",
        url: "/ingest",
        payload: { content: "First message", source: "telegram" },
      }),
      app.inject({
        method: "POST",
        url: "/ingest",
        payload: { content: "Second message", source: "telegram" },
      }),
    ]);

    expect(res1.json().source_id).not.toBe(res2.json().source_id);

    await app.close();
  });

  it("returns 400 for missing content", async () => {
    const app = buildApp();
    await app.ready();

    const res = await app.inject({
      method: "POST",
      url: "/ingest",
      payload: { source: "telegram" },
    });

    expect(res.statusCode).toBe(400);
    await app.close();
  });

  it("returns 400 for missing source", async () => {
    const app = buildApp();
    await app.ready();

    const res = await app.inject({
      method: "POST",
      url: "/ingest",
      payload: { content: "some content" },
    });

    expect(res.statusCode).toBe(400);
    await app.close();
  });
});
