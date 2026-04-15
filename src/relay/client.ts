import type { RelayInboundItem } from "./types.js";

export class RelayClient {
  private baseUrl: string;
  private secret: string;
  private fetchFn: typeof fetch;

  constructor(baseUrl: string, secret: string, fetchFn?: typeof fetch) {
    this.baseUrl = baseUrl;
    this.secret = secret;
    this.fetchFn = fetchFn ?? fetch;
  }

  private authHeaders(): Record<string, string> {
    return { Authorization: `Bearer ${this.secret}` };
  }

  private jsonHeaders(): Record<string, string> {
    return {
      ...this.authHeaders(),
      "Content-Type": "application/json",
    };
  }

  async fetchPending(): Promise<RelayInboundItem[]> {
    const res = await this.fetchFn(
      `${this.baseUrl}/queue/inbound?status=pending`,
      { method: "GET", headers: this.authHeaders() },
    );
    if (!res.ok) throw new Error(`Relay API error: ${res.status}`);
    const data = (await res.json()) as { items: RelayInboundItem[] };
    return data.items;
  }

  async postResponse(
    id: string,
    response: string,
    status: string,
  ): Promise<void> {
    const res = await this.fetchFn(
      `${this.baseUrl}/queue/inbound/${id}/response`,
      {
        method: "POST",
        headers: this.jsonHeaders(),
        body: JSON.stringify({ response, status }),
      },
    );
    if (!res.ok) throw new Error(`Relay API error: ${res.status}`);
  }

  async postFail(id: string, error: string): Promise<void> {
    const res = await this.fetchFn(
      `${this.baseUrl}/queue/inbound/${id}/fail`,
      {
        method: "POST",
        headers: this.jsonHeaders(),
        body: JSON.stringify({ error }),
      },
    );
    if (!res.ok) throw new Error(`Relay API error: ${res.status}`);
  }

  async pushOutbound(input: {
    chat_id: number;
    message: string;
    category: string;
    deliver_at?: string;
    entry_ids?: string[];
    report_date?: string;
  }): Promise<string> {
    const res = await this.fetchFn(`${this.baseUrl}/queue/outbound`, {
      method: "POST",
      headers: this.jsonHeaders(),
      body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error(`Relay API error: ${res.status}`);
    const data = (await res.json()) as { id: string };
    return data.id;
  }

  async downloadFile(fileName: string): Promise<ArrayBuffer> {
    const res = await this.fetchFn(`${this.baseUrl}/files/${fileName}`, {
      method: "GET",
      headers: this.authHeaders(),
    });
    if (!res.ok) throw new Error(`Relay API error: ${res.status}`);
    return res.arrayBuffer();
  }
}
