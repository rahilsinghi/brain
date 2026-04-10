---
title: SMTP Email Capability and Signature URL Updates in Career-Datacenter
author: ai
created_at: 2026-04-10T02:21:29.246Z
last_ai_edit: 2026-04-10T02:21:29.246Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-smtp-send-capability-and-update-signature-urls-74f04f.md]]"
tags:
  - smtp
  - email
  - automation
  - cli
  - follow-up
  - career
  - job-search
  - python
  - batch-send
  - signature
---

# SMTP Email Capability and Signature URL Updates in Career-Datacenter

This commit adds SMTP-based email sending functionality to the Career-Datacenter project, introducing new functions and CLI flags for sending follow-up emails. It also updates profile/portfolio URLs embedded in email signatures, with a successful batch send of 19 follow-up emails excluding one company.

## Key Concepts

- **SMTP Email Sending**: Programmatic email dispatch using the SMTP protocol via new helper functions
- **Follow-up Automation**: Batch sending of follow-up emails to job application contacts
- **CLI Flags**: Command-line interface extensions for triggering send operations and applying exclusions
- **Signature URLs**: Dynamic profile links (Resume, LinkedIn, GitHub) embedded in outgoing emails
- **Exclusion Filtering**: Ability to exclude specific companies (e.g., Mews) from batch sends

## Details

## Overview

Commit `a1e05d6` to the `rahilsinghi/Career-Datacenter` repository introduces outbound email capabilities via SMTP, enabling automated follow-up emails to be sent directly from the job application tracking system.

## New Functions

| Function | Description |
|---|---|
| `send_email()` | Core function to send a single email via SMTP |
| `send_followup()` | Sends a follow-up email for a specific application by ID |
| `send_all_followups()` | Iterates over all eligible applications and sends follow-ups in bulk |

## New CLI Flags

- `--send <id>`: Send a follow-up email for a specific application by its ID
- `--send-all`: Trigger bulk follow-up sending for all eligible entries
- `--exclude <company>`: Exclude a named company from the send operation

## Signature URL Updates

The following profile URLs were corrected and updated in the email signature template:
- `RESUME_URL`: Updated to correct resume link
- `LINKEDIN_URL`: Updated to correct LinkedIn profile
- `GITHUB_URL`: Updated to correct GitHub profile

## Results

- Successfully sent **19 out of 19** follow-up emails
- Mews was excluded from the batch send via the `--exclude` flag

## Change Statistics

- **Files changed:** 1
- **Lines added:** +102
- **Lines deleted:** -20
- **Net change:** +82 lines

## Authorship

Authored by Rahil Singhi with co-authorship from Claude Opus 4.6 on 2026-03-04.

## Related

- [[Career-Datacenter Project]]
- [[Job Application Tracking]]
- [[Email Automation]]
- [[SMTP Configuration]]
- [[CLI Tool Development]]
- [[Follow-up Email Strategy]]
