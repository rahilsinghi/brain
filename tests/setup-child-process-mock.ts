/**
 * Global setup: makes Node's child_process module mockable via vi.spyOn.
 * Without this, ESM namespace objects are sealed and vi.spyOn throws.
 * This file is loaded via vitest.config.ts setupFiles.
 */
import { vi } from "vitest";

vi.mock("child_process", async () => {
  const actual = await vi.importActual<typeof import("child_process")>("child_process");
  return { ...actual };
});
