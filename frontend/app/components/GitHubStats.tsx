'use client';

import { useState, useEffect } from 'react';
import FadeInWhenVisible from './FadeInWhenVisible';
import AnimatedCounter from './AnimatedCounter';

interface GitHubProfile {
  public_repos: number;
  followers: number;
  following: number;
}

const GitHubStats = () => {
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
      number: profile?.public_repos || 15,
      label: 'Public Repositories',
      suffix: '+',
      icon: '📦'
    },
    {
      number: 50,
      label: 'Contributions (2024)',
      suffix: '+',
      icon: '🔥'
    },
    {
      number: profile?.followers || 0,
      label: 'Followers',
      suffix: '',
      icon: '👥'
    },
    {
      number: 3,
      label: 'Major Projects',
      suffix: '',
      icon: '🚀'
    },
  ];

  return (
    <section id="github" className="py-20 bg-[color:var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              GitHub Activity
            </h2>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Real-time data from my open source contributions and project development
            </p>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.2}>
          <div className="glass rounded-3xl p-8 md:p-12">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Live Stats
              </h3>
            </div>

            {/* Stats Grid - Clean design without decorative bars */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center group hover:scale-105 transition-transform duration-300"
                >
                  <div className="mb-3 text-3xl group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gradient-primary mb-2">
                    {isLoading ? (
                      <div className="h-10 w-16 mx-auto bg-[color:var(--accent)]/20 rounded animate-pulse" />
                    ) : (
                      <AnimatedCounter value={stat.number} suffix={stat.suffix} />
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* GitHub Links - Improved spacing and design */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <a
                href="https://github.com/AbdullahMalik17"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-button text-gray-900 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-lg hover:shadow-[color:var(--accent)]/30"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">💻</span>
                <span>View GitHub Profile</span>
              </a>
              <a
                href="https://github.com/AbdullahMalik17/Agentic_AI/tree/main/_Projects"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 glass border border-[color:var(--accent)]/20 hover:border-[color:var(--accent)]/40 rounded-xl font-semibold transition-all hover:scale-105"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">🤖</span>
                <span>AI Projects</span>
              </a>
              <a
                href="https://github.com/AbdullahMalik17/Projects-of-html"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 glass border border-[color:var(--accent)]/20 hover:border-[color:var(--accent)]/40 rounded-xl font-semibold transition-all hover:scale-105"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">🌐</span>
                <span>Web Projects</span>
              </a>
            </div>

            {/* Technologies Showcase - Improved with better spacing */}
            <div className="text-center border-t border-[color:var(--card-border)] pt-8">
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-5 uppercase tracking-wider">
                Tech Stack
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { name: 'Python', icon: '🐍' },
                  { name: 'TypeScript', icon: '📘' },
                  { name: 'Next.js', icon: '⚡' },
                  { name: 'OpenAI', icon: '🤖' },
                  { name: 'React', icon: '⚛️' },
                  { name: 'Tailwind CSS', icon: '🎨' },
                  { name: 'FastAPI', icon: '🚀' },
                  { name: 'Docker', icon: '🐳' },
                ].map((tech, index) => (
                  <span
                    key={index}
                    className="group inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl glass border border-[color:var(--accent)]/20 hover:border-[color:var(--accent)]/40 transition-all hover:scale-105"
                  >
                    <span className="text-base group-hover:scale-110 transition-transform">
                      {tech.icon}
                    </span>
                    <span className="text-[color:var(--accent)]">{tech.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};

export default GitHubStats;
