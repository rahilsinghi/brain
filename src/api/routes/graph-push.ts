import { join } from "node:path";
import type { FastifyInstance } from "fastify";
import { rebuildGraphCache } from "../../graph/cache.js";
import { pushGraphToRepo } from "../../graph/push.js";
import { aggregateEmbeddings } from "../../graph/embeddings.js";

export async function graphPushRoute(app: FastifyInstance): Promise<void> {
  app.post("/graph-push", async (_request, reply) => {
    const repoPath = app.config.graph.explorer_repo_path;
    if (!repoPath) {
      return reply.status(400).send({
        error: "not_configured",
        message: "graph.explorer_repo_path not set in config.yaml",
      });
    }

    try {
      const allChunks = await app.store.listAll();
      const embeddings = aggregateEmbeddings(allChunks);

      const cachePath = join(app.vaultRoot, app.config.graph.cache_path);
      const cache = await rebuildGraphCache(
        app.vaultRoot,
        cachePath,
        embeddings,
        app.config.graph.umap_seed,
      );

      const result = await pushGraphToRepo(cache, repoPath);
      return reply.status(200).send(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`[api] graph-push failed: ${message}`);
      return reply.status(500).send({ error: "push_failed", message });
    }
  });
}
