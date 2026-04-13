---
title: "Karen Project: Service Integrations and PDF QR Code Generation (ffd88e0)"
author: ai
created_at: 2026-04-11T00:35:43.549Z
last_ai_edit: 2026-04-11T00:35:43.549Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-feat-services-add-research-slack-calendar-fedex-services-5ccefc.md]]"
tags:
  - karen
  - services
  - integration
  - pdf
  - qr code
  - google calendar
  - slack
  - fedex
  - osint
  - commit
---

# Karen Project: Service Integrations and PDF QR Code Generation (ffd88e0)

This commit to the [[Karen Project]] introduces new service integrations for research, Slack, Google Calendar, and FedEx, completing tasks 2-5 of the escalation ladder v2. It also adds a PDF generation feature that embeds a QR code, linking to the project's open matters portal.

## Key Concepts

OSINT lookup,Slack Web API,Google Calendar API,FedEx API,QR code generation,Service accounts

## Details

This feature commit (`ffd88e0`) to the `rahilsinghi/karen` repository implements several key services and a PDF enhancement, addressing tasks 2-5 of the 'escalation ladder v2':

*   `research_service.py`: Provides pre-cached Open-Source Intelligence (OSINT) lookups, designed with timed animation steps for user feedback.
*   `slack_service.py`: Enables programmatic posting and deletion of messages via the [[Slack Web API]] (`chat.postMessage`/`chat.delete`).
*   `calendar_service.py`: Facilitates the creation and deletion of events within [[Google Calendar]] using a dedicated service account.
*   `fedex_service.py`: Integrates with the [[FedEx API]] to provide sandbox rate quotes, ensuring a fallback value of $28.40 to prevent 'unavailable' responses.
*   `pdf_service.py`: Implements [[QR code generation]] functionality using the `qrcode` library, embedding base64 PNG images directly into formal letters.

The `formal_letter.html` template was updated to include a dedicated QR section, with the QR code linking to `rahilsinghi.com/open-matters`.

New Python dependencies introduced in `requirements.txt` to support these features include `qrcode`, `pillow`, `google-api-python-client`, and `google-auth`.

## Related

[[Karen Project]],[[Configurable Google Calendar ID for Karen Project]],[[Open Matters]],[[Add Open Matter for Bharath Mahesh Gera (Karen Project)]],[[Add Open Matter for Rahil Singhi]]
