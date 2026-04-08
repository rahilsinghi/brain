export interface SeedSummary {
  yaml: number;
  compiled: number;
  github: number;
  gmail: number;
  totalEmbedded: number;
  chunks: number;
  warnings: number;
  errors: number;
}

export class SeedLogger {
  step(tag: string, message: string): void {
    console.log(`[${tag}] ${message}`);
  }

  load(filename: string, count: number): void {
    console.log(`[load] ${filename} → ${count} entries (validated)`);
  }

  warn(message: string): void {
    console.warn(`[load] WARNING: ${message}`);
  }

  transform(name: string, result: number | string): void {
    if (typeof result === "number") {
      console.log(`[transform] ${name} → ${result} articles written`);
    } else {
      console.log(`[transform] ${name} → ${result}`);
    }
  }

  compile(current: number, total: number, filename: string): void {
    console.log(`[compile] ${current}/${total} — ${filename} (compiling...)`);
  }

  embed(articles: number, chunks: number): void {
    console.log(`[embed] ${articles}/${articles} articles embedded (${chunks.toLocaleString()} chunks)`);
  }

  sync(source: string, detail: string): void {
    console.log(`[sync] ${source} → ${detail}`);
  }

  validate(valid: number, malformed: number): void {
    console.log(`[validate] ${valid + malformed} articles checked — ${valid} valid, ${malformed} malformed`);
  }

  links(resolved: number, unresolved: number): void {
    console.log(`[link] Resolving wiki links — ${resolved} refs resolved, ${unresolved} unresolved`);
  }

  verify(source: string, cursor: string): void {
    console.log(`[verify] sync-state.json — ${source} cursor: ${cursor} ✓`);
  }

  summary(s: SeedSummary): void {
    console.log("");
    console.log("=== Seed Complete ===");
    console.log(`  YAML transforms:  ${s.yaml}`);
    console.log(`  Compiled:         ${s.compiled}`);
    console.log(`  GitHub sync:      ${s.github}`);
    console.log(`  Gmail sync:       ${s.gmail}`);
    console.log(`  Total embedded:   ${s.totalEmbedded} articles (${s.chunks.toLocaleString()} chunks)`);
    console.log(`  Warnings:         ${s.warnings}`);
    console.log(`  Errors:            ${s.errors}`);
  }
}
