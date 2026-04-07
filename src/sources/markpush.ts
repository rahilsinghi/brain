import { uniqueSlug } from "./slug.js";
import type { SyncSource, SourceSyncState, SyncResult } from "./types.js";

export interface PushHistoryItem {
  timestamp: string;
  url: string;
  title: string;
  content: string;
}

export interface MarkpushDeps {
  pushHistory: (opts: { limit: number }) => Promise<PushHistoryItem[]>;
}

export function createMarkpushSource(deps: MarkpushDeps): SyncSource {
  return {
    name: "markpush",
    async poll(state: SourceSyncState): Promise<SyncResult> {
      const items = await deps.pushHistory({ limit: 50 });
      const cursorTime = state.cursor ? new Date(state.cursor).getTime() : 0;

      const newItems = items
        .filter((item) => new Date(item.timestamp).getTime() > cursorTime)
        .map((item) => ({
          filename: `markpush/articles/${uniqueSlug(item.title, item.url)}.md`,
          content: item.content,
          sourceId: item.url,
        }));

      return {
        newItems,
        processedIds: newItems.map((i) => i.sourceId),
      };
    },
  };
}
