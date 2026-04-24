
import { Project, Experience, SkillGroup, DebugLog, Education, Certification } from './types';

export const PERSONAL_INFO = {
  name: "Simon Abayomi Olawuyi",
  title: "Full-Stack Engineer",
  location: "Indianapolis, IN",
  phone: "(317) 531-0381",
  email: "nomispeter12@gmail.com",
  summary: "Self-taught full-stack engineer who ships production-grade AI systems, not prototypes. Creator of Oracle Odds AI — a live sports prediction platform with a self-correcting mathematical engine, adaptive learning loop, and international user base — built entirely solo from architecture to deployment. Specializes in backend systems, AI/ML integration, predictive modeling, and building revenue-generating products end-to-end. Motivated by outcomes, not credentials.",
  linkedin: "https://linkedin.com",
  github: "https://github.com/pushthev1be",
  website: "https://www.oracleai.live",
};

export const PROJECTS: Project[] = [
  {
    title: "Oracle Odds AI",
    description: "Production live sports prediction platform with a self-correcting mathematical engine and international user base (US, Nigeria, Ghana). Solo-built, Stripe-monetized, fully deployed.",
    link: "https://www.oracleai.live",
    tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Stripe", "Gemini Flash/Pro", "Docker"],
    features: [
      "Poisson distribution + Dixon-Coles modeling with odds-derived lambdas (70/30 team strength weighting), xG regression, and form-factor adjustments across Premier League, Champions League, NBA, and ATP Tour",
      "Self-correcting adaptive learning loop — calibration bias updates from settled prediction residuals, EMA-weighted team strength blends, and automated model promotion so accuracy compounds over time",
      "Gemini Flash AI enrichment with batch processing (up to 15 matches), live web search grounding for injury/roster verification, and training examples drawn from past prediction hits and misses",
      "18 backend microservices, 18 Supabase edge functions, 13 external API integrations (ESPN, The-Odds-API, Football-Data.org, Smarkets, Pinnacle/BetExplorer, API-Sports) with a 9-table PostgreSQL schema",
      "Stripe-backed tiered subscription system (Free / Basic / Premium / Elite) with daily credit limits, tier-gated features, and Telegram bot + Twitter/X automated morning predictions and evening results",
      "Multi-key Gemini API rotation (round-robin) for uninterrupted load handling; self-hosted dev infra on repurposed Dell laptop running Debian 13 with Docker, Supabase, PostgreSQL, Nextcloud, and Uptime Kuma at zero additional software cost",
      "Automated social content flywheel (TikTok, Twitter/X, Telegram) built around daily accuracy verification as a credibility-first growth strategy"
    ]
  },
  {
    title: "DevBrain",
    description: "Developer Knowledge CLI — a daemon-based code intelligence tool that detects anti-patterns in real time, learns from your GitHub history, and surfaces solutions through a React dashboard with terminal emulation.",
    tags: ["Node.js", "TypeScript", "React", "Express.js", "SQLite", "GitHub API", "Chokidar"],
    features: [
      "Modular monorepo (packages/cli, packages/core, apps/dashboard) with a Chokidar-powered file watcher and debounced real-time pattern detection across 10+ code patterns (async/await, OOP, functional, error handling)",
      "Daemon-based anti-pattern detector flagging callback hell, missing error handling, and deep nesting; integrated GitHub API to learn from repo commits and closed issues with confidence scoring",
      "Express.js API with SQLite persistence and a React dashboard with terminal emulation and intelligent error-to-solution matching"
    ]
  },
  {
    title: "StudyGenius AI",
    description: "Transform study notes and documents into interactive summaries, flashcards, and board-style quizzes with AI. Built with spaced-repetition retention tracking and multi-format performance analytics.",
    link: "https://studyboy-v1.onrender.com",
    tags: ["React", "Gemini API", "Vite", "Tailwind CSS", "TypeScript"],
    features: [
      "AI-generated study guides with structured sections and domain-specific modes (PA, Nursing, Medical, GenEd)",
      "Flashcards with spaced-repetition ratings and retention tracking",
      "Board-style quiz sessions with history, review, and performance analytics",
      "Past upload library with quick reopen/download",
      "Multi-format document input support"
    ]
  }
];

export const DEBUG_LOGS: DebugLog[] = [
  {
    title: "PDF Parser Import Bug & Test Conflict",
    repository: "STUDY-AI",
    commit: "7b31d6c",
    difficulty: 5,
    symptom: "pdf-parse library had a critical bug importing test files, causing crashes when parsing PDFs.",
    investigation: "Library was pulling in unnecessary test dependencies that conflicted with the production build environment.",
    resolution: "Replaced pdf-parse with pdf2json, rewrote extraction logic using event-driven Promises, and added validation for empty extraction across PDF, Word, and Text files.",
    tags: ["PDF Extraction", "Dependency Management", "Promises"]
  },
  {
    title: "Multi-Stage Docker Build Configuration",
    repository: "STUDY-AI",
    commit: "1504e2c",
    difficulty: 5,
    symptom: "Docker builds failing due to root vs backend/ path mismatches and .dockerignore blocking the Dockerfile itself.",
    investigation: "Identified that the .dockerignore was too aggressive and paths in the Dockerfile didn't align with the build context.",
    resolution: "Restructured Dockerfile in backend/ directory, fixed relative paths, and created a precise .dockerignore excluding only artifacts like node_modules and dist.",
    tags: ["Docker", "DevOps", "CI/CD"]
  },
  {
    title: "Quiz Reset State Management Bug",
    repository: "STUDYBOY-V1",
    commit: "16ce67c",
    difficulty: 5,
    symptom: "Quiz not resetting properly when starting new sessions, causing state conflicts and leaking data between rounds.",
    investigation: "State was not being cleared on unmount, and the architecture didn't separate individual session logic from the global dashboard.",
    resolution: "Refactored Past Sessions architecture, extracted SessionList as a component, and added proper cleanup logic on component unmount.",
    tags: ["React State", "Architecture", "Clean Code"]
  },
  {
    title: "TypeScript Undefined Constants",
    repository: "STUDYBOY-V1",
    commit: "f243f4a",
    difficulty: 4,
    symptom: "Build failing due to SYSTEM_INSTRUCTION constant being undefined across multiple files.",
    investigation: "Inconsistent naming conventions led to broken imports after a partial refactor.",
    resolution: "Standardized all instances to DEFAULT_SYSTEM_INSTRUCTION and fixed import paths across the entire codebase.",
    tags: ["TypeScript", "Refactoring", "Standards"]
  },
  {
    title: "Duplicate Code in Parse Function",
    repository: "STUDYBOY-V1",
    commit: "b119b76",
    difficulty: 4,
    symptom: "TypeScript error caused by duplicate code logic in parseSummary function.",
    investigation: "Legacy code was left behind during an update, causing type inference issues and bloated bundle size.",
    resolution: "Identified and removed duplicate parsing logic, consolidating into a single, efficient, typed implementation.",
    tags: ["Performance", "DRY", "TypeScript"]
  },
  {
    title: "Graceful Error Handling & Fallback",
    repository: "STUDYBOY-V1",
    commit: "6a2141b",
    difficulty: 4,
    symptom: "App crashing when API calls failed, with no fallback mechanism to show the user.",
    investigation: "API error responses weren't being caught at the service level, leading to runtime exceptions.",
    resolution: "Implemented comprehensive fallback data structures and try-catch blocks with graceful UI degradation to prevent hard crashes.",
    tags: ["Resilience", "UX", "Error Handling"]
  },
  {
    title: "Flashcard Load More Pagination",
    repository: "STUDYBOY-V1",
    commit: "2708888",
    difficulty: 4,
    symptom: "Load More button not working correctly, flashcards not paginating properly beyond the first page.",
    investigation: "Offset calculation was incorrect and the state wasn't appending new cards correctly.",
    resolution: "Fixed pagination logic, increased base count to 15, and corrected offset calculation for the 'Load More' functionality.",
    tags: ["Pagination", "Logic", "UI/UX"]
  },
  {
    title: "DOCX Dependency Conflict",
    repository: "STUDYBOY-V1",
    commit: "0091dce",
    difficulty: 4,
    symptom: "DOCX file support causing dependency conflicts breaking the production build.",
    investigation: "The DOCX library had native dependencies that failed in serverless environments.",
    resolution: "Removed problematic DOCX dependencies and implemented Markdown (.md) support as a stable alternative for document input.",
    tags: ["Dependencies", "Deployment", "Alternatives"]
  },
  {
    title: "Dockerfile Path Configuration",
    repository: "STUDY-AI",
    commit: "d0258ba",
    difficulty: 3,
    symptom: "Dockerfile paths not matching rootDir configuration in deployment config.",
    investigation: "Mismatch between local dev structure and the expected build structure on Render.",
    resolution: "Aligned package.json copies and file paths with the project's monorepo structure for seamless deployment.",
    tags: ["Docker", "Config", "Render"]
  },
  {
    title: "Shell Shortcuts & Aliases Library",
    repository: "dev_bible",
    commit: "062edc1",
    difficulty: 3,
    symptom: "No quick-recall system for commonly used shell commands and aliases, slowing down development.",
    investigation: "Manual lookup of complex git and docker commands was wasting time daily.",
    resolution: "Created a comprehensive aliases library organized by use case (Git, Docker, Linux) with examples for quick recall.",
    tags: ["Productivity", "Scripting", "Workflow"]
  }
];

export const SKILLS: SkillGroup[] = [
  { category: "Languages", items: ["JavaScript (ES6+)", "TypeScript", "Python", "SQL", "Bash"] },
  { category: "Frontend", items: ["React 19", "Next.js", "Vite", "Tailwind CSS", "shadcn/ui", "Radix UI"] },
  { category: "Backend", items: ["Node.js", "Express.js", "FastAPI", "REST APIs", "GraphQL", "WebSockets", "Async Job Processing"] },
  { category: "AI / ML", items: ["Gemini Flash/Pro", "OpenAI GPT-4", "RAG", "Semantic Search & Embeddings", "Predictive Modeling", "Poisson/Dixon-Coles", "Monte Carlo Simulation"] },
  { category: "Infra & DevOps", items: ["Docker", "Docker Compose", "NGINX", "AWS (EC2/S3/RDS)", "Render", "GitHub Actions", "CI/CD", "Self-hosted Linux servers"] },
  { category: "Databases", items: ["PostgreSQL", "Supabase", "MongoDB", "SQLite", "Redis", "Prisma", "SQLAlchemy"] },
  { category: "Blockchain / Web3", items: ["Ethereum", "Solana", "Solidity Smart Contracts", "Web3.js", "ethers.js", "Multi-chain Development"] },
];

export const EXPERIENCE: Experience[] = [
  {
    company: "Independent",
    role: "Full-Stack Engineer",
    period: "2023 - Present",
    location: "Remote",
    bullets: [
      "Shipped production full-stack applications across AI, blockchain, and Web3 using Next.js, TypeScript, Prisma, and ethers.js — all publicly accessible and serving real users.",
      "Managed cloud infrastructure with Docker, AWS EC2/S3/RDS, Render, and GitHub Actions CI/CD; implemented authentication flows, async job processing, and REST/GraphQL APIs.",
      "Operated the complete product lifecycle independently — architecture, development, deployment, monitoring via CloudWatch, and continuous iteration."
    ]
  }
];

export const EDUCATION: Education[] = [
  {
    institution: "Ivy Tech Community College",
    period: "2024 - Present",
    degree: "A.A.S., Electrical Engineering",
    location: "Indianapolis, IN"
  }
];

export const CERTIFICATIONS: Certification[] = [
  { name: "Meta Front-End Developer Professional Certificate", id: "OTUKNS34F9DV" },
  { name: "Meta Back-End Developer Professional Certificate", id: "JLXU4IAKHBP3" },
];
