import { mkdirSync, writeFileSync, existsSync, unlinkSync } from "node:fs";
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

export interface SlidesOptions {
  vaultRoot: string;
  synthesizeFn: SynthFn;
  claudeFn?: ClaudeFn;
  execFn?: ExecFn;
  store: unknown;
  topK: number;
  marpTheme: string;
}

export interface SlidesResult {
  mdPath: string;
  pdfPath: string;
  htmlPath: string;
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

export async function generateSlides(
  topic: string,
  options: SlidesOptions,
): Promise<SlidesResult> {
  const {
    vaultRoot,
    synthesizeFn,
    claudeFn = defaultClaudeFn(),
    execFn = defaultExecFn(),
    store,
    topK,
    marpTheme,
  } = options;

  // 1. Query wiki for context
  const synthesis = await synthesizeFn(topic, store as never, topK);

  // 2. Build prompt and call Claude for Marp markdown
  const prompt = `You are generating a Marp presentation (markdown slide deck) about: "${topic}"

Here is relevant context from the knowledge base:
${synthesis.answer}

Generate a complete Marp presentation with:
- A frontmatter block with: marp: true, theme: brutalist
- At least 3 slides separated by ---
- A title slide, content slides, and a summary/conclusion slide
- Clear headings and bullet points
- Professional tone

Return ONLY the raw Marp markdown. No code fences, no explanation.`;

  const marpMarkdown = await claudeFn(prompt);

  // 3. Derive file paths
  const slug = slugify(topic).slice(0, 60);
  const slidesDir = join(vaultRoot, "output", "slides");
  mkdirSync(slidesDir, { recursive: true });

  const mdPath = join("output", "slides", `${slug}.md`);
  const pdfPath = join("output", "slides", `${slug}.pdf`);
  const htmlPath = join("output", "slides", `${slug}.html`);

  const mdAbsolute = join(vaultRoot, mdPath);
  const pdfAbsolute = join(vaultRoot, pdfPath);

  // 4. Write markdown file
  writeFileSync(mdAbsolute, marpMarkdown, "utf-8");

  // 5. Shell out to marp-cli
  const marpArgs = [
    "npx",
    "@marp-team/marp-cli",
    mdAbsolute,
    "--html",
    "--pdf",
    "--output",
    pdfAbsolute,
    "--theme",
    join(vaultRoot, marpTheme),
  ];

  const result = await execFn(marpArgs);

  if (result.exitCode !== 0) {
    // Cleanup partial output files
    const htmlAbsolute = join(vaultRoot, htmlPath);
    if (existsSync(pdfAbsolute)) unlinkSync(pdfAbsolute);
    if (existsSync(htmlAbsolute)) unlinkSync(htmlAbsolute);

    console.error("marp-cli stderr:", result.stderr);
    throw new Error(`marp-cli failed (exit ${result.exitCode}): ${result.stderr}`);
  }

  return { mdPath, pdfPath, htmlPath };
}
