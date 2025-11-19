const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5/CSS3'],
    },
    {
      title: 'Backend',
      skills: ['Python', 'Node.js', 'FastAPI', 'PostgreSQL', 'MongoDB'],
    },
    {
      title: 'AI & ML',
      skills: ['OpenAI API', 'LangChain', 'TensorFlow', 'PyTorch', 'NLP'],
    },
    {
      title: 'Tools',
      skills: ['Git', 'Docker', 'AWS', 'VS Code', 'Figma'],
    },
  ];

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[color:var(--foreground)] mb-4">
            Technical Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, intelligent applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-6 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="text-xl font-bold text-[color:var(--accent)] mb-6 text-center">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1.5 bg-[color:var(--background)] text-[color:var(--foreground)] rounded-lg text-sm font-medium border border-[color:var(--foreground)]/10 hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
