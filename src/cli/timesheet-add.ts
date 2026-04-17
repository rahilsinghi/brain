/**
 * brain ts add "<natural language>"
 *
 * Thin HTTP client: posts the text to the local daemon at
 * http://127.0.0.1:3577/timesheet/nl and prints the response.
 *
 * Usage: bun run src/cli/timesheet-add.ts "2h maison coding 3-5pm yesterday"
 */

const TIMEOUT_MS = 60_000;
const DAEMON = process.env.BRAIN_API_URL ?? "http://127.0.0.1:3577";

async function main(): Promise<void> {
  const text = process.argv.slice(2).join(" ").trim();
  if (!text) {
    console.error("Usage: brain ts add \"<natural language>\"");
    console.error("Example: brain ts add \"2h maison coding 3-5pm yesterday\"");
    process.exit(2);
  }

  let response: Response;
  try {
    response = await fetch(`${DAEMON}/timesheet/nl`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, source: "cli" }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`✗ Daemon unreachable at ${DAEMON}: ${msg}`);
    process.exit(1);
  }

  const body = await response.text();
  if (!response.ok) {
    console.error(`✗ Daemon error (${response.status}): ${body}`);
    process.exit(1);
  }

  console.log(body);
  // Exit non-zero if the response itself reports a user-visible failure,
  // so shell pipelines can detect it.
  if (body.trim().startsWith("✗")) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(
    `✗ Unexpected error: ${err instanceof Error ? err.message : String(err)}`
  );
  process.exit(1);
});
