---
title: Email Digest Generator and Batch Integration
author: ai
created_at: 2026-04-10T21:40:52.702Z
last_ai_edit: 2026-04-10T21:40:52.702Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-emaildigestgenerator-gmail-sender-wire-int-873a60.md]]"
tags:
  - email
  - digest
  - generator
  - gmail
  - smtp
  - python
  - cli
  - batch_processing
  - jinja2
  - career-datacenter
---

# Email Digest Generator and Batch Integration

This entry details the addition of an `EmailDigestGenerator` to the `Career-Datacenter` project. It describes a new CLI tool for sending categorized job digests via Gmail SMTP, integrated as a non-fatal step in the overnight batch processing pipeline.

## Key Concepts

EmailDigestGenerator,Jinja2 Templating,SMTP (Simple Mail Transfer Protocol),Gmail Application Passwords,Environment Variables,CLI (Command Line Interface),Batch Processing

## Details

This commit (`5b61407`) by Rahil Singhi (co-authored by Claude Sonnet 4.5) introduces a new email digest generation and sending system within the `rahilsinghi/Career-Datacenter` repository, adding 247 lines of code across 2 files on 2026-02-17.

### `EmailDigestGenerator` (`cli/email_digest.py`)

A new Python CLI script, `cli/email_digest.py`, has been created to handle the generation and sending of email digests. Key features include:

*   **Templating:** Uses the `Jinja2` templating engine to render the `templates/email_digest.html` file into the final email content.
*   **Job Grouping:** Organizes job postings into two tiers based on a scoring mechanism:
    *   **Tier 1:** Jobs with a score of 9.0 or higher.
    *   **Tier 2:** Jobs with a score between 8.0 and 8.9.
    *   The total number of jobs included in the digest is capped at 12.
*   **Gmail SMTP Sender:** Employs Gmail's SMTP service with `starttls` for secure email delivery. It requires the `GMAIL_APP_PASSWORD` environment variable for authentication.
*   **Command Line Interface (CLI) Options:**
    *   `--test`: Opens the rendered HTML email in a web browser for visual preview without sending.
    *   `--send`: Triggers the immediate sending of the generated email digest.
    *   `--preview`: Prints the full HTML content of the digest to standard output for inspection.
    *   `--to <address>`: Allows overriding the default recipient email address for testing or specific use cases.

### Integration with `batch_process_overnight.py`

The `EmailDigestGenerator` has been integrated as **Step 8** into the `batch_process_overnight.py` script. This ensures that a job digest email is automatically generated and sent as part of the daily overnight processing routine.

*   **Automatic Password Detection:** The batch processor will automatically check for the `GMAIL_APP_PASSWORD` environment variable. If it is not set, the email sending step is silently skipped without causing an error.
*   **Non-Fatal Errors:** Failures during the email sending process are designed to be non-fatal, meaning they will not interrupt or crash the entire `batch_process_overnight.py` execution.

### Required Configuration (`.env`)

To enable the email digest functionality, the following environment variables must be set in the `.env` file:

*   `GMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx`: An application-specific password generated from your Google Account security settings, required for sending emails via Gmail SMTP.
*   `DIGEST_EMAIL=your@email.com`: The email address from which the digest emails will be sent.

## Related

[[Batch Processing]],[[Career-Datacenter Project]],[[Jinja2 Templating]],[[SMTP]],[[Environment Variables]]
