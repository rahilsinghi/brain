import type { FastifyInstance } from "fastify";
import type { EntryCategory } from "../../timesheet/types.js";
import { loadTimesheetConfig } from "../../timesheet/config.js";
import { scanRepo, upsertSession } from "../../timesheet/scanner.js";

interface LogBody {
  employer_id: string;
  hours: number;
  description: string;
  category: EntryCategory;
  start_time?: string;
  end_time?: string;
  timezone?: string;
}

const logSchema = {
  body: {
    type: "object" as const,
    required: ["employer_id", "hours", "description", "category"],
    properties: {
      employer_id: { type: "string" },
      hours: { type: "number" },
      description: { type: "string" },
      category: { type: "string" },
      start_time: { type: "string" },
      end_time: { type: "string" },
      timezone: { type: "string" },
    },
  },
};

interface BackfillBody {
  since: string;
}

const backfillSchema = {
  body: {
    type: "object" as const,
    required: ["since"],
    properties: {
      since: { type: "string" },
    },
  },
};

export async function timesheetLogRoute(app: FastifyInstance): Promise<void> {
  app.post<{ Body: BackfillBody }>(
    "/timesheet/backfill",
    { schema: backfillSchema },
    async (request, reply) => {
      const { since } = request.body;
      const db = app.timesheetDb;
      const vaultRoot = app.vaultRoot;

      const timesheetConfig = loadTimesheetConfig(vaultRoot);
      const mappings = db.getRepoMappings();

      // Collect local repo paths from mappings + config
      const localPaths = new Set<string>();
      for (const m of mappings) {
        if (m.pattern.startsWith("/")) localPaths.add(m.pattern);
      }
      for (const emp of Object.values(timesheetConfig.employers)) {
        for (const repo of emp.repos) {
          const expanded = repo.startsWith("~")
            ? repo.replace("~", process.env.HOME ?? "")
            : repo;
          if (expanded.startsWith("/")) localPaths.add(expanded);
        }
      }

      let sessionsFound = 0;
      for (const repoPath of localPaths) {
        try {
          const { sessions } = await scanRepo(
            repoPath,
            since,
            timesheetConfig.scanner,
            mappings,
          );
          for (const session of sessions) {
            upsertSession(db, session, timesheetConfig.scanner.buffer_minutes);
            sessionsFound++;
          }
        } catch (err) {
          console.error(
            `[timesheet/backfill] Scan error for ${repoPath}: ${err instanceof Error ? err.message : String(err)}`,
          );
        }
      }

      return reply.send({
        sessions_found: sessionsFound,
        message: `Backfill complete: ${sessionsFound} sessions from ${localPaths.size} repos since ${since}`,
      });
    },
  );

  app.post<{ Body: LogBody }>(
    "/timesheet/log",
    { schema: logSchema },
    async (request, reply) => {
      const {
        employer_id,
        hours,
        description,
        category,
        start_time,
        end_time,
        timezone,
      } = request.body;

      const db = app.timesheetDb;

      // Validate employer exists
      const employer = db.getEmployer(employer_id);
      if (!employer) {
        return reply
          .status(400)
          .send({ error: `Employer '${employer_id}' not found` });
      }

      let resolvedStart: string;
      let resolvedEnd: string;
      let confidence: "high" | "medium";

      if (start_time && end_time) {
        // Explicit times provided
        resolvedStart = start_time;
        resolvedEnd = end_time;
        confidence = "high";
      } else {
        // Backfill from hours
        const now = new Date();
        resolvedEnd = now.toISOString();
        resolvedStart = new Date(
          now.getTime() - hours * 60 * 60 * 1000
        ).toISOString();
        confidence = "medium";
      }

      const date = resolvedStart.slice(0, 10);

      const entryId = db.insertEntry({
        date,
        employer_id,
        hours,
        start_time: resolvedStart,
        end_time: resolvedEnd,
        timezone: timezone ?? "America/New_York",
        confidence,
        category,
        description,
        source: "manual",
      });

      const entry = db.getEntry(entryId);
      return reply.status(201).send({ entry });
    }
  );
}
