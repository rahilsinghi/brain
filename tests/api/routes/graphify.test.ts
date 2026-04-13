import { describe, it, expect, beforeAll, afterAll } from "vitest";
import Fastify from "fastify";
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { graphifyRoute } from "../../../src/api/routes/graphify.js";

const TEST_VAULT = "/tmp/test-graphify-vault";
const TEST_REPO = "/tmp/test-graphify-repo";

function buildApp() {
  const app = Fastify();
  app.decorate("vaultRoot", TEST_VAULT);
  app.decorate("store", null);
  app.decorate("config", {});
  app.decorate("synthesizeFn", null);
  app.register(graphifyRoute);
  return app;
}

describe("POST /graphify", () => {
  beforeAll(() => {
    mkdirSync(TEST_VAULT, { recursive: true });
    // Set up a real git repo for the 202 test
    mkdirSync(join(TEST_REPO, ".git"), { recursive: true });
  });

  afterAll(() => {
    rmSync(TEST_VAULT, { recursive: true, force: true });
    rmSync(TEST_REPO, { recursive: true, force: true });
  });

  it("returns 400 when repo_path is missing", async () => {
    const app = buildApp();
    await app.ready();

    const res = await app.inject({
      method: "POST",
      url: "/graphify",
      payload: {},
    });

    expect(res.statusCode).toBe(400);
    await app.close();
  });

  it("returns 400 when repo_path does not exist", async () => {
    const app = buildApp();
    await app.ready();

    const res = await app.inject({
      method: "POST",
      url: "/graphify",
      payload: { repo_path: "/tmp/this-path-does-not-exist-xyz" },
    });

    expect(res.statusCode).toBe(400);
    const body = res.json();
    expect(body.message).toContain("does not exist");
    await app.close();
  });

  it("returns 400 when path exists but has no .git directory", async () => {
    const app = buildApp();
    await app.ready();

    const notARepo = "/tmp/test-graphify-not-a-repo";
    mkdirSync(notARepo, { recursive: true });

    try {
      const res = await app.inject({
        method: "POST",
        url: "/graphify",
        payload: { repo_path: notARepo },
      });

      expect(res.statusCode).toBe(400);
      const body = res.json();
      expect(body.message).toContain("Not a git repository");
    } finally {
      rmSync(notARepo, { recursive: true, force: true });
    }

    await app.close();
  });

  it("returns 202 with correct shape for a valid git repo", async () => {
    const app = buildApp();
    await app.ready();

    const res = await app.inject({
      method: "POST",
      url: "/graphify",
      payload: { repo_path: TEST_REPO, depth: 3 },
    });

    expect(res.statusCode).toBe(202);
    const body = res.json();
    expect(body.status).toBe("accepted");
    expect(body.repo_name).toBe("test-graphify-repo");
    expect(body.message).toBeTruthy();
    expect(body.deep_link).toBe(
      "https://brain.rahilsinghi.com/?focus=project:test-graphify-repo&depth=3",
    );

    await app.close();
  });
});
