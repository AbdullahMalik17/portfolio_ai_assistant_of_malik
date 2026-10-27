'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ExternalLink, Github, CheckCircle2, 
  ShieldCheck, Globe2
} from 'lucide-react';
import { PortfolioProject } from '../lib/portfolio-data';
import Button from './Button';

interface ProjectModalProps {
  project: PortfolioProject | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] glass rounded-3xl border border-line bg-canvas/95 shadow-2xl overflow-y-auto z-10 custom-scrollbar"
        >
          {/* Header Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2.5 rounded-full glass border border-line text-ink-muted hover:text-ink hover:border-white/30 transition-all z-20 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="p-6 sm:p-10 border-b border-line">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-mono font-bold uppercase tracking-wider">
                {project.category}
              </span>
              {project.mcpMarketUrl && (
                <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-mono font-bold flex items-center gap-1.5">
                  <Globe2 className="w-3.5 h-3.5" />
                  MCP Market Listed
                </span>
              )}
              {project.certificateUrl && (
                <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-mono font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  A2AS Behavior Certified
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-ink tracking-tight">
              {project.title}
            </h2>
            {project.subtitle && (
              <p className="text-base text-ink-muted mt-2 font-medium">
                {project.subtitle}
              </p>
            )}
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-10 space-y-8">
            {/* Overview */}
            <div>
              <h3 className="text-sm font-mono uppercase tracking-widest text-ink-muted mb-3 font-semibold">
                System Overview
              </h3>
              <p className="text-sm sm:text-base text-ink leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Problem & Solution Callout */}
            {project.problem && project.solution && (
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-accent/5 border border-accent/20">
                  <h4 className="text-xs font-mono text-accent uppercase font-bold tracking-wider mb-2">
                    Problem & Constraints
                  </h4>
                  <p className="text-xs text-ink leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-accent/5 border border-accent/20">
                  <h4 className="text-xs font-mono text-accent uppercase font-bold tracking-wider mb-2">
                    Engineered Solution
                  </h4>
                  <p className="text-xs text-ink leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>
            )}

            {/* Architecture Pipeline Flow */}
            {project.architecturePipeline && (
              <div>
                <h3 className="text-sm font-mono uppercase tracking-widest text-accent mb-3 font-semibold">
                  Orchestration Pipeline
                </h3>
                <div className="space-y-2.5">
                  {project.architecturePipeline.map((step, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3.5 rounded-xl glass border border-line bg-surface/40 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-md bg-accent/20 border border-accent/40 flex items-center justify-center font-mono text-xs font-bold text-accent">
                          0{sIdx + 1}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-ink">{step.label}</div>
                          <div className="text-[11px] text-ink-muted font-mono">{step.sublabel}</div>
                        </div>
                      </div>
                      {step.badge && (
                        <span className="px-2.5 py-1 rounded bg-white/5 border border-line text-[10px] font-mono text-accent">
                          {step.badge}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Capabilities */}
            {project.keyCapabilities && project.keyCapabilities.length > 0 && (
              <div>
                <h3 className="text-sm font-mono uppercase tracking-widest text-ink-muted mb-3 font-semibold">
                  Key Capabilities
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {project.keyCapabilities.map((cap, cIdx) => (
                    <div
                      key={cIdx}
                      className="p-3 rounded-xl glass border border-line bg-surface/40 flex items-start gap-2.5 text-xs text-ink"
                    >
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Chips */}
            <div>
              <h3 className="text-sm font-mono uppercase tracking-widest text-ink-muted mb-3 font-semibold">
                Technologies & Protocols
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((technology, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3 py-1.5 rounded-xl bg-surface border border-line text-xs font-mono text-accent"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="p-6 sm:p-10 border-t border-line bg-surface/60 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {project.liveUrl && (
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => window.open(project.liveUrl!, '_blank')}
                  rightIcon={<ExternalLink className="w-4 h-4" />}
                >
                  Open Live System
                </Button>
              )}

              {project.githubUrl && (
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => window.open(project.githubUrl!, '_blank')}
                  leftIcon={<Github className="w-4 h-4" />}
                >
                  View Source Code
                </Button>
              )}

              {project.mcpMarketUrl && (
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => window.open(project.mcpMarketUrl!, '_blank')}
                  leftIcon={<Globe2 className="w-4 h-4 text-accent" />}
                >
                  MCP Market Listing
                </Button>
              )}
            </div>

            <button
              onClick={onClose}
              className="text-xs font-mono text-ink-muted hover:text-ink transition-colors cursor-pointer"
            >
              Press ESC or click outside to dismiss
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
