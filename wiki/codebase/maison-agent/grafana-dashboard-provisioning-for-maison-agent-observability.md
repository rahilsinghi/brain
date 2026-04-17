---
title: Grafana Dashboard Provisioning for Maison-Agent Observability
author: ai
created_at: 2026-04-15T20:05:58.503Z
last_ai_edit: 2026-04-15T20:05:58.503Z
last_human_edit: null
last_embedded_hash: 1bf2a0d31c641c25
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/maison-agent/maison-agent-community-20.md]]"
tags:
  - code-community
  - maison-agent
  - graphify
  - grafana
  - dashboards
  - observability
  - automation
  - monitoring
  - aws
  - prometheus
aliases:
  - Community 20
---



# Grafana Dashboard Provisioning for Maison-Agent Observability

This code community encapsulates the utilities responsible for programmatically generating and provisioning Grafana dashboards within the [[maison-agent]] repository. It provides functions to create various panel types and integrate data sources, enabling comprehensive observability for the Maison-Agent's AWS infrastructure and the Claude Code environment.

## Key Concepts

Grafana Dashboard Generation,Observability and Monitoring,AWS CloudWatch Integration,Prometheus Data Sourcing,Panel Configuration (Time Series, Stat, Row, Pie),Infrastructure as Code (for Dashboards)

## Details

The core of this community is the `/Users/rahilsinghi/Desktop/maison-agent/scripts/grafana-dashboards.ts` script. This single TypeScript file defines a suite of functions and components dedicated to automating the creation of Grafana dashboards.

Key functions and their roles include:

*   `grafana_dashboards_buildmaisonawsdashboard`: This function is responsible for constructing Grafana dashboards specifically tailored for monitoring the [[maison-agent]]'s AWS infrastructure. It utilizes various panel types and integrates data from [[AWS CloudWatch]].
*   `grafana_dashboards_buildclaudecodedashboard`: Focuses on building dashboards for monitoring the [[Claude Code]] environment, primarily using [[Prometheus]] as a data source.

The script defines modular components for different Grafana panel types, allowing for flexible dashboard assembly:

*   `grafana_dashboards_cwmetric`: Handles CloudWatch metric queries for panels.
*   `grafana_dashboards_cwinsights`: Integrates CloudWatch Logs Insights queries.
*   `grafana_dashboards_cwcf`: Possibly relates to CloudFormation metrics or configurations for dashboards.
*   `grafana_dashboards_tspanel`: Creates time series panels.
*   `grafana_dashboards_statpanel`: Generates stat panels for single value metrics.
*   `grafana_dashboards_rowpanel`: Used to organize panels into logical rows within a dashboard.
*   `grafana_dashboards_promtspanel`: Configures time series panels with Prometheus queries.
*   `grafana_dashboards_promstackedtspanel`: Creates stacked time series panels using Prometheus data.
*   `grafana_dashboards_promstatpanel`: Generates stat panels from Prometheus queries.
*   `grafana_dashboards_prompiepanel`: Builds pie chart panels with Prometheus data.
*   `grafana_dashboards_promquery` and `grafana_dashboards_prominstantquery`: Utility functions for defining Prometheus queries, including instant queries.

This programmatic approach ensures consistency and reusability in creating and updating Grafana dashboards for different operational contexts within the [[maison-agent]] ecosystem.

## Related

[[maison-agent]],[[Claude Code & Cowork Setup for Maison]],[[Claude Code Vault Integration Documentation]],[[AWS CloudWatch]],[[Prometheus]],[[Grafana]]
