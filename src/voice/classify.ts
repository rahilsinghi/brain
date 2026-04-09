import Anthropic from "@anthropic-ai/sdk";
import type { Cluster } from "../types.js";

export interface PrefixResult {
  cluster: Cluster;
  text: string;
}

const PREFIX_MAP: Record<string, Cluster> = {
  personal: "personal",
  work: "work",
  life: "life",
  language: "language",
  tone: "language",
};

export function detectPrefix(text: string): PrefixResult | null {
  const firstLine = text.split("\n")[0] ?? "";
  const match = firstLine.match(/^(\w+)[,:]\s*(.*)/i);
  if (!match) return null;
  const keyword = match[1].toLowerCase();
  const cluster = PREFIX_MAP[keyword];
  if (!cluster) return null;
  const remaining = match[2] + text.slice(firstLine.length);
  return { cluster, text: remaining.trim() };
}

export interface ClassifyResult {
  cluster: Cluster;
  text: string;
  fallback: boolean;
}

type ClaudeFn = (prompt: string, model: string) => Promise<string>;

async function defaultCallClaude(prompt: string, model: string): Promise<string> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const response = await client.messages.create({
    model,
    max_tokens: 20,
    messages: [{ role: "user", content: prompt }],
  });
  const block = response.content[0];
  return block.type === "text" ? block.text.trim().toLowerCase() : "";
}

export interface ClassifyOptions {
  clusters: string[];
  defaultCluster: Cluster;
  classifyModel: string;
  callClaude?: ClaudeFn;
}

export async function classifyCluster(
  rawText: string,
  options: ClassifyOptions,
): Promise<ClassifyResult> {
  const { clusters, defaultCluster, classifyModel, callClaude = defaultCallClaude } = options;

  const prefix = detectPrefix(rawText);
  if (prefix) {
    return { cluster: prefix.cluster, text: prefix.text, fallback: false };
  }

  try {
    const prompt =
      `Classify this voice note into exactly one category. ` +
      `Categories: ${clusters.join(", ")}. ` +
      `Reply with ONLY the category name, nothing else.\n\n` +
      `Voice note: "${rawText.slice(0, 500)}"`;

    const result = await callClaude(prompt, classifyModel);
    const cleaned = result.trim().toLowerCase();

    if (clusters.includes(cleaned)) {
      return { cluster: cleaned as Cluster, text: rawText, fallback: false };
    }

    console.warn(`[classify] Claude returned invalid cluster "${cleaned}", using default`);
    return { cluster: defaultCluster, text: rawText, fallback: true };
  } catch (err) {
    console.error(
      `[classify] Classification failed: ${err instanceof Error ? err.message : String(err)}`,
    );
    return { cluster: defaultCluster, text: rawText, fallback: true };
  }
}
