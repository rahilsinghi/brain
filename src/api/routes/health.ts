import type { FastifyInstance } from "fastify";
import { getHealthStats } from "../health-core.js";

export async function healthRoute(app: FastifyInstance): Promise<void> {
  const startTime = Date.now();

  app.get("/health", async () => {
    return getHealthStats({
      store: app.store,
      vaultRoot: app.vaultRoot,
      startTime,
    });
  });
}
