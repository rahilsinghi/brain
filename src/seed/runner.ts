import { join } from "node:path";
import { mkdirSync, existsSync } from "node:fs";
import { parse as parseYaml } from "yaml";
import { writeFrontmatter } from "../frontmatter.js";
import { SeedLogger } from "./log.js";
import { loadYaml, loadCsv } from "./yaml-loader.js";
import {
  ProfileSchema,
  ExperienceFileSchema,
  EducationFileSchema,
  SkillsFileSchema,
  ProjectsFileSchema,
  MetricsFileSchema,
  StoriesFileSchema,
  ActivitiesFileSchema,
  LinksFileSchema,
  HospitalityCompaniesSchema,
  HospitalityPositioningSchema,
  RoleFamiliesSchema,
  EasyApplyAnswersSchema,
  OutreachRowSchema,
  ApplicationRowSchema,
} from "./schemas.js";
import {
  resolveLinks,
  validateWikiFrontmatter,
  type TransformResult,
} from "./wiki-helpers.js";
import { transformProfile } from "./transforms/profile.js";
import { transformExperience } from "./transforms/experience.js";
import { transformProjects } from "./transforms/projects.js";
import { transformSkills } from "./transforms/skills.js";
import { transformCompanies } from "./transforms/companies.js";
import { transformPositioning } from "./transforms/positioning.js";
import { transformStories } from "./transforms/stories.js";
import { transformAnswers } from "./transforms/answers.js";
import { transformTracking } from "./transforms/tracking.js";
import { getUnstructuredFiles, copyToRaw } from "./unstructured.js";

export interface SeedOptions {
  force: boolean;
  only?: string;
}

export function parseArgs(args: string[]): SeedOptions {
  const opts: SeedOptions = { force: false };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--force") opts.force = true;
    if (args[i] === "--only" && args[i + 1]) opts.only = args[++i];
  }
  return opts;
}

export function shouldRunStep(step: string, only: string | undefined): boolean {
  if (!only) return true;
  if (step === "embed") return true;
  return step === only;
}

export async function runSeed(
  vaultRoot: string,
  sourceRoot: string,
  opts: SeedOptions,
  log: SeedLogger = new SeedLogger(),
): Promise<void> {
  const dataDir = join(sourceRoot, "data");
  const trackingDir = join(sourceRoot, "tracking");

  let allResults: TransformResult[] = [];
  let yamlArticleCount = 0;
  let compiledCount = 0;
  let githubCount = 0;
  let gmailCount = 0;
  let warningCount = 0;

  // Step 1: Load & validate YAML/CSV sources
  if (
    shouldRunStep("transforms", opts.only) ||
    shouldRunStep("tracking", opts.only)
  ) {
    log.step("seed", "Loading YAML sources...");

    if (shouldRunStep("transforms", opts.only)) {
      const profile = loadYaml(join(dataDir, "profile.yaml"), ProfileSchema);
      log.load("profile.yaml", 1);

      const experience = loadYaml(
        join(dataDir, "experience.yaml"),
        ExperienceFileSchema,
      );
      log.load("experience.yaml", experience.entries.length);

      const education = loadYaml(
        join(dataDir, "education.yaml"),
        EducationFileSchema,
      );
      log.load("education.yaml", education.entries.length);

      const skills = loadYaml(join(dataDir, "skills.yaml"), SkillsFileSchema);
      const skillCount = Object.values(skills)
        .filter(Array.isArray)
        .reduce((a, b) => a + (b as unknown[]).length, 0);
      log.load("skills.yaml", skillCount);

      const projects = loadYaml(
        join(dataDir, "projects.yaml"),
        ProjectsFileSchema,
      );
      log.load("projects.yaml", projects.projects.length);

      const metrics = loadYaml(
        join(dataDir, "metrics.yaml"),
        MetricsFileSchema,
      );
      log.load("metrics.yaml", metrics.metrics.length);

      const stories = loadYaml(
        join(dataDir, "stories_star.yaml"),
        StoriesFileSchema,
      );
      log.load("stories_star.yaml", stories.stories.length);

      const activities = loadYaml(
        join(dataDir, "activities.yaml"),
        ActivitiesFileSchema,
      );
      log.load("activities.yaml", activities.activities.length);

      const links = existsSync(join(dataDir, "links.yaml"))
        ? loadYaml(join(dataDir, "links.yaml"), LinksFileSchema)
        : {};
      if (existsSync(join(dataDir, "links.yaml")))
        log.load("links.yaml", 1);

      const companies = loadYaml(
        join(dataDir, "hospitality_companies_tier1.yaml"),
        HospitalityCompaniesSchema,
      );
      log.load(
        "hospitality_companies_tier1.yaml",
        companies.companies.length,
      );

      const positioning = loadYaml(
        join(dataDir, "hospitality_positioning.yaml"),
        HospitalityPositioningSchema,
      );
      log.load(
        "hospitality_positioning.yaml",
        Object.keys(positioning.categories).length,
      );

      const roleFamilies = loadYaml(
        join(dataDir, "role_families.yaml"),
        RoleFamiliesSchema,
      );
      log.load(
        "role_families.yaml",
        Object.keys(roleFamilies.role_families).length,
      );

      const answers = loadYaml(
        join(dataDir, "easy_apply_answers.yaml"),
        EasyApplyAnswersSchema,
      );
      log.load("easy_apply_answers.yaml", Object.keys(answers).length);

      // Step 2: Run transforms
      allResults.push(
        ...transformProfile(
          profile,
          education.entries,
          activities.activities,
          links,
        ),
      );
      log.transform("profile", "wiki/people/rahil-singhi.md");

      const expResults = transformExperience(
        experience.entries,
        metrics.metrics,
      );
      allResults.push(...expResults);
      log.transform("experience", expResults.length);

      const projResults = transformProjects(
        projects.projects,
        metrics.metrics,
      );
      allResults.push(...projResults);
      log.transform("projects", projResults.length);

      allResults.push(...transformSkills(skills));
      log.transform("skills", "wiki/concepts/skills-inventory.md");

      const compResults = transformCompanies(companies.companies);
      allResults.push(...compResults);
      log.transform("companies", compResults.length);

      const posResults = transformPositioning(positioning, roleFamilies);
      allResults.push(...posResults);
      log.transform("positioning", posResults.length);

      allResults.push(...transformStories(stories.stories));
      log.transform("stories", "wiki/concepts/star-stories.md");

      allResults.push(...transformAnswers(answers));
      log.transform("answers", "wiki/concepts/easy-apply-answers.md");
    }

    if (shouldRunStep("tracking", opts.only) || !opts.only) {
      const outreach = existsSync(
        join(trackingDir, "outreach_log.csv"),
      )
        ? loadCsv(
            join(trackingDir, "outreach_log.csv"),
            OutreachRowSchema,
          )
        : [];
      const applications = existsSync(
        join(trackingDir, "applications.csv"),
      )
        ? loadCsv(
            join(trackingDir, "applications.csv"),
            ApplicationRowSchema,
          )
        : [];

      const trackResults = transformTracking(outreach, applications);
      allResults.push(...trackResults);
      log.transform("tracking", trackResults.length);
    }
  }

  // Step 3: Resolve links
  if (allResults.length > 0) {
    const resolved = resolveLinks(allResults);
    log.links(resolved.resolvedCount, resolved.unresolvedCount);
    warningCount += resolved.unresolvedCount;
    allResults = [...resolved];
  }

  // Step 4: Validate frontmatter and write files
  if (allResults.length > 0) {
    let validCount = 0;
    let malformedCount = 0;

    for (const result of allResults) {
      const fmMatch = result.content.match(/^---\n([\s\S]*?)\n---\n/);
      if (fmMatch) {
        const fm = parseYaml(fmMatch[1]) as Record<string, unknown>;
        const validation = validateWikiFrontmatter(fm);
        if (validation.valid) {
          validCount++;
        } else {
          malformedCount++;
          log.warn(`${result.filePath}: ${validation.errors.join(", ")}`);
          warningCount++;
        }
      } else {
        malformedCount++;
        log.warn(`${result.filePath}: no frontmatter found`);
        warningCount++;
      }
    }

    log.validate(validCount, malformedCount);

    // Write files to disk
    for (const result of allResults) {
      const fullPath = join(vaultRoot, result.filePath);
      mkdirSync(join(fullPath, ".."), { recursive: true });
      const fmMatch = result.content.match(/^---\n([\s\S]*?)\n---\n/);
      if (fmMatch) {
        const fm = parseYaml(fmMatch[1]) as Record<string, unknown>;
        const body = result.content.slice(fmMatch[0].length);
        writeFrontmatter(fullPath, fm, body);
      }
    }

    yamlArticleCount = allResults.length;
    log.step("seed", `${yamlArticleCount} articles written to wiki/`);
  }

  // Step 5: Batch compile unstructured docs
  if (shouldRunStep("compile", opts.only)) {
    const unstructuredFiles = getUnstructuredFiles(sourceRoot);
    if (unstructuredFiles.length > 0) {
      const rawPaths = copyToRaw(unstructuredFiles, vaultRoot, opts.force);
      log.step(
        "compile",
        `${rawPaths.length} unstructured docs copied to raw/articles/ for compilation`,
      );
      compiledCount = rawPaths.length;
    }
  }

  // Step 6: GitHub sync
  if (shouldRunStep("github", opts.only)) {
    log.step(
      "sync",
      "GitHub sync — use /brain-sync --sources github for full sync",
    );
    try {
      const { createGithubSource } = await import("../sources/github.js");
      const { SyncOrchestrator } = await import(
        "../sources/orchestrator.js"
      );
      const { JsonSyncStateStore } = await import("../sources/state.js");
      const stateStore = new JsonSyncStateStore(
        join(vaultRoot, ".brain", "sync-state.json"),
      );
      const githubSource = createGithubSource();
      const orchestrator = new SyncOrchestrator(vaultRoot, stateStore);
      const report = await orchestrator.run([githubSource]);
      githubCount =
        (report.results["github"] as { itemsIngested?: number } | undefined)
          ?.itemsIngested ?? 0;
      log.sync("GitHub", `${githubCount} items ingested`);
      const state = stateStore.load("github");
      if (state.last_poll) log.verify("github", state.last_poll);
    } catch (err) {
      log.warn(
        `GitHub sync failed: ${err instanceof Error ? err.message : String(err)}`,
      );
      warningCount++;
    }
  }

  // Step 7: Gmail sync (requires MCP)
  if (shouldRunStep("gmail", opts.only)) {
    log.step(
      "sync",
      "Gmail sync requires MCP tools — run /brain-sync --sources gmail in Claude Code",
    );
  }

  // Step 8: Embedding sync
  if (shouldRunStep("embed", opts.only)) {
    log.step("embed", "Syncing wiki articles to vector store...");
    try {
      const { VectorStore } = await import("../embedder/vector-store.js");
      const { syncAll } = await import("../embedder/sync.js");
      const store = new VectorStore(join(vaultRoot, ".lancedb"));
      await store.init();
      const embedResult = await syncAll(vaultRoot, store);
      log.embed(embedResult.synced + embedResult.skipped, embedResult.chunks);
    } catch (err) {
      log.warn(
        `Embedding sync failed: ${err instanceof Error ? err.message : String(err)}`,
      );
      warningCount++;
    }
  }

  // Step 9: Summary
  log.summary({
    yaml: yamlArticleCount,
    compiled: compiledCount,
    github: githubCount,
    gmail: gmailCount,
    totalEmbedded:
      yamlArticleCount + compiledCount + githubCount + gmailCount,
    chunks: 0,
    warnings: warningCount,
    errors: 0,
  });
}
