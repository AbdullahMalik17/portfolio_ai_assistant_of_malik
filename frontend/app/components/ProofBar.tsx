'use client';

import { motion } from 'framer-motion';
import { Star, GraduationCap, ShieldCheck, Globe2, ExternalLink } from 'lucide-react';

const proofItems = [
  {
    value: '16+ Stars',
    label: 'Starstruck Achievement',
    subtext: 'MalikClaw on GitHub (Bronze)',
    icon: Star,
    color: 'text-amber-400',
    borderColor: 'group-hover:border-amber-500/40',
    glowColor: 'rgba(245, 158, 11, 0.15)',
    href: 'https://github.com/users/AbdullahMalik17/achievements/starstruck',
    isExternal: true,
  },
  {
    value: 'BS Data Science',
    label: 'Islamia University (IUB)',
    subtext: 'Machine Learning & Big Data',
    icon: GraduationCap,
    color: 'text-cyan-400',
    borderColor: 'group-hover:border-cyan-500/40',
    glowColor: 'rgba(6, 182, 212, 0.15)',
    href: '#about',
    isExternal: false,
  },
  {
    value: 'A2AS Audited',
    label: 'Behavior Certified',
    subtext: 'AI agent governance policy',
    icon: ShieldCheck,
    color: 'text-emerald-400',
    borderColor: 'group-hover:border-emerald-500/40',
    glowColor: 'rgba(16, 185, 129, 0.15)',
    href: 'https://a2as.org/certified/agents/abdullahmalik17/deep-research-age',
    isExternal: true,
  },
  {
    value: 'MCP Market',
    label: 'Global Registry',
    subtext: 'Official server registration',
    icon: Globe2,
    color: 'text-purple-400',
    borderColor: 'group-hover:border-purple-500/40',
    glowColor: 'rgba(139, 92, 246, 0.15)',
    href: 'https://mcpmarket.com/ko/server/malikclaw',
    isExternal: true,
  },
];

const ProofBar = () => {
  return (
    <section className="py-8 relative z-20 border-y border-white/[0.06] bg-slate-950/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {proofItems.map((item, index) => {
            const Icon = item.icon;

            const card = (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                whileHover={{ y: -3 }}
                className={`group glass p-4 sm:p-5 rounded-2xl border border-white/[0.08] ${item.borderColor} transition-all duration-300 flex items-center gap-4 bg-slate-900/40 relative overflow-hidden`}
              >
                {/* Micro Ambient Glow */}
                <div
                  className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{ background: item.glowColor }}
                />

                {/* Duotone Icon Badge */}
                <div className={`w-11 h-11 rounded-xl glass border border-white/10 flex items-center justify-center shrink-0 ${item.color} group-hover:scale-110 transition-transform duration-300 bg-white/[0.03]`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                      {item.value}
                    </span>
                    {item.isExternal && (
                      <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                    )}
                  </div>
                  <p className="text-xs font-semibold text-slate-200 truncate tracking-tight">
                    {item.label}
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono truncate">
                    {item.subtext}
                  </p>
                </div>
              </motion.div>
            );

            if (item.href) {
              return (
                <a
                  key={index}
                  href={item.href}
                  target={item.isExternal ? '_blank' : undefined}
                  rel={item.isExternal ? 'noopener noreferrer' : undefined}
                  className="block focus:outline-none"
                >
                  {card}
                </a>
              );
            }
            return <div key={index}>{card}</div>;
          })}
        </div>
      </div>
    </section>
  );
};

export default ProofBar;
