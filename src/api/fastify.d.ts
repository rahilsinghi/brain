import type { VectorStore } from "../embedder/vector-store.js";
import type { BrainConfig, WikiChunk } from "../types.js";
import type { SynthesisResult } from "../query/synthesize.js";

export type SynthesizeFn = (
  question: string,
  store: { search: (vector: number[], topK: number) => Promise<WikiChunk[]> },
  topK: number,
) => Promise<SynthesisResult>;

declare module "fastify" {
  interface FastifyInstance {
    vaultRoot: string;
    store: VectorStore;
    config: BrainConfig;
    synthesizeFn: SynthesizeFn;
  }
}
