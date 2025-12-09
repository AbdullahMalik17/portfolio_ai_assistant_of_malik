/**
 * Centralized Portfolio Data
 * This file contains all portfolio information used for RAG indexing and components
 */

export interface PortfolioProject {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  category: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface PersonalInfo {
  name: string;
  email: string;
  linkedin: string;
  github: string;
  instagram: string;
  profession: string;
  tagline: string;
  specialty: string;
}

export interface AboutInfo {
  experience: string;
  journey: string;
  education: string[];
  philosophy: string;
}

// Personal Information
export const PERSONAL_INFO: PersonalInfo = {
  name: "Abdullah Malik",
  email: "muhammadabdullah51700@gmail.com",
  linkedin: "https://www.linkedin.com/in/muhammad-abdullah-athar",
  github: "https://github.com/AbdullahMalik17",
  instagram: "https://www.instagram.com/muhammadabdullah17337/",
  profession: "Software Engineer and AI Enthusiast",
  tagline: "Building the Future of AI One Line at a Time",
  specialty: "Artificial Intelligence and Full-Stack Development"
};

// Projects
export const PROJECTS: PortfolioProject[] = [
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

// Skills
export const SKILLS: SkillCategory[] = [
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

// About Information
export const ABOUT: AboutInfo = {
  experience: "2+ years",
  journey: "Started learning at 14 years old (10th class) with HTML, CSS, and JavaScript. Practiced for three months and created web development projects. Then learned TypeScript and moved on to Agentic AI Development from Panaversity. Learned how to make AI Agents using OpenAI Agent SDK, Python, and N8n. Currently learning OpenAI Agent Kit and Cloud technologies like Kubernetes and Docker.",
  education: ["Panaversity", "PIAIC"],
  philosophy: "Creating seamless, intelligent experiences that make technology accessible and beneficial for everyone."
};

// GitHub Repositories
export const GITHUB_REPOS = {
  main: "https://github.com/AbdullahMalik17/AbdullahMalik17",
  webProjects: "https://github.com/AbdullahMalik17/Projects-of-html",
  agenticAI: "https://github.com/AbdullahMalik17/Agentic_AI/tree/main/_Projects"
};
