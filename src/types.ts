export type RawStatus =
  | "unparsed"
  | "parsing"
  | "pending"
  | "processing"
  | "processed"
  | "failed"
  | "quarantined";

export type SourceType =
  | "file_drop"
  | "markpush"
  | "github"
  | "gmail"
  | "calendar"
  | "voice"
  | "conversation"
  | "auto_research"
  | "seed_yaml"
  | "seed_csv"
  | "api"
  | "git-commits"
  | "graphify";

export type Author = "ai" | "human";

export interface RawFrontmatter {
  status: RawStatus;
  source_type: SourceType;
  source_id: string | null;
  ingested_at: string;
  parsed_at: string | null;
  compiled_to: string | null;
  processed_at: string | null;
  retry_count: number;
  last_error: string | null;
  compile_progress: string | null;
  requires_manual_review?: boolean;
}

export interface WikiFrontmatter {
  title: string;
  author: Author;
  created_at: string;
  last_ai_edit: string;
  last_human_edit: string | null;
  last_embedded_hash: string | null;
  sources: string[];
  tags: string[];
}

export interface QuarantineFrontmatter {
  status: "quarantined";
  source_type: SourceType;
  ingested_at: string;
  retry_count: number;
  last_error: string;
  quarantined_at: string;
}

export type CompileStrategy = "single" | "chunked" | "staged" | "manual_review";

export type Cluster = "personal" | "work" | "life" | "language";

export interface TranscriptionConfig {
  provider: "local" | "openai";
  local_model: string;
  openai_model: string;
}

export interface VoiceConfig {
  clusters: Cluster[];
  default_cluster: Cluster;
  classify_model: string;
}

export interface ApiConfig {
  port: number;
  host: string;
  synthesise_timeout_ms: number;
  default_top_k: number;
}

export interface GraphifyConfig {
  repos: string[];
  semantic: boolean;
  cron_schedule: string;
  max_nodes_per_repo: number;
  output_dir: string;
}

export interface TelegramConfig {
  bot_token: string | null;
  allowed_user_ids: number[];
  poll_timeout_s: number;
}

export interface BrainConfig {
  api: ApiConfig;
  telegram: TelegramConfig;
  transcription: TranscriptionConfig;
  voice: VoiceConfig;
  daemon: { log_level: string };
  watchers: {
    raw_dir: string;
    wiki_dir: string;
    voice_dir: string;
  };
  cron: {
    mcp_sources: string;
    calendar: string;
    lint_heal: string;
  };
  compile: {
    max_single_pass_words: number;
    max_chunked_words: number;
    max_staged_words: number;
    max_retries: number;
  };
  heal: {
    max_operations_per_run: number;
    max_web_searches_per_run: number;
    human_edit_cooldown_hours: number;
  };
  query: {
    default_top_k: number;
    novelty_threshold: number;
  };
  embeddings: {
    model: string;
    provider: string;
  };
  visual: {
    marp_theme: string;
    matplotlib_rc: string;
    mermaid_theme: string;
  };
  graph: {
    explorer_repo_path: string;
    umap_seed: number;
    cache_path: string;
  };
  sources?: {
    github?: {
      min_stars_for_readme: number;
      username: string;
    };
  };
  graphify?: GraphifyConfig;
}

export interface WikiChunk {
  id: string;
  filePath: string;
  breadcrumb: string;
  heading: string;
  content: string;
  sectionHash: string;
  vector?: number[];
}

export type LintIssueType =
  | "broken_link"
  | "contradiction"
  | "stale_content"
  | "orphan_article"
  | "missing_coverage"
  | "format_issue";

export interface LintIssue {
  type: LintIssueType;
  filePath: string;
  description: string;
  relatedFiles?: string[];
  severity: "warning" | "error";
}

export type HealAction =
  | "direct_edit"
  | "append_synthesis"
  | "proposal"
  | "create_article"
  | "flag_contradiction"
  | "skip";

export interface HealResult {
  action: HealAction;
  filePath: string;
  description: string;
  success: boolean;
}

export interface LintHealStats {
  lintIssuesFound: number;
  healOperationsRun: number;
  webSearchesUsed: number;
  connectionsDiscovered: number;
  filesModified: string[];
}

export interface GraphNode {
  id: string;
  title: string;
  tags: string[];
  category: string;
  source_type: string;
  created_at: string;
  connection_count: number;
  x: number;
  y: number;
  z: number;
  // --- fusion fields (all optional for backward compat) ---
  layer?: "wiki" | "code";
  file_type?: "code" | "document" | "rationale";
  source_file?: string;
  source_location?: string;
  community?: number;
  is_god_node?: boolean;
  confidential?: boolean;
  repo?: string;
}

export interface GraphLink {
  source: string;
  target: string;
  relation?: string;
  confidence?: "EXTRACTED" | "INFERRED" | "AMBIGUOUS";
  confidence_score?: number;
}

export interface GraphCache {
  generated_at: string;
  node_count: number;
  nodes: GraphNode[];
  links: GraphLink[];
}
