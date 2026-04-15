import type { FastifyInstance } from "fastify";
import {
  getStatusSummary,
  getTodayBreakdown,
  getWeekMatrix,
} from "../../timesheet/status.js";

interface WeekQuery {
  week_start?: string;
  week_end?: string;
}

interface TodayQuery {
  date?: string;
}

export async function timesheetStatusRoute(
  app: FastifyInstance
): Promise<void> {
  // GET /timesheet/status — weekly summary
  app.get<{ Querystring: WeekQuery }>(
    "/timesheet/status",
    async (request, reply) => {
      const { week_start, week_end } = request.query;
      if (!week_start || !week_end) {
        return reply
          .status(400)
          .send({ error: "week_start and week_end are required" });
      }

      const summary = getStatusSummary(app.timesheetDb, week_start, week_end);
      return reply.send(summary);
    }
  );

  // GET /timesheet/status/today — day breakdown
  app.get<{ Querystring: TodayQuery }>(
    "/timesheet/status/today",
    async (request, reply) => {
      const date =
        request.query.date ?? new Date().toISOString().slice(0, 10);
      const breakdown = getTodayBreakdown(app.timesheetDb, date);
      return reply.send(breakdown);
    }
  );

  // GET /timesheet/status/week — week matrix
  app.get<{ Querystring: WeekQuery }>(
    "/timesheet/status/week",
    async (request, reply) => {
      const { week_start, week_end } = request.query;
      if (!week_start || !week_end) {
        return reply
          .status(400)
          .send({ error: "week_start and week_end are required" });
      }

      const matrix = getWeekMatrix(app.timesheetDb, week_start, week_end);
      return reply.send(matrix);
    }
  );
}
