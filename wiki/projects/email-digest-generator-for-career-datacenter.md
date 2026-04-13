---
title: Email Digest Generator for Career-Datacenter
author: ai
created_at: 2026-04-12T22:15:28.565Z
last_ai_edit: 2026-04-12T22:15:28.565Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-emaildigestgenerator-gmail-sender-wire-int-873a60.md]]"
tags:
  - email
  - digest
  - automation
  - cli
  - python
  - jinja2
  - smtp
  - career-datacenter
  - batch processing
  - gmail
---

# Email Digest Generator for Career-Datacenter

This commit introduces an `EmailDigestGenerator` CLI tool (`cli/email_digest.py`) to the `Career-Datacenter` project, enabling automated generation and sending of job search summary emails via Gmail SMTP. It groups jobs by tier and integrates seamlessly into the `batch_process_overnight.py` script as a non-fatal step.

## Key Concepts

EmailDigestGenerator,Jinja2 Templating,Gmail SMTP,CLI Flags,Environment Variables,Job Tiering,Batch Processing

## Details

This enhancement adds a new command-line interface (CLI) tool, `cli/email_digest.py`, to the [[Career-Datacenter]] repository. This tool is designed to generate and send a summary email of recent job applications.

### `EmailDigestGenerator` Features:
*   **Templating**: Utilizes [[Jinja2]] to render `templates/email_digest.html`, providing a clean, structured email format.
*   **Job Grouping**: Automatically categorizes jobs into two tiers: `tier1` for scores ≥ 9.0 and `tier2` for scores between 8.0 and 8.9. The total number of jobs included is capped at 12.
*   **Email Sending**: Employs [[Gmail SMTP]] with `starttls` for secure email transmission, requiring a `GMAIL_APP_PASSWORD` to be set in the environment.
*   **CLI Flags for Control**:
    *   `--test`: Opens the rendered HTML email in a web browser for visual preview without sending.
    *   `--send`: Immediately sends the generated digest email.
    *   `--preview`: Prints the raw HTML content of the email to standard output.
    *   `--to`: Allows overriding the default recipient email address for testing or specific use cases.

### Integration with `batch_process_overnight.py`:
*   The `EmailDigestGenerator` is integrated as **Step 8** within the `[[batch_process_overnight.py` Enhancements: Job Description Parsing and CLI Flags]] script.
*   **Automatic Detection**: It intelligently detects the presence of `GMAIL_APP_PASSWORD` in the environment. If the password is not configured, the email sending step is silently skipped.
*   **Non-Fatal Execution**: Failures during the email sending process are designed to be non-fatal, meaning they will not cause the entire batch processing run to terminate, ensuring the robustness of the overnight jobs.

### Environment Setup:
To enable email digest functionality, the following [[Environment Variables]] must be configured, typically in a `.env` file:
```
GMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
DIGEST_EMAIL=your@email.com
```
`GMAIL_APP_PASSWORD` is an application-specific password generated from your Google Account settings, required for SMTP authentication. `DIGEST_EMAIL` specifies the sender's email address.

## Related

[[Career-Datacenter]],[[batch_process_overnight.py` Enhancements: Job Description Parsing and CLI Flags]],[[Automated Email Digest System]],[[Add SMTP Email Sending and Update Signature URLs]],[[Add .env.example and tests/conftest.py for Onboarding Polish in Career-Datacenter]],[[Jinja2]],[[Gmail SMTP]],[[Python]]
