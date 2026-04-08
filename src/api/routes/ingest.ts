import type { FastifyInstance } from "fastify";
import { ingestContent } from "../ingest-core.js";

const ingestSchema = {
  body: {
    type: "object" as const,
    required: ["content", "source"],
    properties: {
      content: { type: "string" },
      source: { type: "string" },
      title: { type: ["string", "null"] },
      metadata: { type: ["object", "null"] },
    },
  },
};

interface IngestBody {
  content: string;
  source: string;
  title?: string | null;
  metadata?: Record<string, unknown> | null;
}

export async function ingestRoute(app: FastifyInstance): Promise<void> {
  app.post<{ Body: IngestBody }>(
    "/ingest",
    { schema: ingestSchema },
    async (request, reply) => {
      const result = ingestContent({
        ...request.body,
        vaultRoot: app.vaultRoot,
      });

      return reply.status(202).send(result);
    },
  );
}
