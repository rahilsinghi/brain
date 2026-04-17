---
title: Add SMTP Email Sending and Update Signature URLs
author: ai
created_at: 2026-04-10T21:07:22.318Z
last_ai_edit: 2026-04-10T21:07:22.318Z
last_human_edit: null
last_embedded_hash: 939fd4740cc267a4
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-smtp-send-capability-and-update-signature-urls-74f04f.md]]"
tags:
  - smtp
  - email
  - automation
  - cli
  - urls
  - career-datacenter
  - update
  - feature
  - co-authored
---


# Add SMTP Email Sending and Update Signature URLs

This commit introduces new SMTP-based email sending capabilities, allowing for individual or bulk follow-up email dispatch. It also updates critical signature URLs within the application, ensuring all external links are correct. The new features were successfully utilized to send 19 follow-up emails.

## Key Concepts

- SMTP Integration,- Email Automation,- Command Line Interface (CLI),- URL Configuration,- Version Control

## Details

This significant commit, identified by `SHA a1e05d6` in the `rahilsinghi/Career-Datacenter` repository, focuses on enhancing the application's email communication functionalities and maintaining accurate external links.

### Key Changes Implemented:

*   **SMTP Email Sending Capabilities:**
    *   Introduced `send_email()` for general email dispatch.
    *   Added `send_followup()` specifically designed for sending individual follow-up emails.
    *   Implemented `send_all_followups()` to automate the bulk sending of pending follow-up emails.
    *   These new functions leverage SMTP for robust and reliable email delivery.

*   **Command Line Interface (CLI) Enhancements:**
    *   A new CLI flag, `--send <id>`, was added to allow users to trigger the sending of a specific email by its identifier.
    *   The `--send-all` flag was introduced to initiate the bulk sending of all pending follow-up emails.
    *   A `--exclude <company>` flag provides flexibility to omit specific companies from bulk email operations.

*   **URL Configuration Updates:**
    *   The `RESUME_URL` was corrected to point to the most current version of the resume.
    *   The `LINKEDIN_URL` was updated to reflect the accurate LinkedIn profile link.
    *   The `GITHUB_URL` was revised to ensure it points to the correct GitHub profile.

### Outcome:

*   Following the implementation, the system successfully sent 19 out of 19 non-Mews follow-up emails, validating the new email sending functionality.

### Technical Details:

*   **Author:** Rahil Singhi (Co-Authored by Claude Opus 4.6)
*   **Date:** 2026-03-04T22:10:55Z
*   **Files Changed:** 1
*   **Code Impact:** +102 additions, -20 deletions

## Related

[[Email Automation]],[[Command Line Interface]],[[Version Control System]],[[Rahil Singhi]],[[Career Datacenter Project]]
