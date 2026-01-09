'use client';

import { motion } from 'framer-motion';
import FadeInWhenVisible from './FadeInWhenVisible';
import AnimatedCounter from './AnimatedCounter';

interface Stat {
  label: string;
  value: number;
  suffix: string;
  icon: string;
  description: string;
}

const stats: Stat[] = [
  {
    label: 'AI Projects',
    value: 10,
    suffix: '+',
    icon: '🤖',
    description: 'Agentic AI systems built',
  },
  {
    label: 'Technologies',
    value: 25,
    suffix: '+',
    icon: '💻',
    description: 'Tools & frameworks mastered',
  },
  {
    label: 'GitHub Repos',
    value: 50,
    suffix: '+',
    icon: '📦',
    description: 'Open source contributions',
  },
  {
    label: 'Code Quality',
    value: 95,
    suffix: '%',
    icon: '⭐',
    description: 'Clean code standards',
  },
];

const AchievementStats = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="achievements" className="py-20 bg-[color:var(--background-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[color:var(--foreground)] mb-4">
              Achievements & Impact
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Delivering quality solutions and continuous learning
            </p>
          </div>
        </FadeInWhenVisible>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="glass rounded-2xl p-8 text-center hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] transition-shadow duration-300"
            >
              {/* Icon */}
              <div className="text-5xl mb-4" role="img" aria-label={stat.label}>
                {stat.icon}
              </div>

              {/* Counter */}
              <div className="flex items-center justify-center mb-2">
                <span className="text-4xl md:text-5xl font-bold text-[color:var(--accent)]">
                  <AnimatedCounter value={stat.value} />
                </span>
                <span className="text-4xl md:text-5xl font-bold text-[color:var(--accent)]">
                  {stat.suffix}
                </span>
              </div>

              {/* Label */}
              <h3 className="text-xl font-bold text-[color:var(--foreground)] mb-2">
                {stat.label}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AchievementStats;
