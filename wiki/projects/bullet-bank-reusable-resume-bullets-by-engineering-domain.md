---
title: "Bullet Bank: Reusable Resume Bullets by Engineering Domain"
author: ai
created_at: 2026-04-08T15:31:27.373Z
last_ai_edit: 2026-04-08T15:31:27.373Z
last_human_edit: null
last_embedded_hash: cc00806ca893c842
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/articles/bullet-bank.md]]"
tags:
  - resume
  - bullet-bank
  - ai-ml
  - backend
  - data-engineering
  - cloud
  - devops
  - seo
  - documentation
  - leadership
  - full-stack
  - mobile
  - research
  - nlp
  - llm
  - fastapi
  - flask
  - docker
  - bigquery
  - flutter
  - pytorch
  - xgboost
  - bert
  - diffusion-models
  - ats
  - career
---


# Bullet Bank: Reusable Resume Bullets by Engineering Domain

A structured collection of tagged, reusable resume bullets organized by engineering domain, each linked to a specific experience or project ID. Bullets are designed to be modular, quantified, and ATS-friendly for rapid resume tailoring. Coverage spans AI/ML, backend, data engineering, cloud infrastructure, SEO, documentation, leadership, and full-stack development.

## Key Concepts

- **Bullet IDs**: Each bullet has a unique ID (e.g., `bullet_ml_001`) for traceability
- **Evidence Linking**: Every bullet references a source experience or project ID (e.g., `exp_kismet_ai_data`, `proj_superplay`)
- **Tag System**: Bullets are tagged by technology and domain for filtered retrieval
- **Domain Categories**: AI/ML, Backend, Data Engineering, Cloud/DevOps, SEO, Docs, Leadership, Full-Stack, Research
- **Bullet Quality Checklist**: Standards ensuring strong action verbs, quantified impact, tech specificity, and ATS compliance
- **Resume Tailoring Workflow**: Instructions for selecting top 4–6 bullets per role family aligned to job description keywords

## Details

## AI/ML Engineering

| ID | Evidence | Tags | Bullet |
|----|----------|------|--------|
| `bullet_ml_001` | `exp_kismet_ai_data` | ml, llm, tool-calling, web-scraping | Built Playwright crawler + GPT-4o/Gemini tool-calling pipeline to convert hotel sites into schema.org/Hotel JSON-LD; captured >95% of required fields |
| `bullet_ml_002` | `proj_superplay` | ml, classification, etl, api | Trained and tuned an XGBoost classifier (grid-search CV) reaching 96% macro-F1 for mood prediction |
| `bullet_ml_003` | `proj_parser` | nlp, bert, self-healing | Integrated BERT-based semantic scoring to rank alternative parses and auto-recover when confidence <0.6 |
| `bullet_ml_004` | `proj_adversarial` | deep-learning, adversarial-training, pytorch | Integrated on-the-fly PGD example generation, restoring Top-1 accuracy to 61% on adversarial inputs |
| `bullet_ml_005` | `exp_krushal` | ml-integration, product, impact | Proposed innovative machine learning features to enhance app functionality for predicting livestock health issues; findings helped address critical veterinary challenges faced by over 250 paravets in field evaluations |
| `bullet_ml_006` | `proj_optireality` | research, vr, edge-ai, diffusion-models | Conducting research on efficient generative AI for AR/VR under Prof. Sai Qian Zhang's Vertically Integrated Project (OptiReality), focusing on reducing latency for edge-deployed models |
| `bullet_ml_007` | `proj_optireality` | research, vlm, gaze, literature-review | Surveyed state-of-the-art gaze VLM papers and explored novel approaches for real-time situational awareness in virtual reality environments |
| `bullet_ml_008` | `proj_optireality` | diffusion-models, model-compression, optimization | Currently researching text-based diffusion models with focus on model compression (quantization, pruning) and real-time inference optimization on resource-constrained AR/VR devices |
| `bullet_ml_009` | `proj_optireality` | hpc, pytorch, research | Utilizing NYU HPC resources and PyTorch for experimentation with generative AI algorithms including diffusion models and transformers |

---

## Backend Engineering / APIs

| ID | Evidence | Tags | Bullet |
|----|----------|------|--------|
| `bullet_backend_001` | `exp_kismet_ai_data` | fastapi, webhooks, async | Wrapped extraction in FastAPI with webhooks + signed asset delivery; added live progress tracking inside the sales portal |
| `bullet_backend_002` | `exp_kismet_ai_data` | api-integration, fallback-logic, mcp-tools | Integrated OHIP rates and implemented PMS-first / Amadeus-fallback rate lookup; shipped MCP tools (searchHotels, getHotelRates, bookHotelOffer) with schemas + TS handlers (NestJS, JSON-RPC over SSE) |
| `bullet_backend_003` | `exp_kismet_ai_data` | async, caching, optimization | Parallelized PMS adapters and Amadeus calls with asyncio; added Redis/local caching and persisted IDs to AlloyDB to cut geo-search duplication + latency |
| `bullet_backend_004` | `proj_superplay` | flask, api, docker | Exposed predictions at /predict with Flask; containerised via Docker for one-command launch (docker run -p 5000:5000 superplay-api) |
| `bullet_backend_005` | `proj_edgemesh` | distributed-systems, gateway, routing | Built an API gateway to dispatch inference to the best available node based on latency/health signals; included basic request tracing for debugging |

---

## Data Engineering / Analytics

| ID | Evidence | Tags | Bullet |
|----|----------|------|--------|
| `bullet_data_001` | `exp_kismet_tracking` | ga4, gtm, cross-domain-tracking | Implemented and validated cross-domain measurement across marketing site → booking-engine flows; standardized event + parameter conventions to preserve acquisition context through checkout |
| `bullet_data_002` | `exp_kismet_tracking` | bigquery, data-modeling, etl | Designed and maintained GA4-export query patterns and summary tables for performance reporting; improved reliability by aligning schemas across hotels with inconsistent event structures and parameter types |
| `bullet_data_003` | `exp_kismet_tracking` | attribution, session-stitching, data-quality | Built multi-signal attribution logic using UTM source/medium, landing URLs, referrer constraints, and session stitching; reduced misclassification risk in AI-Native vs AI-Search style traffic labels |
| `bullet_data_004` | `proj_superplay` | etl, api-integration, feature-engineering | Wrote Python ETL that pulls 5K+ tracks via Spotify & Genius APIs and stores them in a cleaned feature set (audio metrics + transformer-based lyric embeddings) |
| `bullet_data_005` | `exp_kismet_tracking` | api, analytics, data-contracts | Supported a dashboard API that computes hotel-level analytics and rollups from BigQuery; added guardrails and validation checks to prevent breaking changes from upstream GTM/BE scripts |

---

## Cloud / Infrastructure / DevOps

| ID | Evidence | Tags | Bullet |
|----|----------|------|--------|
| `bullet_infra_001` | `exp_kismet_ai_data` | cloud, deployment, migration | Deployed on AWS EC2/RDS then migrated containers to Cloud Run; used Supabase Postgres and designed the target AlloyDB schema |
| `bullet_infra_002` | `proj_superplay` | docker, containerization | Containerised via Docker for one-command launch (docker run -p 5000:5000 superplay-api) |
| `bullet_infra_003` | `proj_edgemesh` | distributed-systems, orchestration, health-checks | Implemented device discovery + heartbeat-based health, enabling dynamic membership and failover-aware routing across nodes |
| `bullet_infra_004` | `proj_edgemesh` | deployment, versioning | Added a model packaging + rollout flow to push versioned artifacts to devices and verify readiness before serving traffic |

---

## SEO / Structured Data

| ID | Evidence | Tags | Bullet |
|----|----------|------|--------|
| `bullet_seo_001` | `exp_kismet_ai_data` | seo, json-ld, schema-org, impact | Injected Hotel/FAQPage JSON-LD into NLWeb templates (48% lift in rich-result impressions) and authored internal runbooks for architecture + deployments |

---

## Documentation / Technical Writing

| ID | Evidence | Tags | Bullet |
|----|----------|------|--------|
| `bullet_docs_001` | `exp_kismet_ai_data` | documentation, runbooks, architecture | Authored internal runbooks for architecture + deployments |
| `bullet_docs_002` | `exp_kismet_tracking` | documentation, json-schema, sops | Produced system diagrams and runbooks for the tracker; maintained JSON Schemas, data dictionaries, and change logs; wrote incident notes/postmortems and SOPs for consent, retention, and webhook correlation |
| `bullet_docs_003` | `exp_krushal` | documentation, prd, api-specs, qa | Wrote product requirement documents, API specs for data sync, QA test plans, and step-by-step SOPs for field users; compiled a release-notes log and a troubleshooting guide that reduced onboarding time for new paravets and engineers |
| `bullet_docs_004` | `exp_aci` | documentation, manuals, protocol-guides | Created user and admin manuals, a data dictionary for weight/feeding metrics, and a Bluetooth protocol guide with setup and troubleshooting steps; maintained a README and change log that enabled smooth handover to the client's IT team |

---

## Leadership / Product / Impact

| ID | Evidence | Tags | Bullet |
|----|----------|------|--------|
| `bullet_leadership_001` | `exp_krushal` | leadership, team-lead, product, impact | Spearheaded a team of four in developing an innovative application feature for a subscription-based dairy startup, streamlining Paravet observation recording and enhancing veterinarian diagnostic accuracy by 30% for livestock health assessments |
| `bullet_product_001` | `exp_krushal` | ui-ux, user-testing, feedback | Created user-friendly interface designs for three different application modules, enhancing overall usability ratings by gathering direct feedback from paravets during the testing phase with over 50 participants |
| `bullet_impact_001` | `exp_aci` | mobile-dev, automation, impact | Implemented an innovative Flutter application for the poultry sector that streamlined weight tracking and reporting processes, enhancing data accuracy across 500+ livestock entries while optimizing production yields through effective usage of metrics |
| `bullet_impact_002` | `exp_aci` | bluetooth, integration, automation | Engineered an automated system to capture weights from Bluetooth scales directly within the app, which resulted in accurate metric recording for over 500 poultry samples per week while minimizing potential human error in logging processes |

---

## Full-Stack / Mobile

| ID | Evidence | Tags | Bullet |
|----|----------|------|--------|
| `bullet_fullstack_001` | `exp_aci` | flutter, mobile, app-development | Implemented an innovative Flutter application for the poultry sector that streamlined weight tracking and reporting processes, enhancing data accuracy across 500+ livestock entries |
| `bullet_fullstack_002` | `exp_krushal` | ui-ux, mobile, user-testing | Created user-friendly interface designs for three different application modules, enhancing overall usability ratings by gathering direct feedback from paravets during the testing phase with over 50 participants |
| `bullet_fullstack_003` | `proj_laundry_management` | java, web-dev, oop, database | Developed a Laundry Management System for the college laundry service, creating a web application using Servlets, JavaScript, MySQL and HTML with OOP principles |
| `bullet_fullstack_004` | `proj_laundry_management` | web-app, real-time, impact | Designed a robust web application enabling efficient resource allocation through real-time tracking of services utilized by over 200+ users monthly, leading to notable improvements in productivity metrics within just three months |

---

## Research / Academic

| ID | Evidence | Tags | Bullet |
|----|----------|------|--------|
| `bullet_research_001` | `proj_wind_energy_forecasting` | research, ml, neural-networks, publication | Developed innovative data-driven techniques that enhanced forecasting accuracy by generating predictive models with 95% precision; facilitated successful integration of wind energy into existing power grids |
| `bullet_research_002` | `proj_wind_energy_forecasting` | research, publication, renewable-energy | Co-authored and submitted a research paper for publication in the journal Electric Power Components and Systems, utilizing data-driven techniques to develop more accurate forecasting tools for renewable energy integration |

---

## Extracurricular / Leadership (Use Selectively)

| ID | Evidence | Tags | Bullet |
|----|----------|------|--------|
| `bullet_leadership_002` | `activity_comedy_club_president` | leadership, event-management, soft-skills | Led college comedy club as President, organizing fundraisers and inter-college stand-up festivals, managing event planning and coordination for college-wide entertainment programs |
| `bullet_technical_leadership_001` | `activity_hackers_asylum_organizer` | cybersecurity, ctf, event-organization | Organized inter-college Capture The Flag (CTF) event focused on cyber security and cipher decoding, coordinating technical challenges for computer science department's technical extravaganza |
| `bullet_event_management_001` | `activity_gaming_tournament_organizer` | event-management, coordination, scale | Organized inter-college gaming tournament with 100+ participating teams across BGMI and Valorant competitions, managing event logistics and large-scale coordination |

---

## Resume Tailoring Workflow

1. Identify the **role family** (AI/ML, Backend, Data, Full-Stack, etc.)
2. Pull the **top 4–6 bullets** from matching categories aligned with JD keywords
3. **Reorder** bullets — strongest/most relevant first
4. Ensure each bullet is **quantified** and starts with a strong action verb
5. Cross-reference with `data/experience.yaml` and `data/projects.yaml` for full context

---

## Bullet Quality Checklist

- [ ] Starts with strong action verb (Built, Designed, Implemented, Integrated, Engineered, etc.)
- [ ] Includes quantified impact (percentages, counts, scale)
- [ ] Specific about technologies and tools used
- [ ] Shows clear business or technical value
- [ ] ATS-friendly (no special characters, clear keywords)
- [ ] Concise (1–2 lines maximum)

## Related

- [[Experience Index]]
- [[Project Index]]
- [[Resume Tailoring Guide]]
- [[AI/ML Engineering Skills]]
- [[Backend Engineering Skills]]
- [[Data Engineering Skills]]
- [[Cloud and DevOps Skills]]
- [[Technical Documentation Practices]]
- [[XGBoost Classification]]
- [[BERT NLP Models]]
- [[Adversarial Training]]
- [[Diffusion Models]]
- [[FastAPI]]
- [[NestJS]]
- [[BigQuery Analytics]]
- [[Flutter Mobile Development]]
- [[Wind Energy Forecasting Research]]
- [[OptiReality VR Project]]
- [[Kismet AI Data Pipeline]]
- [[Superplay Project]]
- [[EdgeMesh Project]]
