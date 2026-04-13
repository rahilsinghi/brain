---
title: Add SMTP Email Sending and Update Signature URLs
author: ai
created_at: 2026-04-11T00:08:36.517Z
last_ai_edit: 2026-04-11T00:08:36.517Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-smtp-send-capability-and-update-signature-urls-74f04f.md]]"
tags:
  - career-datacenter
  - smtp
  - email automation
  - cli
  - follow-ups
  - feature
  - claude-opus
---

# Add SMTP Email Sending and Update Signature URLs

This update to the Career-Datacenter repository introduces SMTP capabilities for sending job application follow-up emails. It includes new CLI flags for managing email dispatch and updates critical signature URLs within the system. The feature successfully sent 19 out of 19 targeted follow-up emails.

## Key Concepts

SMTP,Email Automation,CLI Flags,Follow-up Emails,URL Management

## Details

This commit (`a1e05d6`) in the [[Career-Datacenter]] repository, authored by [[Rahil Singhi]] and co-authored by Claude Opus 4.6 on 2026-03-04, significantly enhances the system's email functionality. Key changes include:

- **SMTP Email Sending**: Implementation of `send_email()`, `send_followup()`, and `send_all_followups()` functions, leveraging SMTP for reliable email dispatch.
- **New CLI Flags**: Introduction of command-line interface flags to control email sending behavior:
    - `--send <id>`: To send a follow-up for a specific job application ID.
    - `--send-all`: To dispatch follow-ups for all pending applications.
    - `--exclude <company>`: To omit specific companies from the `send-all` operation.
- **URL Updates**: The `RESUME_URL`, `LINKEDIN_URL`, and `GITHUB_URL` variables were updated to ensure they point to the correct and current links in outgoing communications.

This update involved 1 file change, adding 102 lines and deleting 20. A successful test run confirmed that 19 out of 19 non-Mews related follow-up emails were sent successfully, validating the new email automation capabilities.

## Related

[[Career-Datacenter]],[[Automated Email Digest System]],[[Automated Job Application Workflow Script (apply_workflow.py)]],[[Add SMTP Email Sending and Update Signature URLs]],[[CLAUDE.md]]
