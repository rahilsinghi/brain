import { createHash } from "node:crypto";

export function slugify(text: string): string {
  const slug = text
    .toLowerCase()
    .replace(/['\u2018\u2019.]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || "untitled";
}

export function uniqueSlug(title: string, sourceId: string): string {
  const base = slugify(title);
  const hash = createHash("sha256").update(sourceId).digest("hex").slice(0, 6);
  return `${base}-${hash}`;
}
