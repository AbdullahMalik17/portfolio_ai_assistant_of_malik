'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import FadeInWhenVisible from './FadeInWhenVisible';
import ProjectModal from './ProjectModal';
import Button from './Button';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projects = [
    {
      title: 'Physical AI Platform',
      description: 'Interactive platform teaching Physical AI & Humanoid Robotics with a RAG chatbot and 43+ runnable code examples.',
      longDescription: 'Comprehensive educational platform designed to make Physical AI and Humanoid Robotics accessible to everyone. Features an intelligent RAG-powered chatbot that answers questions about robotics, embodied AI, and related concepts using vector search across curated educational content.',
      tech: ['Docusaurus', 'React', 'OpenAI', 'Pinecone', 'Tailwind'],
      image: '📘',
      link: 'https://github.com/AbdullahMalik17/Physical_AI',
      githubLink: 'https://github.com/AbdullahMalik17/Physical_AI',
      features: [
        '43+ interactive, runnable code examples with live execution',
        'RAG-powered chatbot with semantic search across educational content',
        'Vector database integration using Pinecone for intelligent Q&A',
        'Comprehensive documentation covering embodied AI fundamentals',
        'Interactive tutorials with step-by-step explanations',
      ],
      technologies: ['Docusaurus', 'React', 'OpenAI GPT-4', 'Pinecone Vector DB', 'Tailwind CSS', 'Python'],
      challenges: [
        'Built semantic search system to retrieve relevant robotics content from 100+ documents',
        'Implemented code sandbox for safe execution of robotics simulation code',
        'Optimized vector embeddings for accurate context retrieval',
      ],
      results: [
        'Created comprehensive learning resource for Physical AI enthusiasts',
        'Achieved high accuracy in chatbot responses using RAG architecture',
        'Successfully deployed with positive feedback from robotics community',
      ],
    },
    {
      title: 'Voice Assistant Agent',
      description: 'Privacy-first voice assistant with wake word detection, semantic memory, and autonomous system control capabilities.',
      longDescription: 'Advanced voice-activated AI assistant that prioritizes user privacy while providing intelligent, context-aware responses. Features custom wake word detection, semantic memory for personalized interactions, and the ability to control system functions through natural voice commands.',
      tech: ['Python', 'Gemini API', 'Whisper', 'ChromaDB', 'Picovoice'],
      image: '🎙️',
      link: 'https://github.com/AbdullahMalik17/Voice-Assistant17',
      githubLink: 'https://github.com/AbdullahMalik17/Voice-Assistant17',
      features: [
        'Custom wake word detection using Picovoice for hands-free activation',
        'Semantic memory system to remember user preferences and context',
        'System control capabilities (open apps, adjust settings, etc.)',
        'Offline speech recognition with OpenAI Whisper',
        'Natural conversation flow with Gemini API integration',
      ],
      technologies: ['Python', 'Google Gemini API', 'OpenAI Whisper', 'ChromaDB', 'Picovoice', 'PyAudio'],
      challenges: [
        'Implemented semantic memory using ChromaDB for context retention across sessions',
        'Optimized wake word detection for low false-positive rate',
        'Balanced local processing with cloud AI for privacy and performance',
      ],
      results: [
        'Achieved 95%+ accuracy in wake word detection',
        'Successfully implemented privacy-first architecture with local processing',
        'Created seamless voice interaction experience with minimal latency',
      ],
    },
    {
      title: 'AI Assistant Dashboard',
      description: 'Intelligent dashboard with OpenAI integration for natural language processing and task automation.',
      longDescription: 'Full-stack AI-powered portfolio dashboard that serves as an intelligent interface for visitor interactions. Integrates OpenAI Assistants API with RAG capabilities to answer questions about projects, skills, and experience using natural language.',
      tech: ['Next.js', 'OpenAI SDK', 'Python'],
      image: '🤖',
      link: 'https://portfolio-ai-assistant-of-malik-five.vercel.app/',
      liveLink: 'https://portfolio-ai-assistant-of-malik-five.vercel.app/',
      githubLink: 'https://github.com/AbdullahMalik17/Portfolio-AI-Assistant',
      features: [
        'AI chatbot with RAG for answering portfolio-related queries',
        'OpenAI Vector Store for semantic search across portfolio content',
        'Contact form with database storage and admin dashboard',
        'Real-time GitHub stats integration',
        'Progressive Web App (PWA) with offline support',
      ],
      technologies: ['Next.js 15', 'TypeScript', 'OpenAI Assistants API', 'Vercel Postgres', 'Tailwind CSS', 'Framer Motion'],
      challenges: [
        'Implemented RAG system using OpenAI Vector Store for accurate information retrieval',
        'Built admin dashboard for managing contact submissions',
        'Optimized performance for fast page loads and smooth animations',
      ],
      results: [
        '24/7 automated visitor support with AI-powered responses',
        'Reduced response time for common inquiries by 90%',
        'Enhanced user engagement with interactive AI features',
      ],
    },
    {
      title: 'AI Code Assistant',
      description: 'Multi AI Model code assistant that helps developers write, debug, and optimize code snippets.',
      longDescription: 'Intelligent coding assistant powered by OpenAI Agent SDK that helps developers with code generation, debugging, optimization, and learning. Features long-term memory, conversation tracking, and multi-step reasoning for complex coding tasks.',
      tech: ['OpenAI Agent SDK', 'MEM0', 'Python', 'Chainlit', 'Langfuse'],
      image: '💻',
      link: 'https://github.com/AbdullahMalik17/Agentic_AI/tree/main/_Projects/Code_Assistant_agent',
      githubLink: 'https://github.com/AbdullahMalik17/Agentic_AI/tree/main/_Projects/Code_Assistant_agent',
      features: [
        'Multi-step code generation with reasoning traces',
        'Intelligent code debugging and error explanation',
        'Code optimization suggestions with performance insights',
        'Long-term memory using MEM0 for personalized assistance',
        'Conversation tracking with Langfuse for quality monitoring',
      ],
      technologies: ['OpenAI Agent SDK', 'MEM0', 'Python', 'Chainlit', 'Langfuse', 'PostgreSQL'],
      challenges: [
        'Implemented agent-based architecture with tool use and function calling',
        'Integrated MEM0 for persistent memory across sessions',
        'Built comprehensive logging and monitoring with Langfuse',
      ],
      results: [
        'Reduced code debugging time by providing instant error analysis',
        'Improved code quality with intelligent optimization suggestions',
        'Created personalized learning experience with memory retention',
      ],
    },
    {
      title: 'Portfolio Website',
      description: 'Modern, responsive portfolio website with smooth animations and dark mode support.',
      longDescription: 'Professional portfolio website built with Next.js 15 showcasing projects, skills, and experience. Features smooth animations, dark mode, PWA capabilities, and an integrated AI chatbot for visitor interactions.',
      tech: ['Next.js', 'TypeScript', 'Tailwind'],
      image: '💼',
      link: 'https://github.com/AbdullahMalik17/Portfolio-AI-Assistant',
      githubLink: 'https://github.com/AbdullahMalik17/Portfolio-AI-Assistant',
      liveLink: 'https://portfolio-ai-assistant-of-malik-five.vercel.app/',
      features: [
        'Responsive design with mobile-first approach',
        'Smooth animations using Framer Motion',
        'Dark/Light/Auto theme with system preference detection',
        'Progressive Web App (PWA) with offline support',
        'Command Palette (⌘K) for quick navigation',
      ],
      technologies: ['Next.js 15', 'TypeScript', 'Tailwind CSS 4', 'Framer Motion', 'React 19'],
      challenges: [
        'Implemented complex animations while maintaining performance',
        'Built accessible command palette with keyboard navigation',
        'Optimized for Core Web Vitals and SEO',
      ],
      results: [
        'Achieved 95+ Lighthouse performance score',
        'Created engaging user experience with smooth transitions',
        'Successfully deployed as installable PWA',
      ],
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[color:var(--foreground)] mb-4">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A selection of projects showcasing my work in AI and web development
            </p>
          </div>
        </FadeInWhenVisible>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -12, scale: 1.02, transition: { duration: 0.2 } }}
              className="group glass rounded-2xl p-8 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-shadow duration-300 flex flex-col h-full"
            >
              <div className="text-6xl mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                {project.image}
              </div>
              <h3 className="text-2xl font-bold text-[color:var(--foreground)] mb-3 group-hover:text-[color:var(--accent)] transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                {project.description}
              </p>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-[color:var(--accent)]/[0.1] text-[color:var(--accent)] rounded-full text-xs font-medium border border-[color:var(--accent)]/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setSelectedProject(index)}
                    rightIcon={
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    }
                  >
                    Learn More
                  </Button>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="sm">
                        View Code
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Project Modal */}
        {selectedProject !== null && (
          <ProjectModal
            isOpen={selectedProject !== null}
            onClose={() => setSelectedProject(null)}
            project={{
              ...projects[selectedProject],
              tags: projects[selectedProject].tech,
            }}
          />
        )}
      </div>
    </section>
  );
};

export default Projects;

