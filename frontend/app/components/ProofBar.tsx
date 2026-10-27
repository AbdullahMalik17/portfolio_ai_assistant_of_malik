'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Award, BadgeCheck, Star } from 'lucide-react';
import { GITHUB_PROFILE } from '@/app/lib/portfolio-data';

const proofItems = [
  {
    icon: Star,
    value: `${GITHUB_PROFILE.malikclawStars} stars`,
    label: 'GitHub Starstruck — Bronze',
    href: 'https://github.com/users/AbdullahMalik17/achievements/starstruck',
  },
  {
    icon: BadgeCheck,
    value: '12 Grade A skills',
    label: 'Skills Directory author',
    href: 'https://skillsdirectory.com/authors/abdullahmalik17',
  },
  {
    icon: Award,
    value: 'A2AS audited',
    label: 'Agent behavior certificate',
    href: 'https://a2as.org/certified/agents/abdullahmalik17/deep-research-agent',
  },
  {
    icon: BadgeCheck,
    value: 'MCP Market listed',
    label: 'Registered MCP server',
    href: 'https://mcpmarket.com/server/malikclaw',
  },
];

const ProofBar = () => {
  return (
    <section className="relative z-20 border-y border-line">
      <div className="mx-auto max-w-[var(--shell)] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-5 py-7 lg:grid-cols-5">
          {proofItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.4 }}
                className="group flex items-center gap-3"
              >
                <Icon className="h-4 w-4 shrink-0 text-accent" />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-ink">
                    {item.value}
                  </span>
                  <span className="block truncate font-mono text-[11px] text-ink-subtle">
                    {item.label}
                  </span>
                </span>
                <ArrowUpRight className="ml-auto hidden h-3.5 w-3.5 shrink-0 text-ink-subtle transition-colors group-hover:text-accent sm:block" />
              </motion.a>
            );
          })}

          <Link
            href="/credentials"
            className="group flex items-center gap-2 lg:justify-end"
          >
            <span className="font-mono text-[11px] uppercase tracking-wider text-ink-subtle transition-colors group-hover:text-accent">
              All 37 credentials
            </span>
            <ArrowUpRight className="h-3.5 w-3.5 text-ink-subtle transition-colors group-hover:text-accent" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProofBar;
