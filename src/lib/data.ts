/* ------------------------------------------------------------------ */
/*  Content model — every claim here is scoped to verified experience. */
/* ------------------------------------------------------------------ */

export const profile = {
  name: "Harshit Rana",
  first: "HARSHIT",
  last: "RANA",
  role: "AI/ML · Full-Stack Engineer",
  company: "Tinycrows Private Limited",
  location: "India",
  email: "ranaharshit633@gmail.com",
  phone: "+91 93157-13515",
  phoneHref: "tel:+919315713515",
  linkedin: "https://www.linkedin.com/in/rana-harshit",
  linkedinHandle: "in/rana-harshit",
  github: "https://github.com/harshiit-rana",
  githubHandle: "@harshiit-rana",
  status: "SYS.STATUS — ONLINE / BUILDING",
  availability: "Open to interesting problems",
  about:
    "I build AI-powered systems across the stack — from intelligent workflows and backend services to practical interfaces.",
  philosophy: [
    "I try to understand a system before I automate it.",
    "That means learning how state moves through a workflow, where inputs go wrong, and what failure actually looks like — then building in small, explicit steps I can test and reason about.",
    "The goal is software people can depend on and verify, not a demo that only works once.",
  ],
};

export const principles = [
  {
    icon: "sigma",
    title: "Understand the system first",
    body: "Before automating a workflow, I map how data moves through it and where it breaks. Reading the internals of a tool is usually faster than guessing at its behaviour later.",
  },
  {
    icon: "workflow",
    title: "Build in small, explicit steps",
    body: "I prefer workflows composed of discrete stages I can inspect individually over one opaque call that either works or doesn't. Smaller steps make failures easier to locate.",
  },
  {
    icon: "scan",
    title: "Validate the output",
    body: "LLM output is a starting point, not an answer. I ground results in retrieved sources, check them against the original documents, and keep a human in the loop where correctness matters.",
  },
  {
    icon: "layers",
    title: "Ship something practical",
    body: "A system counts when someone can actually run it — containerized, tested, documented, and useful to the people it was built for.",
  },
];

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  bullets: string[];
  chips: string[];
};

export const experiences: ExperienceEntry[] = [
  {
    company: "Tinycrows Private Limited",
    role: "AI & Software Development Intern",
    period: "June 2026 – Present",
    location: "India",
    summary:
      "Contributing to AI-driven automation, security validation, and document-intelligence workflows as part of the engineering team.",
    bullets: [
      "Developing Python backend services and REST APIs for automation workflows.",
      "Building and integrating n8n enterprise workflows using webhooks and APIs.",
      "Contributing to security and compliance validation workflows.",
      "Working on intelligent document processing involving OCR, PII detection, and redaction.",
      "Contributing to automated document analysis and validation pipelines.",
      "Developing frontend and backend components for security assessment and analytics dashboards with Next.js, TypeScript, React Query, and Tailwind CSS.",
      "Contributing to authentication, authorization, validation, and secure backend middleware — alongside debugging, testing, and deploying workflows with CI/CD tooling.",
    ],
    chips: ["Python backends", "n8n automation", "Security workflows"],
  },
  {
    company: "Unique Training Solutions",
    role: "Summer Training Intern — Azure Fundamentals",
    period: "June – July 2025",
    location: "India",
    summary:
      "Completed an Azure-focused training program and built a Python-based weather platform as applied coursework.",
    bullets: [
      "Completed Azure fundamentals training across core cloud concepts and services.",
      "Built a Python-based weather platform as part of the training program.",
      "Applied training concepts through guided, hands-on exercises.",
    ],
    chips: ["Azure fundamentals", "Python", "Training program"],
  },
];

export type TechNode = {
  id: string;
  label: string;
  core: boolean;
  y: number;
  blurb: string;
  powers: string[];
};

export type ProductNode = {
  id: string;
  label: string;
  y: number;
  tag: string;
  stack: string[];
  href: string;
};

export const techNodes: TechNode[] = [
  { id: "python", label: "Python", core: true, y: 6, blurb: "Primary language across projects and internships — backends, automation, data work, and AI pipelines.", powers: ["tracemind", "dataclean", "tprm", "healthcare", "tinycrows"] },
  { id: "langchain", label: "LangChain", core: true, y: 13.9, blurb: "RAG and validation chains — questionnaire checks in TPRM, retrieval in the Healthcare RAG system.", powers: ["tprm", "healthcare"] },
  { id: "langgraph", label: "LangGraph", core: true, y: 21.7, blurb: "Stateful agent workflows with human-in-the-loop interruptions in DataClean AI.", powers: ["dataclean"] },
  { id: "fastapi", label: "FastAPI", core: true, y: 29.6, blurb: "Python REST APIs for automation workflows built during the Tinycrows internship.", powers: ["tinycrows"] },
  { id: "react", label: "React", core: true, y: 37.4, blurb: "Dashboards and interactive views, including security assessment and analytics components.", powers: ["tinycrows"] },
  { id: "nextjs", label: "Next.js", core: false, y: 45.3, blurb: "Frontend for security assessment and analytics dashboards at Tinycrows.", powers: ["tinycrows"] },
  { id: "ts", label: "TypeScript", core: false, y: 53.1, blurb: "Typed frontend work — Next.js dashboards with React Query and Tailwind CSS.", powers: ["tinycrows"] },
  { id: "postgres", label: "PostgreSQL", core: true, y: 61, blurb: "Artifact storage with provenance tracking in TraceMind; relational work in general.", powers: ["tracemind"] },
  { id: "chroma", label: "ChromaDB", core: false, y: 68.9, blurb: "Vector store for semantic retrieval in the Healthcare RAG system.", powers: ["healthcare"] },
  { id: "redis", label: "Redis", core: false, y: 76.7, blurb: "Checkpointing for stateful DataClean AI workflows; queues and caches.", powers: ["dataclean"] },
  { id: "docker", label: "Docker", core: true, y: 84.6, blurb: "Compose-based setups for TraceMind and DataClean AI; containerized development at Tinycrows.", powers: ["tracemind", "dataclean", "tinycrows"] },
  { id: "n8n", label: "n8n", core: false, y: 92.4, blurb: "Enterprise workflow automation — webhooks, validation, and remediation chains.", powers: ["tprm", "tinycrows"] },
];

export const productNodes: ProductNode[] = [
  { id: "tracemind", label: "TraceMind", y: 12, tag: "Personal project", stack: ["python", "postgres", "docker"], href: "#work" },
  { id: "dataclean", label: "DataClean AI", y: 31, tag: "Personal project", stack: ["python", "langgraph", "redis", "docker"], href: "#work" },
  { id: "tprm", label: "TPRM Platform", y: 50, tag: "Internship work", stack: ["python", "langchain", "n8n"], href: "#work" },
  { id: "healthcare", label: "Healthcare RAG", y: 69, tag: "Learning project", stack: ["python", "langchain", "chroma"], href: "#work" },
  { id: "tinycrows", label: "Automation & dashboards", y: 88, tag: "Internship · Tinycrows", stack: ["python", "fastapi", "react", "nextjs", "ts", "docker", "n8n"], href: "#experience" },
];

export const skillGroups = [
  { name: "Languages", items: ["Python", "Java", "JavaScript", "TypeScript", "SQL"] },
  { name: "Backend", items: ["FastAPI", "Flask", "Node.js", "REST APIs", "Webhooks"] },
  { name: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "React Query", "D3.js", "Recharts"] },
  { name: "AI / ML", items: ["Agentic AI", "RAG", "LangChain", "LangGraph", "Prompt engineering", "Embeddings", "Vector search", "Tool calling", "TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "NLP", "Computer vision"] },
  { name: "Data", items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "ChromaDB", "Pandas", "NumPy"] },
  { name: "Cloud & DevOps", items: ["AWS", "Microsoft Azure", "Docker", "Docker Compose", "GitHub Actions", "Linux", "Bash"] },
];

export const projects = [
  {
    id: "tracemind",
    index: "01",
    name: "TraceMind",
    tagline: "Organizational intelligence over engineering history.",
    type: "Personal project",
    accent: "#ff4d1f",
    repo: "https://github.com/harshiit-rana/decision-graph",
    description:
      "TraceMind (previously named Decision Graph) reconstructs why engineering decisions were made by analyzing software development artifacts — issues, pull requests, commits, reviews, and releases.",
    problem:
      "Engineering rationale gets lost across GitHub artifacts. Decisions are scattered over issues, pull requests, commits, reviews, and releases, making it hard to answer why something changed months later.",
    approach: [
      "Ingest GitHub data — issues, pull requests, commits, reviews, releases — through resumable, cursor-based pipelines with rate-limit handling and transactional progress tracking.",
      "Store normalized artifacts in PostgreSQL with provenance tracking, so every conclusion traces back to its sources.",
      "Retrieve candidates and traverse Why/Impact relationships as a graph to connect decisions to their consequences.",
      "Answer point-in-time queries with evidence-based reasoning, tiering explicit evidence separately from inferred information.",
    ],
    architecture: [
      { k: "Ingest", v: "GitHub issues, PRs, commits, reviews, and releases via a cursor-based, resumable pipeline." },
      { k: "Track", v: "Transactional progress tracking with rate-limit handling keeps ingestion reliable." },
      { k: "Store", v: "PostgreSQL-backed storage with provenance on every artifact." },
      { k: "Traverse", v: "Candidate retrieval plus Why/Impact graph traversal across artifacts." },
      { k: "Reason", v: "Point-in-time queries with evidence tiering — explicit vs. inferred." },
    ],
    features: [
      "Resumable GitHub ingestion with rate-limit handling",
      "Transactional progress tracking",
      "Why/Impact graph traversal over development artifacts",
      "Point-in-time, evidence-based queries with provenance",
      "PostgreSQL storage with a Docker Compose setup",
      "Automated Python, SQL, integration, and Docker tests (where implemented)",
    ],
    metrics: [
      { k: "Cursor-based", v: "resumable ingestion" },
      { k: "Why / Impact", v: "graph traversal" },
      { k: "Point-in-time", v: "evidence queries" },
    ],
    stack: ["Python", "PostgreSQL", "Docker Compose", "GitHub API"],
  },
  {
    id: "dataclean",
    index: "02",
    name: "DataClean AI",
    tagline: "Human-in-the-Loop AI Data Cleaning Platform.",
    type: "Personal project",
    accent: "#ff4d1f",
    repo: "https://github.com/harshiit-rana/dataclean-ai",
    description:
      "An AI-assisted CSV data-cleaning platform where users inspect datasets, receive cleaning recommendations, and approve or reject each proposed change — automation with a human in the loop, not instead of one.",
    problem:
      "Raw CSVs carry missing values, duplicates, inconsistent formats, mixed data types, and outliers — and fully automatic cleaning can't be trusted without human review of what changed.",
    approach: [
      "Upload and profile datasets deterministically: missing values, duplicates, format inconsistencies, mixed types, and outliers.",
      "Layer LLM-based semantic interpretation on top of deterministic profiling to explain issues in plain terms.",
      "Run stateful LangGraph workflows that propose fixes as discrete, reviewable steps.",
      "Pause for human approval or rejection through native workflow interruptions, with Redis-backed checkpoints — and undo where implemented.",
      "Produce audit reports and ML-readiness checks for every cleaned dataset.",
    ],
    architecture: [
      { k: "Upload", v: "Dataset upload with deterministic, column-level profiling." },
      { k: "Interpret", v: "LLM semantic interpretation of detected data issues." },
      { k: "Propose", v: "Stateful LangGraph workflow generates fix proposals." },
      { k: "Approve", v: "Native interruptions pause for human approve/reject; Redis checkpoints preserve state." },
      { k: "Report", v: "Audit reporting plus ML-readiness checks on the cleaned output." },
    ],
    features: [
      "Missing-value, duplicate, format, mixed-type, and outlier detection",
      "Deterministic profiling plus LLM semantic interpretation",
      "Stateful LangGraph workflows with native interruptions",
      "Human approval and rejection of every proposed fix",
      "Redis-backed checkpoints, audit reporting, and ML-readiness checks",
      "Docker Compose-based deployment",
    ],
    metrics: [
      { k: "Human-in-loop", v: "approve / reject" },
      { k: "Stateful", v: "langgraph workflows" },
      { k: "Audit-ready", v: "reports + checks" },
    ],
    stack: ["Python", "LangGraph", "Redis", "Docker Compose"],
  },
  {
    id: "tprm",
    index: "03",
    name: "AI-Powered TPRM",
    tagline: "AI and workflow automation for third-party risk management.",
    type: "Internship work · Team contribution",
    accent: "#ff4d1f",
    description:
      "An AI and workflow automation platform for third-party risk management: vendor onboarding, profiling, evidence collection, and structured security and compliance evaluation — developed in connection with internship work on security and compliance automation.",
    problem:
      "Vendor risk reviews run on scattered questionnaires, documents, and manual checks — slow to complete and difficult to validate consistently across reviewers.",
    approach: [
      "Onboard vendors with structured profiling and criticality assessment.",
      "Collect evidence and evaluate security and compliance posture in repeatable workflows.",
      "Validate vendor questionnaire responses against uploaded documentation using LangChain-based checks.",
      "Automate validation and remediation steps with n8n workflows.",
      "Produce structured evaluation outputs with audit trails — and automated risk scoring where implemented.",
    ],
    architecture: [
      { k: "Onboard", v: "Vendor onboarding, profiling, and criticality assessment." },
      { k: "Collect", v: "Evidence collection from questionnaires and documents." },
      { k: "Validate", v: "LangChain-based validation of responses against uploaded docs." },
      { k: "Automate", v: "n8n-based validation and remediation workflows." },
      { k: "Output", v: "Structured evaluation outputs with audit trails." },
    ],
    features: [
      "Vendor onboarding, profiling, and criticality assessment",
      "Evidence collection with compliance evaluation workflows",
      "LangChain-based questionnaire-vs-document validation",
      "n8n-based automation for validation and remediation",
      "Audit trails and structured evaluation outputs",
    ],
    metrics: [
      { k: "n8n", v: "workflow automation" },
      { k: "LangChain", v: "response validation" },
      { k: "Audit trails", v: "structured outputs" },
    ],
    stack: ["Python", "LangChain", "n8n", "Docker"],
  },
  {
    id: "healthcare",
    index: "04",
    name: "Healthcare RAG",
    tagline: "Grounded Q&A over a healthcare document corpus.",
    type: "Learning project",
    accent: "#ff4d1f",
    description:
      "A Retrieval-Augmented Generation system for healthcare-related questions over a domain-specific document corpus, with retrieved source passages shown alongside answers. A learning project for evaluating chunking and prompting approaches — not a medical or clinical tool.",
    problem:
      "General-purpose LLMs answer domain questions without grounding. This project explores grounding answers in a curated corpus, with visible sources for every response.",
    approach: [
      "Build a domain-specific document corpus with chunking designed for retrieval.",
      "Implement semantic retrieval and vector search with ChromaDB and LangChain.",
      "Evaluate different chunking and prompting approaches against each other.",
      "Display retrieved source passages with each answer through a Gradio interface.",
    ],
    architecture: [
      { k: "Corpus", v: "Domain-specific healthcare documents, chunked for retrieval." },
      { k: "Index", v: "ChromaDB vector store for semantic search." },
      { k: "Retrieve", v: "LangChain retrieval pipeline over the corpus." },
      { k: "Evaluate", v: "Comparison of chunking and prompting strategies." },
      { k: "Interface", v: "Gradio Q&A UI showing answers with cited passages." },
    ],
    features: [
      "Domain-specific corpus with document chunking",
      "ChromaDB semantic retrieval and vector search",
      "LangChain RAG pipeline",
      "Chunking and prompting evaluations",
      "Gradio interface with source passages beside answers",
    ],
    metrics: [
      { k: "ChromaDB", v: "vector search" },
      { k: "LangChain", v: "retrieval pipeline" },
      { k: "Gradio", v: "answers + sources" },
    ],
    stack: ["Python", "LangChain", "ChromaDB", "Gradio"],
  },
];

export const hackathons = [
  {
    place: "Winner",
    event: "Eclipse 6.0 Hackathon",
    year: "2026",
    body: "Winner at Eclipse 6.0, Thapar Institute of Engineering & Technology (April 2026). Team event.",
  },
  {
    place: "Finalist",
    event: "India Innovates 2026",
    year: "2026",
    body: "Finalist at India Innovates 2026, a national civic-tech hackathon. Team event.",
  },
  {
    place: "2nd Runner-Up",
    event: "thinkQbator SprintFORGood AI Hackathon",
    year: "2026",
    body: "2nd Runner-Up at the SprintFORGood AI Hackathon, IIT Delhi (January 2026). Team event.",
  },
  {
    place: "Global Top 112",
    event: "Cardano Hackathon Asia — IBW Edition",
    year: "2025",
    body: "Placed in the global top 112 at the IBW Edition, 2025. Team event.",
  },
];

export const certifications = [
  { name: "Microsoft Azure AI Fundamentals (AI-900)", issuer: "Microsoft · July 2025" },
  { name: "AWS Academy Graduate — Cloud Foundations", issuer: "AWS Academy · 2024" },
  { name: "Oracle Cloud Infrastructure — Generative AI Associate", issuer: "Oracle · 2025" },
];

export const socials = [
  { label: "GitHub", handle: profile.githubHandle, href: profile.github },
  { label: "LinkedIn", handle: profile.linkedinHandle, href: profile.linkedin },
  { label: "Email", handle: profile.email, href: `mailto:${profile.email}` },
  { label: "Mobile", handle: profile.phone, href: profile.phoneHref },
];

export const marqueeItems = [
  "AGENTS", "STATE MACHINES", "EMBEDDINGS", "RETRIEVAL", "RAG",
  "WORKFLOWS", "POSTGRES", "REDIS", "VALIDATION", "PROVENANCE",
  "EVALUATION", "HUMAN-IN-THE-LOOP",
];
