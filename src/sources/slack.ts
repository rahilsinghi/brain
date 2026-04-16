import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { parse as parseYaml } from "yaml";
import { uniqueSlug } from "./slug.js";
import type { SyncSource, SourceSyncState, SyncResult, RawDrop } from "./types.js";

// --- Types ---

export interface SlackDeps {
  searchMessages(query: string, count?: number): Promise<SlackMessage[]>;
}

export interface SlackMessage {
  ts: string;
  channelId: string;
  channelName: string;
  text: string;
  userId: string;
  userName: string;
  permalink: string;
  threadTs?: string;
  isoDate: string;
}

export interface SlackSourceConfig {
  userId: string;
  userName: string;
  channelsExclude: string[];
}

// --- Helpers ---

function formatDate(isoDate: string): string {
  const d = new Date(isoDate);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function sourceIdFor(msg: SlackMessage): string {
  return `${msg.channelId}-${msg.ts}`;
}

// --- DI-based factory (testable) ---

export function createSlackSource(deps: SlackDeps, config: SlackSourceConfig): SyncSource {
  return {
    name: "slack",
    async poll(state: SourceSyncState): Promise<SyncResult> {
      // Two searches: messages sent by user + messages mentioning user
      const [sentMessages, mentionMessages] = await Promise.all([
        deps.searchMessages(`from:<@${config.userId}>`, 50),
        deps.searchMessages(`<@${config.userId}>`, 50),
      ]);

      // Merge and dedup by ts (same message can appear in both)
      const seen = new Set<string>();
      const allMessages: SlackMessage[] = [];
      for (const msg of [...sentMessages, ...mentionMessages]) {
        const key = sourceIdFor(msg);
        if (!seen.has(key)) {
          seen.add(key);
          allMessages.push(msg);
        }
      }

      if (allMessages.length === 0) {
        return { newItems: [], processedIds: [] };
      }

      const processedSet = new Set(state.processed_ids);
      const excludeSet = new Set(config.channelsExclude);

      const newItems: RawDrop[] = [];
      const processedIds: string[] = [];

      for (const msg of allMessages) {
        const sid = sourceIdFor(msg);
        if (processedSet.has(sid)) continue;

        processedIds.push(sid);

        // Skip excluded channels but still track the ID
        if (excludeSet.has(msg.channelName)) continue;

        const formatted = formatDate(msg.isoDate);
        const filename = `slack/${msg.channelName}-${uniqueSlug(msg.text.slice(0, 50), sid)}.md`;
        const content = `# Slack: #${msg.channelName} \u2014 ${msg.userName} (${formatted})\n\n${msg.text}\n\n[View in Slack](${msg.permalink})\n`;

        newItems.push({ filename, content, sourceId: sid });
      }

      return { newItems, processedIds };
    },
  };
}

// --- Production API source ---

export function createSlackApiSource(vaultRoot: string): SyncSource | null {
  const token = process.env.SLACK_BOT_TOKEN;
  if (!token) {
    console.warn("[slack] SLACK_BOT_TOKEN not set \u2014 Slack source disabled");
    return null;
  }

  // Load config from .brain/config.yaml
  const configPath = join(vaultRoot, ".brain", "config.yaml");
  let slackConfig: SlackSourceConfig = {
    userId: "",
    userName: "rahil",
    channelsExclude: [],
  };

  if (existsSync(configPath)) {
    const raw = readFileSync(configPath, "utf-8");
    const parsed = parseYaml(raw) as Record<string, unknown> | null;
    const slackSection = parsed?.slack as Record<string, unknown> | undefined;
    if (slackSection) {
      slackConfig = {
        userId: (slackSection.user_id as string) || "",
        userName: (slackSection.user_name as string) || "rahil",
        channelsExclude: (slackSection.channels_exclude as string[]) || [],
      };
    }
  }

  if (!slackConfig.userId) {
    console.warn("[slack] slack.user_id not configured in .brain/config.yaml \u2014 Slack source disabled");
    return null;
  }

  // Dynamic import to avoid requiring @slack/web-api when not used
  let WebClient: unknown;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const slackPkg = require("@slack/web-api");
    WebClient = slackPkg.WebClient;
  } catch {
    console.warn("[slack] @slack/web-api not installed \u2014 run: pnpm add @slack/web-api");
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const client = new (WebClient as any)(token) as any;

  const deps: SlackDeps = {
    async searchMessages(query: string, count = 50): Promise<SlackMessage[]> {
      const res = await client.search.messages({
        query,
        sort: "timestamp",
        sort_dir: "desc",
        count,
      });

      const matches = res.messages?.matches ?? [];
      return matches.map((m: Record<string, unknown>) => {
        const ts = m.ts as string;
        const epochSec = parseFloat(ts);
        return {
          ts,
          channelId: (m.channel as Record<string, unknown>)?.id as string ?? "",
          channelName: (m.channel as Record<string, unknown>)?.name as string ?? "",
          text: (m.text as string) ?? "",
          userId: (m.user as string) ?? "",
          userName: (m.username as string) ?? "",
          permalink: (m.permalink as string) ?? "",
          threadTs: m.thread_ts as string | undefined,
          isoDate: new Date(epochSec * 1000).toISOString(),
        };
      });
    },
  };

  return createSlackSource(deps, slackConfig);
}
