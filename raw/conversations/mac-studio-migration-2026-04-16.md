---
status: processed
source_type: conversation
ingested_at: 2026-04-16T22:30:00Z
parsed_at: 2026-04-16T22:30:00Z
compiled_to: "[[Brain Mac Studio Migration + Quality Overhaul (2026-04-16)]]"
processed_at: 2026-04-17T02:49:21.693Z
retry_count: 0
last_error: null
compile_progress: null
---



# Brain Mac Studio Migration + Quality Overhaul (2026-04-16)

Major architectural migration from MacBook (M4 Pro, 24GB) to Mac Studio (M3 Ultra, 96GB, 60 GPU cores, 1TB SSD) as always-on brain server. Accessible from any device via Tailscale. Replaced cloud Gemini with local Ollama inference. Massive data quality fixes.

## Hardware & Infrastructure

- **Mac Studio** — M3 Ultra, 96GB unified memory, 60 GPU cores, 819 GB/s memory bandwidth, 1TB SSD
- **Role** — Always-on brain server, plugged in 24/7. MacBook, iPhone, any device connects to it remotely.
- **Migration method** — Apple Migration Assistant over Thunderbolt. Copied everything: apps, Homebrew, dotfiles, `~/.claude` symlink, `.brain/.env`, GCP creds, LanceDB, launchd plists.
- **Tailscale** — Installed on both machines. MagicDNS hostname: `rahils-mac-studio`. Tailscale IP: `100.89.142.53`. Private ACL-protected network.
- **Daemon binding** — Changed `api.host` from `127.0.0.1` to `0.0.0.0` in `.brain/config.yaml` so Tailscale can reach the brain daemon remotely.

## Ollama Local Inference Stack

Installed Ollama with MLX backend (Apple Silicon, 93% faster than llama.cpp). Four models loaded simultaneously in ~80GB of RAM:

| Model | Size | Purpose | Speed (M3 Ultra) |
|-------|------|---------|------------------|
| qwen3:32b | 20GB | Default compilation + query synthesis | 27 tok/s |
| qwen3-coder:30b | 18GB | Code understanding (MoE, 3B active) | 58 tok/s |
| llama3.3:70b | 43GB | Deep reasoning / high-stakes synthesis | 22 tok/s |
| nomic-embed-text | 0.3GB | Vector embeddings (GPU-accelerated) | Very fast |

**Qwen3 thinking mode disabled** — prepends `/no_think` to prompts for qwen3:* models to skip internal reasoning tokens, dropping query latency from 26s to 19s.

## Brain Code Changes

### New LLM provider (`src/llm/provider.ts`)
Added `createOllamaProvider()` using Ollama's `/api/generate` endpoint with native structured JSON support. Provider preference expanded from `anthropic|gemini|auto` to `anthropic|gemini|ollama|auto`. Auto mode fallback chain is now: **Ollama → Gemini → Anthropic**. Model routing via env vars:
- `OLLAMA_MODEL_DEFAULT=qwen3:32b`
- `OLLAMA_MODEL_CODER=qwen3-coder:30b`
- `OLLAMA_MODEL_REASONING=llama3.3:70b`

### Embedder (`src/embedder/embedder.ts`)
Rewrote to support Ollama's `/api/embed` endpoint (GPU-accelerated via Metal) with xenova/transformers WASM as fallback. Health check on first call auto-selects backend. Batch endpoint uses Ollama's multi-input API.

### Retrieval pollution fix (`src/embedder/vector-store.ts`, `src/query/synthesize.ts`)
Added `excludeFolders` / `includeFolders` options to `hybridSearch()`. Default search now excludes `wiki/codebase/` to prevent code summaries from drowning out career/decision articles. Auto-detects code intent in queries (regex matches "code", "function", "class", "refactor", etc.) and includes codebase folder when relevant.

## Data Quality Overhaul

### Re-embed 1,220 unembedded articles
Discovered 76% of wiki (1,220 of 1,618 articles) had `last_embedded_hash: null` — meaning 76% of knowledge was invisible to `brain_query`. Wrote `scripts/bulk-reembed.ts` that directly calls the daemon's `syncFile` pipeline (chunker + fact extractor + Ollama embed). Completed in 19 minutes at 1.1 articles/sec on GPU.

**Result: 0 failed, 5,967 new chunks added (total ~7,587 chunks in LanceDB, 905MB).**

### Failed drop resurrection
Found 125 raw drops with `status: failed`, all from Anthropic auth errors (exhausted API). Sources:
- 76 maison-agent graphify community drops (highest-value recovery — actual work repo knowledge)
- 42 gmail emails (missed recent correspondence)
- 3 API articles, 2 portfolio drops, 2 voice notes

Wrote `scripts/reset-failed-drops.ts` that resets `status: pending` and clears `retry_count`/`last_error`. Daemon picks them up via local Ollama, no more auth errors.

### Dedup scan
Ran `scripts/run-dedup.ts` against wiki. **0 duplicate groups found** — the earlier cleanup (removing 2,581 commit-noise articles) left a clean knowledge base.

### Graphify articles moved to wiki/codebase/
Identified 466 wiki articles sourced from `raw/graphify/*/` — 29% of total wiki. They were polluting search results (273 maison-agent code summaries vs ~15 career articles for "Maison" queries = 18:1 dilution).

Wrote `scripts/move-graphify-to-codebase.ts` that walks wiki/, extracts repo name from `sources` frontmatter (matches `raw/graphify/{repo}/`), moves to `wiki/codebase/{repo}/`, and re-embeds at new path. Breakdown:
- maison-agent: 273
- portfolio: 72
- brain: 70
- career-datacenter: 24
- karen: 19
- ouroboros: 8

Updated `.obsidian/graph.json` search filter to `-path:codebase ` so Obsidian graph view also hides code articles.

## Completion State

| Component | Status |
|-----------|--------|
| Mac Studio provisioned | Complete |
| Tailscale remote access | Complete (rahils-mac-studio:3577 from MacBook) |
| MacBook daemon | Unloaded (cold standby) |
| MacBook MCP points to Mac Studio | Complete |
| 4 Ollama models loaded | Complete |
| Ollama provider with auto-fallback | Merged to master (commits af4f4de, 9a98936) |
| Embedder (Ollama + xenova fallback) | Merged to master |
| Bulk re-embed | Complete (100% coverage) |
| Failed drop reset | Complete (125 drops re-queued) |
| Dedup scan | Complete (0 duplicates) |
| Graphify → codebase move | In progress |
| Search excludes codebase by default | Merged |

## Performance Metrics

| Metric | Before (MacBook + Gemini cloud) | After (Mac Studio + Ollama) |
|--------|----------------------------------|------------------------------|
| Query latency | 2-10s (cloud round-trip) | 19s (local inference, thinking disabled) |
| LLM cost | <$1/month (Gemini credits) | $0 |
| Embedding | WASM CPU-bound (xenova) | GPU-accelerated (Ollama Metal) |
| Articles embedded | 398 of 1,618 (24%) | 1,618 of 1,618 (100%) |
| LanceDB size | 345MB | 905MB |
| Chunks in store | ~1,600 | ~7,587 |
| Rate limits | Yes (Gemini quota) | None |
| Privacy | Cloud API | Fully local |

## Tradeoffs Accepted

- **Higher query latency** (19s vs 4s cloud) — acceptable because compilation is async, most brain usage is ingestion not interactive query
- **Larger LanceDB** (345MB → 905MB) — 4.7x growth from going from 24% to 100% coverage
- **MacBook becomes thin client** — no more local daemon drain, saves battery

## Key Scripts Added

- `scripts/bulk-reembed.ts` — re-embed all unembedded wiki articles
- `scripts/reset-failed-drops.ts` — resurrect failed raw drops (with `--dry-run` and `--filter`)
- `scripts/run-dedup.ts` — dedup scanner with `--apply` flag
- `scripts/move-graphify-to-codebase.ts` — relocate graphify articles to wiki/codebase/

## Related

[[Brain Project]]
[[Mac Studio M3 Ultra]]
[[Ollama]]
[[Qwen3 32B]]
[[Llama 3.3 70B]]
[[Tailscale]]
[[Graphify]]
[[LanceDB]]
[[brain_query]]
