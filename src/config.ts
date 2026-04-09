import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { parse as parseYaml } from "yaml";
import type { BrainConfig } from "./types.js";

const DEFAULTS: BrainConfig = {
  api: {
    port: 3577,
    host: "127.0.0.1", // localhost-only; Tailscale handles remote routing
    synthesise_timeout_ms: 30000,
    default_top_k: 8,
  },
  telegram: {
    bot_token: null,
    allowed_user_ids: [],
    poll_timeout_s: 30,
  },
  daemon: { log_level: "info" },
  watchers: { raw_dir: "raw/", wiki_dir: "wiki/", voice_dir: "raw/voice/" },
  cron: { mcp_sources: "0 * * * *", calendar: "0 22 * * *", lint_heal: "0 3 * * *" },
  compile: {
    max_single_pass_words: 5000,
    max_chunked_words: 20000,
    max_staged_words: 100000,
    max_retries: 3,
  },
  heal: {
    max_operations_per_run: 20,
    max_web_searches_per_run: 5,
    human_edit_cooldown_hours: 24,
  },
  query: { default_top_k: 8, novelty_threshold: 0.85 },
  embeddings: { model: "nomic-embed-text", provider: "xenova" },
  visual: {
    marp_theme: "templates/brutalist-marp.css",
    matplotlib_rc: "templates/brutalist-matplotlib.json",
    mermaid_theme: "templates/mermaid-theme.json",
  },
  transcription: {
    provider: "local",
    local_model: "medium",
    openai_model: "whisper-1",
  },
  voice: {
    clusters: ["personal", "work", "life", "language"],
    default_cluster: "personal",
    classify_model: "claude-haiku-4-5-20251001",
  },
};

function loadEnv(vaultRoot: string): void {
  const envPath = join(vaultRoot, ".brain", ".env");
  if (!existsSync(envPath)) return;
  const content = readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim();
    if (value) process.env[key] = value;
  }
}

function deepMerge(
  target: Record<string, unknown>,
  source: Record<string, unknown>
): Record<string, unknown> {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key]) &&
      target[key] &&
      typeof target[key] === "object"
    ) {
      result[key] = deepMerge(
        target[key] as Record<string, unknown>,
        source[key] as Record<string, unknown>
      );
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

export function loadConfig(vaultRoot: string): BrainConfig {
  loadEnv(vaultRoot);
  const configPath = join(vaultRoot, ".brain", "config.yaml");
  if (!existsSync(configPath)) return DEFAULTS;
  const raw = readFileSync(configPath, "utf-8");
  const parsed = parseYaml(raw) as Record<string, unknown> | null;
  if (!parsed) return DEFAULTS;
  return deepMerge(
    DEFAULTS as unknown as Record<string, unknown>,
    parsed
  ) as unknown as BrainConfig;
}
