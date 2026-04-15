import type { RelayDB } from "./db.js";

export type OutboundSendFn = (
  chatId: number,
  message: string,
) => Promise<{ message_id: number } | null>;

export async function flushDueOutbound(
  db: RelayDB,
  sendFn: OutboundSendFn,
): Promise<number> {
  const due = db.getDueOutbound();
  let sent = 0;

  for (const item of due) {
    const result = await sendFn(item.chat_id, item.message);

    if (result !== null) {
      db.markOutboundSent(item.id, result.message_id);

      if (item.report_date !== null && item.entry_ids !== null) {
        db.insertReportMap(
          result.message_id,
          item.id,
          item.report_date,
          item.entry_ids,
        );
      }

      sent++;
    } else {
      db.incrementOutboundRetry(item.id);
    }
  }

  return sent;
}
