---
title: Programmatic Grafana Dashboard Generation
author: ai
created_at: 2026-04-15T19:51:01.126Z
last_ai_edit: 2026-04-15T19:51:01.126Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/maison-agent/maison-agent-community-19.md]]"
tags:
  - code-community
  - maison-agent
  - graphify
  - grafana
  - monitoring
  - dashboards
  - aws
  - prometheus
  - typescript
aliases:
  - Community 19
---

# Programmatic Grafana Dashboard Generation

This code community is responsible for the programmatic generation and definition of [[Grafana]] dashboards within the `maison-agent` repository. It provides a structured and version-controlled method to create monitoring interfaces, primarily utilizing [[AWS CloudWatch]] and [[Prometheus]] data sources.

## Key Concepts

Grafana Dashboard Automation,Monitoring as Code,AWS CloudWatch Integration,Prometheus Integration,Time Series Panels,Statistic Panels,Panel Layout Management

## Details

The core of this code community is the `grafana-dashboards.ts` script, located at `/Users/rahilsinghi/Desktop/maison-agent/scripts/grafana-dashboards.ts`. This TypeScript file serves as a utility for programmatically defining and building [[Grafana]] dashboards, ensuring consistency, reusability, and version control for monitoring setups within the `maison-agent` project.

The script defines several helper functions, each responsible for creating a specific type of [[Grafana]] panel or query:

*   `grafana_dashboards_cwmetric`: Generates panels for displaying [[AWS CloudWatch]] metrics.
*   `grafana_dashboards_cwinsights`: Creates panels for [[AWS CloudWatch]] Insights queries, often used for log analysis.
*   `grafana_dashboards_cwcf`: Likely a helper related to [[AWS CloudFormation]] context for CloudWatch queries.
*   `grafana_dashboards_tspanel`: Creates generic time series panels.
*   `grafana_dashboards_statpanel`: Generates single-value statistic panels.
*   `grafana_dashboards_rowpanel`: Used to group related panels into rows, helping organize the dashboard layout.
*   `grafana_dashboards_promtspanel`: Builds time series panels using data queried from [[Prometheus]].
*   `grafana_dashboards_promstackedtspanel`: Creates stacked time series panels specifically for [[Prometheus]] metrics.
*   `grafana_dashboards_promstatpanel`: Generates statistic panels based on [[Prometheus]] query results.
*   `grafana_dashboards_prompiepanel`: Constructs pie chart panels for [[Prometheus]] data.
*   `grafana_dashboards_promquery`: A general function for defining [[Prometheus]] queries.
*   `grafana_dashboards_prominstantquery`: Defines instant [[Prometheus]] queries.

These individual panel and query builders are then orchestrated by higher-level functions to compose complete dashboards. Two primary dashboard-building functions identified are:

1.  `grafana_dashboards_buildmaisonawsdashboard`: This function assembles a comprehensive dashboard focused on monitoring the `maison-agent`'s infrastructure on AWS. It utilizes `cwmetric`, `cwinsights`, `cwcf`, `tspanel`, `statpanel`, and `rowpanel` functions to display relevant AWS metrics and operational insights.
2.  `grafana_dashboards_buildclaudecodedashboard`: This function is dedicated to constructing a dashboard for monitoring internal "Claude Code" components. It heavily relies on [[Prometheus]] as the data source, employing `promtspanel`, `promstackedtspanel`, `promstatpanel`, `prompiepanel`, `promquery`, `prominstantquery`, and `rowpanel` functions to visualize application-specific metrics.

## Related

[[maison-agent]],[[Grafana]],[[AWS CloudWatch]],[[Prometheus]]
