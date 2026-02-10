'use client';

import Timeline, { TimelineEvent } from './Timeline';
import FadeInWhenVisible from './FadeInWhenVisible';
import AnimatedCounter from './AnimatedCounter';
import SystemArchitecture from './SystemArchitecture';

const About = () => {
  const stats = [
    { number: 2, label: 'Years Experience', suffix: '+' },
    { number: 15, label: 'Projects Completed', suffix: '+' },
    { number: 10, label: 'Technologies Mastered', suffix: '+' },
    { number: 247, label: 'AI Support Available', prefix: '', suffix: '' }, // Display as 247 for 24/7
  ];

  const timelineEvents: TimelineEvent[] = [
    {
      year: '2023',
      title: 'The Spark',
      description: 'Discovered web development at age 14. Built first HTML/CSS projects within 3 months, igniting a passion for code.',
    },
    {
      year: '2024',
      title: 'Leveling Up',
      description: 'Mastered TypeScript and modern web frameworks (Next.js). Started building robust full-stack applications.',
    },
    {
      year: '2024 - 2025',
      title: 'Agentic AI Specialization',
      description: 'Joined Panaversity. Specialized in Agentic AI using OpenAI SDK, Python, and N8n. Built first autonomous agents.',
    },
    {
      year: 'Present',
      title: 'Enterprise AI',
      description: 'Expanding into Cloud Native AI (Docker, Kubernetes) and OpenAI Agent Kit for scalable enterprise solutions.',
    },
  ];

  return (
    <section 
      id="about" 
      className="py-24 relative overflow-hidden"
      data-component="About Section"
      data-type="Client Component"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            The <span className="text-shimmer">Story</span> Behind the Code
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[color:var(--accent)] to-[color:var(--accent-secondary)] mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <FadeInWhenVisible direction="right">
          <div data-component="Bio Content" data-type="Layout">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[color:var(--accent)]/20 flex items-center justify-center text-sm">🚀</span>
              My Journey
            </h3>
            
            <div data-component="Journey Timeline" data-tech="Framer Motion">
                <Timeline events={timelineEvents} />
            </div>

            <div className="mt-12 p-6 glass rounded-2xl border-l-4 border-l-[color:var(--accent)] italic text-gray-300 bg-white/5">
                &quot;I believe in creating seamless, intelligent experiences that make
                technology accessible and beneficial for everyone.&quot;
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12" data-component="Stats Display" data-tech="Custom Animated Counter">
              {stats.map((stat, index) => (
                <div key={index} className="glass p-4 rounded-xl text-center hover:bg-white/5 transition-colors border-white/5">
                  <div className="text-2xl font-bold text-[color:var(--accent)] mb-1">
                    {stat.label === 'AI Support Available' ? (
                      <span className="text-shimmer">24/7</span>
                    ) : (
                      <AnimatedCounter
                        value={stat.number}
                        suffix={stat.suffix}
                        prefix={stat.prefix}
                      />
                    )}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          </FadeInWhenVisible>

          {/* Visual Element */}
          <FadeInWhenVisible direction="left" delay={0.2}>
          <div className="relative" data-component="System Diagram" data-tech="SVG / Framer Motion">
            <SystemArchitecture />
          </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
};

export default About;

