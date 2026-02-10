import dynamic from 'next/dynamic';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

// Dynamic imports with SSR for important above-fold content
const About = dynamic(() => import('./components/About'), {
  ssr: true,
});

const Skills = dynamic(() => import('./components/Skills'), {
  ssr: true,
});

const AchievementStats = dynamic(() => import('./components/AchievementStats'), {
  ssr: true,
});

const Projects = dynamic(() => import('./components/Projects'), {
  ssr: true,
});

const Contact = dynamic(() => import('./components/Contact'), {
  ssr: true,
});

// Dynamic imports for below-fold content (with loading states)
const GitHubStats = dynamic(() => import('./components/GitHubStats'), {
  loading: () => (
    <section className="py-20 bg-[color:var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl p-8 md:p-12 animate-pulse">
          <div className="h-6 bg-[color:var(--accent)]/10 rounded w-32 mx-auto mb-8"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center space-y-2">
                <div className="h-8 bg-[color:var(--accent)]/10 rounded-full w-12 mx-auto"></div>
                <div className="h-3 bg-[color:var(--accent)]/5 rounded w-16 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  ),
});

const Testimonials = dynamic(() => import('./components/Testimonials'), {
  loading: () => (
    <section className="py-20 bg-[color:var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-6 bg-[color:var(--accent)]/10 rounded w-32 mx-auto mb-8 animate-pulse"></div>
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-8 animate-pulse space-y-3">
            <div className="h-20 bg-[color:var(--accent)]/5 rounded"></div>
            <div className="h-3 bg-[color:var(--accent)]/5 rounded w-24 mx-auto"></div>
          </div>
        </div>
      </div>
    </section>
  ),
});

// Non-critical widgets - load asynchronously
const WhatsAppWidget = dynamic(() => import('./components/WhatsAppWidget'), {
  loading: () => null,
});

const ChatbotWidget = dynamic(() => import('./components/ChatbotWidget'), {
  loading: () => null,
});

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <AchievementStats />
      <Projects />
      <GitHubStats />
      <Testimonials />
      <Contact />
      
      {/* Footer */}
      <footer className="bg-[color:var(--background-secondary)] text-[color:var(--foreground)] py-12 border-t border-[color:var(--card-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Abdullah Malik</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Full-Stack Developer & AI Specialist building intelligent solutions
                for the future.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <div className="space-y-2 text-sm">
                <a href="#about" className="block text-gray-600 dark:text-gray-400 hover:text-[color:var(--accent)]">About</a>
                <a href="#skills" className="block text-gray-600 dark:text-gray-400 hover:text-[color:var(--accent)]">Skills</a>
                <a href="#projects" className="block text-gray-600 dark:text-gray-400 hover:text-[color:var(--accent)]">Projects</a>
                <a href="#contact" className="block text-gray-600 dark:text-gray-400 hover:text-[color:var(--accent)]">Contact</a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Connect</h3>
              <div className="space-y-2 text-sm">
                <a href="https://github.com/AbdullahMalik17" target="_blank" rel="noopener noreferrer" className="block text-gray-600 dark:text-gray-400 hover:text-[color:var(--accent)]">
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/muhammad-abdullah-athar" target="_blank" rel="noopener noreferrer" className="block text-gray-600 dark:text-gray-400 hover:text-[color:var(--accent)]">
                  LinkedIn
                </a>
                <a href="mailto:muhammadabdullah51700@gmail.com" className="block text-gray-600 dark:text-gray-400 hover:text-[color:var(--accent)]">
                  Email
                </a>
              </div>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-[color:var(--card-border)]">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2026 Abdullah Malik. Built with Next.js 15, TypeScript, and OpenAI.
            </p>
          </div>
        </div>
      </footer>
      {/* Floating Widgets */}
      <WhatsAppWidget />
      <ChatbotWidget />
      </main>
  );
}
