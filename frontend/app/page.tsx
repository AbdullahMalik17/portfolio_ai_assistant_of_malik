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
const BadgesRegistry = dynamic(() => import('./components/BadgesRegistry'), { ssr: true });
const About = dynamic(() => import('./components/About'), { ssr: true });
const Contact = dynamic(() => import('./components/Contact'), { ssr: true });

// Dynamic imports for below-fold content
const GitHubStats = dynamic(() => import('./components/GitHubStats'), {
  loading: () => (
    <section className="py-20 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl p-8 md:p-12 animate-pulse">
          <div className="h-6 bg-cyan-500/10 rounded w-32 mx-auto mb-8"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center space-y-2">
                <div className="h-8 bg-cyan-500/10 rounded-full w-12 mx-auto"></div>
                <div className="h-3 bg-cyan-500/5 rounded w-16 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  ),
});

const WhatsAppWidget = dynamic(() => import('./components/WhatsAppWidget'), {
  loading: () => null,
});

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30 selection:text-white">
      <Navbar />
      <Hero />
      <ProofBar />
      <Projects />
      <CaseStudies />
      <SystemArchitecture />
      <EngineeringCredibility />
      <Skills />
      <Certifications />
      <BadgesRegistry />
      <About />
      <GitHubStats />
      <Contact />

      {/* Prestige AI-Lab Minimalist Footer */}
      <footer className="bg-slate-950 border-t border-white/[0.08] text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Identity & Status */}
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center font-mono font-bold text-white text-xs shadow-md">
                  AM
                </div>
                <span className="text-base font-bold text-white tracking-tight">
                  Abdullah Malik
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Principal Agentic AI Engineer specializing in Autonomous AI Systems, Go Edge Runtimes, and Model Context Protocol.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-emerald-500/30 bg-emerald-950/20 text-emerald-300 text-[11px] font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available in PKT / UTC+5</span>
              </div>
            </div>

            {/* Navigation Deep Links */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-200 mb-4">
                Architecture & Systems
              </h4>
              <div className="space-y-2.5 text-xs font-medium">
                <a href="#projects" className="block text-slate-400 hover:text-cyan-400 transition-colors">
                  Flagship Systems (Bento Grid)
                </a>
                <a href="#case-studies" className="block text-slate-400 hover:text-cyan-400 transition-colors">
                  Engineering Case Studies
                </a>
                <a href="#architecture" className="block text-slate-400 hover:text-cyan-400 transition-colors">
                  Agentic System Blueprint
                </a>
                <a href="#skills" className="block text-slate-400 hover:text-cyan-400 transition-colors">
                  Capabilities Matrix
                </a>
              </div>
            </div>

            {/* Verified Registries */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-200 mb-4">
                Verified Registries
              </h4>
              <div className="space-y-2.5 text-xs font-medium">
                <a
                  href="https://skillsdirectory.com/authors/abdullahmalik17"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-400 hover:text-emerald-300 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Skills Directory (12 Grade A)</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
                <a
                  href="https://mcpmarket.com/ko/server/malikclaw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-400 hover:text-purple-300 transition-colors"
                >
                  <Globe2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>MalikClaw on MCP Market</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
                <a
                  href="https://a2as.org/certified/agents/abdullahmalik17/deep-research-age"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-400 hover:text-emerald-300 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>A2AS Behavior Certificate</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
                <a
                  href="#registry"
                  className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>37 Badges Registry</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
                <Link
                  href="/resume"
                  className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Interactive Resume</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </Link>
                <a
                  href="/Abdullah_resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>Resume PDF</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              </div>
            </div>

            {/* Direct Connect */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-200 mb-4">
                Engineering Links
              </h4>
              <div className="space-y-2.5 text-xs font-medium">
                <a
                  href="https://github.com/AbdullahMalik17"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub (@AbdullahMalik17)</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/muhammad-abdullah-athar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn Profile</span>
                </a>
                <a
                  href="mailto:muhammadabdullah51700@gmail.com"
                  className="flex items-center gap-1.5 text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Direct Email</span>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
            <p>
              © 2026 Abdullah Malik. Engineered with Next.js 15, TypeScript, Go & Model Context Protocol.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Production Edge Deployment</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Widgets */}
      <WhatsAppWidget />
    </main>
  );
}
