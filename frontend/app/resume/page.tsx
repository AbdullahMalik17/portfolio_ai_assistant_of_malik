'use client';

import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeft, Printer, Download, Star, GitPullRequest, 
  Users, ShieldCheck, Globe, Mail, Phone, Github, Linkedin, 
  GraduationCap, Award, Cpu
} from 'lucide-react';
import { GITHUB_PROFILE } from '../lib/portfolio-data';

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-canvas text-ink py-8 px-4 sm:px-6 lg:px-8 print:bg-white print:text-black print:p-0">
      {/* Top Floating Actions - Hidden in Print */}
      <div className="max-w-4xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass border border-line text-ink hover:text-ink hover:border-accent/40 text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>

        <div className="flex items-center gap-3">
          <a
            href="/Abdullah_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass border border-line text-ink hover:text-ink text-xs font-semibold transition-colors"
          >
            <Download className="w-4 h-4 text-accent" />
            <span>Raw PDF File</span>
          </a>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-accent text-accent-ink text-xs font-bold shadow-lg shadow-accent/20 hover:opacity-90 transition-opacity cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Main Resume Sheet */}
      <main className="max-w-4xl mx-auto bg-surface/60 border border-line rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-xl print:border-none print:shadow-none print:p-4 print:bg-white print:text-canvas">
        
        {/* Header with Photo & Coordinates */}
        <header className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-8 border-b border-line print:border-slate-300 print:pb-6">
          <div className="relative shrink-0">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden ring-2 ring-accent/30 print:ring-1 print:ring-slate-400 shadow-xl bg-canvas">
              <Image
                src="/profile.jpg"
                alt="Abdullah Malik"
                width={128}
                height={128}
                priority
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight print:text-slate-950">
                Abdullah Malik
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/30 text-accent font-mono font-bold print:border-slate-400 print:text-ink-subtle">
                BS Data Science (IUB)
              </span>
            </div>
            
            <p className="text-base font-semibold text-ink print:text-ink-subtle">
              Agentic AI Engineer and Data Science Undergraduate
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1.5 text-xs text-ink-muted print:text-ink-subtle font-mono pt-1">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-accent print:text-ink-subtle" />
                <a href="mailto:muhammadabdullah51700@gmail.com" className="hover:text-accent print:text-ink-subtle">
                  muhammadabdullah51700@gmail.com
                </a>
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-accent print:text-ink-subtle" />
                <span>+92 304 0705172</span>
              </span>
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-accent print:text-ink-subtle" />
                <a href="https://portfolio-ai-assistant-of-malik.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-accent print:text-ink-subtle">
                  portfolio-ai-assistant.vercel.app
                </a>
              </span>
              <span className="flex items-center gap-1">
                <Github className="w-3.5 h-3.5 text-accent print:text-ink-subtle" />
                <a href="https://github.com/AbdullahMalik17" target="_blank" rel="noopener noreferrer" className="hover:text-accent print:text-ink-subtle">
                  github.com/AbdullahMalik17
                </a>
              </span>
              <span className="flex items-center gap-1">
                <Linkedin className="w-3.5 h-3.5 text-accent print:text-ink-subtle" />
                <a href="https://www.linkedin.com/in/muhammad-abdullah-athar" target="_blank" rel="noopener noreferrer" className="hover:text-accent print:text-ink-subtle">
                  in/muhammad-abdullah-athar
                </a>
              </span>
            </div>
          </div>
        </header>

        {/* Executive Summary */}
        <section className="py-6 border-b border-line print:border-slate-300 print:py-4">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-accent print:text-ink-subtle mb-2">
            Executive Profile
          </h2>
          <p className="text-xs sm:text-sm text-ink print:text-ink-subtle leading-relaxed font-sans">
            Agentic AI engineer and Data Science undergraduate at <strong>Islamia University of Bahawalpur (IUB)</strong>. Specialized in Agentic AI architectures, compiled edge runtimes in Go (&lt;10MB RAM footprint), and verifiable Model Context Protocol (MCP) tooling. Creator of <strong>MalikClaw</strong> (recipient of the <strong>GitHub Starstruck Bronze Achievement</strong>, {GITHUB_PROFILE.malikclawStars} community stars, listed on MCP Market) and holder of the audited <strong>A2AS Behavior Certificate</strong> for AI Agent Security & Governance.
          </p>
        </section>

        {/* Education Section */}
        <section className="py-6 border-b border-line print:border-slate-300 print:py-4">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-accent print:text-ink-subtle mb-4 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-accent print:text-ink-subtle" />
            Education & Academic Specializations
          </h2>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
              <div>
                <h3 className="text-sm font-bold text-ink print:text-canvas">
                  Islamia University of Bahawalpur (IUB)
                </h3>
                <div className="text-xs font-semibold text-accent print:text-ink-subtle">
                  Bachelor of Science in Data Science (BS Data Science)
                </div>
                <p className="text-xs text-ink-muted print:text-ink-subtle mt-1">
                  Core Focus: Statistical Analysis, Linear Algebra, Machine Learning Models, Data Structures & Algorithms, Big Data Analytics. Bridging mathematical foundations with autonomous AI agents.
                </p>
              </div>
              <div className="text-[11px] font-mono text-ink-muted print:text-ink-subtle shrink-0">
                2025 – Present • Pakistan
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 pt-2">
              <div>
                <h3 className="text-sm font-bold text-ink print:text-canvas">
                  Panaversity
                </h3>
                <div className="text-xs font-semibold text-accent print:text-ink-subtle">
                  Specialist Certification in Agentic AI & Swarm Architectures
                </div>
                <p className="text-xs text-ink-muted print:text-ink-subtle mt-1">
                  Mastered OpenAI Agents SDK, LangChain, tool calling schemas, autonomous memory systems (MEM0), and N8N workflow automations.
                </p>
              </div>
              <div className="text-[11px] font-mono text-ink-muted print:text-ink-subtle shrink-0">
                2024
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 pt-2">
              <div>
                <h3 className="text-sm font-bold text-ink print:text-canvas">
                  Presidential Initiative for Artificial Intelligence & Computing (PIAIC)
                </h3>
                <div className="text-xs font-semibold text-accent print:text-ink-subtle">
                  Artificial Intelligence & Cloud-Native Computing
                </div>
                <p className="text-xs text-ink-muted print:text-ink-subtle mt-1">
                  Mastered TypeScript, async Python, Docker containerization, PostgreSQL, and full-stack cloud application delivery.
                </p>
              </div>
              <div className="text-[11px] font-mono text-ink-muted print:text-ink-subtle shrink-0">
                2023 – 2024
              </div>
            </div>
          </div>
        </section>

        {/* Honors & GitHub Official Achievements */}
        <section className="py-6 border-b border-line print:border-slate-300 print:py-4">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-accent print:text-ink-subtle mb-4 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-accent print:text-ink-subtle" />
            Official Honors & GitHub Achievements
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl glass border border-line bg-canvas/40 print:border-slate-300 print:bg-slate-50">
              <div className="flex items-center gap-2 mb-1 font-bold text-accent print:text-ink">
                <Star className="w-3.5 h-3.5 fill-accent/30 text-accent" />
                <span>GitHub Starstruck (Bronze Tier)</span>
              </div>
              <p className="text-ink-muted print:text-ink-subtle text-[11px] leading-relaxed">
                Awarded when <strong>MalikClaw</strong> passed 16 stars from the international developer community on GitHub; it now sits at {GITHUB_PROFILE.malikclawStars} stars and {GITHUB_PROFILE.malikclawForks} forks.
              </p>
            </div>

            <div className="p-3 rounded-xl glass border border-line bg-canvas/40 print:border-slate-300 print:bg-slate-50">
              <div className="flex items-center gap-2 mb-1 font-bold text-accent print:text-accent">
                <GitPullRequest className="w-3.5 h-3.5 text-accent" />
                <span>GitHub Pull Shark</span>
              </div>
              <p className="text-ink-muted print:text-ink-subtle text-[11px] leading-relaxed">
                Awarded for high-velocity merged pull requests across open-source initiatives in Hackathon 2.
              </p>
            </div>

            <div className="p-3 rounded-xl glass border border-line bg-canvas/40 print:border-slate-300 print:bg-slate-50">
              <div className="flex items-center gap-2 mb-1 font-bold text-accent print:text-accent">
                <Users className="w-3.5 h-3.5 text-accent" />
                <span>GitHub Pair Extraordinaire</span>
              </div>
              <p className="text-ink-muted print:text-ink-subtle text-[11px] leading-relaxed">
                Awarded for advanced AI pair programming and co-authored repository commits with Claude.
              </p>
            </div>

            <div className="p-3 rounded-xl glass border border-line bg-canvas/40 print:border-slate-300 print:bg-slate-50">
              <div className="flex items-center gap-2 mb-1 font-bold text-accent print:text-ink">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                <span>A2AS Behavior Certificate & MCP Market</span>
              </div>
              <p className="text-ink-muted print:text-ink-subtle text-[11px] leading-relaxed">
                Audited agent security compliance by A2AS Registry; MalikClaw cataloged on the official MCP Market.
              </p>
            </div>

            <div className="p-3 rounded-xl glass border border-line bg-canvas/40 print:border-slate-300 print:bg-slate-50">
              <div className="flex items-center gap-2 mb-1 font-bold text-accent print:text-ink">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                <span>Skills Directory (12 Grade A Skills)</span>
              </div>
              <p className="text-ink-muted print:text-ink-subtle text-[11px] leading-relaxed">
                Certified author on Skills Directory with 12 published Claude agent skills passing automated malware and injection screening.
              </p>
            </div>
          </div>
        </section>

        {/* Flagship Projects */}
        <section className="py-6 border-b border-line print:border-slate-300 print:py-4">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-accent print:text-ink-subtle mb-4 flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-accent print:text-ink-subtle" />
            Flagship Engineering Systems
          </h2>

          <div className="space-y-4">
            {/* Project 1 */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-ink print:text-canvas">
                    MalikClaw — Edge-Native Agentic Assistant & Gateway
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20 font-mono print:border-slate-400 print:text-ink-subtle">
                    {GITHUB_PROFILE.malikclawStars} Stars • Go
                  </span>
                </div>
                <div className="text-[11px] font-mono text-accent print:text-ink-subtle">
                  <a href="https://github.com/AbdullahMalik17/malikclaw" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    github.com/AbdullahMalik17/malikclaw
                  </a>
                </div>
              </div>
              <p className="text-xs text-ink print:text-ink-subtle mt-1 leading-relaxed">
                Ultra-lightweight edge agent compiled in Go operating on <strong>&lt;10MB RAM</strong> with <strong>&lt;1s boot time</strong> on a $10 Raspberry Pi Zero and Android. Features native RTL Urdu NLP, JSON-RPC 2.0 Model Context Protocol (MCP) dispatch, and sandboxed Android hardware automation over ADB.
              </p>
            </div>

            {/* Project 2 */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-ink print:text-canvas">
                    Digital FTE — Abdullah Junior
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20 font-mono print:border-slate-400 print:text-ink-subtle">
                    Python • FastAPI • MCP
                  </span>
                </div>
                <div className="text-[11px] font-mono text-accent print:text-ink-subtle">
                  <a href="https://github.com/AbdullahMalik17/Digital-FTE" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    github.com/AbdullahMalik17/Digital-FTE
                  </a>
                </div>
              </div>
              <p className="text-xs text-ink print:text-ink-subtle mt-1 leading-relaxed">
                Autonomous 24/7 Digital Employee operating on a <strong>Dual-Agent Architecture</strong> (Cloud Sentry monitoring + Local Executive execution). Enforces strict credential isolation with HMAC verification, managing communications across Gmail, WhatsApp, LinkedIn, and Odoo ERP workflows.
              </p>
            </div>

            {/* Project 3 */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-ink print:text-canvas">
                    Customer Success Digital FTE
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20 font-mono print:border-slate-400 print:text-ink-subtle">
                    FastAPI • pgvector • Kafka
                  </span>
                </div>
                <div className="text-[11px] font-mono text-accent print:text-ink-subtle">
                  <a href="https://github.com/AbdullahMalik17/Hacathan_5" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    github.com/AbdullahMalik17/Hacathan_5
                  </a>
                </div>
              </div>
              <p className="text-xs text-ink print:text-ink-subtle mt-1 leading-relaxed">
                Multi-channel support AI handling inquiries 24/7. Integrates 1536-dimensional vector similarity retrieval in PostgreSQL via pgvector and an asynchronous Apache Kafka event bus with automatic dead-letter queue recovery.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Skills Grid */}
        <section className="pt-6 print:pt-4">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-accent print:text-ink-subtle mb-3">
            Technical Skills Matrix
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-ink-muted print:text-ink-subtle font-semibold block mb-0.5">Languages & Runtimes:</span>
              <p className="text-ink print:text-ink-subtle font-mono">
                Go (Golang), Python (AsyncIO), TypeScript, JavaScript, SQL, R, Bash
              </p>
            </div>
            <div>
              <span className="text-ink-muted print:text-ink-subtle font-semibold block mb-0.5">AI, Data Science & Vector Stores:</span>
              <p className="text-ink print:text-ink-subtle font-mono">
                Model Context Protocol (MCP), OpenAI Agents SDK, pgvector, Pandas, NumPy, Scikit-learn, ChromaDB, Pinecone
              </p>
            </div>
            <div>
              <span className="text-ink-muted print:text-ink-subtle font-semibold block mb-0.5">Backend & Cloud Infrastructure:</span>
              <p className="text-ink print:text-ink-subtle font-mono">
                FastAPI, Next.js 15, PostgreSQL, Apache Kafka, Docker, Kubernetes, Vercel, Fly.io
              </p>
            </div>
            <div>
              <span className="text-ink-muted print:text-ink-subtle font-semibold block mb-0.5">Governance & Tooling:</span>
              <p className="text-ink print:text-ink-subtle font-mono">
                A2AS Behavior Limits, Android ADB Automation, Langfuse Telemetry, Git/GitHub Actions
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
