import { NextResponse } from 'next/server';

export async function GET() {
  const content = `# Abdullah Malik — Agentic AI Engineer & Data Scientist
> Personal Portfolio and Agentic AI Architecture Showcase

## Profile
- Name: Abdullah Malik (Muhammad Abdullah Athar)
- Role: Agentic AI Engineer & Data Science Student
- University: Islamia University of Bahawalpur (IUB) — BS Data Science
- Certifications: Panaversity (Agentic AI Specialist), PIAIC (Artificial Intelligence)
- Official GitHub Profile: https://github.com/AbdullahMalik17
- Portfolio URL: https://portfolio-ai-assistant-of-malik.vercel.app/

## Honors & Recognitions
- GitHub Starstruck (Bronze Tier): Awarded for MalikClaw earning 16+ GitHub stars (https://github.com/users/AbdullahMalik17/achievements/starstruck)
- GitHub Pull Shark: Merged pull requests during Hackathon 2
- GitHub Pair Extraordinaire: Pair programming & co-authored commits with Claude
- A2AS Behavior Certificate: Audited agent security & governance (https://a2as.org/certified/agents/abdullahmalik17/deep-research-age)
- Skills Directory Certified Author: 12 published Claude agent skills, Security Grade A (https://skillsdirectory.com/authors/abdullahmalik17)
- MCP Market Listed: MalikClaw officially listed on MCP Market (https://mcpmarket.com/server/malikclaw)
- Online Badges & Certification Registry: 37 total badges across Skills Directory, Go pkg.go.dev, Go Report Card, Snyk, and GitHub

## Key Projects
- MalikClaw: Edge-native Go agent runtime (<10MB RAM footprint, Urdu-First, Android ADB automation)
- Digital FTE (Abdullah Junior): Autonomous 24/7 digital employee with dual-agent isolation (Cloud Sentry + Local Executive)
- Customer Success FTE: Kafka-driven async support agent with pgvector semantic retrieval

## Documentation & Pages
- Portfolio: https://portfolio-ai-assistant-of-malik.vercel.app/
- Web Resume: https://portfolio-ai-assistant-of-malik.vercel.app/resume
- Full LLM Context: https://portfolio-ai-assistant-of-malik.vercel.app/llm-context.txt
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
