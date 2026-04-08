---
title: brain — Git Activity
status: current
author: ai
source_type: git-commits
created_at: 2026-04-08T23:08:04.962Z
updated_at: 2026-04-08T23:08:04.962Z
tags:
  - git-activity
  - brain
category: projects
last_embedded_hash: 8974af074daccfb9
---


# brain — Git Activity

## Summary

The `rahilsinghi/brain` repository is a personal knowledge management daemon that compiles, embeds, and queries a structured wiki vault using the Claude API and local vector search. Built in a single week of intensive development, it ingests content from multiple sources (GitHub, Gmail, MarkPush, CSV/YAML career data), processes markdown articles through a lint/heal pipeline, and exposes the knowledge base via both an HTTP API and a Telegram bot interface. The system is designed to power [[rahil-singhi|Rahil Singhi's]] career-datacenter, connecting articles about projects, job search activity, interview prep, and professional positioning into a queryable semantic index.

---

## Key Developments

### Phase 1 — Core Vault Infrastructure
The initial scaffold established the foundational daemon architecture on April 3. This included a config loader with YAML and `.env` support, frontmatter read/write utilities, a token guard for document classification by word count, and a dead letter queue to quarantine files after three failed retries. A Chokidar file watcher drives a parse-then-compile pipeline, with the single-pass compiler calling the Claude API and returning structured JSON output. Pre-heal git snapshots provide undo capability. Brutalist visual templates (Marp, matplotlib, Mermaid) and a `CLAUDE.md` integration guide were also added at this stage.

### Phase 2 — Vector Search and Lint/Heal
April 4 introduced the semantic layer. A LanceDB vector store with upsert, delete, and search operations was paired with a local embedder using `nomic-embed-text` via `transformers.js`, enabling a hash-based embedding sync pipeline. A query synthesis module combines vector search results with Claude API calls. The lint/heal pipeline scans for broken links, orphaned notes, and formatting issues, then proposes conflict resolutions and contradiction flags through a three-phase runner with cost controls. A connector module discovers cross-references and writes daily summaries, wired into a nightly cron alongside re-embedding on file change. Articles relevant to this layer include [[proj-parser]] and [[brain-repo-phase-4-telegram-test-result]].

### Phase 3 — External Source Connectors
April 7 added a full source orchestration layer with deduplication, error isolation, and sync-state management backed by atomic JSON writes. Individual connectors were built for GitHub (event parsing, star threshold filtering), Gmail (plaintext/HTML extraction, signature stripping), and MarkPush (cursor-based filtering). An hourly GitHub cron was wired into the daemon. Phase 2 hardening also landed here, covering partial embed safety and healer tests.

### Phase 4 — Seed Pipeline (Career Datacenter)
April 8 delivered the seed system that populated the vault with structured career data. Zod schemas cover all YAML/CSV file types in the career-datacenter, with loaders and transforms for profile, education, experience (with metrics merge), projects, skills, companies, positioning, stories, answers, and job-search tracking. A `[[ref:id]]` link resolution pass connects seeded articles to existing wiki nodes. After seeding, 12 raw articles were compiled and all 97 wiki articles were embedded. Connected articles seeded by this pipeline include [[bullet-bank-reusable-resume-bullets-by-engineering-domain]], [[cover-letter-core-paragraphs]], [[easy-apply-answers]], [[skills-inventory]], [[role-families]], [[hospitality-positioning]], [[star-stories]], [[decision-framework-what-to-build-first-for-job-search-automation]], and project pages such as [[proj-wind-energy-forecasting]], [[proj-edgemesh]], [[proj-adversarial]], [[proj-laundry-management]], [[proj-optireality]], [[proj-marketpulse-ai]], [[proj-imessage-scheduler]], and [[proj-superplay]].

### Phase 5 — HTTP API Layer
Also on April 8, a Fastify HTTP server was embedded in the daemon with three routes: `GET /health` (status, uptime, article counts), `POST /ingest` (fire-and-forget raw content drops), and `POST /synthesise` (query with timeout and error handling). Refactors extracted `ingestContent()` and `getHealthStats()` into standalone core modules for testability. Graceful drain on shutdown was added alongside the existing daemon lifecycle.

### Phase 6 — Telegram Bot Interface
The final feature set on April 8 wired a Telegram bot (using the Grammy library) directly into the daemon boot and shutdown sequence. Handlers support knowledge ingest and natural-language queries, with a `truncateAtSentence()` helper managing message length. This provides a conversational interface to the full vault, relevant to content like [[mechanize-rl-environment-company-for-frontier-ai-labs]] and interview prep notes including [[spiderrock-interview-preparation-junior-quantitative-developer-role]], [[stardrift-yc-s24-founding-software-engineer-interview-prep]], [[maison-call-interview-preparation-brief-fredrik-sjoberg-march-2026]], [[stardrift-founding-swe-interview-leila-clark-call-prep]], [[rogers-leo-mews-meeting-prep-march-3-2026]], [[harrison-qian-builder-profile-meeting-prep]], [[meeting-prep-brenton-andersen-toolhouse-creative-writing-app]], and [[maison-negotiation-logistics-notes-rahil-offer-2026]].

---

## Timeline

### April 3, 2026
Full Phase 1 scaffold in a single day: vault structure, shared types, brutalist visual templates, `CLAUDE.md` for Claude Code integration, config loader, frontmatter utilities, token guard, dead letter queue, parser middleware, single-pass compiler, git snapshot pre-heal, compile queue, file watcher, daemon entry point, and Phase 2 dependency installation (LanceDB, transformers.js, apache-arrow). AST chunker using unified/remark also landed same day.

### April 4, 2026
Phase 2 completion: LanceDB vector store, local embedder, hash-based sync pipeline, query synthesis, lint scanner, healer with conflict rules, cross-reference connector, lint/heal runner with cost controls, wiki watcher re-embedding, nightly cron, and `CLAUDE.md` update with remaining work breakdown.

### April 7, 2026
Phase 3 completion: source orchestrator, sync state store, MarkPush connector, GitHub connector, Gmail connector, sources CLI, GitHub hourly cron in daemon, spec-review fixes, Phase 2 hardening (partial embed safety, `discoverConnections` wiring, healer tests), and project status documentation update.

### April 8, 2026
Heaviest single day: `.worktrees/` gitignore entry, seed pipeline (Zod schemas, YAML/CSV loaders, all career transforms, runner, CLI), real career-datacenter seed run (97 articles embedded, 12 compiled), Fastify API layer (`/health`, `/ingest`, `/synthesise`, server factory, daemon integration, refactors), and Telegram bot (config, Grammy dependency, message handlers, daemon integration, full documentation). Total: approximately 30 commits landing the seed, API, and Telegram phases simultaneously.
