import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { loadConfig } from "../src/config.js";
import { writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const TEST_DIR = join(import.meta.dirname, "__fixtures__/config-test");

describe("loadConfig", () => {
  beforeEach(() => {
    mkdirSync(join(TEST_DIR, ".brain"), { recursive: true });
  });

  afterEach(() => {
    rmSync(TEST_DIR, { recursive: true, force: true });
  });

  it("loads config.yaml and .env from vault root", () => {
    writeFileSync(
      join(TEST_DIR, ".brain/config.yaml"),
      `daemon:\n  log_level: debug\ncompile:\n  max_retries: 5\n`
    );
    writeFileSync(
      join(TEST_DIR, ".brain/.env"),
      `ANTHROPIC_API_KEY=sk-test-123\n`
    );

    const config = loadConfig(TEST_DIR);

    expect(config.daemon.log_level).toBe("debug");
    expect(config.compile.max_retries).toBe(5);
    expect(process.env.ANTHROPIC_API_KEY).toBe("sk-test-123");
  });

  it("returns defaults when config.yaml is missing", () => {
    const config = loadConfig(TEST_DIR);

    expect(config.daemon.log_level).toBe("info");
    expect(config.compile.max_retries).toBe(3);
  });
});
