import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { writeFrontmatter } from "../frontmatter.js";
import { appendDailyEntry } from "../daily/log.js";
import type { TranscriptionProvider } from "./transcribe.js";
import type { ClassifyResult } from "./classify.js";

type ClassifyFn = (text: string) => Promise<ClassifyResult>;

export async function parseVoice(
  audioPath: string,
  vaultRoot: string,
  provider: TranscriptionProvider,
  classifyFn: ClassifyFn,
): Promise<void> {
  const sidecarPath = audioPath + ".processed";

  if (existsSync(sidecarPath)) {
    console.log(`[voice-parser] skipping already-processed: ${basename(audioPath)}`);
    return;
  }

  const transcription = await provider.transcribe(audioPath);
  const classification = await classifyFn(transcription.text);

  const { cluster, text, fallback } = classification;
  const now = new Date().toISOString();
  const timestamp = now.replace(/[:.]/g, "-").replace("Z", "");
  const audioBasename = basename(audioPath);

  const clusterDir = join(vaultRoot, "raw", cluster);
  mkdirSync(clusterDir, { recursive: true });

  const dropFilename = `voice-${timestamp}.md`;
  const dropPath = join(clusterDir, dropFilename);

  const frontmatter: Record<string, unknown> = {
    status: "pending",
    source_type: "voice",
    cluster,
    audio_file: `raw/voice/${audioBasename}`,
    transcription_duration_s: transcription.duration_s ?? null,
    language: transcription.language ?? null,
    classification_fallback: fallback,
    source_id: `voice/${audioBasename}`,
    ingested_at: now,
    parsed_at: now,
    compiled_to: null,
    processed_at: null,
    retry_count: 0,
    last_error: null,
    compile_progress: null,
  };

  writeFrontmatter(dropPath, frontmatter, text);

  writeFileSync(sidecarPath, "", "utf-8");

  const preview = text.length > 80 ? `${text.slice(0, 80)}...` : text;
  appendDailyEntry(vaultRoot, cluster, `Voice: "${preview}" (transcribed)`);

  console.log(`[voice-parser] ${audioBasename} → raw/${cluster}/${dropFilename} (cluster: ${cluster}, fallback: ${fallback})`);
}
