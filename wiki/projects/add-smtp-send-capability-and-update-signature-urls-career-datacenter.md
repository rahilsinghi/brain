---
title: Add SMTP Send Capability and Update Signature URLs (Career-Datacenter)
author: ai
created_at: 2026-04-12T17:11:49.745Z
last_ai_edit: 2026-04-12T17:11:49.745Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-smtp-send-capability-and-update-signature-urls-74f04f.md]]"
tags:
  - smtp
  - email
  - automation
  - cli
  - career-datacenter
  - follow-up
  - signature urls
  - workflow
---

# Add SMTP Send Capability and Update Signature URLs (Career-Datacenter)

This commit introduced SMTP email sending capabilities to the Career-Datacenter project, allowing for automated follow-up emails. It also added new CLI flags to control email dispatch and updated essential signature URLs like resume, LinkedIn, and GitHub links.

## Key Concepts

[[SMTP]],[[Email Automation]],[[CLI]],[[Follow-up Emails]],Signature URLs

## Details

This commit to the `rahilsinghi/Career-Datacenter` repository (SHA: `a1e05d6`) implemented robust email sending functionality via SMTP. Key additions include:

*   **Email Sending Functions**: New functions `send_email()`, `send_followup()`, and `send_all_followups()` were introduced to programmatically send emails, particularly for job application follow-ups.
*   **CLI Flags for Control**: To manage the email sending process, several new command-line interface (CLI) flags were added:
    *   `--send <id>`: To send a follow-up email to a specific company identified by its ID.
    *   `--send-all`: To send follow-up emails to all eligible companies.
    *   `--exclude <company>`: To exclude a specific company from the `--send-all` operation.
*   **Signature URL Updates**: The `RESUME_URL`, `LINKEDIN_URL`, and `GITHUB_URL` variables were updated to ensure they point to the correct and most current links, which are crucial for professional correspondence.

Following these changes, the system successfully sent 19 out of 19 non-Mews follow-up emails, demonstrating the immediate utility of the new feature.

## Related

[[Career-Datacenter]],[[SMTP Email Sending and Update Signature URLs]],[[Automated Email Digest System]],[[CLI Entry Point with Quiet Mode and Report Formatting]],[[Add SMTP Email Sending and Update Signature URLs]]
