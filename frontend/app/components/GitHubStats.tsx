'use client';

import { useState, useEffect } from 'react';
import { 
  Package, Flame, Users, Rocket, Github, 
  Cpu, Layers, Globe2, ArrowUpRight, Trophy 
} from 'lucide-react';
import FadeInWhenVisible from './FadeInWhenVisible';
import AnimatedCounter from './AnimatedCounter';
import { GITHUB_ACHIEVEMENTS } from '../lib/portfolio-data';

interface GitHubProfile {
  public_repos: number;
  followers: number;
  following: number;
}

export default function GitHubStats() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('https://api.github.com/users/AbdullahMalik17');
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      } catch (error) {
        console.error('Failed to fetch GitHub stats', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    {
      number: profile?.public_repos || 30,
      label: 'Public Repositories',
      suffix: '+',
      icon: Package,
      color: 'text-indigo-400',
    },
    {
      number: 85,
      label: 'Contributions & Commits',
      suffix: '+',
      icon: Flame,
      color: 'text-amber-400',
    },
    {
      number: profile?.followers || 12,
      label: 'Community Followers',
      suffix: '+',
      icon: Users,
      color: 'text-cyan-400',
    },
    {
      number: 3,
      label: 'Flagship Systems',
      suffix: '',
      icon: Rocket,
      color: 'text-pink-400',
    },
  ];

  return (
    <section id="github" className="py-20 bg-slate-950/40 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-sm shadow-cyan-500/10">
              <Github className="w-3.5 h-3.5 text-cyan-400" />
              Open Source Activity
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              GitHub <span className="text-shimmer">Engineering Velocity</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Real-time metrics from open-source agent frameworks, Go daemons, and developer tooling.
            </p>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.2}>
          <div className="glass rounded-3xl p-8 md:p-12 border border-white/10 bg-slate-900/40">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, index) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={index}
                    className="p-5 rounded-2xl glass border border-white/[0.08] bg-slate-950/60 text-center hover:border-cyan-500/40 transition-all duration-300 group"
                  >
                    <div className={`w-10 h-10 mx-auto mb-3 rounded-xl glass border border-white/10 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1 font-mono">
                      {isLoading ? (
                        <div className="h-8 w-16 mx-auto bg-cyan-500/20 rounded animate-pulse" />
                      ) : (
                        <AnimatedCounter value={stat.number} suffix={stat.suffix} />
                      )}
                    </div>
                    <div className="text-xs text-slate-400 font-mono font-semibold">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Official GitHub Achievements */}
            <div className="mb-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 px-1">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider">
                    Official GitHub Achievements & Badges
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/AbdullahMalik17"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-85 transition-opacity"
                    title="Follow @AbdullahMalik17 on GitHub"
                  >
                    <img
                      src="https://img.shields.io/github/followers/AbdullahMalik17?label=Follow%20%40AbdullahMalik17&style=social"
                      alt="GitHub Followers"
                      className="h-5"
                      loading="lazy"
                    />
                  </a>
                  <span className="text-[11px] font-mono text-cyan-400/90 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Verified on GitHub Profile
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {GITHUB_ACHIEVEMENTS.map((ach) => (
                  <a
                    key={ach.id}
                    href={ach.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-5 rounded-2xl glass border border-white/[0.08] hover:border-amber-500/40 bg-slate-950/60 transition-all duration-300 group relative overflow-hidden block hover:-translate-y-1 shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner p-1 shrink-0">
                          <img
                            src={
                              ach.id === 'starstruck'
                                ? 'https://github.githubassets.com/assets/starstruck-default-b6610abad518.png'
                                : ach.id === 'pull-shark'
                                ? 'https://github.githubassets.com/assets/pull-shark-default-498c279a747d.png'
                                : 'https://github.githubassets.com/assets/pair-extraordinaire-default-579438a20e01.png'
                            }
                            alt={ach.title}
                            className="w-10 h-10 object-contain drop-shadow"
                            loading="lazy"
                          />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                            {ach.title}
                            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                          </div>
                          <div className="text-[10px] font-mono text-amber-400/90 font-bold uppercase tracking-wide">
                            {ach.tier}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      {ach.description}
                    </p>
                    <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-white/[0.06] flex items-center justify-between">
                      <span>Scope:</span>
                      <span className="text-slate-200 font-semibold">{ach.repoOrContext}</span>
                    </div>
                  </a>
                ))}
              </div>

              {/* GitHub Readme Dynamic Stats & Language Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href="https://github.com/AbdullahMalik17"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl glass border border-white/[0.08] hover:border-cyan-500/40 bg-slate-950/60 transition-all flex items-center justify-center overflow-hidden group shadow-md"
                >
                  <img
                    src="https://github-readme-stats.vercel.app/api?username=AbdullahMalik17&show_icons=true&theme=radical"
                    alt="Abdullah Malik GitHub Stats"
                    className="w-full max-w-sm sm:max-w-md object-contain rounded-xl group-hover:scale-[1.02] transition-transform"
                    loading="lazy"
                  />
                </a>
                <a
                  href="https://github.com/AbdullahMalik17"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl glass border border-white/[0.08] hover:border-cyan-500/40 bg-slate-950/60 transition-all flex items-center justify-center overflow-hidden group shadow-md"
                >
                  <img
                    src="https://github-readme-stats.vercel.app/api/top-langs/?username=AbdullahMalik17&layout=compact&theme=radical"
                    alt="Abdullah Malik Top Languages"
                    className="w-full max-w-sm sm:max-w-md object-contain rounded-xl group-hover:scale-[1.02] transition-transform"
                    loading="lazy"
                  />
                </a>
              </div>
            </div>

            {/* Quick Repository Links */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <a
                href="https://github.com/AbdullahMalik17"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-xl text-xs font-bold transition-all hover:opacity-90 shadow-md shadow-indigo-500/25 cursor-pointer"
              >
                <Github className="w-4 h-4" />
                <span>Visit GitHub Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://github.com/AbdullahMalik17/malikclaw"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 glass border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition-all cursor-pointer"
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>MalikClaw (Go Engine)</span>
              </a>

              <a
                href="https://github.com/AbdullahMalik17/Digital-FTE"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 glass border border-white/10 hover:border-pink-500/40 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition-all cursor-pointer"
              >
                <Layers className="w-4 h-4 text-pink-400" />
                <span>Digital FTE Repo</span>
              </a>

              <a
                href="https://github.com/AbdullahMalik17/Hacathan_5"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 glass border border-white/10 hover:border-emerald-500/40 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition-all cursor-pointer"
              >
                <Globe2 className="w-4 h-4 text-emerald-400" />
                <span>Customer Success FTE</span>
              </a>
            </div>

            {/* Core Tech Stack Micro Badges */}
            <div className="border-t border-white/[0.08] pt-8 text-center">
              <span className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-widest block mb-4">
                Core Stack Arsenal
              </span>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  'Go (Golang)', 'Python AsyncIO', 'TypeScript', 'Next.js 15',
                  'Model Context Protocol', 'pgvector', 'Docker', 'Gemini 2.5',
                  'Claude 3.5 Sonnet', 'Apache Kafka'
                ].map((name, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs font-mono text-slate-300 rounded-lg glass border border-white/10 bg-slate-950/40 hover:border-cyan-500/40 transition-colors"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
