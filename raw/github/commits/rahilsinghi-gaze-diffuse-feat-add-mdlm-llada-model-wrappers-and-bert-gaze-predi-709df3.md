---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/gaze-diffuse:765f3fc
ingested_at: 2026-04-13T17:05:37.800Z
parsed_at: 2026-04-13T17:05:37.800Z
compiled_to: "[[Integration of MDLM/LLaDA Wrappers and BERT Gaze Predictor in Gaze-Diffuse]]"
processed_at: 2026-04-13T17:41:55.246Z
retry_count: 0
last_error: null
compile_progress: null
---



# feat: add MDLM/LLaDA model wrappers and BERT gaze predictor

- **Repo:** rahilsinghi/gaze-diffuse
- **SHA:** 765f3fc
- **Date:** 2026-03-12T18:38:40Z
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +724
- **Deletions:** -0

- src/models/mdlm_wrapper.py: MDLMWrapper (loads MDLM checkpoint,
  provides get_log_probs, get_timesteps, create_masked_input) and
  LLaDAWrapper (HuggingFace AutoModel, mask_id=126336, get_logits)
  for unified diffusion model inference
- src/gaze_predictor.py: BERT-base fixation duration predictor fine-tuned
  on GECO corpus. GazePredictor with score_tokens() and score_vocabulary()
  methods, training loop, and checkpoint loading. Input format:
  [CLS] left_ctx [SEP] target [SEP] right_ctx [SEP]
