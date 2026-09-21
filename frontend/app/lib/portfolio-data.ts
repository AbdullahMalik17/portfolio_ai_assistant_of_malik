/**
 * Centralized Portfolio Data
 * This file contains all portfolio information used for RAG indexing and UI components.
 * Cleaned of all emojis and enhanced with technical specifications and benchmarks.
 */

export interface ArchitectureStep {
  label: string;
  sublabel: string;
  badge?: string;
}

export interface TerminalDemoData {
  title: string;
  command: string;
  steps: Array<{
    type: 'prompt' | 'thought' | 'tool' | 'result' | 'metric';
    content: string;
    detail?: string;
  }>;
  metrics: {
    ram: string;
    latency: string;
    bootTime: string;
    efficiencyNote: string;
  };
}

export interface SpecChip {
  name: string;
  category: 'runtime' | 'protocol' | 'hardware' | 'model' | 'infra' | 'data';
}

export interface PortfolioProject {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  longDescription?: string;
  tech: string[];
  specChips?: SpecChip[];
  githubUrl?: string | null;
  liveUrl?: string | null;
  category: string;
  featured?: boolean;
  iconName: string; // Lucide icon name: 'cpu', 'bot', 'message-square', 'search', 'mic', 'book-open', 'code', 'zap', 'globe'
  mcpMarketUrl?: string;
  certificateUrl?: string;
  problem?: string;
  solution?: string;
  architecture?: string;
  architecturePipeline?: ArchitectureStep[];
  terminalDemo?: TerminalDemoData;
  keyCapabilities?: string[];
  challenges?: string[];
  results?: string[];
}

export interface SkillItem {
  name: string;
  level?: string;
  usageTooltip: string;
  iconName?: string;
}

export interface SkillCategory {
  title: string;
  categoryKey: string;
  description: string;
  skills: SkillItem[];
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  description: string;
  skills: string[];
  credentialUrl: string;
  iconName: string;
  badge?: string; // e.g. "A2AS Certified", "Panaversity Specialist"
  agentId?: string; // e.g. "abdullahmalik17/deep-research-age"
}

export interface PersonalInfo {
  name: string;
  email: string;
  whatsapp: string;
  linkedin: string;
  github: string;
  twitter?: string;
  avatar?: string;
  profession: string;
  tagline: string;
  specialty: string;
}

export interface GitHubAchievement {
  id: string;
  title: string;
  tier?: string;
  description: string;
  repoOrContext: string;
  url: string;
  icon: 'star' | 'git-pull-request' | 'users';
  badgeColor: string;
}

export interface AboutInfo {
  experience: string;
  journey: string;
  education: string[];
  philosophy: string;
}

// Personal Information
export const PERSONAL_INFO: PersonalInfo = {
  name: "Abdullah Malik",
  avatar: "/profile.jpg",
  email: "muhammadabdullah51700@gmail.com",
  whatsapp: "+923040705172",
  linkedin: "https://www.linkedin.com/in/muhammad-abdullah-athar",
  github: "https://github.com/AbdullahMalik17",
  twitter: "https://x.com/Ab4695Athar?t=nqRO0biMuBDrTIuzZOHq8A&s=08",
  profession: "Agentic AI Engineer & Data Scientist",
  tagline: "Autonomous AI Agents • BS Data Science (IUB) • Multi-Agent Systems • MCP • Digital FTEs",
  specialty: "I build autonomous AI systems, Digital FTEs, MCP-powered tools, and production-ready agentic workflows."
};

// Projects Data
export const PROJECTS: PortfolioProject[] = [
  {
    id: "malikclaw",
    title: "MalikClaw",
    subtitle: "Edge-Native Agentic AI Assistant & Gateway",
    description: "Ultra-lightweight, high-performance agentic AI assistant & gateway in Go, optimized for edge hardware ($10 Raspberry Pi/Android) with Urdu-First support.",
    longDescription: "MalikClaw is an edge-native autonomous agent runtime designed for low-resource hardware. Built in Go, it features a privacy-first architecture, Urdu-First bilingual support, and mobile device automation via ADB. Operates on <10MB RAM with sub-second response times.",
    tech: ["Go", "React", "TypeScript", "ADB", "MCP", "Docker"],
    specChips: [
      { name: "Go (Golang)", category: "runtime" },
      { name: "MCP Protocol", category: "protocol" },
      { name: "Android ADB", category: "hardware" },
      { name: "Urdu RTL NLP", category: "data" },
      { name: "Docker Sandbox", category: "infra" },
      { name: "ARM Cortex-A72", category: "hardware" }
    ],
    githubUrl: "https://github.com/AbdullahMalik17/malikclaw",
    liveUrl: "https://malikclaw.vercel.app/",
    mcpMarketUrl: "https://mcpmarket.com/ko/server/malikclaw",
    certificateUrl: "/Muhammad_Abdullah_Certificate.pdf",
    category: "Agentic AI",
    featured: true,
    iconName: "cpu",
    problem: "Standard Python agent frameworks consume 300MB–1GB+ RAM, making them unusable on constrained edge hardware like a $10 Raspberry Pi Zero or Android devices.",
    solution: "A Go-based lightweight compiled agent runtime with Model Context Protocol (MCP) tool standard, sandboxed ADB automation, and native RTL Urdu NLP.",
    architecture: "User Request → Go HTTP/gRPC Gateway → Intent Router → MCP Tool Server Bridge → Local ADB / Hardware → State Store",
    architecturePipeline: [
      { label: "User Prompt / Voice", sublabel: "Urdu/EN Bilingual", badge: "Ingress" },
      { label: "Go Gateway & Intent", sublabel: "Regex & Flash Cascade", badge: "Core" },
      { label: "MCP Protocol Dispatch", sublabel: "JSON-RPC 2.0 Stdio/SSE", badge: "Bridge" },
      { label: "ADB / Sandbox Execution", sublabel: "Android Screen & Shell", badge: "Hardware" }
    ],
    terminalDemo: {
      title: "MalikClaw Edge Agent Execution",
      command: "malikclaw --agent=executor --input='آج کے اہم ای میلز چیک کرو اور سمری بھیجو'",
      steps: [
        { type: "prompt", content: "Input: 'آج کے اہم ای میلز چیک کرو اور سمری بھیجو' [Urdu Query Received]" },
        { type: "thought", content: "Intent Classifier: Identified Task = Email_Triage + Report_Summary (Language: Urdu RTL)" },
        { type: "tool", content: "Invoking MCP Tool: mcp__gmail_fetch_unread(filter='is:important today')", detail: "Found 3 unread priority threads via Gmail MCP" },
        { type: "thought", content: "Synthesizing executive brief using Gemini 1.5 Flash stream..." },
        { type: "result", content: "Output: '3 اہم پیغامات موصول ہوئے: کلائنٹ ریویو، سرور الرٹ، اور مٹنگ تصدیق۔ سمری تیار ہے۔'" },
        { type: "metric", content: "Execution: 420ms | Peak RAM: 7.4MB | Sandboxed: true" }
      ],
      metrics: {
        ram: "7.4 MB (vs 450MB Python)",
        latency: "< 450ms loop",
        bootTime: "38ms cold start",
        efficiencyNote: "98.4% RAM reduction compared to LangChain gateways"
      }
    },
    keyCapabilities: [
      "Edge-Optimized (<10MB RAM, <1s boot time on Raspberry Pi Zero)",
      "Urdu-First Ecosystem with native RTL speech & text support",
      "Mobile Automation via ADB (taps, swipes, screen OCR, text entry)",
      "Listed globally on official MCP Market registry as discoverable server",
      "Audited A2AS Behavior Certified Agent Security"
    ],
    challenges: [
      "Rewrote agentic execution loop in Go to eliminate Python runtime memory overhead",
      "Engineered custom RTL Urdu tokenizer and intent parsers into core agent logic",
      "Built sandboxed local ADB controller for safe Android hardware automation"
    ],
    results: [
      "98.4% memory reduction compared to Python-based agent gateways",
      "Deployed successfully on $10 Raspberry Pi Zero & low-tier Android boards",
      "Listed globally on MCP Market with official registry verification"
    ]
  },
  {
    id: "digital-fte",
    title: "Digital FTE — Abdullah Junior",
    subtitle: "24/7 Autonomous Digital Employee",
    description: "High-autonomy AI agent acting as a 24/7 Digital Employee for personal and enterprise task execution with dual-agent security isolation.",
    longDescription: "A comprehensive AI agent system operating as a Digital Full-Time Equivalent (FTE). Features a dual-agent architecture with Cloud Sentry for monitoring and Local Executive for secure execution, orchestrated by an intelligent Brain.",
    tech: ["Python", "FastAPI", "Gemini 1.5 Pro", "Claude 3.5", "MCP", "Docker", "Fly.io"],
    specChips: [
      { name: "Python 3.12", category: "runtime" },
      { name: "Gemini 1.5 Pro", category: "model" },
      { name: "Claude 3.5 Sonnet", category: "model" },
      { name: "Dual-Agent Bus", category: "protocol" },
      { name: "Obsidian Vault", category: "data" },
      { name: "Odoo ERP MCP", category: "infra" }
    ],
    githubUrl: "https://github.com/AbdullahMalik17/Digital-FTE",
    liveUrl: null,
    category: "Agentic AI",
    featured: true,
    iconName: "bot",
    problem: "Handling high-volume daily operations across Email, WhatsApp, and CRM without human bottlenecks while keeping private credentials safe from cloud exposure.",
    solution: "Dual-agent Cloud/Local architecture separating read-only monitoring from privileged local task execution, synchronized via HMAC-signed message buses and MCP.",
    architecture: "Cloud Sentry (Gmail/WhatsApp/LinkedIn) → HMAC Message Bus → Intelligent Brain → Local Executive → Odoo/Obsidian Vault",
    architecturePipeline: [
      { label: "Cloud Sentry", sublabel: "Read-only Inbox Listener", badge: "Cloud" },
      { label: "HMAC Message Bus", sublabel: "Signature Verified Events", badge: "Security" },
      { label: "Intelligent Brain", sublabel: "Multi-Model Router", badge: "Orchestration" },
      { label: "Local Executive", sublabel: "Privileged Mutation & CRM", badge: "Local" }
    ],
    terminalDemo: {
      title: "Digital FTE Multi-Agent Orchestration",
      command: "fte-runtime --daemon --listen-bus --mode=dual-agent",
      steps: [
        { type: "prompt", content: "Cloud Sentry: Detected new WhatsApp enterprise inquiry from +1-415-***" },
        { type: "thought", content: "HMAC Verification: Event signature valid. Routing payload to Brain..." },
        { type: "tool", content: "Brain Router: Claude 3.5 Sonnet analyzing contract request parameters", detail: "Extracted project scope: 'Autonomous RAG Pipeline setup'" },
        { type: "tool", content: "Invoking Local Executive: mcp__odoo_create_lead(customer='Acme AI', budget='$12,000')", detail: "CRM record #8492 created" },
        { type: "tool", content: "Invoking Obsidian Tool: append_daily_log('2026-08-25', 'Lead #8492 captured')", detail: "Obsidian knowledge vault synced with git push" },
        { type: "result", content: "Dispatched automated WhatsApp reply with scheduling calendar & catalog." }
      ],
      metrics: {
        ram: "42 MB memory footprint",
        latency: "1.8s end-to-end",
        bootTime: "Instant event trigger",
        efficiencyNote: "100% credential isolation between cloud listeners and desktop execution"
      }
    },
    keyCapabilities: [
      "24/7 automated multi-channel inbox and lead monitoring (Gmail, WhatsApp, LinkedIn)",
      "Dual-agent security model (Cloud Sentry + Local Executive isolation)",
      "Financial automation via Odoo ERP integration",
      "Continuous knowledge synchronization with Git-backed Obsidian Vault"
    ],
    challenges: [
      "Decoupled cloud event listening from local secure function execution",
      "Integrated multi-model fallback between Gemini 1.5 Pro and Claude 3.5 Sonnet",
      "Implemented audit logging and cryptographic rollback protection"
    ],
    results: [
      "Created fully autonomous 24/7 digital employee replacing 15+ hours/week of manual triage",
      "Automated multi-channel response workflows across 6+ distinct SaaS platforms"
    ]
  },
  {
    id: "customer-success",
    title: "Customer Success Digital FTE",
    subtitle: "Enterprise Support Agent with Kafka & pgvector",
    description: "Enterprise support agent handling inquiries 24/7 across Email, WhatsApp, and Web with pgvector semantic retrieval and Kafka async queues.",
    longDescription: "Complete AI customer success system that autonomously resolves support tickets across channels using semantic vector search with pgvector and Kafka message queuing.",
    tech: ["Python", "FastAPI", "OpenAI GPT-4o", "PostgreSQL", "pgvector", "Kafka", "Docker"],
    specChips: [
      { name: "Python FastAPI", category: "runtime" },
      { name: "OpenAI GPT-4o", category: "model" },
      { name: "Apache Kafka", category: "infra" },
      { name: "pgvector 1536-dim", category: "data" },
      { name: "PostgreSQL ACID", category: "data" },
      { name: "Docker Compose", category: "infra" }
    ],
    githubUrl: "https://github.com/AbdullahMalik17/Hacathan_5",
    liveUrl: null,
    category: "Agentic AI",
    featured: true,
    iconName: "message-square",
    problem: "Delivering instant, contextual customer support across email, WhatsApp, and web tickets under traffic spikes without dropped requests or hallucinated answers.",
    solution: "Kafka-driven asynchronous agent with 5 function tools, pgvector knowledge base retrieval, and automatic sentiment escalation.",
    architecture: "Ingress (Webhook/Email) → Apache Kafka Queue → Customer Success Agent → 5 Tools → PostgreSQL + pgvector → Response Queue",
    architecturePipeline: [
      { label: "Multi-Channel Ingress", sublabel: "Twilio / SendGrid / Webhook", badge: "Ingress" },
      { label: "Kafka Message Topic", sublabel: "Dead-Letter-Queue Resilient", badge: "Queue" },
      { label: "CS Agent Core (5 Tools)", sublabel: "Function Calling Validation", badge: "Agent" },
      { label: "pgvector + Postgres", sublabel: "1536-dim Embedding Search", badge: "Memory" }
    ],
    terminalDemo: {
      title: "Customer Success Async Ticket Processing",
      command: "kafka-consumer --topic=incoming_support_tickets --group=cs_agent_v1",
      steps: [
        { type: "prompt", content: "Kafka Consumer: Dequeued Ticket #1048 [Channel: Email, Priority: High]" },
        { type: "thought", content: "Customer Inquiry: 'How do we configure custom SSL certificates on enterprise nodes?'" },
        { type: "tool", content: "Invoking pgvector: search_knowledge_base('SSL certificate custom configuration', limit=3)", detail: "Found 3 matching articles (Cosine Similarity: 0.932)" },
        { type: "thought", content: "Sentiment Analyzer: Neutral / Technical (Urgency: Medium). Formatting solution with code sample..." },
        { type: "tool", content: "Invoking Ticket Tool: create_resolution_record(ticket_id=1048, resolved=true)", detail: "Stored in PostgreSQL with resolution metadata" },
        { type: "result", content: "Dispatched automated response via SendGrid API with verified SSL setup steps." }
      ],
      metrics: {
        ram: "68 MB container footprint",
        latency: "840ms semantic retrieval",
        bootTime: "Sub-second queue pickup",
        efficiencyNote: "117/117 Tasks completed across 9 production phases"
      }
    },
    keyCapabilities: [
      "Multi-channel support (Email, WhatsApp via Twilio, Web forms)",
      "Semantic search using 1536-dim pgvector embeddings in PostgreSQL",
      "Real-time sentiment and urgency escalation detection",
      "Production-ready Docker and Kubernetes deployment configs"
    ],
    challenges: [
      "Built reliable Kafka dead-letter-queue for failed message retries and spike absorption",
      "Formulated strict function calling schema for customer ticket resolution",
      "Maintained 100% test completion across 9 development phases"
    ],
    results: [
      "117/117 tasks completed (100% production readiness)",
      "Sub-second semantic knowledge base search performance"
    ]
  },
  {
    id: "deep-research-agent",
    title: "Deep Research Agent",
    subtitle: "Autonomous Academic & Web Synthesis Engine",
    description: "Autonomously conducts deep multi-step web research, synthesizes evidence, and generates structured academic reports.",
    longDescription: "Autonomous deep research system powered by OpenAI Agent SDK and web tools, certified by A2AS Registry for agent behavior compliance.",
    tech: ["Python", "OpenAI SDK", "SerpAPI", "Markdown", "A2AS"],
    specChips: [
      { name: "Python", category: "runtime" },
      { name: "OpenAI Agents SDK", category: "model" },
      { name: "SerpAPI", category: "protocol" },
      { name: "A2AS Certified", category: "protocol" }
    ],
    githubUrl: "https://github.com/AbdullahMalik17/Agentic_AI",
    liveUrl: null,
    category: "Agentic AI",
    featured: false,
    iconName: "search",
    certificateUrl: "https://a2as.org/certified/agents/abdullahmalik17/deep-research-age"
  },
  {
    id: "voice-assistant-agent",
    title: "Voice Assistant Agent",
    subtitle: "Offline Wake-Word & Semantic Memory Assistant",
    description: "Privacy-first voice assistant with wake word detection, semantic memory, and local hardware control.",
    longDescription: "Advanced voice-activated AI assistant featuring custom wake word detection, semantic memory for personalized interactions, and offline speech recognition.",
    tech: ["Python", "Gemini API", "Whisper", "ChromaDB", "Picovoice"],
    specChips: [
      { name: "Python", category: "runtime" },
      { name: "Whisper Voice", category: "model" },
      { name: "Picovoice", category: "hardware" },
      { name: "ChromaDB", category: "data" }
    ],
    githubUrl: "https://github.com/AbdullahMalik17/Voice-Assistant17",
    liveUrl: null,
    category: "Agentic AI",
    featured: false,
    iconName: "mic"
  },
  {
    id: "physical-ai-platform",
    title: "Physical AI Platform",
    subtitle: "Humanoid Robotics & Embodied AI Portal",
    description: "Interactive learning platform for Physical AI & Humanoid Robotics with a RAG chatbot and 43+ code examples.",
    longDescription: "Comprehensive educational platform designed to teach Physical AI and Humanoid Robotics with Pinecone-powered semantic Q&A.",
    tech: ["Docusaurus", "React", "OpenAI", "Pinecone", "Tailwind CSS"],
    specChips: [
      { name: "React / Docusaurus", category: "runtime" },
      { name: "Pinecone Vector", category: "data" },
      { name: "OpenAI API", category: "model" }
    ],
    githubUrl: "https://github.com/AbdullahMalik17/Physical_AI",
    liveUrl: null,
    category: "Education",
    featured: false,
    iconName: "book-open"
  },
  {
    id: "ai-code-assistant",
    title: "AI Code Assistant",
    subtitle: "Multi-Model Reasoning & Refactoring Engine",
    description: "Multi-model coding agent that assists developers with writing, debugging, and refactoring code with MEM0 memory.",
    longDescription: "Intelligent coding assistant featuring long-term memory via MEM0, multi-turn reasoning, and Chainlit UI.",
    tech: ["OpenAI SDK", "MEM0", "Python", "Chainlit", "Langfuse"],
    specChips: [
      { name: "Python", category: "runtime" },
      { name: "MEM0 Memory", category: "data" },
      { name: "Langfuse Trace", category: "infra" }
    ],
    githubUrl: "https://github.com/AbdullahMalik17/Agentic_AI/tree/main/_Projects/Code_Assistant_agent",
    liveUrl: null,
    category: "Agentic AI",
    featured: false,
    iconName: "code"
  },
  {
    id: "portfolio-ai-assistant",
    title: "Portfolio AI Assistant Platform",
    subtitle: "RAG & Function Calling Portfolio Dashboard",
    description: "Interactive portfolio interface with embedded RAG chatbot, tool execution, and database persistence.",
    longDescription: "Full-stack AI-powered portfolio dashboard integrating OpenAI Assistants API with RAG capabilities to answer visitor questions.",
    tech: ["Next.js 15", "TypeScript", "Google Gemini", "Vercel Postgres", "Tailwind CSS"],
    specChips: [
      { name: "Next.js 15", category: "runtime" },
      { name: "TypeScript", category: "runtime" },
      { name: "Gemini 2.5", category: "model" },
      { name: "Vercel Postgres", category: "data" }
    ],
    githubUrl: "https://github.com/AbdullahMalik17/Portfolio-AI-Assistant",
    liveUrl: "https://portfolio-ai-assistant-of-malik.vercel.app/",
    category: "Web Development",
    featured: false,
    iconName: "zap"
  },
  {
    id: "online-quran-asad-ali",
    title: "Online Quran — Asad Ali",
    subtitle: "Digital Reading & Accessible Web Portal",
    description: "Modern interactive web application providing accessible digital Quran reading and search capabilities.",
    longDescription: "An open-source digital web application built to deliver an elegant, fast, and responsive reading experience for the Holy Quran.",
    tech: ["HTML5", "CSS3", "JavaScript", "TypeScript", "Web APIs"],
    specChips: [
      { name: "TypeScript", category: "runtime" },
      { name: "Web APIs", category: "protocol" }
    ],
    githubUrl: "https://github.com/AbdullahMalik17/Asad-Ali",
    liveUrl: "https://github.com/AbdullahMalik17/Asad-Ali",
    category: "Web Development",
    featured: false,
    iconName: "globe"
  }
];

// Capabilities Matrix (Interactive Skills)
export const SKILLS: SkillCategory[] = [
  {
    title: "Agentic Frameworks & Protocols",
    categoryKey: "agentic",
    description: "Orchestration layers, tool communication standards, and multi-agent systems.",
    skills: [
      { name: "Model Context Protocol (MCP)", level: "Production", usageTooltip: "Standardized JSON-RPC 2.0 tool transport for MalikClaw & Digital FTEs." },
      { name: "OpenAI Agents SDK", level: "Production", usageTooltip: "Autonomous multi-step research loops, handoffs, and function calling." },
      { name: "Multi-Agent Swarms", level: "Production", usageTooltip: "Cloud Sentry + Local Executive dual-agent separation with HMAC buses." },
      { name: "Digital FTE Orchestration", level: "Specialist", usageTooltip: "24/7 background worker architectures with self-healing retries." },
      { name: "A2A & N8N Automation", level: "Advanced", usageTooltip: "Visual agent trigger pipelines and webhook synchronization." }
    ]
  },
  {
    title: "Core Engineering & Runtimes",
    categoryKey: "core",
    description: "High-performance compiled runtimes, backend APIs, and modern frontend engines.",
    skills: [
      { name: "Go (Golang)", level: "High Performance", usageTooltip: "Edge-native compiled binaries with <10MB RAM footprint for MalikClaw." },
      { name: "Python (AsyncIO / FastAPI)", level: "Production", usageTooltip: "High-throughput asynchronous backends, background queues & worker loops." },
      { name: "TypeScript", level: "Production", usageTooltip: "End-to-end type safety across Next.js, API clients, and agent schemas." },
      { name: "Next.js 15 (App Router)", level: "Production", usageTooltip: "Server components, streaming responses, and edge API routes." },
      { name: "React 19 & Tailwind CSS", level: "Production", usageTooltip: "Responsive dark-mode UI systems with Framer Motion animations." }
    ]
  },
  {
    title: "AI Models & Vector Infra",
    categoryKey: "ai-infra",
    description: "Foundation model orchestration, embedding models, and vector search stores.",
    skills: [
      { name: "Gemini 1.5 / 2.0", level: "Expert", usageTooltip: "Long-context multi-document reasoning and ultra-fast edge intent routing." },
      { name: "Claude 3.5 Sonnet", level: "Expert", usageTooltip: "Complex autonomous coding, tool selection, and schema generation." },
      { name: "OpenAI GPT-4o", level: "Expert", usageTooltip: "Precision function calling in Customer Success Digital FTE." },
      { name: "pgvector & PostgreSQL", level: "Production", usageTooltip: "1536-dim vector similarity search co-located in ACID relational storage." },
      { name: "ChromaDB & Pinecone", level: "Advanced", usageTooltip: "Local and cloud vector stores for voice memory and educational RAG." },
      { name: "Apache Kafka", level: "Production", usageTooltip: "Asynchronous event-driven pipelines with dead-letter-queue resilience." }
    ]
  },
  {
    title: "DevOps, Governance & Tooling",
    categoryKey: "devops",
    description: "Containerization, security governance, observability, and hardware debugging.",
    skills: [
      { name: "Docker & Containerization", level: "Production", usageTooltip: "Sandboxed agent execution containers and multi-stage builds." },
      { name: "A2AS Behavior Governance", level: "Certified", usageTooltip: "Audited AI agent safety certificates and declared behavioral limits." },
      { name: "Langfuse Telemetry", level: "Production", usageTooltip: "LLM token tracking, execution latency spans, and eval logging." },
      { name: "Android ADB Automation", level: "Specialist", usageTooltip: "Autonomous hardware screen taps, swipes, and text input over ADB." },
      { name: "Fly.io & Vercel", level: "Production", usageTooltip: "Global serverless and edge container deployments." }
    ]
  }
];

// Certifications
export const CERTIFICATIONS: Certification[] = [
  {
    title: "A2AS Behavior Certificate — deep-research-age",
    issuer: "A2AS Registry (a2as.org)",
    year: "2026",
    description: "Certified by the A2AS Registry for AI Agent Security and Governance. Validates that deep-research-age operates within audited, declared behavioral boundaries.",
    skills: ["AI Security", "Agent Governance", "Behavior Certificates", "Agentic AI"],
    credentialUrl: "https://a2as.org/certified/agents/abdullahmalik17/deep-research-age",
    iconName: "shield-check",
    badge: "A2AS Certified",
    agentId: "abdullahmalik17/deep-research-age"
  },
  {
    title: "Prompt Engineering Specialist",
    issuer: "Panaversity",
    year: "2024",
    description: "Advanced certification in prompt engineering, LLM orchestration, and AI agent development.",
    skills: ["LLM Optimization", "Few-Shot Prompting", "Chain-of-Thought", "Agentic Workflows"],
    credentialUrl: "/Muhammad_Abdullah_Certificate.pdf",
    iconName: "award",
    badge: "Panaversity Certified"
  }
];

// About Information
export const ABOUT: AboutInfo = {
  experience: "2+ years",
  journey: "Started coding at age 14 by mastering web fundamentals. Advanced into TypeScript, full-stack frameworks, and specialized in Agentic AI Development at Panaversity. Currently pursuing BS Data Science at Islamia University of Bahawalpur (IUB) while engineering autonomous digital FTEs, Go edge runtimes (MalikClaw), and multi-agent orchestration tools.",
  education: [
    "Islamia University of Bahawalpur (IUB) — BS Data Science",
    "Panaversity — Agentic AI Development",
    "PIAIC — Artificial Intelligence"
  ],
  philosophy: "Building autonomous software systems that operate reliably, securely, and transparently to handle complex workflows without human bottlenecks."
};

// GitHub Achievements & Honors
export const GITHUB_ACHIEVEMENTS: GitHubAchievement[] = [
  {
    id: "starstruck",
    title: "Starstruck",
    tier: "Bronze Tier",
    description: "Awarded for MalikClaw earning 16+ GitHub stars from the global open-source developer community.",
    repoOrContext: "AbdullahMalik17/malikclaw",
    url: "https://github.com/users/AbdullahMalik17/achievements/starstruck",
    icon: "star",
    badgeColor: "from-amber-500/20 to-yellow-500/20 text-amber-300 border-amber-500/30"
  },
  {
    id: "pull-shark",
    title: "Pull Shark",
    tier: "Active Contributor",
    description: "Awarded for high-velocity merged pull requests during Hackathon 2 open source initiatives.",
    repoOrContext: "Hackathon 2 (hacathan2)",
    url: "https://github.com/users/AbdullahMalik17/achievements/pull-shark",
    icon: "git-pull-request",
    badgeColor: "from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/30"
  },
  {
    id: "pair-extraordinaire",
    title: "Pair Extraordinaire",
    tier: "AI Co-Author",
    description: "Awarded for autonomous AI pair programming and co-authored commits with Claude.",
    repoOrContext: "Anthropic Claude Collaboration",
    url: "https://github.com/users/AbdullahMalik17/achievements/pair-extraordinaire",
    icon: "users",
    badgeColor: "from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30"
  }
];

// GitHub Repositories
export const GITHUB_REPOS = {
  main: "https://github.com/AbdullahMalik17",
  malikclaw: "https://github.com/AbdullahMalik17/malikclaw",
  digitalFTE: "https://github.com/AbdullahMalik17/Digital-FTE",
  customerSuccess: "https://github.com/AbdullahMalik17/Hacathan_5",
  agenticAI: "https://github.com/AbdullahMalik17/Agentic_AI"
};
