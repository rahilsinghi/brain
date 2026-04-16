---
status: failed
source_type: graphify-community
repo: maison-agent
community_id: 42
ingested_at: 2026-04-15T19:59:44.138Z
parsed_at: 2026-04-15T19:59:44.138Z
compiled_to: "[[Email Sending and Logging Utility]]"
processed_at: 2026-04-15T20:04:08.985Z
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca6AP2WjY2BWwg7nNZy2Z"}
compile_progress: null
---





# maison-agent — Community 42

## Files in this cluster

- `/Users/rahilsinghi/Desktop/maison-agent/packages/email-utils/src/email-sender.ts` — 7 connections
- `/Users/rahilsinghi/Desktop/maison-agent/packages/email-utils/src/email-sender.ts` — 3 connections
- `/Users/rahilsinghi/Desktop/maison-agent/packages/email-utils/src/email-sender.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/packages/email-utils/src/email-sender.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/packages/email-utils/src/email-sender.ts` — 2 connections
- `/Users/rahilsinghi/Desktop/maison-agent/packages/email-utils/src/email-sender.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/packages/email-utils/src/email-sender.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/packages/email-utils/src/email-sender.ts` — 1 connection
- `/Users/rahilsinghi/Desktop/maison-agent/packages/email-utils/test/email-sender.test.ts` — 1 connection

## Internal relationships

- `email_sender_test` → `email_sender` (imports_from)
- `email_sender` → `email_sender_emailsender` (contains)
- `email_sender_emailsender` → `email_sender_emailsender_setsesclient` (method)
- `email_sender_emailsender` → `email_sender_emailsender_setdatabasepool` (method)
- `email_sender_emailsender` → `email_sender_emailsender_setfromaddress` (method)
- `email_sender_emailsender` → `email_sender_emailsender_send` (method)
- `email_sender_emailsender` → `email_sender_emailsender_sendraw` (method)
- `email_sender_emailsender` → `email_sender_emailsender_logemail` (method)
- `email_sender_emailsender_send` → `email_sender_emailsender_logemail` (calls)
- `email_sender_emailsender_send` → `email_sender_emailsender_sendraw` (calls)

## External dependencies

_none_