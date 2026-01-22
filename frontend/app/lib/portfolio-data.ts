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
  whatsapp: string;
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
  whatsapp: "+923040705172",
  linkedin: "https://www.linkedin.com/in/muhammad-abdullah-athar",
  github: "https://github.com/AbdullahMalik17",
  instagram: "https://www.instagram.com/muhammadabdullah17337/",
  profession: "Full-Stack Developer & AI Specialist",
  tagline: "Building the Future of AI One Line at a Time",
  specialty: "Agentic AI Systems, Full-Stack Development, and Cloud Technologies"
};

// Projects
export const PROJECTS: PortfolioProject[] = [
  {
    title: "AI Assistant Dashboard",
    description: "Intelligent portfolio dashboard with OpenAI integration featuring natural language processing, RAG-based knowledge retrieval, and automated task management. Handles 24/7 visitor inquiries with context-aware responses.",
    tech: ["Next.js", "OpenAI SDK", "Python", "Vercel Postgres", "Vector Store"],
    link: "https://portfolio-ai-assistant-of-malik-five.vercel.app/",
    category: "AI/Web"
  },
  {
    title: "AI Code Assistant",
    description: "Multi-model agentic code assistant that helps developers write, debug, and optimize code. Features memory persistence, multi-turn conversations, and integration with industry-leading LLMs for superior code generation.",
    tech: ["OpenAI Agent SDK", "MEM0", "Python", "Chainlit", "Langfuse"],
    link: "https://github.com/AbdullahMalik17/Agentic_AI/tree/main/_Projects/Code_Assistant_agent",
    category: "Agentic AI"
  },
  {
    title: "Portfolio Website",
    description: "Modern, responsive portfolio website featuring smooth scroll animations, framer-motion interactions, dark mode support, and an integrated AI chatbot. Built with performance and accessibility in mind.",
    tech: ["Next.js 15", "TypeScript", "Tailwind CSS 4", "Framer Motion", "OpenAI"],
    link: "https://github.com/AbdullahMalik17/Portfolio-AI-Assistant",
    category: "Web Development"
  }
];

// Skills
export const SKILLS: SkillCategory[] = [
  {
    title: "Frontend",
    skills: ["React", "Next.js 15", "TypeScript", "Tailwind CSS 4", "Framer Motion", "HTML5/CSS3"]
  },
  {
    title: "Backend",
    skills: ["Python", "Node.js", "FastAPI", "JavaScript", "Vercel Postgres", "Supabase", "REST APIs"]
  },
  {
    title: "AI & ML",
    skills: ["OpenAI Agent SDK", "OpenAI Agent Kit", "Langfuse", "N8N", "MEM0", "Vector Databases", "RAG Systems"]
  },
  {
    title: "Tools & DevOps",
    skills: ["Git", "Docker", "Kubernetes", "VS Code", "Figma", "Gemini CLI", "MCP Integration", "Vercel"]
  }
];

// About Information
export const ABOUT: AboutInfo = {
  experience: "2+ years",
  journey: "My journey in technology began at age 14 during 10th grade, when I discovered my passion for web development through HTML, CSS, and JavaScript. After three months of dedicated practice, I built my first collection of web projects, which sparked my deeper interest in software development. I then mastered TypeScript and transitioned into Agentic AI Development at Panaversity, where I learned to build sophisticated AI agents using the OpenAI Agent SDK, Python, and N8n. Currently, I'm expanding my expertise in the OpenAI Agent Kit and cloud technologies including Kubernetes and Docker, preparing for enterprise-scale deployments.",
  education: ["Panaversity - Agentic AI Development", "PIAIC - Artificial Intelligence"],
  philosophy: "I believe in creating seamless, intelligent experiences that make technology accessible and beneficial for everyone. My mission is to bridge the gap between cutting-edge AI capabilities and practical, user-friendly applications that solve real-world problems."
};

// GitHub Repositories
export const GITHUB_REPOS = {
  main: "https://github.com/AbdullahMalik17/AbdullahMalik17",
  webProjects: "https://github.com/AbdullahMalik17/Projects-of-html",
  agenticAI: "https://github.com/AbdullahMalik17/Agentic_AI/tree/main/_Projects"
};
