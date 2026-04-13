import { resolve } from "node:path";
import { execSync } from "node:child_process";

const DAEMON_URL = "http://127.0.0.1:3577";
const TIMEOUT_MS = 2000;

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const pathArg = args.find((a) => !a.startsWith("--")) ?? ".";
  const repoPath = resolve(pathArg);

  // Validate git repo
  try {
    execSync(`git -C "${repoPath}" rev-parse --git-dir`, { stdio: "pipe" });
  } catch {
    console.error("\u2716 Not a git repository: " + repoPath);
    process.exit(1);
  }

  // POST to daemon
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const res = await fetch(`${DAEMON_URL}/graphify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ repo_path: repoPath, force }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      const body = await res.json().catch(() => ({ error: res.statusText }));
      console.error("\u2716 " + (body as { error: string }).error);
      process.exit(1);
    }

    const data = (await res.json()) as {
      repo_name: string;
      deep_link: string;
      message: string;
    };
    console.log("\u2713 Graph extraction started for " + data.repo_name);
    console.log("  View: " + data.deep_link);

    // Open in browser on macOS
    try {
      execSync(`open "${data.deep_link}"`, { stdio: "pipe" });
    } catch {
      // Not on macOS or open failed — ignore
    }
  } catch (err) {
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

main();
