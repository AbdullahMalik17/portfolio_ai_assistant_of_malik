'use client';

import { motion } from 'framer-motion';
import { 
  Plug, Shield, Database, Award, 
  Network, Activity, ShieldCheck,
  type LucideIcon
} from 'lucide-react';
import FadeInWhenVisible from './FadeInWhenVisible';

interface CredibilityPillar {
  title: string;
  category: string;
  description: string;
  icon: LucideIcon;
  codeSnippet: string;
}

const pillars: CredibilityPillar[] = [
  {
    title: 'Model Context Protocol (MCP)',
    category: 'Tool Integration Standard',
    description: 'Enforces strict JSON-RPC 2.0 transport schemas between LLM runtimes and local/cloud resources (Odoo, Gmail, ADB, Obsidian).',
    icon: Plug,
    codeSnippet: 'mcp.RegisterServer("malikclaw", transport.Stdio())',
  },
  {
    title: 'Cloud/Local Dual-Agent Split',
    category: 'Security & Privacy Model',
    description: 'Decouples read-only cloud monitoring (Cloud Sentry) from privileged desktop execution (Local Executive) to protect API secrets.',
    icon: Shield,
    codeSnippet: 'CloudSentry(Readonly) -> Bus -> LocalExecutive(Privileged)',
  },
  {
    title: 'RAG & Vector Search',
    category: 'State & Memory Strategy',
    description: 'Implements pgvector and ChromaDB embedding similarity search for fast, sub-second contextual knowledge retrieval.',
    icon: Database,
    codeSnippet: 'SELECT * FROM docs ORDER BY embedding <=> $1 LIMIT 5;',
  },
  {
    title: 'Behavior Compliance & Safety',
    category: 'A2AS Certified Governance',
    description: 'Audits and declares agent behavior boundaries using A2AS Registry certificates for production governance.',
    icon: Award,
    codeSnippet: 'a2as.VerifyBehaviorCertificate("deep-research-agent")',
  },
  {
    title: 'Multi-Agent Orchestration',
    category: 'Agent Execution Strategy',
    description: 'Coordinates specialized subroutines (Research, Coding, Financials) with dynamic intent routers and model fallback cascades.',
    icon: Network,
    codeSnippet: 'Router.Dispatch(intent) -> Select(Gemini1.5, Claude3.5)',
  },
  {
    title: 'Observability & Telemetry',
    category: 'Quality Monitoring',
    description: 'Tracks LLM token consumption, execution latency, and function call success rates using Langfuse and structured logging.',
    icon: Activity,
    codeSnippet: 'langfuse.Trace(span_id, tokens_used, latency_ms)',
  },
];

export default function EngineeringCredibility() {
  return (
    <section className="py-16 relative overflow-hidden bg-canvas/40 border-y border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeInWhenVisible>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-sm shadow-accent/10">
              <ShieldCheck className="w-3.5 h-3.5 text-accent" />
              Production Engineering Standards
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-ink tracking-tight">
              Engineering <span className="text-shimmer">Credibility</span> & Discipline
            </h2>
            <p className="mt-4 text-base sm:text-lg text-ink-muted max-w-3xl mx-auto leading-relaxed">
              How I approach building autonomous AI software: deterministic tooling, strict security boundaries, and verifiable observability.
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className="group glass rounded-3xl p-6 border border-line hover:border-accent/40 bg-surface/40 flex flex-col justify-between transition-all duration-300 relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl glass border border-line flex items-center justify-center text-accent bg-white/5 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-white/5 border border-line text-ink-muted uppercase tracking-widest">
                      {pillar.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-ink mb-2 tracking-tight group-hover:text-accent transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed mb-6 font-normal">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-line">
                  <code className="text-[11px] font-mono text-accent block bg-[#070b14] px-3 py-2 rounded-xl border border-line truncate">
                    {pillar.codeSnippet}
                  </code>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
