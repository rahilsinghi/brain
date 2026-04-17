import type { FastifyInstance } from "fastify";
import { handleTimesheetNL, type NLSource } from "../../timesheet/nl-handler.js";

interface NLBody {
  text: string;
  source?: NLSource;
}

const nlSchema = {
  body: {
    type: "object" as const,
    required: ["text"],
    properties: {
      text: { type: "string" },
      source: { type: "string" },
    },
  },
};

export async function timesheetNLRoute(app: FastifyInstance): Promise<void> {
  app.post<{ Body: NLBody }>(
    "/timesheet/nl",
    { schema: nlSchema },
    async (request, reply) => {
      const { text, source } = request.body;
      if (!text || text.trim().length === 0) {
        return reply.status(400).send({ error: "Empty text" });
      }

      const db = app.timesheetDb;
      const timezone =
        (app.config as { timesheet?: { scanner?: { timezone?: string } } }).timesheet?.scanner
          ?.timezone ?? "America/New_York";

      const response = await handleTimesheetNL(text, {
        now: new Date(),
        timezone,
        db: db!,
        source: source ?? "api",
      });

      return reply
        .type("text/plain; charset=utf-8")
        .status(200)
        .send(response);
    },
  );
}
