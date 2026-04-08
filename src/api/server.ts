import Fastify, { type FastifyInstance } from "fastify";
import type { VectorStore } from "../embedder/vector-store.js";
import type { BrainConfig } from "../types.js";
import type { SynthesizeFn } from "./fastify.js";
import { healthRoute } from "./routes/health.js";
import { ingestRoute } from "./routes/ingest.js";
import { synthesiseRoute } from "./routes/synthesise.js";

interface ServerOptions {
  store: VectorStore;
  vaultRoot: string;
  config: BrainConfig;
  synthesizeFn: SynthesizeFn;
}

export function createServer(opts: ServerOptions): FastifyInstance {
  const app = Fastify({
    bodyLimit: 1_048_576, // 1MB
    logger: false,
  });

  app.decorate("vaultRoot", opts.vaultRoot);
  app.decorate("store", opts.store);
  app.decorate("config", opts.config);
  app.decorate("synthesizeFn", opts.synthesizeFn);

  app.register(healthRoute);
  app.register(ingestRoute);
  app.register(synthesiseRoute);

  return app;
}

export async function stopServer(
  server: FastifyInstance,
  timeoutMs: number,
): Promise<void> {
  return new Promise((resolve) => {
    const forceTimer = setTimeout(() => {
      console.log("[api] Force-closing after timeout");
      resolve();
    }, timeoutMs);

    server.close().then(
      () => {
        clearTimeout(forceTimer);
        resolve();
      },
      (err) => {
        clearTimeout(forceTimer);
        console.error("[api] close error", err);
        resolve();
      },
    );
  });
}
