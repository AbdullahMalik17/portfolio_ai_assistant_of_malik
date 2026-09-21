'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ArrowRight, MessageSquare, 
  Layers, ShieldCheck, Globe2
} from 'lucide-react';
import Button from './Button';

const TITLES = [
  'Agentic AI Engineer',
  'BS Data Science @ IUB',
  'Autonomous Systems Architect',
  'Go & MCP Runtime Specialist',
  'Digital FTE Creator',
];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = TITLES[titleIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayText === currentTitle) {
      timer = setTimeout(() => setIsDeleting(true), 2400);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    } else {
      timer = setTimeout(
        () => {
          setDisplayText((prev) =>
            isDeleting
              ? currentTitle.substring(0, prev.length - 1)
              : currentTitle.substring(0, prev.length + 1)
          );
        },
        isDeleting ? 40 : 80
      );
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openPortfolioChat = () => {
    const event = new CustomEvent('open-portfolio-chat');
    window.dispatchEvent(event);
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="ambient-glow ambient-glow-indigo top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="ambient-glow ambient-glow-cyan top-1/2 right-1/4" />
      <div className="ambient-glow ambient-glow-rose bottom-1/4 left-1/4" />

      {/* Cyber Noise & Subtle Grid */}
      <div className="absolute inset-0 cyber-grid opacity-75 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Profile Avatar with Ambient Cyber Glow & Verified Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative inline-block mb-6 group cursor-pointer"
          onClick={() => scrollToSection('about')}
        >
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-pink-500 opacity-70 blur-md group-hover:opacity-100 transition-all duration-700 animate-pulse" />
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1 bg-slate-950/80 ring-2 ring-white/20 shadow-2xl overflow-hidden mx-auto">
            <Image
              src="/profile.jpg"
              alt="Abdullah Malik (Muhammad Abdullah Athar) — Agentic AI Engineer & Data Scientist"
              width={160}
              height={160}
              priority
              className="w-full h-full object-cover object-top rounded-full transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          {/* Verified Badge */}
          <div 
            className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 shadow-lg"
            title="BS Data Science @ IUB • A2AS Certified Agentic AI Engineer"
          >
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
          </div>
        </motion.div>

        {/* Pulsating Availability Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-cyan-500/30 bg-slate-900/60 shadow-lg shadow-cyan-500/10 mb-8 cursor-pointer hover:border-cyan-400 transition-colors"
          onClick={() => scrollToSection('contact')}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
            Available for Autonomous AI & Digital FTE Engineering
          </span>
        </motion.div>

        {/* Engineer Name & Prestige Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-4"
        >
          Muhammad <span className="text-shimmer">Abdullah Malik</span>
        </motion.h1>

        {/* Dynamic Typewriter Role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-12 sm:h-14 flex items-center justify-center mb-6"
        >
          <span className="text-xl sm:text-2xl md:text-3xl font-mono font-semibold text-cyan-300">
            {displayText}
            <span className="inline-block w-2.5 h-6 ml-1 bg-cyan-400 animate-pulse align-middle" />
          </span>
        </motion.div>

        {/* High-Impact Value Proposition */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-sans"
        >
          Architecting production <span className="text-white font-semibold">Autonomous Multi-Agent Systems</span>, 
          ultra-lightweight <span className="text-cyan-300 font-mono font-medium">Go edge runtimes (&lt;10MB RAM)</span>, 
          and verifiable <span className="text-indigo-300 font-semibold">Model Context Protocol (MCP)</span> pipelines.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <Button
            variant="cyber"
            size="lg"
            onClick={() => scrollToSection('projects')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Explore Flagship Systems
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={openPortfolioChat}
            leftIcon={<MessageSquare className="w-4 h-4 text-cyan-400" />}
          >
            Talk with Digital FTE
          </Button>
        </motion.div>

        {/* Trust Badges Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-slate-400"
        >
          <div className="flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-purple-400" />
            <span>MCP Market Listed System</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>A2AS Behavior Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Go • Kafka • pgvector • Docker</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
