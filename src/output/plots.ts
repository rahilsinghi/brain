import { mkdirSync, writeFileSync, existsSync, unlinkSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { slugify } from "../sources/slug.js";
import type { SynthesisResult } from "../query/synthesize.js";

export interface ExecResult {
  exitCode: number;
  stdout: string;
  stderr: string;
}

type ExecFn = (args: string[]) => Promise<ExecResult>;
type ClaudeFn = (prompt: string) => Promise<string>;
type SynthFn = (query: string, store: never, topK: number) => Promise<SynthesisResult>;

export interface PlotOptions {
  vaultRoot: string;
  synthesizeFn: SynthFn;
  claudeFn?: ClaudeFn;
  execFn?: ExecFn;
  store: unknown;
  topK: number;
  matplotlibRc: string;
}

export interface PlotResult {
  pyPath: string;
  pngPath: string;
}

function defaultClaudeFn(): ClaudeFn {
  return async (prompt: string): Promise<string> => {
    const { generate } = await import("../llm/provider.js");
    const response = await generate({ prompt, maxTokens: 4096 });
    return response.text;
  };
}

function defaultExecFn(): ExecFn {
  return async (args: string[]): Promise<ExecResult> => {
    const proc = Bun.spawn(args, {
      stdout: "pipe",
      stderr: "pipe",
    });
    const exitCode = await proc.exited;
    const stdout = await new Response(proc.stdout).text();
    const stderr = await new Response(proc.stderr).text();
    return { exitCode, stdout, stderr };
  };
}

export async function generatePlot(
  description: string,
  options: PlotOptions,
): Promise<PlotResult> {
  const {
    vaultRoot,
    synthesizeFn,
    claudeFn = defaultClaudeFn(),
    execFn = defaultExecFn(),
    store,
    topK,
    matplotlibRc,
  } = options;

  // 1. Query wiki for context
  const synthesis = await synthesizeFn(description, store as never, topK);

  // 2. Load rcParams from template if exists
  const rcParamsPath = join(vaultRoot, matplotlibRc);
  const rcParamsJson = existsSync(rcParamsPath)
    ? readFileSync(rcParamsPath, "utf-8")
    : "{}";

  // 3. Derive file paths
  const slug = slugify(description).slice(0, 60);
  const plotsDir = join(vaultRoot, "output", "plots");
  mkdirSync(plotsDir, { recursive: true });

  const pyPath = join("output", "plots", `${slug}.py`);
  const pngPath = join("output", "plots", `${slug}.png`);
  const pyAbsolute = join(vaultRoot, pyPath);
  const pngAbsolute = join(vaultRoot, pngPath);

  // 4. Build prompt and call Claude for Python script
  const prompt = `You are generating a matplotlib Python script to visualize: "${description}"

Here is relevant context from the knowledge base:
${synthesis.answer}

Matplotlib rcParams to apply (from brutalist theme):
${rcParamsJson}

Generate a complete Python script that:
- Imports matplotlib and any needed libraries
- Applies the rcParams above using matplotlib.rcParams.update(...)
- Creates a clear, informative plot based on the context
- Saves the output to exactly this path: ${pngAbsolute}
  (use plt.savefig("${pngAbsolute}", bbox_inches='tight'))
- Does NOT call plt.show()

Return ONLY the raw Python script. No code fences, no explanation.`;

  const pythonScript = await claudeFn(prompt);

  // 5. Write Python script file
  writeFileSync(pyAbsolute, pythonScript, "utf-8");

  // 6. Shell out to uv run
  const uvArgs = ["uv", "run", "--python", "3.12", pyAbsolute];
  const result = await execFn(uvArgs);

  if (result.exitCode !== 0) {
    // Cleanup partial .png if it exists
    if (existsSync(pngAbsolute)) unlinkSync(pngAbsolute);

    console.error("uv run stderr:", result.stderr);
    throw new Error(`uv run failed (exit ${result.exitCode}): ${result.stderr}`);
  }

  return { pyPath, pngPath };
}
