#!/usr/bin/env tsx
/**
 * One-time OAuth2 consent flow for Gmail.
 *
 * Usage: pnpm gmail:auth
 *
 * Opens a browser for Google consent, exchanges the authorization code
 * for tokens, and saves GMAIL_REFRESH_TOKEN to .brain/.env.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { createInterface } from "node:readline";
import { google } from "googleapis";

const vaultRoot = resolve(import.meta.dirname, "..");
const credPath = join(vaultRoot, ".brain", "gmail-credentials.json");

if (!existsSync(credPath)) {
  console.error("Missing .brain/gmail-credentials.json");
  console.error("Download OAuth credentials from Google Cloud Console first.");
  process.exit(1);
}

interface CredFile {
  installed?: { client_id: string; client_secret: string; redirect_uris: string[] };
  web?: { client_id: string; client_secret: string; redirect_uris: string[] };
}

const creds: CredFile = JSON.parse(readFileSync(credPath, "utf-8"));
const installed = creds.installed ?? creds.web;
if (!installed) {
  console.error("Invalid credentials file — missing 'installed' or 'web' key");
  process.exit(1);
}

const oauth2 = new google.auth.OAuth2(
  installed.client_id,
  installed.client_secret,
  "http://localhost",
);

const authUrl = oauth2.generateAuthUrl({
  access_type: "offline",
  prompt: "consent",
  scope: ["https://www.googleapis.com/auth/gmail.modify"],
});

console.log("\n1. Open this URL in your browser:\n");
console.log(authUrl);
console.log("\n2. Authorize and copy the code from the redirect URL");
console.log("   (the 'code' parameter in http://localhost/?code=XXXXX)\n");

const rl = createInterface({ input: process.stdin, output: process.stdout });

rl.question("Paste the authorization code: ", async (code) => {
  rl.close();

  try {
    const { tokens } = await oauth2.getToken(code.trim());
    if (!tokens.refresh_token) {
      console.error("No refresh token received. Try revoking access and re-running.");
      console.error("Revoke at: https://myaccount.google.com/permissions");
      process.exit(1);
    }

    // Save refresh token to .brain/.env
    const envPath = join(vaultRoot, ".brain", ".env");
    let envContent = "";
    if (existsSync(envPath)) {
      envContent = readFileSync(envPath, "utf-8");
    }

    // Replace or append GMAIL_REFRESH_TOKEN
    if (envContent.includes("GMAIL_REFRESH_TOKEN=")) {
      envContent = envContent.replace(
        /GMAIL_REFRESH_TOKEN=.*/,
        `GMAIL_REFRESH_TOKEN=${tokens.refresh_token}`,
      );
    } else {
      envContent = envContent.trimEnd() + `\nGMAIL_REFRESH_TOKEN=${tokens.refresh_token}\n`;
    }

    writeFileSync(envPath, envContent);
    console.log("\nRefresh token saved to .brain/.env");
    console.log("Gmail source is now ready. Restart the daemon to activate.");
  } catch (err) {
    console.error("Token exchange failed:", err instanceof Error ? err.message : err);
    process.exit(1);
  }
});
