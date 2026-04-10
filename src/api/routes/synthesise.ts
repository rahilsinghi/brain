import { randomUUID } from "node:crypto";
import type { FastifyInstance } from "fastify";
import { cacheSynthesis } from "../synthesis-cache.js";

const synthesiseSchema = {
  body: {
    type: "object" as const,
    required: ["query"],
    properties: {
      query: { type: "string", minLength: 1 },
      top_k: { type: ["integer", "null"], minimum: 1, maximum: 50 },
    },
  },
};

interface SynthesiseBody {
  query: string;
  top_k?: number | null;
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error("__TIMEOUT__")),
      ms,
    );
    promise.then(
      (val) => {
        clearTimeout(timer);
        resolve(val);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      },
    );
  });
}

export async function synthesiseRoute(app: FastifyInstance): Promise<void> {
  app.post<{ Body: SynthesiseBody }>(
    "/synthesise",
    { schema: synthesiseSchema },
    async (request, reply) => {
      const store = app.store;
      const config = app.config;
      const synthesizeFn = app.synthesizeFn;

      const queryId = randomUUID();
      const startMs = Date.now();
      const topK = request.body.top_k ?? config.api.default_top_k;

      try {
        const result = await withTimeout(
          synthesizeFn(request.body.query, store, topK),
          config.api.synthesise_timeout_ms,
        );

        const latencyMs = Date.now() - startMs;

        console.log(
          `[api] synthesise query_id=${queryId} latency=${latencyMs}ms chunks=${result.chunks.length} novelty=${result.novelty_score.toFixed(3)}`,
        );

        cacheSynthesis(queryId, request.body.query, result);

        return {
          query_id: queryId,
          answer: result.answer,
          sources: result.chunks.map((c) => ({
            file: c.filePath,
            title: c.breadcrumb,
            chunk: c.content,
          })),
          provider: result.provider,
          model: result.model,
          novelty_score: result.novelty_score,
          latency_ms: latencyMs,
        };
      } catch (err) {
        const latencyMs = Date.now() - startMs;
        const message = err instanceof Error ? err.message : String(err);

        console.log(
          `[api] synthesise FAILED query_id=${queryId} latency=${latencyMs}ms error=${message}`,
        );

        if (message === "__TIMEOUT__") {
          return reply.status(504).send({
            error: "synthesis_timeout",
            query_id: queryId,
          });
        }

        return reply.status(502).send({
          error: "synthesis_failed",
          query_id: queryId,
          message,
        });
      }
    },
  );
}
