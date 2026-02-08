'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import FadeInWhenVisible from './FadeInWhenVisible';
import ProjectModal from './ProjectModal';
import Button from './Button';
import ProjectCard3D from './ProjectCard3D';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projects = [
    {
      title: 'Digital FTE - Abdullah Junior',
      description: 'High-autonomy AI agent system acting as a Digital Employee that manages personal and business affairs 24/7 with self-evolving capabilities.',
      longDescription: 'Abdullah Junior is an elite Digital Full-Time Equivalent (FTE) - a comprehensive AI agent system designed to act as your personal and business autopilot. Features a dual-agent architecture with Cloud Agent (Sentry) for continuous monitoring and Local Agent (Executive) for secure task execution, orchestrated by an intelligent Brain system.',
      tech: ['Python', 'FastAPI', 'Gemini AI', 'Claude AI', 'MCP Servers'],
      image: '🤖',
      link: 'https://github.com/AbdullahMalik17/Digital-FTE',
      githubLink: 'https://github.com/AbdullahMalik17/Digital-FTE',
      features: [
        '24/7 automated monitoring of Gmail, WhatsApp, LinkedIn, and Social Media',
        'Dual-Agent Architecture: Cloud Sentry (read-only) + Local Executive (full access)',
        'Intelligent Orchestrator Brain for task classification and AI model selection',
        'Self-Evolution Engine with autonomous debugging and skill acquisition',
        'Financial management via Odoo integration (invoicing, expense tracking)',
        'Knowledge management with Git-synced Obsidian Vault',
      ],
      technologies: ['Python', 'FastAPI', 'Google Gemini 1.5 Pro', 'Claude 3.5', 'MCP Servers', 'Docker', 'Fly.io', 'Kubernetes'],
      challenges: [
        'Designed dual-agent security model separating cloud monitoring from local execution',
        'Implemented MCP servers for Gmail, WhatsApp, LinkedIn, Odoo, and Social Media integrations',
        'Built self-evolving system with comprehensive audit logging and testing protocols',
      ],
      results: [
        'Created autonomous digital employee capable of 24/7 task management',
        'Achieved secure multi-channel communication across 6+ platforms',
        'Built for 2026 AI Employee Hackathon with production-ready architecture',
      ],
    },
    {
      title: 'Customer Success Digital FTE',
      description: 'AI-powered customer support agent handling inquiries 24/7 across Email, WhatsApp, and Web channels with intelligent escalation.',
      longDescription: 'Complete AI-powered customer support system that autonomously handles customer inquiries across multiple channels. Features semantic search with pgvector, intelligent escalation detection, and comprehensive ticket management with 100% completion of all 9 development phases.',
      tech: ['Python', 'FastAPI', 'OpenAI GPT-4', 'PostgreSQL', 'Kafka'],
      image: '💬',
      link: 'https://github.com/AbdullahMalik17/Hacathan_5',
      githubLink: 'https://github.com/AbdullahMalik17/Hacathan_5',
      features: [
        'Multi-channel support: Email (Gmail), WhatsApp (Twilio), Web Forms',
        '5 AI function tools: create_ticket, get_customer_history, search_knowledge_base, send_email, escalate',
        'Semantic search with pgvector (1536-dim embeddings) for intelligent responses',
        'Sentiment analysis and intelligent escalation detection',
        'Async message processing with Kafka and dead letter queue',
        'Cross-channel customer identity management',
      ],
      technologies: ['Python', 'FastAPI', 'OpenAI GPT-4 Turbo', 'PostgreSQL + pgvector', 'Apache Kafka', 'Docker', 'Kubernetes'],
      challenges: [
        'Built semantic search system with pgvector for accurate knowledge base queries',
        'Implemented async message processing with Kafka, deduplication, and retry logic',
        'Designed escalation detection for pricing, refund, legal, and sentiment triggers',
      ],
      results: [
        'Completed all 9 development phases (117/117 tasks - 100%)',
        'Production-ready deployment on Docker/Kubernetes with cloud support (GKE/EKS/AKS)',
        'Comprehensive monitoring with Prometheus, Grafana, and structured logging',
      ],
    },
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
    <section 
      id="projects" 
      className="py-20 relative"
      data-component="Projects Section"
      data-type="Client Component"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[color:var(--foreground)] mb-4">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)]"></div>
            <p className="mt-6 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A selection of projects showcasing my work in AI and web development
            </p>
          </div>
        </FadeInWhenVisible>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          data-component="Project Grid"
          data-type="Layout"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="h-full"
              data-component="Project Card"
              data-type="Interactive Component"
              data-tech="Framer Motion"
            >
              <ProjectCard3D
                className="group glass rounded-2xl p-8 hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] transition-all duration-300 flex flex-col h-full bg-[color:var(--background-secondary)]/50 backdrop-blur-xl border border-cyan-500/10 hover:border-cyan-400/30"
                glareColor="rgba(6, 182, 212, 0.4)"
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
                  <div className="flex flex-wrap gap-2" data-tech="Tech Stack List">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-[color:var(--accent)]/[0.1] text-[color:var(--accent)] rounded-full text-xs font-medium border border-[color:var(--accent)]/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 relative z-30">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={(e: React.MouseEvent) => {
                         e.stopPropagation();
                         setSelectedProject(index);
                      }}
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
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button variant="ghost" size="sm">
                          View Code
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </ProjectCard3D>
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

