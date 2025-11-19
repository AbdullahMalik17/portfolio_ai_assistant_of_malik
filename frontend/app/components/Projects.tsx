const Projects = () => {
  const projects = [
    {
      title: 'AI Assistant Dashboard',
      description: 'Intelligent dashboard with OpenAI integration for natural language processing and task automation.',
      tech: ['Next.js', 'OpenAI SDK', 'Python'],
      image: '🤖',
      link: null, // Placeholder as requested
    },
    {
      title: 'AI Code Assistant',
      description: 'Multi AI Model code assistant that helps developers write, debug, and optimize code snippets.',
      tech: ['OpenAI Agent SDK', 'MEM0', 'Python', 'Chainlit', 'Langfuse'],
      image: '💻',
      link: 'https://github.com/AbdullahMalik17/Agentic_AI/tree/main/_Projects/Code_Assistant_agent'
    },
    {
      title: 'Portfolio Website',
      description: 'Modern, responsive portfolio website with smooth animations and dark mode support.',
      tech: ['Next.js', 'TypeScript', 'Tailwind'],
      image: '💼',
      link: 'https://github.com/AbdullahMalik17/Portfolio-AI-Assistant',
    },
  ];

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[color:var(--foreground)] mb-4">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A selection of projects showcasing my work in AI and web development
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group glass rounded-2xl p-8 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-300 hover:-translate-y-2 flex flex-col h-full"
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

              <div className="space-y-6">
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

                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[color:var(--accent)] font-semibold hover:gap-3 transition-all duration-300 group/link"
                  >
                    View Project
                    <svg
                      className="w-5 h-5 ml-2 transform group-hover/link:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                ) : (
                  <span className="inline-flex items-center text-gray-400 font-semibold cursor-not-allowed" title="Coming Soon">
                    Coming Soon
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

