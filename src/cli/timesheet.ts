const DAEMON_URL = "http://127.0.0.1:3577";
const TIMEOUT_MS = 5000;

function getWeekBounds(dateStr?: string): { weekStart: string; weekEnd: string } {
  const date = dateStr ? new Date(dateStr + "T00:00:00") : new Date();
  const day = date.getDay();
  const mondayOffset = (day + 6) % 7;
  const monday = new Date(date);
  monday.setDate(date.getDate() - mondayOffset);
  const friday = new Date(monday);
  friday.setDate(monday.getDate() + 4);

  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  return { weekStart: fmt(monday), weekEnd: fmt(friday) };
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

async function request(
  method: "GET" | "POST",
  path: string,
  body?: Record<string, unknown>
): Promise<unknown> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const opts: RequestInit = {
      method,
      signal: controller.signal,
      headers: { "Content-Type": "application/json" },
    };
    if (body) opts.body = JSON.stringify(body);

    const res = await fetch(`${DAEMON_URL}${path}`, opts);
    clearTimeout(timeout);

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: res.statusText }));
      console.error("\u2716 " + ((err as { error: string }).error ?? res.statusText));
      process.exit(1);
    }

    return await res.json();
  } catch (err) {
    clearTimeout(timeout);
    if (err instanceof Error && err.name === "AbortError") {
      console.error(
        "\u2716 Brain daemon is not responding on port 3577. Is it running?"
      );
      console.error("  Try: launchctl start com.rahilsinghi.brain-daemon");
    } else {
      console.error(
        "\u2716 Connection failed: " +
          (err instanceof Error ? err.message : String(err))
      );
      console.error("  Try: launchctl start com.rahilsinghi.brain-daemon");
    }
    process.exit(1);
  }
}

function parseFlag(args: string[], flag: string): string | undefined {
  const idx = args.indexOf(flag);
  if (idx === -1 || idx + 1 >= args.length) return undefined;
  return args[idx + 1];
}

async function cmdLog(args: string[]) {
  const employer = parseFlag(args, "--employer");
  const hours = parseFlag(args, "--hours");
  const desc = parseFlag(args, "--desc");
  const category = parseFlag(args, "--category");

  if (!employer || !hours || !desc) {
    console.error("Usage: brain timesheet log --employer <id> --hours <n> --desc <text> [--category <cat>]");
    process.exit(1);
  }

  const hoursNum = parseFloat(hours);
  if (isNaN(hoursNum) || hoursNum <= 0) {
    console.error("\u2716 --hours must be a positive number");
    process.exit(1);
  }

  const body: Record<string, unknown> = {
    employer_id: employer,
    hours: hoursNum,
    description: desc,
  };
  if (category) body.category = category;

  await request("POST", "/timesheet/log", body);
  console.log(`\u2713 Logged ${hoursNum}h for ${employer}: ${desc}`);
}

async function cmdStatus(args: string[]) {
  const sub = args[0];

  if (sub === "today") {
    const data = await request("GET", `/timesheet/status/today?date=${todayStr()}`);
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  if (sub === "week" || !sub) {
    const { weekStart, weekEnd } = getWeekBounds();
    const data = await request(
      "GET",
      `/timesheet/status/week?week_start=${weekStart}&week_end=${weekEnd}`
    );
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  console.error("Usage: brain timesheet status [today|week]");
  process.exit(1);
}

async function cmdBackfill(args: string[]) {
  const since = parseFlag(args, "--since");
  if (!since) {
    console.error("Usage: brain timesheet backfill --since <YYYY-MM-DD>");
    process.exit(1);
  }

  const data = (await request("POST", "/timesheet/backfill", { since })) as {
    sessions_found?: number;
  };
  const count = data.sessions_found ?? 0;
  console.log(`\u2713 Backfilled from ${since}: ${count} sessions ingested as drafts`);
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case "log":
      await cmdLog(args.slice(1));
      break;
    case "status":
      await cmdStatus(args.slice(1));
      break;
    case "backfill":
      await cmdBackfill(args.slice(1));
      break;
    default:
      console.log("Usage: brain timesheet <command>");
      console.log("");
      console.log("Commands:");
      console.log("  log       Log hours manually");
      console.log("  status    View timesheet status (today, week)");
      console.log("  backfill  Backfill entries from calendar/commits");
      console.log("");
      console.log("Examples:");
      console.log('  brain timesheet log --employer maison --hours 2 --desc "Meeting with Fredrik"');
      console.log("  brain timesheet status");
      console.log("  brain timesheet status today");
      console.log("  brain timesheet backfill --since 2026-04-07");
      process.exit(command ? 1 : 0);
  }
}

main();
