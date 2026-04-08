---
status: pending
source_type: file_drop
source_id: career-datacenter/docs/bullet_bank.md
ingested_at: 2026-04-08T14:25:52.479Z
parsed_at: 2026-04-08T14:25:52.479Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# Bullet Bank

Reusable, tagged bullets organized by category. Each bullet links to evidence (experience/project IDs).

---

## AI/ML Engineering

**ID:** `bullet_ml_001`
**Evidence:** `exp_kismet_ai_data`
**Tags:** `ml`, `llm`, `tool-calling`, `web-scraping`
**Bullet:** "Built Playwright crawler + GPT-4o/Gemini tool-calling pipeline to convert hotel sites into schema.org/Hotel JSON-LD; captured >95% of required fields"

**ID:** `bullet_ml_002`
**Evidence:** `proj_superplay`
**Tags:** `ml`, `classification`, `etl`, `api`
**Bullet:** "Trained and tuned an XGBoost classifier (grid-search CV) reaching 96% macro-F1 for mood prediction"

**ID:** `bullet_ml_003`
**Evidence:** `proj_parser`
**Tags:** `nlp`, `bert`, `self-healing`
**Bullet:** "Integrated BERT-based semantic scoring to rank alternative parses and auto-recover when confidence <0.6"

**ID:** `bullet_ml_004`
**Evidence:** `proj_adversarial`
**Tags:** `deep-learning`, `adversarial-training`, `pytorch`
**Bullet:** "Integrated on-the-fly PGD example generation, restoring Top-1 accuracy to 61% on adversarial inputs"

**ID:** `bullet_ml_005`
**Evidence:** `exp_krushal`
**Tags:** `ml-integration`, `product`, `impact`
**Bullet:** "Proposed innovative machine learning features to enhance app functionality for predicting livestock health issues; findings helped address critical veterinary challenges faced by over 250 paravets in field evaluations"

**ID:** `bullet_ml_006`
**Evidence:** `proj_optireality`
**Tags:** `research`, `vr`, `edge-ai`, `diffusion-models`
**Bullet:** "Conducting research on efficient generative AI for AR/VR under Prof. Sai Qian Zhang's Vertically Integrated Project (OptiReality), focusing on reducing latency for edge-deployed models"

**ID:** `bullet_ml_007`
**Evidence:** `proj_optireality`
**Tags:** `research`, `vlm`, `gaze`, `literature-review`
**Bullet:** "Surveyed state-of-the-art gaze VLM papers and explored novel approaches for real-time situational awareness in virtual reality environments"

**ID:** `bullet_ml_008`
**Evidence:** `proj_optireality`
**Tags:** `diffusion-models`, `model-compression`, `optimization`
**Bullet:** "Currently researching text-based diffusion models with focus on model compression (quantization, pruning) and real-time inference optimization on resource-constrained AR/VR devices"

**ID:** `bullet_ml_009`
**Evidence:** `proj_optireality`
**Tags:** `hpc`, `pytorch`, `research`
**Bullet:** "Utilizing NYU HPC resources and PyTorch for experimentation with generative AI algorithms including diffusion models and transformers"

---

## Backend Engineering / APIs

**ID:** `bullet_backend_001`
**Evidence:** `exp_kismet_ai_data`
**Tags:** `fastapi`, `webhooks`, `async`
**Bullet:** "Wrapped extraction in FastAPI with webhooks + signed asset delivery; added live progress tracking inside the sales portal"

**ID:** `bullet_backend_002`
**Evidence:** `exp_kismet_ai_data`
**Tags:** `api-integration`, `fallback-logic`, `mcp-tools`
**Bullet:** "Integrated OHIP rates and implemented PMS-first / Amadeus-fallback rate lookup; shipped MCP tools (searchHotels, getHotelRates, bookHotelOffer) with schemas + TS handlers (NestJS, JSON-RPC over SSE)"

**ID:** `bullet_backend_003`
**Evidence:** `exp_kismet_ai_data`
**Tags:** `async`, `caching`, `optimization`
**Bullet:** "Parallelized PMS adapters and Amadeus calls with asyncio; added Redis/local caching and persisted IDs to AlloyDB to cut geo-search duplication + latency"

**ID:** `bullet_backend_004`
**Evidence:** `proj_superplay`
**Tags:** `flask`, `api`, `docker`
**Bullet:** "Exposed predictions at /predict with Flask; containerised via Docker for one-command launch (docker run -p 5000:5000 superplay-api)"

**ID:** `bullet_backend_005`
**Evidence:** `proj_edgemesh`
**Tags:** `distributed-systems`, `gateway`, `routing`
**Bullet:** "Built an API gateway to dispatch inference to the best available node based on latency/health signals; included basic request tracing for debugging"

---

## Data Engineering / Analytics

**ID:** `bullet_data_001`
**Evidence:** `exp_kismet_tracking`
**Tags:** `ga4`, `gtm`, `cross-domain-tracking`
**Bullet:** "Implemented and validated cross-domain measurement across marketing site → booking-engine flows; standardized event + parameter conventions to preserve acquisition context through checkout"

**ID:** `bullet_data_002`
**Evidence:** `exp_kismet_tracking`
**Tags:** `bigquery`, `data-modeling`, `etl`
**Bullet:** "Designed and maintained GA4-export query patterns and summary tables for performance reporting; improved reliability by aligning schemas across hotels with inconsistent event structures and parameter types"

**ID:** `bullet_data_003`
**Evidence:** `exp_kismet_tracking`
**Tags:** `attribution`, `session-stitching`, `data-quality`
**Bullet:** "Built multi-signal attribution logic using UTM source/medium, landing URLs, referrer constraints, and session stitching; reduced misclassification risk in AI-Native vs AI-Search style traffic labels"

**ID:** `bullet_data_004`
**Evidence:** `proj_superplay`
**Tags:** `etl`, `api-integration`, `feature-engineering`
**Bullet:** "Wrote Python ETL that pulls 5K+ tracks via Spotify & Genius APIs and stores them in a cleaned feature set (audio metrics + transformer-based lyric embeddings)"

**ID:** `bullet_data_005`
**Evidence:** `exp_kismet_tracking`
**Tags:** `api`, `analytics`, `data-contracts`
**Bullet:** "Supported a dashboard API that computes hotel-level analytics and rollups from BigQuery; added guardrails and validation checks to prevent breaking changes from upstream GTM/BE scripts"

---

## Cloud / Infrastructure / DevOps

**ID:** `bullet_infra_001`
**Evidence:** `exp_kismet_ai_data`
**Tags:** `cloud`, `deployment`, `migration`
**Bullet:** "Deployed on AWS EC2/RDS then migrated containers to Cloud Run; used Supabase Postgres and designed the target AlloyDB schema"

**ID:** `bullet_infra_002`
**Evidence:** `proj_superplay`
**Tags:** `docker`, `containerization`
**Bullet:** "Containerised via Docker for one-command launch (docker run -p 5000:5000 superplay-api)"

**ID:** `bullet_infra_003`
**Evidence:** `proj_edgemesh`
**Tags:** `distributed-systems`, `orchestration`, `health-checks`
**Bullet:** "Implemented device discovery + heartbeat-based health, enabling dynamic membership and failover-aware routing across nodes"

**ID:** `bullet_infra_004`
**Evidence:** `proj_edgemesh`
**Tags:** `deployment`, `versioning`
**Bullet:** "Added a model packaging + rollout flow to push versioned artifacts to devices and verify readiness before serving traffic"

---

## SEO / Structured Data

**ID:** `bullet_seo_001`
**Evidence:** `exp_kismet_ai_data`
**Tags:** `seo`, `json-ld`, `schema-org`, `impact`
**Bullet:** "Injected Hotel/FAQPage JSON-LD into NLWeb templates (48% lift in rich-result impressions) and authored internal runbooks for architecture + deployments"

---

## Documentation / Technical Writing

**ID:** `bullet_docs_001`
**Evidence:** `exp_kismet_ai_data`
**Tags:** `documentation`, `runbooks`, `architecture`
**Bullet:** "Authored internal runbooks for architecture + deployments"

**ID:** `bullet_docs_002`
**Evidence:** `exp_kismet_tracking`
**Tags:** `documentation`, `json-schema`, `sops`
**Bullet:** "Produced system diagrams and runbooks for the tracker; maintained JSON Schemas, data dictionaries, and change logs; wrote incident notes/postmortems and SOPs for consent, retention, and webhook correlation"

**ID:** `bullet_docs_003`
**Evidence:** `exp_krushal`
**Tags:** `documentation`, `prd`, `api-specs`, `qa`
**Bullet:** "Wrote product requirement documents, API specs for data sync, QA test plans, and step-by-step SOPs for field users; compiled a release-notes log and a troubleshooting guide that reduced onboarding time for new paravets and engineers"

**ID:** `bullet_docs_004`
**Evidence:** `exp_aci`
**Tags:** `documentation`, `manuals`, `protocol-guides`
**Bullet:** "Created user and admin manuals, a data dictionary for weight/feeding metrics, and a Bluetooth protocol guide with setup and troubleshooting steps; maintained a README and change log that enabled smooth handover to the client's IT team"

---

## Leadership / Product / Impact

**ID:** `bullet_leadership_001`
**Evidence:** `exp_krushal`
**Tags:** `leadership`, `team-lead`, `product`, `impact`
**Bullet:** "Spearheaded a team of four in developing an innovative application feature for a subscription-based dairy startup, streamlining Paravet observation recording and enhancing veterinarian diagnostic accuracy by 30% for livestock health assessments"

**ID:** `bullet_product_001`
**Evidence:** `exp_krushal`
**Tags:** `ui-ux`, `user-testing`, `feedback`
**Bullet:** "Created user-friendly interface designs for three different application modules, enhancing overall usability ratings by gathering direct feedback from paravets during the testing phase with over 50 participants"

**ID:** `bullet_impact_001`
**Evidence:** `exp_aci`
**Tags:** `mobile-dev`, `automation`, `impact`
**Bullet:** "Implemented an innovative Flutter application for the poultry sector that streamlined weight tracking and reporting processes, enhancing data accuracy across 500+ livestock entries while optimizing production yields through effective usage of metrics"

**ID:** `bullet_impact_002`
**Evidence:** `exp_aci`
**Tags:** `bluetooth`, `integration`, `automation`
**Bullet:** "Engineered an automated system to capture weights from Bluetooth scales directly within the app, which resulted in accurate metric recording for over 500 poultry samples per week while minimizing potential human error in logging processes"

---

## Full-Stack / Mobile

**ID:** `bullet_fullstack_001`
**Evidence:** `exp_aci`
**Tags:** `flutter`, `mobile`, `app-development`
**Bullet:** "Implemented an innovative Flutter application for the poultry sector that streamlined weight tracking and reporting processes, enhancing data accuracy across 500+ livestock entries"

**ID:** `bullet_fullstack_002`
**Evidence:** `exp_krushal`
**Tags:** `ui-ux`, `mobile`, `user-testing`
**Bullet:** "Created user-friendly interface designs for three different application modules, enhancing overall usability ratings by gathering direct feedback from paravets during the testing phase with over 50 participants"

---

## Research / Academic Projects (Additional)

**ID:** `bullet_research_001`
**Evidence:** `proj_wind_energy_forecasting`
**Tags:** `research`, `ml`, `neural-networks`, `publication`
**Bullet:** "Developed innovative data-driven techniques that enhanced forecasting accuracy by generating predictive models with 95% precision; facilitated successful integration of wind energy into existing power grids"

**ID:** `bullet_research_002`
**Evidence:** `proj_wind_energy_forecasting`
**Tags:** `research`, `publication`, `renewable-energy`
**Bullet:** "Co-authored and submitted a research paper for publication in the journal Electric Power Components and Systems, utilizing data-driven techniques to develop more accurate forecasting tools for renewable energy integration"

---

## Full-Stack / Web Development (Additional)

**ID:** `bullet_fullstack_003`
**Evidence:** `proj_laundry_management`
**Tags:** `java`, `web-dev`, `oop`, `database`
**Bullet:** "Developed a Laundry Management System for the college laundry service, creating a web application using Servlets, JavaScript, MySQL and HTML with OOP principles"

**ID:** `bullet_fullstack_004`
**Evidence:** `proj_laundry_management`
**Tags:** `web-app`, `real-time`, `impact`
**Bullet:** "Designed a robust web application enabling efficient resource allocation through real-time tracking of services utilized by over 200+ users monthly, leading to notable improvements in productivity metrics within just three months"

---

## Leadership / Extracurricular (Optional - Use Selectively)

**ID:** `bullet_leadership_002`
**Evidence:** `activity_comedy_club_president`
**Tags:** `leadership`, `event-management`, `soft-skills`
**Bullet:** "Led college comedy club as President, organizing fundraisers and inter-college stand-up festivals, managing event planning and coordination for college-wide entertainment programs"

**ID:** `bullet_technical_leadership_001`
**Evidence:** `activity_hackers_asylum_organizer`
**Tags:** `cybersecurity`, `ctf`, `event-organization`
**Bullet:** "Organized inter-college Capture The Flag (CTF) event focused on cyber security and cipher decoding, coordinating technical challenges for computer science department's technical extravaganza"

**ID:** `bullet_event_management_001`
**Evidence:** `activity_gaming_tournament_organizer`
**Tags:** `event-management`, `coordination`, `scale`
**Bullet:** "Organized inter-college gaming tournament with 100+ participating teams across BGMI and Valorant competitions, managing event logistics and large-scale coordination"

---

## Instructions for Use

1. When tailoring a resume, identify the role family (AI/ML, backend, data, etc.)
2. Pull the top 4-6 bullets from relevant categories that match JD keywords
3. Reorder bullets to put strongest/most relevant first
4. Ensure each bullet is quantified and includes a strong action verb
5. Cross-reference with `data/experience.yaml` and `data/projects.yaml` for full context

---

## Bullet Quality Checklist

- [ ] Starts with strong action verb (built, designed, implemented, integrated, etc.)
- [ ] Includes quantified impact (%, numbers, scale)
- [ ] Specific about technologies/tools used
- [ ] Shows business/technical value
- [ ] ATS-friendly (no weird characters, clear keywords)
- [ ] Concise (1-2 lines max)
