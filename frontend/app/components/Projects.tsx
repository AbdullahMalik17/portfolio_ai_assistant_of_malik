'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Search, Code, ArrowUpRight
} from 'lucide-react';
import FadeInWhenVisible from './FadeInWhenVisible';
import FlagshipBento from './FlagshipBento';
import ProjectModal from './ProjectModal';
import { PROJECTS, PortfolioProject } from '../lib/portfolio-data';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const otherProjects = useMemo(() => {
    return PROJECTS.filter((p) => !p.featured);
  }, []);

  const categories = useMemo(() => {
    const cats = ['All'];
    otherProjects.forEach((p) => {
      if (!cats.includes(p.category)) {
        cats.push(p.category);
      }
    });
    return cats;
  }, [otherProjects]);

  const filteredOtherProjects = useMemo(() => {
    return otherProjects.filter((p) => {
      const matchesCat = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch = 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [otherProjects, activeCategory, searchQuery]);

  return (
    <section id="projects" className="py-16 relative overflow-hidden bg-canvas/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <FadeInWhenVisible>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-sm shadow-accent/10">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              Flagship Autonomous Systems & Repositories
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-ink tracking-tight">
              Engineered <span className="text-shimmer">AI Systems</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-ink-muted max-w-2xl mx-auto leading-relaxed">
              Production autonomous agents, edge runtimes, Model Context Protocol servers, and enterprise automation pipelines.
            </p>
          </div>
        </FadeInWhenVisible>

        {/* 1. Flagship Bento Grid 2.0 */}
        <div className="mb-14">
          <FlagshipBento onSelectProject={(p) => setSelectedProject(p)} />
        </div>

        {/* 2. Other Engineering Projects Header & Filter Matrix */}
        <FadeInWhenVisible>
          <div className="pt-12 border-t border-line mb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-ink tracking-tight flex items-center gap-2">
                  <Code className="w-6 h-6 text-accent" />
                  <span>Other Specialized Systems & Tools</span>
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted mt-1">
                  Full-stack applications, developer tooling, and educational AI platforms.
                </p>
              </div>

              {/* Search & Category Filter Bar */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="relative">
                  <Search className="w-4 h-4 text-ink-subtle absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by technology, name..."
                    className="pl-9 pr-4 py-2 rounded-xl bg-surface/80 border border-line text-xs text-ink placeholder:text-ink-subtle focus:outline-none focus:border-accent/50 transition-colors w-48 sm:w-64 font-sans"
                  />
                </div>

                <div className="flex items-center gap-1 glass p-1 rounded-xl border border-line">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                        activeCategory === cat
                          ? 'bg-accent/20 text-accent border border-accent/30'
                          : 'text-ink-muted hover:text-ink'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeInWhenVisible>

        {/* Other Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOtherProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedProject(project)}
              className="group glass rounded-2xl p-6 border border-line hover:border-accent/40 bg-surface/40 hover:bg-surface/80 transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-white/5 border border-line text-ink uppercase tracking-wider">
                    {project.category}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-ink-subtle group-hover:text-accent transition-colors" />
                </div>

                <h4 className="text-lg font-bold text-ink mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h4>

                <p className="text-xs text-ink-muted line-clamp-3 leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-line">
                  {project.tech.slice(0, 4).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-mono text-ink border border-line"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono text-ink-subtle">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Deep-Dive Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
