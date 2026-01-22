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

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('https://api.github.com/users/AbdullahMalik17');
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      } catch (error) {
        console.error('Failed to fetch GitHub stats', error);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    { number: profile?.public_repos || 15, label: 'Public Repositories', suffix: '+' },
    { number: 50, label: 'Contributions (2024)', suffix: '+' }, // Contributions require GraphQL API, keeping static for now
    { number: profile?.followers || 0, label: 'Followers', suffix: '' },
    { number: 3, label: 'Major Projects', suffix: '' },
  ];

  return (
    <section id="github" className="py-20 bg-[color:var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              GitHub Activity
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Real-time data from my open source contributions and project development
            </p>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.2}>
          <div className="glass rounded-3xl p-8 md:p-12 border-2 border-[color:var(--accent)]/20">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Live Stats
              </h3>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    <AnimatedCounter value={stat.number} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* GitHub Links */}
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/AbdullahMalik17"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-800 text-white rounded-full font-semibold hover:bg-gray-800 dark:hover:bg-gray-700 transition-all hover:scale-105"
              >
                <span className="text-xl">💻</span>
                View GitHub Profile
              </a>
              <a
                href="https://github.com/AbdullahMalik17/Agentic_AI/tree/main/_Projects"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 glass hover:bg-[color:var(--accent)]/10 rounded-full font-semibold transition-all hover:scale-105"
              >
                <span className="text-xl">🤖</span>
                AI Projects
              </a>
              <a
                href="https://github.com/AbdullahMalik17/Projects-of-html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 glass hover:bg-[color:var(--accent)]/10 rounded-full font-semibold transition-all hover:scale-105"
              >
                <span className="text-xl">🌐</span>
                Web Projects
              </a>
            </div>

            {/* Technologies Showcase */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Most Used Technologies
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  'Python',
                  'TypeScript',
                  'Next.js',
                  'OpenAI',
                  'React',
                  'Tailwind CSS',
                  'FastAPI',
                  'Docker',
                ].map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 text-sm font-medium rounded-full bg-[color:var(--accent)]/10 text-[color:var(--accent)] border border-[color:var(--accent)]/20"
                  >
                    {tech}
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
