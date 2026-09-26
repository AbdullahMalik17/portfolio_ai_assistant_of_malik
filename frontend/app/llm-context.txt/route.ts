import { NextResponse } from 'next/server';

export async function GET() {
  const markdownContent = `# Abdullah Malik (Muhammad Abdullah Athar) — Agentic AI Engineer & Data Scientist

> Portfolio & AI Gateway: https://portfolio-ai-assistant-of-malik.vercel.app/
> GitHub: https://github.com/AbdullahMalik17
> LinkedIn: https://www.linkedin.com/in/muhammad-abdullah-athar
> Email: muhammadabdullah51700@gmail.com

## Academic & Formal Education
- **Degree**: BS Data Science
- **Institution**: Islamia University of Bahawalpur (IUB), Pakistan
- **Specialized Programs**: 
  - Panaversity — Advanced Agentic AI Development
  - PIAIC — Artificial Intelligence & Cloud Native Computing

## Official Honors, Certifications & Registry Badges
- **Skills Directory Certified Author**: 12 published Claude agent skills with Security Grade A (https://skillsdirectory.com/authors/abdullahmalik17).
- **A2AS Behavior Certificate**: AI Agent Security & Governance (https://a2as.org/certified/agents/abdullahmalik17/deep-research-age).
- **Starstruck (Bronze Tier)**: Awarded for MalikClaw reaching 16+ GitHub stars from the open source AI community (https://github.com/users/AbdullahMalik17/achievements/starstruck).
- **Pull Shark**: High-velocity merged pull requests in Hackathon 2 open source initiatives.
- **Pair Extraordinaire**: Recognized for autonomous AI pair programming and co-authored commits with Claude.
- **Online Badges & Certification Registry**: 37 total badges across Skills Directory, Go pkg.go.dev, Go Report Card, Snyk, and GitHub.

## Flagship Open-Source Projects
1. **MalikClaw** (Go, React, TypeScript, ADB, MCP)
   - Edge-native agent runtime & gateway operating under <10MB RAM on Raspberry Pi & Android.
   - Listed on MCP Market (https://mcpmarket.com/ko/server/malikclaw).
   - Holds A2AS Behavior Certificate for AI Agent Security & Governance.
2. **Digital FTE — Abdullah Junior** (Python, FastAPI, Gemini, Claude, MCP)
   - Dual-Agent Architecture: Cloud Sentry + Local Executive with credential isolation.
3. **Customer Success Digital FTE** (FastAPI, pgvector, Apache Kafka)
   - Enterprise support agent with vector similarity search and async message queue resilience.

## Technical Skills
- **Languages:** Go (Golang), Python (AsyncIO), TypeScript, JavaScript, SQL, R
- **AI & Data Science:** Model Context Protocol (MCP), OpenAI Agents SDK, LangChain, pgvector, ChromaDB, Pinecone, Pandas, NumPy, Scikit-learn
- **Backend & Infra:** FastAPI, Next.js 15, PostgreSQL, Apache Kafka, Docker, Kubernetes, Vercel, Fly.io
`;

  return new NextResponse(markdownContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
