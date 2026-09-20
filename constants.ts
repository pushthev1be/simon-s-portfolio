
import { Project, Experience, SkillGroup, DebugLog, Education, Certification, Thought } from './types';

export const PERSONAL_INFO = {
  name: "Simon Abayomi Olawuyi",
  title: "Full-Stack Engineer",
  location: "Indianapolis, IN",
  phone: "(317) 531-0381",
  email: "nomispeter12@gmail.com",
  summary: "Self-taught full-stack engineer who ships production-grade AI systems, not prototypes. Creator of Oracle Odds AI — a live sports prediction platform with a self-correcting mathematical engine, adaptive learning loop, and international user base — built entirely solo from architecture to deployment. Specializes in backend systems, AI/ML integration, predictive modeling, and building revenue-generating products end-to-end. Motivated by outcomes, not credentials.",
  linkedin: "https://www.linkedin.com/in/simon-olawuyi-01986a316/",
  github: "https://github.com/pushthev1be",
  website: "https://www.oracleai.live",
  siteUrl: "https://www.simonolawuyi.com",
  itch: "https://pushthev1be.itch.io/",
  twitter: "https://x.com/pushthevibe",
  calendly: "https://calendly.com/nomispeter12/30min",
};

export const STATS = [
  { value: 18, suffix: '', label: 'Microservices' },
  { value: 13, suffix: '', label: 'API Integrations' },
  { value: 3, suffix: '', label: 'Countries' },
  { value: 2, suffix: '+', label: 'Years Shipped' },
];

export const PHILOSOPHY = [
  { label: 'Ship', desc: 'Production deployments, not prototypes sitting in private repos.' },
  { label: 'Systems', desc: 'Think in architecture — every component connects to a larger whole.' },
  { label: 'Outcomes', desc: 'Motivated by real-world impact, not credentials or titles.' },
  { label: 'Compound', desc: 'Build products that get smarter and more valuable over time.' },
];

export const PROJECTS: Project[] = [
  {
    id: '001',
    title: "Oracle Odds AI",
    label: "Flagship — Live & Monetized",
    description: "Production live sports prediction platform with a self-correcting mathematical engine and international user base (US, Nigeria, Ghana). Solo-built, Stripe-monetized, fully deployed.",
    link: "https://www.oracleai.live",
    featured: true,
    category: "Product",
    linkLabel: "Visit live site",
    image: "/uploads/oracledashboard.png",
    tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Stripe", "Gemini AI", "Docker"],
    features: [
      "Poisson + Dixon-Coles modeling with xG regression across Premier League, Champions League, NBA, and ATP Tour",
      "Self-correcting adaptive learning loop — EMA-weighted team strength, calibration bias from settled residuals",
      "Gemini Flash AI with batch processing (15 matches), live web search for injury/roster verification",
      "18 backend microservices, 13 external API integrations, 9-table PostgreSQL schema",
      "Stripe tiered subscriptions (Free/Basic/Premium/Elite) + Telegram bot + Twitter/X automation",
      "Multi-key API rotation; self-hosted on repurposed Dell running Debian 13 at zero additional software cost",
    ]
  },
  {
    id: '002',
    title: "CrossCheck",
    label: "Socratic AI Tutor",
    description: "AI-powered Socratic study companion that guides students through topics using follow-up questions instead of giving answers — building real understanding, not just recall.",
    link: undefined,
    featured: false,
    category: "Product",
    image: "/uploads/Screenshot 2026-04-19 211742.png",
    tags: ["React", "Gemini API", "TypeScript", "Tailwind CSS"],
    features: [
      "Socratic dialogue engine — AI never gives direct answers, only targeted follow-up questions that deepen reasoning",
      "Topic-based progress tracking with visual completion states per chapter and subject",
      "Timed session mode with live word-count feedback and structured answer prompts",
      "Domain-specific modes (Biology, Nursing, PA, Medical) with adaptive difficulty",
    ]
  },
  {
    id: '003',
    title: "StudyGenius AI",
    label: "AI Study Platform",
    description: "Transform study notes and documents into interactive summaries, flashcards, and board-style quizzes. Built with spaced-repetition retention tracking and multi-format analytics.",
    link: "https://studyboy-v1.onrender.com",
    featured: false,
    category: "Product",
    image: undefined,
    tags: ["React", "Gemini API", "Vite", "Tailwind CSS", "TypeScript"],
    features: [
      "AI-generated study guides with domain-specific modes (PA, Nursing, Medical, GenEd)",
      "Flashcards with spaced-repetition ratings and retention tracking",
      "Board-style quiz sessions with history, review, and performance analytics",
    ]
  },
  {
    id: '004',
    title: "DevBrain",
    label: "Developer Intelligence CLI",
    description: "Daemon-based code intelligence tool that detects anti-patterns in real time, learns from your GitHub history, and surfaces solutions through a React dashboard with terminal emulation.",
    link: undefined,
    featured: false,
    category: "Product",
    image: "/uploads/devbrain.png",
    tags: ["Node.js", "TypeScript", "React", "Express.js", "SQLite", "GitHub API"],
    features: [
      "Chokidar-powered file watcher with debounced real-time pattern detection across 10+ code patterns",
      "Daemon anti-pattern detector with GitHub API learning, confidence scoring, and closed-issue correlation",
      "Express.js REST API + SQLite persistence + React dashboard with terminal emulation",
    ]
  },
  {
    id: '005',
    title: "TuneCity Garage Sim",
    label: "Browser Game",
    description: "A pixel-art browser game where you build, tune, and diagnose cars. Playable instantly, no install.",
    link: "https://pushthev1be.itch.io/httpstunecityonrendercom",
    linkLabel: "Play in browser",
    badge: "Playable",
    category: "Game",
    featured: false,
    image: "/uploads/itch-tunecity.png",
    tags: ["Pixel Art", "Simulation", "Browser Game"],
    features: []
  },
  {
    id: '006',
    title: "Naija 5s",
    label: "Browser Game",
    description: "Retro Naija-themed five-a-side football game. Playable demo in the browser.",
    link: "https://pushthev1be.itch.io/httpsnaija-5sonrendercom",
    linkLabel: "Play in browser",
    badge: "Playable",
    category: "Game",
    featured: false,
    image: "/uploads/itch-naija5s.png",
    tags: ["Sports", "Retro", "Browser Game"],
    features: []
  },
  {
    id: '007',
    title: "All-in-1 Asset Pack",
    label: "Game Assets",
    description: "Car parts, engines, turbos, guns, monsters and garage sprites in one bundle for pixel-art games.",
    link: "https://pushthev1be.itch.io/all-in-1-monster-bergunpackcarpackengine-pack",
    linkLabel: "View on itch.io",
    category: "Assets",
    featured: false,
    image: "/uploads/itch-allinone.png",
    tags: ["Sprites", "Pixel Art", "Asset Pack"],
    features: []
  },
  {
    id: '008',
    title: "Gun Sprites",
    label: "Game Assets",
    description: "Pixel-art gun sprites with multi-direction animation frames, ready to drop into a game.",
    link: "https://pushthev1be.itch.io/gun-sprites",
    linkLabel: "View on itch.io",
    category: "Assets",
    featured: false,
    image: "/uploads/itch-guns.png",
    tags: ["Sprites", "Pixel Art"],
    features: []
  },
  {
    id: '009',
    title: "Car Parts Sprites",
    label: "Game Assets",
    description: "Engines and car parts sprites built for TuneCity, each in 8 directions.",
    link: "https://pushthev1be.itch.io/car-parts-sprites",
    linkLabel: "View on itch.io",
    category: "Assets",
    featured: false,
    image: "/uploads/itch-carparts.png",
    tags: ["Sprites", "Pixel Art"],
    features: []
  }
];

export const SERVICES = [
  {
    title: "AI-powered products",
    desc: "LLM features, prediction engines and data pipelines, taken from idea to a live, monetized product.",
    proof: "Oracle Odds AI",
  },
  {
    title: "Full-stack web apps",
    desc: "React, Next.js and Node apps with auth, payments, a real database and a deployment you can maintain.",
    proof: "StudyGenius AI, CrossCheck",
  },
  {
    title: "Games & prototypes",
    desc: "Playable browser games and pixel-art asset packs, from a quick prototype to something people can buy.",
    proof: "TuneCity, Naija 5s",
  },
];

export const STACK = ["TypeScript", "React", "Next.js", "Node.js", "Python", "PostgreSQL", "Supabase", "Stripe", "Docker", "AWS", "Gemini / OpenAI", "Tailwind CSS"];

export const DEBUG_LOGS: DebugLog[] = [
  {
    title: "PDF Parser Import Bug",
    repository: "STUDY-AI",
    commit: "7b31d6c",
    difficulty: 5,
    symptom: "pdf-parse had a critical bug importing test files, causing crashes when parsing PDFs in production.",
    investigation: "Library was pulling in unnecessary test dependencies that conflicted with the production build environment.",
    resolution: "Replaced pdf-parse with pdf2json, rewrote extraction using event-driven Promises, added empty-extraction validation.",
    tags: ["PDF Extraction", "Dependency Management", "Promises"]
  },
  {
    title: "Multi-Stage Docker Build Config",
    repository: "STUDY-AI",
    commit: "1504e2c",
    difficulty: 5,
    symptom: "Docker builds failing due to root vs backend/ path mismatches and .dockerignore blocking the Dockerfile itself.",
    investigation: "Identified that the .dockerignore was too aggressive and paths in the Dockerfile didn't align with the build context.",
    resolution: "Restructured Dockerfile in backend/ directory, fixed relative paths, created precise .dockerignore.",
    tags: ["Docker", "DevOps", "CI/CD"]
  },
  {
    title: "Quiz Reset State Management",
    repository: "STUDYBOY-V1",
    commit: "16ce67c",
    difficulty: 5,
    symptom: "Quiz not resetting properly when starting new sessions — state conflicts and data leaking between rounds.",
    investigation: "State was not being cleared on unmount, and the architecture didn't separate individual session logic from the global dashboard.",
    resolution: "Refactored architecture, extracted SessionList as a component, added proper cleanup on unmount.",
    tags: ["React State", "Architecture"]
  },
  {
    title: "TypeScript Undefined Constants",
    repository: "STUDYBOY-V1",
    commit: "f243f4a",
    difficulty: 4,
    symptom: "Build failing due to SYSTEM_INSTRUCTION constant being undefined across multiple files.",
    investigation: "Inconsistent naming conventions led to broken imports after a partial refactor.",
    resolution: "Standardized to DEFAULT_SYSTEM_INSTRUCTION and fixed all import paths across the entire codebase.",
    tags: ["TypeScript", "Refactoring"]
  },
  {
    title: "Graceful Error Handling & Fallback",
    repository: "STUDYBOY-V1",
    commit: "6a2141b",
    difficulty: 4,
    symptom: "App crashing when API calls failed with no user-facing fallback mechanism.",
    investigation: "API error responses weren't being caught at the service level, leading to runtime exceptions.",
    resolution: "Implemented comprehensive fallback data structures and try-catch with graceful UI degradation.",
    tags: ["Resilience", "UX", "Error Handling"]
  },
  {
    title: "DOCX Dependency Conflict",
    repository: "STUDYBOY-V1",
    commit: "0091dce",
    difficulty: 4,
    symptom: "DOCX support causing native dependency conflicts that broke the production build on Render.",
    investigation: "The DOCX library had native dependencies that failed in serverless environments.",
    resolution: "Removed problematic DOCX deps, implemented Markdown (.md) support as a stable alternative.",
    tags: ["Dependencies", "Deployment"]
  },
  {
    title: "Flashcard Load More Pagination",
    repository: "STUDYBOY-V1",
    commit: "2708888",
    difficulty: 4,
    symptom: "Load More button not working correctly, flashcards not paginating properly beyond the first page.",
    investigation: "Offset calculation was incorrect and the state wasn't appending new cards correctly.",
    resolution: "Fixed pagination logic, increased base count to 15, and corrected offset calculation.",
    tags: ["Pagination", "Logic", "UI/UX"]
  },
  {
    title: "Duplicate Code in Parse Function",
    repository: "STUDYBOY-V1",
    commit: "b119b76",
    difficulty: 4,
    symptom: "TypeScript error caused by duplicate code logic in parseSummary function.",
    investigation: "Legacy code was left behind during an update, causing type inference issues.",
    resolution: "Identified and removed duplicate parsing logic, consolidating into a single typed implementation.",
    tags: ["Performance", "DRY", "TypeScript"]
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
    resolution: "Created a comprehensive aliases library organized by use case (Git, Docker, Linux) with examples.",
    tags: ["Productivity", "Scripting", "Workflow"]
  }
];

export const SKILLS: SkillGroup[] = [
  { category: "Languages", items: ["JavaScript (ES6+)", "TypeScript", "Python", "SQL", "Bash"] },
  { category: "Frontend", items: ["React 19", "Next.js", "Vite", "Tailwind CSS", "shadcn/ui", "Radix UI"] },
  { category: "Backend", items: ["Node.js", "Express.js", "FastAPI", "REST APIs", "GraphQL", "WebSockets"] },
  { category: "AI / ML", items: ["Gemini Flash/Pro", "OpenAI GPT-4", "RAG", "Predictive Modeling", "Poisson/Dixon-Coles", "Monte Carlo"] },
  { category: "Infra & DevOps", items: ["Docker", "NGINX", "AWS EC2/S3/RDS", "GitHub Actions", "CI/CD", "Self-hosted Linux"] },
  { category: "Databases", items: ["PostgreSQL", "Supabase", "MongoDB", "SQLite", "Redis", "Prisma"] },
  { category: "Blockchain", items: ["Ethereum", "Solana", "Solidity", "Web3.js", "ethers.js"] },
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
    period: "2024 – Present",
    degree: "A.A.S., Electrical Engineering",
    location: "Indianapolis, IN"
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: "Meta Front-End Developer Professional Certificate",
    id: "OTUKNS34F9DV",
    image: "/uploads/WhatsApp Image 2026-04-24 at 2.49.22 PM.jpeg"
  },
  {
    name: "Meta Back-End Developer Professional Certificate",
    id: "JLXU4IAKHBP3",
    image: "/uploads/WhatsApp Image 2026-04-24 at 2.49.22 PM (1).jpeg"
  },
];

/**
 * To add a post: drop the PDF in public/thoughts/ and add an entry at the top of this list.
 * `sections` is optional: include it to make the post readable on the page.
 */
export const THOUGHTS: Thought[] = [
  {
    slug: "deep-thoughts-on-ai",
    pdf: "/thoughts/deep-thoughts-on-ai.pdf",
    title: "Deep Thoughts on AI",
    date: "2026-09-20",
    author: "Simon Abayomi Olawuyi",
    summary: "Three thoughts on AI: whether it can be sentient, the stigma already forming around it, and how AI and robotics fit together.",
    intro: ["I often have deep thoughts on AI, so I\u2019ll be talking about a few today."],
    sections: [
      {
        heading: "1. AI can\u2019t truly be sentient\u2026 or can it?",
        paragraphs: [
          "From my experience, AI seems to have what I call \u201chuman flaws.\u201d Its ideas of right and wrong, acceptable and unacceptable, are shaped by humans through training data, feedback, objectives, and safeguards. Even its creativity comes from patterns learned from human-created material.",
          "But here\u2019s the interesting part: humans also learn from the world around them. So maybe the real question isn't whether AI learns from humans, but whether it can develop subjective experience, personal desires, and its own reasons for creating. We still don't have scientific evidence that current AI is conscious.",
        ],
      },
      {
        heading: "2. AI is already developing a stigma.",
        paragraphs: [
          "In Nigeria, when a product doesn\u2019t last, people might say, *\u201cIt\u2019s probably China-made.\u201d* Not because China can\u2019t produce quality. China produces some incredible technology. But the label became associated with mass production.",
          "I think AI is developing a similar stigma. *\u201cIt\u2019s AI, so it must be generic or fake.\u201d* Ironically, AI can become so polished that its perfection itself starts making people suspicious.",
        ],
      },
      {
        heading: "3. AI + Robotics",
        paragraphs: [
          "I see robotics as the body and AI as the mind.",
          "AI can reason, plan and decide. Robotics gives those decisions a physical presence. As AI becomes more agentic and robotics becomes more capable, we could eventually have systems that perceive, decide, act and adapt autonomously.",
          "And that opens some crazy possibilities\u2026",
          "Agentic AI \u2192 Agentic physical intelligence \u2192 live-action Terminator 5 LOL.",
        ],
        footnote: '# "AI" appears 12 times in the post',
      },
    ],
  },
  {
    slug: "big-2-chatgpt-vs-claude",
    pdf: "/thoughts/big-2-chatgpt-vs-claude.pdf",
    summary: "My honest experience using ChatGPT and Claude so far: what I like about each, and where they fall short.",
    title: "So far my experience using \u201cThe big 2\u201d",
    date: "2026-08-04",
    author: "Simon Abayomi Olawuyi",
    cover: "/uploads/AI Thoughts.png",
    sections: [
      {
        heading: "ChatGPT by OpenAI",
        paragraphs: [
          "ChatGPT is like that family member or, more closely, a mother who's always there when you need some positive love. Although ChatGPT catches a lot of heat for babying users or always seeming to side with your point, it often gives reliable answers comparable to the oh-so-great Fable 5. Fable 5 just goes more in depth, whereas ChatGPT stays on the surface, as if it's trying not to overwhelm the user.",
          "In my opinion, ChatGPT is underrated. I remember a time when ChatGPT was all we had. ChatGPT felt magical. Now everyone wants to diss ChatGPT. I haven't personally had the chance to use Codex, so I won't speak on it.",
        ],
        footnote: '# Number of times "ChatGPT" was said: 8',
      },
      {
        heading: "Claude by Anthropic",
        paragraphs: [
          "I personally love Claude. A lot.",
          'Claude gave me that feeling of taking a T-break and then coming back the high felt entirely new. The UI, the little "spooling," "cooking," "Clauding," and things like that, Claude felt like a genuine advancement, and the results from simple to complex prompts proved it, with models ranging from Haiku to Opus to Fable.',
          "At one point, it seemed like Anthropic released one update after another; there was a new high to experience every day.",
          "Where I've found Claude especially useful is when you pair it with a project in your IDE or terminal and let it execute commands directly on your system that's when the real magic happens.",
          "Although I would say the current Fable 5 lacks the firepower that the first release had.",
        ],
        footnote: '# Number of times "Claude" was said: 5',
      },
    ],
    postscript: "It's been a while, I had to actually sit and type this. No AI.",
  },
];
