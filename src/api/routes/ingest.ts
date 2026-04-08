import { mkdirSync } from "node:fs";
import { join } from "node:path";
import type { FastifyInstance } from "fastify";
import { slugify } from "../../sources/slug.js";
import { writeFrontmatter } from "../../frontmatter.js";

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

function firstLine(text: string): string {
  const line = text.split("\n").find((l) => l.trim().length > 0) ?? "untitled";
  return line.replace(/^#+\s*/, "").trim();
}

export async function ingestRoute(app: FastifyInstance): Promise<void> {
  app.post<{ Body: IngestBody }>(
    "/ingest",
    { schema: ingestSchema },
    async (request, reply) => {
      const vaultRoot = (app as unknown as { vaultRoot: string }).vaultRoot;
      const { content, source, title, metadata } = request.body;

      const slug = `${slugify(title ?? firstLine(content))}-${Date.now()}`;
      const relativePath = `api/articles/${slug}.md`;
      const rawPath = `raw/${relativePath}`;
      const fullPath = join(vaultRoot, rawPath);

      mkdirSync(join(fullPath, ".."), { recursive: true });

      const now = new Date().toISOString();
      const frontmatter: Record<string, unknown> = {
        status: "pending",
        source_type: "api",
        channel: source,
        source_id: relativePath,
        ingested_at: now,
        parsed_at: null,
        compiled_to: null,
        processed_at: null,
        retry_count: 0,
        last_error: null,
        compile_progress: null,
        ...(metadata ?? {}),
      };

      // Prevent metadata from overwriting system fields
      frontmatter.status = "pending";
      frontmatter.source_type = "api";
      frontmatter.source_id = relativePath;
      frontmatter.ingested_at = now;

      writeFrontmatter(fullPath, frontmatter, content);

      return reply.status(202).send({
        source_id: relativePath,
        raw_path: rawPath,
        ingested_at: now,
      });
    },
  );
}
