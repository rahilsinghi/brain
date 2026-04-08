---
title: STAR Stories
author: ai
created_at: 2026-04-08T14:25:52.441Z
last_ai_edit: 2026-04-08T14:25:52.441Z
last_human_edit: null
last_embedded_hash: bc408617075fe6d8
sources:
  - career-datacenter/data/stories_star.yaml
tags:
  - stories
  - interview
  - star
---



# STAR Stories

***

## Built GPT-4o/Gemini Tool-Calling Pipeline for Hotel Data Extraction

**Category:** high_impact / AI/ML Production
**Best for:** AI/ML Engineer, Software Engineer (AI/LLM), Backend Engineer, Full-stack Engineer

### Situation

Kismet needed to automate hotel data extraction from websites to onboard customers faster. Manual extraction was taking 2-3 hours per hotel and was error-prone, slowing down our sales pipeline.

### Task

Build an AI-powered web crawler that could automatically extract structured hotel data (amenities, policies, contact info, FAQs) from any hotel website with >90% accuracy, and integrate it into our customer onboarding workflow.

### Action

- Designed Playwright crawler to navigate hotel websites dynamically and handle JavaScript-rendered content
- Implemented GPT-4o/Gemini tool-calling pipeline to convert raw HTML into schema.org/Hotel JSON-LD format
- Built fallback logic: if GPT-4o failed on a field, route to Gemini for a second attempt
- Wrapped extraction engine in FastAPI service with webhook callbacks for async processing
- Added live progress tracking in sales portal so sales team could monitor extraction status in real-time
- Integrated signed asset delivery for secure image/PDF downloads from hotel websites
- Deployed to AWS EC2 initially, then migrated to Google Cloud Run for better scaling

### Result

- Captured >95% of required fields automatically (amenities, policies, contact info, images)
- Reduced onboarding time from 2-3 hours to <15 minutes per hotel
- Sales team adopted it immediately, praising the live progress tracking feature
- Became core infrastructure for customer onboarding, handling 14+ hotel customers
- Fallback logic ensured 99% uptime even when one LLM provider had issues

***

## Managed Analytics Infrastructure for 14 Hotel Customers

**Category:** teamwork / Customer-Facing Data Engineering
**Best for:** Data Engineer, Analytics Engineer, Software Engineer (Data), Backend Engineer

### Situation

Kismet had 14 hotel customers using our AI-powered booking platform, but they lacked visibility into how the AI was performing. Hotels wanted to see AI-driven revenue, ADR (average daily rate), booking attribution, and traffic sources—but our data pipelines weren't built for customer-facing analytics yet.

### Task

Build customer-facing analytics infrastructure that surfaced AI metrics, revenue data, and attribution analytics for each hotel, with guarantees on data quality and reliability. Each hotel needed their own dashboard, plus we needed portfolio-wide rollups for our internal team.

### Action

- Set up cross-domain GA4/GTM tracking to capture user journeys across 14 different hotel websites
- Built BigQuery data pipelines to aggregate booking events, revenue, ADR, and AI interaction data
- Designed hotel-level dashboards with per-hotel metrics (bookings, revenue, AI metrics) and portfolio rollups
- Implemented multi-signal attribution logic using UTM parameters, session stitching, and referrer analysis to distinguish AI-driven vs organic traffic
- Added data quality guardrails to prevent breaking changes from upstream script modifications
- Built and maintained backfill service to recover from data gaps
- Built BigQuery extraction service for reliable scheduled data delivery to customer dashboards
- Wrote JSON schemas, data dictionaries, and operational runbooks for the analytics team

### Result

- Successfully managed analytics for 14 hotel customers simultaneously
- Hotels gained real-time transparency into AI-driven revenue and booking attribution
- Attribution logic reduced misclassification of AI-driven vs organic traffic by ~30%
- Dashboards became core part of customer QBRs (quarterly business reviews)
- Data quality guardrails caught 5+ breaking changes before they impacted customers
- Zero customer escalations for analytics issues during my tenure

***

## Employee #3 at Antler-Backed Startup (High-Ownership Culture)

**Category:** leadership / Startup Experience
**Best for:** Startup roles, Early-stage companies, High-ownership roles

### Situation

Joined Kismet as employee #3 at an Antler-backed startup in May 2025. The company was finding product-market fit with initial hotel customers, and the team was extremely lean—just me, one other engineer, and the founder.

### Task

Wear multiple hats: build AI/ML features, maintain infrastructure, deploy services, work directly with customers to ensure data quality, and help the sales team with technical onboarding. With such a small team, everything I built had to be production-ready and customer-facing immediately.

### Action

- Owned end-to-end features: from LLM orchestration to customer delivery, no handoffs
- Shipped GPT-4o tool-calling pipeline in first 2 months (May-July internship)
- Returned for second internship (Sept-Dec) and built analytics infrastructure for 14 customers
- Deployed to AWS EC2/RDS initially, then led migration to Google Cloud Run for scalability
- Wrote internal runbooks for architecture, deployments, incident response, and customer escalation procedures
- Worked directly with sales team during customer demos to troubleshoot issues in real-time
- Participated in sprint planning and prioritized features based on customer feedback from sales calls

### Result

- Contributed to core product features that helped land 14 paying hotel customers
- Gained deep experience in startup velocity: ship fast, iterate with user feedback, prioritize customer impact over perfection
- Developed strong full-stack + infrastructure skills in high-pressure production environment
- Learned to balance speed and quality—shipped features quickly but with enough testing to avoid customer-facing bugs
- Built strong collaboration skills with sales team, learning to translate technical details for non-technical stakeholders

***

## Migrated Hotel Booking Platform from AWS to Google Cloud Run

**Category:** speed / Cloud Migration
**Best for:** Backend Engineer, Infrastructure Engineer, DevOps Engineer, Full-stack Engineer

### Situation

Kismet's LLM extraction pipeline and booking services were initially deployed on AWS EC2/RDS. As we scaled to 14 hotel customers, we hit cost and scaling issues—EC2 instances were over-provisioned for average load but under-provisioned for peak traffic.

### Task

Migrate containerized services from AWS EC2/RDS to Google Cloud Run and AlloyDB to reduce costs and improve auto-scaling for variable traffic patterns.

### Action

- Containerized services with Docker (FastAPI backend, Playwright crawler, booking services)
- Set up Google Cloud Run for serverless container deployment with auto-scaling
- Migrated PostgreSQL data from AWS RDS to AlloyDB (Google Cloud's managed PostgreSQL)
- Designed AlloyDB schema optimizations for production scale (added indexes, partitioning for analytics queries)
- Implemented Redis caching layer to reduce database load during geo-search queries
- Set up CI/CD pipeline for automated deployments to Cloud Run
- Load-tested migration with synthetic traffic before switching production customers

### Result

- Reduced infrastructure costs by ~40% (Cloud Run's pay-per-request pricing vs always-on EC2)
- Improved auto-scaling: Cloud Run handled traffic spikes automatically without manual intervention
- Cut geo-search latency from ~800ms to ~200ms with Redis caching + AlloyDB optimizations
- Zero downtime during migration—used blue-green deployment strategy
- Simplified ops: Cloud Run eliminated need for manual server management

***

## Increased Search Visibility by 48% with JSON-LD Structured Data

**Category:** high_impact / SEO & Structured Data
**Best for:** Full-stack Engineer, Frontend Engineer, Backend Engineer, Growth Engineer

### Situation

Kismet's hotel booking platform had low visibility in Google Search rich results. Hotels weren't appearing with rich snippets (star ratings, pricing, availability) because we weren't injecting schema.org structured data into our pages.

### Task

Inject schema.org/Hotel and schema.org/FAQPage JSON-LD structured data into hotel pages to increase rich-result impressions and improve SEO.

### Action

- Extracted hotel data (name, address, amenities, ratings, FAQs) from websites using Playwright crawler
- Converted extracted data into schema.org/Hotel JSON-LD format (validated against Google's Structured Data Testing Tool)
- Injected JSON-LD into page templates (<script type="application/ld+json">)
- Also added schema.org/FAQPage for hotel FAQ sections to increase FAQ rich results
- Monitored Google Search Console for rich-result performance improvements

### Result

- 48% lift in rich-result impressions within 2 weeks of deployment
- Hotels started appearing with star ratings, pricing, and amenities in Google Search
- FAQ rich results increased click-through rate by ~15% (measured via Search Console)
- Became standard part of our hotel onboarding checklist

***

## Led Team of 4 Engineers to Build ML-Powered Livestock Health Tracking App

**Category:** leadership / Team Lead & Product Management
**Best for:** Team Lead, Engineering Manager, Product Engineer, Mobile Engineer

### Situation

Krushal Open Commerce, a subscription-based dairy startup, needed a mobile app for veterinarians to track livestock health and improve diagnostic accuracy. I was brought on to lead the development team.

### Task

Spearhead a team of 4 engineers to build an ML-powered livestock health tracking app, gather user feedback from 50+ field users, and ensure the product met veterinarian needs.

### Action

- Led team of 4 engineers (2 mobile devs, 1 ML engineer, 1 backend dev)
- Created user-friendly interface designs for 3 application modules (health tracking, diagnostics, reporting)
- Gathered direct feedback from 50+ veterinarians and field users during beta testing
- Wrote product requirement documents (PRDs), API specifications, and QA test plans
- Integrated ML model for livestock health diagnostics (improved accuracy by 30%)
- Created SOPs (standard operating procedures) to reduce onboarding time for new engineers and field users

### Result

- Enhanced veterinarian diagnostic accuracy by 30% with ML integration
- 50+ field users adopted the app during beta, providing critical feedback for iteration
- Reduced onboarding time for new team members from 2 weeks to 3 days with clear documentation
- App launched successfully and became core tool for Krushal's subscription service

***

## Built AI-Powered Spotify Playlist Curator with 96% Accuracy

**Category:** ambiguity / End-to-End ML Project
**Best for:** AI/ML Engineer, Data Scientist, Backend Engineer

### Situation

Wanted to build a personal project to deepen my ML skills and learn how to deploy ML models in production. The problem: manually curating Spotify playlists by mood was time-consuming and subjective.

### Task

Build an end-to-end ML system that ingests Spotify tracks, predicts mood (happy, sad, energetic, calm), and exposes predictions via a REST API—all containerized for easy deployment.

### Action

- Ingested 5K+ tracks via Spotify API and Genius API (for lyrics)
- Engineered features: audio features (tempo, energy, valence) + lyrical sentiment using transformer embeddings
- Trained XGBoost classifier for multi-class mood prediction (4 moods)
- Evaluated multiple models (Logistic Regression, Random Forest, XGBoost)—XGBoost achieved 96% macro-F1
- Built Flask REST API to serve predictions
- Containerized entire system with Docker for one-command deployment

### Result

- Achieved 96% macro-F1 score for mood prediction
- Deployed successfully with Docker (docker run → instant API)
- Learned end-to-end ML workflow: data ingestion → feature engineering → training → deployment
- Project showcased on GitHub with 20+ stars
