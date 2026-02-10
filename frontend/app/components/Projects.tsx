'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeInWhenVisible from './FadeInWhenVisible';
import ProjectModal from './ProjectModal';
import Button from './Button';
import ProjectCard3D from './ProjectCard3D';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'recent' | 'alphabetical'>('recent');

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

  // Extract all unique technologies
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach(project => {
      project.tech.forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, [projects]);

  // Define categories
  const categories = [
    'All',
    'AI Agents',
    'Web Development',
    'Education',
  ];

  // Category mapping
  const getCategoryForProject = useCallback((project: typeof projects[0]) => {
    const title = project.title.toLowerCase();
    const desc = project.description.toLowerCase();

    if (title.includes('fte') || title.includes('assistant') || title.includes('voice') || desc.includes('agent')) {
      return 'AI Agents';
    }
    if (title.includes('platform') || title.includes('physical ai')) {
      return 'Education';
    }
    return 'Web Development';
  }, []);

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      // Search filter
      const matchesSearch = searchQuery === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tech.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category filter
      const matchesCategory = selectedCategory === 'All' ||
        getCategoryForProject(project) === selectedCategory;

      // Tech filter
      const matchesTech = selectedTechs.length === 0 ||
        selectedTechs.every(tech => project.tech.includes(tech));

      return matchesSearch && matchesCategory && matchesTech;
    });

    // Sort
    if (sortBy === 'alphabetical') {
      filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
    }
    // 'recent' keeps the original order

    return filtered;
  }, [projects, searchQuery, selectedCategory, selectedTechs, sortBy, getCategoryForProject]);

  // Toggle tech filter
  const toggleTech = (tech: string) => {
    setSelectedTechs(prev =>
      prev.includes(tech)
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTechs([]);
    setSelectedCategory('All');
    setSortBy('recent');
  };

  const hasActiveFilters = searchQuery !== '' || selectedTechs.length > 0 || selectedCategory !== 'All' || sortBy !== 'recent';

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
            <p className="mt-6 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A selection of projects showcasing my work in AI and web development
            </p>
          </div>
        </FadeInWhenVisible>

        {/* Filter Controls */}
        <div className="mb-12 space-y-6">
          {/* Search and Sort */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-[color:var(--background-secondary)] border border-[color:var(--foreground)]/10 focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/20 outline-none transition-all text-[color:var(--foreground)]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[color:var(--foreground)] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'recent' | 'alphabetical')}
              className="px-4 py-3 rounded-lg bg-[color:var(--background-secondary)] border border-[color:var(--foreground)]/10 focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/20 outline-none transition-all text-[color:var(--foreground)] min-w-[160px]"
            >
              <option value="recent">Most Recent</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-button text-gray-900'
                    : 'bg-[color:var(--background-secondary)] text-[color:var(--foreground)] border border-[color:var(--foreground)]/10 hover:border-[color:var(--accent)]/30'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Technology Filter */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Filter by Technology:
              </span>
              {selectedTechs.length > 0 && (
                <button
                  onClick={() => setSelectedTechs([])}
                  className="text-xs text-[color:var(--accent)] hover:underline"
                >
                  Clear ({selectedTechs.length})
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {allTechnologies.map((tech) => (
                <button
                  key={tech}
                  onClick={() => toggleTech(tech)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedTechs.includes(tech)
                      ? 'bg-[color:var(--accent)] text-white'
                      : 'bg-[color:var(--accent)]/10 text-[color:var(--accent)] border border-[color:var(--accent)]/20 hover:bg-[color:var(--accent)]/20'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          {/* Results Info and Clear Filters */}
          <div className="flex items-center justify-between pt-4 border-t border-[color:var(--foreground)]/10">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Showing {filteredAndSortedProjects.length} of {projects.length} projects
            </span>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-[color:var(--accent)] hover:underline font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {filteredAndSortedProjects.length === 0 ? (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-[color:var(--foreground)] mb-2">
                No projects found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Try adjusting your filters or search query
              </p>
              <Button onClick={clearFilters} variant="primary">
                Clear Filters
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="project-grid"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              data-component="Project Grid"
              data-type="Layout"
            >
              {filteredAndSortedProjects.map((project) => {
                const originalIndex = projects.findIndex(p => p.title === project.title);
                return (
                <motion.div
                  key={project.title}
                  variants={cardVariants}
                  className="h-full"
                  data-component="Project Card"
                  data-type="Interactive Component"
                  data-tech="Framer Motion"
                >
                  <ProjectCard3D
                    className="group glass glow-card rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 flex flex-col h-full bg-[color:var(--background-secondary)]/40 backdrop-blur-2xl border border-white/5 hover:border-[color:var(--accent)]/30"
                    glareColor="rgba(99, 102, 241, 0.2)"
                  >
                    <div className="text-6xl mb-6 transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                      {project.image}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-shimmer transition-all duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 mb-6 flex-grow transition-colors">
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
                             setSelectedProject(originalIndex);
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
              );
            })}
            </motion.div>
          )}
        </AnimatePresence>

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

