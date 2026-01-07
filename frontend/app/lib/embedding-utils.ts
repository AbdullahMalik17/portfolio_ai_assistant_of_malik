/**
 * Portfolio Content Utilities
 * Prepares portfolio content as files for OpenAI Vector Store
 */

import { PERSONAL_INFO, PROJECTS, SKILLS, ABOUT, GITHUB_REPOS } from './portfolio-data';

export interface PortfolioFile {
  filename: string;
  content: string;
}

export interface ContentChunk {
  content: string;
  contentType: 'project' | 'skill' | 'about' | 'contact' | 'hero';
  category?: string;
  metadata: Record<string, unknown>;
}

/**
 * Prepare portfolio content into semantic chunks for embedding
 */
export function preparePortfolioChunks(): ContentChunk[] {
  const chunks: ContentChunk[] = [];

  // 1. Personal Information & Hero Chunk
  chunks.push({
    content: `${PERSONAL_INFO.name} is a ${PERSONAL_INFO.profession}. ${PERSONAL_INFO.tagline}. Specializes in ${PERSONAL_INFO.specialty}.`,
    contentType: 'hero',
    category: 'introduction',
    metadata: {
      name: PERSONAL_INFO.name,
      profession: PERSONAL_INFO.profession,
      tagline: PERSONAL_INFO.tagline,
      specialty: PERSONAL_INFO.specialty
    }
  });

  // 2. Contact Information Chunk
  chunks.push({
    content: `Contact information for ${PERSONAL_INFO.name}: Email: ${PERSONAL_INFO.email}, LinkedIn: ${PERSONAL_INFO.linkedin}, GitHub: ${PERSONAL_INFO.github}, Instagram: ${PERSONAL_INFO.instagram}`,
    contentType: 'contact',
    category: 'contact',
    metadata: {
      email: PERSONAL_INFO.email,
      linkedin: PERSONAL_INFO.linkedin,
      github: PERSONAL_INFO.github,
      instagram: PERSONAL_INFO.instagram
    }
  });

  // 3. About Section - Learning Journey
  chunks.push({
    content: `${PERSONAL_INFO.name}'s Learning Journey: ${ABOUT.journey}`,
    contentType: 'about',
    category: 'journey',
    metadata: {
      journey: ABOUT.journey,
      education: ABOUT.education
    }
  });

  // 4. About Section - Experience & Philosophy
  chunks.push({
    content: `${PERSONAL_INFO.name} has ${ABOUT.experience} of experience. Philosophy: ${ABOUT.philosophy}`,
    contentType: 'about',
    category: 'experience',
    metadata: {
      experience: ABOUT.experience,
      philosophy: ABOUT.philosophy
    }
  });

  // 5. Education Chunk
  chunks.push({
    content: `Education: ${PERSONAL_INFO.name} is currently studying at ${ABOUT.education.join(' and ')}`,
    contentType: 'about',
    category: 'education',
    metadata: {
      institutions: ABOUT.education
    }
  });

  // 6. GitHub Repositories Chunk
  chunks.push({
    content: `GitHub repositories: Main portfolio: ${GITHUB_REPOS.main}, Web development projects: ${GITHUB_REPOS.webProjects}, Agentic AI projects: ${GITHUB_REPOS.agenticAI}`,
    contentType: 'contact',
    category: 'github',
    metadata: GITHUB_REPOS
  });

  // 7. Each Project as a Chunk
  PROJECTS.forEach(project => {
    const linkText = project.link ? `Link: ${project.link}` : 'Coming soon';
    chunks.push({
      content: `Project: ${project.title}. ${project.description} Technologies used: ${project.tech.join(', ')}. ${linkText}`,
      contentType: 'project',
      category: project.category,
      metadata: {
        title: project.title,
        description: project.description,
        tech: project.tech,
        link: project.link,
        category: project.category
      }
    });
  });

  // 8. Skills by Category
  SKILLS.forEach(category => {
    chunks.push({
      content: `${category.title} skills of ${PERSONAL_INFO.name}: ${category.skills.join(', ')}`,
      contentType: 'skill',
      category: category.title,
      metadata: {
        category: category.title,
        skills: category.skills
      }
    });
  });

  // 9. All Skills Summary Chunk
  const allSkills = SKILLS.flatMap(cat => cat.skills);
  chunks.push({
    content: `${PERSONAL_INFO.name}'s technical expertise includes: ${allSkills.join(', ')}`,
    contentType: 'skill',
    category: 'summary',
    metadata: {
      allSkills,
      skillCount: allSkills.length
    }
  });

  // 10. Comprehensive Overview Chunk
  chunks.push({
    content: `${PERSONAL_INFO.name} is a ${PERSONAL_INFO.profession} with ${ABOUT.experience} of experience. Specializes in ${PERSONAL_INFO.specialty}. Currently studying at ${ABOUT.education.join(' and ')}. Has built projects including AI Assistant Dashboard, AI Code Assistant, and Portfolio Website using technologies like Next.js, Python, OpenAI Agent SDK, and more.`,
    contentType: 'about',
    category: 'overview',
    metadata: {
      complete: true
    }
  });

  return chunks;
}

/**
 * Prepare portfolio content as files for OpenAI Vector Store
 * This is the new approach that replaces embedding generation
 */
export function preparePortfolioFiles(): PortfolioFile[] {
  const files: PortfolioFile[] = [];

  // 1. Personal Information
  files.push({
    filename: 'personal_info.txt',
    content: `Name: ${PERSONAL_INFO.name}
Profession: ${PERSONAL_INFO.profession}
Tagline: ${PERSONAL_INFO.tagline}
Specialty: ${PERSONAL_INFO.specialty}

Contact Information:
- Email: ${PERSONAL_INFO.email}
- LinkedIn: ${PERSONAL_INFO.linkedin}
- GitHub: ${PERSONAL_INFO.github}
- Instagram: ${PERSONAL_INFO.instagram}

For any inquiries or collaboration opportunities, please reach out via LinkedIn or email.`
  });

  // 2. About & Journey
  files.push({
    filename: 'about_journey.txt',
    content: `About ${PERSONAL_INFO.name}

Experience: ${ABOUT.experience}

Professional Journey:
${ABOUT.journey}

Education:
${ABOUT.education.map(edu => `- ${edu}`).join('\n')}

Philosophy:
${ABOUT.philosophy}

GitHub Repositories:
- Main Profile: ${GITHUB_REPOS.main}
- Web Development Projects: ${GITHUB_REPOS.webProjects}
- Agentic AI Projects: ${GITHUB_REPOS.agenticAI}`
  });

  // 3. Projects Overview
  files.push({
    filename: 'projects_overview.txt',
    content: `Portfolio Projects

${PERSONAL_INFO.name} has built ${PROJECTS.length} major projects across AI, Web Development, and Agentic AI domains.

${PROJECTS.map((project, idx) =>
  `${idx + 1}. ${project.title}
   Category: ${project.category}
   Description: ${project.description}
   Technologies: ${project.tech.join(', ')}
   ${project.link ? `Link: ${project.link}` : ''}`
).join('\n\n')}`
  });

  // 4. Individual Project Files
  PROJECTS.forEach(project => {
    const filename = `project_${project.title.toLowerCase().replace(/\s+/g, '_')}.txt`;
    files.push({
      filename,
      content: `Project: ${project.title}

Category: ${project.category}

Description:
${project.description}

Technologies Used:
${project.tech.map(t => `- ${t}`).join('\n')}

${project.link ? `Project Link: ${project.link}` : ''}

This project demonstrates ${PERSONAL_INFO.name}'s expertise in ${project.tech.slice(0, 2).join(' and ')}.`
    });
  });

  // 5. Skills by Category
  SKILLS.forEach(category => {
    const filename = `skills_${category.title.toLowerCase()}.txt`;
    files.push({
      filename,
      content: `${category.title} Skills

${PERSONAL_INFO.name} is proficient in the following ${category.title.toLowerCase()} technologies:

${category.skills.map(skill => `- ${skill}`).join('\n')}

These skills have been developed through ${ABOUT.experience} of hands-on experience and continuous learning.`
    });
  });

  // 6. Overall Skills Summary
  files.push({
    filename: 'skills_summary.txt',
    content: `Technical Skills Summary

${PERSONAL_INFO.name} possesses a comprehensive skill set across multiple domains:

${SKILLS.map(category =>
  `${category.title}:
${category.skills.map(s => `  - ${s}`).join('\n')}`
).join('\n\n')}

With ${ABOUT.experience} of experience, ${PERSONAL_INFO.name} continues to expand expertise in AI, full-stack development, and cloud technologies.`
  });

  // 7. Comprehensive Overview
  files.push({
    filename: 'portfolio_overview.txt',
    content: `${PERSONAL_INFO.name} - Portfolio Overview

${PERSONAL_INFO.name} is a ${PERSONAL_INFO.profession} with ${ABOUT.experience} of experience.

${PERSONAL_INFO.tagline}

Specialty: ${PERSONAL_INFO.specialty}

Professional Background:
${ABOUT.journey}

Key Projects:
${PROJECTS.map(p => `- ${p.title}: ${p.description}`).join('\n')}

Technical Expertise:
${SKILLS.map(cat => `${cat.title}: ${cat.skills.join(', ')}`).join('\n')}

Contact:
- LinkedIn: ${PERSONAL_INFO.linkedin}
- GitHub: ${PERSONAL_INFO.github}
- Email: ${PERSONAL_INFO.email}

Philosophy:
${ABOUT.philosophy}`
  });

  return files;
}
