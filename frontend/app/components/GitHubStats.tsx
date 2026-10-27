// github-readme-stats and shields.io render at a width that only the remote
// service knows, so these stay plain <img> elements sized by CSS alone.
/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import { 
  Package, Flame, Users, Rocket, Github, 
  Cpu, Layers, Globe2, ArrowUpRight, Trophy 
} from 'lucide-react';
import FadeInWhenVisible from './FadeInWhenVisible';
import AnimatedCounter from './AnimatedCounter';
import { GITHUB_ACHIEVEMENTS, GITHUB_PROFILE, PROJECTS } from '../lib/portfolio-data';

interface GitHubProfile {
  public_repos: number;
  followers: number;
  following: number;
}

interface GitHubRepo {
  stargazers_count: number;
}

export default function GitHubStats() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [totalStars, setTotalStars] = useState<number>(GITHUB_PROFILE.totalStars);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`https://api.github.com/users/${GITHUB_PROFILE.username}`);
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }

        const reposRes = await fetch(
          `https://api.github.com/users/${GITHUB_PROFILE.username}/repos?per_page=100&sort=updated`
        );
        if (reposRes.ok) {
          const repos: GitHubRepo[] = await reposRes.json();
          setTotalStars(repos.reduce((sum, repo) => sum + repo.stargazers_count, 0));
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
      number: profile?.public_repos || GITHUB_PROFILE.publicRepos,
      label: 'Public Repositories',
      suffix: '',
      icon: Package,
      color: 'text-accent',
    },
    {
      number: totalStars,
      label: 'Stars Earned Across Repos',
      suffix: '',
      icon: Flame,
      color: 'text-accent',
    },
    {
      number: profile?.followers || GITHUB_PROFILE.followers,
      label: 'Community Followers',
      suffix: '',
      icon: Users,
      color: 'text-accent',
    },
    {
      number: PROJECTS.filter((p) => p.featured).length,
      label: 'Flagship Systems',
      suffix: '',
      icon: Rocket,
      color: 'text-accent',
    },
  ];

  return (
    <section id="github" className="py-16 bg-canvas/40 border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-sm shadow-accent/10">
              <Github className="w-3.5 h-3.5 text-accent" />
              Open Source Activity
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-ink tracking-tight">
              GitHub <span className="text-shimmer">Engineering Velocity</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-ink-muted max-w-2xl mx-auto leading-relaxed">
              Real-time metrics from open-source agent frameworks, Go daemons, and developer tooling.
            </p>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.2}>
          <div className="glass rounded-3xl p-8 md:p-12 border border-line bg-surface/40">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, index) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={index}
                    className="p-5 rounded-2xl glass border border-line bg-canvas/60 text-center hover:border-accent/40 transition-all duration-300 group"
                  >
                    <div className={`w-10 h-10 mx-auto mb-3 rounded-xl glass border border-line flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-ink mb-1 font-mono">
                      {isLoading ? (
                        <div className="h-8 w-16 mx-auto bg-accent/20 rounded animate-pulse" />
                      ) : (
                        <AnimatedCounter value={stat.number} suffix={stat.suffix} />
                      )}
                    </div>
                    <div className="text-xs text-ink-muted font-mono font-semibold">
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
                  <Trophy className="w-4 h-4 text-accent" />
                  <h3 className="text-xs sm:text-sm font-mono font-bold text-ink uppercase tracking-wider">
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
                  <span className="text-[11px] font-mono text-accent/90 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
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
                    className="p-5 rounded-2xl glass border border-line hover:border-accent/40 bg-canvas/60 transition-all duration-300 group relative overflow-hidden block hover:-translate-y-1 shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-surface border border-line flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner p-1 shrink-0">
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
                          <div className="text-sm font-bold text-ink group-hover:text-accent transition-colors flex items-center gap-1.5">
                            {ach.title}
                            <ArrowUpRight className="w-3.5 h-3.5 text-ink-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                          </div>
                          <div className="text-[10px] font-mono text-accent/90 font-bold uppercase tracking-wide">
                            {ach.tier}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-ink leading-relaxed mb-3">
                      {ach.description}
                    </p>
                    <div className="text-[11px] font-mono text-ink-muted pt-2 border-t border-line flex items-center justify-between">
                      <span>Scope:</span>
                      <span className="text-ink font-semibold">{ach.repoOrContext}</span>
                    </div>
                  </a>
                ))}
              </div>

              {/* GitHub Readme Dynamic Stats & Language Cards */}
              <div className="mb-3 px-1">
                <h3 className="text-xs sm:text-sm font-mono font-bold text-ink uppercase tracking-wider">
                  Public Profile Cards
                </h3>
                <p className="text-[11px] font-mono text-ink-muted mt-0.5">
                  Rendered live from the GitHub API via github-readme-stats.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href="https://github.com/AbdullahMalik17"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl glass border border-line hover:border-accent/40 bg-canvas/60 transition-all overflow-hidden group shadow-md"
                >
                  <div className="px-4 py-2.5 border-b border-line flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-ink uppercase tracking-wider">
                      Abdullah Malik
                    </span>
                    <span className="text-[10px] font-mono text-accent">STATS</span>
                  </div>
                  <div className="p-4 flex items-center justify-center">
                    <img
                      src="https://github-readme-stats.vercel.app/api?username=AbdullahMalik17&show_icons=true&hide_title=true&hide_border=true&bg_color=05070e&title_color=22d3ee&icon_color=22d3ee&text_color=a7b4c8"
                      alt="Abdullah Malik GitHub stats: total stars, commits, pull requests and issues"
                      className="w-full max-w-sm sm:max-w-md object-contain rounded-xl group-hover:scale-[1.02] transition-transform"
                      loading="lazy"
                    />
                  </div>
                </a>
                <a
                  href="https://github.com/AbdullahMalik17"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl glass border border-line hover:border-accent/40 bg-canvas/60 transition-all overflow-hidden group shadow-md"
                >
                  <div className="px-4 py-2.5 border-b border-line flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-ink uppercase tracking-wider">
                      Abdullah Malik
                    </span>
                    <span className="text-[10px] font-mono text-accent">LANGUAGES</span>
                  </div>
                  <div className="p-4 flex items-center justify-center">
                    <img
                      src="https://github-readme-stats.vercel.app/api/top-langs/?username=AbdullahMalik17&layout=compact&hide_title=true&hide_border=true&bg_color=05070e&title_color=22d3ee&text_color=a7b4c8"
                      alt="Abdullah Malik most used programming languages"
                      className="w-full max-w-sm sm:max-w-md object-contain rounded-xl group-hover:scale-[1.02] transition-transform"
                      loading="lazy"
                    />
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Repository Links */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <a
                href="https://github.com/AbdullahMalik17"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-accent text-accent-ink rounded-xl text-xs font-bold transition-all hover:opacity-90 shadow-md shadow-accent/25 cursor-pointer"
              >
                <Github className="w-4 h-4" />
                <span>Visit GitHub Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://github.com/AbdullahMalik17/malikclaw"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 glass border border-line hover:border-accent/40 text-ink hover:text-ink rounded-xl text-xs font-semibold transition-all cursor-pointer"
              >
                <Cpu className="w-4 h-4 text-accent" />
                <span>MalikClaw (Go Engine)</span>
              </a>

              <a
                href="https://github.com/AbdullahMalik17/Digital-FTE"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 glass border border-line hover:border-accent/40 text-ink hover:text-ink rounded-xl text-xs font-semibold transition-all cursor-pointer"
              >
                <Layers className="w-4 h-4 text-accent" />
                <span>Digital FTE Repo</span>
              </a>

              <a
                href="https://github.com/AbdullahMalik17/Hacathan_5"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 glass border border-line hover:border-accent/40 text-ink hover:text-ink rounded-xl text-xs font-semibold transition-all cursor-pointer"
              >
                <Globe2 className="w-4 h-4 text-accent" />
                <span>Customer Success FTE</span>
              </a>
            </div>

            {/* Core Tech Stack Micro Badges */}
            <div className="border-t border-line pt-8 text-center">
              <span className="text-[11px] font-mono font-semibold text-ink-muted uppercase tracking-widest block mb-4">
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
                    className="px-3 py-1 text-xs font-mono text-ink rounded-lg glass border border-line bg-canvas/40 hover:border-accent/40 transition-colors"
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
