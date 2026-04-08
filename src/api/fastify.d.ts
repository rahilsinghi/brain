import type { VectorStore } from "../embedder/vector-store.js";
import type { BrainConfig } from "../types.js";
import type { SynthesizeFn } from "../query/synthesize.js";

export type { SynthesizeFn };

declare module "fastify" {
  interface FastifyInstance {
    vaultRoot: string;
    store: VectorStore;
    config: BrainConfig;
    synthesizeFn: SynthesizeFn;
  }
}
