/**
 * Embedding Utilities
 * Handles embedding generation and content chunking for RAG
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { PERSONAL_INFO, PROJECTS, SKILLS, ABOUT, GITHUB_REPOS } from './portfolio-data';

export interface ContentChunk {
  content: string;
  contentType: 'project' | 'skill' | 'about' | 'contact' | 'hero';
  category?: string;
  metadata: Record<string, any>;
}

/**
 * Generate embedding for a single text using Google Gemini
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'text-embedding-004' });

  try {
    const result = await model.embedContent(text);
    return result.embedding.values;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
}

/**
 * Generate embeddings for multiple texts in batches
 */
export async function generateBatchEmbeddings(
  texts: string[]
): Promise<number[][]> {
  // Process in batches of 100 (Gemini API limit)
  const batchSize = 100;
  const embeddings: number[][] = [];

  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    const batchEmbeddings = await Promise.all(
      batch.map(text => generateEmbedding(text))
    );
    embeddings.push(...batchEmbeddings);

    // Small delay between batches to avoid rate limiting
    if (i + batchSize < texts.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  return embeddings;
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
