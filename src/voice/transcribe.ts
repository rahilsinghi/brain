import { readFileSync } from "node:fs";
import { basename } from "node:path";

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

export class LocalWhisperProvider implements TranscriptionProvider {
  constructor(
    private model: string = "medium",
    private exec: ExecFn = defaultExec,
  ) {}

  async transcribe(audioPath: string): Promise<TranscriptionResult> {
    const result = await this.exec([
      "-m",
      this.model,
      "-f",
      audioPath,
      "-nt",
    ]);
    if (result.exitCode !== 0) {
      throw new Error(`whisper-cpp failed (exit ${result.exitCode}): ${result.stderr}`);
    }
    return { text: result.stdout.trim() };
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
