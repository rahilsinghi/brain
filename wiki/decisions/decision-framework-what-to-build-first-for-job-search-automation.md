---
title: "Decision Framework: What to Build First for Job Search Automation"
author: ai
created_at: 2026-04-08T16:20:17.370Z
last_ai_edit: 2026-04-08T16:20:17.370Z
last_human_edit: null
last_embedded_hash: 284e07ba6a7e8d14
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/articles/decision-framework.md]]"
tags:
  - decision-framework
  - job-search
  - multi-agent-systems
  - langgraph
  - automation
  - career
  - ml-engineering
  - fast-track
  - hybrid-approach
  - portfolio
  - api-integration
  - workflow
---


# Decision Framework: What to Build First for Job Search Automation

A structured decision framework for choosing between manual job application strategies and automated multi-agent systems, tailored for a graduating MS Computer Engineering student. It presents four distinct paths—Fast Track, Learning, Production, and Exploration—based on timeline, risk tolerance, and goals. The framework recommends a hybrid approach for most candidates balancing immediate applications with gradual automation development.

## Key Concepts

- **Fast Track Path**: Apply manually using existing Career Data Center tools; prioritized when job needed within 2-4 weeks
- **Learning Path**: Build a Phase 1 MVP using LangGraph and multi-agent orchestration for educational and portfolio value
- **Production Path**: Systematic 6-8 week build of a full automation pipeline across three phases with long-term ROI
- **Exploration Path**: Low-commitment prototyping with no-code tools (n8n, Make.com) to validate automation assumptions before investing
- **Hybrid Approach**: Parallel manual applications and agent system development to mitigate risk while maximizing learning
- **Go/No-Go Criteria**: Decision gates based on timeline urgency, application volume, budget, and intrinsic motivation
- **Multi-Agent System**: A pipeline involving JobScoutAgent, JDClassifierAgent, and TailorPackAgent built on LangGraph
- **Career Data Center**: Pre-built repository of resume bullets, STAR stories, templates, and networking materials

## Details

## Overview

This decision framework helps job seekers—particularly technical candidates—choose the right strategy between manual job applications and building automated multi-agent systems. It is designed for candidates with strong technical backgrounds who may be tempted to over-engineer their job search.

---

## The Four Paths

### 🏃 Fast Track Path
**Best for:** Candidates needing a job within 2-4 weeks.

- Use existing Career Data Center resources immediately
- Week 1: Apply to 10-20 jobs using `bullet_bank.md`, `master_resume_source.md`, and `networking_templates.md`
- Week 2-4: Focus on interview prep using `stories_star.yaml` and `interview_prep.md`
- Build automation only after securing employment

**Key insight:** Building a multi-agent system takes 2-4 weeks minimum; manual applications with good templates are faster and proven.

---

### 📚 Learning Path
**Best for:** Candidates focused on skill development and portfolio building.

- Week 1: Install LangGraph, FastAPI, PostgreSQL; build a 3-node state machine (Ingest → Score → Output)
- Week 2: Build JobScoutAgent with Greenhouse API integration
- Week 3: Build JDClassifierAgent using OpenAI/Claude for fit scoring
- Week 4: Build TailorPackAgent for automated resume generation from YAML and bullet banks

**Key insight:** Each agent teaches a distinct marketable skill—API integration, LLM prompt engineering, and template/file I/O.

---

### 🏗️ Production Path
**Best for:** Candidates with 6+ weeks of runway committed to long-term automation.

- **Phase 1 (2 weeks):** MVP — Job discovery and tailoring pipeline
- **Phase 2 (2 weeks):** Outreach automation via Apollo.io with email drafting, approval, and tracking
- **Phase 3 (ongoing):** Intelligence layer — A/B testing, outcome learning, automated filtering

**Key insight:** A phased approach reduces risk through incremental value delivery. Full investment pays off across a multi-month search.

---

### 🔬 Exploration Path
**Best for:** Candidates unsure whether automation is worth building.

- Week 1: Test LinkedIn/job scraping via Apify; assess data quality
- Week 2: Evaluate Apollo.io People Search and Enrichment APIs
- Week 3: Prototype end-to-end workflow in n8n (Greenhouse → Apollo → Gmail)
- Week 4: Decision point — commit to Production Path or remain with manual

**Key insight:** Validate assumptions cheaply before investing weeks of engineering effort.

---

## Comparison Matrix

| Path | Time Investment | Risk | Learning Value | Job Search Impact | Portfolio Value |
|---|---|---|---|---|---|
| Fast Track | 1-2 weeks | Low | Low | High (immediate) | Low |
| Learning | 4 weeks | Medium | High | Medium (delayed) | High |
| Production | 6-8 weeks | High | Very High | Low (initially) | Very High |
| Exploration | 2-3 weeks | Low | Medium | Medium | Medium |

---

## Go/No-Go Criteria

### ✅ Build the agent system if:
- 6+ weeks before needing employment
- Desire to learn LangGraph/multi-agent systems for resume differentiation
- Applying to 50-100+ jobs over 3-6 months
- Genuine interest in systems engineering
- Budget available for APIs (~$100-200/month)

### ❌ Do not build if:
- Job needed in under 4 weeks
- Applying to fewer than 20 selective roles
- API budget is constrained
- Low intrinsic motivation for systems engineering (high abandonment risk)

### ⚠️ Undecided:
- Start with the Exploration Path (2 weeks) to generate data for the decision

---

## Recommended Hybrid Approach

For a candidate profile matching NYU MS CompE graduating May 2026:

**Week 1-2 (Fast Track):**
- Apply to 10-20 jobs manually using Career Data Center
- Track which roles generate excitement and responses

**Week 3-4 (Learning Path):**
- Build Phase 1 MVP (JobScoutAgent + JDClassifierAgent + TailorPackAgent)
- Apply next batch of 10-20 jobs through the system
- Validate: time saved and output quality

**Week 5+ (Decision Point):**
- MVP works → advance to Phase 2 outreach automation
- MVP underperforms → continue manual with iterative improvements
- Job offer received → pause automation, shift focus to interviews

**Expected Outcome:**
- 10-20 applications submitted by Week 3 (manual)
- Working MVP by Week 4 (automated)
- Résumé portfolio item: "Built multi-agent job application system using LangGraph"
- 50-100 applications by Week 8 (mixed pipeline)

---

## Self-Assessment Questions

1. **When do you need a job?** → <4 weeks: Fast Track | 1-3 months: Hybrid | 3+ months: Production
2. **What motivates you more?** → Getting hired: Fast Track | Learning tech: Learning/Production | Both: Hybrid
3. **How many jobs will you apply to?** → <20: Fast Track | 20-50: Hybrid | 50-100+: Production
4. **What is your risk tolerance?** → Low: Fast Track | Medium: Hybrid/Exploration | High: Production

---

## Immediate Action Items

- Decide on a path and write specific dates on a calendar
- Apply to 3-5 jobs manually today to build momentum
- Obtain API keys (Apollo.io, OpenAI/Claude) if planning to build agents
- If building: Set up LangGraph environment and read `AGENTIC_ROADMAP.md`

## Related

- [[Multi-Agent Job Application System]]
- [[LangGraph Orchestration]]
- [[Career Data Center]]
- [[JobScoutAgent]]
- [[JDClassifierAgent]]
- [[TailorPackAgent]]
- [[Apollo.io Integration]]
- [[Agentic Roadmap Phases]]
- [[STAR Stories Bank]]
- [[Resume Bullet Bank]]
- [[Job Search Strategy]]
- [[n8n Workflow Automation]]
