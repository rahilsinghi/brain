import { randomUUID } from "node:crypto";
import type { FastifyInstance } from "fastify";
import type { SynthesisResult } from "../../query/synthesize.js";
import type { WikiChunk, ApiConfig } from "../../types.js";

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

type SynthesizeFn = (
  question: string,
  store: { search: (vector: number[], topK: number) => Promise<WikiChunk[]> },
  topK: number,
) => Promise<SynthesisResult>;

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
      const store = (
        app as unknown as {
          store: { search: (v: number[], k: number) => Promise<WikiChunk[]> };
        }
      ).store;
      const config = (app as unknown as { config: { api: ApiConfig } }).config;
      const synthesizeFn = (app as unknown as { synthesizeFn: SynthesizeFn })
        .synthesizeFn;

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
          `[api] synthesise query_id=${queryId} latency=${latencyMs}ms chunks=${result.chunks.length}`,
        );

        return {
          query_id: queryId,
          answer: result.answer,
          sources: result.chunks.map((c) => ({
            file: c.filePath,
            title: c.breadcrumb,
            chunk: c.content,
            score: (c as Record<string, unknown>).score as number | undefined,
          })),
          model: "claude-sonnet-4-6",
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
