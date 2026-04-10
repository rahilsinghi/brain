---
title: Add SMTP Send Capability and Update Signature URLs
author: ai
created_at: 2026-04-10T02:22:26.088Z
last_ai_edit: 2026-04-10T02:22:26.088Z
last_human_edit: null
last_embedded_hash: aa6ade824835d52b
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-smtp-send-capability-and-update-signature-urls-74f04f.md]]"
tags:
  - smtp
  - email
  - automation
  - cli
  - follow-up
  - job-search
  - career-datacenter
  - python
  - networking
  - commit
---


# Add SMTP Send Capability and Update Signature URLs

This commit introduces SMTP-based email sending functionality to the Career-Datacenter project, enabling automated follow-up emails to job application contacts. New CLI flags provide granular control over sending behavior, including the ability to exclude specific companies. The update also corrects signature URLs for resume, LinkedIn, and GitHub profiles.

## Key Concepts

- **SMTP Email Sending**: Integration of Simple Mail Transfer Protocol to programmatically send emails from the application
- **Follow-up Automation**: Functions `send_email()`, `send_followup()`, and `send_all_followups()` to automate outreach to job contacts
- **CLI Flag Expansion**: New command-line interface flags `--send <id>`, `--send-all`, and `--exclude <company>` for flexible email dispatch control
- **Signature URL Management**: Centralized configuration of profile links (`RESUME_URL`, `LINKEDIN_URL`, `GITHUB_URL`) embedded in email signatures
- **Company Exclusion Logic**: Ability to exclude specific companies (e.g., Mews) from bulk send operations

## Details

## Overview

Commit `a1e05d6` to the `rahilsinghi/Career-Datacenter` repository adds SMTP email sending capability and updates signature-related URLs within the job application tracking system.

## Changes Made

### New Functions
- `send_email()` — Core function handling SMTP connection and message dispatch
- `send_followup(id)` — Sends a follow-up email for a specific application by ID
- `send_all_followups()` — Iterates over all tracked applications and sends follow-ups in bulk

### New CLI Flags
| Flag | Description |
|---|---|
| `--send <id>` | Send a follow-up for a specific application by ID |
| `--send-all` | Send follow-ups to all tracked contacts |
| `--exclude <company>` | Exclude a named company from bulk send operations |

### Signature URL Updates
- `RESUME_URL` — Updated to correct resume link
- `LINKEDIN_URL` — Updated to correct LinkedIn profile link
- `GITHUB_URL` — Updated to correct GitHub profile link

## Results
- Successfully sent **19 out of 19** follow-up emails, excluding Mews

## File Changes
- **Files changed:** 1
- **Additions:** +102 lines
- **Deletions:** -20 lines

## Authorship
- **Author:** Rahil Singhi
- **Co-Author:** Claude Opus 4.6
- **Date:** 2026-03-04

## Related

- [[Career-Datacenter Project]]
- [[Job Application Tracking]]
- [[SMTP Email Integration]]
- [[CLI Tool Development]]
- [[Follow-up Email Automation]]
- [[Email Signature Configuration]]
