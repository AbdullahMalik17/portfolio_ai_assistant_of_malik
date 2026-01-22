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
      className="py-20 bg-[color:var(--background-secondary)]"
      data-component="About Section"
      data-type="Client Component"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <FadeInWhenVisible direction="right">
          <div data-component="Bio Content" data-type="Layout">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              My Journey
            </h3>
            
            <div data-component="Journey Timeline" data-tech="Framer Motion">
                <Timeline events={timelineEvents} />
            </div>

            <div className="mt-8">
               <p className="text-gray-600 dark:text-gray-400 italic">
                &quot;I believe in creating seamless, intelligent experiences that make
                technology accessible and beneficial for everyone.&quot;
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-12" data-component="Stats Display" data-tech="Custom Animated Counter">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    {stat.label === 'AI Support Available' ? (
                      <span>24/7</span>
                    ) : (
                      <AnimatedCounter
                        value={stat.number}
                        suffix={stat.suffix}
                        prefix={stat.prefix}
                      />
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
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

