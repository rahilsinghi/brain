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
  | "auto_research";

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

export interface BrainConfig {
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
  sources?: {
    github?: {
      min_stars_for_readme: number;
      username: string;
    };
  };
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
