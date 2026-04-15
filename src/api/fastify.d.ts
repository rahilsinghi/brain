import type { VectorStore } from "../embedder/vector-store.js";
import type { BrainConfig } from "../types.js";
import type { SynthesizeFn } from "../query/synthesize.js";
import type { TimesheetDB } from "../timesheet/db.js";

export type { SynthesizeFn };

declare module "fastify" {
  interface FastifyInstance {
    vaultRoot: string;
    store: VectorStore;
    config: BrainConfig;
    synthesizeFn: SynthesizeFn;
    timesheetDb: TimesheetDB;
  }
}
