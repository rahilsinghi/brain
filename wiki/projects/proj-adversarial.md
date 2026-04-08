---
title: Adversarial Attacks on Image Classification
author: ai
created_at: 2026-04-08T14:25:52.436Z
last_ai_edit: 2026-04-08T14:25:52.436Z
last_human_edit: null
last_embedded_hash: null
sources:
  - career-datacenter/data/projects.yaml#proj_adversarial
tags:
  - project
  - coursework
  - pytorch
  - resnet-34
  - densenet-121
  - imagenet-1k
  - fgsm
---


# Adversarial Attacks on Image Classification

**coursework** · 2024-2025

## Problem

Image classifiers are vulnerable to adversarial attacks. Need to evaluate attack methods and develop defenses through adversarial training.

## Approach

Implemented FGSM, PGD, and I-FGSM with configurable parameters on ResNet-34 (ImageNet-1K); integrated on-the-fly PGD example generation for adversarial training; benchmarked attack transferability to DenseNet-121.

## Results

PGD cut Top-1 accuracy from 76% to 2%; adversarial training restored accuracy to 61% on adversarial inputs. Produced comparative plots for conference report.

## Key Points

- PyTorch project evaluating FGSM, PGD, and I-FGSM on ResNet-34 (ImageNet-1K) and hardening the model with adversarial training
- Implemented FGSM, PGD, and I-FGSM with configurable epsilon, step size, and iterations; PGD cut Top-1 accuracy from 76% to 2%
- Integrated on-the-fly PGD example generation, restoring Top-1 accuracy to 61% on adversarial inputs
- Benchmarked attack transfer from ResNet-34 → DenseNet-121; produced comparative plots for conference report

## Metrics

- **ResNet-34 Top-1 accuracy drop (PGD attack):** 76 to 2 percent (high confidence)

## Tech Stack

PyTorch, ResNet-34, DenseNet-121, ImageNet-1K, FGSM, PGD, I-FGSM, Adversarial Training

## Links

- [Repository](https://github.com/rahilsinghi/Deep-Learning-Project-3)
