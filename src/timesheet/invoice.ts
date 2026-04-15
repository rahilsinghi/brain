import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import type { TimesheetDB } from "./db.js";
import type { TimesheetConfig, TimesheetEntry } from "./types.js";

export interface InvoiceOptions {
  employerId: string;
  periodStart: string;
  periodEnd: string;
  notes?: string;
}

export interface InvoiceResult {
  success: boolean;
  invoiceId?: string;
  mdPath?: string;
  csvPath?: string;
  totalHours?: number;
  totalAmount?: number;
  error?: string;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function formatInvoiceMarkdown(
  employerId: string,
  entries: TimesheetEntry[],
  rate: number,
  currency: string,
  periodStart: string,
  periodEnd: string,
  invoiceId: string,
  notes?: string,
): string {
  const totalHours = entries.reduce((s, e) => s + e.hours, 0);
  const totalAmount = Math.round(totalHours * rate * 100) / 100;

  // Group by date
  const byDate = new Map<string, TimesheetEntry[]>();
  for (const e of entries) {
    const list = byDate.get(e.date) ?? [];
    list.push(e);
    byDate.set(e.date, list);
  }

  // Category breakdown
  const byCategory = new Map<string, number>();
  for (const e of entries) {
    byCategory.set(e.category, (byCategory.get(e.category) ?? 0) + e.hours);
  }

  const lines: string[] = [];
  lines.push(`# Invoice — ${capitalize(employerId)}`);
  lines.push("");
  lines.push(`**Invoice ID:** ${invoiceId}`);
  lines.push(`**Period:** ${periodStart} → ${periodEnd}`);
  lines.push(`**Rate:** $${rate}/hr (${currency})`);
  lines.push(`**Total Hours:** ${totalHours}h`);
  lines.push(`**Total Amount:** $${totalAmount.toFixed(2)}`);
  if (notes) {
    lines.push(`**Notes:** ${notes}`);
  }
  lines.push("");

  // Line items by date
  lines.push("## Line Items");
  lines.push("");
  lines.push("| Date | Hours | Category | Description |");
  lines.push("|------|-------|----------|-------------|");

  for (const [date, dayEntries] of [...byDate.entries()].sort()) {
    for (const e of dayEntries) {
      lines.push(`| ${date} | ${e.hours}h | ${e.category} | ${e.description} |`);
    }
  }

  lines.push("");
  lines.push("## Category Breakdown");
  lines.push("");
  lines.push("| Category | Hours | Amount |");
  lines.push("|----------|-------|--------|");

  for (const [cat, hours] of [...byCategory.entries()].sort()) {
    const amt = Math.round(hours * rate * 100) / 100;
    lines.push(`| ${cat} | ${hours}h | $${amt.toFixed(2)} |`);
  }

  lines.push("");
  lines.push("---");
  lines.push(`Generated: ${new Date().toISOString().slice(0, 10)}`);

  return lines.join("\n");
}

function formatInvoiceCsv(entries: TimesheetEntry[]): string {
  const lines: string[] = [];
  lines.push("date,employer_id,hours,category,description,start_time,end_time,source,status");

  for (const e of entries) {
    const desc = e.description.replace(/"/g, '""');
    lines.push(
      `${e.date},${e.employer_id},${e.hours},${e.category},"${desc}",${e.start_time},${e.end_time},${e.source},${e.status}`,
    );
  }

  return lines.join("\n");
}

export function generateInvoice(
  db: TimesheetDB,
  config: TimesheetConfig,
  vaultRoot: string,
  options: InvoiceOptions,
): InvoiceResult {
  const { employerId, periodStart, periodEnd, notes } = options;

  // Validate employer
  const employer = db.getEmployer(employerId);
  if (!employer) {
    return { success: false, error: `Employer '${employerId}' not found` };
  }

  const empConfig = config.employers[employerId];
  const rate = employer.rate_hourly;
  const currency = empConfig?.currency ?? employer.currency;

  // Get finalized entries for the period
  const entries = db.getEntriesByStatus(periodStart, periodEnd, employerId, "finalized");
  if (entries.length === 0) {
    return { success: false, error: `No finalized entries for ${employerId} in ${periodStart}–${periodEnd}` };
  }

  const totalHours = Math.round(entries.reduce((s, e) => s + e.hours, 0) * 100) / 100;
  const totalAmount = Math.round(totalHours * rate * 100) / 100;

  // Generate invoice ID
  const month = periodStart.slice(0, 7); // YYYY-MM
  const invoiceId = `${employerId}-${month}`;

  // Write markdown
  const mdRelPath = `output/invoices/${invoiceId}.md`;
  const mdAbsPath = join(vaultRoot, mdRelPath);
  mkdirSync(dirname(mdAbsPath), { recursive: true });
  const md = formatInvoiceMarkdown(
    employerId, entries, rate, currency,
    periodStart, periodEnd, invoiceId, notes,
  );
  writeFileSync(mdAbsPath, md, "utf-8");

  // Write CSV
  const csvRelPath = `output/invoices/${invoiceId}.csv`;
  const csvAbsPath = join(vaultRoot, csvRelPath);
  const csv = formatInvoiceCsv(entries);
  writeFileSync(csvAbsPath, csv, "utf-8");

  // Insert invoice record
  db.insertInvoice({
    id: invoiceId,
    employer_id: employerId,
    period_start: periodStart,
    period_end: periodEnd,
    total_hours: totalHours,
    total_amount: totalAmount,
    currency,
    generated_at: new Date().toISOString(),
    notes: notes ?? null,
  });

  // Transition entries to invoiced
  for (const entry of entries) {
    db.updateEntryInvoice(entry.id, invoiceId);
  }

  return {
    success: true,
    invoiceId,
    mdPath: mdRelPath,
    csvPath: csvRelPath,
    totalHours,
    totalAmount,
  };
}
