---
title: Add SMTP Send Capability and Update Signature URLs
author: ai
created_at: 2026-04-13T18:10:01.959Z
last_ai_edit: 2026-04-13T18:10:01.959Z
last_human_edit: null
last_embedded_hash: cd7709ed575134e7
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-smtp-send-capability-and-update-signature-urls-74f04f.md]]"
tags:
  - smtp
  - email
  - follow-up
  - cli
  - career-datacenter
  - automation
  - python
  - url_management
---


# Add SMTP Send Capability and Update Signature URLs

This update introduces SMTP email sending functionality to the Career-Datacenter project, enabling automated follow-up emails. It includes new CLI flags for controlling email dispatch and updates critical personal URLs for resume, LinkedIn, and GitHub, successfully sending 19 non-Mews follow-ups.

## Key Concepts

SMTP Email Sending,CLI Flags,Automated Follow-up Emails,URL Management,Career-Datacenter Project

## Details

This commit (SHA: `a1e05d6`) by [[Rahil Singhi]] on March 4, 2026, to the `rahilsinghi/Career-Datacenter` repository implemented several key features:

*   **SMTP Email Functions:** Added `send_email()`, `send_followup()`, and `send_all_followups()` to facilitate email communication directly from the application.
*   **CLI Flags:** Introduced new command-line interface flags for managing follow-up email dispatch:
    *   `--send <id>`: To send a follow-up email to a specific company identified by its ID.
    *   `--send-all`: To initiate sending of all pending follow-up emails.
    *   `--exclude <company>`: To specify companies that should be excluded from the bulk `--send-all` operation.
*   **URL Updates:** The `RESUME_URL`, `LINKEDIN_URL`, and `GITHUB_URL` variables were updated to ensure they point to the correct, current links.
*   **Operational Success:** The feature was successfully tested, resulting in 19 out of 19 non-Mews follow-up emails being sent.

The commit was co-authored by [[Claude Opus 4.6]].

## Related

[[Career-Datacenter]],[[Rahil Singhi]],[[Claude Opus 4.6]]
