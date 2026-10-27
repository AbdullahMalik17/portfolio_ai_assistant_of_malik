// Remote badge SVGs are variable-width and cannot pass through the Next image
// optimizer without dangerouslyAllowSVG, so they stay plain <img> elements.
/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, ExternalLink, Search, Copy, Check, 
  Terminal, Award, Globe, Code2, CheckCircle2
} from 'lucide-react';
import FadeInWhenVisible from './FadeInWhenVisible';
import { ONLINE_BADGES, BADGES_SUMMARY, BadgeScope } from '../lib/portfolio-data';

type RegistryTab = 'all' | BadgeScope | 'commercial';

const COMMERCIAL_SCOPES: BadgeScope[] = ['azan-shop', 'unique-boutique', 'portfolio'];

interface TabItem {
  id: RegistryTab;
  label: string;
  count: number;
}

export default function BadgesRegistry() {
  const [activeTab, setActiveTab] = useState<RegistryTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const countBy = (predicate: (scope: BadgeScope) => boolean) =>
    ONLINE_BADGES.filter((b) => predicate(b.scope)).length;

  const tabs: TabItem[] = [
    { id: 'all', label: 'All Registries', count: BADGES_SUMMARY.total },
    { id: 'skills-directory', label: 'Skills Directory (Grade A)', count: BADGES_SUMMARY.skillsDirectoryCount },
    { id: 'digital-fte', label: 'Digital-FTE', count: countBy((scope) => scope === 'digital-fte') },
    { id: 'malikclaw', label: 'MalikClaw Go', count: countBy((scope) => scope === 'malikclaw') },
    { id: 'github', label: 'GitHub Achievements', count: countBy((scope) => scope === 'github') },
    { id: 'commercial', label: 'Commercial Systems', count: countBy((scope) => COMMERCIAL_SCOPES.includes(scope)) },
  ];

  const filteredBadges = useMemo(() => {
    return ONLINE_BADGES.filter((badge) => {
      // Scope / Tab filter
      let matchesTab = true;
      if (activeTab === 'commercial') {
        matchesTab = COMMERCIAL_SCOPES.includes(badge.scope);
      } else if (activeTab !== 'all') {
        matchesTab = badge.scope === activeTab;
      }

      // Status filter
      const matchesStatus = showActiveOnly ? badge.status === 'active' : true;

      // Search query filter
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !query ||
        badge.name.toLowerCase().includes(query) ||
        badge.project.toLowerCase().includes(query) ||
        badge.category.toLowerCase().includes(query) ||
        badge.description.toLowerCase().includes(query) ||
        (badge.securityGrade && badge.securityGrade.toLowerCase().includes(query));

      return matchesTab && matchesStatus && matchesSearch;
    });
  }, [activeTab, showActiveOnly, searchQuery]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const getScopeBadgeColor = (scope: BadgeScope) => {
    return scope === 'github'
      ? 'text-ink bg-white/5 border-line'
      : 'text-accent bg-accent/10 border-accent/30';
  };

  return (
    <section id="registry" className="py-16 relative overflow-hidden bg-canvas/60 border-t border-line">
      {/* Background Glow */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <FadeInWhenVisible>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-sm shadow-accent/10">
              <ShieldCheck className="w-3.5 h-3.5 text-accent" />
              Verified Trust & Quality Registry
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-ink tracking-tight">
              Online Badges & <span className="text-shimmer">Certifications</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-ink-muted max-w-3xl mx-auto leading-relaxed">
              Curated audit directory of <strong className="text-ink">{BADGES_SUMMARY.total} verified online badges</strong>, automated static analysis tests, Skills Directory Grade-A Claude skills, Go documentation indexes, and GitHub achievements.
            </p>
          </div>
        </FadeInWhenVisible>

        {/* High-Level Verification Summary Metric Cards */}
        <FadeInWhenVisible delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="glass p-5 rounded-2xl border border-line bg-surface/40 text-center group hover:border-accent/40 transition-all">
              <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-ink font-mono">
                {BADGES_SUMMARY.gradeACount}
              </div>
              <div className="text-xs text-ink-muted font-mono font-medium">
                Grade A Claude Skills
              </div>
            </div>

            <div className="glass p-5 rounded-2xl border border-line bg-surface/40 text-center group hover:border-accent/40 transition-all">
              <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-ink font-mono">
                {BADGES_SUMMARY.active}
              </div>
              <div className="text-xs text-ink-muted font-mono font-medium">
                Active Live Endpoints (200)
              </div>
            </div>

            <div className="glass p-5 rounded-2xl border border-line bg-surface/40 text-center group hover:border-accent/40 transition-all">
              <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                <Globe className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-ink font-mono">
                {BADGES_SUMMARY.ecosystemCount}
              </div>
              <div className="text-xs text-ink-muted font-mono font-medium">
                Audited Ecosystems
              </div>
            </div>

            <div className="glass p-5 rounded-2xl border border-line bg-surface/40 text-center group hover:border-accent/40 transition-all">
              <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-ink font-mono">
                {BADGES_SUMMARY.total}
              </div>
              <div className="text-xs text-ink-muted font-mono font-medium">
                Total Registry Badges
              </div>
            </div>
          </div>
        </FadeInWhenVisible>

        {/* Filter Controls: Tabs, Search Bar & Status Toggle */}
        <FadeInWhenVisible delay={0.15}>
          <div className="glass p-4 rounded-2xl border border-line bg-surface/50 mb-8 space-y-4">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 border-b border-line pb-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    activeTab === tab.id
                      ? 'bg-accent text-accent-ink shadow-md shadow-accent/20'
                      : 'text-ink-muted hover:text-ink hover:bg-white/5'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                    activeTab === tab.id ? 'bg-black/30 text-ink' : 'bg-white/10 text-ink-muted'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Search & Status Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-ink-subtle absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter badges by title, tool, or registry..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-canvas/80 border border-line text-xs text-ink placeholder:text-ink-subtle focus:outline-none focus:border-accent/50 transition-colors font-sans"
                />
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-ink select-none">
                  <input
                    type="checkbox"
                    checked={showActiveOnly}
                    onChange={(e) => setShowActiveOnly(e.target.checked)}
                    className="rounded border-line-strong bg-surface text-accent focus:ring-accent/30"
                  />
                  <span>Active Only ({BADGES_SUMMARY.active})</span>
                </label>

                <div className="text-[11px] font-mono text-ink-subtle hidden sm:block">
                  Showing {filteredBadges.length} of {ONLINE_BADGES.length}
                </div>
              </div>
            </div>
          </div>
        </FadeInWhenVisible>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredBadges.map((badge, idx) => {
              const isGradeA = badge.securityGrade === 'A';
              const isCopiedMarkdown = copiedId === `${badge.id}-md`;
              const isCopiedHtml = copiedId === `${badge.id}-html`;

              return (
                <motion.div
                  key={badge.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: idx * 0.02 }}
                  className="glass p-5 rounded-2xl border border-line hover:border-accent/40 bg-surface/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                >
                  <div>
                    {/* Top Row: Scope Pill & Status */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${getScopeBadgeColor(badge.scope)}`}>
                        {badge.project}
                      </span>

                      <div className="flex items-center gap-2">
                        {isGradeA && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/20 text-accent border border-accent/30 text-[10px] font-mono font-bold">
                            <ShieldCheck className="w-3 h-3 text-accent" />
                            Grade A
                          </span>
                        )}

                        <span className={`inline-flex items-center gap-1 text-[11px] font-mono ${
                          badge.status === 'active' ? 'text-accent' : 'text-ink-muted'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            badge.status === 'active' ? 'bg-accent animate-pulse' : 'bg-line-strong'
                          }`} />
                          {badge.status === 'active' ? 'Active' : 'Ready'}
                        </span>
                      </div>
                    </div>

                    {/* Title & Category */}
                    <h3 className="text-base font-bold text-ink group-hover:text-accent transition-colors mb-1">
                      {badge.name}
                    </h3>
                    <p className="text-[11px] font-mono text-accent/90 mb-3">
                      {badge.category}
                    </p>

                    {/* Badge Image Live Render Area */}
                    <div className="p-3 rounded-xl bg-canvas/80 border border-line mb-4 flex items-center justify-center min-h-[52px]">
                      {badge.scope === 'github' && badge.badgeUrl.includes('assets') ? (
                        <div className="flex items-center gap-3">
                          {/* GitHub Achievement Asset Icon */}
                          <img
                            src={badge.badgeUrl}
                            alt={badge.name}
                            className="h-10 w-10 object-contain drop-shadow"
                            loading="lazy"
                          />
                          <span className="text-xs font-mono text-ink font-semibold">
                            {badge.name}
                          </span>
                        </div>
                      ) : (
                        <img
                          src={badge.badgeUrl}
                          alt={badge.name}
                          className="max-h-8 max-w-full object-contain"
                          loading="lazy"
                        />
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-xs text-ink leading-relaxed mb-4">
                      {badge.description}
                    </p>
                  </div>

                  {/* Actions Row */}
                  <div className="pt-3 border-t border-line flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => copyToClipboard(badge.markdownSnippet, `${badge.id}-md`)}
                        className="px-2 py-1 rounded-lg text-[10px] font-mono text-ink-muted hover:text-ink glass border border-line hover:border-accent/40 transition-colors flex items-center gap-1"
                        title="Copy Markdown embed snippet"
                      >
                        {isCopiedMarkdown ? (
                          <>
                            <Check className="w-3 h-3 text-accent" />
                            <span className="text-accent">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>MD</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => copyToClipboard(badge.htmlSnippet, `${badge.id}-html`)}
                        className="px-2 py-1 rounded-lg text-[10px] font-mono text-ink-muted hover:text-ink glass border border-line hover:border-accent/40 transition-colors flex items-center gap-1"
                        title="Copy HTML embed snippet"
                      >
                        {isCopiedHtml ? (
                          <>
                            <Check className="w-3 h-3 text-accent" />
                            <span className="text-accent">Copied</span>
                          </>
                        ) : (
                          <>
                            <Code2 className="w-3 h-3" />
                            <span>HTML</span>
                          </>
                        )}
                      </button>
                    </div>

                    <a
                      href={badge.targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-accent hover:text-accent transition-colors"
                    >
                      <span>Inspect Registry</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Endpoint Pattern Reference Box */}
        <FadeInWhenVisible delay={0.2}>
          <div className="mt-14 glass p-6 sm:p-8 rounded-3xl border border-line bg-surface/40">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-accent" />
                <h3 className="text-base font-bold text-ink font-mono">
                  Skills Directory Endpoint Verification Standard
                </h3>
              </div>
              <a
                href="https://skillsdirectory.com/authors/abdullahmalik17"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-accent hover:text-accent inline-flex items-center gap-1"
              >
                <span>Visit Author Profile: @abdullahmalik17</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <p className="text-xs text-ink leading-relaxed mb-4">
              Skills Directory dynamically verifies Claude and Agentic AI skills against prompt injection vulnerabilities and malware payload detection. Badges are resolved directly over deterministic SVG endpoints:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-canvas/80 border border-line">
                <span className="text-ink-muted block mb-1">{'// Dynamic SVG Badge Endpoint:'}</span>
                <span className="text-accent select-all break-all">
                  https://www.skillsdirectory.com/api/skills/abdullahmalik17-[skill-name]/badge
                </span>
              </div>
              <div className="p-3 rounded-xl bg-canvas/80 border border-line">
                <span className="text-ink-muted block mb-1">{'// Audited Verification Page:'}</span>
                <span className="text-accent select-all break-all">
                  https://www.skillsdirectory.com/skills/abdullahmalik17-[skill-name]
                </span>
              </div>
            </div>
          </div>
        </FadeInWhenVisible>

      </div>
    </section>
  );
}
