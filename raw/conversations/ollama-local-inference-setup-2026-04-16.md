---
status: processed
source_type: conversation
ingested_at: 2026-04-16T22:34:00Z
parsed_at: 2026-04-16T22:34:00Z
compiled_to: "[[Ollama Local Inference Setup on Mac Studio M3 Ultra]]"
processed_at: 2026-04-17T02:47:20.425Z
retry_count: 0
last_error: null
compile_progress: null
---



# Ollama Local Inference Setup on Mac Studio M3 Ultra

Reference for running production LLM inference on Apple Silicon with 96GB unified memory. Applies to the brain daemon as of 2026-04-16.

## Hardware

Apple M3 Ultra, 96GB unified memory, 60 GPU cores, 819 GB/s memory bandwidth. Running macOS with Ollama 0.19+ and Metal-backed MLX framework.

## Model Selection Rationale

Evaluated against cloud models (Gemini 2.5 Flash, GPT-4o, Claude Sonnet 4.6) for compilation + query workload. Chose three-tier local stack:

### Tier 1: qwen3:32b (default)
- 20GB RAM, Q4_K_M quantization
- ~27 tok/s decode on M3 Ultra
- MMLU 82, HumanEval 84 — effectively parity with Gemini 2.5 Flash
- Strong structured JSON output via Ollama's `format` parameter
- **Thinking mode disabled** via `/no_think` prefix (adds ~7s of reasoning tokens otherwise)

### Tier 2: qwen3-coder:30b (code tasks)
- 18GB RAM, Q4_K_M, Mixture-of-Experts (3B active per token)
- ~58 tok/s decode (MoE runs faster than dense 30B)
- Current SOTA open-source coding model, beats Llama 3.3 70B on HumanEval/MBPP
- Routes via `OLLAMA_MODEL_CODER` env var when request asks for "coder" alias

### Tier 3: llama3.3:70b (reasoning)
- 43GB RAM, Q4_K_M
- ~22 tok/s decode (better than predicted 14 tok/s on M3 Ultra)
- MMLU 84, stronger multi-step reasoning than Qwen3 32B
- Used for high-stakes synthesis queries

### Embeddings: nomic-embed-text (v1.5)
- 0.3GB RAM, 768 dimensions (same as xenova version — zero LanceDB schema change)
- Runs on Metal GPU via Ollama `/api/embed`
- 10-100x faster than xenova/transformers WASM CPU path

**Total RAM footprint:** ~82GB for all four models loaded concurrently. `OLLAMA_MAX_LOADED_MODELS=3` keeps hot models resident.

## Models Considered But Rejected

- **Qwen3 72B / 80B** — Don't exist. Qwen3 goes 30B, 32B, 235B. Source of confusion: Qwen2.5-72B is older.
- **GPT-OSS 120B** — Fits (~65GB) but reasoning-focused, slower per answer. Would force dropping llama3.3:70b. Not worth for current workload.
- **Qwen3 235B MoE** — 130GB+ RAM, won't fit. Would require CPU offload (drops to 3-5 tok/s).
- **Q3 quantization** — Saves memory but measurable quality loss (~5-10% on benchmarks). 96GB is plenty for Q4/Q5.

## Brain Integration Points

### LLM provider (`src/llm/provider.ts`)
```
createOllamaProvider() → uses http://127.0.0.1:11434/api/generate
  - Native JSON mode (format: "json") for compilation
  - Model alias routing: "coder"/"reasoning"/default
  - /no_think prefix for qwen3:* models
```

### Provider fallback chain
`BRAIN_LLM_PROVIDER=auto` tries **Ollama → Gemini → Anthropic**. If Ollama is unreachable (daemon not running, model not loaded), auto-falls back. Detects errors via message substrings: `"ollama api error"`, `"fetch failed"`, `"econnrefused"`.

### Embedder (`src/embedder/embedder.ts`)
Auto-selects backend via health check on first call. Persists selection for session. If Ollama responds to `/api/tags` within 2s, uses Ollama. Otherwise falls back to xenova. Batch endpoint uses Ollama's multi-input API.

## Env Vars

```
BRAIN_LLM_PROVIDER=auto
OLLAMA_BASE_URL=http://127.0.0.1:11434
OLLAMA_MODEL_DEFAULT=qwen3:32b
OLLAMA_MODEL_CODER=qwen3-coder:30b
OLLAMA_MODEL_REASONING=llama3.3:70b
OLLAMA_EMBED_MODEL=nomic-embed-text
OLLAMA_DISABLE_THINKING=true  # default: true for qwen3:*
BRAIN_EMBEDDER_PROVIDER=auto
```

## Benchmarks

Query latency end-to-end (brain_query → synthesis → response):
- **Gemini 2.5 Flash (cloud)**: 2-10s, avg ~4.4s
- **Qwen3 32B local, thinking enabled**: 26s
- **Qwen3 32B local, /no_think**: 19s
- **Llama 3.3 70B local**: ~28s (slower but higher quality)

Pure generation speed (tok/s):
- Qwen3 32B: 27 tok/s
- Qwen3-Coder 30B: 58 tok/s (MoE)
- Llama 3.3 70B: 22 tok/s

## Operational Notes

- **Daemon bind** — `api.host: "0.0.0.0"` in `.brain/config.yaml` so Tailscale-connected devices can reach it. Private Tailscale ACLs prevent public exposure.
- **Cost** — $0/month. Previously ~$1/month on Gemini (cheap but cumulative).
- **Privacy** — All inference local. Meeting transcripts, Maison work, personal data never leave the Mac Studio.
- **No rate limits** — Can process 1,500+ pending drops in one shot with no throttling.
- **Fallback preserved** — Gemini and Anthropic keys still configured. If Ollama goes down, cloud providers auto-activate.

## When to Use Each Tier

| Query type | Model |
|------------|-------|
| Simple classification | qwen3:32b |
| Compilation (raw → wiki) | qwen3:32b |
| brain_query / synthesis | qwen3:32b |
| Code refactor/review | qwen3-coder:30b |
| Multi-hop reasoning | llama3.3:70b |
| Embedding | nomic-embed-text |

## Related

[[Mac Studio M3 Ultra]]
[[Brain Project]]
[[Ollama]]
[[Qwen3 32B]]
[[Llama 3.3 70B]]
[[Qwen3 Coder]]
[[LLM Provider Abstraction]]
[[Tailscale]]
