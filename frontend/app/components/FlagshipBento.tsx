// Remote badge SVGs are variable-width and cannot pass through the Next image
// optimizer without dangerouslyAllowSVG, so they stay plain <img> elements.
/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, Bot, MessageSquare, Terminal, ExternalLink, Github, 
  ShieldCheck, Globe2, CheckCircle2, 
  Layers, HardDrive, ChevronRight, Activity, Star
} from 'lucide-react';
import { PROJECTS, GITHUB_PROFILE, PortfolioProject } from '../lib/portfolio-data';

interface FlagshipBentoProps {
  onSelectProject: (project: PortfolioProject) => void;
}

export default function FlagshipBento({ onSelectProject }: FlagshipBentoProps) {
  const flagshipProjects = PROJECTS.filter((p) => p.featured);
  
  // Track active terminal demo tab per project
  const [activeViews, setActiveViews] = useState<Record<string, 'architecture' | 'terminal' | 'specs'>>({
    malikclaw: 'terminal',
    'digital-fte': 'architecture',
    'customer-success': 'terminal',
  });

  const toggleView = (projectId: string, view: 'architecture' | 'terminal' | 'specs') => {
    setActiveViews((prev) => ({ ...prev, [projectId]: view }));
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'cpu': return <Cpu className="w-6 h-6 text-accent" />;
      case 'bot': return <Bot className="w-6 h-6 text-accent" />;
      case 'message-square': return <MessageSquare className="w-6 h-6 text-accent" />;
      default: return <Cpu className="w-6 h-6 text-accent" />;
    }
  };

  // Spec chips describe what a system is built from, not its status, so they all
  // share one treatment; only non-technical chips fall back to the neutral style.
  const SPEC_CHIP_CATEGORIES = ['runtime', 'protocol', 'hardware', 'model', 'infra', 'data'];
  const getCategoryBadgeClass = (category: string) =>
    SPEC_CHIP_CATEGORIES.includes(category)
      ? 'bg-accent/10 border-accent/20 text-accent'
      : 'bg-white/5 border-line text-ink-muted';

  return (
    <div className="space-y-8">
      {flagshipProjects.map((project, idx) => {
        const activeView = activeViews[project.id] || 'terminal';

        return (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group glass rounded-3xl p-6 sm:p-8 border border-line hover:border-accent/40 transition-all duration-500 bg-canvas/60 shadow-2xl relative overflow-hidden"
          >
            {/* Header: Identity, Title, Category Badges & Mode Switcher */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-line">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl glass border border-line flex items-center justify-center shrink-0 shadow-lg bg-white/5">
                  {getIcon(project.iconName)}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/25 text-accent text-[10px] font-mono font-bold uppercase tracking-wider">
                      FLAGSHIP SYSTEM 0{idx + 1}
                    </span>
                    {project.mcpMarketUrl && (
                      <span className="px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/25 text-accent text-[10px] font-mono font-semibold flex items-center gap-1">
                        <Globe2 className="w-3 h-3" /> MCP Market Listed
                      </span>
                    )}
                    {project.certificateUrl && (
                      <span className="px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/25 text-accent text-[10px] font-mono font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> A2AS Verified
                      </span>
                    )}
                    {project.id === 'malikclaw' && (
                      <a
                        href="https://github.com/users/AbdullahMalik17/achievements/starstruck"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-mono font-bold flex items-center gap-1 hover:bg-amber-500/25 transition-colors"
                        title={`GitHub Starstruck Bronze Tier (now ${GITHUB_PROFILE.malikclawStars} stars)`}
                      >
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400/40" /> {`Starstruck Bronze (${GITHUB_PROFILE.malikclawStars} stars)`}
                      </a>
                    )}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                    {project.title}
                  </h3>
                  {project.subtitle && (
                    <p className="mt-1 text-sm text-ink-muted leading-snug">
                      {project.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Interactive View Mode Tabs */}
              <div className="flex items-center gap-1 glass p-1 rounded-xl border border-line self-start lg:self-center">
                <button
                  onClick={() => toggleView(project.id, 'terminal')}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeView === 'terminal'
                      ? 'bg-accent/20 text-accent border border-accent/40 shadow-sm'
                      : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Agent Terminal</span>
                </button>
                <button
                  onClick={() => toggleView(project.id, 'architecture')}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeView === 'architecture'
                      ? 'bg-accent/20 text-accent border border-accent/40 shadow-sm'
                      : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Pipeline Flow</span>
                </button>
                <button
                  onClick={() => toggleView(project.id, 'specs')}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeView === 'specs'
                      ? 'bg-accent/20 text-accent border border-accent/40 shadow-sm'
                      : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  <HardDrive className="w-3.5 h-3.5" />
                  <span>Specs & Metrics</span>
                </button>
              </div>
            </div>

            {/* Bento Grid Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-stretch">
              {/* Left Column: Problem, Solution & Structured Specs (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
                <div>
                  <p className="text-sm text-ink leading-relaxed mb-5">
                    {project.description}
                  </p>

                  {/* Problem & Solution Mini Callouts */}
                  {project.problem && project.solution && (
                    <div className="space-y-3 mb-5">
                      <div className="p-3.5 rounded-2xl bg-surface/60 border border-accent/20 space-y-1">
                        <span className="text-[10px] font-mono text-accent uppercase font-bold tracking-widest block">
                          Constraint / Problem
                        </span>
                        <p className="text-xs text-ink leading-relaxed">
                          {project.problem}
                        </p>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-surface/60 border border-accent/20 space-y-1">
                        <span className="text-[10px] font-mono text-accent uppercase font-bold tracking-widest block">
                          Engineered Solution
                        </span>
                        <p className="text-xs text-ink leading-relaxed">
                          {project.solution}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Spec Chips Categorized */}
                  {project.specChips && (
                    <div className="mb-4">
                      <span className="text-[10px] font-mono text-ink-muted uppercase tracking-wider block mb-2 font-semibold">
                        Architecture Specs
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.specChips.map((chip, cIdx) => (
                          <span
                            key={cIdx}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium border ${getCategoryBadgeClass(chip.category)}`}
                          >
                            {chip.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Live Upstream Badges & Scanners */}
                  {project.badges && project.badges.length > 0 && (
                    <div className="mb-2">
                      <span className="text-[10px] font-mono text-accent uppercase tracking-wider block mb-2 font-bold flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                        <span>Live Scanners & Registry Shields</span>
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        {project.badges.map((b, bIdx) => (
                          <a
                            key={bIdx}
                            href={b.targetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-85 transition-opacity inline-flex items-center"
                            title={b.name}
                          >
                            <img
                              src={b.badgeUrl}
                              alt={b.alt}
                              className="h-5 max-w-full rounded shadow-sm"
                              loading="lazy"
                            />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Bar */}
                <div className="pt-4 border-t border-line flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => onSelectProject(project)}
                    className="px-4 py-2 bg-accent text-accent-ink rounded-xl text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-md shadow-accent/20 cursor-pointer"
                  >
                    <span>System Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 glass text-accent hover:text-ink rounded-xl text-xs font-semibold hover:bg-white/5 hover:border-accent/40 transition-all flex items-center gap-1.5 border border-line"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 glass text-ink hover:text-ink rounded-xl text-xs font-semibold hover:bg-white/5 hover:border-line-strong transition-all flex items-center gap-1.5 border border-line"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Source</span>
                    </a>
                  )}

                  {project.mcpMarketUrl && (
                    <a
                      href={project.mcpMarketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 glass text-accent hover:text-ink rounded-xl text-xs font-semibold hover:bg-accent/10 hover:border-accent/40 transition-all flex items-center gap-1.5 border border-accent/20"
                    >
                      <Globe2 className="w-3.5 h-3.5" />
                      <span>MCP Market</span>
                    </a>
                  )}

                  {project.certificateUrl && (
                    <a
                      href={project.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 glass text-accent hover:text-ink rounded-xl text-xs font-semibold hover:bg-accent/10 hover:border-accent/40 transition-all flex items-center gap-1.5 border border-accent/20"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Certificate</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Interactive Simulator & Visual Pipeline (7 cols) */}
              <div className="lg:col-span-7 flex flex-col">
                <AnimatePresence mode="wait">
                  {/* TAB 1: LIVE TERMINAL SIMULATOR */}
                  {activeView === 'terminal' && project.terminalDemo && (
                    <motion.div
                      key="terminal"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.25 }}
                      className="glass rounded-2xl border border-line bg-[#070b14] overflow-hidden flex flex-col h-full shadow-inner"
                    >
                      {/* Terminal Header */}
                      <div className="px-4 py-2.5 bg-surface/80 border-b border-line flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-line" />
                          <span className="w-3 h-3 rounded-full bg-line" />
                          <span className="w-3 h-3 rounded-full bg-line" />
                          <span className="ml-2 text-xs font-mono text-ink-muted truncate">
                            {project.terminalDemo.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-accent">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                          <span>LIVE REASONING</span>
                        </div>
                      </div>

                      {/* Terminal Command Execution */}
                      <div className="p-4 sm:p-5 font-mono text-xs space-y-3 overflow-y-auto flex-1 min-h-0">
                        <div className="text-ink-muted flex items-center gap-2">
                          <span className="text-accent font-bold">$</span>
                          <span className="text-ink">{project.terminalDemo.command}</span>
                        </div>

                        {project.terminalDemo.steps.map((step, sIdx) => (
                          <div
                            key={sIdx}
                            className={`p-2.5 rounded-xl border leading-relaxed ${
                              step.type === 'prompt'
                                ? 'bg-accent/5 border-accent/20 text-accent'
                                : step.type === 'thought'
                                ? 'bg-surface/40 border-line text-ink'
                                : step.type === 'tool'
                                ? 'bg-accent/5 border-accent/20 text-accent'
                                : step.type === 'metric'
                                ? 'bg-accent/10 border-accent/25 text-accent font-bold'
                                : 'bg-accent/5 border-accent/20 text-accent'
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              <span className="text-[10px] font-bold uppercase opacity-75 shrink-0 mt-0.5">
                                [{step.type}]
                              </span>
                              <div className="flex-1">
                                <span>{step.content}</span>
                                {step.detail && (
                                  <span className="block text-[11px] text-ink-muted mt-1 pl-2 border-l border-line">
                                    → {step.detail}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Terminal Metrics Ribbon */}
                      <div className="px-4 py-3 bg-[#070b14] border-t border-line grid grid-cols-3 gap-2 text-center text-[11px] font-mono">
                        <div className="p-1 rounded bg-black/40 border border-line">
                          <span className="text-ink-muted block text-[9px] uppercase">RAM Footprint</span>
                          <span className="text-accent font-bold">{project.terminalDemo.metrics.ram}</span>
                        </div>
                        <div className="p-1 rounded bg-black/40 border border-line">
                          <span className="text-ink-muted block text-[9px] uppercase">Latency</span>
                          <span className="text-accent font-bold">{project.terminalDemo.metrics.latency}</span>
                        </div>
                        <div className="p-1 rounded bg-black/40 border border-line">
                          <span className="text-ink-muted block text-[9px] uppercase">Boot Speed</span>
                          <span className="text-accent font-bold">{project.terminalDemo.metrics.bootTime}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: VISUAL PIPELINE FLOW */}
                  {activeView === 'architecture' && project.architecturePipeline && (
                    <motion.div
                      key="architecture"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.25 }}
                      className="glass rounded-2xl p-6 border border-line bg-[#070b14] flex flex-col justify-between h-full space-y-4"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4 pb-2 border-b border-line">
                          <span className="text-xs font-mono text-accent uppercase font-bold tracking-wider flex items-center gap-1.5">
                            <Layers className="w-4 h-4" /> Agent Orchestration Pipeline
                          </span>
                          <span className="text-[10px] font-mono text-ink-muted">
                            Protocol: JSON-RPC / MCP
                          </span>
                        </div>

                        <div className="space-y-3 relative">
                          {project.architecturePipeline.map((step, pIdx) => (
                            <div key={pIdx} className="relative">
                              <div className="p-4 rounded-xl glass border border-line bg-surface/60 flex items-center justify-between gap-4 hover:border-accent/40 transition-colors">
                                <div className="flex items-center gap-3">
                                  <div className="w-7 h-7 rounded-lg bg-accent/20 border border-accent/40 flex items-center justify-center font-mono font-bold text-xs text-accent">
                                    0{pIdx + 1}
                                  </div>
                                  <div>
                                    <div className="text-sm font-bold text-ink tracking-tight">
                                      {step.label}
                                    </div>
                                    <div className="text-xs text-ink-muted font-mono">
                                      {step.sublabel}
                                    </div>
                                  </div>
                                </div>
                                {step.badge && (
                                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-line text-[10px] font-mono text-accent uppercase tracking-widest font-semibold">
                                    {step.badge}
                                  </span>
                                )}
                              </div>

                              {pIdx < project.architecturePipeline!.length - 1 && (
                                <div className="flex justify-center py-1">
                                  <div className="w-0.5 h-3 bg-accent opacity-60" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-surface/60 border border-line text-xs text-ink font-mono flex items-center justify-between">
                        <span>Topology: Decoupled Edge Worker</span>
                        <span className="text-accent flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Deterministic
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 3: SPECS & BENCHMARKS */}
                  {activeView === 'specs' && (
                    <motion.div
                      key="specs"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.25 }}
                      className="glass rounded-2xl p-6 border border-line bg-[#070b14] flex flex-col justify-between h-full space-y-4"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4 pb-2 border-b border-line">
                          <span className="text-xs font-mono text-accent uppercase font-bold tracking-wider flex items-center gap-1.5">
                            <Activity className="w-4 h-4" /> Production Capabilities & Key Results
                          </span>
                          <span className="text-[10px] font-mono text-accent font-bold">
                            PRODUCTION BENCHMARKS
                          </span>
                        </div>

                        <div className="space-y-2.5">
                          {project.keyCapabilities?.map((cap, capIdx) => (
                            <div
                              key={capIdx}
                              className="p-3 rounded-xl glass border border-line bg-surface/40 flex items-start gap-2.5"
                            >
                              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                              <span className="text-xs text-ink leading-relaxed">{cap}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {project.results && project.results.length > 0 && (
                        <div className="p-3.5 rounded-xl bg-accent/10 border border-accent/25">
                          <span className="text-[10px] font-mono text-accent uppercase font-bold tracking-widest block mb-1">
                            Measured Impact
                          </span>
                          <p className="text-xs text-ink leading-relaxed font-semibold">
                            {project.results[0]}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
