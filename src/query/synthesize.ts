import { generate } from "../llm/provider.js";
import type { WikiChunk } from "../types.js";
import { noveltyScore } from "./novelty.js";

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
  provider: string;
  model: string;
  novelty_score: number;
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
      provider: "none",
      model: "none",
      novelty_score: 1.0,
    };
  }

  const context = formatChunksForPrompt(chunks);
  const sourcePaths = [...new Set(chunks.map((c) => c.filePath))];

  const response = await generate({
    prompt: `You are a knowledge assistant answering questions from a personal wiki.

Use ONLY the following wiki excerpts to answer. If the excerpts don't contain enough information, say so.
Do NOT include inline citations, source references, or source numbers in your answer. Sources are tracked separately by the system.
Write clean prose with no markdown formatting — no bold, no headers, no bullet markers. Use plain dashes (-) for lists.

Wiki excerpts:
${context}

Question: ${question}

Answer concisely and accurately in plain text.`,
    maxTokens: 4096,
  });

  const answer = response.text;

  // Compute novelty: embed the answer and compare against source chunk content
  const answerVector = await embed(answer);
  const compareChunks = chunks.slice(0, 5);
  const chunkVectors: number[][] = [];
  for (const c of compareChunks) {
    chunkVectors.push(await embed(c.content));
  }
  const novelty = noveltyScore(answerVector, chunkVectors);

  return { answer, sourcePaths, chunks, provider: response.provider, model: response.model, novelty_score: novelty };
}
