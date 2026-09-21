'use client';

import Image from 'next/image';
import { Terminal, Brain, CheckCircle2, GraduationCap } from 'lucide-react';
import Timeline, { TimelineEvent } from './Timeline';
import FadeInWhenVisible from './FadeInWhenVisible';
import AnimatedCounter from './AnimatedCounter';
import { ABOUT } from '../lib/portfolio-data';

export default function About() {
  const stats = [
    { number: 2, label: 'Years Specialization', suffix: '+' },
    { number: 12, label: 'Agentic Systems', suffix: '+' },
    { number: 30, label: 'GitHub Repos', suffix: '+' },
    { number: 100, label: 'A2AS Audited', suffix: '%' },
  ];

  const timelineEvents: TimelineEvent[] = [
    {
      year: '2023',
      title: 'Full-Stack Foundations & Systems',
      description: 'Mastered web fundamentals, asynchronous runtime architectures, and core JavaScript/TypeScript backend pipelines.',
    },
    {
      year: '2024',
      title: 'Agentic AI Specialization at Panaversity & PIAIC',
      description: 'Completed advanced Agentic AI program. Mastered OpenAI Agent SDK, LangChain, N8N, and autonomous tool calling schemas.',
    },
    {
      year: '2025',
      title: 'Digital FTEs & Go Edge Gateways (MalikClaw)',
      description: 'Engineered MalikClaw (Go edge runtime, 16+ GitHub stars) and Digital FTE systems with Cloud Sentry + Local Executive dual-agent isolation.',
    },
    {
      year: 'Present',
      title: 'BS Data Science (IUB) & Enterprise AI Swarms',
      description: 'Pursuing BS Data Science at Islamia University of Bahawalpur (IUB) while scaling cloud-native agent orchestration (Docker, pgvector, Kafka, MCP) with audited A2AS behavior compliance.',
    },
  ];

  return (
    <section 
      id="about" 
      className="py-24 relative overflow-hidden bg-slate-950/60"
      data-component="About Section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-sm shadow-indigo-500/10">
              <Brain className="w-3.5 h-3.5 text-indigo-400" />
              Engineering Mindset & Background
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              About <span className="text-shimmer">Abdullah Malik</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Dedicated to high-autonomy software systems, edge performance, and verifiable agentic protocols.
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <FadeInWhenVisible direction="right">
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl glass border border-white/10 flex items-center justify-center text-cyan-400 bg-white/[0.02]">
                  <Terminal className="w-4 h-4" />
                </div>
                <span>Technical Journey & Evolution</span>
              </h3>
              
              <Timeline events={timelineEvents} />

              <div className="mt-8 p-6 glass rounded-2xl border-l-4 border-l-cyan-500 text-sm text-slate-300 bg-slate-900/40 leading-relaxed font-sans shadow-lg">
                &quot;{ABOUT.philosophy}&quot;
              </div>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="left" delay={0.2}>
            <div className="space-y-6">
              {/* Profile Card & Academic Highlights */}
              <div className="glass p-5 sm:p-6 rounded-2xl border border-white/[0.1] bg-slate-900/50 relative overflow-hidden flex flex-col sm:flex-row items-center sm:items-start gap-5 shadow-xl">
                <div className="relative shrink-0">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden ring-2 ring-cyan-500/30 shadow-lg relative bg-slate-950">
                    <Image
                      src="/profile.jpg"
                      alt="Abdullah Malik — Agentic AI Engineer & Data Scientist"
                      width={120}
                      height={120}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md">
                    Age 17
                  </div>
                </div>

                <div className="space-y-2 text-center sm:text-left flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h4 className="text-lg font-bold text-white tracking-tight">Abdullah Malik</h4>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
                      Data Scientist & AI Eng
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-cyan-300 font-medium">
                    <GraduationCap className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>BS Data Science — Islamia University of Bahawalpur (IUB)</span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed pt-1">
                    Specialized in high-autonomy Agentic AI, Go edge daemons (&lt;10MB RAM), and Model Context Protocol. Trained via Panaversity & PIAIC.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl glass border border-white/10 flex items-center justify-center text-pink-400 bg-white/[0.02]">
                  <Brain className="w-4 h-4" />
                </div>
                <span>Core Engineering Principles</span>
              </h3>

              <div className="glass p-6 rounded-2xl border border-white/[0.08] bg-slate-900/40 space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <h4 className="text-sm font-bold text-white">01. Autonomous Efficiency First</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed pl-6">
                    AI agents should execute seamlessly without heavy runtime baggage. MalikClaw proves agents can operate reliably on &lt;10MB RAM on edge devices.
                  </p>
                </div>
                
                <div className="space-y-1 pt-4 border-t border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-pink-400" />
                    <h4 className="text-sm font-bold text-white">02. Strict Privilege & Credential Isolation</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed pl-6">
                    Cloud event monitoring must be decoupled from privileged local execution. Secrets stay local; sentries stay read-only.
                  </p>
                </div>
                
                <div className="space-y-1 pt-4 border-t border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <h4 className="text-sm font-bold text-white">03. Deterministic Tooling (MCP & A2AS)</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed pl-6">
                    Tool calling must follow verifiable transport protocols like Model Context Protocol, and agent behavior must be declared and audited.
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-2">
                {stats.map((stat, index) => (
                  <div key={index} className="glass p-4 rounded-2xl text-center border border-white/[0.08] bg-slate-900/40">
                    <div className="text-2xl font-extrabold text-white mb-1 font-mono">
                      <AnimatedCounter value={stat.number} suffix={stat.suffix} />
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-mono font-bold">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
}
