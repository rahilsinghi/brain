import type { FastifyInstance } from "fastify";
import {
  getStatusSummary,
  getTodayBreakdown,
  getWeekMatrix,
} from "../../timesheet/status.js";
import { finalizeWeek } from "../../timesheet/finalize.js";
import { generateInvoice } from "../../timesheet/invoice.js";
import { syncWeekToWiki } from "../../timesheet/wiki-sync.js";
import { loadTimesheetConfig } from "../../timesheet/config.js";

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

  // GET /timesheet/status/month — monthly summary
  app.get<{ Querystring: { month?: string; employer?: string } }>(
    "/timesheet/status/month",
    async (request, reply) => {
      const month = request.query.month ?? new Date().toISOString().slice(0, 7);
      const periodStart = `${month}-01`;
      const lastDay = new Date(
        parseInt(month.slice(0, 4)),
        parseInt(month.slice(5, 7)),
        0,
      ).getDate();
      const periodEnd = `${month}-${String(lastDay).padStart(2, "0")}`;

      const entries = app.timesheetDb.getEntriesByDateRange(
        periodStart,
        periodEnd,
        request.query.employer,
      );

      const byEmployer: Record<string, { total_hours: number; entries: number }> = {};
      for (const e of entries) {
        if (!byEmployer[e.employer_id]) {
          byEmployer[e.employer_id] = { total_hours: 0, entries: 0 };
        }
        byEmployer[e.employer_id].total_hours += e.hours;
        byEmployer[e.employer_id].entries++;
      }

      const employers = Object.entries(byEmployer).map(([id, data]) => {
        const emp = app.timesheetDb.getEmployer(id);
        const rate = emp?.rate_hourly ?? 0;
        return {
          id,
          total_hours: Math.round(data.total_hours * 100) / 100,
          rate_hourly: rate,
          total_revenue: Math.round(data.total_hours * rate * 100) / 100,
          entries: data.entries,
        };
      });

      return reply.send({ month, employers });
    },
  );

  // GET /timesheet/status/entries — raw entries for a date
  app.get<{ Querystring: { date?: string; employer?: string } }>(
    "/timesheet/status/entries",
    async (request, reply) => {
      const date = request.query.date ?? new Date().toISOString().slice(0, 10);
      const entries = app.timesheetDb.getEntriesByDateRange(
        date,
        date,
        request.query.employer,
      );

      return reply.send({ date, entries });
    },
  );

  // POST /timesheet/finalize — finalize current week
  app.post<{ Body: { week_start?: string; week_end?: string } }>(
    "/timesheet/finalize",
    async (request, reply) => {
      const tsConfig = loadTimesheetConfig(app.vaultRoot);
      const today = new Date().toISOString().slice(0, 10);

      let weekStart = request.body?.week_start;
      let weekEnd = request.body?.week_end;

      if (!weekStart || !weekEnd) {
        const d = new Date(today + "T12:00:00");
        const day = d.getDay();
        const mondayOffset = day === 0 ? -6 : 1 - day;
        const monday = new Date(d);
        monday.setDate(d.getDate() + mondayOffset);
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        weekStart = monday.toISOString().slice(0, 10);
        weekEnd = sunday.toISOString().slice(0, 10);
      }

      const result = finalizeWeek(app.timesheetDb, tsConfig, weekStart, weekEnd);

      // Sync to wiki
      let wikiPaths: string[] = [];
      if (result.finalized > 0) {
        wikiPaths = syncWeekToWiki(app.timesheetDb, tsConfig, app.vaultRoot, weekStart, weekEnd);
      }

      return reply.send({ ...result, wikiPaths });
    },
  );

  // POST /timesheet/invoice — generate invoice
  app.post<{
    Body: { employer_id: string; period_start: string; period_end: string; notes?: string };
  }>(
    "/timesheet/invoice",
    async (request, reply) => {
      const { employer_id, period_start, period_end, notes } = request.body;
      const tsConfig = loadTimesheetConfig(app.vaultRoot);

      const result = generateInvoice(app.timesheetDb, tsConfig, app.vaultRoot, {
        employerId: employer_id,
        periodStart: period_start,
        periodEnd: period_end,
        notes,
      });

      if (!result.success) {
        return reply.status(400).send({ error: result.error });
      }

      return reply.status(201).send(result);
    },
  );
}
