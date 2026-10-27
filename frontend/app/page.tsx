import dynamic from 'next/dynamic';
import Link from 'next/link';
import { 
  ShieldCheck, Globe2, 
  Github, Linkedin, Mail, FileText, ArrowUpRight 
} from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProofBar from './components/ProofBar';

// Dynamic imports with SSR for structured narrative flow
const Projects = dynamic(() => import('./components/Projects'), { ssr: true });
const CaseStudies = dynamic(() => import('./components/CaseStudies'), { ssr: true });
const SystemArchitecture = dynamic(() => import('./components/SystemArchitecture'), { ssr: true });
const EngineeringCredibility = dynamic(() => import('./components/EngineeringCredibility'), { ssr: true });
const Skills = dynamic(() => import('./components/Skills'), { ssr: true });
const Certifications = dynamic(() => import('./components/Certifications'), { ssr: true });
const About = dynamic(() => import('./components/About'), { ssr: true });
const Contact = dynamic(() => import('./components/Contact'), { ssr: true });

// Dynamic imports for below-fold content
const GitHubStats = dynamic(() => import('./components/GitHubStats'), {
  loading: () => (
    <section className="py-20 bg-canvas/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl p-8 md:p-12 animate-pulse">
          <div className="h-6 bg-accent/10 rounded w-32 mx-auto mb-8"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center space-y-2">
                <div className="h-8 bg-accent/10 rounded-full w-12 mx-auto"></div>
                <div className="h-3 bg-accent/5 rounded w-16 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  ),
});

export default function Home() {
  return (
    <main className="min-h-screen bg-canvas text-ink selection:bg-accent/25 selection:text-ink">
      <Navbar />
      <Hero />
      <ProofBar />
      <Projects />
      <CaseStudies />
      <SystemArchitecture />
      <EngineeringCredibility />
      <Skills />
      <Certifications />
      <About />
      <GitHubStats />
      <Contact />

      {/* Prestige AI-Lab Minimalist Footer */}
      <footer className="bg-canvas border-t border-line text-ink py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Identity & Status */}
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center font-mono font-bold text-accent-ink text-xs shadow-md">
                  AM
                </div>
                <span className="text-base font-bold text-ink tracking-tight">
                  Abdullah Malik
                </span>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed font-sans">
                Agentic AI Engineer and BS Data Science undergraduate. Builds autonomous agent systems, Go edge runtimes, and Model Context Protocol integrations.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-accent/30 bg-accent/10 text-accent text-[11px] font-mono">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span>Available in PKT / UTC+5</span>
              </div>
            </div>

            {/* Navigation Deep Links */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-ink mb-4">
                Architecture & Systems
              </h4>
              <div className="space-y-2.5 text-xs font-medium">
                <a href="#projects" className="block text-ink-muted hover:text-accent transition-colors">
                  Flagship Systems (Bento Grid)
                </a>
                <a href="#case-studies" className="block text-ink-muted hover:text-accent transition-colors">
                  Engineering Case Studies
                </a>
                <a href="#architecture" className="block text-ink-muted hover:text-accent transition-colors">
                  Agentic System Blueprint
                </a>
                <a href="#skills" className="block text-ink-muted hover:text-accent transition-colors">
                  Capabilities Matrix
                </a>
              </div>
            </div>

            {/* Verified Registries */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-ink mb-4">
                Verified Registries
              </h4>
              <div className="space-y-2.5 text-xs font-medium">
                <a
                  href="https://skillsdirectory.com/authors/abdullahmalik17"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-ink-muted hover:text-accent transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                  <span>Skills Directory (12 Grade A)</span>
                  <ArrowUpRight className="w-3 h-3 text-ink-subtle" />
                </a>
                <a
                  href="https://mcpmarket.com/ko/server/malikclaw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-ink-muted hover:text-accent transition-colors"
                >
                  <Globe2 className="w-3.5 h-3.5 text-accent" />
                  <span>MalikClaw on MCP Market</span>
                  <ArrowUpRight className="w-3 h-3 text-ink-subtle" />
                </a>
                <a
                  href="https://a2as.org/certified/agents/abdullahmalik17/deep-research-agent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-ink-muted hover:text-accent transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                  <span>A2AS Behavior Certificate</span>
                  <ArrowUpRight className="w-3 h-3 text-ink-subtle" />
                </a>
                <Link
                  href="/credentials"
                  className="flex items-center gap-1.5 text-ink-muted hover:text-accent transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                  <span>All verified badges</span>
                  <ArrowUpRight className="w-3 h-3 text-ink-subtle" />
                </Link>
                <Link
                  href="/resume"
                  className="flex items-center gap-1.5 text-ink-muted hover:text-accent transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-accent" />
                  <span>Interactive Resume</span>
                  <ArrowUpRight className="w-3 h-3 text-ink-subtle" />
                </Link>
                <a
                  href="/Abdullah_resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-ink-muted hover:text-accent transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-ink-subtle" />
                  <span>Resume PDF</span>
                  <ArrowUpRight className="w-3 h-3 text-ink-subtle" />
                </a>
              </div>
            </div>

            {/* Direct Connect */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-ink mb-4">
                Engineering Links
              </h4>
              <div className="space-y-2.5 text-xs font-medium">
                <a
                  href="https://github.com/AbdullahMalik17"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-ink-muted hover:text-ink transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub (@AbdullahMalik17)</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/muhammad-abdullah-athar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-ink-muted hover:text-accent transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn Profile</span>
                </a>
                <a
                  href="mailto:muhammadabdullah51700@gmail.com"
                  className="flex items-center gap-1.5 text-ink-muted hover:text-accent transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Direct Email</span>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-ink-subtle">
            <p>
              © 2026 Abdullah Malik. Engineered with Next.js 15, TypeScript, Go & Model Context Protocol.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>Production Edge Deployment</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
