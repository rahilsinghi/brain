import type { SynthesisResult } from "../query/synthesize.js";

interface CachedSynthesis {
  result: SynthesisResult;
  query: string;
  createdAt: number;
}

const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes
const MAX_ENTRIES = 50;

const cache = new Map<string, CachedSynthesis>();

export function cacheSynthesis(
  queryId: string,
  query: string,
  result: SynthesisResult,
): void {
  // Prune expired entries
  const now = Date.now();
  for (const [key, entry] of cache) {
    if (now - entry.createdAt > CACHE_TTL_MS) cache.delete(key);
  }
  // Evict oldest if at capacity
  if (cache.size >= MAX_ENTRIES) {
    const oldest = cache.keys().next().value!;
    cache.delete(oldest);
  }
  cache.set(queryId, { result, query, createdAt: now });
}

export function getCachedSynthesis(
  queryId: string,
): CachedSynthesis | undefined {
  const entry = cache.get(queryId);
  if (!entry) return undefined;
  if (Date.now() - entry.createdAt > CACHE_TTL_MS) {
    cache.delete(queryId);
    return undefined;
  }
  return entry;
}
