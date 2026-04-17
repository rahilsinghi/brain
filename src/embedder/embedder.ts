import { pipeline, type FeatureExtractionPipeline } from "@xenova/transformers";

// Embedding backends:
// - "ollama":  Uses local Ollama /api/embed (GPU-accelerated on Apple Silicon). 10-100x faster.
// - "xenova":  WASM-based fallback via @xenova/transformers (CPU-only, slow).
// Set BRAIN_EMBEDDER_PROVIDER=ollama to prefer Ollama, or "xenova" to force the legacy path.

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL ?? "http://127.0.0.1:11434";
const OLLAMA_EMBED_MODEL = process.env.OLLAMA_EMBED_MODEL ?? "nomic-embed-text";
const EMBEDDER_PROVIDER = (process.env.BRAIN_EMBEDDER_PROVIDER ?? "auto").toLowerCase();

let extractor: FeatureExtractionPipeline | null = null;
let ollamaHealthy: boolean | null = null;

async function checkOllamaHealth(): Promise<boolean> {
  if (ollamaHealthy !== null) return ollamaHealthy;
  try {
    const res = await fetch(`${OLLAMA_BASE_URL}/api/tags`, {
      signal: AbortSignal.timeout(2000),
    });
    ollamaHealthy = res.ok;
  } catch {
    ollamaHealthy = false;
  }
  return ollamaHealthy;
}

async function embedViaOllama(text: string): Promise<number[]> {
  const res = await fetch(`${OLLAMA_BASE_URL}/api/embed`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: OLLAMA_EMBED_MODEL, input: text }),
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => res.statusText);
    throw new Error(`Ollama embed error (${res.status}): ${errText}`);
  }
  const data = (await res.json()) as { embeddings?: number[][] };
  if (!data.embeddings || data.embeddings.length === 0) {
    throw new Error("Ollama embed returned no embeddings");
  }
  return data.embeddings[0];
}

async function embedViaOllamaBatch(texts: string[]): Promise<number[][]> {
  const res = await fetch(`${OLLAMA_BASE_URL}/api/embed`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: OLLAMA_EMBED_MODEL, input: texts }),
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => res.statusText);
    throw new Error(`Ollama embed error (${res.status}): ${errText}`);
  }
  const data = (await res.json()) as { embeddings?: number[][] };
  if (!data.embeddings || data.embeddings.length !== texts.length) {
    throw new Error(`Ollama embed: expected ${texts.length} embeddings, got ${data.embeddings?.length ?? 0}`);
  }
  return data.embeddings;
}

async function getExtractor(): Promise<FeatureExtractionPipeline> {
  if (!extractor) {
    extractor = await pipeline("feature-extraction", "Xenova/nomic-embed-text-v1", {
      quantized: true,
    });
  }
  return extractor;
}

async function embedViaXenova(text: string): Promise<number[]> {
  const ext = await getExtractor();
  const result = await ext(text, { pooling: "mean", normalize: true });
  return Array.from(result.data as Float32Array);
}

async function shouldUseOllama(): Promise<boolean> {
  if (EMBEDDER_PROVIDER === "ollama") return true;
  if (EMBEDDER_PROVIDER === "xenova") return false;
  // auto: prefer Ollama if reachable
  return checkOllamaHealth();
}

export async function embed(text: string): Promise<number[]> {
  if (await shouldUseOllama()) {
    try {
      return await embedViaOllama(text);
    } catch (err) {
      console.warn(`[embedder] Ollama failed, falling back to xenova: ${err instanceof Error ? err.message : String(err)}`);
      ollamaHealthy = false;
    }
  }
  return embedViaXenova(text);
}

export async function embedBatch(texts: string[]): Promise<number[][]> {
  if (texts.length === 0) return [];
  if (await shouldUseOllama()) {
    try {
      return await embedViaOllamaBatch(texts);
    } catch (err) {
      console.warn(`[embedder] Ollama batch failed, falling back to xenova: ${err instanceof Error ? err.message : String(err)}`);
      ollamaHealthy = false;
    }
  }
  const results: number[][] = [];
  for (const text of texts) {
    results.push(await embedViaXenova(text));
  }
  return results;
}

/** Reset cached state (for testing) */
export function _resetEmbedder(): void {
  extractor = null;
  ollamaHealthy = null;
}
