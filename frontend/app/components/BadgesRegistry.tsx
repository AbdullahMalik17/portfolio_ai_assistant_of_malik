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

  const tabs: TabItem[] = [
    { id: 'all', label: 'All Registries', count: BADGES_SUMMARY.total },
    { id: 'skills-directory', label: 'Skills Directory (Grade A)', count: BADGES_SUMMARY.skillsDirectoryCount },
    { id: 'digital-fte', label: 'Digital-FTE', count: 9 },
    { id: 'malikclaw', label: 'MalikClaw Go', count: 5 },
    { id: 'github', label: 'GitHub Achievements', count: 6 },
    { id: 'commercial', label: 'Commercial Systems', count: 5 },
  ];

  const filteredBadges = useMemo(() => {
    return ONLINE_BADGES.filter((badge) => {
      // Scope / Tab filter
      let matchesTab = true;
      if (activeTab === 'commercial') {
        matchesTab = badge.scope === 'azan-shop' || badge.scope === 'unique-boutique' || badge.scope === 'portfolio';
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
    switch (scope) {
      case 'skills-directory':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'digital-fte':
        return 'text-pink-400 bg-pink-500/10 border-pink-500/30';
      case 'malikclaw':
        return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
      case 'github':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'portfolio':
        return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30';
      default:
        return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
    }
  };

  return (
    <section id="registry" className="py-24 relative overflow-hidden bg-slate-950/60 border-t border-white/[0.06]">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <FadeInWhenVisible>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-sm shadow-emerald-500/10">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Verified Trust & Quality Registry
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              Online Badges & <span className="text-shimmer">Certifications</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Curated audit directory of <strong className="text-white">37 verified online badges</strong>, automated static analysis tests, Skills Directory Grade-A Claude skills, Go documentation indexes, and GitHub achievements.
            </p>
          </div>
        </FadeInWhenVisible>

        {/* High-Level Verification Summary Metric Cards */}
        <FadeInWhenVisible delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="glass p-5 rounded-2xl border border-white/[0.08] bg-slate-900/40 text-center group hover:border-emerald-500/40 transition-all">
              <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                {BADGES_SUMMARY.gradeACount}
              </div>
              <div className="text-xs text-slate-400 font-mono font-medium">
                Grade A Claude Skills
              </div>
            </div>

            <div className="glass p-5 rounded-2xl border border-white/[0.08] bg-slate-900/40 text-center group hover:border-cyan-500/40 transition-all">
              <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                {BADGES_SUMMARY.active}
              </div>
              <div className="text-xs text-slate-400 font-mono font-medium">
                Active Live Endpoints (200)
              </div>
            </div>

            <div className="glass p-5 rounded-2xl border border-white/[0.08] bg-slate-900/40 text-center group hover:border-purple-500/40 transition-all">
              <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <Globe className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                {BADGES_SUMMARY.ecosystemCount}
              </div>
              <div className="text-xs text-slate-400 font-mono font-medium">
                Audited Ecosystems
              </div>
            </div>

            <div className="glass p-5 rounded-2xl border border-white/[0.08] bg-slate-900/40 text-center group hover:border-amber-500/40 transition-all">
              <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                {BADGES_SUMMARY.total}
              </div>
              <div className="text-xs text-slate-400 font-mono font-medium">
                Total Registry Badges
              </div>
            </div>
          </div>
        </FadeInWhenVisible>

        {/* Filter Controls: Tabs, Search Bar & Status Toggle */}
        <FadeInWhenVisible delay={0.15}>
          <div className="glass p-4 rounded-2xl border border-white/[0.08] bg-slate-900/50 mb-8 space-y-4">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 border-b border-white/[0.06] pb-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-md shadow-emerald-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    activeTab === tab.id ? 'bg-black/30 text-white' : 'bg-white/10 text-slate-400'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Search & Status Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter badges by title, tool, or registry..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors font-sans"
                />
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-300 select-none">
                  <input
                    type="checkbox"
                    checked={showActiveOnly}
                    onChange={(e) => setShowActiveOnly(e.target.checked)}
                    className="rounded border-white/20 bg-slate-900 text-emerald-500 focus:ring-emerald-500/30"
                  />
                  <span>Active Only ({BADGES_SUMMARY.active})</span>
                </label>

                <div className="text-[11px] font-mono text-slate-500 hidden sm:block">
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
                  className="glass p-5 rounded-2xl border border-white/[0.08] hover:border-emerald-500/40 bg-slate-900/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                >
                  <div>
                    {/* Top Row: Scope Pill & Status */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${getScopeBadgeColor(badge.scope)}`}>
                        {badge.project}
                      </span>

                      <div className="flex items-center gap-2">
                        {isGradeA && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold">
                            <ShieldCheck className="w-3 h-3 text-emerald-400" />
                            Grade A
                          </span>
                        )}

                        <span className={`inline-flex items-center gap-1 text-[11px] font-mono ${
                          badge.status === 'active' ? 'text-emerald-400' : 'text-amber-400'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            badge.status === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                          }`} />
                          {badge.status === 'active' ? 'Active' : 'Ready'}
                        </span>
                      </div>
                    </div>

                    {/* Title & Category */}
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors mb-1">
                      {badge.name}
                    </h3>
                    <p className="text-[11px] font-mono text-cyan-400/90 mb-3">
                      {badge.category}
                    </p>

                    {/* Badge Image Live Render Area */}
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-white/[0.06] mb-4 flex items-center justify-center min-h-[52px]">
                      {badge.scope === 'github' && badge.badgeUrl.includes('assets') ? (
                        <div className="flex items-center gap-3">
                          {/* GitHub Achievement Asset Icon */}
                          <img
                            src={badge.badgeUrl}
                            alt={badge.name}
                            className="h-10 w-10 object-contain drop-shadow"
                            loading="lazy"
                          />
                          <span className="text-xs font-mono text-slate-300 font-semibold">
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
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {badge.description}
                    </p>
                  </div>

                  {/* Actions Row */}
                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => copyToClipboard(badge.markdownSnippet, `${badge.id}-md`)}
                        className="px-2 py-1 rounded-lg text-[10px] font-mono text-slate-400 hover:text-white glass border border-white/10 hover:border-cyan-500/40 transition-colors flex items-center gap-1"
                        title="Copy Markdown embed snippet"
                      >
                        {isCopiedMarkdown ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-300">Copied</span>
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
                        className="px-2 py-1 rounded-lg text-[10px] font-mono text-slate-400 hover:text-white glass border border-white/10 hover:border-cyan-500/40 transition-colors flex items-center gap-1"
                        title="Copy HTML embed snippet"
                      >
                        {isCopiedHtml ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-300">Copied</span>
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
                      className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
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
          <div className="mt-14 glass p-6 sm:p-8 rounded-3xl border border-white/[0.08] bg-slate-900/40">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white font-mono">
                  Skills Directory Endpoint Verification Standard
                </h3>
              </div>
              <a
                href="https://skillsdirectory.com/authors/abdullahmalik17"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1"
              >
                <span>Visit Author Profile: @abdullahmalik17</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Skills Directory dynamically verifies Claude and Agentic AI skills against prompt injection vulnerabilities and malware payload detection. Badges are resolved directly over deterministic SVG endpoints:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10">
                <span className="text-slate-400 block mb-1">{'// Dynamic SVG Badge Endpoint:'}</span>
                <span className="text-emerald-400 select-all break-all">
                  https://www.skillsdirectory.com/api/skills/abdullahmalik17-[skill-name]/badge
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10">
                <span className="text-slate-400 block mb-1">{'// Audited Verification Page:'}</span>
                <span className="text-cyan-400 select-all break-all">
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
