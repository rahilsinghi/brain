import { readFileSync, mkdirSync, readdirSync, unlinkSync, rmdirSync } from "node:fs";
import { basename, join } from "node:path";
import { tmpdir } from "node:os";

export interface TranscriptionResult {
  text: string;
  language?: string;
  duration_s?: number;
}

export interface TranscriptionProvider {
  transcribe(audioPath: string): Promise<TranscriptionResult>;
}

export interface ExecResult {
  stdout: string;
  stderr: string;
  exitCode: number;
}

type ExecFn = (args: string[]) => Promise<ExecResult>;

async function defaultExec(args: string[]): Promise<ExecResult> {
  const proc = Bun.spawn(["whisper-cli", ...args], { stdout: "pipe", stderr: "pipe" });
  const stdout = await new Response(proc.stdout).text();
  const stderr = await new Response(proc.stderr).text();
  const exitCode = await proc.exited;
  return { stdout: stdout.trim(), stderr: stderr.trim(), exitCode };
}

const CHUNK_DURATION_S = 120; // 2 minutes per chunk
const CHUNK_OVERLAP_S = 5;   // 5 second overlap to avoid cut-off words
const MAX_AUDIO_DURATION_S = 1200; // 20 minutes max

async function getAudioDuration(audioPath: string): Promise<number> {
  const proc = Bun.spawn(
    ["ffprobe", "-v", "quiet", "-show_entries", "format=duration", "-of", "csv=p=0", audioPath],
    { stdout: "pipe", stderr: "pipe" },
  );
  const stdout = await new Response(proc.stdout).text();
  await proc.exited;
  const duration = parseFloat(stdout.trim());
  return Number.isNaN(duration) ? 0 : duration;
}

async function splitAudioIntoChunks(audioPath: string, durationS: number): Promise<string[]> {
  const chunkDir = join(tmpdir(), `brain-chunks-${Date.now()}`);
  mkdirSync(chunkDir, { recursive: true });

  const chunks: string[] = [];
  let offset = 0;
  let index = 0;

  while (offset < durationS) {
    const chunkPath = join(chunkDir, `chunk-${String(index).padStart(3, "0")}.wav`);
    const duration = Math.min(CHUNK_DURATION_S + CHUNK_OVERLAP_S, durationS - offset);

    const proc = Bun.spawn([
      "ffmpeg", "-y", "-i", audioPath,
      "-ss", String(offset),
      "-t", String(duration),
      "-ar", "16000", "-ac", "1",
      chunkPath,
    ], { stdout: "pipe", stderr: "pipe" });

    const exitCode = await proc.exited;
    if (exitCode !== 0) {
      const stderr = await new Response(proc.stderr).text();
      throw new Error(`ffmpeg chunk split failed: ${stderr}`);
    }

    chunks.push(chunkPath);
    offset += CHUNK_DURATION_S; // advance by chunk duration (not overlap)
    index++;
  }

  return chunks;
}

function cleanupChunks(chunkPaths: string[]): void {
  for (const p of chunkPaths) {
    try { unlinkSync(p); } catch { /* ignore */ }
  }
  if (chunkPaths.length > 0) {
    const dir = join(chunkPaths[0], "..");
    try { rmdirSync(dir); } catch { /* ignore */ }
  }
}

function deduplicateOverlap(prev: string, curr: string, overlapWords = 8): string {
  if (!prev) return curr;
  const prevWords = prev.split(/\s+/);
  const currWords = curr.split(/\s+/);
  const tail = prevWords.slice(-overlapWords).join(" ").toLowerCase();

  // Find where the overlap starts in the current chunk
  for (let i = 0; i < Math.min(overlapWords * 2, currWords.length); i++) {
    const candidate = currWords.slice(i, i + overlapWords).join(" ").toLowerCase();
    if (candidate === tail) {
      return currWords.slice(i + overlapWords).join(" ");
    }
  }
  return curr;
}

export class LocalWhisperProvider implements TranscriptionProvider {
  constructor(
    private model: string = "medium",
    private exec: ExecFn = defaultExec,
  ) {}

  private async transcribeChunk(audioPath: string): Promise<string> {
    const result = await this.exec(["-m", this.model, "-f", audioPath, "-nt"]);
    if (result.exitCode !== 0) {
      throw new Error(`whisper-cpp failed (exit ${result.exitCode}): ${result.stderr}`);
    }
    return result.stdout.trim();
  }

  async transcribe(audioPath: string): Promise<TranscriptionResult> {
    const duration = await getAudioDuration(audioPath);

    // Short audio: transcribe directly (no chunking needed)
    if (duration <= CHUNK_DURATION_S + 10) {
      const text = await this.transcribeChunk(audioPath);
      return { text, duration_s: duration || undefined };
    }

    // Cap at max duration
    const effectiveDuration = Math.min(duration, MAX_AUDIO_DURATION_S);
    if (duration > MAX_AUDIO_DURATION_S) {
      console.warn(`[whisper] Audio is ${Math.round(duration / 60)} min, capping at ${MAX_AUDIO_DURATION_S / 60} min`);
    }

    console.log(`[whisper] Long audio (${Math.round(effectiveDuration / 60)} min), splitting into ${Math.ceil(effectiveDuration / CHUNK_DURATION_S)} chunks...`);

    const chunkPaths = await splitAudioIntoChunks(audioPath, effectiveDuration);
    const transcripts: string[] = [];

    try {
      for (let i = 0; i < chunkPaths.length; i++) {
        console.log(`[whisper] Transcribing chunk ${i + 1}/${chunkPaths.length}...`);
        const chunkText = await this.transcribeChunk(chunkPaths[i]);
        const deduped = deduplicateOverlap(transcripts[transcripts.length - 1] ?? "", chunkText);
        transcripts.push(deduped);
      }
    } finally {
      cleanupChunks(chunkPaths);
    }

    const fullText = transcripts.join(" ").replace(/\s+/g, " ").trim();
    return { text: fullText, duration_s: effectiveDuration };
  }
}

type FetchFn = typeof globalThis.fetch;
type ReadFileFn = (path: string) => Buffer;

export class OpenAIWhisperProvider implements TranscriptionProvider {
  constructor(
    private model: string = "whisper-1",
    private apiKey: string,
    private fetchFn: FetchFn = globalThis.fetch,
    private readFile: ReadFileFn = readFileSync,
  ) {}

  async transcribe(audioPath: string): Promise<TranscriptionResult> {
    const fileData = this.readFile(audioPath);
    const blob = new Blob([fileData]);
    const formData = new FormData();
    formData.append("file", blob, basename(audioPath));
    formData.append("model", this.model);

    const response = await this.fetchFn("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: { Authorization: `Bearer ${this.apiKey}` },
      body: formData,
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`OpenAI Whisper API error (${response.status}): ${body}`);
    }

    const data = (await response.json()) as {
      text: string;
      language?: string;
      duration?: number;
    };
    return { text: data.text, language: data.language, duration_s: data.duration };
  }
}

export function createTranscriptionProvider(
  provider: "local" | "openai",
  localModel: string,
  openaiModel: string,
  vaultRoot?: string,
): TranscriptionProvider {
  if (provider === "openai") {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OPENAI_API_KEY not set in .brain/.env");
    return new OpenAIWhisperProvider(openaiModel, apiKey);
  }
  // Resolve model path: check .brain/models/ggml-{model}.bin first
  const modelPath = vaultRoot
    ? `${vaultRoot}/.brain/models/ggml-${localModel}.bin`
    : `ggml-${localModel}.bin`;
  return new LocalWhisperProvider(modelPath);
}
