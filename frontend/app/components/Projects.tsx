const Projects = () => {
  const projects = [
    {
      title: 'AI Assistant Dashboard',
      description: 'Intelligent dashboard with OpenAI integration for natural language processing and task automation.',
      tech: ['Next.js', 'OpenAI SDK', 'Python'],
      image: '🤖',
      link: '#',
    },
    {
      title: 'AI Code Assistant',
      description: 'Multi AI Model code assistant that helps developers write, debug, and optimize code snippets.',
      tech: ['OpenAI Agent SDk', 'MEM0', 'Python', 'Chainlit' , 'Langfuse'],
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
    <section id="projects" className="py-20 bg-[color:var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto"></div>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A selection of projects showcasing my work in AI and web development
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-[color:var(--background)] rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-[color:var(--foreground)] hover:border-[color:var(--accent)]"
            >
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {project.image}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-[color:var(--accent)]/[0.1] text-[color:var(--accent)] rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                className="inline-flex items-center text-[color:var(--accent)] font-semibold hover:gap-3 transition-all duration-300"
              >
                View Project
                <svg
                  className="w-5 h-5 ml-2"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

