import { readFileSync } from "node:fs";
import { parse as parseYaml } from "yaml";
import { parse as parseCsv } from "csv-parse/sync";
import type { ZodSchema } from "zod";

export function loadYaml<T>(filePath: string, schema: ZodSchema<T>): T {
  const raw = readFileSync(filePath, "utf-8");
  const parsed = parseYaml(raw) as unknown;

  const result = schema.safeParse(parsed);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(`Validation failed for ${filePath}:\n${issues}`);
  }

  return result.data;
}

export function loadCsv<T>(filePath: string, rowSchema: ZodSchema<T>): T[] {
  const raw = readFileSync(filePath, "utf-8");
  const records = parseCsv(raw, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
    trim: true,
  }) as Record<string, string>[];

  return records.map((record, i) => {
    const result = rowSchema.safeParse(record);
    if (!result.success) {
      const issues = result.error.issues
        .map((iss) => `  ${iss.path.join(".")}: ${iss.message}`)
        .join("\n");
      throw new Error(`CSV row ${i + 1} validation failed in ${filePath}:\n${issues}`);
    }
    return result.data;
  });
}
