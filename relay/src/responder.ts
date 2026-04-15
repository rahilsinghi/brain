import type { RelayDB } from "./db.js";

export type ResponseSendFn = (
  chatId: number,
  text: string,
  replyToMessageId: number | null,
) => Promise<{ message_id: number } | null>;

export async function flushResponses(
  db: RelayDB,
  sendFn: ResponseSendFn,
): Promise<number> {
  const unsent = db.getUnsentResponses();
  let sent = 0;

  for (const item of unsent) {
    if (item.response === null) continue;

    const result = await sendFn(
      item.chat_id,
      item.response,
      item.telegram_message_id,
    );

    if (result !== null) {
      db.markResponseSent(item.id, result.message_id);
      sent++;
    }
    // On failure: skip — will retry next cycle
  }

  return sent;
}
