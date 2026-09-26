'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, Bot, MessageSquare, Terminal, ExternalLink, Github, 
  ShieldCheck, Globe2, CheckCircle2, 
  Layers, HardDrive, ChevronRight, Activity, Star
} from 'lucide-react';
import { PROJECTS, PortfolioProject } from '../lib/portfolio-data';

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
      case 'cpu': return <Cpu className="w-6 h-6 text-cyan-400" />;
      case 'bot': return <Bot className="w-6 h-6 text-pink-400" />;
      case 'message-square': return <MessageSquare className="w-6 h-6 text-emerald-400" />;
      default: return <Cpu className="w-6 h-6 text-indigo-400" />;
    }
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'runtime': return 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300';
      case 'protocol': return 'bg-purple-500/10 border-purple-500/20 text-purple-300';
      case 'hardware': return 'bg-amber-500/10 border-amber-500/20 text-amber-300';
      case 'model': return 'bg-pink-500/10 border-pink-500/20 text-pink-300';
      case 'infra': return 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300';
      case 'data': return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300';
      default: return 'bg-slate-500/10 border-slate-500/20 text-slate-300';
    }
  };

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
            className="group glass rounded-3xl p-6 sm:p-8 border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-500 bg-slate-950/60 shadow-2xl relative overflow-hidden"
          >
            {/* Ambient Background Glow on Hover */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10 group-hover:from-indigo-500/20 transition-all duration-700" />

            {/* Header: Identity, Title, Category Badges & Mode Switcher */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl glass border border-white/10 flex items-center justify-center shrink-0 shadow-lg bg-white/[0.02]">
                  {getIcon(project.iconName)}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                      FLAGSHIP SYSTEM 0{idx + 1}
                    </span>
                    {project.mcpMarketUrl && (
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-[10px] font-mono font-semibold flex items-center gap-1">
                        <Globe2 className="w-3 h-3" /> MCP Market Listed
                      </span>
                    )}
                    {project.certificateUrl && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-[10px] font-mono font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> A2AS Verified
                      </span>
                    )}
                    {project.id === 'malikclaw' && (
                      <a
                        href="https://github.com/users/AbdullahMalik17/achievements/starstruck"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-mono font-bold flex items-center gap-1 hover:bg-amber-500/25 transition-colors"
                        title="GitHub Starstruck Bronze Tier (16+ Stars)"
                      >
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400/40" /> Starstruck Bronze (16+ Stars)
                      </a>
                    )}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                    {project.title}
                    {project.subtitle && (
                      <span className="text-sm font-normal text-slate-400 font-sans hidden sm:inline">
                        — {project.subtitle}
                      </span>
                    )}
                  </h3>
                </div>
              </div>

              {/* Interactive View Mode Tabs */}
              <div className="flex items-center gap-1 glass p-1 rounded-xl border border-white/[0.08] self-start lg:self-center">
                <button
                  onClick={() => toggleView(project.id, 'terminal')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeView === 'terminal'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Agent Terminal</span>
                </button>
                <button
                  onClick={() => toggleView(project.id, 'architecture')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeView === 'architecture'
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Pipeline Flow</span>
                </button>
                <button
                  onClick={() => toggleView(project.id, 'specs')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeView === 'specs'
                      ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-white'
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
                  <p className="text-sm text-slate-300 leading-relaxed mb-5">
                    {project.description}
                  </p>

                  {/* Problem & Solution Mini Callouts */}
                  {project.problem && project.solution && (
                    <div className="space-y-3 mb-5">
                      <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-pink-500/20 space-y-1">
                        <span className="text-[10px] font-mono text-pink-400 uppercase font-bold tracking-widest block">
                          Constraint / Problem
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {project.problem}
                        </p>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-cyan-500/20 space-y-1">
                        <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-widest block">
                          Engineered Solution
                        </span>
                        <p className="text-xs text-slate-200 leading-relaxed">
                          {project.solution}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Spec Chips Categorized */}
                  {project.specChips && (
                    <div className="mb-4">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-semibold">
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
                      <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block mb-2 font-bold flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
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
                <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => onSelectProject(project)}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-xl text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-md shadow-indigo-500/20 cursor-pointer"
                  >
                    <span>System Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 glass text-cyan-300 hover:text-white rounded-xl text-xs font-semibold hover:bg-white/[0.08] hover:border-cyan-400/40 transition-all flex items-center gap-1.5 border border-white/[0.08]"
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
                      className="px-3.5 py-2 glass text-slate-300 hover:text-white rounded-xl text-xs font-semibold hover:bg-white/[0.08] hover:border-white/20 transition-all flex items-center gap-1.5 border border-white/[0.08]"
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
                      className="px-3.5 py-2 glass text-purple-300 hover:text-white rounded-xl text-xs font-semibold hover:bg-purple-500/10 hover:border-purple-400/40 transition-all flex items-center gap-1.5 border border-purple-500/20"
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
                      className="px-3.5 py-2 glass text-emerald-300 hover:text-white rounded-xl text-xs font-semibold hover:bg-emerald-500/10 hover:border-emerald-400/40 transition-all flex items-center gap-1.5 border border-emerald-500/20"
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
                      className="glass rounded-2xl border border-white/10 bg-[#070b14] overflow-hidden flex flex-col h-full shadow-inner"
                    >
                      {/* Terminal Header */}
                      <div className="px-4 py-2.5 bg-slate-900/80 border-b border-white/[0.08] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                          <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                          <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                          <span className="ml-2 text-xs font-mono text-slate-400 truncate">
                            {project.terminalDemo.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                          <span>LIVE REASONING</span>
                        </div>
                      </div>

                      {/* Terminal Command Execution */}
                      <div className="p-4 sm:p-5 font-mono text-xs space-y-3 overflow-y-auto max-h-72 flex-1">
                        <div className="text-slate-400 flex items-center gap-2">
                          <span className="text-cyan-400 font-bold">$</span>
                          <span className="text-white">{project.terminalDemo.command}</span>
                        </div>

                        {project.terminalDemo.steps.map((step, sIdx) => (
                          <div
                            key={sIdx}
                            className={`p-2.5 rounded-xl border leading-relaxed ${
                              step.type === 'prompt'
                                ? 'bg-indigo-950/20 border-indigo-500/20 text-indigo-200'
                                : step.type === 'thought'
                                ? 'bg-slate-900/40 border-white/5 text-slate-300'
                                : step.type === 'tool'
                                ? 'bg-purple-950/20 border-purple-500/20 text-purple-200'
                                : step.type === 'metric'
                                ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300 font-bold'
                                : 'bg-cyan-950/20 border-cyan-500/20 text-cyan-200'
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              <span className="text-[10px] font-bold uppercase opacity-75 shrink-0 mt-0.5">
                                [{step.type}]
                              </span>
                              <div className="flex-1">
                                <span>{step.content}</span>
                                {step.detail && (
                                  <span className="block text-[11px] text-slate-400 mt-1 pl-2 border-l border-white/10">
                                    → {step.detail}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Terminal Metrics Ribbon */}
                      <div className="px-4 py-3 bg-slate-900/90 border-t border-white/[0.08] grid grid-cols-3 gap-2 text-center text-[11px] font-mono">
                        <div className="p-1 rounded bg-black/40 border border-white/5">
                          <span className="text-slate-400 block text-[9px] uppercase">RAM Footprint</span>
                          <span className="text-cyan-400 font-bold">{project.terminalDemo.metrics.ram}</span>
                        </div>
                        <div className="p-1 rounded bg-black/40 border border-white/5">
                          <span className="text-slate-400 block text-[9px] uppercase">Latency</span>
                          <span className="text-emerald-400 font-bold">{project.terminalDemo.metrics.latency}</span>
                        </div>
                        <div className="p-1 rounded bg-black/40 border border-white/5">
                          <span className="text-slate-400 block text-[9px] uppercase">Boot Speed</span>
                          <span className="text-purple-400 font-bold">{project.terminalDemo.metrics.bootTime}</span>
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
                      className="glass rounded-2xl p-6 border border-white/10 bg-[#070b14] flex flex-col justify-between h-full space-y-4"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/[0.06]">
                          <span className="text-xs font-mono text-indigo-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
                            <Layers className="w-4 h-4" /> Agent Orchestration Pipeline
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            Protocol: JSON-RPC / MCP
                          </span>
                        </div>

                        <div className="space-y-3 relative">
                          {project.architecturePipeline.map((step, pIdx) => (
                            <div key={pIdx} className="relative">
                              <div className="p-4 rounded-xl glass border border-white/10 bg-slate-900/60 flex items-center justify-between gap-4 hover:border-cyan-500/40 transition-colors">
                                <div className="flex items-center gap-3">
                                  <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center font-mono font-bold text-xs text-indigo-300">
                                    0{pIdx + 1}
                                  </div>
                                  <div>
                                    <div className="text-sm font-bold text-white tracking-tight">
                                      {step.label}
                                    </div>
                                    <div className="text-xs text-slate-400 font-mono">
                                      {step.sublabel}
                                    </div>
                                  </div>
                                </div>
                                {step.badge && (
                                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-cyan-300 uppercase tracking-widest font-semibold">
                                    {step.badge}
                                  </span>
                                )}
                              </div>

                              {pIdx < project.architecturePipeline!.length - 1 && (
                                <div className="flex justify-center py-1">
                                  <div className="w-0.5 h-3 bg-gradient-to-b from-indigo-500 to-cyan-500 opacity-60" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 text-xs text-slate-300 font-mono flex items-center justify-between">
                        <span>Topology: Decoupled Edge Worker</span>
                        <span className="text-emerald-400 flex items-center gap-1">
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
                      className="glass rounded-2xl p-6 border border-white/10 bg-[#070b14] flex flex-col justify-between h-full space-y-4"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/[0.06]">
                          <span className="text-xs font-mono text-pink-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
                            <Activity className="w-4 h-4" /> Production Capabilities & Key Results
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400 font-bold">
                            VERIFIED BENCHMARKS
                          </span>
                        </div>

                        <div className="space-y-2.5">
                          {project.keyCapabilities?.map((cap, capIdx) => (
                            <div
                              key={capIdx}
                              className="p-3 rounded-xl glass border border-white/5 bg-slate-900/40 flex items-start gap-2.5"
                            >
                              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                              <span className="text-xs text-slate-200 leading-relaxed">{cap}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {project.results && project.results.length > 0 && (
                        <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                          <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-widest block mb-1">
                            Measured Impact
                          </span>
                          <p className="text-xs text-emerald-200 leading-relaxed font-semibold">
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
