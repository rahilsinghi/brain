import { generate } from "../llm/provider.js";
import type { WikiChunk } from "../types.js";

export function formatChunksForPrompt(chunks: WikiChunk[]): string {
  if (chunks.length === 0) return "";

  return chunks
    .map(
      (c, i) =>
        `--- Source ${i + 1}: ${c.filePath} ---\n` +
        `Section: ${c.breadcrumb}\n\n` +
        `${c.content}\n`
    )
    .join("\n");
}

export interface SynthesisResult {
  answer: string;
  sourcePaths: string[];
  chunks: WikiChunk[];
}

export type SynthesizeFn = (
  question: string,
  store: { search: (vector: number[], topK: number) => Promise<WikiChunk[]> },
  topK: number,
) => Promise<SynthesisResult>;

export async function synthesize(
  question: string,
  store: { search: (vector: number[], topK: number) => Promise<WikiChunk[]> },
  topK: number = 8
): Promise<SynthesisResult> {
  // Dynamic import to avoid loading the ONNX model at module import time
  const { embed } = await import("../embedder/embedder.js");

  const queryVector = await embed(question);
  const chunks = await store.search(queryVector, topK);

  if (chunks.length === 0) {
    return {
      answer:
        "I don't have any knowledge about that topic yet. Try adding some articles to raw/ first.",
      sourcePaths: [],
      chunks: [],
    };
  }

  const context = formatChunksForPrompt(chunks);
  const sourcePaths = [...new Set(chunks.map((c) => c.filePath))];

  const response = await generate({
    prompt: `You are a knowledge assistant answering questions from a personal wiki.

Use ONLY the following wiki excerpts to answer. If the excerpts don't contain enough information, say so.
Include [[wiki links]] to source articles when referencing them.

Wiki excerpts:
${context}

Question: ${question}

Answer concisely and accurately, citing sources with [[wiki links]].`,
    maxTokens: 4096,
  });

  const answer = response.text;

  return { answer, sourcePaths, chunks };
}
