---
title: EmailDigestGenerator Integration in Career-Datacenter
author: ai
created_at: 2026-04-12T18:15:39.429Z
last_ai_edit: 2026-04-12T18:15:39.429Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-emaildigestgenerator-gmail-sender-wire-int-873a60.md]]"
tags:
  - email digest
  - job search automation
  - career-datacenter
  - gmail smtp
  - jinja2
  - cli
  - batch processing
  - python
---

# EmailDigestGenerator Integration in Career-Datacenter

This update introduces the `EmailDigestGenerator` to the [[Career-Datacenter]] project, enabling automated daily job digest emails. It renders HTML emails categorizing jobs by score, sends them via Gmail SMTP, and integrates seamlessly into the existing `batch_process_overnight.py` workflow. The system is designed to be robust, silently skipping email sending if credentials are not configured.

## Key Concepts

EmailDigestGenerator,Jinja2 Templating,Gmail SMTP,Environment Variables,Batch Processing,Command Line Interface (CLI)

## Details

This feature introduces a new `cli/email_digest.py` script within the `rahilsinghi/Career-Datacenter` repository (SHA: `5b61407`). The script's primary function is to generate and send automated job digest emails.

**Key Features of `cli/email_digest.py`:**

*   **EmailDigestGenerator Class**: Implements the core logic for compiling job data into an email digest.
*   **Jinja2 Templating**: Utilizes `templates/email_digest.html` for rendering the email's HTML content, ensuring a structured and visually appealing output.
*   **Job Categorization**: Jobs are grouped into two tiers based on their relevance score:
    *   **Tier 1**: Jobs with a score of 9.0 or higher.
    *   **Tier 2**: Jobs with a score between 8.0 and 8.9.
    The total number of jobs included in the digest is capped at 12.
*   **Gmail SMTP Sender**: Employs `starttls` for secure email transmission via Gmail's SMTP server. It relies on the `GMAIL_APP_PASSWORD` environment variable for authentication.
*   **Command Line Interface (CLI) Flags**: Provides flexible control over email generation and sending:
    *   `--test`: Opens the rendered HTML email in the default web browser for a quick visual preview.
    *   `--send`: Initiates the immediate sending of the digest email.
    *   `--preview`: Prints the generated HTML content directly to standard output.
    *   `--to`: Allows overriding the default recipient email address for testing or specific deliveries.

**Integration with `batch_process_overnight.py`:**

*   The `EmailDigestGenerator` is integrated as **Step 8** in the automated `batch_process_overnight.py` workflow.
*   **Auto-detection and Resilience**: The batch processor automatically checks for the presence of `GMAIL_APP_PASSWORD`. If this environment variable is not set, the email sending step is silently skipped, ensuring that email failures are non-fatal and do not interrupt the overall batch processing run.

**Setup Requirements (`.env` file):**

To enable the email digest functionality, the following environment variables must be configured in the `.env` file:

```
GMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
DIGEST_EMAIL=your@email.com
```

This update significantly enhances the [[Career Datacenter: Job Search Automation Platform]] by providing users with a convenient, automated summary of relevant job opportunities directly to their inbox.

## Related

[[Career-Datacenter]],[[Automated Email Digest System]],[[batch_process_overnight.py: Job Description Parsing and CLI Flags Update (b9a5d8d)]],[[Add SMTP Email Sending and Update Signature URLs]],[[Add SMTP Send Capability and Update Signature URLs (Career-Datacenter)]],[[Career Datacenter: Job Search Automation Platform]]
