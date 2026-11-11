'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
<<<<<<< Updated upstream
import { ArrowRight, MessageSquare, ShieldCheck, Globe2, CheckCircle2, Mail } from 'lucide-react';
import Button from './Button';

export default function Hero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openPortfolioChat = () => {
    window.dispatchEvent(new CustomEvent('open-portfolio-chat'));
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[92vh] items-center justify-center overflow-hidden pt-[calc(var(--nav-h)+3rem)] pb-20"
    >
      <div className="ambient-glow ambient-glow-cyan top-0 left-1/2 -translate-x-1/2" />
      <div className="absolute inset-0 cyber-grid pointer-events-none" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="group relative mb-7 cursor-pointer"
          onClick={() => scrollToSection('about')}
        >
          <div className="relative h-28 w-28 overflow-hidden rounded-full bg-surface p-[3px] ring-1 ring-accent/30 transition-shadow duration-500 group-hover:ring-accent/60 sm:h-32 sm:w-32">
            <Image
              src="/profile.jpg"
              alt="Abdullah Malik — Agentic AI Engineer and BS Data Science student at IUB"
              width={160}
              height={160}
              priority
              className="h-full w-full rounded-full object-cover object-top"
            />
          </div>
          <span
            className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-full border border-accent/40 bg-[#05070e] text-accent"
            title="BS Data Science @ IUB"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
          </span>
        </motion.div>

        {/* Availability */}
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onClick={() => scrollToSection('contact')}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-white/5 px-3.5 py-1.5 text-[13px] text-ink-muted transition-colors hover:border-accent/40 hover:text-ink cursor-pointer"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-ok opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
          </span>
          <span className="font-medium">Open to forward-deployed AI work</span>
        </motion.button>

        {/* Positioning */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-[2.75rem] font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[4.25rem]"
        >
          I build <span className="text-shimmer">AI systems</span> that move
          real work forward.
        </motion.h1>

        {/* Role */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 flex w-full items-center justify-center px-2"
        >
          <span className="font-mono text-sm font-medium uppercase tracking-[0.18em] text-accent sm:text-base">
            Abdullah Malik · Agentic AI Engineer
          </span>
        </motion.div>

        {/* Value proposition */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-7 max-w-2xl text-lead leading-relaxed text-ink-muted"
        >
          I design and ship secure automation for teams that want less manual
          work, faster operations, and AI that can be trusted in production.
          From agent workflows to MCP integrations, I turn ambitious ideas into
          useful systems.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex w-full flex-wrap items-center justify-center gap-3 sm:w-auto"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => scrollToSection('contact')}
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Start a project
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={openPortfolioChat}
            leftIcon={<MessageSquare className="h-4 w-4 text-accent" />}
          >
            See selected work
          </Button>

          <Button
            variant="ghost"
            size="lg"
            onClick={() => scrollToSection('contact')}
            leftIcon={<Mail className="h-4 w-4 text-accent" />}
          >
            Start a conversation
          </Button>
        </motion.div>

        {/* Proof strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-14 flex w-full flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-line pt-7 font-mono text-[13px] text-ink-subtle"
        >
          <span className="flex items-center gap-2">
            <Globe2 className="h-4 w-4 text-accent" />
            Production-minded systems
          </span>
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-accent" />
            Security & governance aware
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-accent" />
            Available for selected work
          </span>
        </motion.div>
      </div>
    </section>
  );
}
