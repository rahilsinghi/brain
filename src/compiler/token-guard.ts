import type { CompileStrategy } from "../types.js";

export interface TokenGuardLimits {
  maxSingle: number;
  maxChunked: number;
  maxStaged: number;
}

export function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

export function classifyDocument(text: string, limits: TokenGuardLimits): CompileStrategy {
  const words = countWords(text);
  if (words <= limits.maxSingle) return "single";
  if (words <= limits.maxChunked) return "chunked";
  if (words <= limits.maxStaged) return "staged";
  return "manual_review";
}
