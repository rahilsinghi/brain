import Anthropic from "@anthropic-ai/sdk";
import { VertexAI } from "@google-cloud/vertexai";

export interface LLMRequest {
  prompt: string;
  maxTokens?: number;
  model?: string;
  /** If true, expect JSON output (adds response_format for supported providers) */
  json?: boolean;
}

export interface LLMResponse {
  text: string;
  provider: "anthropic" | "gemini";
  model: string;
  inputTokens?: number;
  outputTokens?: number;
}

export interface LLMProvider {
  name: "anthropic" | "gemini";
  generate(request: LLMRequest): Promise<LLMResponse>;
}

// --- Anthropic provider ---

function createAnthropicProvider(): LLMProvider | null {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  const client = new Anthropic({ apiKey });

  return {
    name: "anthropic",
    async generate(req: LLMRequest): Promise<LLMResponse> {
      const model = req.model ?? "claude-sonnet-4-6";
      const response = await client.messages.create({
        model,
        max_tokens: req.maxTokens ?? 4096,
        messages: [{ role: "user", content: req.prompt }],
      });

      const text = response.content[0].type === "text" ? response.content[0].text : "";
      return {
        text,
        provider: "anthropic",
        model,
        inputTokens: response.usage.input_tokens,
        outputTokens: response.usage.output_tokens,
      };
    },
  };
}

// --- Gemini provider via Vertex AI (uses GCP billing credits) ---

interface GeminiProject {
  projectId: string;
  failCount: number;
  lastFailure: number;
}

function createGeminiProvider(): LLMProvider | null {
  const projects: GeminiProject[] = [];

  // Project IDs with GCP billing credits
  const p1 = process.env.GEMINI_GCP_PROJECT_1 ?? "nth-segment-491623-d2"; // askNYC ($1000 GenAI credits)
  const p2 = process.env.GEMINI_GCP_PROJECT_2; // optional second project

  projects.push({ projectId: p1, failCount: 0, lastFailure: 0 });
  if (p2) projects.push({ projectId: p2, failCount: 0, lastFailure: 0 });

  const location = process.env.GEMINI_GCP_LOCATION ?? "us-central1";

  /** Pick the project with fewest recent failures. */
  function pickProject(): GeminiProject {
    const now = Date.now();
    const COOLDOWN_MS = 5 * 60 * 1000;
    for (const p of projects) {
      if (now - p.lastFailure > COOLDOWN_MS) p.failCount = 0;
    }
    projects.sort((a, b) => a.failCount - b.failCount);
    return projects[0];
  }

  return {
    name: "gemini",
    async generate(req: LLMRequest): Promise<LLMResponse> {
      const model = req.model ?? "gemini-2.5-flash";
      let lastError: Error | null = null;

      for (let attempt = 0; attempt < projects.length; attempt++) {
        const proj = pickProject();
        try {
          const vertex = new VertexAI({ project: proj.projectId, location });
          const genModel = vertex.getGenerativeModel({ model });

          const result = await genModel.generateContent(req.prompt);
          const candidate = result.response.candidates?.[0];
          const text = candidate?.content?.parts?.[0]?.text ?? "";

          return {
            text,
            provider: "gemini",
            model,
            inputTokens: result.response.usageMetadata?.promptTokenCount,
            outputTokens: result.response.usageMetadata?.candidatesTokenCount,
          };
        } catch (err) {
          lastError = err instanceof Error ? err : new Error(String(err));
          proj.failCount++;
          proj.lastFailure = Date.now();

          const msg = lastError.message.toLowerCase();
          if (!msg.includes("quota") && !msg.includes("429") && !msg.includes("resource_exhausted")) {
            throw lastError;
          }
        }
      }

      throw lastError ?? new Error("All Gemini projects exhausted");
    },
  };
}

// --- Provider manager ---

export type ProviderPreference = "anthropic" | "gemini" | "auto";

let _anthropic: LLMProvider | null | undefined;
let _gemini: LLMProvider | null | undefined;

function getAnthropicProvider(): LLMProvider | null {
  if (_anthropic === undefined) _anthropic = createAnthropicProvider();
  return _anthropic;
}

function getGeminiProvider(): LLMProvider | null {
  if (_gemini === undefined) _gemini = createGeminiProvider();
  return _gemini;
}

/**
 * Get an LLM provider based on preference.
 *
 * - "anthropic": Use Anthropic only
 * - "gemini": Use Gemini only
 * - "auto": Try Anthropic first, fall back to Gemini
 *
 * Reads BRAIN_LLM_PROVIDER env var as default preference.
 */
export function getProvider(preference?: ProviderPreference): LLMProvider {
  const pref = preference ?? (process.env.BRAIN_LLM_PROVIDER as ProviderPreference) ?? "auto";

  if (pref === "anthropic") {
    const p = getAnthropicProvider();
    if (!p) throw new Error("Anthropic API key not configured");
    return p;
  }

  if (pref === "gemini") {
    const p = getGeminiProvider();
    if (!p) throw new Error("No Gemini API keys configured");
    return p;
  }

  // "auto" — prefer anthropic, fall back to gemini
  const anthropic = getAnthropicProvider();
  if (anthropic) return anthropic;

  const gemini = getGeminiProvider();
  if (gemini) return gemini;

  throw new Error("No LLM provider configured (set ANTHROPIC_API_KEY or GEMINI_API_KEY_1)");
}

/**
 * Generate text with automatic provider fallback.
 * If the primary provider fails with a billing/quota error, tries the other.
 */
export async function generate(
  request: LLMRequest,
  preference?: ProviderPreference,
): Promise<LLMResponse> {
  const pref = preference ?? (process.env.BRAIN_LLM_PROVIDER as ProviderPreference) ?? "auto";
  const primary = getProvider(pref);

  try {
    return await primary.generate(request);
  } catch (err) {
    const msg = err instanceof Error ? err.message.toLowerCase() : "";
    const isQuotaError =
      msg.includes("credit balance") ||
      msg.includes("quota") ||
      msg.includes("rate limit") ||
      msg.includes("429") ||
      msg.includes("billing");

    if (!isQuotaError || pref !== "auto") throw err;

    // Try fallback
    const fallback =
      primary.name === "anthropic" ? getGeminiProvider() : getAnthropicProvider();
    if (!fallback) throw err;

    console.warn(`[llm] ${primary.name} failed (${msg.slice(0, 80)}), falling back to ${fallback.name}`);
    return await fallback.generate(request);
  }
}

/** Reset cached providers (for testing) */
export function _resetProviders(): void {
  _anthropic = undefined;
  _gemini = undefined;
}
