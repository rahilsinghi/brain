import { join } from "node:path";
import type { FastifyInstance } from "fastify";
import { readGraphCache } from "../../graph/cache.js";

export async function graphExportRoute(app: FastifyInstance): Promise<void> {
  app.get("/graph-export", async (_request, reply) => {
    const cachePath = join(app.vaultRoot, app.config.graph.cache_path);
    const cache = readGraphCache(cachePath);

    if (!cache) {
      return reply.status(404).send({
        error: "cache_not_found",
        message: "Graph cache not found. Run POST /graph-push to generate it.",
      });
    }

    return cache;
  });
}
