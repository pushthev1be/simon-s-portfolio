
import { Project, Experience, SkillGroup, DebugLog } from './types';

export const PERSONAL_INFO = {
  name: "Simon Abayomi Olawuyi",
  title: "Full-Stack Engineer",
  location: "Indianapolis, IN",
  phone: "(317) 531-0381",
  email: "nomispeter12@gmail.com",
  summary: "I’m a full-stack developer who enjoys building real systems, not just projects that sit in a repo. I like taking ambitious ideas — crypto gaming platforms, AI-powered tools, peer-to-peer marketplaces — and turning them into working products with real logic behind them. I naturally think in systems. When I build something, I focus on how everything connects: backend architecture, validation flows, real-time interactions, payment logic, performance, and scalability. My strengths are backend logic, API design, Web3 integrations (especially Solana), and turning complex concepts into structured, deployable applications.",
  linkedin: "https://linkedin.com",
  github: "https://github.com",
};

export const PROJECTS: Project[] = [
  {
    title: "Oracle Odds AI 🔮",
    description: "A professional-grade sports prediction platform that combines real-time data with Gemini 2.0 Flash search-grounding to generate high-accuracy betting insights.",
    link: "https://oracle-ai-ulvr.onrender.com",
    tags: ["React 19", "Gemini 2.0", "Search Grounding", "Tailwind v4", "TypeScript"],
    features: [
      "Search-Grounded AI using Google Search Retrieval for live roster/injury verification",
      "Live Match Engine for Premier League, Champions League, NBA, and ATP Tour",
      "Dynamic Prop Analysis based on reasoned logic and latest 24hr performance data",
      "Parallel API fetching with resilient greedy fallback to 2026-aligned data",
      "Production-ready architecture with automated environment detection"
    ]
  },
  {
    title: "StudyGenius AI",
    description: "Transform study notes and documents into interactive summaries, flashcards, and board-style quizzes with AI.",
    link: "https://studyboy-v1.onrender.com",
    tags: ["React", "Gemini API", "Vite", "Tailwind CSS"],
    features: [
      "AI-generated study guides with structured sections",
      "Flashcards with spaced-repetition ratings",
      "Board-style quiz sessions with history and review",
      "Past upload library with quick reopen/download",
      "Domain-specific modes (PA, Nursing, Medical, GenEd)"
    ]
  },
  {
    title: "PushFundz Crypto Lending Platform",
    description: "Design secure loan lifecycle with multi-chain support (ETH + SOL).",
    tags: ["Solidity", "Web3.js", "Ethereum", "Solana", "Docker"],
    features: [
      "Built tiered membership and gamified reward system",
      "Wrote and tested Solidity smart contracts",
      "Implemented on/off-ramp support",
      "Used microservices & containerized deployment (Docker, NGINX)"
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
    resolution: "Aligned package.json copies and aligned file paths with the project's monorepo structure for seamless deployment.",
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
  { category: "Languages", items: ["JavaScript (ES6+)", "TypeScript", "Python", "SQL"] },
  { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "shadcn/ui", "Radix UI"] },
  { category: "Backend", items: ["Node.js", "Express.js", "FastAPI", "Supabase Functions", "REST", "GraphQL"] },
  { category: "Infra & DevOps", items: ["Docker", "NGINX", "GitHub Actions", "Render", "AWS (EC2/S3/RDS)", "CI/CD"] },
  { category: "Databases", items: ["PostgreSQL", "MongoDB", "Prisma ORM", "SQLAlchemy", "Redis"] },
  { category: "AI/ML", items: ["OpenAI API", "GPT-3.5/4", "OpenRouter", "Semantic Search", "Gemini API"] },
  { category: "Web3", items: ["Ethereum", "Solana", "Smart Contracts", "Web3.js", "ethers.js"] }
];

export const EXPERIENCE: Experience[] = [
  {
    company: "Independent Full-Stack Developer",
    role: "Independent Full-Stack Developer",
    period: "2023 - Present",
    location: "Remote",
    bullets: [
      "Delivered production-grade full-stack apps for AI, blockchain, and web platforms",
      "Deployed infra with Docker, Render, AWS (EC2/S3), GitHub Actions",
      "Implemented robust auth, async jobs, APIs, and backend optimization",
      "Managed end-to-end builds: design, code, deploy, debug, repeat"
    ]
  }
];

export const EDUCATION = [
  { institution: "Ivy Tech Community College", period: "2024 - Present", degree: "A.A.S., Electrical Engineering" },
  { institution: "Self-Directed Software Engineering Education", period: "2021 - Present", degree: "Software Engineering" }
];
