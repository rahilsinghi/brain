import Fastify from "fastify";
import { createReadStream, existsSync } from "node:fs";
import { join } from "node:path";
import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import type { RelayDB } from "./db.js";
import type { InboundStatus, OutboundCategory } from "./types.js";

export function buildRelayApi(
  db: RelayDB,
  secret: string,
  filesDir: string,
): FastifyInstance {
  const app = Fastify({ logger: false });

  // ── Auth hook ──

  app.addHook(
    "onRequest",
    async (request: FastifyRequest, reply: FastifyReply) => {
      // Skip auth for webhook path
      if (request.url.startsWith("/webhook")) return;

      const auth = request.headers.authorization;
      if (!auth || !auth.startsWith("Bearer ")) {
        return reply.code(401).send({ error: "Unauthorized" });
      }
      const token = auth.slice(7); // strip "Bearer "
      if (token !== secret) {
        return reply.code(401).send({ error: "Unauthorized" });
      }
    },
  );

  // ── GET /queue/inbound ──

  app.get("/queue/inbound", async (_request, reply) => {
    const items = db.getPendingInbound();
    return reply.send({ items });
  });

  // ── GET /files/:id ──

  app.get<{ Params: { id: string } }>(
    "/files/:id",
    async (request, reply) => {
      const filePath = join(filesDir, request.params.id);
      if (!existsSync(filePath)) {
        return reply.code(404).send({ error: "Not found" });
      }
      const stream = createReadStream(filePath);
      return reply
        .header("Content-Type", "application/octet-stream")
        .send(stream);
    },
  );

  // ── POST /queue/inbound/:id/response ──

  interface InboundResponseBody {
    response: string;
    status: InboundStatus;
  }

  app.post<{ Params: { id: string }; Body: InboundResponseBody }>(
    "/queue/inbound/:id/response",
    async (request, reply) => {
      const { id } = request.params;
      const { response, status } = request.body;
      db.setInboundResponse(id, response, status);
      return reply.send({ ok: true });
    },
  );

  // ── POST /queue/inbound/:id/fail ──

  interface InboundFailBody {
    error: string;
  }

  app.post<{ Params: { id: string }; Body: InboundFailBody }>(
    "/queue/inbound/:id/fail",
    async (request, reply) => {
      const { id } = request.params;
      const { error } = request.body;
      db.setInboundFailed(id, error);
      return reply.send({ ok: true });
    },
  );

  // ── POST /queue/outbound ──

  interface OutboundInsertBody {
    chat_id: number;
    message: string;
    category: OutboundCategory;
    deliver_at?: string | null;
    entry_ids?: string[];
    report_date?: string;
  }

  app.post<{ Body: OutboundInsertBody }>(
    "/queue/outbound",
    async (request, reply) => {
      const { chat_id, message, category, deliver_at, entry_ids, report_date } =
        request.body;
      const id = db.insertOutbound({ chat_id, message, category, deliver_at });
      if (report_date !== undefined && entry_ids !== undefined) {
        db.setOutboundReportMeta(id, report_date, JSON.stringify(entry_ids));
      }
      return reply.code(201).send({ id });
    },
  );

  // ── POST /queue/outbound/:id/replace ──

  interface OutboundReplaceBody {
    message: string;
  }

  app.post<{ Params: { id: string }; Body: OutboundReplaceBody }>(
    "/queue/outbound/:id/replace",
    async (request, reply) => {
      const { id } = request.params;
      const { message } = request.body;
      const ok = db.replaceOutbound(id, message);
      return reply.send({ ok });
    },
  );

  // ── GET /health ──

  app.get("/health", async (_request, reply) => {
    const inbound_pending = db.getPendingInbound().length;
    const outbound_due = db.getDueOutbound().length;
    return reply.send({ status: "ok", inbound_pending, outbound_due });
  });

  return app;
}
