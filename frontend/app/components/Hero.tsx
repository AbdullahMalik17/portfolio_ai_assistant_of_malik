'use client';

import { Link } from 'react-scroll';
import SocialLinks from './SocialLinks';
import TypewriterEffect from './TypewriterEffect';
import Button from './Button';

import NetworkBackground from './NetworkBackground';

const Hero = () => {
  return (
    <section
      id="home"
      data-component="Hero Section"
      data-type="Client Component"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
    >
      {/* Background Elements */}
      <div data-tech="Canvas Animation" className="absolute inset-0">
         <NetworkBackground />
      </div>

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="hero-glow top-[10%] left-[-10%] opacity-50"></div>
        <div className="hero-glow bottom-[10%] right-[-10%] opacity-50" style={{ '--accent-glow': 'var(--accent-glow-secondary)' } as React.CSSProperties}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" data-component="Content Wrapper" data-type="Layout">
        <div className="text-center space-y-8">
          <div className="inline-block animate-fade-in-up">
            <span className="px-6 py-2 rounded-full glass text-sm font-medium text-[color:var(--accent)] border border-[color:var(--accent)]/30 shadow-lg shadow-[color:var(--accent-glow)]/20">
              👋 Hi, I&apos;m Abdullah Malik
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight animate-fade-in-up delay-100">
            Building the{' '}
            <span className="text-shimmer">
              Future of AI
            </span>
            <br />
            One Line at a Time
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in-up delay-200 leading-relaxed">
            I&apos;m a passionate developer specializing in{' '}
            <span className="text-[color:var(--accent)] font-semibold min-w-[120px] sm:min-w-[200px] inline-block" data-tech="Typewriter Hook">
              <TypewriterEffect
                words={[
                  'AI Development',
                  'Full-Stack Development',
                  'Agentic AI Systems',
                  'Cloud Technologies',
                  'Web Applications',
                ]}
                typeSpeed={100}
                deleteSpeed={50}
                delayBetweenWords={2000}
              />
            </span>
            <br className="hidden md:block" />
            Creating intelligent solutions for complex problems.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up delay-300">
            <Link
              to="projects"
              smooth={true}
              offset={-70}
              duration={500}
              data-tech="React Scroll"
              className="px-8 py-4 bg-[color:var(--accent)] text-white rounded-full font-semibold text-lg hover:bg-blue-600 hover:scale-105 transition-all shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.7)] cursor-pointer"
            >
              View My Work
            </Link>
            <a
              href="/Abdullah_resume.pdf"
              download="Abdullah_resume.pdf"
            >
              <Button
                variant="outline"
                size="lg"
                rightIcon={
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                }
              >
                Download Resume
              </Button>
            </a>
            <Link
              to="contact"
              smooth={true}
              offset={-70}
              duration={500}
              className="px-8 py-4 glass text-[color:var(--foreground)] rounded-full font-semibold text-lg hover:bg-white/20 dark:hover:bg-white/10 hover:scale-105 transition-all cursor-pointer border border-[color:var(--foreground)]/10"
            >
              Contact Me
            </Link>
          </div>

          <div className="flex justify-center pt-8 relative z-20">
            <SocialLinks />
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce delay-1000">
            <Link
              to="about"
              smooth={true}
              offset={-70}
              duration={500}
              className="cursor-pointer text-gray-400 hover:text-[color:var(--accent)] transition-colors"
              aria-label="Scroll to About section"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
