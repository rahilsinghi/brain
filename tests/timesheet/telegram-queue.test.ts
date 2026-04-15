import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { TimesheetDB } from "../../src/timesheet/db.js";
import {
  queueTelegramMessage,
  flushTelegramQueue,
  getPendingMessages,
  type TelegramQueueEntry,
} from "../../src/telegram/send-queue.js";
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const TEST_DIR = join(import.meta.dirname, "__fixtures__/telegram-queue-test");

describe("Telegram send queue", () => {
  let db: TimesheetDB;

  beforeEach(() => {
    mkdirSync(TEST_DIR, { recursive: true });
    db = new TimesheetDB(join(TEST_DIR, "test.db"));
  });

  afterEach(() => {
    db.close();
    rmSync(TEST_DIR, { recursive: true, force: true });
  });

  describe("queueTelegramMessage", () => {
    it("inserts a message into the queue", () => {
      queueTelegramMessage(db, 123456, "Hello from cron");

      const pending = getPendingMessages(db);
      expect(pending).toHaveLength(1);
      expect(pending[0].chat_id).toBe(123456);
      expect(pending[0].message).toBe("Hello from cron");
      expect(pending[0].sent_at).toBeNull();
    });

    it("queues multiple messages", () => {
      queueTelegramMessage(db, 123456, "First");
      queueTelegramMessage(db, 123456, "Second");

      const pending = getPendingMessages(db);
      expect(pending).toHaveLength(2);
    });

    it("stores a category tag", () => {
      queueTelegramMessage(db, 123456, "Report", "daily_report");

      const pending = getPendingMessages(db);
      expect(pending[0].category).toBe("daily_report");
    });
  });

  describe("flushTelegramQueue", () => {
    it("sends pending messages and marks them sent", async () => {
      queueTelegramMessage(db, 123456, "Test message");

      const sendFn = vi.fn().mockResolvedValue(true);
      const sent = await flushTelegramQueue(db, sendFn);

      expect(sent).toBe(1);
      expect(sendFn).toHaveBeenCalledWith(123456, "Test message");

      const pending = getPendingMessages(db);
      expect(pending).toHaveLength(0);
    });

    it("leaves messages in queue on send failure", async () => {
      queueTelegramMessage(db, 123456, "Will fail");

      const sendFn = vi.fn().mockResolvedValue(false);
      const sent = await flushTelegramQueue(db, sendFn);

      expect(sent).toBe(0);
      const pending = getPendingMessages(db);
      expect(pending).toHaveLength(1);
    });

    it("increments retry_count on failure", async () => {
      queueTelegramMessage(db, 123456, "Retry me");

      const sendFn = vi.fn().mockResolvedValue(false);
      await flushTelegramQueue(db, sendFn);

      const pending = getPendingMessages(db);
      expect(pending[0].retry_count).toBe(1);
    });

    it("skips messages that exceeded max retries", async () => {
      queueTelegramMessage(db, 123456, "Hopeless");

      const sendFn = vi.fn().mockResolvedValue(false);
      // Exhaust retries (default max 5)
      for (let i = 0; i < 6; i++) {
        await flushTelegramQueue(db, sendFn);
      }

      // After max retries, message should be marked as failed (not pending)
      const pending = getPendingMessages(db);
      expect(pending).toHaveLength(0);
    });

    it("sends multiple pending messages in order", async () => {
      queueTelegramMessage(db, 123456, "First");
      queueTelegramMessage(db, 123456, "Second");

      const order: string[] = [];
      const sendFn = vi.fn().mockImplementation((_chatId: number, msg: string) => {
        order.push(msg);
        return Promise.resolve(true);
      });

      await flushTelegramQueue(db, sendFn);

      expect(order).toEqual(["First", "Second"]);
      expect(getPendingMessages(db)).toHaveLength(0);
    });
  });
});
