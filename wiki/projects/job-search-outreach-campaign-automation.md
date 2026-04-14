---
title: Job Search Outreach Campaign Automation
author: ai
created_at: 2026-04-13T22:30:27.047Z
last_ai_edit: 2026-04-13T22:30:27.047Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/career-datacenter/career-datacenter-community-18.md]]"
tags:
  - code-community
  - career-datacenter
  - graphify
  - email-automation
  - outreach
  - python-script
aliases:
  - Community 18
---

# Job Search Outreach Campaign Automation

This code community is centered around a Python script designed to automate email outreach campaigns, specifically for job search activities. It streamlines the process of generating, drafting, sending, and logging personalized emails to potential employers or contacts.

## Key Concepts

Email Automation,Outreach Campaign Management,Job Search Efficiency,Python Scripting for Communication,Configuration Management (Environment Variables),CSV Logging

## Details

The core of this community is the `wave1_outreach.py` script located in the `/scripts` directory of the [[career-datacenter]] repository. This script serves as an automated engine for conducting outreach during a job search campaign. It integrates several functional components:

- **`wave1_outreach_load_env`**: Responsible for securely loading environment variables, which are crucial for configuring email credentials and other sensitive information required for the outreach process.
- **`wave1_outreach_body_to_html`**: This function transforms the raw email body content into a formatted HTML string. It [[calls]] `wave1_outreach_build_msg` as part of its internal process.
- **`wave1_outreach_build_msg`**: Constructs the complete email message, including the HTML body, subject line, recipient, and sender details. This function plays a pivotal role by subsequently [[calls]] `wave1_outreach_create_draft` to prepare an email draft and `wave1_outreach_send_email` to dispatch the message.
- **`wave1_outreach_create_draft`**: Interfaces with an email service to create a draft of the generated email. It is involved in the execution flow of `wave1_outreach_main` and has an associated [[wave1_outreach_rationale_153|rationale]].
- **`wave1_outreach_send_email`**: Executes the actual sending of the prepared email through an email service. Like `wave1_outreach_create_draft`, it is integrated into `wave1_outreach_main` and references a [[wave1_outreach_rationale_170|rationale]].
- **`wave1_outreach_log_to_csv`**: Records details of each outreach attempt (e.g., recipient, timestamp, status) into a CSV file. This logging is crucial for tracking campaign performance and follow-ups. It [[calls]] `wave1_outreach_main` as part of its operation.
- **`wave1_outreach_main`**: Acts as the orchestrator for the entire outreach process, coordinating the execution of the other functions to ensure a complete and automated workflow.

This script significantly reduces manual effort in managing and tracking large volumes of personalized job search correspondence.

## Related

[[career-datacenter]],[[SMTP Email Sending and Update Signature URLs]],[[CLAUDE.md Agent Instructions and Hospitality Outreach Playbook]]
