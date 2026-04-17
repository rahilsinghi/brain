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
  provider: "anthropic" | "gemini" | "ollama";
  model: string;
  inputTokens?: number;
  outputTokens?: number;
}

export interface LLMProvider {
  name: "anthropic" | "gemini" | "ollama";
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

// --- Ollama provider (local, via Ollama's OpenAI-compatible API) ---

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL ?? "http://127.0.0.1:11434";

/** Pick the best local model for the request based on task hints. */
function pickOllamaModel(req: LLMRequest): string {
  // Explicit model override wins
  if (req.model && req.model.includes(":")) return req.model;

  // Route by model alias
  const alias = req.model ?? process.env.OLLAMA_DEFAULT_MODEL ?? "default";
  if (alias === "coder") return process.env.OLLAMA_MODEL_CODER ?? "qwen3-coder:30b";
  if (alias === "reasoning") return process.env.OLLAMA_MODEL_REASONING ?? "llama3.3:70b";
  return process.env.OLLAMA_MODEL_DEFAULT ?? "qwen3:32b";
}

function createOllamaProvider(): LLMProvider | null {
  // Always return a provider — Ollama runs on the same machine, no key needed.
  // If Ollama isn't running, the fetch call will fail at generate() time.
  return {
    name: "ollama",
    async generate(req: LLMRequest): Promise<LLMResponse> {
      const model = pickOllamaModel(req);
      // Qwen3 has thinking mode on by default — disable for speed unless explicitly requested.
      // /no_think directive tells the model to skip internal reasoning.
      const disableThinking = process.env.OLLAMA_DISABLE_THINKING !== "false";
      const promptWithDirective =
        disableThinking && model.startsWith("qwen3")
          ? `/no_think ${req.prompt}`
          : req.prompt;

      const body: Record<string, unknown> = {
        model,
        prompt: promptWithDirective,
        stream: false,
        options: { num_predict: req.maxTokens ?? 4096 },
      };

      // Ollama supports structured JSON output via the "format" field.
      if (req.json) body.format = "json";

      const res = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => res.statusText);
        throw new Error(`Ollama API error (${res.status}): ${errText}`);
      }

      const data = (await res.json()) as {
        response: string;
        prompt_eval_count?: number;
        eval_count?: number;
      };

      return {
        text: data.response,
        provider: "ollama",
        model,
        inputTokens: data.prompt_eval_count,
        outputTokens: data.eval_count,
      };
    },
  };
}

// --- Provider manager ---

export type ProviderPreference = "anthropic" | "gemini" | "ollama" | "auto";

let _anthropic: LLMProvider | null | undefined;
let _gemini: LLMProvider | null | undefined;
let _ollama: LLMProvider | null | undefined;

function getAnthropicProvider(): LLMProvider | null {
  if (_anthropic === undefined) _anthropic = createAnthropicProvider();
  return _anthropic;
}

function getGeminiProvider(): LLMProvider | null {
  if (_gemini === undefined) _gemini = createGeminiProvider();
  return _gemini;
}

function getOllamaProvider(): LLMProvider | null {
  if (_ollama === undefined) _ollama = createOllamaProvider();
  return _ollama;
}

/**
 * Get an LLM provider based on preference.
 *
 * - "ollama":    Use local Ollama only
 * - "anthropic": Use Anthropic only
 * - "gemini":    Use Gemini only
 * - "auto":      Prefer local Ollama, fall back to Gemini, then Anthropic
 *
 * Reads BRAIN_LLM_PROVIDER env var as default preference.
 */
export function getProvider(preference?: ProviderPreference): LLMProvider {
  const pref = preference ?? (process.env.BRAIN_LLM_PROVIDER as ProviderPreference) ?? "auto";

  if (pref === "ollama") {
    const p = getOllamaProvider();
    if (!p) throw new Error("Ollama provider not available");
    return p;
  }

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

  // "auto" — prefer local Ollama (free, private, fast), fall back to Gemini, then Anthropic
  const ollama = getOllamaProvider();
  if (ollama) return ollama;

  const gemini = getGeminiProvider();
  if (gemini) return gemini;

  const anthropic = getAnthropicProvider();
  if (anthropic) return anthropic;

  throw new Error("No LLM provider configured (install Ollama or set ANTHROPIC_API_KEY/GEMINI_API_KEY_1)");
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
    const isRetriable =
      msg.includes("credit balance") ||
      msg.includes("quota") ||
      msg.includes("rate limit") ||
      msg.includes("429") ||
      msg.includes("billing") ||
      msg.includes("ollama api error") ||
      msg.includes("fetch failed") ||
      msg.includes("econnrefused");

    if (!isRetriable || pref !== "auto") throw err;

    // Fallback chain: ollama → gemini → anthropic (tries providers not yet attempted)
    const tried = new Set<string>([primary.name]);
    const candidates: Array<() => LLMProvider | null> = [
      getOllamaProvider,
      getGeminiProvider,
      getAnthropicProvider,
    ];

    for (const getFallback of candidates) {
      const fallback = getFallback();
      if (!fallback || tried.has(fallback.name)) continue;
      try {
        console.warn(`[llm] ${primary.name} failed (${msg.slice(0, 80)}), trying ${fallback.name}`);
        return await fallback.generate(request);
      } catch (fallbackErr) {
        tried.add(fallback.name);
        const fallbackMsg = fallbackErr instanceof Error ? fallbackErr.message : String(fallbackErr);
        console.warn(`[llm] ${fallback.name} also failed: ${fallbackMsg.slice(0, 80)}`);
      }
    }

    throw err;
  }
}

/** Reset cached providers (for testing) */
export function _resetProviders(): void {
  _anthropic = undefined;
  _gemini = undefined;
  _ollama = undefined;
}
