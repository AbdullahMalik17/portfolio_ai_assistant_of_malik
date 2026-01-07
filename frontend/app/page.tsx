import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import GitHubStats from './components/GitHubStats';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
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
      </main>
  );
}
