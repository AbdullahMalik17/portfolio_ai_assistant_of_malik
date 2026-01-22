/**
 * One-Time OpenAI Setup Script
 * Creates Assistant and Vector Store for portfolio RAG system
 *
 * Run with: npx tsx scripts/setup-openai.ts
 */

import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// Portfolio data for file generation
const PERSONAL_INFO = {
  name: "Abdullah Malik",
  email: "muhammadabdullah51700@gmail.com",
  linkedin: "https://www.linkedin.com/in/muhammad-abdullah-athar",
  github: "https://github.com/AbdullahMalik17",
  instagram: "https://www.instagram.com/muhammadabdullah17337/",
  profession: "Software Engineer and AI Enthusiast",
  tagline: "Building the Future of AI One Line at a Time",
  specialty: "Artificial Intelligence and Full-Stack Development"
};

const PROJECTS = [
  {
    title: "AI Assistant Dashboard",
    description: "Intelligent dashboard with OpenAI integration for natural language processing and task automation.",
    tech: ["Next.js", "OpenAI SDK", "Python"],
    link: "https://portfolio-ai-assistant-of-malik-five.vercel.app/",
    category: "AI/Web"
  },
  {
    title: "AI Code Assistant",
    description: "Multi AI Model code assistant that helps developers write, debug, and optimize code snippets.",
    tech: ["OpenAI Agent SDK", "MEM0", "Python", "Chainlit", "Langfuse"],
    link: "https://github.com/AbdullahMalik17/Agentic_AI/tree/main/_Projects/Code_Assistant_agent",
    category: "Agentic AI"
  },
  {
    title: "Portfolio Website",
    description: "Modern, responsive portfolio website with smooth animations and dark mode support.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    link: "https://github.com/AbdullahMalik17/Portfolio-AI-Assistant",
    category: "Web Development"
  }
];

const SKILLS = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5/CSS3"]
  },
  {
    title: "Backend",
    skills: ["Python", "Node.js", "FastAPI", "JavaScript", "Supabase"]
  },
  {
    title: "AI & ML",
    skills: ["OpenAI Agent Sdk", "Langfuse", "N8N", "Google Framework", "OpenAI Agent Kit"]
  },
  {
    title: "Tools",
    skills: ["Git", "Docker", "VS Code", "Figma", "AntiGravity", "Gemini CLI with Advanced MCP integration"]
  }
];

const ABOUT = {
  experience: "2+ years",
  journey: "Started learning at 14 years old (10th class) with HTML, CSS, and JavaScript. Practiced for three months and created web development projects. Then learned TypeScript and moved on to Agentic AI Development from Panaversity. Learned how to make AI Agents using OpenAI Agent SDK, Python, and N8n. Currently learning OpenAI Agent Kit and Cloud technologies like Kubernetes and Docker.",
  education: ["Panaversity", "PIAIC"],
  philosophy: "Creating seamless, intelligent experiences that make technology accessible and beneficial for everyone."
};

const GITHUB_REPOS = {
  main: "https://github.com/AbdullahMalik17/AbdullahMalik17",
  webProjects: "https://github.com/AbdullahMalik17/Projects-of-html",
  agenticAI: "https://github.com/AbdullahMalik17/Agentic_AI/tree/main/_Projects"
};

/**
 * Prepare portfolio content as files
 */
function preparePortfolioFiles(): Array<{filename: string, content: string}> {
  const files = [];

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
    content: `About Abdullah Malik

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

Abdullah Malik has built ${PROJECTS.length} major projects across AI, Web Development, and Agentic AI domains.

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

This project demonstrates Abdullah's expertise in ${project.tech.slice(0, 2).join(' and ')}.`
    });
  });

  // 5. Skills by Category
  SKILLS.forEach(category => {
    const filename = `skills_${category.title.toLowerCase()}.txt`;
    files.push({
      filename,
      content: `${category.title} Skills

Abdullah Malik is proficient in the following ${category.title.toLowerCase()} technologies:

${category.skills.map(skill => `- ${skill}`).join('\n')}

These skills have been developed through ${ABOUT.experience} of hands-on experience and continuous learning.`
    });
  });

  // 6. Overall Skills Summary
  files.push({
    filename: 'skills_summary.txt',
    content: `Technical Skills Summary

Abdullah Malik possesses a comprehensive skill set across multiple domains:

${SKILLS.map(category =>
  `${category.title}:
${category.skills.map(s => `  - ${s}`).join('\n')}`
).join('\n\n')}

With ${ABOUT.experience} of experience, Abdullah continues to expand his expertise in AI, full-stack development, and cloud technologies.`
  });

  // 7. Comprehensive Overview
  files.push({
    filename: 'portfolio_overview.txt',
    content: `Abdullah Malik - Portfolio Overview

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

async function main() {
  console.log('\n🚀 OpenAI Assistant & Vector Store Setup\n');
  console.log('='.repeat(50));

  // Check for API key
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('❌ Error: OPENAI_API_KEY not found in environment variables');
    console.log('\nPlease add your OpenAI API key to .env.local:');
    console.log('OPENAI_API_KEY=sk-proj-...\n');
    process.exit(1);
  }

  const openai = new OpenAI({ apiKey });

  try {
    // Step 1: Create Vector Store
    console.log('\n📦 Step 1: Creating Vector Store...');
    // @ts-expect-error - TypeScript types for vectorStores are not up to date with the API
    const vectorStore = await openai.beta.vectorStores.create({
      name: "Abdullah's Portfolio Knowledge Base"
    });
    console.log(`✅ Vector Store created: ${vectorStore.id}`);

    // Step 2: Prepare Portfolio Files
    console.log('\n📝 Step 2: Preparing portfolio content...');
    const portfolioFiles = preparePortfolioFiles();
    console.log(`✅ Prepared ${portfolioFiles.length} content files`);

    // Step 3: Upload Files to OpenAI
    console.log('\n⬆️  Step 3: Uploading files to OpenAI...');
    const fileIds: string[] = [];

    for (const file of portfolioFiles) {
      console.log(`  Uploading: ${file.filename}...`);
      const uploadedFile = await openai.files.create({
        file: new File([file.content], file.filename, { type: 'text/plain' }),
        purpose: 'assistants'
      });
      fileIds.push(uploadedFile.id);
      console.log(`  ✓ ${file.filename} → ${uploadedFile.id}`);
    }
    console.log(`✅ Uploaded ${fileIds.length} files`);

    // Step 4: Add Files to Vector Store
    console.log('\n🔗 Step 4: Adding files to Vector Store...');
    // @ts-expect-error - TypeScript types for vectorStores.fileBatches are not up to date with the API
    await openai.beta.vectorStores.fileBatches.createAndPoll(vectorStore.id, {
      file_ids: fileIds
    });
    console.log('✅ Files added to Vector Store');

    // Step 5: Create Assistant
    console.log('\n🤖 Step 5: Creating Assistant...');
    const assistant = await openai.beta.assistants.create({
      name: "Abdullah's Portfolio Assistant",
      instructions: `You are a helpful assistant that answers questions about Abdullah Malik's portfolio, projects, skills, and experience.

IMPORTANT GUIDELINES:
- Answer concisely and professionally using ONLY the information from the knowledge base
- If asked about contact, provide his LinkedIn (https://www.linkedin.com/in/muhammad-abdullah-athar) or email
- Keep responses friendly and to the point (2-4 sentences)
- If information is not in the knowledge base, politely say you don't have that specific detail
- For project details, mention technologies and descriptions from the portfolio
- Highlight his expertise in AI, Full-Stack Development, and Agentic AI when relevant

Remember: You represent Abdullah's professional portfolio, so maintain a professional yet approachable tone.`,
      model: 'gpt-4o-mini',
      tools: [{ type: 'file_search' }],
      tool_resources: {
        file_search: {
          vector_store_ids: [vectorStore.id]
        }
      }
    });
    console.log(`✅ Assistant created: ${assistant.id}`);

    // Step 6: Output Results
    console.log('\n' + '='.repeat(50));
    console.log('✅ Setup Complete!\n');
    console.log('📋 Add these to your .env.local file:\n');
    console.log(`OPENAI_ASSISTANT_ID=${assistant.id}`);
    console.log(`OPENAI_VECTOR_STORE_ID=${vectorStore.id}`);
    console.log('\n' + '='.repeat(50));
    console.log('\n✨ Your RAG system is ready to use!\n');
    console.log('Next steps:');
    console.log('1. Add the IDs above to your .env.local file');
    console.log('2. Deploy your application');
    console.log('3. Test the chat endpoint at /api/chat\n');

  } catch (error) {
    console.error('\n❌ Setup failed:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    process.exit(1);
  }
}

main();
