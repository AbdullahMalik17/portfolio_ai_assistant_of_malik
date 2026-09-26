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

export interface ProjectBadge {
  name: string;
  badgeUrl: string;
  targetUrl: string;
  alt: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  longDescription?: string;
  tech: string[];
  specChips?: SpecChip[];
  badges?: ProjectBadge[];
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

export type BadgeScope = 
  | 'skills-directory' 
  | 'digital-fte' 
  | 'malikclaw' 
  | 'portfolio' 
  | 'azan-shop' 
  | 'unique-boutique' 
  | 'github';

export type BadgeStatus = 'active' | 'ready';

export interface OnlineBadge {
  id: string;
  name: string;
  project: string;
  scope: BadgeScope;
  category: string;
  status: BadgeStatus;
  badgeUrl: string;
  targetUrl: string;
  markdownSnippet: string;
  htmlSnippet: string;
  securityGrade?: string;
  description: string;
  missingFrom?: string;
}

export interface BadgesSummary {
  total: number;
  active: number;
  ready: number;
  skillsDirectoryCount: number;
  gradeACount: number;
  ecosystemCount: number;
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
    badges: [
      { name: "pkg.go.dev Reference", badgeUrl: "https://pkg.go.dev/badge/github.com/AbdullahMalik17/malikclaw.svg", targetUrl: "https://pkg.go.dev/github.com/AbdullahMalik17/malikclaw", alt: "Go Reference" },
      { name: "Go Report Card", badgeUrl: "https://goreportcard.com/badge/github.com/AbdullahMalik17/malikclaw", targetUrl: "https://goreportcard.com/report/github.com/AbdullahMalik17/malikclaw", alt: "Go Report Card" },
      { name: "MCP Market Listing", badgeUrl: "https://img.shields.io/badge/MCP%20Market-malikclaw-6366f1?style=flat-square&logo=databricks&logoColor=white", targetUrl: "https://mcpmarket.com/server/malikclaw", alt: "MCP Market" },
      { name: "License: MIT", badgeUrl: "https://img.shields.io/github/license/AbdullahMalik17/malikclaw?style=flat-square", targetUrl: "https://github.com/AbdullahMalik17/malikclaw/blob/main/LICENSE", alt: "License" },
      { name: "GitHub Stars", badgeUrl: "https://img.shields.io/github/stars/AbdullahMalik17/malikclaw?style=flat-square", targetUrl: "https://github.com/AbdullahMalik17/malikclaw/stargazers", alt: "Stars" }
    ],
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
    badges: [
      { name: "Skills Directory Author", badgeUrl: "https://img.shields.io/badge/Skills%20Directory-12%20Skills%20(Grade%20A)-10b981?style=flat-square&logo=claude&logoColor=white", targetUrl: "https://skillsdirectory.com/authors/abdullahmalik17", alt: "Skills Directory Author" },
      { name: "Snyk Security", badgeUrl: "https://snyk.io/test/github/AbdullahMalik17/Digital-FTE/badge.svg", targetUrl: "https://snyk.io/test/github/AbdullahMalik17/Digital-FTE", alt: "Snyk Security" },
      { name: "Python CI", badgeUrl: "https://github.com/AbdullahMalik17/Digital-FTE/actions/workflows/python-ci.yml/badge.svg", targetUrl: "https://github.com/AbdullahMalik17/Digital-FTE/actions/workflows/python-ci.yml", alt: "Python CI" },
      { name: "License: MIT", badgeUrl: "https://img.shields.io/badge/License-MIT-green?style=flat-square", targetUrl: "https://opensource.org/licenses/MIT", alt: "MIT License" },
      { name: "GitHub Stars", badgeUrl: "https://img.shields.io/github/stars/AbdullahMalik17/Digital-FTE?style=flat-square", targetUrl: "https://github.com/AbdullahMalik17/Digital-FTE/stargazers", alt: "Stars" },
      { name: "GitHub Forks", badgeUrl: "https://img.shields.io/github/forks/AbdullahMalik17/Digital-FTE?style=flat-square", targetUrl: "https://github.com/AbdullahMalik17/Digital-FTE/network/members", alt: "Forks" }
    ],
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
    badges: [
      { name: "Vercel Deployment", badgeUrl: "https://therealsujitk-vercel-badge.vercel.app/?app=portfolio-ai-assistant-of-malik-five", targetUrl: "https://portfolio-ai-assistant-of-malik-five.vercel.app/", alt: "Vercel Deployment" },
      { name: "Next.js 14/15", badgeUrl: "https://img.shields.io/badge/Framework-Next.js%2014-black?style=flat-square&logo=next.js", targetUrl: "https://nextjs.org/", alt: "Next.js" }
    ],
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
  },
  {
    id: "azan-shop-pos",
    title: "Azan Shop POS Software",
    subtitle: "Commercial Retail POS & Inventory Engine",
    description: "Production commercial desktop point-of-sale and retail inventory system engineered for high-throughput billing and cash operations.",
    longDescription: "A specialized commercial Point of Sale (POS) and inventory management system designed for Azan Shop retail operations, built with Python, featuring real-time receipt generation and barcode lookup.",
    tech: ["Python", "PostgreSQL", "Tkinter", "Barcode Scanner", "Thermal Printing"],
    specChips: [
      { name: "Python", category: "runtime" },
      { name: "PostgreSQL", category: "data" },
      { name: "Private Commercial", category: "infra" }
    ],
    badges: [
      { name: "Built With Python", badgeUrl: "https://img.shields.io/badge/Built%20With-Python-3776AB?style=flat-square&logo=python&logoColor=white", targetUrl: "https://github.com/AbdullahMalik17/Azan_Shop_Software-", alt: "Built With Python" },
      { name: "Status: Private Commercial", badgeUrl: "https://img.shields.io/badge/Status-Private%20Commercial-red?style=flat-square", targetUrl: "https://github.com/AbdullahMalik17/Azan_Shop_Software-", alt: "Commercial Status" }
    ],
    githubUrl: "https://github.com/AbdullahMalik17/Azan_Shop_Software-",
    liveUrl: null,
    category: "Commercial Systems",
    featured: false,
    iconName: "code"
  },
  {
    id: "unique-boutique",
    title: "Unique Boutique Platform",
    subtitle: "Apparel & Retail Management Platform",
    description: "Custom e-commerce and inventory management platform powering catalog management, orders, and sales tracking.",
    longDescription: "Full-cycle digital boutique and catalog application designed to manage custom apparel stock, customer orders, and retail distribution.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    specChips: [
      { name: "TypeScript", category: "runtime" },
      { name: "E-Commerce", category: "protocol" }
    ],
    badges: [
      { name: "E-Commerce: Unique Boutique", badgeUrl: "https://img.shields.io/badge/E--Commerce-Unique%20Boutique-pink?style=flat-square", targetUrl: "https://github.com/AbdullahMalik17/unique-boutique", alt: "Unique Boutique" }
    ],
    githubUrl: "https://github.com/AbdullahMalik17/unique-boutique",
    liveUrl: null,
    category: "Commercial Systems",
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
  },
  {
    title: "Skills Directory Certified Author — 12 Grade A Skills",
    issuer: "Skills Directory (skillsdirectory.com)",
    year: "2026",
    description: "Verified author credentials with 12 published Claude agent skills passing automated static analysis, prompt injection defense, and malware screening with Grade A certification.",
    skills: ["Agent Security", "Claude Skills", "Static Analysis", "Prompt Injection Defense", "MCP Automation"],
    credentialUrl: "https://skillsdirectory.com/authors/abdullahmalik17",
    iconName: "shield-check",
    badge: "12 Skills (Grade A)",
    agentId: "authors/abdullahmalik17"
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

// Summary metrics for badges
export const BADGES_SUMMARY: BadgesSummary = {
  total: 37,
  active: 35,
  ready: 2,
  skillsDirectoryCount: 12,
  gradeACount: 12,
  ecosystemCount: 6
};

// Full Online Badges & Certification Registry (37 Items)
export const ONLINE_BADGES: OnlineBadge[] = [
  // --- Skills Directory (12 Verified Grade A Skills) ---
  {
    id: "sd-digital-fte-orchestrator",
    name: "Digital FTE Orchestrator",
    project: "Digital FTE",
    scope: "skills-directory",
    category: "Agentic AI Security",
    status: "active",
    securityGrade: "A",
    badgeUrl: "https://www.skillsdirectory.com/api/skills/abdullahmalik17-digital-fte-orchestrator/badge",
    targetUrl: "https://www.skillsdirectory.com/skills/abdullahmalik17-digital-fte-orchestrator",
    markdownSnippet: "[![Security: A · Skills Directory](https://www.skillsdirectory.com/api/skills/abdullahmalik17-digital-fte-orchestrator/badge)](https://www.skillsdirectory.com/skills/abdullahmalik17-digital-fte-orchestrator)",
    htmlSnippet: '<a href="https://www.skillsdirectory.com/skills/abdullahmalik17-digital-fte-orchestrator"><img src="https://www.skillsdirectory.com/api/skills/abdullahmalik17-digital-fte-orchestrator/badge" alt="Security: A · Skills Directory" /></a>',
    description: "Security Grade: A (Malware & injection tested)",
    missingFrom: "Digital-FTE/README.md, AbdullahMalik17/README.md"
  },
  {
    id: "sd-managing-calendar",
    name: "Managing Calendar",
    project: "Digital FTE",
    scope: "skills-directory",
    category: "Google Calendar MCP",
    status: "active",
    securityGrade: "A",
    badgeUrl: "https://www.skillsdirectory.com/api/skills/abdullahmalik17-managing-calendar/badge",
    targetUrl: "https://www.skillsdirectory.com/skills/abdullahmalik17-managing-calendar",
    markdownSnippet: "[![Security: A · Skills Directory](https://www.skillsdirectory.com/api/skills/abdullahmalik17-managing-calendar/badge)](https://www.skillsdirectory.com/skills/abdullahmalik17-managing-calendar)",
    htmlSnippet: '<a href="https://www.skillsdirectory.com/skills/abdullahmalik17-managing-calendar"><img src="https://www.skillsdirectory.com/api/skills/abdullahmalik17-managing-calendar/badge" alt="Security: A · Skills Directory" /></a>',
    description: "Security Grade: A (Google Calendar MCP)",
    missingFrom: "Digital-FTE/README.md, .claude/skills/managing-calendar/SKILL.md"
  },
  {
    id: "sd-managing-services",
    name: "Managing Services",
    project: "Digital FTE",
    scope: "skills-directory",
    category: "Service Supervisor",
    status: "active",
    securityGrade: "A",
    badgeUrl: "https://www.skillsdirectory.com/api/skills/abdullahmalik17-managing-services/badge",
    targetUrl: "https://www.skillsdirectory.com/skills/abdullahmalik17-managing-services",
    markdownSnippet: "[![Security: A · Skills Directory](https://www.skillsdirectory.com/api/skills/abdullahmalik17-managing-services/badge)](https://www.skillsdirectory.com/skills/abdullahmalik17-managing-services)",
    htmlSnippet: '<a href="https://www.skillsdirectory.com/skills/abdullahmalik17-managing-services"><img src="https://www.skillsdirectory.com/api/skills/abdullahmalik17-managing-services/badge" alt="Security: A · Skills Directory" /></a>',
    description: "Security Grade: A (Service process supervisor)",
    missingFrom: "Digital-FTE/README.md, .claude/skills/managing-services/SKILL.md"
  },
  {
    id: "sd-posting-facebook",
    name: "Posting Facebook",
    project: "Digital FTE",
    scope: "skills-directory",
    category: "Meta Graph API",
    status: "active",
    securityGrade: "A",
    badgeUrl: "https://www.skillsdirectory.com/api/skills/abdullahmalik17-posting-facebook/badge",
    targetUrl: "https://www.skillsdirectory.com/skills/abdullahmalik17-posting-facebook",
    markdownSnippet: "[![Security: A · Skills Directory](https://www.skillsdirectory.com/api/skills/abdullahmalik17-posting-facebook/badge)](https://www.skillsdirectory.com/skills/abdullahmalik17-posting-facebook)",
    htmlSnippet: '<a href="https://www.skillsdirectory.com/skills/abdullahmalik17-posting-facebook"><img src="https://www.skillsdirectory.com/api/skills/abdullahmalik17-posting-facebook/badge" alt="Security: A · Skills Directory" /></a>',
    description: "Security Grade: A (Meta Graph API)",
    missingFrom: "Digital-FTE/README.md, .claude/skills/posting-facebook/SKILL.md"
  },
  {
    id: "sd-posting-instagram",
    name: "Posting Instagram",
    project: "Digital FTE",
    scope: "skills-directory",
    category: "Meta Media API",
    status: "active",
    securityGrade: "A",
    badgeUrl: "https://www.skillsdirectory.com/api/skills/abdullahmalik17-posting-instagram/badge",
    targetUrl: "https://www.skillsdirectory.com/skills/abdullahmalik17-posting-instagram",
    markdownSnippet: "[![Security: A · Skills Directory](https://www.skillsdirectory.com/api/skills/abdullahmalik17-posting-instagram/badge)](https://www.skillsdirectory.com/skills/abdullahmalik17-posting-instagram)",
    htmlSnippet: '<a href="https://www.skillsdirectory.com/skills/abdullahmalik17-posting-instagram"><img src="https://www.skillsdirectory.com/api/skills/abdullahmalik17-posting-instagram/badge" alt="Security: A · Skills Directory" /></a>',
    description: "Security Grade: A (Meta Graph API media)",
    missingFrom: "Digital-FTE/README.md, .claude/skills/posting-instagram/SKILL.md"
  },
  {
    id: "sd-posting-linkedin",
    name: "Posting LinkedIn",
    project: "Digital FTE",
    scope: "skills-directory",
    category: "Playwright Automation",
    status: "active",
    securityGrade: "A",
    badgeUrl: "https://www.skillsdirectory.com/api/skills/abdullahmalik17-posting-linkedin/badge",
    targetUrl: "https://www.skillsdirectory.com/skills/abdullahmalik17-posting-linkedin",
    markdownSnippet: "[![Security: A · Skills Directory](https://www.skillsdirectory.com/api/skills/abdullahmalik17-posting-linkedin/badge)](https://www.skillsdirectory.com/skills/abdullahmalik17-posting-linkedin)",
    htmlSnippet: '<a href="https://www.skillsdirectory.com/skills/abdullahmalik17-posting-linkedin"><img src="https://www.skillsdirectory.com/api/skills/abdullahmalik17-posting-linkedin/badge" alt="Security: A · Skills Directory" /></a>',
    description: "Security Grade: A (Playwright automation)",
    missingFrom: "Digital-FTE/README.md, .claude/skills/posting-linkedin/SKILL.md"
  },
  {
    id: "sd-posting-twitter",
    name: "Posting Twitter",
    project: "Digital FTE",
    scope: "skills-directory",
    category: "Twitter API v2",
    status: "active",
    securityGrade: "A",
    badgeUrl: "https://www.skillsdirectory.com/api/skills/abdullahmalik17-posting-twitter/badge",
    targetUrl: "https://www.skillsdirectory.com/skills/abdullahmalik17-posting-twitter",
    markdownSnippet: "[![Security: A · Skills Directory](https://www.skillsdirectory.com/api/skills/abdullahmalik17-posting-twitter/badge)](https://www.skillsdirectory.com/skills/abdullahmalik17-posting-twitter)",
    htmlSnippet: '<a href="https://www.skillsdirectory.com/skills/abdullahmalik17-posting-twitter"><img src="https://www.skillsdirectory.com/api/skills/abdullahmalik17-posting-twitter/badge" alt="Security: A · Skills Directory" /></a>',
    description: "Security Grade: A (Twitter API v2)",
    missingFrom: "Digital-FTE/README.md, .claude/skills/posting-twitter/SKILL.md"
  },
  {
    id: "sd-project-designer",
    name: "Project Designer",
    project: "Digital FTE",
    scope: "skills-directory",
    category: "Architecture Planning",
    status: "active",
    securityGrade: "A",
    badgeUrl: "https://www.skillsdirectory.com/api/skills/abdullahmalik17-project-designer/badge",
    targetUrl: "https://www.skillsdirectory.com/skills/abdullahmalik17-project-designer",
    markdownSnippet: "[![Security: A · Skills Directory](https://www.skillsdirectory.com/api/skills/abdullahmalik17-project-designer/badge)](https://www.skillsdirectory.com/skills/abdullahmalik17-project-designer)",
    htmlSnippet: '<a href="https://www.skillsdirectory.com/skills/abdullahmalik17-project-designer"><img src="https://www.skillsdirectory.com/api/skills/abdullahmalik17-project-designer/badge" alt="Security: A · Skills Directory" /></a>',
    description: "Security Grade: A (Architecture planning)",
    missingFrom: "Digital-FTE/README.md, .claude/skills/project-designer/SKILL.md"
  },
  {
    id: "sd-project-designer-digital-fte",
    name: "Project Designer Digital FTE",
    project: "Digital FTE",
    scope: "skills-directory",
    category: "FTE System Architecture",
    status: "active",
    securityGrade: "A",
    badgeUrl: "https://www.skillsdirectory.com/api/skills/abdullahmalik17-project-designer-digital-fte/badge",
    targetUrl: "https://www.skillsdirectory.com/skills/abdullahmalik17-project-designer-digital-fte",
    markdownSnippet: "[![Security: A · Skills Directory](https://www.skillsdirectory.com/api/skills/abdullahmalik17-project-designer-digital-fte/badge)](https://www.skillsdirectory.com/skills/abdullahmalik17-project-designer-digital-fte)",
    htmlSnippet: '<a href="https://www.skillsdirectory.com/skills/abdullahmalik17-project-designer-digital-fte"><img src="https://www.skillsdirectory.com/api/skills/abdullahmalik17-project-designer-digital-fte/badge" alt="Security: A · Skills Directory" /></a>',
    description: "Security Grade: A (FTE system architecture)",
    missingFrom: "Digital-FTE/README.md, .claude/skills/digital-fte-orchestrator/SKILL.md"
  },
  {
    id: "sd-watching-filesystem",
    name: "Watching Filesystem",
    project: "Digital FTE",
    scope: "skills-directory",
    category: "Filesystem Observer",
    status: "active",
    securityGrade: "A",
    badgeUrl: "https://www.skillsdirectory.com/api/skills/abdullahmalik17-watching-filesystem/badge",
    targetUrl: "https://www.skillsdirectory.com/skills/abdullahmalik17-watching-filesystem",
    markdownSnippet: "[![Security: A · Skills Directory](https://www.skillsdirectory.com/api/skills/abdullahmalik17-watching-filesystem/badge)](https://www.skillsdirectory.com/skills/abdullahmalik17-watching-filesystem)",
    htmlSnippet: '<a href="https://www.skillsdirectory.com/skills/abdullahmalik17-watching-filesystem"><img src="https://www.skillsdirectory.com/api/skills/abdullahmalik17-watching-filesystem/badge" alt="Security: A · Skills Directory" /></a>',
    description: "Security Grade: A (Filesystem observer)",
    missingFrom: "Digital-FTE/README.md, .claude/skills/watching-filesystem/SKILL.md"
  },
  {
    id: "sd-watching-gmail",
    name: "Watching Gmail",
    project: "Digital FTE",
    scope: "skills-directory",
    category: "IMAP Email Watcher",
    status: "active",
    securityGrade: "A",
    badgeUrl: "https://www.skillsdirectory.com/api/skills/abdullahmalik17-watching-gmail/badge",
    targetUrl: "https://www.skillsdirectory.com/skills/abdullahmalik17-watching-gmail",
    markdownSnippet: "[![Security: A · Skills Directory](https://www.skillsdirectory.com/api/skills/abdullahmalik17-watching-gmail/badge)](https://www.skillsdirectory.com/skills/abdullahmalik17-watching-gmail)",
    htmlSnippet: '<a href="https://www.skillsdirectory.com/skills/abdullahmalik17-watching-gmail"><img src="https://www.skillsdirectory.com/api/skills/abdullahmalik17-watching-gmail/badge" alt="Security: A · Skills Directory" /></a>',
    description: "Security Grade: A (IMAP email watcher)",
    missingFrom: "Digital-FTE/README.md, .claude/skills/watching-gmail/SKILL.md"
  },
  {
    id: "sd-watching-whatsapp",
    name: "Watching WhatsApp",
    project: "Digital FTE",
    scope: "skills-directory",
    category: "WhatsApp Automation",
    status: "active",
    securityGrade: "A",
    badgeUrl: "https://www.skillsdirectory.com/api/skills/abdullahmalik17-watching-whatsapp/badge",
    targetUrl: "https://www.skillsdirectory.com/skills/abdullahmalik17-watching-whatsapp",
    markdownSnippet: "[![Security: A · Skills Directory](https://www.skillsdirectory.com/api/skills/abdullahmalik17-watching-whatsapp/badge)](https://www.skillsdirectory.com/skills/abdullahmalik17-watching-whatsapp)",
    htmlSnippet: '<a href="https://www.skillsdirectory.com/skills/abdullahmalik17-watching-whatsapp"><img src="https://www.skillsdirectory.com/api/skills/abdullahmalik17-watching-whatsapp/badge" alt="Security: A · Skills Directory" /></a>',
    description: "Security Grade: A (WhatsApp automation)",
    missingFrom: "Digital-FTE/README.md, .claude/skills/watching-whatsapp/SKILL.md"
  },

  // --- Digital-FTE Badges (9 Badges) ---
  {
    id: "fte-skills-author",
    name: "Skills Directory Author",
    project: "Digital-FTE",
    scope: "digital-fte",
    category: "Security & Skills",
    status: "active",
    badgeUrl: "https://img.shields.io/badge/Skills%20Directory-12%20Skills%20(Grade%20A)-10b981?style=flat-square&logo=claude&logoColor=white",
    targetUrl: "https://skillsdirectory.com/authors/abdullahmalik17",
    markdownSnippet: "[![Skills Directory Author](https://img.shields.io/badge/Skills%20Directory-12%20Skills%20(Grade%20A)-10b981?style=flat-square&logo=claude&logoColor=white)](https://skillsdirectory.com/authors/abdullahmalik17)",
    htmlSnippet: '<a href="https://skillsdirectory.com/authors/abdullahmalik17"><img src="https://img.shields.io/badge/Skills%20Directory-12%20Skills%20(Grade%20A)-10b981?style=flat-square&logo=claude&logoColor=white" alt="Skills Directory Author" /></a>',
    description: "12 Verified Skills Summary (Grade A)",
    missingFrom: "Digital-FTE/README.md, AbdullahMalik17/README.md"
  },
  {
    id: "fte-snyk-security",
    name: "Snyk Security",
    project: "Digital-FTE",
    scope: "digital-fte",
    category: "Vulnerability Scanning",
    status: "active",
    badgeUrl: "https://snyk.io/test/github/AbdullahMalik17/Digital-FTE/badge.svg",
    targetUrl: "https://snyk.io/test/github/AbdullahMalik17/Digital-FTE",
    markdownSnippet: "[![Snyk Security](https://snyk.io/test/github/AbdullahMalik17/Digital-FTE/badge.svg)](https://snyk.io/test/github/AbdullahMalik17/Digital-FTE)",
    htmlSnippet: '<a href="https://snyk.io/test/github/AbdullahMalik17/Digital-FTE"><img src="https://snyk.io/test/github/AbdullahMalik17/Digital-FTE/badge.svg" alt="Snyk Security" /></a>',
    description: "Vulnerability & dependency scanning",
    missingFrom: "Digital-FTE/README.md"
  },
  {
    id: "fte-python-ci",
    name: "Python CI",
    project: "Digital-FTE",
    scope: "digital-fte",
    category: "Continuous Integration",
    status: "active",
    badgeUrl: "https://github.com/AbdullahMalik17/Digital-FTE/actions/workflows/python-ci.yml/badge.svg",
    targetUrl: "https://github.com/AbdullahMalik17/Digital-FTE/actions/workflows/python-ci.yml",
    markdownSnippet: "[![Python CI](https://github.com/AbdullahMalik17/Digital-FTE/actions/workflows/python-ci.yml/badge.svg)](https://github.com/AbdullahMalik17/Digital-FTE/actions/workflows/python-ci.yml)",
    htmlSnippet: '<a href="https://github.com/AbdullahMalik17/Digital-FTE/actions/workflows/python-ci.yml"><img src="https://github.com/AbdullahMalik17/Digital-FTE/actions/workflows/python-ci.yml/badge.svg" alt="Python CI" /></a>',
    description: "GitHub Actions CI build & tests status"
  },
  {
    id: "fte-mit-license",
    name: "MIT License",
    project: "Digital-FTE",
    scope: "digital-fte",
    category: "Open Source License",
    status: "active",
    badgeUrl: "https://img.shields.io/badge/License-MIT-green?style=flat-square",
    targetUrl: "https://opensource.org/licenses/MIT",
    markdownSnippet: "[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](https://opensource.org/licenses/MIT)",
    htmlSnippet: '<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License: MIT" /></a>',
    description: "Open-source license indicator"
  },
  {
    id: "fte-stars",
    name: "GitHub Stars",
    project: "Digital-FTE",
    scope: "digital-fte",
    category: "Community Traction",
    status: "active",
    badgeUrl: "https://img.shields.io/github/stars/AbdullahMalik17/Digital-FTE?style=flat-square",
    targetUrl: "https://github.com/AbdullahMalik17/Digital-FTE/stargazers",
    markdownSnippet: "[![Stars](https://img.shields.io/github/stars/AbdullahMalik17/Digital-FTE?style=flat-square)](https://github.com/AbdullahMalik17/Digital-FTE/stargazers)",
    htmlSnippet: '<a href="https://github.com/AbdullahMalik17/Digital-FTE/stargazers"><img src="https://img.shields.io/github/stars/AbdullahMalik17/Digital-FTE?style=flat-square" alt="Stars" /></a>',
    description: "Repository stargazers counter"
  },
  {
    id: "fte-forks",
    name: "GitHub Forks",
    project: "Digital-FTE",
    scope: "digital-fte",
    category: "Community Traction",
    status: "active",
    badgeUrl: "https://img.shields.io/github/forks/AbdullahMalik17/Digital-FTE?style=flat-square",
    targetUrl: "https://github.com/AbdullahMalik17/Digital-FTE/network/members",
    markdownSnippet: "[![Forks](https://img.shields.io/github/forks/AbdullahMalik17/Digital-FTE?style=flat-square)](https://github.com/AbdullahMalik17/Digital-FTE/network/members)",
    htmlSnippet: '<a href="https://github.com/AbdullahMalik17/Digital-FTE/network/members"><img src="https://img.shields.io/github/forks/AbdullahMalik17/Digital-FTE?style=flat-square" alt="Forks" /></a>',
    description: "Repository forks counter",
    missingFrom: "Digital-FTE/README.md"
  },
  {
    id: "fte-issues",
    name: "GitHub Issues",
    project: "Digital-FTE",
    scope: "digital-fte",
    category: "Issue Tracking",
    status: "active",
    badgeUrl: "https://img.shields.io/github/issues/AbdullahMalik17/Digital-FTE?style=flat-square",
    targetUrl: "https://github.com/AbdullahMalik17/Digital-FTE/issues",
    markdownSnippet: "[![Issues](https://img.shields.io/github/issues/AbdullahMalik17/Digital-FTE?style=flat-square)](https://github.com/AbdullahMalik17/Digital-FTE/issues)",
    htmlSnippet: '<a href="https://github.com/AbdullahMalik17/Digital-FTE/issues"><img src="https://img.shields.io/github/issues/AbdullahMalik17/Digital-FTE?style=flat-square" alt="Issues" /></a>',
    description: "Open issues tracker",
    missingFrom: "Digital-FTE/README.md"
  },
  {
    id: "fte-codefactor",
    name: "CodeFactor Quality",
    project: "Digital-FTE",
    scope: "digital-fte",
    category: "Code Quality",
    status: "ready",
    badgeUrl: "https://www.codefactor.io/repository/github/AbdullahMalik17/Digital-FTE/badge",
    targetUrl: "https://www.codefactor.io/repository/github/AbdullahMalik17/Digital-FTE",
    markdownSnippet: "[![CodeFactor](https://www.codefactor.io/repository/github/AbdullahMalik17/Digital-FTE/badge)](https://www.codefactor.io/repository/github/AbdullahMalik17/Digital-FTE)",
    htmlSnippet: '<a href="https://www.codefactor.io/repository/github/AbdullahMalik17/Digital-FTE"><img src="https://www.codefactor.io/repository/github/AbdullahMalik17/Digital-FTE/badge" alt="CodeFactor" /></a>',
    description: "Automated code quality grade (Ready to Activate)",
    missingFrom: "Digital-FTE/README.md"
  },
  {
    id: "fte-codecov",
    name: "Codecov Coverage",
    project: "Digital-FTE",
    scope: "digital-fte",
    category: "Test Coverage",
    status: "ready",
    badgeUrl: "https://codecov.io/gh/AbdullahMalik17/Digital-FTE/branch/main/graph/badge.svg",
    targetUrl: "https://codecov.io/gh/AbdullahMalik17/Digital-FTE",
    markdownSnippet: "[![codecov](https://codecov.io/gh/AbdullahMalik17/Digital-FTE/branch/main/graph/badge.svg)](https://codecov.io/gh/AbdullahMalik17/Digital-FTE)",
    htmlSnippet: '<a href="https://codecov.io/gh/AbdullahMalik17/Digital-FTE"><img src="https://codecov.io/gh/AbdullahMalik17/Digital-FTE/branch/main/graph/badge.svg" alt="codecov" /></a>',
    description: "Automated test coverage percentage (Ready to Activate)",
    missingFrom: "Digital-FTE/README.md"
  },

  // --- malikclaw Badges (5 Badges) ---
  {
    id: "malikclaw-pkg-go-dev",
    name: "pkg.go.dev Reference",
    project: "malikclaw",
    scope: "malikclaw",
    category: "Go Documentation",
    status: "active",
    badgeUrl: "https://pkg.go.dev/badge/github.com/AbdullahMalik17/malikclaw.svg",
    targetUrl: "https://pkg.go.dev/github.com/AbdullahMalik17/malikclaw",
    markdownSnippet: "[![Go Reference](https://pkg.go.dev/badge/github.com/AbdullahMalik17/malikclaw.svg)](https://pkg.go.dev/github.com/AbdullahMalik17/malikclaw)",
    htmlSnippet: '<a href="https://pkg.go.dev/github.com/AbdullahMalik17/malikclaw"><img src="https://pkg.go.dev/badge/github.com/AbdullahMalik17/malikclaw.svg" alt="Go Reference" /></a>',
    description: "Official Go documentation & API index",
    missingFrom: "malikclaw/README.md, portfolio"
  },
  {
    id: "malikclaw-goreportcard",
    name: "Go Report Card",
    project: "malikclaw",
    scope: "malikclaw",
    category: "Go Code Quality",
    status: "active",
    badgeUrl: "https://goreportcard.com/badge/github.com/AbdullahMalik17/malikclaw",
    targetUrl: "https://goreportcard.com/report/github.com/AbdullahMalik17/malikclaw",
    markdownSnippet: "[![Go Report Card](https://goreportcard.com/badge/github.com/AbdullahMalik17/malikclaw)](https://goreportcard.com/report/github.com/AbdullahMalik17/malikclaw)",
    htmlSnippet: '<a href="https://goreportcard.com/report/github.com/AbdullahMalik17/malikclaw"><img src="https://goreportcard.com/badge/github.com/AbdullahMalik17/malikclaw" alt="Go Report Card" /></a>',
    description: "Automated Go code quality & formatting grade",
    missingFrom: "malikclaw/README.md"
  },
  {
    id: "malikclaw-mcpmarket",
    name: "MCP Market Listing",
    project: "malikclaw",
    scope: "malikclaw",
    category: "Model Context Protocol",
    status: "active",
    badgeUrl: "https://img.shields.io/badge/MCP%20Market-malikclaw-6366f1?style=flat-square&logo=databricks&logoColor=white",
    targetUrl: "https://mcpmarket.com/server/malikclaw",
    markdownSnippet: "[![MCP Market](https://img.shields.io/badge/MCP%20Market-malikclaw-6366f1?style=flat-square&logo=databricks&logoColor=white)](https://mcpmarket.com/server/malikclaw)",
    htmlSnippet: '<a href="https://mcpmarket.com/server/malikclaw"><img src="https://img.shields.io/badge/MCP%20Market-malikclaw-6366f1?style=flat-square&logo=databricks&logoColor=white" alt="MCP Market" /></a>',
    description: "Official Model Context Protocol Market registry",
    missingFrom: "malikclaw/README.md, Digital-FTE/README.md"
  },
  {
    id: "malikclaw-license",
    name: "GitHub License",
    project: "malikclaw",
    scope: "malikclaw",
    category: "Open Source License",
    status: "active",
    badgeUrl: "https://img.shields.io/github/license/AbdullahMalik17/malikclaw?style=flat-square",
    targetUrl: "https://github.com/AbdullahMalik17/malikclaw/blob/main/LICENSE",
    markdownSnippet: "[![License](https://img.shields.io/github/license/AbdullahMalik17/malikclaw?style=flat-square)](https://github.com/AbdullahMalik17/malikclaw/blob/main/LICENSE)",
    htmlSnippet: '<a href="https://github.com/AbdullahMalik17/malikclaw/blob/main/LICENSE"><img src="https://img.shields.io/github/license/AbdullahMalik17/malikclaw?style=flat-square" alt="License" /></a>',
    description: "Open-source license indicator",
    missingFrom: "malikclaw/README.md"
  },
  {
    id: "malikclaw-stars",
    name: "GitHub Stars",
    project: "malikclaw",
    scope: "malikclaw",
    category: "Community Traction",
    status: "active",
    badgeUrl: "https://img.shields.io/github/stars/AbdullahMalik17/malikclaw?style=flat-square",
    targetUrl: "https://github.com/AbdullahMalik17/malikclaw/stargazers",
    markdownSnippet: "[![Stars](https://img.shields.io/github/stars/AbdullahMalik17/malikclaw?style=flat-square)](https://github.com/AbdullahMalik17/malikclaw/stargazers)",
    htmlSnippet: '<a href="https://github.com/AbdullahMalik17/malikclaw/stargazers"><img src="https://img.shields.io/github/stars/AbdullahMalik17/malikclaw?style=flat-square" alt="Stars" /></a>',
    description: "Repository stargazers counter",
    missingFrom: "malikclaw/README.md"
  },

  // --- Portfolio AI Assistant Badges (2 Badges) ---
  {
    id: "portfolio-vercel",
    name: "Vercel Deployment",
    project: "portfolio-ai-assistant-of-malik",
    scope: "portfolio",
    category: "Cloud Deployment",
    status: "active",
    badgeUrl: "https://therealsujitk-vercel-badge.vercel.app/?app=portfolio-ai-assistant-of-malik-five",
    targetUrl: "https://portfolio-ai-assistant-of-malik-five.vercel.app/",
    markdownSnippet: "[![Vercel Deployment](https://therealsujitk-vercel-badge.vercel.app/?app=portfolio-ai-assistant-of-malik-five)](https://portfolio-ai-assistant-of-malik-five.vercel.app/)",
    htmlSnippet: '<a href="https://portfolio-ai-assistant-of-malik-five.vercel.app/"><img src="https://therealsujitk-vercel-badge.vercel.app/?app=portfolio-ai-assistant-of-malik-five" alt="Vercel Deployment" /></a>',
    description: "Live web production deployment status",
    missingFrom: "portfolio_ai_assistant_of_malik/README.md, site footer"
  },
  {
    id: "portfolio-nextjs",
    name: "Next.js Stack",
    project: "portfolio-ai-assistant-of-malik",
    scope: "portfolio",
    category: "Web Framework",
    status: "active",
    badgeUrl: "https://img.shields.io/badge/Framework-Next.js%2014-black?style=flat-square&logo=next.js",
    targetUrl: "https://nextjs.org/",
    markdownSnippet: "[![Next.js](https://img.shields.io/badge/Framework-Next.js%2014-black?style=flat-square&logo=next.js)](https://nextjs.org/)",
    htmlSnippet: '<a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Framework-Next.js%2014-black?style=flat-square&logo=next.js" alt="Next.js" /></a>',
    description: "Technology stack indicator",
    missingFrom: "portfolio_ai_assistant_of_malik/README.md"
  },

  // --- Azan Shop POS Badges (2 Badges) ---
  {
    id: "azan-built-python",
    name: "Built With Python",
    project: "Azan Shop POS",
    scope: "azan-shop",
    category: "Architecture",
    status: "active",
    badgeUrl: "https://img.shields.io/badge/Built%20With-Python-3776AB?style=flat-square&logo=python&logoColor=white",
    targetUrl: "https://github.com/AbdullahMalik17/Azan_Shop_Software-",
    markdownSnippet: "[![Python](https://img.shields.io/badge/Built%20With-Python-3776AB?style=flat-square&logo=python&logoColor=white)](https://github.com/AbdullahMalik17/Azan_Shop_Software-)",
    htmlSnippet: '<a href="https://github.com/AbdullahMalik17/Azan_Shop_Software-"><img src="https://img.shields.io/badge/Built%20With-Python-3776AB?style=flat-square&logo=python&logoColor=white" alt="Built With Python" /></a>',
    description: "Core software architecture badge",
    missingFrom: "Azan_Shop_Software-/README.md"
  },
  {
    id: "azan-commercial-status",
    name: "Commercial Status",
    project: "Azan Shop POS",
    scope: "azan-shop",
    category: "Confidentiality",
    status: "active",
    badgeUrl: "https://img.shields.io/badge/Status-Private%20Commercial-red?style=flat-square",
    targetUrl: "https://github.com/AbdullahMalik17/Azan_Shop_Software-",
    markdownSnippet: "[![Status](https://img.shields.io/badge/Status-Private%20Commercial-red?style=flat-square)](https://github.com/AbdullahMalik17/Azan_Shop_Software-)",
    htmlSnippet: '<a href="https://github.com/AbdullahMalik17/Azan_Shop_Software-"><img src="https://img.shields.io/badge/Status-Private%20Commercial-red?style=flat-square" alt="Status" /></a>',
    description: "Repository confidentiality indicator",
    missingFrom: "Azan_Shop_Software-/README.md"
  },

  // --- Unique Boutique Badges (1 Badge) ---
  {
    id: "unique-boutique-ecommerce",
    name: "E-Commerce Software",
    project: "Unique Boutique",
    scope: "unique-boutique",
    category: "Business Solution",
    status: "active",
    badgeUrl: "https://img.shields.io/badge/E--Commerce-Unique%20Boutique-pink?style=flat-square",
    targetUrl: "https://github.com/AbdullahMalik17/unique-boutique",
    markdownSnippet: "[![App](https://img.shields.io/badge/E--Commerce-Unique%20Boutique-pink?style=flat-square)](https://github.com/AbdullahMalik17/unique-boutique)",
    htmlSnippet: '<a href="https://github.com/AbdullahMalik17/unique-boutique"><img src="https://img.shields.io/badge/E--Commerce-Unique%20Boutique-pink?style=flat-square" alt="Unique Boutique" /></a>',
    description: "Business solution indicator",
    missingFrom: "unique-boutique/README.md"
  },

  // --- GitHub Profile & Achievements (6 Badges) ---
  {
    id: "github-starstruck",
    name: "Achievement: Starstruck",
    project: "GitHub Profile",
    scope: "github",
    category: "GitHub Honor",
    status: "active",
    badgeUrl: "https://github.githubassets.com/assets/starstruck-default-b6610abad518.png",
    targetUrl: "https://github.com/AbdullahMalik17?achievement=starstruck&tab=achievements",
    markdownSnippet: "[![Starstruck](https://github.githubassets.com/assets/starstruck-default-b6610abad518.png)](https://github.com/AbdullahMalik17?achievement=starstruck&tab=achievements)",
    htmlSnippet: '<a href="https://github.com/AbdullahMalik17?achievement=starstruck&tab=achievements"><img src="https://github.githubassets.com/assets/starstruck-default-b6610abad518.png" width="60" alt="Starstruck" /></a>',
    description: "Earned for receiving stars on repositories",
    missingFrom: "Profile README, Portfolio website"
  },
  {
    id: "github-pull-shark",
    name: "Achievement: Pull Shark",
    project: "GitHub Profile",
    scope: "github",
    category: "GitHub Honor",
    status: "active",
    badgeUrl: "https://github.githubassets.com/assets/pull-shark-default-498c279a747d.png",
    targetUrl: "https://github.com/AbdullahMalik17?achievement=pull-shark&tab=achievements",
    markdownSnippet: "[![Pull Shark](https://github.githubassets.com/assets/pull-shark-default-498c279a747d.png)](https://github.com/AbdullahMalik17?achievement=pull-shark&tab=achievements)",
    htmlSnippet: '<a href="https://github.com/AbdullahMalik17?achievement=pull-shark&tab=achievements"><img src="https://github.githubassets.com/assets/pull-shark-default-498c279a747d.png" width="60" alt="Pull Shark" /></a>',
    description: "Earned for merged pull requests",
    missingFrom: "Profile README, Portfolio website"
  },
  {
    id: "github-pair-extraordinaire",
    name: "Achievement: Pair Extraordinaire",
    project: "GitHub Profile",
    scope: "github",
    category: "GitHub Honor",
    status: "active",
    badgeUrl: "https://github.githubassets.com/assets/pair-extraordinaire-default-579438a20e01.png",
    targetUrl: "https://github.com/AbdullahMalik17?achievement=pair-extraordinaire&tab=achievements",
    markdownSnippet: "[![Pair Extraordinaire](https://github.githubassets.com/assets/pair-extraordinaire-default-579438a20e01.png)](https://github.com/AbdullahMalik17?achievement=pair-extraordinaire&tab=achievements)",
    htmlSnippet: '<a href="https://github.com/AbdullahMalik17?achievement=pair-extraordinaire&tab=achievements"><img src="https://github.githubassets.com/assets/pair-extraordinaire-default-579438a20e01.png" width="60" alt="Pair Extraordinaire" /></a>',
    description: "Earned for co-authored merged pull requests",
    missingFrom: "Profile README, Portfolio website"
  },
  {
    id: "github-followers",
    name: "GitHub Followers",
    project: "GitHub Profile",
    scope: "github",
    category: "Community Reach",
    status: "active",
    badgeUrl: "https://img.shields.io/github/followers/AbdullahMalik17?label=Follow%20%40AbdullahMalik17&style=social",
    targetUrl: "https://github.com/AbdullahMalik17",
    markdownSnippet: "[![GitHub Followers](https://img.shields.io/github/followers/AbdullahMalik17?label=Follow%20%40AbdullahMalik17&style=social)](https://github.com/AbdullahMalik17)",
    htmlSnippet: '<a href="https://github.com/AbdullahMalik17"><img src="https://img.shields.io/github/followers/AbdullahMalik17?label=Follow%20%40AbdullahMalik17&style=social" alt="GitHub Followers" /></a>',
    description: "Community followers count",
    missingFrom: "Profile README, Portfolio website"
  },
  {
    id: "github-stats-card",
    name: "GitHub Readme Stats",
    project: "GitHub Profile",
    scope: "github",
    category: "Profile Metrics",
    status: "active",
    badgeUrl: "https://github-readme-stats.vercel.app/api?username=AbdullahMalik17&show_icons=true&theme=radical",
    targetUrl: "https://github.com/AbdullahMalik17",
    markdownSnippet: "[![GitHub Stats](https://github-readme-stats.vercel.app/api?username=AbdullahMalik17&show_icons=true&theme=radical)](https://github.com/AbdullahMalik17)",
    htmlSnippet: '<a href="https://github.com/AbdullahMalik17"><img src="https://github-readme-stats.vercel.app/api?username=AbdullahMalik17&show_icons=true&theme=radical" alt="GitHub Stats" /></a>',
    description: "Comprehensive GitHub statistics card",
    missingFrom: "Profile README, Portfolio website"
  },
  {
    id: "github-top-langs",
    name: "Top Languages Card",
    project: "GitHub Profile",
    scope: "github",
    category: "Language Breakdown",
    status: "active",
    badgeUrl: "https://github-readme-stats.vercel.app/api/top-langs/?username=AbdullahMalik17&layout=compact&theme=radical",
    targetUrl: "https://github.com/AbdullahMalik17",
    markdownSnippet: "[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=AbdullahMalik17&layout=compact&theme=radical)](https://github.com/AbdullahMalik17)",
    htmlSnippet: '<a href="https://github.com/AbdullahMalik17"><img src="https://github-readme-stats.vercel.app/api/top-langs/?username=AbdullahMalik17&layout=compact&theme=radical" alt="Top Langs" /></a>',
    description: "Language percentage breakdown card",
    missingFrom: "Profile README, Portfolio website"
  }
];
