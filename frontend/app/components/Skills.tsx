'use client';

import { motion } from 'framer-motion';
import FadeInWhenVisible from './FadeInWhenVisible';
import SkillsCloud from './SkillsCloud';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5/CSS3'],
    },
    {
      title: 'Backend',
      skills: ['Python', 'Node.js', 'FastAPI', 'JavaScript', 'Supabase'],
    },
    {
      title: 'AI & ML',
      skills: ['OpenAI Agent Sdk', 'Langfuse', 'N8N', 'Google Framework', 'OpenAI Agent Kit', 'AI Driven Development'],
    },
    {
      title: 'Tools',
      skills: ['Git', 'Docker', 'VS Code', 'Cursor', 'Claude Code', 'Gemini CLI', 'Qwen', 'Figma', 'AntiGravity', 'Spec'],
    },
  ];

  // Flatten skills for the cloud
  const allSkills = skillCategories.flatMap(cat => cat.skills);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section 
      id="skills" 
      className="py-20 relative overflow-hidden bg-[color:var(--background-secondary)]/30"
      data-component="Skills Section"
      data-type="Client Component"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeInWhenVisible>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[color:var(--foreground)] mb-4">
              Technical Skills
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            <p className="mt-6 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A comprehensive toolkit for building modern, intelligent applications
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left Column: 3D Cloud */}
            <div className="w-full lg:w-1/2" data-component="3D Tag Cloud" data-type="Canvas/JS Animation">
                <FadeInWhenVisible direction="right">
                    <div className="glass rounded-3xl p-4 flex items-center justify-center bg-white/5 dark:bg-black/20">
                        <SkillsCloud skills={allSkills} />
                    </div>
                </FadeInWhenVisible>
            </div>

            {/* Right Column: Categories Grid */}
            <motion.div
            className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            data-component="Skill Categories"
            data-type="Layout"
            >
            {skillCategories.map((category, index) => (
                <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="glass rounded-2xl p-6 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] transition-shadow duration-300 border border-white/10"
                data-component="Skill Category Card"
                data-tech="Framer Motion"
                >
                <h3 className="text-xl font-bold text-[color:var(--accent)] mb-4 text-center">
                    {category.title}
                </h3>
                <div className="flex flex-wrap gap-2 justify-center" data-tech="Skill Tags">
                    {category.skills.map((skill, skillIndex) => (
                    <motion.span
                        key={skillIndex}
                        whileHover={{ scale: 1.05 }}
                        className="px-2.5 py-1 bg-[color:var(--background)] text-[color:var(--foreground)] rounded-md text-xs font-medium border border-[color:var(--foreground)]/10 hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] transition-colors cursor-default"
                    >
                        {skill}
                    </motion.span>
                    ))}
                </div>
                </motion.div>
            ))}
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
