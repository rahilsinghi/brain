---
status: pending
source_type: file_drop
source_id: null
ingested_at: 2026-04-10T12:30:00Z
parsed_at: 2026-04-10T12:30:00Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# GazeDiffuse: Project Profile

## 1. Project Summary

**GazeDiffuse** is a novel approach to controllable text generation in masked diffusion language models (MDLMs) using eye-tracking gaze signals. Unlike prior work (Sauberli et al., EACL 2026) that applies gaze guidance sequentially in autoregressive models, GazeDiffuse leverages diffusion's parallel denoising capability to guide **all token positions simultaneously** at each step, producing more globally coherent readability changes.

**Research Context**: The project addresses controllable text generation with explicit readability control, combining:
- Gaze psycholinguistics (eye-tracking fixation duration as readability proxy)
- Masked diffusion language models (MDLM, Sahoo et al. NeurIPS 2024)
- Score-based guidance (combining LM log-probs + gaze signals via λ weighting)

**Current Status** (April 2026):
- **Fully implemented**: 769 lines of production code, 194 passing tests, 69% coverage
- **2/5 experiments completed**: Gaze predictor trained (r=0.24), AR baseline results show weak signal
- **Critical blocker**: No HPC project account on Torch cluster — all GPU experiments (1, 4, 5) blocked
- **Timeline**: Target EMNLP 2026 (ARR May/June) and NeurIPS 2026 (stretch, May 15)

---

## 2. Tech Stack

**Core ML Frameworks**:
- PyTorch (≥2.2.0) — training & inference
- Transformers (≥4.38.0) — BERT-base, GPT-2, LLaDA model loading
- PyTorch Lightning (≥2.2.0) — training infrastructure (prepared, not yet used)

**Language Models**:
- BERT-base-uncased — gaze predictor backbone (768 hidden, 12 heads)
- GPT-2 medium (355M) — AR baseline comparison
- MDLM (Sahoo et al.) — masked diffusion (submodule, NeurIPS 2024)
- LLaDA 8B (Nie et al.) — large-scale masked diffusion (NeurIPS 2025)

**Evaluation & Metrics**:
- `textstat` (≥0.7) — Flesch-Kincaid Grade Level (FKGL), Automated Readability Index (ARI)
- `mauve-text` (≥0.3) — distributional similarity to unguided baseline
- Custom self-perplexity (via HuggingFace LM)
- Custom sentence-level FK variance (coherence metric)

**Data & Experiment Infrastructure**:
- GECO corpus (5,031 sentences, 14 participants, 473K examples)
- Hydra (≥1.3.0) for config management
- SLURM job templates (H200/H100/L40S partitions)
- W&B (≥0.16.0) for experiment tracking
- pytest (≥8.0.0) — 194 tests across all modules

**Development**:
- Black, Ruff, mypy, isort — code quality
- Pre-commit hooks (not configured)
- Python 3.9+ requirement

---

## 3. Architecture

### Core Algorithm (GazeDiffuse)

```
Input: prompt_ids, generation_length, λ (guidance strength)

Initialize: x = [prompt tokens] + [MASK] * gen_length

For each denoising step (0 to num_steps):
  1. Find masked positions
  2. Forward MDLM: get log P_LM(vocab | context, noise_level_t)
  3. If λ ≠ 0:
     For each masked position:
       - Get top-k LM candidates
       - Score each via gaze_predictor.score_vocabulary()
       - Normalize scores to [0, 1]
       - Combine: guided_score = log_P + λ * gaze_score
  4. For masked positions, argmax over guided_scores
  5. Via confidence_schedule(), reveal top-confidence tokens this step
  6. x[masked_positions] = selected_tokens

Return: fully denoised x
```

**Key Design Choices**:
- **Parallel guidance**: All masked positions receive gaze signal simultaneously (vs. AR's sequential one-token-at-a-time)
- **Log-probability combination**: λ weighting directly in log-space for numerical stability
- **Confidence-based reveal**: Linear schedule (reveal ~equal tokens per step)
- **No MDLM fine-tuning**: Gaze predictor frozen, MDLM frozen (training-free approach)

### Gaze Predictor Architecture

```
Input: [CLS] left_5_tokens [SEP] target_token [SEP] right_5_tokens [SEP]
  ↓
BERT-base-uncased (768 hidden, 12 heads, frozen weights)
  ↓
[CLS] pooling → Dropout(0.1) → Linear(768 → 1)
  ↓
Output: Predicted mean fixation duration (ms, normalized)
```

**Training**:
- Data: GECO corpus (473K examples after extraction)
- Labels: Mean fixation duration per word (log-normalized)
- Loss: MSELoss + gradient clipping (max 1.0)
- Optimization: AdamW (lr=2e-5), linear warmup (10% steps) + decay
- Evaluation: Spearman correlation (best: r=0.241, epoch 2)

### Data Flow

```
Raw GECO (.xlsx) 
  → Extract [5-token left | target | 5-token right] windows
  → 473K training examples
  → Subject-level 5-fold CV (leave-participant-out)
  
50 Shared Prompts (diverse, 10-20 tokens)
  → Tokenize, encode
  → Feed to MDLM/GPT-2/LLaDA

Generated Samples
  → Compute FKGL, ARI per sample
  → Compute self-PPL via language model
  → Compute sentence-FK variance (global coherence)
  → Compute MAUVE (vs. unguided baseline)
  → Save to JSONL (prompt, generation, lam, steps)
```

---

## 4. Directory Structure

```
gaze-diffuse/
├── src/                              # Main source code (769 LOC, 69% test coverage)
│   ├── __init__.py
│   ├── gaze_guidance.py              # Core GazeDiffuse algorithm (143 LOC, 80% cov)
│   │   ├── GazeDiffuseConfig (frozen dataclass)
│   │   ├── confidence_schedule() — reveal schedule
│   │   ├── gaze_guided_diffuse() — main algorithm
│   │   ├── gaze_guided_diffuse_mdlm() — native MDLM API version
│   │   ├── generate_samples() — batch generation
│   │   └── save_generations() → JSONL
│   ├── gaze_predictor.py             # BERT fixation predictor (182 LOC, 53% cov)
│   │   ├── GazePredictor (nn.Module)
│   │   ├── train_gaze_predictor() — training loop
│   │   ├── load_trained_predictor() — checkpoint loading
│   │   ├── score_tokens() — batch scoring
│   │   └── score_vocabulary() — per-position vocab scoring
│   ├── ar_baseline.py                # Sauberli et al. GPT-2 baseline (89 LOC, 61% cov)
│   │   ├── ARGazeConfig
│   │   ├── ar_gaze_guided_generate()
│   │   └── generate_ar_samples()
│   ├── metrics.py                    # Evaluation (FKGL, ARI, MAUVE, self-PPL) (143 LOC, 80% cov)
│   │   ├── MetricsResult (dataclass)
│   │   ├── compute_fkgl()
│   │   ├── compute_ari()
│   │   ├── compute_sentence_fk_variance() — KEY metric
│   │   ├── compute_self_perplexity()
│   │   └── compute_mauve()
│   ├── models/
│   │   ├── __init__.py
│   │   └── mdlm_wrapper.py           # MDLM + LLaDA wrappers (91 LOC, 67% cov)
│   │       ├── MDLMConfig
│   │       ├── MDLMWrapper (from_checkpoint, get_log_probs, get_timesteps)
│   │       └── LLaDAWrapper (from_pretrained, get_logits)
│   └── data/
│       ├── __init__.py
│       ├── geco.py                   # GECO corpus loader (115 LOC, 75% cov)
│       │   ├── GazeExample (frozen)
│       │   ├── GazeDataConfig
│       │   ├── GazeDataset (torch.utils.data.Dataset)
│       │   ├── load_geco_corpus()
│       │   ├── extract_gaze_examples()
│       │   ├── create_subject_cv_splits()
│       │   └── normalize_fixation_durations()
│       └── prompts.py                # 50 shared prompts (6 LOC, 100% cov)
│
├── tests/                            # 194 passing tests, pytest
│   ├── conftest.py                   # Fixtures (mock models, GECO data)
│   ├── test_gaze_guidance.py         # GazeDiffuse algorithm (11 tests)
│   ├── test_gaze_predictor.py        # Predictor training/inference (7 tests)
│   ├── test_ar_baseline.py           # AR baseline (25 tests)
│   ├── test_metrics.py               # Metric computation (11 tests)
│   ├── test_mdlm_wrapper.py          # Model wrappers (integration)
│   ├── test_geco_data.py             # GECO loader (5 tests)
│   ├── test_integration.py           # End-to-end workflows
│   ├── test_training_smoke.py        # Training pipeline smoke tests
│   └── test_data.py                  # Prompt/data utilities
│
├── scripts/
│   ├── setup_hpc.sh                  # One-time HPC env setup (conda + deps)
│   ├── download_data.sh              # Download GECO + checkpoints
│   ├── download_checkpoints.sh       # MDLM-OWT (~1.2GB), LLaDA
│   ├── plot_results.py               # Publication-quality plots (4 types)
│   └── slurm/
│       ├── exp1_mdlm_baseline.slurm       # MDLM baseline PPL (1×RTX8000, ~2h)
│       ├── exp2_gaze_predictor.slurm      # Gaze predictor training (1×RTX8000, ~30min)
│       ├── exp3_ar_baseline.slurm         # AR gaze baseline (1×RTX8000, ~8h)
│       ├── exp4_gazediffuse_mdlm.slurm    # GazeDiffuse on MDLM (1×RTX8000, ~12h)
│       └── exp5_gazediffuse_llada.slurm   # GazeDiffuse on LLaDA 8B (1×A100, ~12h)
│
├── submodules/
│   ├── mdlm/                         # MDLM submodule (Sahoo et al., NeurIPS 2024)
│   │   └── diffusion.py              # Core Diffusion class
│   └── llada/                        # LLaDA 8B submodule (Nie et al., NeurIPS 2025)
│
├── checkpoints/
│   ├── gaze_predictor/
│   │   ├── gaze_predictor_best.pt    # Best epoch (r=0.241)
│   │   └── gaze_predictor_final.pt
│   └── gaze_predictor_v2/            # Extended training (stuck at epoch 2)
│
├── data/
│   └── geco/
│       ├── MonolingualReadingData.xlsx  # Raw GECO corpus (from download_data.sh)
│       └── geco_processed.csv           # Pre-processed (473K examples)
│
├── results/                          # Generated samples (JSONL format)
│   ├── ar_baseline_lam{-1.0, 0.0, 1.0}.jsonl
│   └── (gazediffuse results to be populated)
│
├── paper/                            # LaTeX (EMNLP template scaffold)
│   ├── main.tex
│   ├── references.bib
│   ├── figures/
│   │   └── method_overview.tex
│   └── tables/
│       └── results.tex
│
├── pyproject.toml                    # Project metadata + dependencies
├── README.md                         # Methods, experiments, results table
├── CLAUDE.md                         # AI assistant context (deprecated)
├── HISTORY.md                        # Development log
├── PROGRESS_REPORT_APR_2026.md       # Apr 9, 2026 status report
├── Makefile                          # Convenience targets
└── .gitignore                        # Excludes checkpoints, .venv, .coverage
```

---

## 5. Key Components

### 1. **gaze_guidance.py** (Core Contribution)
- **Purpose**: Main GazeDiffuse algorithm
- **Key Functions**:
  - `gaze_guided_diffuse()` — generic implementation (works with HF masked LMs)
  - `gaze_guided_diffuse_mdlm()` — native MDLM API (uses actual noise schedule)
  - `confidence_schedule()` — linear reveal schedule (reveal ~equal tokens per step)
  - `generate_samples()` — batch generation with logging
- **Testing**: 11 unit + integration tests (80% coverage)

### 2. **gaze_predictor.py** (Experiment 2 implementation)
- **Purpose**: BERT-base trained on GECO for fixation prediction
- **Architecture**: [CLS] pooling + linear regressor (output: fixation duration ms)
- **Key Methods**:
  - `score_tokens()` — score all positions in a sequence
  - `score_vocabulary()` — score top-k candidates at a position (used in guidance)
- **Training Loop**: AdamW + warmup + decay scheduler, Spearman correlation eval
- **Current Best**: r=0.241 (epoch 2, no improvement with extended training)

### 3. **ar_baseline.py** (Experiment 3 implementation)
- **Purpose**: Sauberli et al. replication on GPT-2 medium
- **Algorithm**: At each AR step, top-k re-ranking via `score = log P + λ * gaze`
- **Status**: Implemented & tested, results show **opposite-to-expected behavior** (weak predictor signal)
- **Insight for paper**: Demonstrates weak gaze + sequential guidance = unreliable; parallel guidance expected to be more robust

### 4. **metrics.py** (Evaluation across all 5 experiments)
- **FKGL**: Flesch-Kincaid Grade Level (primary readability metric)
- **ARI**: Automated Readability Index (secondary confirmation)
- **Self-PPL**: Perplexity under frozen base LM (fluency/coherence)
- **FK Sentence Variance**: **KEY metric** — variance of FKGL across sentences (tests global coherence claim)
- **MAUVE**: Distributional similarity to unguided baseline (fluency preservation)

### 5. **models/mdlm_wrapper.py** (Model abstraction)
- **MDLMWrapper**: Loads MDLM from checkpoint, provides clean API:
  - `get_log_probs(x, t)` — log probabilities at noise level t
  - `get_timesteps(num_steps)` — denoising schedule (1.0 → eps)
  - `create_masked_input()` — prompt + mask initialization
- **LLaDAWrapper**: HuggingFace loader for LLaDA 8B (4-bit quantization support)

### 6. **data/geco.py** (GECO corpus handling)
- **Format**: 5,031 sentences, 14 participants, 473K word-level examples
- **Key Extraction**: [5-token left | target | 5-token right] windows + fixation duration labels
- **Subject-level CV**: 5-fold splits (leave-participant-out), prevents data leakage
- **Normalization**: Log-transform & z-score fixation durations for training

---

## 6. Data & Models

### Datasets

| Dataset | Source | Size | Use | Status |
|---------|--------|------|-----|--------|
| **GECO** | eye-tracking corpus | 5,031 sentences, 14 participants, 473K examples | Train/eval gaze predictor | Downloaded, processed |
| **50 Shared Prompts** | custom diverse seeds | 50 prompts (10-20 tokens each) | Consistent evaluation across all experiments | Implemented |
| **OpenWebText** | large-scale corpus | ~40GB (not locally downloaded) | MDLM baseline PPL, unguided reference | HPC download needed |

### Model Architectures

| Model | Role | Params | Status |
|-------|------|--------|--------|
| BERT-base-uncased | Gaze predictor backbone | 110M | Trained (r=0.241) |
| GPT-2 medium | AR baseline comparison | 355M | Loaded from HF |
| MDLM (Sahoo et al.) | Core generation model, masked diffusion | ~300M | Checkpoint in submodule (NeurIPS 2024) |
| LLaDA 8B (Nie et al.) | Large-scale masked diffusion | 8B | HF loader ready (NeurIPS 2025) |

### Evaluation Metrics

| Metric | Interpretation | Paper Role |
|--------|---|---|
| **FKGL** | Grade level (lower = easier, range typically 0–20) | Primary — shows guidance shifts difficulty |
| **ARI** | Alternative readability index | Secondary confirmation |
| **FK Sentence Variance** | Std dev of FKGL across sentences | **Key claim**: parallel guidance → lower variance |
| **Self-PPL** | Perplexity under frozen language model | Coherence preservation (higher = worse) |
| **MAUVE** | Distributional divergence from baseline | Fluency preservation (higher = better) |

### Results Summary (as of April 9, 2026)

| Experiment | Status | Key Finding |
|-----------|--------|-------------|
| 1. MDLM baseline PPL | Not started (blocked on HPC account) | Reference PPL on OpenWebText |
| 2. Gaze predictor training | **COMPLETE** | Spearman r=0.241 (plateaus at epoch 2) |
| 3. AR baseline (GPT-2) | **COMPLETE** | Weak predictor → **opposite-expected results** (lam=-1 makes text harder, not easier) |
| 4. **GazeDiffuse on MDLM** | Not started (blocked) | **Main contribution** — test parallel guidance hypothesis |
| 5. GazeDiffuse on LLaDA 8B | Not started (blocked) | Scalability demonstration |

---

## 7. Development Setup

### Installation (Local)

```bash
git clone https://github.com/<org>/gaze-diffuse.git
cd gaze-diffuse
git submodule update --init --recursive
pip install -e ".[dev]"
python -m pytest tests/ -v  # Verify 194 tests pass
```

**Environment Requirements**:
- Python 3.9+
- CUDA 12+ (for GPU) or MPS (macOS Silicon)
- ~8 GB GPU RAM minimum (MDLM inference), ~16 GB for training

### Setup on NYU Torch HPC

```bash
ssh rs9174@login.torch.hpc.nyu.edu
cd $SCRATCH
git clone <repo-url> gaze-diffuse && cd gaze-diffuse
bash scripts/setup_hpc.sh        # Conda env + all deps
bash scripts/download_data.sh     # GECO corpus
bash scripts/download_checkpoints.sh  # MDLM-OWT (~1.2 GB)
```

### Running Experiments

```bash
# Locally (for smoke tests)
python -m src.gaze_predictor --data_dir data/geco --epochs 3
python -m src.ar_baseline --lam -1.0 --n_samples 10

# On HPC cluster
sbatch scripts/slurm/exp2_gaze_predictor.slurm
sbatch scripts/slurm/exp3_ar_baseline.slurm
sbatch scripts/slurm/exp4_gazediffuse_mdlm.slurm
sbatch scripts/slurm/exp5_gazediffuse_llada.slurm

# Evaluate results
python -m src.metrics \
    --input results/gazediffuse_lam-1.0.jsonl \
    --reference results/gazediffuse_lam0.0.jsonl
```

### Testing

```bash
pytest tests/ -v                 # All 194 tests
pytest tests/ -m unit            # Fast unit tests only
pytest tests/ --cov=src          # Coverage report
```

**Test Categories**:
- **Unit** (no GPU/data): model initialization, config parsing, utility functions
- **Integration** (may need GPU): end-to-end sampling pipelines
- **Slow** (full model loading): actual MDLM/LLaDA inference tests

---

## 8. Current State (April 2026)

### What's Working

✓ **Complete source code**: 769 LOC across 7 modules, all testable locally
✓ **Gaze predictor (Exp 2)**: Trained to convergence (r=0.241), best checkpoint saved
✓ **AR baseline (Exp 3)**: Fully implemented & tested, results expose weak signal issue
✓ **Test infrastructure**: 194 passing tests, 69% coverage, pytest + conftest fixtures
✓ **Evaluation pipeline**: FKGL, ARI, MAUVE, self-PPL, FK variance all implemented
✓ **HPC integration**: 5 SLURM scripts ready, data download scripts functional
✓ **Paper scaffold**: LaTeX template (EMNLP format) with figure/table placeholders

### What's Incomplete / Blocked

✗ **Experiment 1** (MDLM baseline): Requires ~2 hours on RTX8000, needs HPC account
✗ **Experiments 4 & 5** (Main contribution): Require HPC GPU access, blocked on account
✗ **Results table population**: All main metrics (λ × steps grid) depend on HPC runs
✗ **MDLM/LLaDA integration**: Model loading tested in isolation, not end-to-end
✗ **Paper writing**: Scaffold exists, results needed before drafting
✗ **Pre-commit hooks**: Not configured (linting + tests on git push)

### Critical Issues

1. **HPC Account Blocker** (CRITICAL):
   - No project account on Torch cluster (`rs9174@login.torch.hpc.nyu.edu` exists but no compute access)
   - Blocks all 3 GPU experiments (~22 hours total runtime needed)
   - Prof. Zhang's group must submit account request to HPC team

2. **Gaze Predictor Signal Weak**:
   - Spearman r=0.241 vs. Sauberli et al. r~0.3–0.4
   - Causes AR baseline to produce opposite-expected results (actually useful negative result for paper)
   - Hypothesis: Need different preprocessing, context window, or accept current performance

3. **Extended Training Hang**:
   - Second gaze predictor run (10 epochs) got stuck on MPS after 12+ hours
   - PyTorch MPS memory leak — no `torch.mps.empty_cache()` between epochs
   - Best checkpoint intact (v2), but validates r=0.241 is convergence point

### Timeline & Milestones

| When | What | Owner | Status |
|------|------|-------|--------|
| Mar 2026 | Setup + MDLM baseline + gaze predictor | Rahil/Siddhant | BLOCKED (HPC) |
| Apr 2026 | Full experiment grid + LLaDA scale-up | Both | IN PROGRESS (local) |
| May 2026 | Paper writing + ARR submission | Rahil | Awaiting results |
| May 15 | NeurIPS stretch submission | Rahil | Depends on May timeline |

---

## Summary

**GazeDiffuse** is a research-quality codebase implementing gaze-guided generation in masked diffusion models. All five experiments are fully architected; local work (Exp 2, 3) confirms the gaze signal is weak but reveals important insights about AR vs. parallel guidance. **The single blocker is HPC account access** — without it, the main contribution (Exp 4–5) cannot be validated. Once account is granted, ~22 GPU-hours will produce the full results table needed for EMNLP/NeurIPS submission by May.
