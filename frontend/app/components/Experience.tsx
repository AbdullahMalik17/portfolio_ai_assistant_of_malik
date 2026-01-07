'use client';

import FadeInWhenVisible from './FadeInWhenVisible';
import { motion } from 'framer-motion';

interface ExperienceItem {
  title: string;
  organization: string;
  period: string;
  description: string[];
  technologies?: string[];
  type: 'education' | 'project' | 'certification';
}

const experiences: ExperienceItem[] = [
  {
    title: 'Agentic AI Development',
    organization: 'Panaversity',
    period: '2024 - Present',
    description: [
      'Mastering advanced AI agent development using OpenAI Agent SDK and Agent Kit',
      'Building multi-agent systems with complex workflows using N8N',
      'Implementing RAG (Retrieval-Augmented Generation) systems with vector databases',
      'Developing production-ready AI applications with Langfuse monitoring',
    ],
    technologies: ['OpenAI SDK', 'Python', 'N8N', 'Langfuse', 'Vector DBs'],
    type: 'education',
  },
  {
    title: 'Artificial Intelligence Program',
    organization: 'PIAIC',
    period: '2023 - 2024',
    description: [
      'Completed comprehensive AI and Machine Learning curriculum',
      'Learned foundations of neural networks and deep learning',
      'Developed practical AI projects using Python and TensorFlow',
      'Gained expertise in data processing and model deployment',
    ],
    technologies: ['Python', 'TensorFlow', 'Pandas', 'NumPy'],
    type: 'education',
  },
  {
    title: 'AI Portfolio Assistant',
    organization: 'Personal Project',
    period: '2024',
    description: [
      'Built intelligent portfolio with AI chatbot using OpenAI Assistants API',
      'Implemented RAG system for context-aware responses about portfolio',
      'Achieved 24/7 automated visitor engagement with 95%+ accuracy',
      'Integrated admin dashboard for contact management and analytics',
    ],
    technologies: ['Next.js 15', 'OpenAI', 'Vercel Postgres', 'TypeScript'],
    type: 'project',
  },
  {
    title: 'Multi-Model Code Assistant',
    organization: 'Agentic AI Project',
    period: '2024',
    description: [
      'Developed sophisticated code assistant supporting multiple LLM models',
      'Implemented memory persistence for context-aware multi-turn conversations',
      'Created intuitive chat interface using Chainlit framework',
      'Integrated observability and monitoring with Langfuse',
    ],
    technologies: ['OpenAI SDK', 'MEM0', 'Chainlit', 'Langfuse', 'Python'],
    type: 'project',
  },
];

const Experience = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'education':
        return '🎓';
      case 'project':
        return '🚀';
      case 'certification':
        return '📜';
      default:
        return '💼';
    }
  };

  return (
    <section id="experience" className="py-20 bg-[color:var(--background-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Experience & Education
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              My journey through education and hands-on project development
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>

          {/* Experience items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <FadeInWhenVisible
                key={index}
                direction={index % 2 === 0 ? 'right' : 'left'}
                delay={index * 0.1}
              >
                <div
                  className={`relative grid md:grid-cols-2 gap-8 items-center ${
                    index % 2 === 0 ? '' : 'md:text-right'
                  }`}
                >
                  {/* Content */}
                  <div className={index % 2 === 0 ? 'md:pr-12' : 'md:pl-12 md:col-start-2'}>
                    <motion.div
                      className="glass rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div
                        className={`flex items-center gap-3 mb-3 ${
                          index % 2 === 0 ? '' : 'md:justify-end'
                        }`}
                      >
                        <span className="text-3xl">{getIcon(exp.type)}</span>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {exp.title}
                          </h3>
                          <p className="text-sm text-[color:var(--accent)] font-semibold">
                            {exp.organization}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-medium">
                        {exp.period}
                      </p>

                      <ul
                        className={`space-y-2 text-gray-600 dark:text-gray-300 ${
                          index % 2 === 0 ? 'text-left' : 'md:text-right'
                        }`}
                      >
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[color:var(--accent)] mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      {exp.technologies && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {exp.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 text-xs font-medium rounded-full bg-[color:var(--accent)]/10 text-[color:var(--accent)] border border-[color:var(--accent)]/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Timeline dot */}
                  <div
                    className={`absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-[color:var(--accent)] border-4 border-[color:var(--background)] ${
                      index % 2 === 0 ? 'md:-translate-x-1/2' : 'md:-translate-x-1/2'
                    }`}
                    style={{ top: '2rem' }}
                  ></div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
