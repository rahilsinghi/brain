---
title: Automated Email Digest System
author: ai
created_at: 2026-04-10T17:38:02.280Z
last_ai_edit: 2026-04-10T17:38:02.280Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-emaildigestgenerator-gmail-sender-wire-int-873a60.md]]"
tags:
  - email digest
  - automation
  - python
  - jinja2
  - smtp
  - gmail
  - batch processing
  - career-datacenter
  - cli
  - feature
---

# Automated Email Digest System

This entry details the implementation of an automated email digest generator within the Career-Datacenter project. It describes a Python utility that creates and sends job digest emails, grouping opportunities by tier, using Jinja2 for templating and Gmail's SMTP for delivery.
The system is integrated into the overnight batch processing pipeline, designed for resilience and configurable via environment variables.

## Key Concepts

Email Digest Generation,Jinja2 Templating,SMTP Email Sending (Gmail),Batch Processing Integration,Environment Variables for Configuration,Command-Line Interface (CLI)

## Details

The `EmailDigestGenerator` system was introduced to automate the compilation and delivery of job opportunity digests, streamlining the process of reviewing relevant job postings.

### Core Component: `cli/email_digest.py`
This Python script defines the central logic for email digest generation:
*   **Class:** The `EmailDigestGenerator` class orchestrates the creation and sending of the digest.
*   **Templating:** It leverages `Jinja2` to dynamically render the email content from the `templates/email_digest.html` file, ensuring a structured and visually appealing output.
*   **Job Grouping:** Jobs are intelligently categorized into two tiers based on their scores:
    *   **Tier 1:** Includes jobs with a score of 9.0 or higher.
    *   **Tier 2:** Includes jobs with a score between 8.0 and 8.9.
    *   The total number of jobs included in a single digest is capped at 12 to maintain brevity and focus.
*   **Email Sending:** The system utilizes Gmail's SMTP server via `starttls` for secure email transmission. Authentication is handled by reading the `GMAIL_APP_PASSWORD` from environment variables, promoting secure credential management.
*   **CLI Options:** The script provides several command-line arguments for development, testing, and manual triggering:
    *   `--test`: Opens the rendered HTML digest in a web browser for immediate visual inspection.
    *   `--send`: Directly sends the generated digest email to the configured recipient.
    *   `--preview`: Prints the full HTML content of the digest to standard output, useful for debugging.
    *   `--to <email>`: Allows overriding the default recipient email address for a specific run.

### Integration with `batch_process_overnight.py`
*   The email digest generation and sending process is seamlessly integrated as **Step 8** within the existing `batch_process_overnight.py` script.
*   **Error Handling:** The integration is designed for robustness. If the `GMAIL_APP_PASSWORD` environment variable is not configured, the email sending step is silently skipped without interrupting the batch process. Similarly, any email sending failure is treated as non-fatal, ensuring the overall batch processing run completes successfully.

### Configuration (`.env`)
To enable and configure the email digest system, the following environment variables must be defined in the project's `.env` file:
*   `GMAIL_APP_PASSWORD`: An application-specific password obtained from Gmail (e.g., `xxxx-xxxx-xxxx-xxxx`).
*   `DIGEST_EMAIL`: The target email address where the digest will be sent (e.g., `your@email.com`).

### Development Details
*   **Repository:** `rahilsinghi/Career-Datacenter`
*   **Commit SHA:** `5b61407`
*   **Date:** `2026-02-17T21:59:21Z`
*   **Author:** Rahil Singhi (Co-Authored-By: Claude Sonnet 4.5)
*   **Changes:** Introduced in 2 files with +247 additions and 0 deletions.

## Related

[[Batch Processing]],[[Email Automation]],[[Jinja2]],[[SMTP]],[[Environment Variables]],[[Career-Datacenter Project]]
