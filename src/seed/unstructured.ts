import { readFileSync, existsSync, mkdirSync } from "node:fs";
import { join, basename } from "node:path";
import { writeFrontmatter } from "../frontmatter.js";

export interface UnstructuredFile {
  sourcePath: string;
  targetSlug: string;
}

const UNSTRUCTURED_MANIFEST: { subpath: string; slug: string }[] = [
  { subpath: "prep/mews_rogers_leo_prep.md", slug: "mews-rogers-leo" },
  { subpath: "prep/maison_talking_points.md", slug: "maison-talking-points" },
  { subpath: "prep/maison_negotiation_notes.md", slug: "maison-negotiation" },
  { subpath: "prep/spiderrock_interview_prep.md", slug: "spiderrock-interview" },
  { subpath: "prep/mechanize_technical_prep.md", slug: "mechanize-technical" },
  { subpath: "prep/stardrift_leila_clark_prep.md", slug: "stardrift-leila-clark" },
  { subpath: "prep/stardrift_talking_points.md", slug: "stardrift-talking-points" },
  { subpath: "prep/toolhouse_brenton_andersen_prep.md", slug: "toolhouse-brenton-andersen" },
  { subpath: "prep/harrison_qian_prep.md", slug: "harrison-qian" },
  { subpath: "docs/bullet_bank.md", slug: "bullet-bank" },
  { subpath: "docs/cover_letter_core_paragraphs.md", slug: "cover-letter-core" },
  { subpath: "HOSPITALITY_OUTREACH_PLAYBOOK.md", slug: "hospitality-outreach-playbook" },
  { subpath: "DECISION_FRAMEWORK.md", slug: "decision-framework" },
];

export function getUnstructuredFiles(sourceRoot: string): UnstructuredFile[] {
  return UNSTRUCTURED_MANIFEST.map((m) => ({
    sourcePath: join(sourceRoot, m.subpath),
    targetSlug: m.slug,
  })).filter((f) => existsSync(f.sourcePath));
}

export function copyToRaw(files: UnstructuredFile[], vaultRoot: string, force: boolean = false): string[] {
  const written: string[] = [];
  const rawDir = join(vaultRoot, "raw", "articles");
  mkdirSync(rawDir, { recursive: true });

  for (const file of files) {
    if (!existsSync(file.sourcePath)) continue;

    const targetPath = join(rawDir, `${file.targetSlug}.md`);

    // Skip if already copied unless --force
    if (existsSync(targetPath) && !force) continue;

    const content = readFileSync(file.sourcePath, "utf-8");

    const now = new Date().toISOString();
    const frontmatter: Record<string, unknown> = {
      status: "pending",
      source_type: "file_drop",
      source_id: `career-datacenter/${file.sourcePath.split("career-datacenter/").pop() ?? basename(file.sourcePath)}`,
      ingested_at: now,
      parsed_at: now,
      compiled_to: null,
      processed_at: null,
      retry_count: 0,
      last_error: null,
      compile_progress: null,
    };

    writeFrontmatter(targetPath, frontmatter, content);
    written.push(targetPath);
  }

  return written;
}
