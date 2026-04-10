import { mkdirSync } from "node:fs";
import { join } from "node:path";
import type { FastifyInstance } from "fastify";
import { getCachedSynthesis } from "../synthesis-cache.js";
import { slugify } from "../../sources/slug.js";
import { writeFrontmatter } from "../../frontmatter.js";

const saveSchema = {
  body: {
    type: "object" as const,
    required: ["query_id"],
    properties: {
      query_id: { type: "string", minLength: 1 },
      force: { type: "boolean" },
    },
  },
};

interface SaveBody {
  query_id: string;
  force?: boolean;
}

export async function saveRoute(app: FastifyInstance): Promise<void> {
  app.post<{ Body: SaveBody }>(
    "/save",
    { schema: saveSchema },
    async (request, reply) => {
      const { query_id, force } = request.body;
      const config = app.config;
      const threshold = config.query.novelty_threshold;

      const cached = getCachedSynthesis(query_id);
      if (!cached) {
        return reply.status(404).send({
          error: "query_not_found",
          message:
            "Synthesis result not found or expired. Re-run the query and save within 10 minutes.",
        });
      }

      const { result, query } = cached;

      if (!force && result.novelty_score < threshold) {
        return reply.status(409).send({
          error: "below_novelty_threshold",
          novelty_score: result.novelty_score,
          threshold,
          message: `Novelty score ${result.novelty_score.toFixed(3)} is below threshold ${threshold}. Use force: true to save anyway.`,
        });
      }

      // Write synthesis to wiki as a new article
      const slug = slugify(query.slice(0, 80));
      const wikiDir = join(app.vaultRoot, "wiki", "synthesis");
      mkdirSync(wikiDir, { recursive: true });

      const wikiPath = join(wikiDir, `${slug}.md`);
      const now = new Date().toISOString();

      const frontmatter = {
        title: query,
        author: "ai" as const,
        created_at: now,
        last_ai_edit: now,
        last_human_edit: null,
        last_embedded_hash: null,
        sources: result.sourcePaths,
        tags: ["synthesis"],
        novelty_score: result.novelty_score,
        source_query: query,
        provider: result.provider,
        model: result.model,
      };

      const body =
        `# ${query}\n\n` +
        `${result.answer}\n\n` +
        `## Sources\n\n` +
        result.sourcePaths.map((p) => `- [[${p}]]`).join("\n") +
        "\n";

      writeFrontmatter(wikiPath, frontmatter, body);

      const relativePath = `wiki/synthesis/${slug}.md`;
      console.log(
        `[api] save query_id=${query_id} novelty=${result.novelty_score.toFixed(3)} path=${relativePath}`,
      );

      return reply.status(201).send({
        saved: true,
        path: relativePath,
        novelty_score: result.novelty_score,
        query_id,
      });
    },
  );
}
