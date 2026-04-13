---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/gaze-diffuse:765f3fc
ingested_at: 2026-04-12T23:04:19.857Z
parsed_at: 2026-04-12T23:04:19.857Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24ftYGT29ECiMff4cFy"}
compile_progress: null
quarantined_at: 2026-04-13T16:11:50.839Z
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
