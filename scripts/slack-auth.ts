#!/usr/bin/env tsx
/**
 * Slack Bot Token validation and setup.
 *
 * Usage: pnpm slack:auth
 *
 * Prompts for a Slack Bot Token, validates it via auth.test,
 * and saves SLACK_BOT_TOKEN to .brain/.env.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { createInterface } from "node:readline";

const vaultRoot = resolve(import.meta.dirname, "..");
const envPath = join(vaultRoot, ".brain", ".env");

console.log("\nSlack Bot Token Setup");
console.log("=====================\n");
console.log("1. Go to https://api.slack.com/apps and create/select your app");
console.log("2. Under OAuth & Permissions, add these Bot Token Scopes:");
console.log("   - search:read (search messages)");
console.log("   - users:read (resolve user info)");
console.log("3. Install the app to your workspace");
console.log("4. Copy the Bot User OAuth Token (starts with xoxb-)\n");

const rl = createInterface({ input: process.stdin, output: process.stdout });

rl.question("Paste your Slack Bot Token: ", async (token) => {
  rl.close();

  const trimmed = token.trim();
  if (!trimmed) {
    console.error("No token provided.");
    process.exit(1);
  }

  // Validate via auth.test
  try {
    const res = await fetch("https://slack.com/api/auth.test", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${trimmed}`,
        "Content-Type": "application/json",
      },
    });

    const data = (await res.json()) as {
      ok: boolean;
      team?: string;
      user_id?: string;
      user?: string;
      error?: string;
    };

    if (!data.ok) {
      console.error(`\nAuth failed: ${data.error}`);
      console.error("Check that the token is correct and the app is installed.");
      process.exit(1);
    }

    console.log(`\nAuthenticated successfully!`);
    console.log(`  Workspace: ${data.team}`);
    console.log(`  Bot User:  ${data.user} (${data.user_id})`);

    // Save token to .brain/.env
    let envContent = "";
    if (existsSync(envPath)) {
      envContent = readFileSync(envPath, "utf-8");
    }

    if (envContent.includes("SLACK_BOT_TOKEN=")) {
      envContent = envContent.replace(
        /SLACK_BOT_TOKEN=.*/,
        `SLACK_BOT_TOKEN=${trimmed}`,
      );
    } else {
      envContent = envContent.trimEnd() + `\nSLACK_BOT_TOKEN=${trimmed}\n`;
    }

    writeFileSync(envPath, envContent);
    console.log("\nToken saved to .brain/.env");
    console.log(`\nNext steps:`);
    console.log(`  1. Add your Slack user ID to .brain/config.yaml:`);
    console.log(`     slack:`);
    console.log(`       user_id: "${data.user_id}"`);
    console.log(`       user_name: "your-name"`);
    console.log(`       channels_exclude: []`);
    console.log(`  2. Restart the daemon: pnpm restart`);
  } catch (err) {
    console.error("Request failed:", err instanceof Error ? err.message : err);
    process.exit(1);
  }
});
