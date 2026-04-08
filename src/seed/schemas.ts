import { z } from "zod";

// --- Profile ---
export const ProfileSchema = z
  .object({
    full_name: z.string(),
    current_title: z.string(),
    location: z.string(),
    email: z.string(),
    phone: z.string().optional(),
    summary_1line: z.string(),
    summary_3line: z.string(),
    target_roles: z
      .object({
        primary: z.array(z.string()).default([]),
        secondary: z.array(z.string()).default([]),
        selective: z.array(z.string()).default([]),
        avoid: z.array(z.string()).default([]),
      })
      .passthrough(),
    positioning: z.string(),
    differentiators: z.array(z.string()).default([]),
    industries: z.array(z.string()).default([]),
    work_authorization: z.string().optional(),
    preferred_locations: z.array(z.string()).default([]),
    work_mode_preference: z.string().optional(),
    last_updated: z.string().optional(),
  })
  .passthrough();

export type Profile = z.infer<typeof ProfileSchema>;

// --- Experience ---
const ExperienceEntrySchema = z
  .object({
    id: z.string(),
    company: z.string(),
    title: z.string(),
    team: z.string().optional(),
    location: z.string().optional(),
    start_date: z.string(),
    end_date: z.string().nullable().default(null),
    tech_stack: z.array(z.string()).default([]),
    scope: z.string().optional(),
    bullets: z.array(z.string()).default([]),
    metrics: z.array(z.string()).default([]),
    links: z
      .array(z.object({ name: z.string(), url: z.string() }))
      .default([]),
    proofs: z.array(z.string()).default([]),
  })
  .passthrough();

export const ExperienceFileSchema = z.object({
  entries: z.array(ExperienceEntrySchema),
});

export type ExperienceEntry = z.infer<typeof ExperienceEntrySchema>;

// --- Education ---
const EducationEntrySchema = z
  .object({
    id: z.string(),
    institution: z.string(),
    degree: z.string(),
    major: z.string(),
    location: z.string().optional(),
    start_date: z.string(),
    end_date: z.string(),
    gpa: z.string().optional(),
    relevant_coursework: z.array(z.string()).default([]),
    honors: z.array(z.string()).default([]),
    thesis_project: z.string().optional(),
    activities: z.array(z.string()).default([]),
  })
  .passthrough();

export const EducationFileSchema = z.object({
  entries: z.array(EducationEntrySchema),
});

export type EducationEntry = z.infer<typeof EducationEntrySchema>;

// --- Skills ---
const SkillEntrySchema = z
  .object({
    name: z.string(),
    level: z.string(),
    evidence: z.array(z.string()).default([]),
  })
  .passthrough();

export const SkillsFileSchema = z
  .object({
    languages: z.array(SkillEntrySchema).default([]),
    frameworks: z.array(SkillEntrySchema).default([]),
    systems: z.array(SkillEntrySchema).default([]),
    data: z.array(SkillEntrySchema).default([]),
    ml: z.array(SkillEntrySchema).default([]),
    cloud: z.array(SkillEntrySchema).default([]),
    tools: z.array(SkillEntrySchema).default([]),
    other: z.array(SkillEntrySchema).default([]),
  })
  .passthrough();

export type SkillsFile = z.infer<typeof SkillsFileSchema>;

// --- Projects ---
const ProjectEntrySchema = z
  .object({
    id: z.string(),
    name: z.string(),
    type: z.string(),
    dates: z.string().optional(),
    repo_link: z.string().optional(),
    demo_link: z.string().optional(),
    paper_link: z.string().optional(),
    stack: z.array(z.string()).default([]),
    problem: z.string().optional(),
    approach: z.string().optional(),
    results: z.string().optional(),
    bullets: z.array(z.string()).default([]),
    metrics: z.array(z.string()).default([]),
    screenshots: z.array(z.string()).default([]),
    proofs: z.array(z.string()).default([]),
  })
  .passthrough();

export const ProjectsFileSchema = z.object({
  projects: z.array(ProjectEntrySchema),
});

export type ProjectEntry = z.infer<typeof ProjectEntrySchema>;

// --- Metrics ---
const MetricEntrySchema = z
  .object({
    id: z.string(),
    context: z.string(),
    metric_name: z.string(),
    value: z.string(),
    unit: z.string(),
    timeframe: z.string().optional(),
    methodology_note: z.string().optional(),
    confidence: z.string(),
    source_reference: z.string().optional(),
  })
  .passthrough();

export const MetricsFileSchema = z.object({
  metrics: z.array(MetricEntrySchema),
});

export type MetricEntry = z.infer<typeof MetricEntrySchema>;

// --- Stories (STAR) ---
const StoryEntrySchema = z
  .object({
    id: z.string(),
    title: z.string(),
    category: z.string(),
    subcategory: z.string().optional(),
    tags: z.array(z.string()).default([]),
    difficulty: z.string().optional(),
    business_impact: z.string().optional(),
    situation: z.string(),
    task: z.string(),
    action: z.string(),
    result: z.string(),
    best_for_roles: z.array(z.string()).default([]),
    evidence_link: z.string().optional(),
  })
  .passthrough();

export const StoriesFileSchema = z.object({
  stories: z.array(StoryEntrySchema),
});

export type StoryEntry = z.infer<typeof StoryEntrySchema>;

// --- Activities ---
const ActivityEntrySchema = z
  .object({
    id: z.string(),
    role: z.string(),
    organization: z.string(),
    location: z.string().optional(),
    dates: z.string().optional(),
    type: z.string().optional(),
    description: z.string().optional(),
    bullets: z.array(z.string()).default([]),
    skills_demonstrated: z.array(z.string()).default([]),
    relevance: z.string().optional(),
  })
  .passthrough();

export const ActivitiesFileSchema = z.object({
  activities: z.array(ActivityEntrySchema),
});

export type ActivityEntry = z.infer<typeof ActivityEntrySchema>;

// --- Links ---
const LinkDetailSchema = z
  .object({
    url: z.string(),
  })
  .passthrough();

export const LinksFileSchema = z
  .object({
    github: LinkDetailSchema.optional(),
    linkedin: LinkDetailSchema.optional(),
    personal_website: LinkDetailSchema.optional(),
    portfolio: LinkDetailSchema.optional(),
  })
  .passthrough();

export type LinksFile = z.infer<typeof LinksFileSchema>;

// --- Hospitality Companies ---
const CompanyEntrySchema = z
  .object({
    name: z.string(),
    domain: z.string().optional(),
    category: z.string(),
    location: z.string(),
    employee_count: z.number().optional(),
    funding_stage: z.string().optional(),
    last_funding_amount: z.string().nullable().optional(),
    last_funding_date: z.string().nullable().optional(),
    valuation: z.string().optional(),
    lead_investor: z.string().optional(),
    careers_url: z.string().optional(),
    tech_stack: z.array(z.string()).default([]),
    product_description: z.string(),
    kismet_angle: z.string().optional(),
    hiring_signals: z.array(z.string()).default([]),
    priority_score: z.number().optional(),
    remote_friendly: z.boolean().optional(),
  })
  .passthrough();

export const HospitalityCompaniesSchema = z.object({
  companies: z.array(CompanyEntrySchema),
});

export type CompanyEntry = z.infer<typeof CompanyEntrySchema>;

// --- Hospitality Positioning ---
const PositioningCategorySchema = z
  .object({
    label: z.string(),
    target_companies: z.array(z.string()).default([]),
    positioning_angle: z.string(),
    top_deliverables: z
      .array(
        z.object({
          bullet: z.string(),
          tags: z.array(z.string()).default([]),
        })
      )
      .default([]),
    vocabulary: z.array(z.string()).default([]),
    email_hook: z.string().optional(),
  })
  .passthrough();

export const HospitalityPositioningSchema = z
  .object({
    core_positioning: z.string(),
    internships: z
      .array(
        z.object({
          id: z.string(),
          title: z.string(),
          company: z.string(),
          dates: z.string(),
          summary: z.string().optional(),
        })
      )
      .default([]),
    categories: z.record(PositioningCategorySchema),
  })
  .passthrough();

export type HospitalityPositioning = z.infer<typeof HospitalityPositioningSchema>;

// --- Role Families ---
const RoleFamilySchema = z
  .object({
    aliases: z.array(z.string()).default([]),
    keywords: z.array(z.string()).default([]),
    my_strength_bullets: z.array(z.string()).default([]),
  })
  .passthrough();

export const RoleFamiliesSchema = z.object({
  role_families: z.record(RoleFamilySchema),
});

export type RoleFamiliesFile = z.infer<typeof RoleFamiliesSchema>;

// --- Easy Apply Answers ---
export const EasyApplyAnswersSchema = z.record(
  z.record(
    z
      .object({
        answer: z.string().default(""),
        type: z.string().optional(),
        aliases: z.array(z.string()).default([]),
      })
      .passthrough()
  )
);

export type EasyApplyAnswers = z.infer<typeof EasyApplyAnswersSchema>;

// --- CSV Row Schemas ---
export const OutreachRowSchema = z
  .object({
    log_id: z.string(),
    contact_email: z.string(),
    contact_name: z.string(),
    company_name: z.string(),
    email_subject: z.string(),
    status: z.string(),
    date_drafted: z.string().optional(),
    date_sent: z.string().optional(),
    response_type: z.string().optional(),
    needs_followup: z.string().optional(),
  })
  .passthrough();

export type OutreachRow = z.infer<typeof OutreachRowSchema>;

export const ApplicationRowSchema = z
  .object({
    company: z.string(),
    role: z.string(),
    location: z.string().optional(),
    status: z.string(),
    date_applied: z.string().optional(),
    notes: z.string().optional(),
  })
  .passthrough();

export type ApplicationRow = z.infer<typeof ApplicationRowSchema>;
